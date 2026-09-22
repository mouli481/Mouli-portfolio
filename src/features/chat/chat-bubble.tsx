import { Bot, UserRound } from "lucide-react";
import { motion } from "motion/react";
import type { ConversationMessage } from "@/features/chat/chat-types";
import { CopyButton } from "@/features/chat/copy-button";
import { FormattedText } from "@/features/chat/formatted-text";
import { RetrievalTrace } from "@/features/chat/retrieval-trace";
import { SourceChips } from "@/features/chat/source-chips";
import { TypingIndicator } from "@/features/chat/typing-indicator";
import { cn } from "@/lib/utils";

export function ChatBubble({ message }: { message: ConversationMessage }) {
  const isUser = message.role === "user";
  const isWaiting = message.status === "streaming" && message.content.length === 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-foreground/10" : "from-primary to-accent bg-gradient-to-br text-white"
        )}
      >
        {isUser ? <UserRound className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div className={cn("flex max-w-[85%] flex-col gap-2", isUser && "items-end")}>
        <span className="sr-only">{isUser ? "You said:" : "Assistant said:"}</span>
        {!isUser && message.candidates.length > 0 ? (
          <RetrievalTrace
            candidates={message.candidates}
            hasAnswerStarted={message.content.length > 0}
          />
        ) : null}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-md"
              : "bg-foreground/[0.05] border-border rounded-tl-md border",
            message.status === "error" && "border-danger/40 text-danger"
          )}
        >
          {isWaiting ? <TypingIndicator /> : <FormattedText text={message.content} />}
        </div>
        {!isUser && message.status === "done" && message.content ? (
          <div className="flex flex-col gap-2">
            <SourceChips sources={message.sources} />
            <div>
              <CopyButton text={message.content} />
            </div>
          </div>
        ) : null}
      </div>
    </motion.li>
  );
}
