# tg-support-sdk

This is SDK 1.1.0. It keeps the 1.0 public API and adds the `user_reacted` topic notice; [CHANGELOG.md](CHANGELOG.md) lists the release changes. The Service wire minimum remains 0.4.0. Publication and Host adoption follow [RELEASE.md](RELEASE.md).

> **Back up `token_key` outside the Host before connecting a Bot. It is the only key to that Bot's state: losing it loses every Topic and Message link. It cannot be rotated.**
>
> **Never delete old `seal_key` entries. Future replies, edits and reactions can need ciphertext sealed years earlier. Add a new current key; retain all old keys.**
>
> **The Host owns reliable Event delivery, retries and acceptance order. The SDK has no durable outbox or retry loop. `waitUntil` keeps the current attempt alive; it does not persist an Event.**

To publish a release, run `bash scripts/prepare-sdk-publish.sh` from the monorepo root. The wizard uses your personal npm account, builds the package, runs its tests and shows the tarball before publication. An npm organization is optional.

The SDK connects a Telegram bot host to tg-support. The main entry uses WebCrypto, fetch, Request and Response; it works in Workers, Pages Functions and Node 24. Creating an SDK instance performs no network requests. The main entry bundles its protocol validation and has no runtime dependencies. The optional `tg-support-sdk/grammy` entry uses the host's grammY installation.

Start with a separate Telegram Bot token held only by your Host. Open the tg-support Service bot, send `/start`, accept the published `/terms`, then obtain legitimate paid access or redeem a prepared Invite with `/invite <code>`. Create a Bot using `/newbot <name>` and save the one-time signing secret as `TG_SUPPORT_SECRET` before its message disappears after ten minutes. Account access and plan limits are enforced by the deployed Service; this guide does not grant them. Never send the Telegram Bot token or Host keys to the Service bot.

Install `npm install --save-exact tg-support-sdk@1.1.0`. Generate Host keys locally with `npx tg-support-sdk keys`, back up `TOKEN_KEY` now, and save `TOKEN_KEY` and `SEAL_KEYS` only in your Host's secrets. Enable Topics in the support supergroup and make your Telegram Bot an administrator with Manage Topics. Set `SUPPORT_GROUP_ID`, the Service `/v1` URL, the exact public command URL and one increasing deployment revision. Authenticate Telegram webhook requests in your Host before handing updates to the SDK.

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

Choose delivery durability in the host. Immediate delivery waits for the Service:

```ts
const event = await tgSupport.normalize(update);
if (event) {
  const result = await tgSupport.send([event]);
  // Handle retryable or fatal before acknowledging this update.
}
```

Background delivery lets the Bot answer while Service is slow. Configure the SDK logger to record its diagnostic codes without update bodies:

```ts
const tgSupport = createWebTgSupport(config, {
  logger: { warn: event => console.warn(event) },
});
await tgSupport.handleUpdate(update, { waitUntil: work => context.waitUntil(work) });
return new Response("OK");
```

`waitUntil` keeps that attempt alive; it does not persist or retry a failed event. Without a host retry policy, an event can be lost during an outage. For durable delivery, save the normalized event in the host's outbox before acknowledging Telegram, then reuse that exact event and `eventId` on retries. The following uses host-owned storage methods:

```ts
const event = await tgSupport.normalize(update);
if (event) await outbox.put(event.eventId, event);
return new Response("OK");

// A separate host worker preserves acceptance order within each user scope.
for await (const entry of outbox.ready()) {
  const result = await tgSupport.send([entry.event]);
  if (result.kind === "accepted") await outbox.remove(entry.id);
  else if (result.kind === "retryable") await outbox.defer(entry.id, result.retryAfterMs);
  else await outbox.block(entry.id, result.reason);
}
```

At the tg-support command endpoint, return `await tgSupport.handleCommandRequest(request, { waitUntil: promise => context.waitUntil(promise) })`. It accepts signed POST challenges and command batches. Command acceptance returns HTTP 202; Telegram execution and result delivery run through `waitUntil`, in batch order. Keep the host's command endpoint available for this background work.

For Cloudflare Pages Functions, share a configuration factory in `support.ts`:

```ts
import { createWebTgSupport, parseKeys } from "tg-support-sdk";

export interface Env {
  BOT_TOKEN: string; TELEGRAM_WEBHOOK_SECRET: string;
  TG_SUPPORT_SERVICE_URL: string; TG_SUPPORT_SECRET: string;
  TOKEN_KEY: string; SEAL_KEYS: string; SUPPORT_GROUP_ID: string;
  TG_SUPPORT_HOST_URL: string; BUILD_REVISION: string;
}
export function support(env: Env) {
  return createWebTgSupport({
    botToken: env.BOT_TOKEN,
    service: { url: env.TG_SUPPORT_SERVICE_URL, botSecret: env.TG_SUPPORT_SECRET },
    keys: parseKeys({ tokenKey: env.TOKEN_KEY, sealKeys: env.SEAL_KEYS }),
    supportGroupId: Number(env.SUPPORT_GROUP_ID),
    features: { notificationsTopic: false, welcomeHint: false },
    transport: { kind: "push", hostUrl: env.TG_SUPPORT_HOST_URL },
    configRevision: Number(env.BUILD_REVISION),
  });
}
```

