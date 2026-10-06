# Changelog

## 1.0.0 — prepared, not published

The public API is stabilized without breaking changes from 0.5.0. Existing Host configuration, keys, signing-secret format and protocol v1 data remain compatible. No key rotation or state migration is required by this release.

- `tg-support-sdk` retains `createTgSupport`, `createWebTgSupport`, `configure`, `fetchBotApi`, key helpers, error classes and the exported protocol/configuration types. The Web/core interface has no `start()` or `poll()`.
- `tg-support-sdk/grammy` retains `createGrammyTgSupport`, `grammyBotApi` and `GrammyTgSupport`: `start()`, optional `middleware(onEvents)` and one-shot `poll()` are adapter methods.
- Both package entries share runtime error classes. Errors thrown by the grammY adapter match the classes exported by `tg-support-sdk` in `instanceof` checks.
- `bot_configured.sdk_version` changes from `tg-support-sdk/0.5.0` to `tg-support-sdk/1.0.0`, derived from the package manifest. The Service minimum remains 0.4.0.
- Integrator documentation covers Service-bot onboarding, Pages Functions, grammY, getUpdates with pull and immediate/background/durable Event delivery. Key-loss, permanent old seal-key retention and Host delivery responsibilities are prominent.
- Design signatures match the existing implementation. Existing SDK conformance owners exercise the built public package entries.

Publication is a human action. Vislaw's registry dependency and live onboarding/Telegram checks follow publication; this source preparation does not claim those native #43 gates are complete.
