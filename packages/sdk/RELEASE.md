# Preparing and publishing tg-support-sdk 1.0.0

This release is prepared in source, not published. The package remains the public, unscoped `tg-support-sdk`; the repository name is `tg-support`. Native [#43](https://github.com/petalvlad/tg-support/issues/43) assigns preparation to the agent and publication to a human. Pending #40–42/live checks remain separate gates; a local artifact is not evidence of npm publication or a deployed Host.

Use a reviewed, clean commit and Node 24. From the repository root:

```sh
npm ci
npm run build
npm run typecheck --workspaces --if-present
TEST_DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/postgres npm test
```

Use disposable PostgreSQL 18.6 for tests; each existing Service/HTTP owner creates and drops its own database. The workspace SDK and smoke dependency must both resolve to 1.0.0. The existing CI runs the full fake and conformance suite on that workspace version, including push, pull and grammY. Before handoff, also install the actual packed tarball in a private consumer and run the same public SDK owners, packed declaration checks and real Service/PostgreSQL HTTP owners. Only external Telegram is replaced. Do not substitute an unpublished registry dependency for that local artifact.

Pack without lifecycle scripts and retain its manifest:

```sh
SDK_RELEASE_DIR=$(mktemp -d "${TMPDIR:-/tmp}/tg-support-sdk-release.XXXXXX")
npm pack --workspace tg-support-sdk --ignore-scripts --json \
  --pack-destination "$SDK_RELEASE_DIR" > "$SDK_RELEASE_DIR/pack.json"
```

`pack.json` records the package identity, version, exact file inventory, SHA-1 and SHA-512 SRI. Compute SHA-256 for the tarball as a transfer checksum. Transfer the tarball and manifest with the reviewed commit, Node/npm versions and test evidence. Repacking unchanged built source must produce the same inventory and hashes. Inspect all public files, including bundled JavaScript, declarations, sourcemaps, README, changelog and third-party notices. No credentials or private fixture files belong in the archive.

The existing repeatable human publication path is:

```sh
bash scripts/prepare-sdk-publish.sh
```

Its stages verify the package/registry, guide the human's personal npm login and 2FA, build/test/pack and show the file inventory and SHA-256, then ask for explicit confirmation before publishing that exact archive. Compare the displayed hash with the reviewed artifact. If it differs, stop and repeat the package/consumer checks on the changed bytes. The wizard's library and four stages are retained; the stable-semver identity check accepts 1.0.0. The agent must not run the wizard end to end, log in, provide npm credentials or publish.

After human publication, verify `npm view tg-support-sdk@1.0.0 version dist.integrity dist.shasum --json --registry=https://registry.npmjs.org` against the reviewed manifest. Only then, in the Vislaw worktree, run:

```sh
npm install --save-exact tg-support-sdk@1.0.0
```

Commit its real registry-generated dependency/lock changes through the existing Vislaw PR, run that Host's checks and deploy using its authorized workflow. Do not prewrite a future registry URL or integrity value. Preserve the existing deployed SDK dependency until publication. Complete the real Telegram smoke and new-Bot onboarding from the integrator guide; these, publication and Vislaw adoption remain native #43 completion gates.
