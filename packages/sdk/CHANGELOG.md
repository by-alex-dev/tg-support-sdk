# Changelog

## 1.1.0 — 2026-10-13

- A User reaction to a copy of an Operator reply is shown in the topic as a short `user_reacted` notice replying to the Operator message, instead of replacing the 👀 delivery mark (a Bot can hold only one reaction per message). The Service sends the notice with `sendMessage`, changes it with `editMessageText` and removes it with `deleteMessage`.
- `user_reaction` events report `cleared: true` when the new list is empty. The Service uses the notice only for Hosts that report `cleared`; older Hosts keep the mirrored reaction.
- `editMessageText` also accepts a `text` template reference (`user_reacted` only) instead of sealed `content`. The template opens the User's sealed `reactions` block under the command subject; an empty list is rejected as `malformed`.
- Template render callbacks receive `reactions` (`null` for templates other than `user_reacted`). Built-in texts: «Пользователь отреагировал: …» and "The user reacted: …".
- `bot_configured.sdk_version` becomes `tg-support-sdk/1.1.0`. Protocol v1, Host keys and configuration remain compatible with 1.0.

## 1.0.1 — published 2026-10-13

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

Publication and Host adoption remain separate from source preparation; release artifacts do not replace live onboarding and Telegram verification.
