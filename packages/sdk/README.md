# tg-support-sdk

For the first release, run `bash scripts/prepare-sdk-publish.sh` from the monorepo root. The wizard uses your personal npm account, builds the package, runs its tests and shows the tarball before publication. An npm organization is optional.

The 0.1.0 SDK connects a Telegram bot host to Support Relay. The main entry uses WebCrypto, fetch, Request and Response; it works in Workers, Pages Functions and Node 24. Constructing a relay performs no network requests. The package bundles its protocol validation and has no runtime dependencies.

```ts
import { createWebRelay, parseKeys } from "tg-support-sdk";

const relay = createWebRelay({
  botToken: env.BOT_TOKEN,
  service: { url: env.RELAY_URL, botSecret: env.RELAY_BOT_SECRET },
  keys: parseKeys({ tokenKey: env.TOKEN_KEY, sealKeys: env.SEAL_KEYS }),
  supportGroupId: Number(env.SUPPORT_GROUP_ID),
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: env.RELAY_HOST_URL },
  configRevision: BUILD_REVISION,
});
```

`RELAY_URL` includes `/v1`. `RELAY_BOT_SECRET` has the form `srs1.<relay bot UUID>.<base64url secret>`. Its UUID differs from the decimal Telegram bot ID in `BOT_TOKEN`. `RELAY_HOST_URL` is the exact public command endpoint, including any path and query string. Request signatures use that configured URL even when a proxy rewrites the incoming URL.

After the host handles its own commands and payment updates, pass the remaining Telegram update to `await relay.handleUpdate(update, { waitUntil: promise => context.waitUntil(promise) })`. Private user messages and supported forum updates become encrypted relay events. Unrelated or unsupported updates are ignored. Without `waitUntil`, event sending is awaited.

At the relay command endpoint, return `await relay.handleCommandRequest(request, { waitUntil: promise => context.waitUntil(promise) })`. It accepts signed POST challenges and command batches. Command acceptance returns HTTP 202; Telegram execution and result delivery run through `waitUntil`, in batch order. Keep the host's command endpoint available for this background work.

For another Telegram client, `createRelay({ config, telegramBotId, botApi, ...options })` accepts a typed `BotApi` adapter. Both constructors accept a `fetch(Request)` function, a millisecond `clock.now()`, a logger for structured diagnostic codes, and an optional `resolveProfile(userId)`. Templates resolve the current profile at execution and include the verified user's ID in the default topic tag and pinned-header link. The executor assembles only the closed method's named Telegram parameters.

The lower-level interface also exposes `normalize`, `hostNotice`, `userForget`, `send`, `receivePush`, `execute`, `claim` and `heartbeat`. `send` returns `accepted`, `retryable` or `fatal`; `claim` throws `ServiceError` with that structured failure result. Callers using these lower-level methods own retries and scheduling. The Web façade registers each attempt's execution once when it accepts a command batch.

Generate keys explicitly with `npx support-relay keys`. Store `TOKEN_KEY` permanently: replacing it changes users' semantic identities. `SEAL_KEYS` is a comma-separated `kid:base64url-key` list; the first key encrypts new data, and retained keys decrypt older blobs. `npx support-relay keys --seal` creates another seal entry. Add it before existing entries when rotating; preserve keys needed by queued commands and stored blobs.

Run deployment configuration explicitly:

```sh
npx support-relay configure --config ./relay-config.mjs
```

The module's default export is the same configuration passed to `createWebRelay`. Use one build revision for the deployment and this command. Configuration checks Telegram `getMe`, the support forum and the bot's administrator/topic permissions, then sends `bot_configured` to the service. It does not set the Telegram webhook. The CLI uses Node; importing the main SDK entry does not load it.

This first slice supports private message ingestion and signed host execution. Pull scheduling and host-specific durable retry loops remain the caller's responsibility.