`functions/telegram.ts` authenticates Telegram's configured webhook secret before normalizing the update:

```ts
import type { PagesFunction } from "@cloudflare/workers-types";
import { support, type Env } from "../support";

export const onRequestPost: PagesFunction<Env> = async context => {
  if (!context.env.TELEGRAM_WEBHOOK_SECRET ||
      context.request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== context.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  await support(context.env).handleUpdate(await context.request.json(), {
    waitUntil: work => context.waitUntil(work),
  });
  return new Response("OK");
};
```

Route your own product commands and payment updates before this SDK handoff. Install `@cloudflare/workers-types` as a development dependency when using the shown Pages types. `functions/tg-support.ts` is the separate signed command endpoint; set `TG_SUPPORT_HOST_URL` to its exact public URL:

```ts
import type { PagesFunction } from "@cloudflare/workers-types";
import { support, type Env } from "../support";

export const onRequestPost: PagesFunction<Env> = context =>
  support(context.env).handleCommandRequest(context.request, {
    waitUntil: work => context.waitUntil(work),
  });
```

After deploying Pages, run the explicit `configure` step below with the same keys, URLs, group and `BUILD_REVISION`. Configure Telegram's webhook separately with the same `TELEGRAM_WEBHOOK_SECRET`; the SDK does not set it. Pages deployment bindings and the Node configuration module must describe the same Bot.

For another Telegram client, `createTgSupport({ config, telegramBotId, botApi, ...options })` accepts a typed `BotApi` adapter. Both constructors accept a `fetch(Request)` function, a millisecond `clock.now()`, a logger for structured diagnostic codes, and an optional `resolveProfile(userId)`. Templates resolve the current profile at execution and include the verified user's ID in the default topic tag and pinned-header link. The executor assembles only the closed method's named Telegram parameters.

`templates` accepts `languages`, `fallback` and per-template, per-language `overrides`. Render callbacks receive `{ profile, language, verifiedUserId, reactions }`. `reactions` is the rendered list for `user_reacted` (emoji as is, paid reactions as ⭐, custom emoji as a short label) and `null` for other templates. For `topic_title`, `topic_header` and `new_user_notice`, the ID comes from the authenticated private-chat block after its user token is checked. A missing display profile does not remove that verified ID. Other templates receive `null`; omit mentions when there is no verified ID. Profile fields are display data and cannot supply the mention's identity. Use plain text and Telegram entities to keep names literal.

Language selection uses an exact match, then the base language, then `fallback`. If an override lacks that translation but has a fallback-language translation, the fallback callback receives the fallback language. A template without an override keeps its SDK text. Unknown or wrong-slot template IDs are rejected before Telegram is called.

The lower-level interface also exposes `normalize`, `hostNotice`, `userForget`, `send`, `receivePush`, `execute`, `claim` and `heartbeat`. `send` returns `accepted`, `retryable` or `fatal`; `claim` throws `ServiceError` with that structured failure result. Callers using these lower-level methods own retries and scheduling. The Web façade registers each attempt's execution once when it accepts a command batch.

For a support reply, `replyScopedMessageId` contains the current operator message ID sealed under the replied-to message token. A notice binding authorizes that notice's scope and user; the message being copied is the operator's reply, which has its own distinct ID.

Edited messages preserve text or caption, Telegram entities, link-preview options and caption position in sealed content. A media edit without the optional caption becomes an empty caption, so removing a caption also reaches the copy. Each edit reports its `(editDate, updateId)` revision; the Service selects the latest revision and handles replacement when Telegram can no longer edit the copy. Telegram error codes and descriptions remain available in the operation result for that decision.

Private and support reaction updates carry the complete new list in a sealed block. An empty list removes reactions from the paired message. Commands accept sealed reactions or the delivery marker `👀`; other open reaction values are rejected. Support reaction events identify the group and message without a topic field, because Telegram does not include a topic ID in these updates.

Support edits and reactions seal their content under the source message token. Commands consuming them provide `source_message_id`: the sealed ID already stored for the group side of the message pair. A THREAD- or notice-scoped source ID also requires its existing topic or notice binding. The SDK authenticates this proof for the command's user, checks its group chat and opens content only for that message; the target message ID is checked against the destination chat separately. Private USER-scoped content omits `source_message_id`.

