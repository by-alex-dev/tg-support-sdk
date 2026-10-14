#!/usr/bin/env node
// Gate of the publish workflow (.github/workflows/publish.yml): the pushed tag must be `sdk-v<package version>`,
// and because CHANGELOG.md ships in the npm archive, the entry for that version must carry a release date:
// `## X.Y.Z — YYYY-MM-DD` before publishing, `## X.Y.Z — published YYYY-MM-DD` after.
// Usage: node scripts/check-sdk-release.mjs <tag> [package-dir] (default: packages/sdk).
import { readFileSync } from 'node:fs';

const tag = process.argv[2] ?? '';
const dir = process.argv[3] ?? 'packages/sdk';

function problem() {
  const { version } = JSON.parse(readFileSync(`${dir}/package.json`, 'utf8'));
  if (tag !== `sdk-v${version}`) return `Tag "${tag}" does not match the package version ${version}; tag the release sdk-v${version}.`;
  let changelog;
  try { changelog = readFileSync(`${dir}/CHANGELOG.md`, 'utf8'); } catch { return `${dir}/CHANGELOG.md is missing.`; }
  const escaped = version.replaceAll('.', '\\.');
  const heading = new RegExp(`^## ${escaped}(?: — (.*))?$`, 'm').exec(changelog);
  if (!heading) return `CHANGELOG.md has no entry for ${version}.`;
  const date = /^(?:published )?(\d{4}-\d{2}-\d{2})$/.exec(heading[1] ?? '')?.[1];
  const time = date === undefined ? NaN : Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(time) || new Date(time).toISOString().slice(0, 10) !== date) {
    return `The CHANGELOG.md entry for ${version} is "${heading[0]}", not dated; replace "${heading[1] ?? ''}" with the release date ("## ${version} — YYYY-MM-DD") before publishing.`;
  }
  return null;
}

const message = problem();
if (message) {
  console.error(message);
  process.exit(1);
}
console.log(`${tag} matches the package version and its CHANGELOG.md entry is dated.`);
