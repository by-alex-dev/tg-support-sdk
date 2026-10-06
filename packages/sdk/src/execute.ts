import { isMethod } from "@support-relay/protocol";
import { createBrowserProtocolValidators } from "@support-relay/protocol/browser-validation";
import type { Binding } from "@support-relay/protocol";
import type { Keyring } from "./crypto.ts";
import { record, jsonRecord, jsonRecords } from "./parse.ts";
import { renderTemplate } from "./templates.ts";
import type { BotApi, BotApiOutcome, Command, FormattedText, Json, RelayConfig, RelayEvent, RelayOptions, RelayOutcome, TelegramRequest, TemplateId } from "./types.ts";

type Reason = Extract<RelayOutcome, { kind: "rejected_by_host" }>["reason"];
class Rejected extends Error { readonly reason: Reason; constructor(reason: Reason) { super("Command rejected."); this.reason = reason; } }
class ProfileFailed extends Error { readonly outcome: Extract<BotApiOutcome, { ok: false }>; constructor(outcome: Extract<BotApiOutcome, { ok: false }>) { super("Profile lookup failed."); this.outcome = outcome; } }
const validators = createBrowserProtocolValidators();

export function createExecutor(config: RelayConfig, keys: Keyring, botApi: BotApi, options: RelayOptions) {
  const clock = options.clock ?? { now: () => Date.now() };
  const operationResult = (command: Command, outcome: RelayOutcome): RelayEvent => ({ type: "operation_result", eventId: `r-${command.attemptToken}`, opId: command.opId, attemptToken: command.attemptToken, outcome });
  const apiError = (outcome: Extract<BotApiOutcome, { ok: false }>): RelayOutcome => outcome.kind === "telegram"
    ? { kind: "telegram_error", errorCode: outcome.errorCode, description: outcome.description, retryAfter: outcome.retryAfter }
    : { kind: "transport_error", description: outcome.description };
  return async (command: Command): Promise<RelayEvent | null> => {
    if (clock.now() >= command.expiresAt || clock.now() >= command.receivedAt + 3_600_000) return null;
    try {
      const wire = { op_id: command.opId, attempt_token: command.attemptToken, deadline_seconds: command.deadlineSeconds, subject: command.subject, method: command.method, params: command.params, binding: command.binding };
      if (!validators.parse("Command", wire).ok || !Number.isFinite(command.receivedAt) || !Number.isFinite(command.expiresAt)) throw new Rejected("malformed");
      if (!isMethod(command.method)) throw new Rejected("method_not_allowed");
      const method = command.method;
      const parsed = validators.params(method, command.params);
      if (!parsed.ok) {
        const parameters = record(command.params);
        for (const slot of ["name", "text"]) {
          const reference = record(parameters?.[slot]);
          if (typeof reference?.template !== "string") continue;
          const allowedIds = parsed.errors.flatMap<unknown>((error) => {
            if (error.instancePath !== `/${slot}/template`) return [];
            if (error.keyword === "const") return [error.params.allowedValue];
            const values: unknown = error.params.allowedValues;
            return error.keyword === "enum" && Array.isArray(values) ? values : [];
          }).filter((id): id is string => typeof id === "string");
          if (!allowedIds.includes(reference.template) && allowedIds.some((template) => validators.params(method, { ...parameters, [slot]: { ...reference, template } }).ok)) throw new Rejected("unknown_template");
        }
        throw new Rejected("malformed");
      }
      const params = parsed.value;
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
      const address = async (value: unknown, groupOnly = false): Promise<{ kind: "group" | "private"; id: number }> => {
        const blob = sealed(value);
        const group = await keys.open("group_chat", [groupToken], blob);
        if (group.ok) {
          const checked = validators.parse("GroupChatPayload", group.value);
          if (!checked.ok) throw new Rejected("malformed");
          if (checked.value.chat_id !== config.supportGroupId) throw new Rejected("addressee_not_allowed");
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
      const subjects = (slot: string, fromGroup = false): string[] => [command.subject,
        ...(binding?.kind === "topic" && ["message_thread_id", "message_id", "content", "reaction"].includes(slot) ? [binding.thread] : []),
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
      const messageId = async (value: unknown, slot: string, fromGroup = false): Promise<number> => {
        const opened = await keys.open("message_id", subjects(slot, fromGroup), sealed(value));
        if (!opened.ok) throw new Rejected(opened.error);
        const checked = validators.parse("MessageIdPayload", opened.value);
        if (!checked.ok) throw new Rejected("malformed");
        if (binding?.kind === "notice" && opened.subject === binding.notice && await keys.token("message", config.supportGroupId, checked.value.message_id) !== binding.notice) throw new Rejected("binding_invalid");
        return checked.value.message_id;
      };
      const reply = async () => params.reply_to_message_id == null ? {} : { reply_parameters: { message_id: await messageId(params.reply_to_message_id, "reply_to_message_id") } };
      let templateId: TemplateId | null = null;
      const render = async (value: unknown, allowed: readonly TemplateId[]): Promise<FormattedText> => {
        const ref = record(value);
        if (!ref || typeof ref.template !== "string") throw new Rejected("unknown_template");
        const id = allowed.find((item) => item === ref.template);
        if (!id) throw new Rejected("unknown_template");
        templateId = id;
        const language = await keys.open("language", [command.subject], sealed(ref.language));
        if (!language.ok) throw new Rejected(language.error);
        const languageValue = validators.parse("LanguagePayload", language.value);
        if (!languageValue.ok) throw new Rejected("malformed");
        let profile = null;
        let userId: number | undefined;
        if (["topic_title", "topic_header", "new_user_notice"].includes(id)) {
          const user = await address(ref.user);
          if (user.kind !== "private") throw new Rejected("addressee_not_allowed");
          userId = user.id;
          if (options.resolveProfile) profile = await options.resolveProfile(user.id);
          else { const response = await botApi.getProfile({ method: "getChat", chatId: user.id }); if (!response.ok) throw new ProfileFailed(response); profile = response.profile; }
        }
        return renderTemplate(id, languageValue.value.language_code, profile, config.templates, userId);
      };
      let request: TelegramRequest;
      switch (command.method) {
        case "createForumTopic": request = { method: "createForumTopic", params: { chat_id: chat.id, name: (await render(params.name, ["topic_title", "notifications_topic_title"])).text } }; break;
        case "editForumTopic": { const id = await thread(true); if (id === undefined) throw new Rejected("malformed"); request = { method: "editForumTopic", params: { chat_id: chat.id, message_thread_id: id, name: (await render(params.name, ["topic_title"])).text } }; break; }
        case "unpinAllForumTopicMessages": { const id = await thread(true); if (id === undefined) throw new Rejected("malformed"); request = { method: "unpinAllForumTopicMessages", params: { chat_id: chat.id, message_thread_id: id } }; break; }
        case "copyMessage": {
          const id = await thread(chat.kind === "group"); const from = await address(params.from_chat_id);
          request = { method: "copyMessage", params: { chat_id: chat.id, ...(id !== undefined ? { message_thread_id: id } : {}), from_chat_id: from.id, message_id: await messageId(params.message_id, "message_id", from.kind === "group"), ...await reply() } }; break;
        }
        case "sendMessage": {
          const id = await thread(chat.kind === "group");
          let text: FormattedText;
          const ref = record(params.text);
          if (ref?.sealed) { const opened = await keys.open("notice_text", [command.subject], sealed(params.text)); if (!opened.ok) throw new Rejected(opened.error); const checked = validators.parse("NoticeTextPayload", opened.value); if (!checked.ok) throw new Rejected("malformed"); const entities = checked.value.entities ? jsonRecords(checked.value.entities) : null; if (checked.value.entities && !entities) throw new Rejected("malformed"); text = { text: checked.value.text, ...(entities ? { entities } : {}) }; }
          else text = await render(params.text, ["topic_header", "new_user_notice", "welcome_hint", "user_edited", "edited_by_support", "replaced_by_support"]);
          request = { method: "sendMessage", params: { chat_id: chat.id, ...(id !== undefined ? { message_thread_id: id } : {}), ...text, ...await reply() } }; break;
        }
        case "editMessageText": {
          const id = await messageId(params.message_id, "message_id"); const opened = await keys.open("edit_content", subjects("content"), sealed(params.content)); if (!opened.ok) throw new Rejected(opened.error);
          const checked = validators.parse("TextEditPayload", opened.value); if (!checked.ok) throw new Rejected("malformed");
          const entities = checked.value.entities ? jsonRecords(checked.value.entities) : null; const preview = checked.value.link_preview_options ? jsonRecord(checked.value.link_preview_options) : null;
          if ((checked.value.entities && !entities) || (checked.value.link_preview_options && !preview)) throw new Rejected("malformed");
          request = { method: "editMessageText", params: { chat_id: chat.id, message_id: id, text: checked.value.text, ...(entities ? { entities } : {}), ...(preview ? { link_preview_options: preview } : {}) } }; break;
        }
        case "editMessageCaption": {
          const id = await messageId(params.message_id, "message_id"); const opened = await keys.open("edit_content", subjects("content"), sealed(params.content)); if (!opened.ok) throw new Rejected(opened.error);
          const checked = validators.parse("CaptionEditPayload", opened.value); if (!checked.ok) throw new Rejected("malformed");
          const entities = checked.value.caption_entities ? jsonRecords(checked.value.caption_entities) : null; if (checked.value.caption_entities && !entities) throw new Rejected("malformed");
          request = { method: "editMessageCaption", params: { chat_id: chat.id, message_id: id, caption: checked.value.caption, ...(entities ? { caption_entities: entities } : {}), ...(typeof checked.value.show_caption_above_media === "boolean" ? { show_caption_above_media: checked.value.show_caption_above_media } : {}) } }; break;
        }
        case "deleteMessage": request = { method: "deleteMessage", params: { chat_id: chat.id, message_id: await messageId(params.message_id, "message_id") } }; break;
        case "pinChatMessage": request = { method: "pinChatMessage", params: { chat_id: chat.id, message_id: await messageId(params.message_id, "message_id"), ...(typeof params.disable_notification === "boolean" ? { disable_notification: params.disable_notification } : {}) } }; break;
        case "setMessageReaction": {
          let reaction: readonly Record<string, Json>[];
          if (params.reaction === "👀") reaction = [{ type: "emoji", emoji: "👀" }];
          else { const opened = await keys.open("reactions", subjects("reaction"), sealed(params.reaction)); if (!opened.ok) throw new Rejected(opened.error); const checked = validators.parse("ReactionsPayload", opened.value); if (!checked.ok) throw new Rejected("malformed"); const values = jsonRecords(checked.value.reaction); if (!values) throw new Rejected("malformed"); reaction = values; }
          request = { method: "setMessageReaction", params: { chat_id: chat.id, message_id: await messageId(params.message_id, "message_id"), reaction } }; break;
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
        return operationResult(command, { kind: "success", created: { kind: "message", message: token, messageId: await keys.seal("message_id", command.subject, { message_id: response.messageId }), binding: templateId === "new_user_notice" ? await keys.seal("binding", command.subject, { kind: "notice", notice: token, user: command.subject }) : null } });
      }
      return operationResult(command, { kind: "success", created: null });
    } catch (error) {
      if (error instanceof Rejected) return operationResult(command, { kind: "rejected_by_host", reason: error.reason });
      if (error instanceof ProfileFailed) return operationResult(command, apiError(error.outcome));
      return operationResult(command, { kind: "transport_error", description: "Host command execution failed." });
    }
  };
}
