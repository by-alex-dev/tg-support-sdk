import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sdk = fileURLToPath(new URL('..', import.meta.url));

test('the npm archive is MIT-licensed and carries the license text', () => {
  const result = spawnSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: sdk, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const [archive] = JSON.parse(result.stdout);
  assert.ok(archive.files.some(file => file.path === 'LICENSE'), archive.files.map(file => file.path).join(', '));
  assert.equal(JSON.parse(readFileSync(`${sdk}/package.json`, 'utf8')).license, 'MIT');
  assert.match(readFileSync(`${sdk}/LICENSE`, 'utf8'), /^MIT License\n\nCopyright \(c\) 2026 Alex Petropavlovsky\n/);
});
