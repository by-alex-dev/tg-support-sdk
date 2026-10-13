import { createKeyring } from "./crypto.ts";
import { createNormalizer } from "./normalize.ts";
import { createServiceLink } from "./link.ts";
import { StartupError } from "./errors.ts";
import type { BotApi, TgSupportConfig, TgSupportOptions } from "./types.ts";

export async function registerBot(config: TgSupportConfig, botId: number, api: BotApi, options: TgSupportOptions): Promise<void> {
  const problems: string[] = [];
  try { if ((await api.getMe()).id !== botId) problems.push("telegram_bot_mismatch"); } catch { problems.push("bot_identity_unavailable"); }
  try {
    const group = await api.inspectGroup(config.supportGroupId, botId);
    if (!group.found) problems.push("support_group_unavailable");
    else { if (!group.isForum) problems.push("support_group_not_forum"); if (!["administrator", "creator"].includes(group.botStatus)) problems.push("bot_not_administrator"); if (!group.canManageTopics) problems.push("bot_cannot_manage_topics"); if (!group.canPinMessages) problems.push("bot_cannot_pin_messages"); }
  } catch { problems.push("support_group_unavailable"); }
  if (problems.length) {
    for (const reason of problems) options.logger?.warn?.({ kind: "configuration_rejected", reason });
    throw new StartupError(problems);
  }
  const keys = createKeyring(config.keys, botId);
  const event = await createNormalizer(config, botId, keys).botConfigured();
  const result = await createServiceLink(config, options).send([event]);
  if (result.kind !== "accepted") {
    options.logger?.warn?.({ kind: "configuration_rejected", reason: result.reason });
    throw new StartupError([result.reason]);
  }
}
