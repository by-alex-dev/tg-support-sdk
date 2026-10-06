import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Ajv } from "ajv";
import standaloneCode from "ajv/dist/standalone/index.js";
import { build } from "esbuild";
import { compile } from "json-schema-to-typescript";

const schema = JSON.parse(await readFile(new URL("../schema/v1/schema.json", import.meta.url), "utf8"));
const banner = "/* Generated from schema/v1/schema.json. Run npm run generate; do not edit. */";
const definitions = Object.keys(schema.definitions);
const methods = Object.entries(schema["x-method-catalog"]);
const output = await compile(schema, "ProtocolV1", {
  unreachableDefinitions: true,
  unknownAny: true,
  strictIndexSignatures: true,
  ignoreMinAndMaxItems: true,
  bannerComment: banner,
});
const schemaTypes = definitions.map(name => `  ${name}: ${name};`).join("\n");
const methodParams = methods.map(([method, recipe]) => `  ${method}: ${recipe.params};`).join("\n");
await writeFile(new URL("../src/wire.ts", import.meta.url), `${output}\nexport interface SchemaTypes {\n${schemaTypes}\n}\n\nexport interface MethodParams {\n${methodParams}\n}\n`);
await writeFile(new URL("../src/catalog.ts", import.meta.url), `${banner}\nexport const METHOD_CATALOG = ${JSON.stringify(schema["x-method-catalog"], null, 2)} as const;\n`);

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
  code: { source: true, esm: true },
});
ajv.addKeyword({ keyword: "x-method-catalog", schemaType: "object", valid: true });
ajv.addSchema(schema);
const references = Object.fromEntries(definitions.map(name => [name, `${schema.$id}#/definitions/${name}`]));
const validatorNames = definitions.map(name => `  ${name},`).join("\n");
const methodValidatorNames = methods.map(([method, recipe]) => `  ${method}: ${recipe.params},`).join("\n");
const standalone = standaloneCode(ajv, references);
const runtime = await build({
  stdin: {
    contents: `${standalone}\nexport const validators = {\n${validatorNames}\n};\nexport const methodValidators = {\n${methodValidatorNames}\n};\n`,
    resolveDir: fileURLToPath(new URL("..", import.meta.url)),
    sourcefile: "validators.generated.js",
  },
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "es2023",
  write: false,
  legalComments: "none",
  banner: { js: banner },
});
if (runtime.outputFiles.length !== 1) throw new Error("Expected one standalone validation module");
await writeFile(new URL("../src/validators.generated.js", import.meta.url), runtime.outputFiles[0].text);
await writeFile(new URL("../src/validators.generated.d.ts", import.meta.url), `${banner}
import type { ValidateFunction } from "ajv";
import type { Method, MethodParams, SchemaTypes } from "./wire.js";

export declare const validators: {
  readonly [K in keyof SchemaTypes]: ValidateFunction<SchemaTypes[K]>;
};
export declare const methodValidators: {
  readonly [M in Method]: ValidateFunction<MethodParams[M]>;
};
`);
