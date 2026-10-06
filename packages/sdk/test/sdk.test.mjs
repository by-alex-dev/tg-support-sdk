import assert from "node:assert/strict";
import { test } from "node:test";
import { createHmac, createDecipheriv } from "node:crypto";
import { createWebTgSupport, configure, ServiceError } from "../src/index.ts";

const config = {
  botToken: "12345:telegram-test-token",
  service: { url: "https://tg-support.example/v1", botSecret: `tgs1.00000000-0000-4000-8000-000000000007.${Buffer.alloc(32).toString("base64url")}` },
  keys: { tokenKey: Uint8Array.from({ length: 32 }, (_, i) => i), seal: { current: "Ab3x", keys: { Ab3x: new Uint8Array(32) } } },
  supportGroupId: -1001234567890,
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: "https://host.example/tg-support?version=1" },
  configRevision: 1,
};

test("normalization matches independent LP32BE HMAC vectors and performs no startup I/O", async () => {
  const tgSupport = createWebTgSupport(config, { fetch: async () => { throw new Error("Unexpected network access"); } });
  const event = await tgSupport.normalize({
    update_id: 101,
    message: { message_id: 42, date: 1, chat: { id: 123456789, type: "private" },
      from: { id: 123456789, is_bot: false, first_name: "Алексей", username: "alex", language_code: "ru" }, text: "Sensitive message" },
  });
  assert.equal(event?.type, "user_message");
  // Fixed separately with Python's hashlib/hmac and UTF-8 byte lengths, not with SDK helpers.
  assert.equal(event.user, "g8M2OyR9FtTozaq8_Z_0vzJcrh8QUds6vY5A6ylWLm0");
  assert.equal(event.message, "LMrOtEnUUwyuHxFhej1I89AWNVlFVT6GgdjiLXJOsFM");
  assert.equal(event.profile, "dfa-VNF3my9FDXYQKIYmWPxUlRtZrvkoeIJ-BfeZAtk");
  assert.equal(JSON.stringify(event).includes("Sensitive message"), false);
  const [version, kid, nonce, encoded] = event.chat.split(".");
  assert.equal(version, "s1");
  assert.equal(kid, "Ab3x");
  assert.equal(Buffer.from(nonce, "base64url").length, 12);
  const ciphertext = Buffer.from(encoded, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", Buffer.alloc(32), Buffer.from(nonce, "base64url"));
  // Python struct.pack('>I', ...) fixed this AAD, including the decoded 32-byte user token.
  decipher.setAAD(Buffer.from("00000009544753312d5345414c0000000531323334350000000c707269766174655f636861740000002083c3363b247d16d4e8cdaabcfd9ff4bf325cae1f1051db3abd8e40eb29562e6d", "hex"));
  decipher.setAuthTag(ciphertext.subarray(-16));
  assert.deepEqual(JSON.parse(Buffer.concat([decipher.update(ciphertext.subarray(0, -16)), decipher.final()]).toString("utf8")), { chat_id: 123456789 });
});

test("push challenge verifies original bytes and the configured path despite a proxy rewrite", async () => {
  const now = 1700000000000;
  const tgSupport = createWebTgSupport(config, { clock: { now: () => now } });
  const body = '{ "kind": "challenge", "nonce": "aaaaaaaaaaaaaaaaaaaaaa" }';
  const signature = createHmac("sha256", Buffer.alloc(32)).update(`TGS1-REQ\n1700000000\nPOST\n/tg-support?version=1\n${body}`).digest("hex");
  const request = new Request("https://internal.example/rewritten", { method: "POST", body, headers: {
    "X-Tg-Support-Bot": "00000000-0000-4000-8000-000000000007", "X-Tg-Support-Timestamp": "1700000000", "X-Tg-Support-Signature": `v2=ignored,v1=${signature}`,
  } });
  const { response, commands } = await tgSupport.receivePush(request);
  assert.equal(response.status, 200);
  assert.deepEqual(commands, []);
  assert.deepEqual(await response.json(), { kind: "challenge", response: createHmac("sha256", Buffer.alloc(32)).update(`TGS1-CHALLENGE\n${config.transport.hostUrl}\naaaaaaaaaaaaaaaaaaaaaa`).digest("hex") });
  const forged = new Request("https://internal.example/rewritten", { method: "POST", body: body + " ", headers: request.headers });
  assert.equal((await tgSupport.receivePush(forged)).response.status, 401);
});

test("claim rejects an unauthenticated response rather than treating it as an empty queue", async () => {
  const tgSupport = createWebTgSupport(config, { clock: { now: () => 1700000000000 }, fetch: async () => Response.json({ commands: [] }) });
  await assert.rejects(tgSupport.claim(), (error) => error instanceof ServiceError && error.result.kind === "fatal" && error.result.reason === "bad_signature");
});

test("command authorization prevents another user's ciphertext reaching Telegram and ignores extra Bot API fields", async () => {
  const requests = [];
  const now = 1700000000000;
  const tgSupport = createWebTgSupport(config, { clock: { now: () => now }, fetch: async (request) => {
    requests.push({ path: new URL(request.url).pathname, body: await request.json() });
    return Response.json({ ok: true, result: { message_id: 777 } });
  } });
  const message = (id) => ({ update_id: id, message: { message_id: 42, date: 1, chat: { id, type: "private" }, from: { id, is_bot: false, first_name: "User" }, text: "secret" } });
  const own = await tgSupport.normalize(message(123456789));
  const other = await tgSupport.normalize(message(987654321));
  const command = { opId: "1", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: own.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000,
    method: "copyMessage", params: { chat_id: { sealed: own.chat }, from_chat_id: { sealed: own.chat }, message_id: { sealed: other.messageId }, protect_content: true, reply_markup: { injected: true } } };
  const rejected = await tgSupport.execute(command);
  assert.equal(rejected.outcome.kind, "rejected_by_host");
  assert.equal(rejected.outcome.reason, "blob_invalid");
  assert.deepEqual(requests, []);
  const accepted = await tgSupport.execute({ ...command, attemptToken: "bbbbbbbbbbbbbbbbbbbbbg", params: { ...command.params, message_id: { sealed: own.messageId } } });
  assert.equal(accepted.outcome.kind, "success");
  assert.deepEqual(requests, [{ path: "/bot12345:telegram-test-token/copyMessage", body: { chat_id: 123456789, from_chat_id: 123456789, message_id: 42 } }]);
  requests.length = 0;
  assert.equal(await tgSupport.execute({ ...command, attemptToken: "cccccccccccccccccccccg", expiresAt: now }), null);
  assert.deepEqual(requests, []);
});

test("unknown and wrong-slot template IDs are rejected without reaching Telegram", async () => {
  const requests = [];
  const now = 1700000000000;
  const tgSupport = createWebTgSupport(config, { clock: { now: () => now }, fetch: async (request) => {
    requests.push(request);
    throw new Error("Unexpected Telegram request");
  } });
  const event = await tgSupport.normalize({ update_id: 2, message: { message_id: 42, chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false, first_name: "User", language_code: "ru" }, text: "secret" } });
  const command = { opId: "1", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: event.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000, method: "sendMessage" };
  const reference = { language: { sealed: event.language }, user: { sealed: event.chat } };
  for (const [text, reason] of [
    [{ template: "unknown_template_id", ...reference }, "unknown_template"],
    [{ template: "topic_title", ...reference }, "unknown_template"],
    [{ template: 42, ...reference }, "malformed"],
    [{ template: "unknown_template_id", user: reference.user }, "malformed"],
  ]) {
    const result = await tgSupport.execute({ ...command, params: { chat_id: { sealed: event.chat }, text } });
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, reason);
  }
  const result = await tgSupport.execute({ ...command, binding: event.language, params: { chat_id: { sealed: event.chat }, text: { template: "unknown_template_id", ...reference } } });
  assert.equal(result.outcome.kind, "rejected_by_host");
  assert.equal(result.outcome.reason, "binding_invalid");
  assert.deepEqual(requests, []);
});

