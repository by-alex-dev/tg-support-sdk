# tg-support-sdk

Connect your Telegram bot to tg-support: every user who writes to your bot gets a topic in your support forum group, and operators answer right in that topic. The bot token, Telegram message text and your encryption keys stay in your bot's host; the tg-support Service only sees sealed (encrypted) data and protocol events.

The main entry uses WebCrypto, `fetch`, `Request` and `Response` and has no runtime dependencies: it runs in Cloudflare Workers, Pages Functions and Node 24. The optional `tg-support-sdk/grammy` entry uses your own grammY installation. Release notes are in `CHANGELOG.md`, shipped in this package.

> **Back up `TOKEN_KEY` outside the host before connecting a bot. It is the only key to that bot's state: losing it loses every user topic and message link. It cannot be rotated.**
>
> **Never delete old `SEAL_KEYS` entries. Future replies, edits and reactions can need data sealed years earlier. Add a new current key; retain all old keys.**
>
> **Your host owns reliable event delivery, retries and ordering. The SDK has no durable outbox or retry loop. `waitUntil` keeps the current attempt alive; it does not persist an event.**

## Choose the host shape

| Host | Adapter | How tg-support reaches the host | Register the configuration with |
| --- | --- | --- | --- |
| Serverless with a public HTTPS URL (Cloudflare Workers or Pages Functions, any `fetch`-style runtime) | `createWebTgSupport` from `tg-support-sdk` | push: the Service POSTs signed commands to your endpoint | `npx tg-support-sdk configure` in your deploy pipeline, after every deploy |
| Long-lived Node process with grammY and a public HTTPS URL | `createGrammyTgSupport` from `tg-support-sdk/grammy` | push | `await tgSupport.start()` at process start; no `configure` step |
| Long-lived Node process with grammY and no public URL (local development) | `createGrammyTgSupport` | pull: your process claims commands with `poll()` | `await tgSupport.start()`; no `configure` step |

"Registering the configuration" checks your bot and support group in Telegram, then sends the `bot_configured` event to the Service. The Service delivers nothing to a bot before that succeeds.

## Connect a bot step by step

### 1. Create the Telegram bot

