import type { ChatEventType, ChatStreamEvent } from "@/types/api";

const EVENT_TYPES: ReadonlySet<ChatEventType> = new Set<ChatEventType>([
  "RUN_STARTED",
  "RETRIEVAL",
  "TEXT_MESSAGE_CONTENT",
  "SOURCES",
  "RUN_FINISHED",
  "RUN_ERROR",
]);

export interface ParseResult {
  events: ChatStreamEvent[];
  remainder: string;
}

function isChatStreamEvent(value: unknown): value is ChatStreamEvent {
  if (typeof value !== "object" || value === null || !("type" in value)) {
    return false;
  }
  const { type } = value;
  return typeof type === "string" && EVENT_TYPES.has(type as ChatEventType);
}

function parseBlock(block: string): ChatStreamEvent | null {
  const data = block
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trimStart())
    .join("\n");
  if (!data) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(data);
    return isChatStreamEvent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function parseSseChunk(buffer: string): ParseResult {
  const normalized = buffer.replace(/\r\n/g, "\n");
  const blocks = normalized.split("\n\n");
  const remainder = blocks.pop() ?? "";
  const events = blocks.map(parseBlock).filter((event): event is ChatStreamEvent => event !== null);
  return { events, remainder };
}
