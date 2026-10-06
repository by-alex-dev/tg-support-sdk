import assert from "node:assert/strict";
import { test } from "node:test";
import { createHmac, createDecipheriv, createCipheriv } from "node:crypto";
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

async function correspondenceHost(configuration = config, userId = 123456789) {
  const now = 1700000000000;
  const calls = [];
  let configured;
  let nextMessage = 700;
  let nextThread = 55;
  let failure = null;
  const options = { clock: { now: () => now }, resolveProfile: async () => ({ firstName: "User" }), fetch: async (request) => {
    const method = new URL(request.url).pathname.split("/").at(-1);
    const params = await request.json();
    if (method === "events") { configured = params.events[0]; return new Response(null, { status: 202 }); }
    if (method === "getMe") return Response.json({ ok: true, result: { id: 12345, is_bot: true, username: "demo" } });
    if (method === "getChat") return Response.json({ ok: true, result: { id: configuration.supportGroupId, type: "supergroup", is_forum: true } });
    if (method === "getChatMember") return Response.json({ ok: true, result: { status: "administrator", can_manage_topics: true } });
    calls.push({ method, params });
    if (failure) { const description = failure; failure = null; return Response.json({ ok: false, error_code: 400, description }); }
    const result = method === "createForumTopic" ? { message_thread_id: nextThread++ }
      : method === "sendMessage" || method === "copyMessage" ? { message_id: nextMessage++ }
        : method === "editMessageText" || method === "editMessageCaption" ? { message_id: params.message_id } : true;
    return Response.json({ ok: true, result });
  } };
  await configure(configuration, options);
  const client = createWebTgSupport(configuration, options);
  const user = await client.normalize({ update_id: 10, message: {
    message_id: 10, chat: { id: userId, type: "private" }, from: { id: userId, is_bot: false, first_name: "User", language_code: "ru" }, text: "Original private message",
  } });
  const command = { opId: "50", attemptToken: "aaaaaaaaaaaaaaaaaaaaaa", subject: user.user, binding: null, deadlineSeconds: 60, receivedAt: now, expiresAt: now + 60000 };
  const groupChat = configured.group_chat;
  const result = await client.execute({ ...command, method: "createForumTopic", params: {
    chat_id: { sealed: groupChat }, name: { template: "topic_title", language: { sealed: user.language }, user: { sealed: user.chat } },
  } });
  assert.equal(result.outcome.kind, "success");
  calls.length = 0;
  return { client, user, command, groupChat, topic: result.outcome.created, calls, failNext: (description) => { failure = description; } };
}

