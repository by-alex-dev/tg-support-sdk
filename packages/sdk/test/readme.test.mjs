import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileAgainstSdk } from './compile.mjs';

const sdk = fileURLToPath(new URL('..', import.meta.url));

// Integrators copy README examples verbatim, so each ```ts block must compile on its own against the
// built public package. A block whose first line is `// path/to/file.ts` is written to that path, so
// multi-file examples can import each other; any other block is a standalone module.
test('every TypeScript example in the package README compiles against the built SDK', { timeout: 60000 }, async t => {
  const readme = await readFile(join(sdk, 'README.md'), 'utf8');
  const blocks = [...readme.matchAll(/^```ts\n([\s\S]*?)^```$/gm)].map(match => match[1]);
  assert.ok(blocks.length > 0, 'README has no TypeScript examples');

  const files = [];
  for (const [index, code] of blocks.entries()) {
    const file = /^\/\/ ([\w./-]+\.ts)\n/.exec(code)?.[1] ?? `example-${index + 1}.ts`;
    assert.ok(!files.some(([name]) => name === file), `two README examples claim ${file}`);
    files.push([file, code]);
  }
  const result = await compileAgainstSdk(t, files);
  assert.ok(result.ok, `README examples do not compile:\n${result.output}`);
});
