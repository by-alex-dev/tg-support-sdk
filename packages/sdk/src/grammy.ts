import { GrammyError, type Api, type Bot, type Context, type MiddlewareFn } from "grammy";
import { createTgSupport } from "./index.ts";
import { validateConfig, telegramBotId } from "./config.ts";
import { registerBot } from "./startup.ts";
import { NotStartedError, ServiceError } from "./errors.ts";
import { record, integer } from "./parse.ts";
import type { BotApi, BotApiOutcome, TgSupport, TgSupportConfig, TgSupportEvent, TgSupportOptions } from "./types.ts";

const failure = (error: unknown): Extract<BotApiOutcome, { ok: false }> => error instanceof GrammyError
  ? { ok: false, kind: "telegram", errorCode: error.error_code, description: error.description.slice(0, 1024), retryAfter: integer(error.parameters.retry_after) ? error.parameters.retry_after : null }
  : { ok: false, kind: "transport", description: "Telegram request failed." };

export function grammyBotApi(api: Api): BotApi {
  return {
    async call(request) {
      try {
        // The SDK accepts protocol JSON entities; grammY's raw overloads require Telegram-specific entity unions.
        // Forward the already-authorized method and payload without narrowing away future Telegram fields.
        const value: unknown = await Reflect.apply(api.raw[request.method], api.raw, [request.params]);
        const result = record(value);
        if (request.method === "createForumTopic") return integer(result?.message_thread_id) && result.message_thread_id > 0
          ? { ok: true, threadId: result.message_thread_id } : { ok: false, kind: "transport", description: "Telegram topic response was malformed." };
        if (request.method === "sendMessage" || request.method === "copyMessage") return integer(result?.message_id) && result.message_id > 0
          ? { ok: true, messageId: result.message_id } : { ok: false, kind: "transport", description: "Telegram message response was malformed." };
        return { ok: true };
      } catch (error) { return failure(error); }
    },
    async getProfile(query) {
      try {
        const chat = await api.getChat(query.chatId);
        if (chat.type !== "private" || chat.id !== query.chatId) return { ok: false, kind: "transport", description: "Telegram profile response was malformed." };
        return { ok: true, profile: { firstName: chat.first_name, ...(chat.last_name ? { lastName: chat.last_name } : {}), ...(chat.username ? { username: chat.username } : {}) } };
      } catch (error) { return failure(error); }
    },
    async getMe() { const me = await api.getMe(); return { id: me.id, username: me.username }; },
    async inspectGroup(chatId, botId) {
      try {
        const chat = await api.getChat(chatId), member = await api.getChatMember(chatId, botId);
        if (chat.id !== chatId) return { found: false };
        return { found: true, isForum: chat.type === "supergroup" && chat.is_forum === true, botStatus: member.status,
          canManageTopics: member.status === "creator" || member.status === "administrator" && member.can_manage_topics === true,
          canPinMessages: member.status === "creator" || member.status === "administrator" && member.can_pin_messages === true };
      } catch { return { found: false }; }
    },
  };
}

export type GrammyTgSupport<C extends Context = Context> = TgSupport & {
  start(): Promise<void>;
  middleware(onEvents?: (events: TgSupportEvent[]) => void | Promise<void>): MiddlewareFn<C>;
  poll(): Promise<void>;
};

export function createGrammyTgSupport<C extends Context>(bot: Bot<C>, input: TgSupportConfig, options: TgSupportOptions = {}): GrammyTgSupport<C> {
  const config = validateConfig(input), botId = telegramBotId(bot.token), api = grammyBotApi(bot.api);
  const core = createTgSupport({ config, botApi: api, telegramBotId: botId, ...options });
  let started = false, starting: Promise<void> | undefined;
  const ready = () => { if (!started) throw new NotStartedError(); };
  const tgSupport: GrammyTgSupport<C> = {
    ...core,
    async start() {
      if (started) return;
      starting ??= registerBot(config, botId, { ...api, async getMe() {
        const me = await bot.api.getMe(); bot.botInfo = me; return { id: me.id, username: me.username };
      } }, options).then(() => { started = true; }).finally(() => { starting = undefined; });
      await starting;
    },
    async normalize(update) { ready(); return core.normalize(update); },
    async execute(command) { ready(); return core.execute(command); },
    async receivePush(request) { return started ? core.receivePush(request) : { response: new Response(null, { status: 503 }), commands: [] }; },
    async handleUpdate(update, context) { ready(); return core.handleUpdate(update, context); },
    async handleCommandRequest(request, context) { return started ? core.handleCommandRequest(request, context) : new Response(null, { status: 503 }); },
    middleware(onEvents) {
      return async (ctx, next) => {
        const event = await tgSupport.normalize(ctx.update);
        if (event) {
          if (onEvents) await onEvents([event]);
          else { const sent = await core.send([event]); if (sent.kind !== "accepted") throw new ServiceError(sent); }
        }
        await next();
      };
    },
    async poll() {
      ready();
      if (config.transport.kind !== "pull") throw new Error("poll() requires pull transport.");
      for (const command of await core.claim()) {
        const event = await core.execute(command);
        if (event) { const sent = await core.send([event]); if (sent.kind !== "accepted") throw new ServiceError(sent); }
      }
    },
  };
  return tgSupport;
}