test("explicit configuration and execution preserve profile topic tags and the pinned-header mention", async () => {
  const seen = [];
  let configured;
  const options = { clock: { now: () => 1700000000000 }, resolveProfile: async () => ({ firstName: "Changed", username: "current" }), fetch: async (request) => {
    const method = new URL(request.url).pathname.split("/").at(-1);
    const body = await request.json();
    if (method === "events") { configured = body.events[0]; return new Response(null, { status: 202 }); }
    if (method === "getMe") return Response.json({ ok: true, result: { id: 12345, is_bot: true, username: "demo" } });
    if (method === "getChat") return Response.json({ ok: true, result: { id: config.supportGroupId, type: "supergroup", is_forum: true } });
    if (method === "getChatMember") return Response.json({ ok: true, result: { status: "administrator", can_manage_topics: true } });
    seen.push({ method, body });
    return Response.json({ ok: true, result: method === "createForumTopic" ? { message_thread_id: 55 } : { message_id: 77 } });
  } };
  await configure(config, options);
  assert.equal(configured.telegram_bot_id, 12345);
  assert.equal(configured.config_revision, 1);
  const tgSupport = createWebTgSupport(config, options);
  const event = await tgSupport.normalize({ update_id: 2, message: { message_id: 42, chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false, first_name: "Old", language_code: "ru" }, text: "secret" } });
  const common = { subject: event.user, binding: null, opId: "2", deadlineSeconds: 60, receivedAt: 1700000000000, expiresAt: 1700000060000 };
  const profile = { language: { sealed: event.language }, user: { sealed: event.chat } };
  const result = await tgSupport.execute({ ...common, attemptToken: "dddddddddddddddddddddg", method: "createForumTopic", params: { chat_id: { sealed: configured.group_chat }, name: { template: "topic_title", ...profile } } });
  assert.equal(result.outcome.kind, "success");
  assert.equal(seen[0].body.name, "Changed • (#u123456789)");
  await tgSupport.execute({ ...common, attemptToken: "eeeeeeeeeeeeeeeeeeeeeg", method: "sendMessage", params: { chat_id: { sealed: configured.group_chat }, message_thread_id: { sealed: result.outcome.created.threadId }, text: { template: "topic_header", ...profile } } });
  assert.equal(seen[1].body.message_thread_id, 55);
  assert.equal(seen[1].body.entities[0].url, "tg://user?id=123456789");
  assert.equal(seen[1].body.text.includes("Changed @current (#u123456789)"), true);
});

