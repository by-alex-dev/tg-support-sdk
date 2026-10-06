import { record, integer, jsonRecords, jsonRecord } from "./parse.ts";
import type { Keyring } from "./crypto.ts";
import type { FormattedText, Json, TgSupportEvent, TgSupportConfig, TelegramUserProfile } from "./types.ts";

const serviceFields = ["new_chat_members", "left_chat_member", "new_chat_title", "new_chat_photo", "delete_chat_photo", "group_chat_created", "supergroup_chat_created", "channel_chat_created", "message_auto_delete_timer_changed", "migrate_to_chat_id", "migrate_from_chat_id", "pinned_message", "successful_payment", "refunded_payment", "users_shared", "chat_shared", "write_access_allowed", "video_chat_scheduled", "video_chat_started", "video_chat_ended", "video_chat_participants_invited", "web_app_data", "forum_topic_created", "forum_topic_closed", "forum_topic_reopened", "forum_topic_edited", "general_forum_topic_hidden", "general_forum_topic_unhidden"];
const copyableFields = ["text", "photo", "audio", "video", "voice", "video_note", "animation", "document", "sticker", "contact", "location", "venue", "poll", "dice"];
export function createNormalizer(config: TgSupportConfig, botId: number, keys: Keyring) {
  const profileFields = async (id: number, profile: TelegramUserProfile) => {
    const user = await keys.token("user", id);
    return { user, profile: await keys.token("profile", profile.firstName ?? "", profile.lastName ?? "", profile.username ?? "", profile.languageCode ?? ""),
      chat: await keys.seal("private_chat", user, { chat_id: id }), language: await keys.seal("language", user, { language_code: profile.languageCode ?? null }) };
  };
  const parseProfile = (from: Record<string, unknown>): TelegramUserProfile => ({ ...(typeof from.first_name === "string" ? { firstName: from.first_name } : {}), ...(typeof from.last_name === "string" ? { lastName: from.last_name } : {}), ...(typeof from.username === "string" ? { username: from.username } : {}), ...(typeof from.language_code === "string" ? { languageCode: from.language_code } : {}) });
  const eventId = async (id: number) => `u-${(await keys.token("event", botId, id)).slice(0, 32)}`;
  return {
    async normalize(input: unknown): Promise<TgSupportEvent | null> {
      try {
        const update = record(input);
        if (!update || !integer(update.update_id) || update.update_id < 0) return null;
        const callback = record(update.callback_query);
        if (callback) {
          const from = record(callback.from); const message = record(callback.message); const chat = record(message?.chat);
          if (!from || from.is_bot !== false || !integer(from.id) || chat?.type !== "private" || chat.id !== from.id) return null;
          return { type: "user_interaction", eventId: await eventId(update.update_id), ...await profileFields(from.id, parseProfile(from)) };
        }
        const reaction = record(update.message_reaction); const edited = record(update.edited_message);
        const message = reaction ?? edited ?? record(update.message);
        const chat = record(message?.chat); const from = record(reaction ? message?.user : message?.from);
        if (!message || !chat || !from || from.is_bot !== false || !integer(chat.id) || !integer(from.id) || !integer(message.message_id) || message.message_id <= 0) return null;
        if (serviceFields.some((field) => message[field] !== undefined)) return null;
        const personal = chat.type === "private" && chat.id === from.id;
        const threadId = integer(message.message_thread_id) && message.message_thread_id > 1 ? message.message_thread_id : null;
        const support = chat.type === "supergroup" && chat.id === config.supportGroupId && threadId !== null;
        if (!personal && !support) return null;
        const subject = personal ? await keys.token("user", from.id) : await keys.token("thread", chat.id, threadId ?? 0);
        const id = await eventId(update.update_id); const token = await keys.token("message", chat.id, message.message_id);
        if (reaction) {
          const values = jsonRecords(reaction.new_reaction); if (!values) return null;
          const reactions = await keys.seal("reactions", subject, { reaction: values });
          return personal ? { type: "user_reaction", eventId: id, user: subject, message: token, reactions } : { type: "support_reaction", eventId: id, group: await keys.token("group", chat.id), thread: subject, message: token, reactions };
        }
        if (edited) {
          if (!integer(message.edit_date) || message.edit_date < 0) return null;
          const field = typeof message.text === "string" ? "text" : typeof message.caption === "string" ? "caption" : null; if (!field) return null;
          const content: Record<string, Json> = field === "text" ? { field, text: String(message.text) } : { field, caption: String(message.caption) };
          const entities = jsonRecords(field === "text" ? message.entities : message.caption_entities); if (entities) content[field === "text" ? "entities" : "caption_entities"] = entities;
          const preview = jsonRecord(message.link_preview_options); if (field === "text" && preview) content.link_preview_options = preview;
          if (field === "caption" && typeof message.show_caption_above_media === "boolean") content.show_caption_above_media = message.show_caption_above_media;
          const sealed = await keys.seal("edit_content", subject, content); const revision = { editDate: message.edit_date, updateId: update.update_id };
          return personal ? { type: "user_edit", eventId: id, user: subject, message: token, revision, field, content: sealed } : { type: "support_edit", eventId: id, group: await keys.token("group", chat.id), thread: subject, message: token, revision, field, content: sealed };
        }
        const replied = record(message.reply_to_message); const replyTo = integer(replied?.message_id) ? await keys.token("message", chat.id, replied.message_id) : null;
        const messageId = await keys.seal("message_id", subject, { message_id: message.message_id });
        const copyable = message.has_protected_content !== true && chat.has_protected_content !== true && copyableFields.some((field) => message[field] !== undefined);
        if (personal) {
          const entities = Array.isArray(message.entities) ? message.entities.map(record) : []; const isBotCommand = entities.some((entity) => entity?.type === "bot_command" && entity.offset === 0);
          return { type: "user_message", eventId: id, ...await profileFields(from.id, parseProfile(from)), message: token, messageId, replyTo, copyable, isBotCommand, isStart: isBotCommand && typeof message.text === "string" && /^\/start(?:@[A-Za-z0-9_]+)?(?:\s|$)/.test(message.text) };
        }
        return { type: "support_message", eventId: id, group: await keys.token("group", chat.id), thread: subject, message: token, messageId, replyTo, replyScopedMessageId: replyTo ? await keys.seal("message_id", replyTo, { message_id: message.message_id }) : null, copyable };
      } catch { return null; }
    },
    async hostNotice(user: { id: number; profile: TelegramUserProfile }, text: FormattedText, idempotencyKey?: string): Promise<TgSupportEvent> {
      const reference = await profileFields(user.id, user.profile);
      return { type: "host_notice", eventId: idempotencyKey === undefined ? crypto.randomUUID() : `n-${(await keys.token("notice", idempotencyKey)).slice(0, 32)}`, ...reference, text: await keys.seal("notice_text", reference.user, { text: text.text, ...(text.entities ? { entities: [...text.entities] } : {}) }) };
    },
    async userForget(userId: number): Promise<TgSupportEvent> { return { type: "user_forget", eventId: crypto.randomUUID(), user: await keys.token("user", userId) }; },
    async botConfigured(): Promise<TgSupportEvent> {
      const group = await keys.token("group", config.supportGroupId);
      return { type: "bot_configured", eventId: `c-${config.configRevision}-${crypto.randomUUID().slice(0, 8)}`, telegramBotId: botId, group, groupChat: await keys.seal("group_chat", group, { chat_id: config.supportGroupId }), features: { ...config.features }, transport: config.transport.kind, hostUrl: config.transport.kind === "push" ? config.transport.hostUrl : null, deadlineSeconds: config.attemptDeadlineSeconds ?? 60, sdkVersion: "tg-support-sdk/0.3.0", configRevision: config.configRevision };
    },
  };
}
