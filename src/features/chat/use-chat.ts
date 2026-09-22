"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, ChatStreamEvent } from "@/types/api";
import { streamChat } from "@/features/chat/stream-chat";
import {
  MAX_HISTORY_MESSAGES,
  type ConversationMessage,
  type SendOptions,
} from "@/features/chat/chat-types";

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function toHistory(messages: ConversationMessage[]): ChatMessage[] {
  return messages
    .filter((message) => message.status === "done" && message.content.trim().length > 0)
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 4000) }));
}

export function useChat() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const updateMessage = useCallback(
    (id: string, update: (message: ConversationMessage) => ConversationMessage) => {
      setMessages((current) =>
        current.map((message) => (message.id === id ? update(message) : message))
      );
    },
    []
  );

  const send = useCallback(
    async (text: string, options: SendOptions = {}) => {
      const content = text.trim();
      if (!content || controllerRef.current) {
        return;
      }
      const history = toHistory(messagesRef.current);
      const assistantId = createId();
      setMessages((current) => [
        ...current,
        { id: createId(), role: "user", content, sources: [], status: "done" },
        { id: assistantId, role: "assistant", content: "", sources: [], status: "streaming" },
      ]);

      const controller = new AbortController();
      controllerRef.current = controller;
      setIsStreaming(true);

      const handleEvent = (event: ChatStreamEvent) => {
        if (event.type === "TEXT_MESSAGE_CONTENT" && event.delta) {
          const delta = event.delta;
          updateMessage(assistantId, (message) => ({
            ...message,
            content: message.content + delta,
          }));
        } else if (event.type === "SOURCES" && event.sources) {
          const sources = event.sources;
          updateMessage(assistantId, (message) => ({ ...message, sources }));
        } else if (event.type === "RUN_ERROR") {
          const errorText = event.message ?? "Something went wrong.";
          updateMessage(assistantId, (message) => ({
            ...message,
            content: errorText,
            status: "error",
          }));
        }
      };

      try {
        await streamChat(
          { message: content, history, project_slug: options.projectSlug ?? null },
          handleEvent,
          controller.signal
        );
        updateMessage(assistantId, (message) =>
          message.status === "streaming" ? { ...message, status: "done" } : message
        );
      } catch (error) {
        const aborted = error instanceof DOMException && error.name === "AbortError";
        const errorText = error instanceof Error ? error.message : "The assistant is unavailable.";
        updateMessage(assistantId, (message) =>
          aborted
            ? { ...message, status: "done", content: message.content || "Stopped." }
            : { ...message, status: "error", content: errorText }
        );
      } finally {
        controllerRef.current = null;
        setIsStreaming(false);
      }
    },
    [updateMessage]
  );

  const stop = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setMessages([]);
  }, []);

  return { messages, isStreaming, send, stop, reset };
}
