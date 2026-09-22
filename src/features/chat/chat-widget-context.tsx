"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface ChatPrompt {
  id: string;
  message: string;
  projectSlug: string | null;
}

interface ChatWidgetContextValue {
  isOpen: boolean;
  prompt: ChatPrompt | null;
  openChat: (prompt?: { message: string; projectSlug?: string | null }) => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState<ChatPrompt | null>(null);

  const openChat = useCallback<ChatWidgetContextValue["openChat"]>((nextPrompt) => {
    if (nextPrompt) {
      setPrompt({
        id: `${Date.now()}`,
        message: nextPrompt.message,
        projectSlug: nextPrompt.projectSlug ?? null,
      });
    }
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo(
    () => ({ isOpen, prompt, openChat, closeChat, toggleChat }),
    [isOpen, prompt, openChat, closeChat, toggleChat]
  );

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>;
}

export function useChatWidget(): ChatWidgetContextValue {
  const context = useContext(ChatWidgetContext);
  if (!context) {
    throw new Error("useChatWidget must be used inside ChatWidgetProvider");
  }
  return context;
}
