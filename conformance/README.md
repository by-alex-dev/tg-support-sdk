# Protocol conformance

The protocol is language independent. Start with [the HTTP contract](../packages/protocol/schema/v1/openapi.json), [the v1 JSON Schema](../packages/protocol/schema/v1/schema.json) and [the command verification checklist](../docs/design/protocol.md#8-чек-лист-проверки-команды-на-хосте). The schema's `additionalProperties` policy allows future fields; an executor still assembles only the named parameters of its allowed Bot API method.

Signing uses the decoded third part of `tgs1.<bot UUID>.<base64url key>`. Verify the exact body bytes before decoding JSON. Sign request bytes with `TGS1-REQ\n<Unix seconds>\nPOST\n<path and query>\n<body>`; sign claim and heartbeat response bytes with `TGS1-RES\n<Unix seconds>\n<HTTP status>\n<path and query>\n<body>`. The timestamp window is ±300 seconds. For push, verify against the configured command URL's path and query, including when a proxy changes the incoming URL. A challenge reply signs `TGS1-CHALLENGE\n<configured URL>\n<nonce>` and never echoes the nonce.

[Token vectors](vectors/tokens.json) contain the token key, input parts, encoded bytes and expected base64url HMAC for every token purpose. They were calculated with Python's `struct.pack`, `hmac` and `hashlib`, independently of the SDK. Each part uses a four-byte unsigned big-endian byte length followed by UTF-8 data; integers use signed decimal text. The collision controls cover ambiguous message parts and the same topic ID in different groups.

Sealed blocks use AES-256-GCM with a new 12-byte nonce for each encryption and a 16-byte tag appended to the ciphertext. AAD is the length-prefixed sequence `TGS1-SEAL`, decimal Telegram bot ID, blob purpose and the decoded 32-byte subject. [The payload and subject tables](../docs/design/protocol.md#32-запечатанный-блок-sealed-blob) are normative. In particular, `message_id` payloads authenticate their actual chat; do not accept a legacy payload without `chat_id`. To consume group edit or reaction content, first authenticate `source_message_id` for the command's USER and configured group, then derive its MESSAGE token. The target message passes a separate destination-chat check.

A host implementation should exercise [H1–H26](../docs/design/protocol.md#91-хост-без-сервиса-тест-играет-роль-сервиса) against a fake Service and fake Telegram transport. A rejected command must leave the entire Telegram journal empty, including profile reads. Test key retention, forged ciphertext, cross-user/topic/notice/chat substitutions, dual signatures, expiry, duplicate attempts, signed claim replies and profile failures. Return Telegram errors unchanged and report transport errors without exception details. Never execute an unverified claim reply.

The TypeScript host owners run through public entry points and replace external HTTP only:

```sh
npm ci
npm run build --workspace tg-support-protocol
npm run test --workspace tg-support-sdk
```

`packages/sdk/test/sdk.test.mjs` owns crypto, normalization, command authorization, signatures and templates. `packages/sdk/test/grammy.test.mjs` uses an actual grammY `Bot` with its API transformer as the external Telegram fake. It runs the correspondence through push and pull and verifies signed event/result delivery.

Service owners exercise [S1–S22](../docs/design/protocol.md#92-сервис-без-sdk-тест-играет-роль-хоста-push-и-pull) using HTTP, an independently signing fake Host, controlled clocks and disposable real PostgreSQL databases. Supply a disposable PostgreSQL server, then run:

```sh
TEST_DATABASE_URL=postgres://postgres:test-only@127.0.0.1:5432/postgres \
  npm run test --workspace tg-support-service
```

Each fixture creates and removes its own database. The Host fake returns opaque receipt fields; it does not replace the Service's queue, transactions or admission policy. `protocol-boundaries.test.ts` checks malformed and unknown events with the failing event's index, oversized batches and whole-batch rejection. `ingest.test.ts` checks rollback when a later event fails semantic validation. `auth.test.ts` invokes the production rotation CLI and checks old/new keys, expiry, dual outgoing signatures and per-Bot event deduplication against real storage. Account access states and full push/pull admission coverage remain pending; schema compilation or one correspondence does not establish stable protocol readiness.
