# Preparing and publishing tg-support-sdk 1.2.0

1.1.0 was published on 2026-10-13; 1.2.0 is unreleased. The package remains the public, unscoped `tg-support-sdk`; the repository name is `tg-support`. Publication requires owner authorization for the reviewed release. A local artifact is not evidence of npm publication or a deployed Host.

This maintainer guide is not part of the published package. The package README is the integrator guide shown on npm: keep maintainer, publication and repository-only instructions out of it, and do not link the private repository from it. Its TypeScript examples are compiled by `packages/sdk/test/readme.test.mjs`.

Use a reviewed, clean commit and Node 24. From the repository root:

```sh
npm ci
npm run build
npm run typecheck --workspaces --if-present
TEST_DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/postgres npm test
```

Use disposable PostgreSQL 18.6 for tests; each existing Service/HTTP owner creates and drops its own database. The workspace SDK, Service test dependency and smoke dependency must resolve to 1.2.0. The existing CI runs the full fake and conformance suite on that workspace version, including push, pull and grammY. The SDK tests also run the built public package in workerd to verify outbound requests and reject redirects. Before handoff, also install the actual packed tarball in a private consumer and run the same public SDK owners, packed declaration checks and real Service/PostgreSQL HTTP owners. Only external Telegram is replaced. Do not substitute an unpublished registry dependency for that local artifact.

Before packing, replace `unreleased` in the `## 1.2.0 — unreleased` CHANGELOG heading with the release date (`## 1.2.0 — YYYY-MM-DD`): the changelog ships in the package. Both publication paths run `node scripts/check-sdk-changelog.mjs` and stop on an undated entry for the package version; after publication, date it by the npm registry time as `— published YYYY-MM-DD`.

Pack without lifecycle scripts and retain its manifest:

```sh
SDK_RELEASE_DIR=$(mktemp -d "${TMPDIR:-/tmp}/tg-support-sdk-release.XXXXXX")
npm pack --workspace tg-support-sdk --ignore-scripts --json \
  --pack-destination "$SDK_RELEASE_DIR" > "$SDK_RELEASE_DIR/pack.json"
```

`pack.json` records the package identity, version, exact file inventory, SHA-1 and SHA-512 SRI. Compute SHA-256 for the tarball as a transfer checksum. Transfer the tarball and manifest with the reviewed commit, Node/npm versions and test evidence. Repacking unchanged built source must produce the same inventory and hashes. Inspect all public files, including bundled JavaScript, declarations, sourcemaps, README, changelog and third-party notices. No credentials or private fixture files belong in the archive.

The existing guided publication path is:

```sh
bash scripts/prepare-sdk-publish.sh
```

Its stages verify the package/registry, guide npm login and 2FA, build/test/pack and show the file inventory and SHA-256, then ask for explicit confirmation before publishing that exact archive. Compare the displayed hash with the reviewed artifact. If it differs, stop and repeat the package/consumer checks on the changed bytes. The stable-semver identity check accepts 1.2.0. With explicit owner authorization, an agent may publish the reviewed archive through the configured npm identity; do not treat source preparation alone as publication authorization.

After publication, verify `npm view tg-support-sdk@1.2.0 version description dist.integrity dist.shasum --json --registry=https://registry.npmjs.org` against the reviewed manifest, and check that the npm package page shows the new README. 1.2.0 refuses a Bot without Pin Messages, so first confirm that the demo Bot has that permission in its support group; otherwise Vislaw's CI `configure` step fails with `bot_cannot_pin_messages`. Only then, in the Vislaw worktree, run:

```sh
npm install --save-exact tg-support-sdk@1.2.0
```

Commit its real registry-generated dependency/lock changes through the existing Vislaw PR, run that Host's checks and deploy using its authorized workflow. Do not prewrite a future registry URL or integrity value. Preserve the existing deployed SDK dependency until publication. Complete the real Telegram smoke and onboard a new Bot to the stand using only the README on the npm package page; these, publication and Vislaw adoption remain native #43 completion gates.
