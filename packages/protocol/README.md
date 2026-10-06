# Protocol v1

`schema/v1/schema.json` owns the wire contracts in `docs/design/protocol.md`.
`npm run generate` derives `src/wire.ts` with json-schema-to-typescript and
standalone validators with Ajv. esbuild bundles the validators' pure runtime
helpers into one ESM file for Workers and browsers.
The method catalog and slot purposes live in the same source schema. Runtime
authorization must still verify AEAD subjects, bindings, configured addressees,
template slots and result consistency against the issued command.

Import wire types and the browser-compatible method catalog from
`@support-relay/protocol`. Import schemas from `@support-relay/protocol/schemas`
or Node boundary validators from `@support-relay/protocol/validation`.
`@support-relay/protocol/browser-validation` uses precompiled validators without
runtime code generation, Node built-ins or external runtime dependencies. The main export
does not import Ajv or Node built-ins. JSON objects allow unknown fields;
consumers assemble domain data and Telegram calls from documented fields only.

The command envelope accepts a string method so an unauthorized method reaches
the host's `method_not_allowed` guard. `METHOD_CATALOG` is the closed v1 list;
parameter recipes are validated after that guard. Source schemas describe wire
shape; signature, config revision, event deduplication, atomic batches and
result correlation remain application responsibilities.

The service base URL is configured per deployment and may include a path
prefix. Append relative `v1/events` paths to preserve that prefix. Sign the
actual request path and query rather than the OpenAPI path suffix in isolation.