test("private and operator edits preserve sealed text, captions and revisions through authorized edits", async () => {
  const { client, user, command, groupChat, topic, calls } = await correspondenceHost();
  const photo = [{ file_id: "photo-file", file_unique_id: "photo-unique", width: 32, height: 32 }];
  const cases = [
    { original: { text: "Original text" }, edited: { text: "Edited <&> 🌴", entities: [{ type: "bold", offset: 0, length: 6 }], link_preview_options: { is_disabled: true } },
      method: "editMessageText", params: { text: "Edited <&> 🌴", entities: [{ type: "bold", offset: 0, length: 6 }], link_preview_options: { is_disabled: true } }, field: "text" },
    { original: { photo, caption: "Original caption" }, edited: { photo, caption: "Changed caption 🌴", caption_entities: [{ type: "italic", offset: 0, length: 7 }], show_caption_above_media: true },
      method: "editMessageCaption", params: { caption: "Changed caption 🌴", caption_entities: [{ type: "italic", offset: 0, length: 7 }], show_caption_above_media: true }, field: "caption" },
    { original: { photo, caption: "Caption to remove" }, edited: { photo }, method: "editMessageCaption", params: { caption: "" }, field: "caption" },
  ];
  let updateId = 501;
  let messageId = 42;
  for (const side of ["user", "support"]) for (const change of cases) {
    const source = side === "user"
      ? { chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false, first_name: "User" } }
      : { chat: { id: config.supportGroupId, type: "supergroup" }, from: { id: 555, is_bot: false }, message_thread_id: 55 };
    const original = await client.normalize({ update_id: updateId++, message: { ...source, message_id: messageId, ...change.original } });
    const destination = side === "user" ? groupChat : user.chat;
    const copied = await client.execute({ ...command, binding: topic.binding, method: "copyMessage", params: {
      chat_id: { sealed: destination }, ...(side === "user" ? { message_thread_id: { sealed: topic.threadId } } : {}),
      from_chat_id: { sealed: side === "user" ? user.chat : groupChat }, message_id: { sealed: original.messageId },
    } });
    assert.equal(copied.outcome.kind, "success");
    const editUpdate = { update_id: updateId++, edited_message: { ...source, message_id: messageId++, edit_date: 100, ...change.edited } };
    const edit = await client.normalize(editUpdate);
    assert.notEqual(edit, null, `${side} ${change.method} with ${JSON.stringify(change.edited)}`);
    assert.equal(edit.type, `${side}_edit`);
    assert.equal(edit.field, change.field);
    assert.deepEqual(edit.revision, { editDate: 100, updateId: editUpdate.update_id });
    assert.equal(edit.message, original.message);
    assert.equal((await client.normalize(editUpdate)).eventId, edit.eventId);
    for (const plaintext of ["Edited <&> 🌴", "Changed caption 🌴", "photo-file", "123456789"]) assert.equal(JSON.stringify(edit).includes(plaintext), false);
    calls.length = 0;
    const result = await client.execute({ ...command, binding: topic.binding, method: change.method, params: {
      chat_id: { sealed: destination }, message_id: { sealed: copied.outcome.created.messageId }, content: { sealed: edit.content },
      ...(side === "support" ? { source_message_id: { sealed: original.messageId } } : {}),
    } });
    assert.equal(result.outcome.kind, "success");
    assert.deepEqual(calls, [{ method: change.method, params: {
      chat_id: side === "user" ? config.supportGroupId : 123456789, message_id: 700 + (side === "user" ? cases.indexOf(change) : cases.length + cases.indexOf(change)), ...change.params,
    } }]);
  }
  const source = { message_id: 42, chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false }, text: "Revision content" };
  const revisions = [{ edit_date: 100, update_id: 900 }, { edit_date: 100, update_id: 901 }, { edit_date: 101, update_id: 899 }];
  for (const revision of revisions) {
    const edit = await client.normalize({ update_id: revision.update_id, edited_message: { ...source, edit_date: revision.edit_date } });
    assert.deepEqual(edit.revision, { editDate: revision.edit_date, updateId: revision.update_id });
  }
  for (const invalid of [
    { ...source, edit_date: -1 }, { ...source, edit_date: undefined }, { ...source, edit_date: 100, from: { ...source.from, is_bot: true } },
    { ...source, edit_date: 100, text: undefined, sticker: { file_id: "sticker-file" } },
    { ...source, edit_date: 100, text: undefined, photo, caption: null },
  ]) assert.equal(await client.normalize({ update_id: 905, edited_message: invalid }), null);
});

