import assert from "node:assert/strict";
import { test } from "node:test";
import { Bot } from "grammy";
import { createHmac } from "node:crypto";
import { createGrammyTgSupport } from "../src/grammy.ts";
import { StartupError } from "../src/index.ts";

const now = 1700000000000;
const key = Buffer.alloc(32);
const config = {
  service: { url: "https://tg-support.example/v1", botSecret: `tgs1.00000000-0000-4000-8000-000000000007.${key.toString("base64url")}` },
  keys: { tokenKey: new Uint8Array(32), seal: { current: "Ab3x", keys: { Ab3x: new Uint8Array(32) } } },
  supportGroupId: -1001234567890, features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: "https://host.example/commands?version=1" }, configRevision: 1,
};
const privateUpdate = { update_id: 1, message: { message_id: 42, date: 1, chat: { id: 123456789, type: "private" },
  from: { id: 123456789, is_bot: false, first_name: "User", language_code: "ru" }, text: "Sensitive question" } };

test("real grammY middleware, startup and both command transports execute a complete correspondence", async () => {
  for (const transport of [config.transport, { kind: "pull" }]) {
    const calls = [], events = [], pending = [];
    let failure = null;
    const bot = new Bot("12345:test-token");
    bot.api.config.use(async (_previous, method, payload) => {
      calls.push({ method, payload });
      if (method === "copyMessage" && failure) {
        if (failure instanceof Error) throw failure;
        return failure;
      }
      const result = method === "getMe" ? { id: 12345, is_bot: true, username: "demo", first_name: "Demo" }
        : method === "getChat" ? payload.chat_id === config.supportGroupId
          ? { id: config.supportGroupId, type: "supergroup", is_forum: true }
          : { id: payload.chat_id, type: "private", first_name: "Current profile" }
        : method === "getChatMember" ? { status: "administrator", can_manage_topics: true }
        : method === "createForumTopic" ? { message_thread_id: 55 }
        : { message_id: method === "copyMessage" ? 700 : 701 };
      return { ok: true, result };
    });
    const tgSupport = createGrammyTgSupport(bot, { ...config, transport }, { clock: { now: () => now }, fetch: async request => {
      const bytes = await request.text(), route = new URL(request.url).pathname;
      assert.equal(request.headers.get("X-Tg-Support-Signature"), `v1=${createHmac("sha256", key).update(`TGS1-REQ\n1700000000\nPOST\n${route}\n${bytes}`).digest("hex")}`);
      if (route.endsWith("/events")) { events.push(...JSON.parse(bytes).events); return new Response(null, { status: 202 }); }
      assert.equal(route, "/v1/commands/claim");
      const body = JSON.stringify({ commands: pending.splice(0) });
      return new Response(body, { headers: { "X-Tg-Support-Timestamp": "1700000000", "X-Tg-Support-Signature": `v1=${createHmac("sha256", key).update(`TGS1-RES\n1700000000\n200\n${route}\n${body}`).digest("hex")}` } });
    } });
    await assert.rejects(tgSupport.normalize(privateUpdate), { name: "NotStartedError" });
    assert.equal((await tgSupport.receivePush(new Request(config.transport.hostUrl))).response.status, 503);
    assert.equal(calls.length, 0);
    await tgSupport.start();
    await tgSupport.start();
    assert.equal(events.filter(event => event.type === "bot_configured").length, 1);
    assert.deepEqual(calls.map(call => call.method), ["getMe", "getChat", "getChatMember"]);
    let afterMiddleware = 0;
    bot.use(tgSupport.middleware());
    bot.use(() => { afterMiddleware++; });
    await bot.init();
    await bot.handleUpdate(privateUpdate);
    assert.equal(afterMiddleware, 1);
    const user = events.find(event => event.type === "user_message"), configured = events[0];
    assert.ok(user);
    const dispatch = async command => {
      if (transport.kind === "pull") { pending.push(command); await tgSupport.poll(); }
      else {
        const body = JSON.stringify({ kind: "commands", commands: [command] }), work = [];
        const response = await tgSupport.handleCommandRequest(new Request("https://internal.example/rewrite", { method: "POST", body,
          headers: { "X-Tg-Support-Timestamp": "1700000000", "X-Tg-Support-Signature": `v1=${createHmac("sha256", key).update(`TGS1-REQ\n1700000000\nPOST\n/commands?version=1\n${body}`).digest("hex")}` } }), { waitUntil: promise => work.push(promise) });
        assert.equal(response.status, 202); await Promise.all(work);
      }
      return events.filter(event => event.type === "operation_result").at(-1);
    };
    const base = { op_id: "1", attempt_token: "aaaaaaaaaaaaaaaaaaaaaa", deadline_seconds: 60, subject: user.user, binding: null };
    const topic = await dispatch({ ...base, method: "createForumTopic", params: { chat_id: { sealed: configured.group_chat },
      name: { template: "topic_title", language: { sealed: user.language }, user: { sealed: user.chat } } } });
    assert.equal(topic.outcome.kind, "success");
    const bound = { ...base, binding: topic.outcome.created.binding };
    assert.equal((await dispatch({ ...bound, op_id: "2", attempt_token: "bbbbbbbbbbbbbbbbbbbbbg", method: "copyMessage", params: {
      chat_id: { sealed: configured.group_chat }, message_thread_id: { sealed: topic.outcome.created.thread_id }, from_chat_id: { sealed: user.chat }, message_id: { sealed: user.message_id },
    } })).outcome.kind, "success");
    await bot.handleUpdate({ update_id: 2, message: { message_id: 90, date: 1, message_thread_id: 55,
      chat: { id: config.supportGroupId, type: "supergroup" }, from: { id: 555, is_bot: false, first_name: "Operator" }, text: "Support answer" } });
    const support = events.find(event => event.type === "support_message");
    assert.equal((await dispatch({ ...bound, op_id: "3", attempt_token: "cccccccccccccccccccccg", method: "copyMessage", params: {
      chat_id: { sealed: user.chat }, from_chat_id: { sealed: configured.group_chat }, message_id: { sealed: support.message_id },
    } })).outcome.kind, "success");
    assert.deepEqual(calls.filter(call => call.method === "copyMessage").map(call => call.payload), [
      { chat_id: config.supportGroupId, message_thread_id: 55, from_chat_id: 123456789, message_id: 42 },
      { chat_id: 123456789, from_chat_id: config.supportGroupId, message_id: 90 },
    ]);
    assert.equal(JSON.stringify(events).includes("Sensitive question"), false);
    const reply = { ...bound, op_id: "4", attempt_token: "dddddddddddddddddddddg", method: "copyMessage", params: {
      chat_id: { sealed: user.chat }, from_chat_id: { sealed: configured.group_chat }, message_id: { sealed: support.message_id },
    } };
    failure = { ok: false, error_code: 429, description: "Too Many Requests: retry after 30", parameters: { retry_after: 30, migrate_to_chat_id: -1009876543210 } };
    assert.deepEqual((await dispatch(reply)).outcome, { kind: "telegram_error", error_code: 429, description: failure.description, retry_after: 30 });
    failure = new Error("External transport failure with private details");
    const transportFailure = await dispatch({ ...reply, attempt_token: "eeeeeeeeeeeeeeeeeeeeeg" });
    assert.equal(transportFailure.outcome.kind, "transport_error");
    assert.equal(JSON.stringify(transportFailure).includes(failure.message), false);
  }
});

test("grammY startup reports all group problems before sending configuration", async () => {
  const bot = new Bot("12345:test-token"), sent = [];
  bot.api.config.use(async (_previous, method) => ({ ok: true, result: method === "getMe"
    ? { id: 12345, is_bot: true, username: "demo", first_name: "Demo" }
    : method === "getChat" ? { id: config.supportGroupId, type: "supergroup", is_forum: false }
    : { status: "member" } }));
  const tgSupport = createGrammyTgSupport(bot, config, { fetch: async request => { sent.push(request); return new Response(null, { status: 202 }); } });
  await assert.rejects(tgSupport.start(), error => error instanceof StartupError &&
    ["support_group_not_forum", "bot_not_administrator", "bot_cannot_manage_topics"].every(reason => error.problems.includes(reason)) &&
    /Enable Topics/.test(error.message) && /administrator/.test(error.message) && /Manage Topics/.test(error.message));
  assert.deepEqual(sent, []);
});
