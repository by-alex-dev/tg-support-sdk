import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sdk = fileURLToPath(new URL('..', import.meta.url));
const root = resolve(sdk, '../..');

// Integrators copy README examples verbatim, so each ```ts block must compile on its own against the
// built public package. A block whose first line is `// path/to/file.ts` is written to that path, so
// multi-file examples can import each other; any other block is a standalone module.
test('every TypeScript example in the package README compiles against the built SDK', { timeout: 60000 }, async t => {
  const readme = await readFile(join(sdk, 'README.md'), 'utf8');
  const blocks = [...readme.matchAll(/^```ts\n([\s\S]*?)^```$/gm)].map(match => match[1]);
  assert.ok(blocks.length > 0, 'README has no TypeScript examples');

  // Inside the repository's node_modules so `tg-support-sdk`, grammy and @types/node resolve as for a Host.
  await mkdir(join(root, 'node_modules/.cache'), { recursive: true });
  const dir = await mkdtemp(join(root, 'node_modules/.cache/tg-support-readme-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const files = [];
  for (const [index, code] of blocks.entries()) {
    const file = /^\/\/ ([\w./-]+\.ts)\n/.exec(code)?.[1] ?? `example-${index + 1}.ts`;
    assert.ok(!files.includes(file), `two README examples claim ${file}`);
    files.push(file);
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
    files,
  }));

  const result = spawnSync(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '-p', dir], { encoding: 'utf8' });
  assert.equal(result.status, 0, `README examples do not compile:\n${result.stdout}${result.stderr}`);
});
