#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { configure, generateKeys } from "./index.ts";
import { StartupError } from "./errors.ts";
import type { TgSupportConfig } from "./types.ts";

// A message written by the CLI itself, safe to print. Other errors can carry host secrets read by the config module.
class CliError extends Error {}

// Names why the config module did not load without printing the error's message, which can quote a host secret.
function loadFailure(error: unknown): CliError {
  if (error instanceof SyntaxError && /^(Cannot use import statement outside a module|Unexpected token 'export')$/.test(error.message)) {
    return new CliError('The config module uses import or export, but Node loaded it as CommonJS. Set "type": "module" in package.json (npm pkg set type=module) or give the module the .mts extension.');
  }
  const name = error instanceof Error && /^\w{1,64}$/.test(error.name) ? error.name : "unknown error";
  const code = (error as { code?: unknown } | null)?.code;
  const label = typeof code === "string" && /^[A-Z][A-Z0-9_]{0,63}$/.test(code) ? `${name} ${code}` : name;
  return new CliError(`Could not load the config module (${label}). Check the module and the host secrets it reads.`);
}

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
  const module: { default?: TgSupportConfig & { botToken: string } } = await import(pathToFileURL(resolve(argument)).href).catch((error: unknown) => { throw loadFailure(error); });
  if (!module.default) throw new CliError("Config module must have a default export.");
  await configure(module.default);
  console.log("tg-support configuration registered.");
}
main().catch((error: unknown) => {
  console.error(error instanceof StartupError || error instanceof CliError ? error.message : "Configuration failed. Check the config module and host secrets.");
  process.exitCode = 1;
});
