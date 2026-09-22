import { writeFileSync } from "node:fs";

const OPENAPI_URL = process.env.OPENAPI_URL ?? "http://127.0.0.1:8000/api/py/openapi.json";
const OUTPUT_PATH = "src/types/api.ts";

function toPascalCase(name) {
  return name
    .replace(/-/g, "_")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function resolveRef(ref) {
  const name = ref.split("/").pop();
  return toPascalCase(name);
}

function schemaToType(schema, schemas) {
  if (!schema) return "unknown";
  if (schema.$ref) return resolveRef(schema.$ref);

  if (schema.anyOf) {
    return schema.anyOf.map((sub) => schemaToType(sub, schemas)).join(" | ");
  }

  if (schema.allOf && schema.allOf.length === 1) {
    return schemaToType(schema.allOf[0], schemas);
  }

  if (schema.enum) {
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  }

  switch (schema.type) {
    case "string":
      return "string";
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "array":
      return `${schemaToType(schema.items, schemas)}[]`;
    case "object": {
      if (schema.additionalProperties) {
        return `Record<string, ${schemaToType(schema.additionalProperties, schemas)}>`;
      }
      return objectSchemaToInterfaceBody(schema, schemas);
    }
    default:
      return "unknown";
  }
}

function objectSchemaToInterfaceBody(schema, schemas) {
  const required = new Set(schema.required ?? []);
  const properties = schema.properties ?? {};
  const lines = Object.entries(properties).map(([key, propSchema]) => {
    const optional = required.has(key) ? "" : "?";
    const type = schemaToType(propSchema, schemas);
    return `  ${key}${optional}: ${type};`;
  });
  return `{\n${lines.join("\n")}\n}`;
}

function generateInterface(name, schema, schemas) {
  const typeName = toPascalCase(name);
  if (schema.enum) {
    return `export type ${typeName} = ${schemaToType(schema, schemas)};\n`;
  }
  if (schema.type === "object" || schema.properties) {
    const body = objectSchemaToInterfaceBody(schema, schemas);
    return `export interface ${typeName} ${body}\n`;
  }
  return `export type ${typeName} = ${schemaToType(schema, schemas)};\n`;
}

async function main() {
  const response = await fetch(OPENAPI_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI schema: ${response.status}`);
  }
  const spec = await response.json();
  const schemas = spec.components?.schemas ?? {};

  const sortedNames = Object.keys(schemas).sort();
  const blocks = sortedNames
    .filter((name) => !name.includes("HTTPValidationError") && !name.includes("ValidationError"))
    .map((name) => generateInterface(name, schemas[name], schemas));

  const header =
    "export type ChatEventType =\n" +
    '  | "RUN_STARTED"\n' +
    '  | "RETRIEVAL"\n' +
    '  | "TEXT_MESSAGE_CONTENT"\n' +
    '  | "SOURCES"\n' +
    '  | "RUN_FINISHED"\n' +
    '  | "RUN_ERROR";\n\n' +
    "export interface ChatSource {\n" +
    "  title: string;\n" +
    "  section: string;\n" +
    "  snippet: string;\n" +
    "}\n\n" +
    "export interface RetrievalCandidate {\n" +
    "  id: string;\n" +
    "  title: string;\n" +
    "  section: string;\n" +
    "  relevance: number;\n" +
    "  selected: boolean;\n" +
    "}\n\n" +
    "export interface ChatStreamEvent {\n" +
    "  type: ChatEventType;\n" +
    "  runId?: string;\n" +
    "  delta?: string;\n" +
    "  sources?: ChatSource[];\n" +
    "  candidates?: RetrievalCandidate[];\n" +
    "  message?: string;\n" +
    "}\n\n";

  const output = header + blocks.join("\n");
  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`Generated ${sortedNames.length} types into ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
