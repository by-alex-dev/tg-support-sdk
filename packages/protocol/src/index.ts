export type * from "./wire.js";
import { METHOD_CATALOG } from "./catalog.js";
import type { Method } from "./wire.js";

export { METHOD_CATALOG };

export function isMethod(value: string): value is Method {
  return Object.hasOwn(METHOD_CATALOG, value);
}
