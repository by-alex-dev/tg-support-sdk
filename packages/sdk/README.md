# tg-support-sdk

To publish a release, run `bash scripts/prepare-sdk-publish.sh` from the monorepo root. The wizard uses your personal npm account, builds the package, runs its tests and shows the tarball before publication. An npm organization is optional.

The SDK connects a Telegram bot host to tg-support. The main entry uses WebCrypto, fetch, Request and Response; it works in Workers, Pages Functions and Node 24. Creating an SDK instance performs no network requests. The package bundles its protocol validation and has no runtime dependencies.

```ts
import { createWebTgSupport, parseKeys } from "tg-support-sdk";

const tgSupport = createWebTgSupport({
  botToken: env.BOT_TOKEN,
  service: { url: env.TG_SUPPORT_SERVICE_URL, botSecret: env.TG_SUPPORT_SECRET },
  keys: parseKeys({ tokenKey: env.TOKEN_KEY, sealKeys: env.SEAL_KEYS }),
  supportGroupId: Number(env.SUPPORT_GROUP_ID),
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: env.TG_SUPPORT_HOST_URL },
  configRevision: BUILD_REVISION,
});
```

`TG_SUPPORT_SERVICE_URL` includes `/v1`. `TG_SUPPORT_SECRET` has the form `tgs1.<Service UUID>.<base64url secret>`. Its UUID differs from the decimal Telegram bot ID in `BOT_TOKEN`. `TG_SUPPORT_HOST_URL` is the exact public command endpoint, including any path and query string. Request signatures use that configured URL even when a proxy rewrites the incoming URL.

After the host handles its own commands and payment updates, pass the remaining Telegram update to `await tgSupport.handleUpdate(update, { waitUntil: promise => context.waitUntil(promise) })`. Private user messages and supported forum updates become encrypted tg-support events. Unrelated or unsupported updates are ignored. Without `waitUntil`, event sending is awaited.

At the tg-support command endpoint, return `await tgSupport.handleCommandRequest(request, { waitUntil: promise => context.waitUntil(promise) })`. It accepts signed POST challenges and command batches. Command acceptance returns HTTP 202; Telegram execution and result delivery run through `waitUntil`, in batch order. Keep the host's command endpoint available for this background work.

For another Telegram client, `createTgSupport({ config, telegramBotId, botApi, ...options })` accepts a typed `BotApi` adapter. Both constructors accept a `fetch(Request)` function, a millisecond `clock.now()`, a logger for structured diagnostic codes, and an optional `resolveProfile(userId)`. Templates resolve the current profile at execution and include the verified user's ID in the default topic tag and pinned-header link. The executor assembles only the closed method's named Telegram parameters.

`templates` accepts `languages`, `fallback` and per-template, per-language `overrides`. Render callbacks receive `{ profile, language, verifiedUserId }`. For `topic_title`, `topic_header` and `new_user_notice`, the ID comes from the authenticated private-chat block after its user token is checked. A missing display profile does not remove that verified ID. Other templates receive `null`; omit mentions when there is no verified ID. Profile fields are display data and cannot supply the mention's identity. Use plain text and Telegram entities to keep names literal.

Language selection uses an exact match, then the base language, then `fallback`. If an override lacks that translation but has a fallback-language translation, the fallback callback receives the fallback language. A template without an override keeps its SDK text. Unknown or wrong-slot template IDs are rejected before Telegram is called.

The lower-level interface also exposes `normalize`, `hostNotice`, `userForget`, `send`, `receivePush`, `execute`, `claim` and `heartbeat`. `send` returns `accepted`, `retryable` or `fatal`; `claim` throws `ServiceError` with that structured failure result. Callers using these lower-level methods own retries and scheduling. The Web façade registers each attempt's execution once when it accepts a command batch.

For a support reply, `replyScopedMessageId` contains the current operator message ID sealed under the replied-to message token. A notice binding authorizes that notice's scope and user; the message being copied is the operator's reply, which has its own distinct ID.

Edited messages preserve text or caption, Telegram entities, link-preview options and caption position in sealed content. A media edit without the optional caption becomes an empty caption, so removing a caption also reaches the copy. Each edit reports its `(editDate, updateId)` revision; the Service selects the latest revision and handles replacement when Telegram can no longer edit the copy. Telegram error codes and descriptions remain available in the operation result for that decision.

Private reaction updates carry the complete new list in a sealed block. An empty list removes reactions from the paired message. Commands accept sealed reactions or the delivery marker `👀`; other open reaction values are rejected.

Generate keys explicitly with `npx tg-support-sdk keys`. Store `TOKEN_KEY` permanently: replacing it changes users' semantic identities. `SEAL_KEYS` is a comma-separated `kid:base64url-key` list; the first key encrypts new data, and retained keys decrypt older blobs. `npx tg-support-sdk keys --seal` creates another seal entry. Add it before existing entries when rotating; preserve keys needed by queued commands and stored blobs.

Run deployment configuration explicitly:

```sh
npx tg-support-sdk configure --config ./tg-support-config.mjs
```

The module's default export is the same configuration passed to `createWebTgSupport`. Use one build revision for the deployment and this command. Configuration checks Telegram `getMe`, the support forum and the bot's administrator/topic permissions, then sends `bot_configured` to the service. It does not set the Telegram webhook. The CLI uses Node; importing the main SDK entry does not load it.

This first slice supports private message ingestion and signed host execution. Pull scheduling and host-specific durable retry loops remain the caller's responsibility.
