import { record, integer } from "./parse.ts";
import type { Fetch, BotApi, BotApiOutcome, TelegramUserProfile } from "./types.ts";

export function fetchBotApi(input: { token: string; fetch?: Fetch }): BotApi {
  const fetcher = input.fetch ?? ((request: Request) => fetch(request));
  const request = async (method: string, params: unknown): Promise<{ ok: true; result: unknown } | Extract<BotApiOutcome, { ok: false }>> => {
    try {
      const response = await fetcher(new Request(`https://api.telegram.org/bot${input.token}/${method}`, { method: "POST", body: JSON.stringify(params), headers: { "Content-Type": "application/json" }, redirect: "manual" }));
      if (response.status >= 300 && response.status < 400) return { ok: false, kind: "transport", description: "Telegram request failed." };
      const body = record(await response.json());
      if (body?.ok === true) return { ok: true, result: body.result };
      const parameters = record(body?.parameters);
      if (body?.ok === false && integer(body.error_code) && typeof body.description === "string") return { ok: false, kind: "telegram", errorCode: body.error_code, description: body.description.slice(0, 1024), retryAfter: integer(parameters?.retry_after) ? parameters.retry_after : null };
    } catch { /* The host owns retry policy. */ }
    return { ok: false, kind: "transport", description: "Telegram request failed." };
  };
  return {
    async call(call) {
      const response = await request(call.method, call.params);
      if (!response.ok) return response;
      const result = record(response.result);
      if (call.method === "createForumTopic") {
        return integer(result?.message_thread_id) && result.message_thread_id > 0 ? { ok: true, threadId: result.message_thread_id } : { ok: false, kind: "transport", description: "Telegram topic response was malformed." };
      }
      if (call.method === "sendMessage" || call.method === "copyMessage") {
        return integer(result?.message_id) && result.message_id > 0 ? { ok: true, messageId: result.message_id } : { ok: false, kind: "transport", description: "Telegram message response was malformed." };
      }
      return { ok: true };
    },
    async getProfile(query) {
      const response = await request("getChat", { chat_id: query.chatId });
      if (!response.ok) return response;
      const chat = record(response.result);
      if (!chat || chat.type !== "private" || chat.id !== query.chatId) return { ok: false, kind: "transport", description: "Telegram profile response was malformed." };
      const profile: TelegramUserProfile = {};
      if (typeof chat.first_name === "string") profile.firstName = chat.first_name;
      if (typeof chat.last_name === "string") profile.lastName = chat.last_name;
      if (typeof chat.username === "string") profile.username = chat.username;
      return { ok: true, profile };
    },
    async getMe() {
      const response = await request("getMe", {});
      const bot = response.ok ? record(response.result) : null;
      if (!bot || !integer(bot.id) || typeof bot.username !== "string" || bot.is_bot !== true) throw new Error("Bot identity could not be verified.");
      return { id: bot.id, username: bot.username };
    },
    async inspectGroup(chatId, botId) {
      const chatResponse = await request("getChat", { chat_id: chatId });
      const memberResponse = await request("getChatMember", { chat_id: chatId, user_id: botId });
      const chat = chatResponse.ok ? record(chatResponse.result) : null;
      const member = memberResponse.ok ? record(memberResponse.result) : null;
      if (!chat || !member || chat.id !== chatId) return { found: false };
      return { found: true, isForum: chat.type === "supergroup" && chat.is_forum === true, botStatus: typeof member.status === "string" ? member.status : "unknown", canManageTopics: member.can_manage_topics === true || member.status === "creator" };
    },
  };
}