test("edit commands reject foreign ciphertext and retain Telegram errors for the replacement workflow", async () => {
  const { client, user, command, groupChat, topic, calls, failNext } = await correspondenceHost();
  const copied = await client.execute({ ...command, method: "copyMessage", params: {
    chat_id: { sealed: groupChat }, message_thread_id: { sealed: topic.threadId }, from_chat_id: { sealed: user.chat }, message_id: { sealed: user.messageId },
  } });
  assert.equal(copied.outcome.kind, "success");
  const edit = (id, thread = null) => client.normalize({ update_id: 901 + id, edited_message: {
    message_id: 10, edit_date: 100, chat: { id: thread ? config.supportGroupId : id, type: thread ? "supergroup" : "private" },
    from: { id, is_bot: false }, ...(thread ? { message_thread_id: thread } : {}), text: "Changed content",
  } });
  const own = await edit(123456789);
  const other = await edit(987654321);
  const otherTopic = await edit(555, 56);
  const recipe = { ...command, binding: topic.binding, method: "editMessageText", params: {
    chat_id: { sealed: groupChat }, message_id: { sealed: copied.outcome.created.messageId }, content: { sealed: own.content },
  } };
  calls.length = 0;
  for (const [invalid, reason] of [
    [{ ...recipe, params: { ...recipe.params, content: { sealed: other.content } } }, "blob_invalid"],
    [{ ...recipe, params: { ...recipe.params, content: { sealed: otherTopic.content } } }, "blob_invalid"],
    [{ ...recipe, params: { ...recipe.params, content: { sealed: own.content.replace("s1.Ab3x.", "s1.Wxyz.") } } }, "unknown_kid"],
    [{ ...recipe, params: { ...recipe.params, source_message_id: { sealed: user.messageId } } }, "blob_invalid"],
    [{ ...recipe, params: { ...recipe.params, source_message_id: { sealed: copied.outcome.created.messageId } } }, "blob_invalid"],
    [{ ...recipe, method: "editMessageCaption" }, "malformed"],
  ]) {
    const result = await client.execute(invalid);
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, reason);
  }
  assert.deepEqual(calls, []);
  for (const description of ["Bad Request: message is not modified", "Bad Request: message to edit not found"]) {
    failNext(description);
    assert.deepEqual((await client.execute(recipe)).outcome, { kind: "telegram_error", errorCode: 400, description, retryAfter: null });
  }
  const deletion = { ...command, method: "deleteMessage", params: { chat_id: { sealed: groupChat }, message_id: { sealed: copied.outcome.created.messageId } } };
  failNext("Bad Request: message to delete not found");
  assert.deepEqual((await client.execute(deletion)).outcome, { kind: "telegram_error", errorCode: 400, description: "Bad Request: message to delete not found", retryAfter: null });
  calls.length = 0;
  assert.equal((await client.execute(deletion)).outcome.kind, "success");
  assert.deepEqual(calls, [{ method: "deleteMessage", params: { chat_id: config.supportGroupId, message_id: 700 } }]);
  calls.length = 0;
  for (const [template, text] of [
    ["user_edited", "✏️ Пользователь изменил сообщение."], ["edited_by_support", "✏️ Сообщение выше было изменено поддержкой."],
    ["replaced_by_support", "🔁 Предыдущее сообщение нельзя было изменить, поэтому мы удалили его и отправили новое."],
  ]) {
    const inTopic = template === "user_edited";
    const result = await client.execute({ ...command, method: "sendMessage", params: {
      chat_id: { sealed: inTopic ? groupChat : user.chat }, ...(inTopic ? { message_thread_id: { sealed: topic.threadId } } : {}), text: { template, language: { sealed: user.language } },
    } });
    assert.equal(result.outcome.kind, "success");
    assert.deepEqual(calls.at(-1), { method: "sendMessage", params: { chat_id: inTopic ? config.supportGroupId : 123456789, ...(inTopic ? { message_thread_id: 55 } : {}), text } });
  }
});

