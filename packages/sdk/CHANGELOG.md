# Changelog

## 1.2.1 — unreleased

- The README's step 3 sets `"type": "module"` with `npm pkg set type=module`. In a project created by `npm init -y`, which npm 11 marks `"type": "commonjs"`, `node pull-host.ts` previously failed with `SyntaxError: Cannot use import statement outside a module`. The README explains the setting, gives the `.mts` extension for an existing CommonJS project and names Node 22.18 (and 23.6) as the first versions that run `.ts` files directly.
- The SDK tests run the README's pull example in a fresh `npm init -y` project set up by the README's commands, without edits.
- `bot_configured.sdk_version` becomes `tg-support-sdk/1.2.1`. The code, public API, protocol v1, Host keys and configuration are unchanged from 1.2.0.

## 1.2.0 — published 2026-10-13

- `configure` and grammY `start()` also check that the Bot may pin messages in the support group. An administrator without Pin Messages fails with the new startup problem `bot_cannot_pin_messages` ("Grant the bot the Pin Messages permission."); `bot_configured` is not sent and the grammY host does not start (the command endpoint keeps answering 503). Previously such a Bot registered successfully and then could not unpin and pin topic headers. The group creator passes, as for Manage Topics.
- `GroupFacts` gains an optional `canPinMessages` field, reported by `fetchBotApi` and `grammyBotApi`. A custom `BotApi` may report it from `inspectGroup` (Telegram `getChatMember`, `can_pin_messages`); when it is omitted, the pin right is not checked, so existing adapters keep compiling and working.
- `fetchBotApi` reads group rights as `grammyBotApi` does: a restricted member's `can_manage_topics` no longer counts as the administrator right.
- `bot_configured.sdk_version` becomes `tg-support-sdk/1.2.0`. Protocol v1, Host keys and configuration remain compatible with 1.1.
- The README is rewritten as a step-by-step guide for connecting a bot from scratch: the Service bot and Service URL, the signing secret, support group rights (Manage Topics and Pin Messages), the group ID, operators, the `features` flags, when `configure` is needed, and push and pull hosts. Every TypeScript example is self-contained, reads its values from the environment and is compiled against the built package in the SDK tests. The pull example retries transient Service and Telegram failures with backoff instead of crashing. `ConfigError` messages and `configure`/`start()` problem codes are documented with an action for each.
- The package manifest declares `description`, `homepage` and `license` (`UNLICENSED`). Maintainer publishing instructions are no longer in the README or the published package.

## 1.1.0 — published 2026-10-13

- A User reaction to a copy of an Operator reply is shown in the topic as a short `user_reacted` notice replying to the Operator message, instead of replacing the 👀 delivery mark (a Bot can hold only one reaction per message). The Service sends the notice with `sendMessage`, changes it with `editMessageText` and removes it with `deleteMessage`.
- `user_reaction` events report `cleared: true` when the new list is empty. The Service uses the notice only for Hosts that report `cleared`; older Hosts keep the mirrored reaction.
- `editMessageText` also accepts a `text` template reference (`user_reacted` only) instead of sealed `content`. The template opens the User's sealed `reactions` block under the command subject; an empty list is rejected as `malformed`.
- Template render callbacks receive `reactions` (`null` for templates other than `user_reacted`). Built-in texts: «Пользователь отреагировал: …» and "The user reacted: …".
- `bot_configured.sdk_version` becomes `tg-support-sdk/1.1.0`. Protocol v1, Host keys and configuration remain compatible with 1.0.

## 1.0.1 — published 2026-10-12

- Fix Service requests and native Bot API calls on Cloudflare Workers, where `Request` rejects `redirect: "error"` before fetching. Both clients use `redirect: "manual"` and reject every 3xx response without following its Location or forwarding credentials. A successful-looking Bot API body on a redirect is also rejected.
- Add a regression through the built public SDK in workerd, checking successful outbound requests and rejection of HTTP 301, 302, 303, 307 and 308 for both clients.
- Public API, protocol v1, Host keys and configuration remain compatible with 1.0.0.

## 1.0.0 — published 2026-10-07

The public API is stabilized without breaking changes from 0.5.0. Existing Host configuration, keys, signing-secret format and protocol v1 data remain compatible. No key rotation or state migration is required by this release.

- `tg-support-sdk` retains `createTgSupport`, `createWebTgSupport`, `configure`, `fetchBotApi`, key helpers, error classes and the exported protocol/configuration types. The Web/core interface has no `start()` or `poll()`.
- `tg-support-sdk/grammy` retains `createGrammyTgSupport`, `grammyBotApi` and `GrammyTgSupport`: `start()`, optional `middleware(onEvents)` and one-shot `poll()` are adapter methods.
- Both package entries share runtime error classes. Errors thrown by the grammY adapter match the classes exported by `tg-support-sdk` in `instanceof` checks.
- `bot_configured.sdk_version` changes from `tg-support-sdk/0.5.0` to `tg-support-sdk/1.0.0`, derived from the package manifest. The Service minimum remains 0.4.0.
- Integrator documentation covers Service-bot onboarding, Pages Functions, grammY, getUpdates with pull and immediate/background/durable Event delivery. Key-loss, permanent old seal-key retention and Host delivery responsibilities are prominent.
- Design signatures match the existing implementation. Existing SDK conformance owners exercise the built public package entries.
- Service messages are filtered against the grammY Message fields while ordinary invoice, giveaway and suggested-post content continues to produce normalized user events.
- Optional `previousSupportGroupIds` explicitly permits former groups as sources of pending private operator copies, edits and reactions after a group switch. Group destinations remain current, and the existing user and binding checks apply.
