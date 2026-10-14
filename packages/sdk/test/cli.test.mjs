import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../dist/cli.js', import.meta.url));

async function configure(t, module) {
  const dir = await mkdtemp(join(tmpdir(), 'tg-support-cli-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await writeFile(join(dir, 'package.json'), JSON.stringify({ type: 'module' }));
  await writeFile(join(dir, 'config.js'), module);
  const result = spawnSync(process.execPath, [cli, 'configure', '--config', './config.js'], {
    cwd: dir, encoding: 'utf8', env: { ...process.env, TG_SUPPORT_SECRET: 'host-secret-value' },
  });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

// A config module reads host secrets, so an error it throws while loading can carry one in its message
// (here JSON.parse quotes its input). configure names only the error class.
test('configure reports a config module that fails to load without echoing its error message', async t => {
  const result = await configure(t, 'export default JSON.parse(process.env.TG_SUPPORT_SECRET);\n');
  assert.equal(result.status, 1, result.output);
  assert.equal(result.output, 'Could not load the config module (SyntaxError). Check the module and the host secrets it reads.\n');
});

test('configure reports a config module without a default export', async t => {
  const result = await configure(t, 'export const config = {};\n');
  assert.equal(result.status, 1, result.output);
  assert.equal(result.output, 'Config module must have a default export.\n');
});
