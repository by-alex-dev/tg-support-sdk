import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileAgainstSdk } from './compile.mjs';

const sdk = fileURLToPath(new URL('..', import.meta.url));
const root = join(sdk, '../..');

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

// A Host follows the README in a new `npm init -y` project, whose package.json npm 11 marks `"type": "commonjs"`.
// Step 3's commands run as written, except that `npm install` links the built SDK and the repository's grammY
// instead of fetching them. The pull example then runs with the README's command; an invalid group ID stops it
// with a ConfigError before any request, which shows that both SDK entries and grammY loaded as modules.
test('the README pull host runs in a fresh npm project set up by the README steps', { timeout: 60000 }, async t => {
  const readme = await readFile(join(sdk, 'README.md'), 'utf8');
  const step3 = /^### 3\. [\s\S]*?^```sh\n([\s\S]*?)^```$/m.exec(readme)?.[1];
  const pullHost = /^```ts\n(\/\/ pull-host\.ts\n[\s\S]*?)^```$/m.exec(readme)?.[1];
  const run = /^```ts\n\/\/ pull-host\.ts\n[\s\S]*?^```\n\nRun it with `([^`]+)`/m.exec(readme)?.[1];
  assert.ok(step3 && pullHost && run, 'README lacks step 3 commands, the pull-host.ts example or its run command');

  const project = await mkdtemp(join(tmpdir(), 'tg-support-readme-host-'));
  t.after(() => rm(project, { recursive: true, force: true }));
  // The npm variables of the surrounding `npm test` and the developer's npmrc are not part of a fresh project.
  const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^npm_/i.test(name)));
  env.npm_config_userconfig = join(project, '.npmrc-empty');
  await writeFile(env.npm_config_userconfig, '');
  const sh = command => {
    const result = spawnSync(command, { cwd: project, env, shell: true, encoding: 'utf8' });
    return { status: result.status, stdout: result.stdout, output: `$ ${command}\n${result.stdout}${result.stderr}` };
  };

  const init = sh('npm init -y');
  assert.equal(init.status, 0, init.output);
  let keys = '';
  for (const command of step3.split('\n').filter(Boolean)) {
    if (command === 'npm install --save-exact tg-support-sdk') {
      await mkdir(join(project, 'node_modules/.bin'), { recursive: true });
      await symlink(sdk, join(project, 'node_modules/tg-support-sdk'), 'dir');
      await symlink('../tg-support-sdk/dist/cli.js', join(project, 'node_modules/.bin/tg-support-sdk'));
      continue;
    }
    const result = sh(command);
    assert.equal(result.status, 0, result.output);
    keys += result.stdout;
  }
  // 6b: "Install `grammy`."
  await symlink(join(root, 'node_modules/grammy'), join(project, 'node_modules/grammy'), 'dir');
  await writeFile(join(project, 'pull-host.ts'), pullHost);

  const value = name => new RegExp(`^${name}=(.+)$`, 'm').exec(keys)?.[1];
  assert.ok(value('TOKEN_KEY') && value('SEAL_KEYS'), 'step 3 did not print host keys');
  Object.assign(env, {
    BOT_TOKEN: '123456:test-token', TG_SUPPORT_SERVICE_URL: 'https://tg-support.example/v1',
    TG_SUPPORT_SECRET: `tgs1.00000000-0000-4000-8000-000000000007.${Buffer.alloc(32).toString('base64url')}`,
    TOKEN_KEY: value('TOKEN_KEY'), SEAL_KEYS: value('SEAL_KEYS'), SUPPORT_GROUP_ID: '1', TG_SUPPORT_CONFIG_REVISION: '1',
  });
  const result = sh(run);
  assert.notEqual(result.status, 0, result.output);
  assert.match(result.output, /ConfigError: supportGroupId must identify a supergroup\./, result.output);
});