Create a bot with [@BotFather](https://t.me/BotFather) and keep its token as `BOT_TOKEN` in your host's secrets. Use a bot that only your host controls. For local development with pull, use a separate test bot without a Telegram webhook.

### 2. Register the bot in the Service bot

Everything about your tg-support account happens in the Service bot in Telegram. The currently deployed Service (stand) is:

- Service bot: [@relay_group_bot](https://t.me/relay_group_bot)
- Service URL: `https://tg-support.by-alex.dev/v1` — set it as `TG_SUPPORT_SERVICE_URL` (it includes `/v1`)

In the Service bot:

1. Send `/start` and accept the terms (`/terms` shows them again).
2. Get access: pay for a plan (`/plan`) or redeem an invite code with `/invite <code>`.
3. Send `/newbot <name>`. The reply contains the signing secret `tgs1.<UUID>.<key>`. Save it as `TG_SUPPORT_SECRET` right away: the Service bot deletes that message after ten minutes. If you lose it, `/rotate <bot_id>` issues a new one (`/bots` lists your bots and their IDs). The UUID in the secret is the Service's bot ID; it differs from the numeric Telegram bot ID in `BOT_TOKEN`.

Never send the Telegram bot token or your host keys to the Service bot. `/help` lists all Service bot commands.

### 3. Install the SDK and generate host keys

```sh
npm install --save-exact tg-support-sdk
npx tg-support-sdk keys
```

`keys` prints `TOKEN_KEY=…` and `SEAL_KEYS=…`. Back up `TOKEN_KEY` outside the host now, then store both only in your host's secrets. The keys never leave your host; the Service never sees them.

### 4. Prepare the support group

1. Create a Telegram group for support and enable **Topics** in its settings. Telegram turns the group into a forum supergroup.
2. Add your bot to the group and promote it to administrator with at least **Manage Topics** and **Pin Messages**. The bot creates a topic per user and pins a topic header with the user's profile in it.
3. Add your operators as members of the group. They need no admin rights. Every member's message in a user's topic is delivered to that user, so invite only people who answer users.
4. Find the group ID: a negative number starting with `-100`. Read it after enabling Topics, because enabling Topics can change the ID. Either open the group in [Telegram Web](https://web.telegram.org/a/) and copy the number after `#` in the address bar, or, while the bot has no webhook, send any message in the group and open `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`: the ID is `message.chat.id`. Save it as `SUPPORT_GROUP_ID`.

Two optional features in the configuration:

- `features.notificationsTopic`: the bot creates a shared "Notifications" topic with a notice for every new user. An operator's reply to that notice goes to that user; other messages in the topic stay in the group, so operators can talk there.
- `features.welcomeHint`: the bot sends and pins a short hint in each new user's private chat saying that the chat is connected to support.

### 5. Collect the host settings

| Variable | Value | Needed by |
| --- | --- | --- |
| `BOT_TOKEN` | Telegram bot token from @BotFather | all hosts |
| `TG_SUPPORT_SERVICE_URL` | Service URL including `/v1` (step 2) | all hosts |
| `TG_SUPPORT_SECRET` | signing secret `tgs1.<UUID>.<key>` from `/newbot` | all hosts |
| `TOKEN_KEY`, `SEAL_KEYS` | output of `npx tg-support-sdk keys` | all hosts |
| `SUPPORT_GROUP_ID` | support group ID, `-100…` | all hosts |
| `TG_SUPPORT_CONFIG_REVISION` | a non-negative integer you increase whenever the group, features, transport, host URL or attempt deadline change, for example the CI run number or the build time in seconds | all hosts |
| `TG_SUPPORT_HOST_URL` | exact public HTTPS URL of your tg-support command endpoint, including any path and query | push hosts |
| `TELEGRAM_WEBHOOK_SECRET` | random string for Telegram's `secret_token`, for example `openssl rand -hex 32` | webhook hosts |

Registering the same revision again with the same configuration is accepted without changes, so rerunning `configure` or restarting a host is safe. The same revision with a different configuration fails with `config_conflict`.

### 6a. Serverless push host: Cloudflare Pages Functions

Share a configuration factory between the functions:

```ts
// support.ts
import { createWebTgSupport, parseKeys } from "tg-support-sdk";

export interface Env {
  BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_SECRET: string;
  TG_SUPPORT_SERVICE_URL: string;
  TG_SUPPORT_SECRET: string;
  TOKEN_KEY: string;
  SEAL_KEYS: string;
  SUPPORT_GROUP_ID: string;
  TG_SUPPORT_HOST_URL: string;
  TG_SUPPORT_CONFIG_REVISION: string;
}

export function support(env: Env) {
  return createWebTgSupport({
    botToken: env.BOT_TOKEN,
    service: { url: env.TG_SUPPORT_SERVICE_URL, botSecret: env.TG_SUPPORT_SECRET },
    keys: parseKeys({ tokenKey: env.TOKEN_KEY, sealKeys: env.SEAL_KEYS }),
    supportGroupId: Number(env.SUPPORT_GROUP_ID),
    features: { notificationsTopic: false, welcomeHint: false },
    transport: { kind: "push", hostUrl: env.TG_SUPPORT_HOST_URL },
    configRevision: Number(env.TG_SUPPORT_CONFIG_REVISION),
  });
}
```

`functions/telegram.ts` is the Telegram webhook. It authenticates Telegram's webhook secret, then hands the update to the SDK. Route your own commands and payment updates before this handoff; updates the SDK does not support are ignored.

```ts
// functions/telegram.ts
import { support, type Env } from "../support";

// The fields of Cloudflare's EventContext used here; `PagesFunction<Env>` from @cloudflare/workers-types also fits.
type Context = { request: Request; env: Env; waitUntil(promise: Promise<unknown>): void };

export async function onRequestPost(context: Context): Promise<Response> {
  const secret = context.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || context.request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }
  const update: unknown = await context.request.json();
  await support(context.env).handleUpdate(update, { waitUntil: work => context.waitUntil(work) });
  return new Response("OK");
}
```

`functions/tg-support.ts` is the signed command endpoint (push). Set `TG_SUPPORT_HOST_URL` to its exact public URL, for example `https://<project>.pages.dev/tg-support`. It answers 202 at once; Telegram calls and result delivery run in `waitUntil`, in batch order.

```ts
// functions/tg-support.ts
import { support, type Env } from "../support";

type Context = { request: Request; env: Env; waitUntil(promise: Promise<unknown>): void };

export async function onRequestPost(context: Context): Promise<Response> {
  return support(context.env).handleCommandRequest(context.request, { waitUntil: work => context.waitUntil(work) });
}
```

The serverless runtime never registers its configuration. Do it in the deploy pipeline, after the functions are deployed, with a Node module whose default export is the same configuration plus `botToken`:

```ts
// tg-support.config.ts
import { parseKeys, type TgSupportConfig } from "tg-support-sdk";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return value;
}

export default {
  botToken: env("BOT_TOKEN"),
  service: { url: env("TG_SUPPORT_SERVICE_URL"), botSecret: env("TG_SUPPORT_SECRET") },
  keys: parseKeys({ tokenKey: env("TOKEN_KEY"), sealKeys: env("SEAL_KEYS") }),
  supportGroupId: Number(env("SUPPORT_GROUP_ID")),
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: env("TG_SUPPORT_HOST_URL") },
  configRevision: Number(env("TG_SUPPORT_CONFIG_REVISION")),
} satisfies TgSupportConfig & { botToken: string };
```

```sh
npx tg-support-sdk configure --config ./tg-support.config.ts
```

Node 24 loads a `.ts` module directly; a `.mjs` module without the type annotation works the same. Keep the functions' environment and the `configure` environment describing the same bot, group, features, URL and revision. On success the command prints `tg-support configuration registered.`; on failure it prints every problem with advice and exits with status 1 (see [Errors](#errors)). After the first registration the Service confirms `TG_SUPPORT_HOST_URL` with a signed challenge to your command endpoint, so deploy the endpoint first.

Finally, point Telegram's webhook at `functions/telegram.ts`; the SDK does not set it:

```sh
curl -sS "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" \
  --data-urlencode "url=https://<project>.pages.dev/telegram" \
  --data-urlencode "secret_token=$TELEGRAM_WEBHOOK_SECRET" \
  --data-urlencode 'allowed_updates=["message","edited_message","message_reaction","callback_query"]'
```

Add the update types your own bot needs to `allowed_updates`. The SDK needs the four shown (also available as `tgSupport.allowedUpdates`).

### 6b. Long-lived grammY host with pull (local development, no public URL)

Install `grammy`. This host registers its configuration in `start()` and claims commands itself, so it needs no `configure` step and no public URL. The SDK creates no timers: the host runs the command loop, and this example retries transient failures with backoff instead of crashing.

```ts
// pull-host.ts
import { setTimeout as sleep } from "node:timers/promises";
import { Bot } from "grammy";
import { parseKeys, ServiceError, StartupError, type TgSupportEvent } from "tg-support-sdk";
import { createGrammyTgSupport } from "tg-support-sdk/grammy";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return value;
}
const backoff = (failures: number) => Math.min(60_000, 1_000 * 2 ** failures);

const bot = new Bot(env("BOT_TOKEN"));
const tgSupport = createGrammyTgSupport(bot, {
  service: { url: env("TG_SUPPORT_SERVICE_URL"), botSecret: env("TG_SUPPORT_SECRET") },
  keys: parseKeys({ tokenKey: env("TOKEN_KEY"), sealKeys: env("SEAL_KEYS") }),
  supportGroupId: Number(env("SUPPORT_GROUP_ID")),
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "pull" },
  configRevision: Number(env("TG_SUPPORT_CONFIG_REVISION")),
});

// Checks the bot and group, then registers. Telegram or Service outages are worth retrying; other problems need a fix.
const transient = new Set(["bot_identity_unavailable", "network", "rate_limited", "server_error"]);
for (let failures = 1; ; failures++) {
  try {
    await tgSupport.start();
    break;
  } catch (error) {
    if (!(error instanceof StartupError) || !error.problems.every(problem => transient.has(problem)) || failures === 5) throw error;
    console.warn(`tg-support startup failed (${error.problems.join(", ")}); retrying`);
    await sleep(backoff(failures));
  }
}

// Sends each user event, retrying transient Service failures before grammY moves on to the next update.
async function deliver(events: TgSupportEvent[]): Promise<void> {
  for (let failures = 1; ; failures++) {
    const result = await tgSupport.send(events);
    if (result.kind === "accepted") return;
    if (result.kind === "fatal" || failures === 5) throw new ServiceError(result);
    await sleep(result.retryAfterMs ?? backoff(failures));
  }
}
bot.use(tgSupport.middleware(deliver));
// Register your own handlers after this middleware.
bot.catch(({ error }) => {
  console.error("Update failed:", error instanceof ServiceError ? error.result.reason : error);
});

// Claims and executes commands until shutdown. poll() throws ServiceError on any claim or result failure.
async function pollCommands(signal: AbortSignal): Promise<void> {
  let failures = 0;
  while (!signal.aborted) {
    try {
      await tgSupport.poll();
      failures = 0;
      await sleep(1_000, undefined, { signal });
    } catch (error) {
      if (signal.aborted) return;
      if (!(error instanceof ServiceError)) throw error;
      failures++;
      const { result } = error;
      const delay = result.kind === "retryable" ? result.retryAfterMs ?? backoff(failures) : 60_000;
      console.warn(`tg-support poll failed (${result.reason}); retrying in ${delay} ms`);
      await sleep(delay, undefined, { signal }).catch(() => {});
    }
  }
}

const shutdown = new AbortController();
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => { shutdown.abort(); void bot.stop(); });
}
await Promise.all([
  bot.start({ allowed_updates: ["message", "edited_message", "message_reaction", "callback_query"] }),
  pollCommands(shutdown.signal),
]);
```

Run it with `node pull-host.ts` and the variables from step 5. A fatal `poll()` failure such as `bot_inactive` or `account_blocked` keeps the loop alive at a slow pace, so the host resumes once the account is fixed in the Service bot.

### 6c. Long-lived grammY host with push

Use `transport: { kind: "push", hostUrl: env("TG_SUPPORT_HOST_URL") }`, call `await tgSupport.start()` and `bot.use(tgSupport.middleware(…))` as in 6b, and serve `tgSupport.handleCommandRequest(request, { waitUntil })` at `TG_SUPPORT_HOST_URL` with the same `Request` and `Response` interface as the Web adapter. Before `start()` completes, the command endpoint answers 503. Do not run `poll()` for push.

### 7. Check the connection

From a Telegram account that is not in the support group, send a message to your bot. A topic named after that user appears in the support group with a pinned header. Reply in that topic from an operator account: the user receives the reply, and the operator's message gets a 👀 reaction once delivered.

## Errors

### `ConfigError`: invalid configuration

`createWebTgSupport`, `createGrammyTgSupport`, `createTgSupport`, `configure` and `parseKeys` throw `ConfigError` before any network request:

| Message | Fix |
| --- | --- |
| `Service and push URLs must use HTTPS without credentials or fragments.` | Check `TG_SUPPORT_SERVICE_URL` and `TG_SUPPORT_HOST_URL`. |
| `supportGroupId must identify a supergroup.` | Use the negative `-100…` ID; `Number(…)` of a missing variable is `NaN`. |
| `previousSupportGroupIds must identify supergroups.` | List only former `-100…` group IDs. |
| `configRevision must be a nonnegative integer.` | Set `TG_SUPPORT_CONFIG_REVISION` to an integer. |
| `Attempt deadline must be between 30 and 600 seconds.` | Fix `attemptDeadlineSeconds` or omit it (60). |
| `Invalid host keyring.`, `TOKEN_KEY must contain 32 bytes.`, `Invalid SEAL_KEYS keyring.` and other key or base64url messages | Use the unchanged output of `npx tg-support-sdk keys`. |
| `Invalid signing secret format.`, `Signing secret must contain 32 bytes.` | Copy the full `tgs1.<UUID>.<key>` secret from the Service bot. |
| `Invalid Telegram bot token.` | Copy the token from @BotFather. |
| `Template fallback must belong to the configured languages.` | Add `templates.fallback` to `templates.languages`. |

The `configure` CLI prints `Configuration failed. Check the config module and host secrets.` for a configuration module that cannot be loaded or a `ConfigError`; check the variables above.

### `StartupError`: `configure` and `start()` problems

`configure` and grammY `start()` throw `StartupError`. Its `problems` lists every code found, and its message adds advice for each. Telegram checks run first; when any fails, nothing is sent to the Service. Then the Service answers `bot_configured`.

| Code | Meaning | Action |
| --- | --- | --- |
| `bot_identity_unavailable` | Telegram `getMe` failed: wrong or revoked `BOT_TOKEN`, or Telegram unreachable. A freshly created bot can fail briefly. | Check the token with @BotFather; retry in a minute. |
| `telegram_bot_mismatch` | `getMe` returned a different bot than `BOT_TOKEN` names. | Use the bot token that belongs to this configuration. |
| `support_group_unavailable` | The bot cannot read the group: wrong `SUPPORT_GROUP_ID`, the bot is not a member, or the ID changed when Topics were enabled. | Add the bot to the group and copy the current `-100…` ID. |
| `support_group_not_forum` | The group has no Topics. | Enable Topics, then recheck the group ID. |
| `bot_not_administrator` | The bot is a regular member. | Promote the bot to administrator. |
| `bot_cannot_manage_topics` | The administrator lacks Manage Topics. | Grant Manage Topics. |
| `bot_cannot_pin_messages` | The administrator lacks Pin Messages; the bot could not pin topic headers. | Grant Pin Messages. |
| `network`, `server_error`, `rate_limited` | The Service was unreachable, failed or asked to slow down. | Check that `TG_SUPPORT_SERVICE_URL` is the HTTPS Service URL with `/v1`; retry later. |
| `unknown_bot` | The Service does not know the bot in `TG_SUPPORT_SECRET`: it was deleted, or the secret belongs to another Service. | Use a secret from this Service's `/newbot` or `/rotate`. |
| `bad_signature` | `TG_SUPPORT_SECRET` is wrong or was replaced by `/rotate` more than 24 hours ago. | Use the current secret; `/rotate <bot_id>` issues a new one. |
| `stale_timestamp` | The host clock is more than five minutes off. | Synchronize the host clock. |
| `bot_mismatch` | This Service bot is already bound to another Telegram bot. | Use the secret issued for this Telegram bot, or `/newbot` for a new one. |
| `config_conflict` | The same `configRevision` was registered with a different configuration. | Increase `TG_SUPPORT_CONFIG_REVISION`. |
| `sdk_too_old` | The Service requires a newer SDK. | Upgrade `tg-support-sdk`. |
| `invalid_host_url` | The Service rejected `TG_SUPPORT_HOST_URL`. | Use a public HTTPS URL without credentials or a fragment that does not resolve to a private address. |
| `account_blocked` | The Service admin blocked the account. | Contact the Service admin. |
| `bot_inactive` | The account has no active access, or this bot is over the plan's bot limit. | Check `/plan`; upgrade or delete another bot with `/deletebot`. |
| `malformed` or another code | The Service could not parse the request; a URL that is not the Service `/v1` URL also ends here. | Check `TG_SUPPORT_SERVICE_URL`; upgrade the SDK. |

### Runtime results

`send` never throws; it returns `{ kind: "accepted" }`, `{ kind: "retryable", reason, retryAfterMs? }` (`network`, `rate_limited`, `server_error`: retry the same events later) or `{ kind: "fatal", status, reason, detail, acceptedTypes? }` (the codes above; retrying the same request without a fix does not help). `claim`, `poll` and the grammY middleware throw `ServiceError`, whose `result` is that same failure. With `bot_inactive` or `account_blocked`, the Service still accepts `operation_result` and `user_forget` events; `acceptedTypes` lists them so you can resend those separately. Before `start()` completes, the grammY adapter's `normalize`, `execute` and `handleUpdate` throw `NotStartedError`.

## Event delivery

`handleUpdate` normalizes the update into a sealed tg-support event and sends it; with `waitUntil` the send continues after you answer Telegram, otherwise it is awaited. A failed send is only logged. Pass a logger to see its diagnostic codes, which never include update bodies:

```ts
import { createWebTgSupport, parseKeys } from "tg-support-sdk";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return value;
}

const tgSupport = createWebTgSupport({
  botToken: env("BOT_TOKEN"),
  service: { url: env("TG_SUPPORT_SERVICE_URL"), botSecret: env("TG_SUPPORT_SECRET") },
  keys: parseKeys({ tokenKey: env("TOKEN_KEY"), sealKeys: env("SEAL_KEYS") }),
  supportGroupId: Number(env("SUPPORT_GROUP_ID")),
  features: { notificationsTopic: false, welcomeHint: false },
  transport: { kind: "push", hostUrl: env("TG_SUPPORT_HOST_URL") },
  configRevision: Number(env("TG_SUPPORT_CONFIG_REVISION")),
}, {
  logger: { warn: event => console.warn("tg-support", event.kind, event.reason ?? "") },
});

export async function onTelegramUpdate(update: unknown): Promise<void> {
  // Immediate delivery: wait for the Service before acknowledging the update.
  const event = await tgSupport.normalize(update);
  if (!event) return;
  const result = await tgSupport.send([event]);
  if (result.kind !== "accepted") throw new Error(`tg-support did not accept the event: ${result.reason}`);
}
```

Without a host retry policy, an event can be lost during an outage. For durable delivery, save the normalized event in your own outbox before acknowledging Telegram, and resend that exact event (with the same `eventId`) until it is accepted. Normalizing the same update again gives the same `eventId`, and the Service ignores repeats, so retries are safe. Keep each user's events in order:

```ts
import type { TgSupport, TgSupportEvent } from "tg-support-sdk";

// Your storage, for example a database table.
export interface Outbox {
  put(id: string, event: TgSupportEvent): Promise<void>;
  ready(): AsyncIterable<{ id: string; event: TgSupportEvent }>;
  remove(id: string): Promise<void>;
  defer(id: string, delayMs: number | undefined): Promise<void>;
  block(id: string, reason: string): Promise<void>;
}

export async function accept(tgSupport: TgSupport, outbox: Outbox, update: unknown): Promise<void> {
  const event = await tgSupport.normalize(update);
  if (event) await outbox.put(event.eventId, event);
}

// A separate worker preserves acceptance order within each user's events.
export async function drain(tgSupport: TgSupport, outbox: Outbox): Promise<void> {
  for await (const entry of outbox.ready()) {
    const result = await tgSupport.send([entry.event]);
    if (result.kind === "accepted") await outbox.remove(entry.id);
    else if (result.kind === "retryable") await outbox.defer(entry.id, result.retryAfterMs);
    else await outbox.block(entry.id, result.reason);
  }
}
```

The grammY middleware sends each event and awaits `next()`; a failed send throws `ServiceError`, which grammY passes to `bot.catch`. Pass an `onEvents` callback to `middleware` to deliver events your own way, as `deliver` in 6b or into an outbox. Do not install grammY retry or throttling transformers for support calls; the Service owns Telegram retries and quotas.

## Reference

### Other Telegram clients and lower-level calls

For another Telegram client, `createTgSupport({ config, telegramBotId, botApi, ...options })` accepts a typed `BotApi` adapter; `getChatMember` must report `canManageTopics` and `canPinMessages`. All constructors accept options: a `fetch(Request)` function, a millisecond `clock.now()`, a `logger` for diagnostic codes and an optional `resolveProfile(userId)`.

The lower-level interface exposes `normalize`, `hostNotice`, `userForget`, `send`, `receivePush`, `execute`, `claim` and `heartbeat`. A host without grammY polls with `claim()`, then `execute(command)` and `send([result])` for each command, in its own loop with its own retries. Claim responses require a valid Service signature. Push and pull use the same command authorization, sealed data and result events.

For Node TypeScript hosts that check dependency declarations (`skipLibCheck: false`) and use grammY, install `@types/node` and `@types/node-fetch@2` as development dependencies: grammY's Node declarations import `fs` and node-fetch 2, whose [TypeScript instructions](https://github.com/node-fetch/node-fetch#typescript) require the separate types. The main Web entry does not need them.

### Templates

`templates` accepts `languages`, `fallback` and per-template, per-language `overrides`. Render callbacks receive `{ profile, language, verifiedUserId, reactions }`. `reactions` is the rendered list for `user_reacted` (emoji as is, paid reactions as ⭐, custom emoji as a short label) and `null` for other templates. For `topic_title`, `topic_header` and `new_user_notice`, the ID comes from the authenticated private-chat block after its user token is checked. A missing display profile does not remove that verified ID. Other templates receive `null`; omit mentions when there is no verified ID. Profile fields are display data and cannot supply the mention's identity. Use plain text and Telegram entities to keep names literal. Templates resolve the current profile at execution and include the verified user's ID in the default topic tag and pinned-header link.

Language selection uses an exact match, then the base language, then `fallback`. If an override lacks that translation but has a fallback-language translation, the fallback callback receives the fallback language. A template without an override keeps its SDK text. Unknown or wrong-slot template IDs are rejected before Telegram is called.

### Changing the support group

Increase `configRevision`, register the new `supportGroupId` (`configure` or `start()`), and keep the former IDs in `previousSupportGroupIds`, for example `previousSupportGroupIds: [oldSupportGroupId]`. Store this list with your host configuration so it survives every restart. It is local to the host and is not sent to the Service.

The Service keeps pending private copies, edits and reactions for operator replies already accepted from the previous group. The SDK permits those groups only as authenticated sources for the command's own private-chat user, using the original topic or notice binding. Every group destination remains the current `supportGroupId`; new updates from previous groups are ignored. Without the list, previous groups are rejected. Keep a previous ID while its pending deliveries must still succeed, and keep the original host keys. Returning to a former group creates fresh user topics.

### Keys

Store `TOKEN_KEY` permanently: replacing it changes users' identities and loses every topic and message link. `SEAL_KEYS` is a comma-separated `kid:base64url-key` list; the first key seals new data, and the others open older data. `npx tg-support-sdk keys --seal` creates another seal entry: put it first when rotating, and never remove old entries.

### Messages, edits and reactions

For a support reply, `replyScopedMessageId` contains the current operator message ID sealed under the replied-to message token. A notice binding authorizes that notice's scope and user; the message being copied is the operator's reply, which has its own distinct ID.

Edited messages preserve text or caption, Telegram entities, link-preview options and caption position in sealed content. A media edit without the optional caption becomes an empty caption, so removing a caption also reaches the copy. Each edit reports its `(editDate, updateId)` revision; the Service selects the latest revision and handles replacement when Telegram can no longer edit the copy. Telegram error codes and descriptions remain available in the operation result for that decision.

Private and support reaction updates carry the complete new list in a sealed block. An empty list removes reactions from the paired message. Commands accept sealed reactions or the delivery marker `👀`; other open reaction values are rejected. Support reaction events identify the group and message without a topic field, because Telegram does not include a topic ID in these updates. A user's reaction to an operator reply appears in the topic as a short notice replying to the operator's message.

Support edits and reactions seal their content under the source message token. Commands consuming them provide `source_message_id`: the sealed ID already stored for the group side of the message pair. A THREAD- or notice-scoped source ID also requires its existing topic or notice binding. The SDK authenticates this proof for the command's user, checks its group chat and opens content only for that message; the target message ID is checked against the destination chat separately. Private USER-scoped content omits `source_message_id`.

Telegram errors keep their code, description and `retry_after` in operation results; transport errors contain no external exception details.
