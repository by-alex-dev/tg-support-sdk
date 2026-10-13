import assert from 'node:assert/strict';
import { test } from 'node:test';
import { compileAgainstSdk } from './compile.mjs';

// 1.2.0 is a minor release: a custom BotApi written against 1.1 must keep compiling. Pin rights are optional
// in GroupFacts; the built-in fetch and grammY adapters always report them.
test('a custom BotApi written for SDK 1.1 still compiles without reporting pin rights', { timeout: 60000 }, async t => {
  const result = await compileAgainstSdk(t, [['custom-bot-api.ts', `
import { createTgSupport, type BotApi, type TgSupportConfig } from "tg-support-sdk";
declare const config: TgSupportConfig;
const botApi: BotApi = {
  async call() { return { ok: true }; },
  async getProfile() { return { ok: true, profile: {} }; },
  async getMe() { return { id: 12345, username: "demo" }; },
  async inspectGroup() { return { found: true, isForum: true, botStatus: "administrator", canManageTopics: true }; },
};
createTgSupport({ config, botApi, telegramBotId: 12345 });
`]]);
  assert.ok(result.ok, `a 1.1 BotApi no longer compiles:\n${result.output}`);
});
