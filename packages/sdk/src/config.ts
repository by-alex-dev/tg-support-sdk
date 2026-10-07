import { ConfigError } from "./errors.ts";
import { decode64 } from "./crypto.ts";
import type { TgSupportConfig } from "./types.ts";

export function validateConfig(input: TgSupportConfig): TgSupportConfig {
  const validUrl = (value: string) => { try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password && !url.hash; } catch { return false; } };
  if (!validUrl(input.service.url) || (input.transport.kind === "push" && !validUrl(input.transport.hostUrl))) throw new ConfigError("Service and push URLs must use HTTPS without credentials or fragments.");
  if (!Number.isSafeInteger(input.supportGroupId) || input.supportGroupId >= 0) throw new ConfigError("supportGroupId must identify a supergroup.");
  if (input.previousSupportGroupIds !== undefined && (!Array.isArray(input.previousSupportGroupIds) || [...input.previousSupportGroupIds].some((id) => !Number.isSafeInteger(id) || id >= 0))) throw new ConfigError("previousSupportGroupIds must identify supergroups.");
  if (!Number.isSafeInteger(input.configRevision) || input.configRevision < 0) throw new ConfigError("configRevision must be a nonnegative integer.");
  const deadline = input.attemptDeadlineSeconds ?? 60;
  if (!Number.isInteger(deadline) || deadline < 30 || deadline > 600) throw new ConfigError("Attempt deadline must be between 30 and 600 seconds.");
  if (input.keys.tokenKey.length !== 32 || !/^[A-Za-z0-9_-]{4}$/.test(input.keys.seal.current) || !Object.hasOwn(input.keys.seal.keys, input.keys.seal.current)) throw new ConfigError("Invalid host keyring.");
  for (const [kid, key] of Object.entries(input.keys.seal.keys)) if (!/^[A-Za-z0-9_-]{4}$/.test(kid) || key.length !== 32) throw new ConfigError("Invalid host keyring.");
  signingSecret(input.service.botSecret);
  if (input.templates && (!input.templates.languages.includes(input.templates.fallback) || input.templates.languages.length === 0)) throw new ConfigError("Template fallback must belong to the configured languages.");
  return { ...input, ...(input.previousSupportGroupIds !== undefined ? { previousSupportGroupIds: [...new Set(input.previousSupportGroupIds)] } : {}), service: { ...input.service }, keys: { tokenKey: new Uint8Array(input.keys.tokenKey), seal: { current: input.keys.seal.current, keys: Object.fromEntries(Object.entries(input.keys.seal.keys).map(([kid, key]) => [kid, new Uint8Array(key)])) } }, features: { ...input.features }, transport: { ...input.transport } };
}
export function signingSecret(secret: string): { botId: string; key: Uint8Array<ArrayBuffer> } {
  const match = /^tgs1\.([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\.([A-Za-z0-9_-]{43})$/.exec(secret);
  if (!match?.[1] || !match[2]) throw new ConfigError("Invalid signing secret format.");
  const key = decode64(match[2]);
  if (key.length !== 32) throw new ConfigError("Signing secret must contain 32 bytes.");
  return { botId: match[1], key };
}
export function telegramBotId(token: string): number {
  const match = /^([1-9][0-9]*):[A-Za-z0-9_-]+$/.exec(token);
  const id = Number(match?.[1]);
  if (!Number.isSafeInteger(id) || id <= 0) throw new ConfigError("Invalid Telegram bot token.");
  return id;
}
