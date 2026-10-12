import { createBrowserProtocolValidators } from "tg-support-protocol/browser-validation";
import type { Command as WireCommand } from "tg-support-protocol";
import { concat, hmac, importHmac } from "./crypto.ts";
import { signingSecret } from "./config.ts";
import { ServiceError } from "./errors.ts";
import { record } from "./parse.ts";
import type { TgSupportConfig, TgSupportOptions, TgSupportEvent, Command, SendResult } from "./types.ts";

const encoder = new TextEncoder();
const validators = createBrowserProtocolValidators();
const hex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
export function createServiceLink(config: TgSupportConfig, options: TgSupportOptions) {
  const fetcher = options.fetch ?? ((request: Request) => fetch(request));
  const clock = options.clock ?? { now: () => Date.now() };
  const secret = signingSecret(config.service.botSecret);
  const key = importHmac(secret.key);
  const seen = new Map<string, number>();
  const path = (url: string) => { const parsed = new URL(url); return parsed.pathname + parsed.search; };
  const canonical = (kind: "REQ" | "RES", timestamp: string, method: string, route: string, bytes: Uint8Array) => concat(encoder.encode(`TGS1-${kind}\n${timestamp}\n${method}\n${route}\n`), bytes);
  const commands = (items: readonly WireCommand[]): Command[] => {
    const receivedAt = clock.now();
    for (const [token, expires] of seen) if (expires <= receivedAt) seen.delete(token);
    return items.flatMap((item) => {
      if (seen.has(item.attempt_token)) return [];
      seen.set(item.attempt_token, receivedAt + 3_600_000);
      if (seen.size > 10_000) { const oldest = seen.keys().next().value; if (oldest) seen.delete(oldest); }
      return [{ opId: item.op_id, attemptToken: item.attempt_token, deadlineSeconds: item.deadline_seconds,
        subject: item.subject, method: item.method, params: item.params, binding: item.binding,
        receivedAt, expiresAt: receivedAt + item.deadline_seconds * 1000 }];
    });
  };
  const verify = async (headers: Headers, bytes: Uint8Array<ArrayBuffer>, kind: "REQ" | "RES", method: string, route: string): Promise<boolean> => {
    const timestamp = headers.get("X-Tg-Support-Timestamp") ?? "";
    if (!/^(0|[1-9][0-9]*)$/.test(timestamp) || Math.abs(clock.now() / 1000 - Number(timestamp)) > 300) return false;
    const data = canonical(kind, timestamp, method, route, bytes);
    for (const signature of (headers.get("X-Tg-Support-Signature") ?? "").split(",")) {
      const match = /^v1=([a-f0-9]{64})$/.exec(signature.trim());
      if (!match?.[1]) continue;
      const digest = Uint8Array.from(match[1].match(/../g) ?? [], (part) => Number.parseInt(part, 16));
      if (await crypto.subtle.verify("HMAC", await key, digest, data)) return true;
    }
    return false;
  };
  const result = async (response: Response): Promise<SendResult> => {
    if (response.status >= 500) return { kind: "retryable", reason: "server_error" };
    if (response.status === 429) {
      const seconds = Number(response.headers.get("Retry-After"));
      return Number.isFinite(seconds) && seconds > 0 ? { kind: "retryable", reason: "rate_limited", retryAfterMs: seconds * 1000 } : { kind: "retryable", reason: "rate_limited" };
    }
    if (response.ok) return { kind: "accepted" };
    let body: unknown;
    try { body = await response.json(); } catch { body = null; }
    const object = record(body);
    const accepted = object?.accepted_types;
    return { kind: "fatal", status: response.status, reason: typeof object?.reason === "string" ? object.reason : "malformed", detail: "The service rejected the request.",
      ...(Array.isArray(accepted) && accepted.every((item) => typeof item === "string") ? { acceptedTypes: accepted } : {}) };
  };
  const post = async (endpoint: string, body: unknown): Promise<Response | null> => {
    const url = `${config.service.url.replace(/\/$/, "")}/${endpoint}`;
    const bytes = encoder.encode(JSON.stringify(body));
    const timestamp = String(Math.floor(clock.now() / 1000));
    try {
      const signature = hex(await hmac(await key, canonical("REQ", timestamp, "POST", path(url), bytes)));
      const response = await fetcher(new Request(url, { method: "POST", body: bytes, redirect: "manual", headers: { "Content-Type": "application/json", "X-Tg-Support-Bot": secret.botId, "X-Tg-Support-Timestamp": timestamp, "X-Tg-Support-Signature": `v1=${signature}` } }));
      return response.status >= 300 && response.status < 400 ? null : response;
    } catch { return null; }
  };
  return {
    async send(events: readonly TgSupportEvent[]): Promise<SendResult> {
      const response = await post("events", { events: events.map(toWire) });
      return response ? result(response) : { kind: "retryable", reason: "network" };
    },
    async receivePush(request: Request): Promise<{ response: Response; commands: Command[] }> {
      const rejected = (status: number) => ({ response: new Response(null, { status }), commands: [] });
      if (config.transport.kind !== "push") return rejected(503);
      if (request.method !== "POST") return rejected(400);
      const bytes = new Uint8Array(await request.arrayBuffer());
      if (!await verify(request.headers, bytes, "REQ", "POST", path(config.transport.hostUrl))) return rejected(401);
      let parsed: unknown;
      try { parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { return rejected(400); }
      const host = validators.parse("HostRequest", parsed);
      if (!host.ok) return rejected(400);
      if (host.value.kind === "challenge") {
        const response = hex(await hmac(await key, encoder.encode(`TGS1-CHALLENGE\n${config.transport.hostUrl}\n${host.value.nonce}`)));
        return { response: Response.json({ kind: "challenge", response }), commands: [] };
      }
      return { response: new Response(null, { status: 202 }), commands: commands(host.value.commands) };
    },
    async claim(): Promise<Command[]> {
      const response = await post("commands/claim", { max: 50 });
      if (!response) throw new ServiceError({ kind: "retryable", reason: "network" });
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (!await verify(response.headers, bytes, "RES", String(response.status), path(`${config.service.url.replace(/\/$/, "")}/commands/claim`))) throw new ServiceError({ kind: "fatal", status: 401, reason: "bad_signature", detail: "The claim response was not authenticated." });
      if (!response.ok) {
        const rejected = await result(new Response(bytes, { status: response.status, headers: response.headers }));
        if (rejected.kind !== "accepted") throw new ServiceError(rejected);
      }
      let value: unknown;
      try { value = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new ServiceError({ kind: "fatal", status: response.status, reason: "malformed_response", detail: "The claim response was malformed." }); }
      const parsed = validators.parse("ClaimResponse", value);
      if (!parsed.ok) throw new ServiceError({ kind: "fatal", status: response.status, reason: "malformed_response", detail: "The claim response was malformed." });
      return commands(parsed.value.commands);
    },
    async heartbeat(command: Command): Promise<{ kind: "accepted"; command: Command } | Exclude<SendResult, { kind: "accepted" }>> {
      const response = await post("heartbeat", { op_id: command.opId, attempt_token: command.attemptToken });
      if (!response) return { kind: "retryable", reason: "network" };
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (!await verify(response.headers, bytes, "RES", String(response.status), path(`${config.service.url.replace(/\/$/, "")}/heartbeat`))) return { kind: "fatal", status: 401, reason: "bad_signature", detail: "The heartbeat response was not authenticated." };
      if (!response.ok) { const rejected = await result(new Response(bytes, { status: response.status, headers: response.headers })); return rejected.kind === "accepted" ? { kind: "retryable", reason: "server_error" } : rejected; }
      let value: unknown;
      try { value = JSON.parse(new TextDecoder().decode(bytes)); } catch { value = null; }
      if (!validators.parse("HeartbeatResponse", value).ok) return { kind: "fatal", status: 400, reason: "malformed", detail: "The heartbeat response was malformed." };
      return { kind: "accepted", command: { ...command, expiresAt: Math.min(clock.now() + command.deadlineSeconds * 1000, command.receivedAt + 3_600_000) } };
    },
  };
}

function toWire(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toWire);
  const object = record(value);
  if (!object) return value;
  return Object.fromEntries(Object.entries(object).map(([key, child]) => [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), toWire(child)]));
}
