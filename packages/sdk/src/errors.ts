import type { SendResult } from "./types.ts";

export class ConfigError extends Error { override name = "ConfigError"; }
export class ServiceError extends Error {
  override name = "ServiceError";
  readonly result: Exclude<SendResult, { kind: "accepted" }>;
  constructor(result: Exclude<SendResult, { kind: "accepted" }>) {
    super("Support Relay service request failed.");
    this.result = result;
  }
}
export class StartupError extends Error {
  override name = "StartupError";
  readonly problems: readonly string[];
  constructor(problems: readonly string[]) { super("Support Relay configuration could not be registered."); this.problems = problems; }
}
