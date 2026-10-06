import schema from "../schema/v1/schema.json" with { type: "json" };
export { METHOD_CATALOG } from "./catalog.js";

export const protocolSchema = schema;
export const SCHEMA_ID = schema.$id;
