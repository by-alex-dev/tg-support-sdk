import { validators, methodValidators } from "./validators.generated.js";
import type { Method, MethodParams, SchemaTypes } from "./wire.js";
import type { ValidationResult } from "./validation.js";

export function createBrowserProtocolValidators() {
  return {
    parse<K extends keyof SchemaTypes>(name: K, input: unknown): ValidationResult<SchemaTypes[K]> {
      const validate = validators[name];
      if (validate(input)) return { ok: true, value: input };
      return { ok: false, errors: [...(validate.errors ?? [])] };
    },
    params<M extends Method>(method: M, input: unknown): ValidationResult<MethodParams[M]> {
      const validate = methodValidators[method];
      if (validate(input)) return { ok: true, value: input };
      return { ok: false, errors: [...(validate.errors ?? [])] };
    },
  };
}
