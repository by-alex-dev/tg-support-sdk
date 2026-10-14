import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { copyFile, cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';
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

const configFailure = 'Configuration failed. Check the config module and host secrets.';
const invalidGroup = /ConfigError: supportGroupId must identify a supergroup\./;

// Sets up a Host project the way the README tells a new integrator to: `npm init -y`, whose package.json npm 11
// marks `"type": "commonjs"`, then every step 3 command as written. `npm install` copies the built package into
// the project instead of fetching it, so the SDK resolves its grammY peer from the project, as an installed copy
// does. `esm: false` is an existing CommonJS project, where step 3 says not to run `npm pkg set type=module`.
// Every example then gets an invalid group ID, so a module that loads stops with a ConfigError before any request.
async function hostProject(t, { esm }) {
  const readme = await readFile(join(sdk, 'README.md'), 'utf8');
  const step3 = /^### 3\. [\s\S]*?(?=^### )/m.exec(readme)?.[0] ?? '';
  const commands = [...step3.matchAll(/^```sh\n([\s\S]*?)^```$/gm)]
    .flatMap(([, block]) => block.split('\n')).filter(line => line && !line.startsWith('#'));
  assert.ok(commands.length > 0, 'README step 3 has no commands');

  const project = await mkdtemp(join(tmpdir(), 'tg-support-readme-host-'));
  t.after(() => rm(project, { recursive: true, force: true }));
  // The npm variables of the surrounding `npm test` and the developer's npmrc are not part of a fresh project;
  // npm and npx run on the Node that runs this test.
  const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^npm_/i.test(name)));
  env.PATH = `${dirname(process.execPath)}${delimiter}${env.PATH ?? ''}`;
  env.npm_config_userconfig = join(project, '.npmrc-empty');
  await writeFile(env.npm_config_userconfig, '');
  const run = (file, args) => {
    const result = spawnSync(file, args, { cwd: project, env, shell: file !== process.execPath, encoding: 'utf8' });
    return { status: result.status, stdout: result.stdout, output: `$ ${[file, ...args].join(' ')}\n${result.stdout}${result.stderr}` };
  };
  const type = async () => JSON.parse(await readFile(join(project, 'package.json'), 'utf8')).type;

  const init = run('npm init -y', []);
  assert.equal(init.status, 0, init.output);
  assert.equal(await type(), 'commonjs', 'npm init -y no longer writes "type": "commonjs", the case this test guards');
  let keys = '';
  for (const command of commands) {
    if (/^npm install\b.*\btg-support-sdk\b/.test(command)) {
      const installed = join(project, 'node_modules/tg-support-sdk');
      await cp(join(sdk, 'dist'), join(installed, 'dist'), { recursive: true });
      await copyFile(join(sdk, 'package.json'), join(installed, 'package.json'));
      await mkdir(join(project, 'node_modules/.bin'));
      await symlink('../tg-support-sdk/dist/cli.js', join(project, 'node_modules/.bin/tg-support-sdk'));
      continue;
    }
    if (command === 'npm pkg set type=module') {
      if (!esm) continue;
    } else if (command !== 'npx tg-support-sdk keys') {
      assert.fail(`README step 3 has a command this test does not know how to run hermetically: ${command}`);
    }
    const result = run(command, []);
    assert.equal(result.status, 0, result.output);
    keys += result.stdout;
  }
  assert.equal(await type(), esm ? 'module' : 'commonjs');
  // 6b: "Install `grammy`."
  await symlink(join(root, 'node_modules/grammy'), join(project, 'node_modules/grammy'), 'dir');

  const value = name => new RegExp(`^${name}=(.+)$`, 'm').exec(keys)?.[1];
  assert.ok(value('TOKEN_KEY') && value('SEAL_KEYS'), 'step 3 did not print host keys');
  Object.assign(env, {
    BOT_TOKEN: '123456:test-token', TG_SUPPORT_SERVICE_URL: 'https://tg-support.example/v1',
    TG_SUPPORT_SECRET: `tgs1.00000000-0000-4000-8000-000000000007.${Buffer.alloc(32).toString('base64url')}`,
    TOKEN_KEY: value('TOKEN_KEY'), SEAL_KEYS: value('SEAL_KEYS'), SUPPORT_GROUP_ID: '1', TG_SUPPORT_CONFIG_REVISION: '1',
    TG_SUPPORT_HOST_URL: 'https://host.example/tg-support',
  });
  const example = async (name, as = name) => {
    const code = new RegExp(`^\`\`\`ts\\n(// ${name.replaceAll('.', '\\.')}\\n[\\s\\S]*?)^\`\`\`$`, 'm').exec(readme)?.[1];
    assert.ok(code, `README has no ${name} example`);
    await writeFile(join(project, as), code);
  };
  return { readme, run, example };
}

test('the README pull host and configure module run in a fresh npm project set up by the README steps', { timeout: 60000 }, async t => {
  const { readme, run, example } = await hostProject(t, { esm: true });

  await example('pull-host.ts');
  const start = /^```ts\n\/\/ pull-host\.ts\n[\s\S]*?^```\n\nRun it with `node ([\w.-]+)`/m.exec(readme)?.[1];
  assert.equal(start, 'pull-host.ts', 'README does not say to run the pull host with `node pull-host.ts`');
  const pull = run(process.execPath, [start]);
  assert.notEqual(pull.status, 0, pull.output);
  assert.match(pull.output, invalidGroup, pull.output);

  await example('tg-support.config.ts');
  const command = /^npx tg-support-sdk configure --config \.\/tg-support\.config\.ts$/m.exec(readme)?.[0];
  assert.ok(command, 'README has no configure command for tg-support.config.ts');
  const configure = run(command, []);
  assert.equal(configure.status, 1, configure.output);
  assert.match(configure.stdout, /^$/, configure.output);
  assert.ok(configure.output.endsWith(`${configFailure}\n`), configure.output);
});

test('in an existing CommonJS project the README examples run as .mts, and configure explains a .ts one', { timeout: 60000 }, async t => {
  const { run, example } = await hostProject(t, { esm: false });

  await example('pull-host.ts', 'pull-host.mts');
  const pull = run(process.execPath, ['pull-host.mts']);
  assert.notEqual(pull.status, 0, pull.output);
  assert.match(pull.output, invalidGroup, pull.output);

  await example('tg-support.config.ts', 'tg-support.config.mts');
  const mts = run('npx tg-support-sdk configure --config ./tg-support.config.mts', []);
  assert.equal(mts.status, 1, mts.output);
  assert.ok(mts.output.endsWith(`${configFailure}\n`), mts.output);

  await example('tg-support.config.ts');
  const ts = run('npx tg-support-sdk configure --config ./tg-support.config.ts', []);
  assert.equal(ts.status, 1, ts.output);
  assert.ok(ts.output.endsWith('The config module uses import or export, but Node loaded it as CommonJS. Set "type": "module" in package.json (npm pkg set type=module) or give the module the .mts extension.\n'), ts.output);
});
