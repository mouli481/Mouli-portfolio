"use client";

import { Bot, RotateCcw, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { ChatPrompt } from "@/features/chat/chat-widget-context";
import { ChatBubble } from "@/features/chat/chat-bubble";
import { ChatInput } from "@/features/chat/chat-input";
import { SuggestedQuestions } from "@/features/chat/suggested-questions";
import { useChat } from "@/features/chat/use-chat";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  variant: "widget" | "page";
  prompt?: ChatPrompt | null;
  onClose?: () => void;
}

export function ChatPanel({ variant, prompt = null, onClose }: ChatPanelProps) {
  const { messages, isStreaming, send, stop, reset } = useChat();
  const inputId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const handledPromptId = useRef<string | null>(null);

  useEffect(() => {
    if (!prompt || handledPromptId.current === prompt.id) {
      return;
    }
    handledPromptId.current = prompt.id;
    void send(prompt.message, { projectSlug: prompt.projectSlug });
  }, [prompt, send]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const isWidget = variant === "widget";

  return (
    <section aria-label="Chat with Mouli's AI assistant" className="flex h-full min-h-0 flex-col">
      <header className="border-border flex items-center gap-3 border-b px-4 py-3">
        <span className="from-primary to-accent flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-white">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 className="text-sm font-semibold">Mouli&apos;s AI assistant</h2>
          <p className="text-muted-foreground text-xs">Answers grounded in my portfolio</p>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={messages.length === 0}
          aria-label="Reset conversation"
          className="focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/5 flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="focus-ring text-muted-foreground hover:text-foreground hover:bg-foreground/5 flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </header>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain p-4",
          !isWidget && "sm:p-6"
        )}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Hi! Ask me anything about Mouli.
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                I answer from his real profile, experience and projects, and I show my sources.
              </p>
            </div>
            <SuggestedQuestions compact={isWidget} onSelect={(question) => void send(question)} />
          </div>
        ) : (
          <ol className="flex flex-col gap-5" aria-live="polite" aria-relevant="additions">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </ol>
        )}
      </div>

      <div className="border-border border-t p-3">
        <ChatInput
          inputId={inputId}
          isStreaming={isStreaming}
          onSend={(text) => void send(text)}
          onStop={stop}
        />
        <p className="text-muted-foreground mt-2 text-center text-[11px]">
          AI answers can be imperfect. Check the sources for details.
        </p>
      </div>
    </section>
  );
}
