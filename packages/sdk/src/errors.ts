import type { SendResult } from "./types.ts";

export class ConfigError extends Error { override name = "ConfigError"; }
export class NotStartedError extends Error {
  override name = "NotStartedError";
  constructor() { super("Call and await tgSupport.start() before handling updates or commands."); }
}
export class ServiceError extends Error {
  override name = "ServiceError";
  readonly result: Exclude<SendResult, { kind: "accepted" }>;
  constructor(result: Exclude<SendResult, { kind: "accepted" }>) {
    super("tg-support service request failed.");
    this.result = result;
  }
}
export class StartupError extends Error {
  override name = "StartupError";
  readonly problems: readonly string[];
  constructor(problems: readonly string[]) {
    const advice: Readonly<Record<string, string>> = {
      support_group_unavailable: "Check the support group ID and add the bot to that group.",
      support_group_not_forum: "Enable Topics in the support supergroup.",
      bot_not_administrator: "Promote the bot to an administrator of the support group.",
      bot_cannot_manage_topics: "Grant the bot the Manage Topics permission.",
      bot_cannot_pin_messages: "Grant the bot the Pin Messages permission.",
      telegram_bot_mismatch: "Use the bot token that belongs to this host configuration.",
      bot_identity_unavailable: "Check the bot token and Telegram connectivity.",
      bot_mismatch: "Use the signing secret issued for this Telegram bot.",
      bad_signature: "Check the signing secret issued by the tg-support Service bot.",
      config_conflict: "Increase configRevision when changing the bot configuration.",
      sdk_too_old: "Upgrade the host implementation to the Service's minimum version.",
      invalid_host_url: "Use a public HTTPS command endpoint without credentials or a fragment.",
      account_blocked: "Contact the Service admin about the blocked account.",
      bot_inactive: "Upgrade the account plan or remove another bot in the Service bot.",
      bot_paused: "Resume the bot with /resumebot <bot_id> in the Service bot.",
    };
    super(`tg-support configuration could not be registered. ${problems.map(problem => `${problem}: ${advice[problem] ?? "Check Service availability and the host configuration."}`).join(" ")}`);
    this.problems = problems;
  }
}
