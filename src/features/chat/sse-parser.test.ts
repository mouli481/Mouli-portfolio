import { describe, expect, it } from "vitest";
import { parseSseChunk } from "./sse-parser";

describe("parseSseChunk", () => {
  it("parses complete events and keeps the partial remainder", () => {
    const buffer =
      'data: {"type": "RUN_STARTED", "runId": "1"}\n\n' +
      'data: {"type": "TEXT_MESSAGE_CONTENT", "delta": "Hi "}\n\n' +
      'data: {"type": "TEXT_MES';

    const result = parseSseChunk(buffer);

    expect(result.events.map((event) => event.type)).toEqual([
      "RUN_STARTED",
      "TEXT_MESSAGE_CONTENT",
    ]);
    expect(result.events[1]?.delta).toBe("Hi ");
    expect(result.remainder).toBe('data: {"type": "TEXT_MES');
  });

  it("handles CRLF line endings", () => {
    const result = parseSseChunk('data: {"type": "RUN_FINISHED", "runId": "1"}\r\n\r\n');

    expect(result.events).toHaveLength(1);
    expect(result.remainder).toBe("");
  });

  it("ignores malformed JSON and unknown event types", () => {
    const result = parseSseChunk('data: not-json\n\ndata: {"type": "UNKNOWN"}\n\n');

    expect(result.events).toEqual([]);
  });

  it("parses a RETRIEVAL event with candidate chunks", () => {
    const buffer =
      'data: {"type": "RETRIEVAL", "candidates": [{"id": "a", "title": "Profile", ' +
      '"section": "profile", "relevance": 100, "selected": true}]}\n\n';

    const result = parseSseChunk(buffer);

    expect(result.events).toHaveLength(1);
    expect(result.events[0]?.type).toBe("RETRIEVAL");
    expect(result.events[0]?.candidates?.[0]?.relevance).toBe(100);
  });
});
