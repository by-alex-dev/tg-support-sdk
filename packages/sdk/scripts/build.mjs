import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { readdir, readFile, writeFile, copyFile, chmod, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const checked = spawnSync(process.execPath, [resolve(root, "../../node_modules/typescript/bin/tsc"), "-p", resolve(root, "tsconfig.json"), "--emitDeclarationOnly"], { stdio: "inherit" });
if (checked.status !== 0) process.exit(checked.status ?? 1);
const cliChecked = spawnSync(process.execPath, [resolve(root, "../../node_modules/typescript/bin/tsc"), "-p", resolve(root, "tsconfig.cli.json"), "--noEmit"], { stdio: "inherit" });
if (cliChecked.status !== 0) process.exit(cliChecked.status ?? 1);
await mkdir(resolve(root, "dist"), { recursive: true });
await copyFile(resolve(root, "../protocol/dist/src/wire.d.ts"), resolve(root, "dist/protocol.d.ts"));
for (const file of await readdir(resolve(root, "dist"))) {
  if (!file.endsWith(".d.ts")) continue;
  const target = resolve(root, "dist", file);
  const source = await readFile(target, "utf8");
  await writeFile(target, source.replaceAll('"tg-support-protocol"', '"./protocol.js"').replace(/"(\.\/[^"\n]+)\.ts"/g, '"$1.js"'));
}
await build({ entryPoints: [resolve(root, "src/index.ts")], outfile: resolve(root, "dist/index.js"), bundle: true, platform: "browser", format: "esm", target: "es2022", sourcemap: true });
await build({ entryPoints: [resolve(root, "src/grammy.ts")], outfile: resolve(root, "dist/grammy.js"), bundle: true, platform: "neutral", format: "esm", target: "es2022", external: ["grammy"], sourcemap: true });
await build({ entryPoints: [resolve(root, "src/cli.ts")], outfile: resolve(root, "dist/cli.js"), bundle: true, platform: "node", format: "esm", target: "node24" });
await chmod(resolve(root, "dist/cli.js"), 0o755);
