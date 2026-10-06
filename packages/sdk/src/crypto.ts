import { ConfigError } from "./errors.ts";
import type { BlobPurpose, Json, TgSupportKeys, TokenPurpose } from "./types.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });
export function base64url(bytes: Uint8Array): string {
  let value = "";
  for (const byte of bytes) value += String.fromCharCode(byte);
  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
export function decode64(value: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new ConfigError("Invalid base64url value.");
  const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/"));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  if (base64url(bytes) !== value) throw new ConfigError("Noncanonical base64url value.");
  return bytes;
}
export function concat(...parts: readonly Uint8Array[]): Uint8Array<ArrayBuffer> {
  const result = new Uint8Array(parts.reduce((size, part) => size + part.length, 0));
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.length; }
  return result;
}
export function lp(...parts: readonly (string | number | Uint8Array)[]): Uint8Array<ArrayBuffer> {
  return concat(...parts.map((part) => {
    const bytes = part instanceof Uint8Array ? part : encoder.encode(String(part));
    const length = new Uint8Array(4);
    new DataView(length.buffer).setUint32(0, bytes.length, false);
    return concat(length, bytes);
  }));
}
export async function hmac(key: CryptoKey, bytes: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes));
}
export function importHmac(key: Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", new Uint8Array(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export function generateKeys(): { tokenKey: string; sealKeys: string } {
  return { tokenKey: base64url(crypto.getRandomValues(new Uint8Array(32))), sealKeys: `${base64url(crypto.getRandomValues(new Uint8Array(3)))}:${base64url(crypto.getRandomValues(new Uint8Array(32)))}` };
}
export function parseKeys(input: { tokenKey: string; sealKeys: string }): TgSupportKeys {
  try {
    const tokenKey = decode64(input.tokenKey);
    if (tokenKey.length !== 32) throw new ConfigError("TOKEN_KEY must contain 32 bytes.");
    const keys: Record<string, Uint8Array> = {};
    let current: string | undefined;
    for (const item of input.sealKeys.split(",")) {
      const [kid, encoded, ...extra] = item.split(":");
      if (!kid || !/^[A-Za-z0-9_-]{4}$/.test(kid) || !encoded || extra.length || Object.hasOwn(keys, kid)) throw new ConfigError("Invalid SEAL_KEYS keyring.");
      const key = decode64(encoded);
      if (key.length !== 32) throw new ConfigError("A seal key must contain 32 bytes.");
      keys[kid] = key;
      current ??= kid;
    }
    if (!current) throw new ConfigError("SEAL_KEYS cannot be empty.");
    return { tokenKey, seal: { current, keys } };
  } catch (error) {
    if (error instanceof ConfigError) throw error;
    throw new ConfigError("Invalid host key encoding.");
  }
}
export function createKeyring(keys: TgSupportKeys, botId: number) {
  const tokenKey = importHmac(keys.tokenKey);
  const sealKeys = new Map(Object.entries(keys.seal.keys).map(([kid, bytes]) => [kid, crypto.subtle.importKey("raw", new Uint8Array(bytes), "AES-GCM", false, ["encrypt", "decrypt"])]));
  const aad = (purpose: BlobPurpose, subject: string) => lp("TGS1-SEAL", botId, purpose, decode64(subject));
  return {
    async token(purpose: TokenPurpose | "event" | "notice", ...parts: readonly (string | number)[]): Promise<string> {
      return base64url(await hmac(await tokenKey, lp(purpose, ...parts)));
    },
    async seal(purpose: BlobPurpose, subject: string, payload: Json): Promise<string> {
      const current = sealKeys.get(keys.seal.current);
      if (!current) throw new ConfigError("Current seal key is absent.");
      const nonce = crypto.getRandomValues(new Uint8Array(12));
      const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce, additionalData: aad(purpose, subject), tagLength: 128 }, await current, encoder.encode(JSON.stringify(payload)));
      return `s1.${keys.seal.current}.${base64url(nonce)}.${base64url(new Uint8Array(ciphertext))}`;
    },
    async open(purpose: BlobPurpose, subjects: readonly string[], blob: string): Promise<{ ok: true; value: unknown; subject: string } | { ok: false; error: "unknown_kid" | "blob_invalid" }> {
      if (blob.length > 65_536 || !/^s1\.[A-Za-z0-9_-]{4}\.[A-Za-z0-9_-]{16}\.[A-Za-z0-9_-]{22,}$/.test(blob)) return { ok: false, error: "blob_invalid" };
      const [, kid, encodedNonce, encodedCiphertext] = blob.split(".");
      if (!kid || !encodedNonce || !encodedCiphertext) return { ok: false, error: "blob_invalid" };
      const key = sealKeys.get(kid);
      if (!key) return { ok: false, error: "unknown_kid" };
      for (const subject of subjects) {
        try {
          const bytes = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decode64(encodedNonce), additionalData: aad(purpose, subject), tagLength: 128 }, await key, decode64(encodedCiphertext));
          return { ok: true, value: JSON.parse(decoder.decode(bytes)), subject };
        } catch { /* Try the next authorized subject. */ }
      }
      return { ok: false, error: "blob_invalid" };
    },
  };
}
export type Keyring = ReturnType<typeof createKeyring>;
