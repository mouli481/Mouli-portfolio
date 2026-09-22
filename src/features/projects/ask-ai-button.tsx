"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatWidget } from "@/features/chat/chat-widget-context";

interface AskAiButtonProps {
  projectSlug: string;
  projectTitle: string;
}

export function AskAiButton({ projectSlug, projectTitle }: AskAiButtonProps) {
  const { openChat } = useChatWidget();

  return (
    <Button
      size="sm"
      onClick={() =>
        openChat({
          message: `Tell me about ${projectTitle}. What problem did it solve and how was it built?`,
          projectSlug,
        })
      }
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      Ask AI about this project
    </Button>
  );
}
