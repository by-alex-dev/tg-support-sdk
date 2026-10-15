# tg-support-sdk

Read-only mirror of the public parts of tg-support:

- `packages/sdk` — the [`tg-support-sdk`](https://www.npmjs.com/package/tg-support-sdk) npm package (see its [README](packages/sdk/README.md));
- `packages/protocol` — the protocol schemas and validators the SDK is built against;
- `conformance` — language-independent conformance vectors.

Development happens in a private monorepo. Every push to its `main` that touches these directories is synced here automatically with history preserved; each mirror commit carries a `Source-Commit:` trailer with the SHA of the source commit. Do not push here directly: the next sync would fail.

Issues, pull requests and the wiki are not accepted in this repository.

## Build

```sh
npm ci
npm run build
npm test
```

Requires Node 24.

## Releases

`tg-support-sdk` is published to npm only from this repository: a tag `sdk-vX.Y.Z` on a commit of `main` runs [`.github/workflows/publish.yml`](.github/workflows/publish.yml), which builds, tests and publishes with [npm provenance](https://docs.npmjs.com/generating-provenance-statements) through trusted publishing, without an npm token. The provenance attestation on npm names the commit of this repository the package was built from; check it with `npm audit signatures` or on the package page.

## License

The SDK, the protocol package and the conformance vectors in this repository are released under the [MIT License](LICENSE).
