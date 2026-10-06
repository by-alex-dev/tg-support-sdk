import { Ajv, type ErrorObject, type ValidateFunction } from "ajv";
import { protocolSchema, METHOD_CATALOG, SCHEMA_ID } from "./schemas.js";
import type { Method, MethodParams, SchemaTypes } from "./wire.js";

export type ValidationResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly errors: readonly ErrorObject[] };

export function createProtocolValidators() {
  const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
  ajv.addKeyword({ keyword: "x-method-catalog", schemaType: "object", valid: true });
  ajv.addSchema(protocolSchema);

  return {
    parse<K extends keyof SchemaTypes>(name: K, input: unknown): ValidationResult<SchemaTypes[K]> {
      const validate: ValidateFunction<SchemaTypes[K]> | undefined = ajv.getSchema<SchemaTypes[K]>(`${SCHEMA_ID}#/definitions/${name}`);
      if (validate === undefined) throw new Error(`Missing protocol schema: ${name}`);
      if (validate(input)) return { ok: true, value: input };
      return { ok: false, errors: [...(validate.errors ?? [])] };
    },
    params<M extends Method>(method: M, input: unknown): ValidationResult<MethodParams[M]> {
      const name = METHOD_CATALOG[method].params;
      const validate: ValidateFunction<MethodParams[M]> | undefined = ajv.getSchema<MethodParams[M]>(`${SCHEMA_ID}#/definitions/${name}`);
      if (validate === undefined) throw new Error(`Missing method schema: ${name}`);
      if (validate(input)) return { ok: true, value: input };
      return { ok: false, errors: [...(validate.errors ?? [])] };
    },
  };
}
