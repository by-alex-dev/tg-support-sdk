import { createKeyring } from "./crypto.ts";
import { createNormalizer } from "./normalize.ts";
import type { BotApi, TgSupportConfig, TgSupportOptions, TgSupport } from "./types.ts";
import { validateConfig, telegramBotId } from "./config.ts";
import { createServiceLink } from "./link.ts";
import { createExecutor } from "./execute.ts";
import { fetchBotApi } from "./bot-api.ts";
import { registerBot } from "./startup.ts";
export { generateKeys, parseKeys } from "./crypto.ts";
export { ConfigError, StartupError, ServiceError, NotStartedError } from "./errors.ts";
export type * from "./types.ts";
export { fetchBotApi } from "./bot-api.ts";
/** The update types a Host's webhook or polling must request from Telegram (`allowed_updates`); the same list as `TgSupport.allowedUpdates`. */
export const allowedUpdates: readonly string[] = Object.freeze(["message", "edited_message", "message_reaction", "callback_query"]);
export function createTgSupport(input: { config: TgSupportConfig; botApi: BotApi; telegramBotId: number } & TgSupportOptions): TgSupport {
  const { config: original, botApi, telegramBotId: botId, ...options } = input;
  const config = validateConfig(original);
  let normalizer: ReturnType<typeof createNormalizer> | undefined;
  let executor: ReturnType<typeof createExecutor> | undefined;
  const modules = () => {
    if (!normalizer || !executor) { const keys = createKeyring(config.keys, botId); normalizer = createNormalizer(config, botId, keys); executor = createExecutor(config, keys, botApi, options); }
    return { normalizer, executor };
  };
  const link = createServiceLink(config, options);
  const tgSupport: TgSupport = {
    allowedUpdates,
    normalize: (update) => modules().normalizer.normalize(update),
    hostNotice: (user, text, idempotencyKey) => modules().normalizer.hostNotice(user, text, idempotencyKey),
    userForget: (userId) => modules().normalizer.userForget(userId),
    execute: (command) => modules().executor(command),
    ...link,
    async handleUpdate(update, context = {}) {
      const event = await tgSupport.normalize(update);
      if (!event) return;
      const sending = tgSupport.send([event]).then((result) => { if (result.kind !== "accepted") options.logger?.warn?.({ kind: "event_not_accepted", reason: result.reason }); }).catch(() => options.logger?.warn?.({ kind: "event_send_failed" }));
      if (context.waitUntil) context.waitUntil(sending); else await sending;
    },
    async handleCommandRequest(request, context = {}) {
      const received = await tgSupport.receivePush(request);
      if (received.commands.length) {
        const execution = (async () => {
          for (const command of received.commands) { const result = await tgSupport.execute(command); if (result) { const sent = await tgSupport.send([result]); if (sent.kind !== "accepted") options.logger?.warn?.({ kind: "result_not_accepted", reason: sent.reason }); } }
        })().catch(() => options.logger?.warn?.({ kind: "command_execution_failed" }));
        context.waitUntil?.(execution);
      }
      return received.response;
    },
  };
  return tgSupport;
}
export function createWebTgSupport(input: TgSupportConfig & { botToken: string }, options: TgSupportOptions = {}): TgSupport {
  const config = validateConfig(input);
  const botId = telegramBotId(input.botToken);
  return createTgSupport({ config, telegramBotId: botId, botApi: fetchBotApi({ token: input.botToken, ...(options.fetch ? { fetch: options.fetch } : {}) }), ...options });
}
export async function configure(input: TgSupportConfig & { botToken: string }, options: TgSupportOptions = {}): Promise<void> {
  const config = validateConfig(input);
  const botId = telegramBotId(input.botToken);
  const api = fetchBotApi({ token: input.botToken, ...(options.fetch ? { fetch: options.fetch } : {}) });
  await registerBot(config, botId, api, options);
}
