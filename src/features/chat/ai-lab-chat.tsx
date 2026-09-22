"use client";

import { useMemo } from "react";
import type { ChatPrompt } from "@/features/chat/chat-widget-context";
import { ChatPanel } from "@/features/chat/chat-panel";

interface AiLabChatProps {
  initialQuestion: string | null;
  projectSlug: string | null;
}

export function AiLabChat({ initialQuestion, projectSlug }: AiLabChatProps) {
  const prompt = useMemo<ChatPrompt | null>(
    () =>
      initialQuestion
        ? { id: `initial-${initialQuestion}`, message: initialQuestion.slice(0, 2000), projectSlug }
        : null,
    [initialQuestion, projectSlug]
  );

  return (
    <div className="glass-card h-[min(760px,calc(100svh-10rem))] overflow-hidden rounded-[2rem]">
      <ChatPanel variant="page" prompt={prompt} />
    </div>
  );
}
