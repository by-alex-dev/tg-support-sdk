import type { Json } from "./types.ts";
export function record(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
export function integer(value: unknown): value is number { return typeof value === "number" && Number.isSafeInteger(value); }
export function json(value: unknown): value is Json {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(json);
  const object = record(value);
  return object !== null && Object.values(object).every(json);
}
export function jsonRecord(value: unknown): Record<string, Json> | null { return isJsonRecord(value) ? value : null; }
function isJsonRecord(value: unknown): value is Record<string, Json> { return isRecord(value) && Object.values(value).every(json); }
export function jsonRecords(value: unknown): Record<string, Json>[] | null {
  if (!Array.isArray(value)) return null;
  const result: Record<string, Json>[] = [];
  for (const item of value) { const parsed = jsonRecord(item); if (!parsed) return null; result.push(parsed); }
  return result;
}
