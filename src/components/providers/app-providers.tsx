import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ChatWidgetProvider } from "@/features/chat/chat-widget-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <MotionProvider>
          <ChatWidgetProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </ChatWidgetProvider>
        </MotionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
