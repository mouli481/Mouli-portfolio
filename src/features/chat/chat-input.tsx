"use client";

import { ArrowUp, Square } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { MAX_INPUT_LENGTH } from "@/features/chat/chat-types";

interface ChatInputProps {
  isStreaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  inputId: string;
}

export function ChatInput({ isStreaming, onSend, onStop, inputId }: ChatInputProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || isStreaming) {
      return;
    }
    onSend(text);
    setValue("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background/60 focus-within:border-primary/60 flex items-end gap-2 rounded-2xl border p-2 transition-colors"
    >
      <label htmlFor={inputId} className="sr-only">
        Ask a question about Mouli
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={MAX_INPUT_LENGTH}
        rows={1}
        placeholder="Ask about projects, skills, experience…"
        className="placeholder:text-muted-foreground/70 [field-sizing:content] max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop generating"
          className="focus-ring bg-foreground/10 hover:bg-foreground/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        >
          <Square className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Send message"
          disabled={!value.trim()}
          className="focus-ring bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
