import type { ChatRequest, ChatStreamEvent } from "@/types/api";
import { API_PREFIX } from "@/lib/api/config";
import { ApiError, readErrorMessage } from "@/lib/api/errors";
import { parseSseChunk } from "@/features/chat/sse-parser";

export async function streamChat(
  request: ChatRequest,
  onEvent: (event: ChatStreamEvent) => void,
  signal: AbortSignal
): Promise<void> {
  const response = await fetch(`${API_PREFIX}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok || !response.body) {
    const message = await readErrorMessage(response, "The assistant is unavailable right now.");
    throw new ApiError(response.status, message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const { events, remainder } = parseSseChunk(buffer);
    buffer = remainder;
    events.forEach(onEvent);
  }

  const { events } = parseSseChunk(`${buffer}\n\n`);
  events.forEach(onEvent);
}
