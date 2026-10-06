import { copyFile } from "node:fs/promises";

for (const file of ["validators.generated.js", "validators.generated.d.ts"]) {
  await copyFile(new URL(`../src/${file}`, import.meta.url), new URL(`../dist/src/${file}`, import.meta.url));
}