test("a notice reply copies the operator message to its user and topic while preserving notice and user binding", async () => {
  const now = 1700000000000;
  const seen = [];
  let configured;
  let threadId = 55;
  let noticeId = 700;
  const options = { clock: { now: () => now }, resolveProfile: async () => ({ firstName: "User" }), fetch: async (request) => {
    const method = new URL(request.url).pathname.split("/").at(-1);
    const body = await request.json();
    if (method === "events") { configured = body.events[0]; return new Response(null, { status: 202 }); }
    if (method === "getMe") return Response.json({ ok: true, result: { id: 12345, is_bot: true, username: "demo" } });
    if (method === "getChat") return Response.json({ ok: true, result: { id: config.supportGroupId, type: "supergroup", is_forum: true } });
    if (method === "getChatMember") return Response.json({ ok: true, result: { status: "administrator", can_manage_topics: true } });
    seen.push({ method, body });
    if (method === "createForumTopic") return Response.json({ ok: true, result: { message_thread_id: threadId++ } });
    if (method === "sendMessage") { const message_id = noticeId; noticeId += 10; return Response.json({ ok: true, result: { message_id } }); }
    return Response.json({ ok: true, result: { message_id: 900 } });
  } };
  const enabled = { ...config, features: { ...config.features, notificationsTopic: true } };
  await configure(enabled, options);
  const tgSupport = createWebTgSupport(enabled, options);
  const user = async (id) => tgSupport.normalize({ update_id: id, message: {
    message_id: 10, chat: { id, type: "private" }, from: { id, is_bot: false, first_name: "User", language_code: "ru" }, text: "Help",
  } });
  const own = await user(123456789);
  const other = await user(987654321);
  const common = { opId: "20", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: own.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000 };
  const reference = (event) => ({ language: { sealed: event.language }, user: { sealed: event.chat } });
  const topic = await tgSupport.execute({ ...common, method: "createForumTopic", params: {
    chat_id: { sealed: configured.group_chat }, name: { template: "topic_title", ...reference(own) },
  } });
  assert.equal(topic.outcome.kind, "success", JSON.stringify(topic.outcome));
  const notifications = await tgSupport.execute({ ...common, method: "createForumTopic", params: {
    chat_id: { sealed: configured.group_chat }, name: { template: "notifications_topic_title", language: { sealed: own.language } },
  } });
  assert.equal(notifications.outcome.kind, "success", JSON.stringify(notifications.outcome));
  const notice = async (event) => tgSupport.execute({ ...common, subject: event.user, method: "sendMessage", params: {
    chat_id: { sealed: configured.group_chat }, message_thread_id: { sealed: notifications.outcome.created.threadId },
    text: { template: "new_user_notice", ...reference(event) },
  } });
  const notified = await notice(own);
  assert.equal(notified.outcome.kind, "success");
  const reply = await tgSupport.normalize({ update_id: 999, message: {
    message_id: 701, message_thread_id: 56, chat: { id: config.supportGroupId, type: "supergroup" },
    from: { id: 555, is_bot: false }, reply_to_message: { message_id: 700 }, text: "Operator answer",
  } });
  assert.equal(reply.type, "support_message");
  assert.equal(reply.replyTo, notified.outcome.created.message);
  const command = { ...common, binding: notified.outcome.created.binding, method: "copyMessage", params: {
    chat_id: { sealed: own.chat }, from_chat_id: { sealed: configured.group_chat }, message_id: { sealed: reply.replyScopedMessageId },
  } };
  assert.equal((await tgSupport.execute(command)).outcome.kind, "success");
  assert.equal((await tgSupport.execute({ ...command, params: { ...command.params,
    chat_id: { sealed: configured.group_chat }, message_thread_id: { sealed: topic.outcome.created.threadId },
  } })).outcome.kind, "success");
  assert.deepEqual(seen.filter((item) => item.method === "copyMessage"), [
    { method: "copyMessage", body: { chat_id: 123456789, from_chat_id: config.supportGroupId, message_id: 701 } },
    { method: "copyMessage", body: { chat_id: config.supportGroupId, message_thread_id: 55, from_chat_id: config.supportGroupId, message_id: 701 } },
  ]);

  const anotherNotice = await notice(own);
  const anotherUser = await notice(other);
  const before = seen.length;
  for (const [binding, reason] of [
    [anotherNotice.outcome.created.binding, "blob_invalid"],
    [anotherUser.outcome.created.binding, "binding_invalid"],
  ]) {
    const result = await tgSupport.execute({ ...command, binding });
    assert.deepEqual(result.outcome, { kind: "rejected_by_host", reason });
  }
  assert.equal(seen.length, before);
});

