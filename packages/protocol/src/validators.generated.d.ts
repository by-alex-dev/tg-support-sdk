/* Generated from schema/v1/schema.json. Run npm run generate; do not edit. */
import type { ValidateFunction } from "ajv";
import type { Method, MethodParams, SchemaTypes } from "./wire.js";

export declare const validators: {
  readonly [K in keyof SchemaTypes]: ValidateFunction<SchemaTypes[K]>;
};
export declare const methodValidators: {
  readonly [M in Method]: ValidateFunction<MethodParams[M]>;
};
