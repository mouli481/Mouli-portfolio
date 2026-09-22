"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useChatWidget } from "@/features/chat/chat-widget-context";
import { Skeleton } from "@/components/ui/skeleton";

const ChatPanel = dynamic(
  () => import("@/features/chat/chat-panel").then((module) => module.ChatPanel),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-24" />
        <Skeleton className="h-10" />
      </div>
    ),
  }
);

export function FloatingChatWidget() {
  const pathname = usePathname();
  const { isOpen, prompt, closeChat, toggleChat } = useChatWidget();
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeChat();
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeChat]);

  if (pathname.startsWith("/ai-lab")) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6 print:hidden">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="chat-widget-panel"
            role="dialog"
            aria-modal="false"
            aria-label="AI assistant"
            initial={{ opacity: 0, scale: 0.9, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 16, filter: "blur(6px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="bg-surface/95 border-card-border flex h-[min(620px,calc(100svh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl"
          >
            <ChatPanel variant="widget" prompt={prompt} onClose={closeChat} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        ref={launcherRef}
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        data-cursor={isOpen ? undefined : "Ask"}
        className="focus-ring from-primary to-accent relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_10px_40px_-10px_var(--primary)] transition-transform hover:scale-105"
      >
        {!isOpen ? (
          <span
            aria-hidden="true"
            className="bg-primary/40 absolute inset-0 animate-ping rounded-full [animation-duration:2.5s]"
          />
        ) : null}
        {isOpen ? (
          <X className="relative h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageSquare className="relative h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