test("host templates receive the authenticated user ID instead of unchecked profile metadata", async () => {
  const seen = [];
  const now = 1700000000000;
  const custom = { ...config, templates: { languages: ["ru", "en"], fallback: "en", overrides: {
    topic_header: { ru: ({ profile, verifiedUserId }) => ({
      text: profile?.firstName ?? "User",
      entities: verifiedUserId === null ? [] : [{ type: "text_link", offset: 0, length: 7, url: `tg://user?id=${verifiedUserId}` }],
    }) },
  } } };
  const tgSupport = createWebTgSupport(custom, {
    clock: { now: () => now },
    resolveProfile: async () => ({ firstName: "Display", id: 987654321, languageCode: "en" }),
    fetch: async (request) => { seen.push(await request.json()); return Response.json({ ok: true, result: { message_id: 77 } }); },
  });
  const user = async (id) => tgSupport.normalize({ update_id: id, message: {
    message_id: 42, chat: { id, type: "private" }, from: { id, is_bot: false, first_name: "Old", language_code: "ru" }, text: "Help",
  } });
  const own = await user(123456789);
  const other = await user(987654321);
  const command = { opId: "30", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: own.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000,
    method: "sendMessage", params: { chat_id: { sealed: own.chat }, text: { template: "topic_header", language: { sealed: own.language }, user: { sealed: own.chat } } } };
  assert.equal((await tgSupport.execute(command)).outcome.kind, "success");
  assert.deepEqual(seen, [{ chat_id: 123456789, text: "Display", entities: [{ type: "text_link", offset: 0, length: 7, url: "tg://user?id=123456789" }] }]);
  const rejected = await tgSupport.execute({ ...command, params: { ...command.params, text: { ...command.params.text, user: { sealed: other.chat } } } });
  assert.deepEqual(rejected.outcome, { kind: "rejected_by_host", reason: "blob_invalid" });
  assert.equal(seen.length, 1);
});

test("missing host translations use the default language and missing host templates keep the SDK text", async () => {
  const seen = [];
  const now = 1700000000000;
  const tgSupport = createWebTgSupport({ ...config, templates: { languages: ["ru", "en"], fallback: "en", overrides: {
    welcome_hint: { en: ({ language, verifiedUserId }) => ({ text: `Host fallback: ${language}, ${verifiedUserId}` }) },
  } } }, { clock: { now: () => now }, fetch: async (request) => {
    seen.push(await request.json()); return Response.json({ ok: true, result: { message_id: 77 } });
  } });
  const user = async (language_code) => tgSupport.normalize({ update_id: 42, message: {
    message_id: 10, chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false, language_code }, text: "Help",
  } });
  const ru = await user("ru");
  const fr = await user("fr-CA");
  const pt = await user("pt");
  const command = (event, template) => ({ opId: "40", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: event.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000,
    method: "sendMessage", params: { chat_id: { sealed: event.chat }, text: { template, language: { sealed: event.language } } } });
  for (const event of [ru, fr]) assert.equal((await tgSupport.execute(command(event, "welcome_hint"))).outcome.kind, "success");
  assert.equal((await tgSupport.execute(command(ru, "user_edited"))).outcome.kind, "success");
  const builtinFallback = createWebTgSupport({ ...config, templates: { languages: ["ru", "en", "pt"], fallback: "ru" } }, {
    clock: { now: () => now }, fetch: async (request) => { seen.push(await request.json()); return Response.json({ ok: true, result: { message_id: 77 } }); },
  });
  assert.equal((await builtinFallback.execute(command(pt, "welcome_hint"))).outcome.kind, "success");
  assert.deepEqual(seen, [
    { chat_id: 123456789, text: "Host fallback: en, null" },
    { chat_id: 123456789, text: "Host fallback: en, null" },
    { chat_id: 123456789, text: "✏️ Пользователь изменил сообщение." },
    { chat_id: 123456789, text: "Если нужна помощь — просто напишите в этот чат, мы передадим сообщение в поддержку." },
  ]);
});
