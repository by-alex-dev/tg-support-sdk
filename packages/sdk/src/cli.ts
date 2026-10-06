#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { configure, generateKeys } from "./index.ts";
import { StartupError } from "./errors.ts";
import type { TgSupportConfig } from "./types.ts";

async function main(): Promise<void> {
  const [command, flag, argument, ...extra] = process.argv.slice(2);
  if (command === "keys" && !extra.length && (!flag || flag === "--seal") && !argument) {
    const keys = generateKeys();
    console.error("Keep a backup of TOKEN_KEY. Losing it loses all topics and message bindings. Keep every old seal key after rotation.");
    if (flag !== "--seal") console.log(`TOKEN_KEY=${keys.tokenKey}`);
    console.log(`SEAL_KEYS=${keys.sealKeys}`);
    return;
  }
  if (command !== "configure" || flag !== "--config" || !argument || extra.length) throw new Error("Usage: tg-support-sdk keys [--seal] | configure --config ./tg-support.config.mjs");
  const module: { default?: TgSupportConfig & { botToken: string } } = await import(pathToFileURL(resolve(argument)).href);
  if (!module.default) throw new Error("Config module must have a default export.");
  await configure(module.default);
  console.log("tg-support configuration registered.");
}
main().catch((error: unknown) => {
  console.error(error instanceof StartupError ? `Configuration failed: ${error.problems.join(", ")}` : "Configuration failed. Check the config module and host secrets.");
  process.exitCode = 1;
});
