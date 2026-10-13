import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)), '../..');

// Type-checks Host TypeScript files against the built public package. The files live inside the repository's
// node_modules so `tg-support-sdk`, grammy and @types/node resolve as they do for a Host.
export async function compileAgainstSdk(t, files) {
  await mkdir(join(root, 'node_modules/.cache'), { recursive: true });
  const dir = await mkdtemp(join(root, 'node_modules/.cache/tg-support-compile-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const [file, code] of files) {
    await mkdir(dirname(join(dir, file)), { recursive: true });
    await writeFile(join(dir, file), code);
  }
  await writeFile(join(dir, 'package.json'), JSON.stringify({ type: 'module' }));
  await writeFile(join(dir, 'tsconfig.json'), JSON.stringify({
    extends: join(root, 'tsconfig.base.json'),
    compilerOptions: {
      module: 'preserve', moduleResolution: 'bundler', noEmit: true, declaration: false, sourceMap: false,
      lib: ['ES2023', 'DOM', 'DOM.Iterable'], types: ['node'],
    },
    files: files.map(([file]) => file),
  }));
  const result = spawnSync(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '-p', dir], { encoding: 'utf8' });
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}` };
}