test("reactions copy the whole sealed list and clearing it through authenticated group message proofs", async () => {
  const { client, user, command, groupChat, topic, calls } = await correspondenceHost();
  const copied = await client.execute({ ...command, method: "copyMessage", params: {
    chat_id: { sealed: groupChat }, message_thread_id: { sealed: topic.threadId }, from_chat_id: { sealed: user.chat }, message_id: { sealed: user.messageId },
  } });
  const normalize = (id, list) => client.normalize({ update_id: 990 + id, message_reaction: {
    chat: { id, type: "private" }, message_id: 10, user: { id, is_bot: false }, date: 100, old_reaction: [], new_reaction: list,
  } });
  const recipe = { ...command, method: "setMessageReaction", params: { chat_id: { sealed: groupChat }, message_id: { sealed: copied.outcome.created.messageId } } };
  calls.length = 0;
  for (const list of [[{ type: "emoji", emoji: "👍" }, { type: "custom_emoji", custom_emoji_id: "999123456789000" }], []]) {
    const event = await normalize(123456789, list);
    assert.equal(event.type, "user_reaction");
    assert.equal(event.message, user.message);
    for (const plaintext of ["👍", "999123456789000", "123456789"]) assert.equal(JSON.stringify(event).includes(plaintext), false);
    assert.equal((await client.execute({ ...recipe, params: { ...recipe.params, reaction: { sealed: event.reactions } } })).outcome.kind, "success");
    assert.deepEqual(calls.at(-1), { method: "setMessageReaction", params: { chat_id: config.supportGroupId, message_id: 700, reaction: list } });
  }
  const other = await normalize(987654321, [{ type: "emoji", emoji: "🔥" }]);
  calls.length = 0;
  for (const [reaction, reason] of [[{ sealed: other.reactions }, "blob_invalid"], ["🔥", "malformed"]]) {
    const result = await client.execute({ ...recipe, params: { ...recipe.params, reaction } });
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, reason);
  }
  assert.deepEqual(calls, []);
  assert.equal((await client.execute({ ...recipe, params: { ...recipe.params, reaction: "👀" } })).outcome.kind, "success");
  assert.deepEqual(calls, [{ method: "setMessageReaction", params: { chat_id: config.supportGroupId, message_id: 700, reaction: [{ type: "emoji", emoji: "👀" }] } }]);
  assert.equal(client.allowedUpdates.includes("edited_message"), true);
  assert.equal(client.allowedUpdates.includes("message_reaction"), true);
  const groupReaction = (messageId, list) => client.normalize({ update_id: 1100 + messageId, message_reaction: {
    chat: { id: config.supportGroupId, type: "supergroup" }, message_id: messageId,
    user: { id: 555, is_bot: false }, date: 100, old_reaction: [], new_reaction: list,
  } });
  const toPrivate = { ...command, method: "setMessageReaction", params: {
    chat_id: { sealed: user.chat }, message_id: { sealed: user.messageId },
    source_message_id: { sealed: copied.outcome.created.messageId },
  } };
  calls.length = 0;
  for (const list of [[{ type: "emoji", emoji: "👍" }, { type: "custom_emoji", custom_emoji_id: "999123456789000" }], []]) {
    const event = await groupReaction(700, list);
    assert.notEqual(event, null, "actual group reactions have no message_thread_id");
    assert.equal(event.type, "support_reaction");
    assert.equal(Object.hasOwn(event, "thread"), false);
    assert.equal(event.message, copied.outcome.created.message);
    for (const plaintext of ["👍", "999123456789000", "123456789"]) assert.equal(JSON.stringify(event).includes(plaintext), false);
    assert.equal((await client.execute({ ...toPrivate, params: { ...toPrivate.params, reaction: { sealed: event.reactions } } })).outcome.kind, "success");
    assert.deepEqual(calls.at(-1), { method: "setMessageReaction", params: { chat_id: 123456789, message_id: 10, reaction: list } });
  }
  const reaction = await groupReaction(700, [{ type: "emoji", emoji: "🔥" }]);
  const nextCopy = await client.execute({ ...command, method: "copyMessage", params: {
    chat_id: { sealed: groupChat }, message_thread_id: { sealed: topic.threadId }, from_chat_id: { sealed: user.chat }, message_id: { sealed: user.messageId },
  } });
  const otherHost = await correspondenceHost(config, 987654321);
  const otherCopy = await otherHost.client.execute({ ...otherHost.command, method: "copyMessage", params: {
    chat_id: { sealed: otherHost.groupChat }, message_thread_id: { sealed: otherHost.topic.threadId },
    from_chat_id: { sealed: otherHost.user.chat }, message_id: { sealed: otherHost.user.messageId },
  } });
  const otherGroupHost = await correspondenceHost({ ...config, supportGroupId: -1002222222222 });
  const otherGroupCopy = await otherGroupHost.client.execute({ ...otherGroupHost.command, method: "copyMessage", params: {
    chat_id: { sealed: otherGroupHost.groupChat }, message_thread_id: { sealed: otherGroupHost.topic.threadId },
    from_chat_id: { sealed: otherGroupHost.user.chat }, message_id: { sealed: otherGroupHost.user.messageId },
  } });
  calls.length = 0;
  const recipeWithProof = { ...toPrivate, params: { ...toPrivate.params, reaction: { sealed: reaction.reactions } } };
  for (const [source, reason] of [
    [undefined, "blob_invalid"],
    [{ sealed: user.messageId }, "blob_invalid"],
    [{ sealed: nextCopy.outcome.created.messageId }, "blob_invalid"],
    [{ sealed: otherCopy.outcome.created.messageId }, "blob_invalid"],
    [{ sealed: otherGroupCopy.outcome.created.messageId }, "blob_invalid"],
    [{ sealed: copied.outcome.created.messageId.replace("s1.Ab3x.", "s1.Wxyz.") }, "unknown_kid"],
    [{ sealed: "invalid" }, "malformed"],
  ]) {
    const result = await client.execute({ ...recipeWithProof, params: { ...recipeWithProof.params, source_message_id: source } });
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, reason);
  }
  assert.deepEqual(calls, []);
});

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
  let configured;
  let nextThread = 55;
  let returnedMessageId = 777;
  const options = { clock: { now: () => now }, resolveProfile: async () => ({ firstName: "User" }), fetch: async (request) => {
    const path = new URL(request.url).pathname;
    const body = request.body ? await request.json() : null;
    const method = path.split("/").at(-1);
    if (method === "events") { configured = body.events[0]; return new Response(null, { status: 202 }); }
    if (method === "getMe") return Response.json({ ok: true, result: { id: 12345, username: "test_bot", is_bot: true } });
    if (method === "getChat" && body.chat_id === config.supportGroupId) return Response.json({ ok: true, result: { id: config.supportGroupId, type: "supergroup", is_forum: true } });
    if (method === "getChatMember") return Response.json({ ok: true, result: { status: "administrator", can_manage_topics: true } });
    requests.push({ path, body });
    if (method === "getChat") return Response.json({ ok: true, result: { id: body.chat_id, type: "private", first_name: "Fetched" } });
    return Response.json({ ok: true, result: method === "createForumTopic" ? { message_thread_id: nextThread++ } : { message_id: returnedMessageId } });
  } };
  const tgSupport = createWebTgSupport(config, options);
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

  await configure(config, options);
  const createTopic = async (user) => {
    const result = await tgSupport.execute({ ...command, subject: user.user, method: "createForumTopic", params: {
      chat_id: { sealed: configured.group_chat }, name: { template: "topic_title", language: { sealed: user.language }, user: { sealed: user.chat } },
    } });
    assert.equal(result.outcome.kind, "success");
    assert.equal(result.outcome.created.kind, "topic");
    return result.outcome.created;
  };
  const topic = await createTopic(own);
  const nextOwnTopic = await createTopic(own);
  const otherTopic = await createTopic(other);
  const privateTextEdit = await tgSupport.normalize({ update_id: 890, edited_message: {
    ...message(123456789).message, edit_date: 1, text: "Changed private text",
  } });
  const privateCaptionEdit = await tgSupport.normalize({ update_id: 891, edited_message: {
    ...message(123456789).message, text: undefined, photo: [{ file_id: "photo" }], edit_date: 1, caption: "Changed caption",
  } });
  const groupChat = { sealed: configured.group_chat };
  const privateChat = { sealed: own.chat };
  const groupThread = { sealed: topic.threadId };
  const bound = { ...command, binding: topic.binding };
  returnedMessageId = 42;
  const groupCopy = await tgSupport.execute({ ...bound, params: {
    chat_id: groupChat, message_thread_id: groupThread, from_chat_id: privateChat, message_id: { sealed: own.messageId },
  } });
  assert.equal(groupCopy.outcome.kind, "success");
  const header = await tgSupport.execute({ ...bound, method: "sendMessage", params: {
    chat_id: groupChat, message_thread_id: groupThread,
    text: { template: "topic_header", language: { sealed: own.language }, user: privateChat },
  } });
  assert.equal(header.outcome.kind, "success");
  returnedMessageId = 777;
  const groupCommands = (messageId) => [
    ["copy source", "copyMessage", { chat_id: privateChat, from_chat_id: groupChat, message_id: messageId }],
    ["text edit", "editMessageText", { chat_id: groupChat, message_id: messageId, content: { sealed: privateTextEdit.content } }],
    ["caption edit", "editMessageCaption", { chat_id: groupChat, message_id: messageId, content: { sealed: privateCaptionEdit.content } }],
    ["delete", "deleteMessage", { chat_id: groupChat, message_id: messageId }],
    ["pin", "pinChatMessage", { chat_id: groupChat, message_id: messageId }],
    ["reaction", "setMessageReaction", { chat_id: groupChat, message_id: messageId, reaction: "👀" }],
    ["send reply", "sendMessage", { chat_id: groupChat, message_thread_id: groupThread,
      text: { template: "user_edited", language: { sealed: own.language } }, reply_to_message_id: messageId }],
    ["copy reply", "copyMessage", { chat_id: groupChat, message_thread_id: groupThread, from_chat_id: privateChat,
      message_id: { sealed: own.messageId }, reply_to_message_id: messageId }],
  ];
  requests.length = 0;
  for (const [slot, method, params] of groupCommands({ sealed: own.messageId })) {
    const result = await tgSupport.execute({ ...bound, method, params });
    assert.equal(result.outcome.kind, "rejected_by_host", `${slot}: private42 cannot select group42`);
    assert.equal(result.outcome.reason, "blob_invalid", slot);
  }
  assert.deepEqual(requests, []);
  for (const [slot, method, params] of groupCommands({ sealed: groupCopy.outcome.created.messageId })) {
    const result = await tgSupport.execute({ ...bound, method, params });
    assert.equal(result.outcome.kind, "success", `${slot}: group-created USER scope remains valid`);
    assert.equal(requests.at(-1).body[method === "copyMessage" && slot === "copy source" ? "from_chat_id" : "chat_id"], config.supportGroupId);
    assert.equal(slot.endsWith("reply") ? requests.at(-1).body.reply_parameters.message_id : requests.at(-1).body.message_id, 42);
  }
  assert.equal((await tgSupport.execute({ ...bound, method: "pinChatMessage", params: {
    chat_id: groupChat, message_id: { sealed: header.outcome.created.messageId },
  } })).outcome.kind, "success");
  requests.length = 0;
  for (const [slot, method, params] of groupCommands({ sealed: groupCopy.outcome.created.messageId })) {
    const result = await tgSupport.execute({ ...bound, method, params: {
      ...params, chat_id: privateChat, message_thread_id: undefined,
      ...(slot === "copy source" ? { from_chat_id: privateChat } : {}),
    } });
    assert.equal(result.outcome.kind, "rejected_by_host", `${slot}: group42 cannot select private42`);
    assert.equal(result.outcome.reason, "blob_invalid", slot);
  }
  assert.deepEqual(requests, []);
  const sealMessagePayload = (payload) => {
    const nonce = Buffer.alloc(12, 1);
    const cipher = createCipheriv("aes-256-gcm", Buffer.alloc(32), nonce);
    const parts = [Buffer.from("TGS1-SEAL"), Buffer.from("12345"), Buffer.from("message_id"), Buffer.from(own.user, "base64url")];
    cipher.setAAD(Buffer.concat(parts.flatMap((part) => {
      const size = Buffer.alloc(4); size.writeUInt32BE(part.length); return [size, part];
    })));
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload)), cipher.final(), cipher.getAuthTag()]);
    return `s1.Ab3x.${nonce.toString("base64url")}.${encrypted.toString("base64url")}`;
  };
  for (const payload of [
    { message_id: 42 },
    { message_id: 42, chat_id: "123456789" },
    { message_id: 42, chat_id: 9007199254740992 },
  ]) {
    const result = await tgSupport.execute({ ...command, method: "deleteMessage", params: {
      chat_id: privateChat, message_id: { sealed: sealMessagePayload(payload) },
    } });
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, "malformed");
  }
  assert.deepEqual(requests, []);
  const operator = await tgSupport.normalize({ update_id: 901, message: {
    message_id: 2001, message_thread_id: 55, chat: { id: config.supportGroupId, type: "supergroup" }, from: { id: 555, is_bot: false }, text: "Operator answer",
  } });
  const elsewhere = await tgSupport.normalize({ update_id: 902, message: {
    message_id: 2002, message_thread_id: 56, chat: { id: config.supportGroupId, type: "supergroup" }, from: { id: 555, is_bot: false }, text: "Another topic",
  } });
  const delivered = await tgSupport.execute({ ...command, binding: topic.binding, params: {
    chat_id: { sealed: own.chat }, from_chat_id: { sealed: configured.group_chat }, message_id: { sealed: operator.messageId },
  } });
  assert.equal(delivered.outcome.kind, "success");
  const userReply = await tgSupport.normalize({ update_id: 903, message: {
    message_id: 43, reply_to_message: { message_id: 777 }, chat: { id: 123456789, type: "private" }, from: { id: 123456789, is_bot: false }, text: "Reply to the operator",
  } });
  assert.equal(userReply.replyTo, delivered.outcome.created.message);
  const reply = { ...command, subject: userReply.user, binding: topic.binding, params: {
    chat_id: { sealed: configured.group_chat }, message_thread_id: { sealed: topic.threadId }, from_chat_id: { sealed: userReply.chat },
    message_id: { sealed: userReply.messageId }, reply_to_message_id: { sealed: operator.messageId },
  } };
  requests.length = 0;
  for (const [invalid, reason] of [
    [{ ...reply, binding: null }, "blob_invalid"],
    [{ ...reply, binding: otherTopic.binding }, "binding_invalid"],
    [{ ...reply, params: { ...reply.params, message_id: { sealed: other.messageId } } }, "blob_invalid"],
    [{ ...reply, params: { ...reply.params, reply_to_message_id: { sealed: other.messageId } } }, "blob_invalid"],
    [{ ...reply, params: { ...reply.params, reply_to_message_id: { sealed: elsewhere.messageId } } }, "blob_invalid"],
    [{ ...reply, params: { ...reply.params, message_thread_id: { sealed: nextOwnTopic.threadId } } }, "blob_invalid"],
    [{ ...reply, params: { ...reply.params, chat_id: { sealed: own.chat }, message_thread_id: null } }, "blob_invalid"],
  ]) {
    const result = await tgSupport.execute(invalid);
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, reason);
  }
  assert.deepEqual(requests, []);
  assert.equal((await tgSupport.execute(reply)).outcome.kind, "success");
  assert.deepEqual(requests, [{ path: "/bot12345:telegram-test-token/copyMessage", body: {
    chat_id: config.supportGroupId, message_thread_id: 55, from_chat_id: 123456789, message_id: 43, reply_parameters: { message_id: 2001 },
  } }]);
  const profiledTgSupport = createWebTgSupport(config, { clock: options.clock, fetch: options.fetch });
  const profiledHeader = { ...bound, method: "sendMessage", params: {
    chat_id: groupChat, message_thread_id: groupThread,
    text: { template: "topic_header", language: { sealed: own.language }, user: privateChat },
  } };
  for (const messageId of [own.messageId, other.messageId]) {
    requests.length = 0;
    const result = await profiledTgSupport.execute({ ...profiledHeader, params: {
      ...profiledHeader.params, reply_to_message_id: { sealed: messageId },
    } });
    assert.equal(result.outcome.kind, "rejected_by_host");
    assert.equal(result.outcome.reason, "blob_invalid");
    assert.deepEqual(requests, [], "invalid reply must be rejected before fetching a template profile");
  }
  requests.length = 0;
  assert.equal((await profiledTgSupport.execute({ ...profiledHeader, params: {
    ...profiledHeader.params, reply_to_message_id: { sealed: groupCopy.outcome.created.messageId },
  } })).outcome.kind, "success");
  assert.deepEqual(requests.map(({ path }) => path.split("/").at(-1)), ["getChat", "sendMessage"]);
  assert.deepEqual(requests[0].body, { chat_id: 123456789 });
  assert.equal(requests[1].body.chat_id, config.supportGroupId);
  assert.deepEqual(requests[1].body.reply_parameters, { message_id: 42 });
  assert.equal(requests[1].body.text.includes("Fetched"), true);
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
  const delivered = await tgSupport.execute(command);
  assert.equal(delivered.outcome.kind, "success");
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
  const edited = await tgSupport.normalize({ update_id: 1001, edited_message: {
    message_id: 701, message_thread_id: 56, edit_date: 100, chat: { id: config.supportGroupId, type: "supergroup" },
    from: { id: 555, is_bot: false }, text: "Changed Notifications reply <&>",
  } });
  const reacted = await tgSupport.normalize({ update_id: 1002, message_reaction: {
    message_id: 701, chat: { id: config.supportGroupId, type: "supergroup" },
    user: { id: 555, is_bot: false }, date: 100, old_reaction: [], new_reaction: [{ type: "emoji", emoji: "👍" }],
  } });
  assert.equal(edited.message, reply.message);
  assert.equal(edited.thread, reply.thread);
  assert.equal(reacted.message, reply.message);
  assert.equal(JSON.stringify(edited).includes("Changed Notifications reply <&>"), false);
  assert.equal(JSON.stringify(reacted).includes("👍"), false);
  const target = { chat_id: { sealed: own.chat }, message_id: { sealed: delivered.outcome.created.messageId },
    source_message_id: { sealed: reply.replyScopedMessageId } };
  for (const [method, content, expected] of [
    ["editMessageText", { content: { sealed: edited.content } }, { text: "Changed Notifications reply <&>" }],
    ["setMessageReaction", { reaction: { sealed: reacted.reactions } }, { reaction: [{ type: "emoji", emoji: "👍" }] }],
  ]) {
    const recipe = { ...common, binding: notified.outcome.created.binding, method, params: { ...target, ...content } };
    const count = seen.length;
    for (const invalid of [
      { ...recipe, binding: anotherNotice.outcome.created.binding },
      { ...recipe, binding: anotherUser.outcome.created.binding },
      { ...recipe, params: { ...recipe.params, source_message_id: { sealed: notified.outcome.created.messageId } } },
      { ...recipe, params: { ...recipe.params, source_message_id: undefined } },
    ]) assert.equal((await tgSupport.execute(invalid)).outcome.kind, "rejected_by_host");
    assert.equal(seen.length, count, "N700 authorizes M701 only for the bound user");
    assert.equal((await tgSupport.execute(recipe)).outcome.kind, "success");
    assert.deepEqual(seen.at(-1), { method, body: { chat_id: 123456789, message_id: 900, ...expected } });
  }
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