When changing the support group, increase `configRevision`, restart the Host with the new `supportGroupId`, and explicitly retain the former IDs in `previousSupportGroupIds`, for example `previousSupportGroupIds: [oldSupportGroupId]`. Store this list with your Host configuration so it survives every restart. The constructor validates and copies it; changing the caller's array later does not change the SDK's permissions. This list is local to the Host and is not sent to the Service.

The Service keeps pending private copies, edits and reactions for operator replies already accepted from the previous group. The SDK permits those groups only as authenticated sources for the command's own private-chat user, using the original topic or notice binding. Every group destination remains the current `supportGroupId`; new updates from previous groups are ignored. With no history list, previous groups are rejected. Keep a previous ID permitted while its pending deliveries must still succeed, and retain the original Host keys. Returning to a former group creates fresh user topics.

Generate keys explicitly with `npx tg-support-sdk keys`. Store `TOKEN_KEY` permanently: replacing it changes users' semantic identities. `SEAL_KEYS` is a comma-separated `kid:base64url-key` list; the first key encrypts new data, and retained keys decrypt older blobs. `npx tg-support-sdk keys --seal` creates another seal entry. Add it before existing entries when rotating; never remove any old entries.

Run deployment configuration explicitly:

```sh
npx tg-support-sdk configure --config ./tg-support-config.mjs
```

The module's default export is the same configuration passed to `createWebTgSupport`. Use one build revision for the deployment and this command. Configuration checks Telegram `getMe`, the support forum and the bot's administrator/topic permissions, then sends `bot_configured` to the service. It does not set the Telegram webhook. The CLI uses Node; importing the main SDK entry does not load it.

Keep a backup of `TOKEN_KEY` outside the host. Losing it loses every user topic and message link; it cannot be rotated. Keep every old seal key permanently. The host owns event delivery, retries and acceptance order. Use `normalize` plus `send` with your existing durable outbox when dropping a transient event is unacceptable; `handleUpdate` logs a failed send and does not enqueue it.

For a long-lived grammY host, install `grammy`.

For a Node TypeScript host that checks dependency declarations (`skipLibCheck: false`), install `@types/node` and `@types/node-fetch@2` as development dependencies. grammY's Node declarations import `fs` and node-fetch 2, whose [upstream TypeScript instructions](https://github.com/node-fetch/node-fetch#typescript) require the separate v2 types. The main Web SDK entry does not need these packages or grammY.

Import the separate adapter:

```ts
import { Bot } from "grammy";
import { createGrammyTgSupport } from "tg-support-sdk/grammy";

const bot = new Bot(env.BOT_TOKEN);
const tgSupport = createGrammyTgSupport(bot, config);
await tgSupport.start();
bot.use(tgSupport.middleware());
// Register the product's handlers after this middleware, or explicitly select updates before passing them on.
await bot.start({ allowed_updates: ["message", "edited_message", "message_reaction", "callback_query"] });
```

`start()` checks the bot and forum permissions, registers `bot_configured` and initializes grammY's bot identity. Calls sharing a startup wait for the same check; another call after successful startup does not register again. Before startup, `normalize` and `execute` throw `NotStartedError`; the command endpoint returns 503. The middleware sends normalized events and awaits `next()`. A failed send throws `ServiceError`, so the host can apply its update retry policy. Pass an `onEvents` callback to `middleware` to write events to an existing outbox instead. Do not install inline grammY retry or throttling transformers for support calls; the Service owns Telegram retry policy and quotas.

Use `handleCommandRequest` as the push endpoint, with the same `Request`, `Response` and optional `waitUntil` interface as the Web adapter. Telegram calls use `bot.api` and its transformers. Telegram errors preserve their code, description and `retry_after`; transport errors contain no external exception details.

For local getUpdates development without a public URL, set `transport: { kind: "pull" }`. Use a separate test bot that does not have a Telegram webhook. The host schedules both loops; the SDK creates no timer:

```ts
import { setTimeout as sleep } from "node:timers/promises";
const tgSupport = createGrammyTgSupport(bot, { ...config, transport: { kind: "pull" } });
await tgSupport.start();
bot.use(tgSupport.middleware());
const controller = new AbortController();
process.once("SIGINT", () => { controller.abort(); void bot.stop(); });
await Promise.all([
  bot.start({ allowed_updates: ["message", "edited_message", "message_reaction", "callback_query"] }),
  (async () => {
    while (!controller.signal.aborted) {
      await tgSupport.poll();
      await sleep(1000, undefined, { signal: controller.signal }).catch(() => {});
    }
  })(),
]);
```

`poll()` makes one signed claim, executes each authenticated command and sends its result. It throws `ServiceError` on claim or result-send failure; choose retries and shutdown behavior in your host. A host without grammY uses `claim()` followed by `execute(command)` and `send([result])` in its own loop. Claim replies require a valid response signature. Push and pull use the same command authorizer, sealed data and result events.
