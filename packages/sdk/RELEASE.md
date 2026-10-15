# Preparing and publishing tg-support-sdk 1.2.3

1.2.3 changes only the license, from `UNLICENSED` to MIT: the manifest declares `MIT` and the archive ships `LICENSE`. 1.2.2 changed only the package description and was the first release published from the public mirror with npm provenance: published on 2026-10-14 (registry time 2026-10-14T14:16:08Z), built from mirror commit e8fd090: integrity `sha512-VzNfLk2cqOtAQF46w0G40Jxx4GzoTggAgvigfE+5RzEsHEL0ngW9Z2Nw8P2cEbjHVTPf62ArXxa8+k75y7Bg7A==`, shasum `a71ce8a844f2d947adf7af289cfb3042ff011561`. 1.2.1 was published on 2026-10-14 (registry time 2026-10-14T04:51:23Z, `latest`), packed from commit 2eae53f after CI passed: integrity `sha512-r0p19M6O1Yz/I4ZzONdioykpdJz6WnmTr+Th2Flkanh8dABhrNqDX5f2Gwq4nop9u177KTUyAw60RvGOpSjzWQ==`, shasum `547ad5ff53d755882898120e80bcc1edff6ee405`, sha256 `74eb19365b532beaa8c7927888fa552cfaaf1dc7061c1dfc499add08d16b549d`. 1.2.0 was published on 2026-10-13 (registry time 2026-10-13T18:36:51Z), packed from commit 51c4a1f. 1.1.0 was published on 2026-10-13. The package remains the public, unscoped `tg-support-sdk`; the repository name is `tg-support`. Publication requires owner authorization for the reviewed release. A local artifact is not evidence of npm publication or a deployed Host.

This maintainer guide is not part of the published package. The package README is the integrator guide shown on npm: keep maintainer, publication and repository-only instructions out of it, and do not link the private repository from it. Its TypeScript examples are compiled by `packages/sdk/test/readme.test.mjs`, which also runs the pull and `configure` examples in fresh `npm init -y` projects set up by step 3 (ES module and CommonJS with `.mts`).

Use a reviewed, clean commit and Node 24. From the repository root:

```sh
npm ci
npm run build
npm run typecheck --workspaces --if-present
TEST_DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/postgres npm test
```

Use disposable PostgreSQL 18.6 for tests; each existing Service/HTTP owner creates and drops its own database. The workspace SDK, Service test dependency and smoke dependency must resolve to 1.2.3. The existing CI runs the full fake and conformance suite on that workspace version, including push, pull and grammY. The SDK tests also run the built public package in workerd to verify outbound requests and reject redirects. Before handoff, also install the actual packed tarball in a private consumer and run the same public SDK owners, packed declaration checks and real Service/PostgreSQL HTTP owners. Only external Telegram is replaced. Do not substitute an unpublished registry dependency for that local artifact.

The CHANGELOG entry for the package version must carry a date (`## 1.2.3 — YYYY-MM-DD`), not `unreleased`: the changelog ships in the package. The publish workflow runs `node scripts/check-sdk-release.mjs <tag>` (in this repository: `node mirror/scripts/check-sdk-release.mjs sdk-v1.2.3 packages/sdk`) and stops on an undated entry for the package version or a tag that does not name it; after publication, date it by the npm registry time as `— published YYYY-MM-DD`.

Pack without lifecycle scripts and retain its manifest:

```sh
SDK_RELEASE_DIR=$(mktemp -d "${TMPDIR:-/tmp}/tg-support-sdk-release.XXXXXX")
npm pack --workspace tg-support-sdk --ignore-scripts --json \
  --pack-destination "$SDK_RELEASE_DIR" > "$SDK_RELEASE_DIR/pack.json"
```

`pack.json` records the package identity, version, exact file inventory, SHA-1 and SHA-512 SRI. Compute SHA-256 for the tarball as a transfer checksum. Transfer the tarball and manifest with the reviewed commit, Node/npm versions and test evidence. Repacking unchanged built source must produce the same inventory and hashes. Inspect all public files, including bundled JavaScript, declarations, sourcemaps, README, changelog and third-party notices. No credentials or private fixture files belong in the archive.

Publication runs only in the public mirror `by-alex-dev/tg-support-sdk`, so the npm provenance attestation names the mirror commit that anyone can inspect. After the release commit is merged to `main` and the **SDK mirror** workflow has synced it, the owner tags the mirror commit whose `Source-Commit:` trailer is that merge:

```sh
git clone https://github.com/by-alex-dev/tg-support-sdk.git && cd tg-support-sdk
git log -1 --format='%H %s%n%b' main   # check the Source-Commit trailer
git tag sdk-v1.2.3 main
git push origin sdk-v1.2.3
```

The mirror's **Publish to npm** workflow (`.github/workflows/publish.yml`, from `mirror/.github/workflows/publish.yml` here) checks that the tag is on `main`, names the package version and has a dated CHANGELOG entry, then builds, tests and runs `npm publish --provenance` through npm trusted publishing (OIDC). No npm token exists in either repository. Pushing a tag is the publication authorization: only the owner pushes `sdk-v*` tags, and only for a reviewed release.

After publication, verify `npm view tg-support-sdk@1.2.3 version description dist.integrity dist.shasum dist.attestations --json --registry=https://registry.npmjs.org` against the reviewed manifest (`dist.attestations.provenance` must be present and `npm audit signatures` in a consumer must pass), and check that the npm package page shows the new README. Since 1.2.0 the SDK refuses a Bot without Pin Messages, so first confirm that the demo Bot has that permission in its support group; otherwise Vislaw's CI `configure` step fails with `bot_cannot_pin_messages`. Only then, in the Vislaw worktree, run:

```sh
npm install --save-exact tg-support-sdk@1.2.3
```

Commit its real registry-generated dependency/lock changes through the existing Vislaw PR, run that Host's checks and deploy using its authorized workflow. Do not prewrite a future registry URL or integrity value. Preserve the existing deployed SDK dependency until publication. Complete the real Telegram smoke and onboard a new Bot to the stand using only the README on the npm package page; these, publication and Vislaw adoption remain native #43 completion gates.
