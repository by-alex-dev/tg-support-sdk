import { isMethod } from "tg-support-protocol";
import { createBrowserProtocolValidators } from "tg-support-protocol/browser-validation";
import type { Binding } from "tg-support-protocol";
import type { Keyring } from "./crypto.ts";
import { record, jsonRecord, jsonRecords } from "./parse.ts";
import { renderTemplate } from "./templates.ts";
import type { BotApi, BotApiOutcome, Command, FormattedText, Json, TgSupportConfig, TgSupportEvent, TgSupportOptions, TgSupportOutcome, TelegramRequest, TemplateId } from "./types.ts";

type Reason = Extract<TgSupportOutcome, { kind: "rejected_by_host" }>["reason"];
class Rejected extends Error { readonly reason: Reason; constructor(reason: Reason) { super("Command rejected."); this.reason = reason; } }
class ProfileFailed extends Error { readonly outcome: Extract<BotApiOutcome, { ok: false }>; constructor(outcome: Extract<BotApiOutcome, { ok: false }>) { super("Profile lookup failed."); this.outcome = outcome; } }
const validators = createBrowserProtocolValidators();

export function createExecutor(config: TgSupportConfig, keys: Keyring, botApi: BotApi, options: TgSupportOptions) {
  const clock = options.clock ?? { now: () => Date.now() };
  const currentGroupIds = [config.supportGroupId];
  const sourceGroupIds = [...new Set([...currentGroupIds, ...(config.previousSupportGroupIds ?? [])])];
  const operationResult = (command: Command, outcome: TgSupportOutcome): TgSupportEvent => ({ type: "operation_result", eventId: `r-${command.attemptToken}`, opId: command.opId, attemptToken: command.attemptToken, outcome });
  const apiError = (outcome: Extract<BotApiOutcome, { ok: false }>): TgSupportOutcome => outcome.kind === "telegram"
    ? { kind: "telegram_error", errorCode: outcome.errorCode, description: outcome.description, retryAfter: outcome.retryAfter }
    : { kind: "transport_error", description: outcome.description };
  return async (command: Command): Promise<TgSupportEvent | null> => {
    if (clock.now() >= command.expiresAt || clock.now() >= command.receivedAt + 3_600_000) return null;
    try {
      const wire = { op_id: command.opId, attempt_token: command.attemptToken, deadline_seconds: command.deadlineSeconds, subject: command.subject, method: command.method, params: command.params, binding: command.binding };
      if (!validators.parse("Command", wire).ok || !Number.isFinite(command.receivedAt) || !Number.isFinite(command.expiresAt)) throw new Rejected("malformed");
      if (!isMethod(command.method)) throw new Rejected("method_not_allowed");
      const method = command.method;
      const params = record(command.params);
      if (!params) throw new Rejected("malformed");
      const parsed = validators.params(method, params);
      let validStructure = parsed.ok;
      if (!parsed.ok) {
        for (const slot of ["name", "text"]) {
          const reference = record(params[slot]);
          if (typeof reference?.template !== "string") continue;
          const allowedIds = parsed.errors.flatMap<unknown>((error) => {
            if (error.instancePath !== `/${slot}/template`) return [];
            if (error.keyword === "const") return [error.params.allowedValue];
            const values: unknown = error.params.allowedValues;
            return error.keyword === "enum" && Array.isArray(values) ? values : [];
          }).filter((id): id is string => typeof id === "string");
          // Authorize the original ID after binding and sealed-slot checks.
          if (!allowedIds.includes(reference.template) && allowedIds.some((template) => validators.params(method, { ...params, [slot]: { ...reference, template } }).ok)) validStructure = true;
        }
      }
      if (!validStructure) throw new Rejected("malformed");
      const groupToken = await keys.token("group", config.supportGroupId);
      let binding: Binding | null = null;
      if (command.binding !== null) {
        const opened = await keys.open("binding", [command.subject], command.binding);
        if (!opened.ok) throw new Rejected(opened.error === "unknown_kid" ? "unknown_kid" : "binding_invalid");
        const validated = validators.parse("Binding", opened.value);
        if (!validated.ok || validated.value.user !== command.subject) throw new Rejected("binding_invalid");
        binding = validated.value;
      }
      const sealed = (value: unknown): string => { const object = record(value); if (typeof object?.sealed !== "string") throw new Rejected("malformed"); return object.sealed; };
      const address = async (value: unknown, groupOnly = false, allowedGroupIds: readonly number[] = currentGroupIds): Promise<{ kind: "group" | "private"; id: number }> => {
        const blob = sealed(value);
        const group = await keys.open("group_chat", await Promise.all(allowedGroupIds.map((id) => keys.token("group", id))), blob);
        if (group.ok) {
          const checked = validators.parse("GroupChatPayload", group.value);
          if (!checked.ok) throw new Rejected("malformed");
          if (!allowedGroupIds.includes(checked.value.chat_id) || await keys.token("group", checked.value.chat_id) !== group.subject) throw new Rejected("addressee_not_allowed");
          return { kind: "group", id: checked.value.chat_id };
        }
        if (group.error === "unknown_kid") throw new Rejected("unknown_kid");
        if (groupOnly) throw new Rejected("blob_invalid");
        const personal = await keys.open("private_chat", [command.subject], blob);
        if (!personal.ok) throw new Rejected(personal.error);
        const checked = validators.parse("PrivateChatPayload", personal.value);
        if (!checked.ok) throw new Rejected("malformed");
        if (await keys.token("user", checked.value.chat_id) !== command.subject) throw new Rejected("addressee_not_allowed");
        return { kind: "private", id: checked.value.chat_id };
      };
      const chat = await address(params.chat_id, command.method === "createForumTopic" || command.method === "editForumTopic" || command.method === "unpinAllForumTopicMessages");
      const subjects = (slot: string, fromGroup = false, replyThread: string | null = null): string[] => [command.subject,
        ...(binding?.kind === "topic" && (["message_thread_id", "message_id"].includes(slot) ||
          slot === "reply_to_message_id" && chat.kind === "group" && binding.thread === replyThread) ? [binding.thread] : []),
        ...(binding?.kind === "notice" && slot === "message_id" && fromGroup ? [binding.notice] : []),
        ...(slot === "message_thread_id" ? [groupToken] : [])];
      const thread = async (required: boolean): Promise<number | undefined> => {
        const value = params.message_thread_id;
        if (value === undefined || value === null) { if (required) throw new Rejected("malformed"); return undefined; }
        if (chat.kind !== "group") throw new Rejected("addressee_not_allowed");
        const opened = await keys.open("thread_id", subjects("message_thread_id"), sealed(value));
        if (!opened.ok) throw new Rejected(opened.error);
        const checked = validators.parse("ThreadIdPayload", opened.value);
        if (!checked.ok) throw new Rejected("malformed");
        if (binding?.kind === "topic" && opened.subject === binding.thread && await keys.token("thread", config.supportGroupId, checked.value.thread_id) !== binding.thread) throw new Rejected("binding_invalid");
        return checked.value.thread_id;
      };
      const openMessageId = async (value: unknown, slot: string, fromGroup = false, replyThread: string | null = null) => {
        const opened = await keys.open("message_id", subjects(slot, fromGroup, replyThread), sealed(value));
        if (!opened.ok) throw new Rejected(opened.error);
        const checked = validators.parse("MessageIdPayload", opened.value);
        if (!checked.ok) throw new Rejected("malformed");
        return checked.value;
      };
      const messageId = async (value: unknown, slot: string, expectedChatId: number, fromGroup = false, replyThread: string | null = null): Promise<number> => {
        const payload = await openMessageId(value, slot, fromGroup, replyThread);
        if (payload.chat_id !== expectedChatId) throw new Rejected("blob_invalid");
        return payload.message_id;
      };
      const sourceSubjects = async (): Promise<string[]> => {
        if (params.source_message_id === undefined) return [command.subject];
        const payload = await openMessageId(params.source_message_id, "message_id", true);
        if (!(chat.kind === "private" ? sourceGroupIds : currentGroupIds).includes(payload.chat_id)) throw new Rejected("blob_invalid");
        return [await keys.token("message", payload.chat_id, payload.message_id)];
      };
      const reply = async (threadId: number | undefined) => {
        if (params.reply_to_message_id == null) return {};
        const replyThread = chat.kind === "group" && threadId !== undefined ? await keys.token("thread", config.supportGroupId, threadId) : null;
        return { reply_parameters: { message_id: await messageId(params.reply_to_message_id, "reply_to_message_id", chat.id, false, replyThread) } };
      };
      let templateId: TemplateId | null = null;
      const render = async (value: unknown, allowed: readonly TemplateId[]): Promise<FormattedText> => {
        const ref = record(value);
        if (!ref || typeof ref.template !== "string") throw new Rejected("unknown_template");
        const id = allowed.find((item) => item === ref.template);
        const language = await keys.open("language", [command.subject], sealed(ref.language));
        if (!language.ok) throw new Rejected(language.error);
        const languageValue = validators.parse("LanguagePayload", language.value);
        if (!languageValue.ok) throw new Rejected("malformed");
        let profile = null;
        let verifiedUserId: number | null = null;
        const needsProfile = id !== undefined && ["topic_title", "topic_header", "new_user_notice"].includes(id);
        if (needsProfile || (id === undefined && ref.user !== undefined)) {
          const user = await address(ref.user);
          if (user.kind !== "private") throw new Rejected("addressee_not_allowed");
          verifiedUserId = user.id;
        }
        if (!id) throw new Rejected("unknown_template");
        templateId = id;
        let reactions: readonly Record<string, Json>[] | null = null;
        if (id === "user_reacted") {
          const opened = await keys.open("reactions", [command.subject], sealed(ref.reactions));
          if (!opened.ok) throw new Rejected(opened.error);
          const checked = validators.parse("ReactionsPayload", opened.value);
          const values = checked.ok ? jsonRecords(checked.value.reaction) : null;
          if (!values || values.length === 0) throw new Rejected("malformed");
          reactions = values;
        }
        if (needsProfile && verifiedUserId !== null) {
          if (options.resolveProfile) profile = await options.resolveProfile(verifiedUserId);
          else { const response = await botApi.getProfile({ method: "getChat", chatId: verifiedUserId }); if (!response.ok) throw new ProfileFailed(response); profile = response.profile; }
        }
        return renderTemplate(id, languageValue.value.language_code, profile, config.templates, verifiedUserId, reactions);
      };
      let request: TelegramRequest;
      switch (command.method) {
        case "createForumTopic": request = { method: "createForumTopic", params: { chat_id: chat.id, name: (await render(params.name, ["topic_title", "notifications_topic_title"])).text } }; break;
        case "editForumTopic": { const id = await thread(true); if (id === undefined) throw new Rejected("malformed"); request = { method: "editForumTopic", params: { chat_id: chat.id, message_thread_id: id, name: (await render(params.name, ["topic_title"])).text } }; break; }
        case "unpinAllForumTopicMessages": { const id = await thread(true); if (id === undefined) throw new Rejected("malformed"); request = { method: "unpinAllForumTopicMessages", params: { chat_id: chat.id, message_thread_id: id } }; break; }
        case "copyMessage": {
          const id = await thread(chat.kind === "group"); const from = await address(params.from_chat_id, false, chat.kind === "private" ? sourceGroupIds : currentGroupIds);
          request = { method: "copyMessage", params: { chat_id: chat.id, ...(id !== undefined ? { message_thread_id: id } : {}), from_chat_id: from.id, message_id: await messageId(params.message_id, "message_id", from.id, from.kind === "group"), ...await reply(id) } }; break;
        }
        case "sendMessage": {
          const id = await thread(chat.kind === "group");
          const replyParams = await reply(id);
          let text: FormattedText;
          const ref = record(params.text);
          if (ref?.sealed) { const opened = await keys.open("notice_text", [command.subject], sealed(params.text)); if (!opened.ok) throw new Rejected(opened.error); const checked = validators.parse("NoticeTextPayload", opened.value); if (!checked.ok) throw new Rejected("malformed"); const entities = checked.value.entities ? jsonRecords(checked.value.entities) : null; if (checked.value.entities && !entities) throw new Rejected("malformed"); text = { text: checked.value.text, ...(entities ? { entities } : {}) }; }
          else text = await render(params.text, ["topic_header", "new_user_notice", "welcome_hint", "user_edited", "edited_by_support", "replaced_by_support", "user_reacted"]);
          request = { method: "sendMessage", params: { chat_id: chat.id, ...(id !== undefined ? { message_thread_id: id } : {}), ...text, ...replyParams } }; break;
        }
        case "editMessageText": {
          if (params.text !== undefined) { const id = await messageId(params.message_id, "message_id", chat.id); request = { method: "editMessageText", params: { chat_id: chat.id, message_id: id, ...await render(params.text, ["user_reacted"]) } }; break; }
          const id = await messageId(params.message_id, "message_id", chat.id); const opened = await keys.open("edit_content", await sourceSubjects(), sealed(params.content)); if (!opened.ok) throw new Rejected(opened.error);
          const checked = validators.parse("TextEditPayload", opened.value); if (!checked.ok) throw new Rejected("malformed");
          const entities = checked.value.entities ? jsonRecords(checked.value.entities) : null; const preview = checked.value.link_preview_options ? jsonRecord(checked.value.link_preview_options) : null;
          if ((checked.value.entities && !entities) || (checked.value.link_preview_options && !preview)) throw new Rejected("malformed");
          request = { method: "editMessageText", params: { chat_id: chat.id, message_id: id, text: checked.value.text, ...(entities ? { entities } : {}), ...(preview ? { link_preview_options: preview } : {}) } }; break;
        }
        case "editMessageCaption": {
          const id = await messageId(params.message_id, "message_id", chat.id); const opened = await keys.open("edit_content", await sourceSubjects(), sealed(params.content)); if (!opened.ok) throw new Rejected(opened.error);
          const checked = validators.parse("CaptionEditPayload", opened.value); if (!checked.ok) throw new Rejected("malformed");
          const entities = checked.value.caption_entities ? jsonRecords(checked.value.caption_entities) : null; if (checked.value.caption_entities && !entities) throw new Rejected("malformed");
          request = { method: "editMessageCaption", params: { chat_id: chat.id, message_id: id, caption: checked.value.caption, ...(entities ? { caption_entities: entities } : {}), ...(typeof checked.value.show_caption_above_media === "boolean" ? { show_caption_above_media: checked.value.show_caption_above_media } : {}) } }; break;
        }
        case "deleteMessage": request = { method: "deleteMessage", params: { chat_id: chat.id, message_id: await messageId(params.message_id, "message_id", chat.id) } }; break;
        case "pinChatMessage": request = { method: "pinChatMessage", params: { chat_id: chat.id, message_id: await messageId(params.message_id, "message_id", chat.id), ...(typeof params.disable_notification === "boolean" ? { disable_notification: params.disable_notification } : {}) } }; break;
        case "setMessageReaction": {
          const id = await messageId(params.message_id, "message_id", chat.id);
          const authorizedSubjects = await sourceSubjects();
          let reaction: readonly Record<string, Json>[];
          if (params.reaction === "👀") reaction = [{ type: "emoji", emoji: "👀" }];
          else { const opened = await keys.open("reactions", authorizedSubjects, sealed(params.reaction)); if (!opened.ok) throw new Rejected(opened.error); const checked = validators.parse("ReactionsPayload", opened.value); if (!checked.ok) throw new Rejected("malformed"); const values = jsonRecords(checked.value.reaction); if (!values) throw new Rejected("malformed"); reaction = values; }
          request = { method: "setMessageReaction", params: { chat_id: chat.id, message_id: id, reaction } }; break;
        }
        default: { const exhaustive: never = command.method; throw new Error(exhaustive); }
      }
      if (clock.now() >= command.expiresAt) return null;
      const response = await botApi.call(request);
      if (!response.ok) return operationResult(command, apiError(response));
      if (request.method === "createForumTopic") {
        if (!response.threadId) return operationResult(command, { kind: "transport_error", description: "Telegram topic response was malformed." });
        const token = await keys.token("thread", chat.id, response.threadId);
        const common = templateId === "notifications_topic_title";
        return operationResult(command, { kind: "success", created: { kind: "topic", thread: token, threadId: await keys.seal("thread_id", common ? groupToken : command.subject, { thread_id: response.threadId }), binding: common ? null : await keys.seal("binding", command.subject, { kind: "topic", thread: token, user: command.subject }) } });
      }
      if (request.method === "sendMessage" || request.method === "copyMessage") {
        if (!response.messageId) return operationResult(command, { kind: "transport_error", description: "Telegram message response was malformed." });
        const token = await keys.token("message", chat.id, response.messageId);
        return operationResult(command, { kind: "success", created: { kind: "message", message: token, messageId: await keys.seal("message_id", command.subject, { message_id: response.messageId, chat_id: chat.id }), binding: templateId === "new_user_notice" ? await keys.seal("binding", command.subject, { kind: "notice", notice: token, user: command.subject }) : null } });
      }
      return operationResult(command, { kind: "success", created: null });
    } catch (error) {
      if (error instanceof Rejected) return operationResult(command, { kind: "rejected_by_host", reason: error.reason });
      if (error instanceof ProfileFailed) return operationResult(command, apiError(error.outcome));
      return operationResult(command, { kind: "transport_error", description: "Host command execution failed." });
    }
  };
}
