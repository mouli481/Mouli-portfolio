import { Sparkles } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/features/chat/chat-types";
import { cn } from "@/lib/utils";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  compact?: boolean;
}

export function SuggestedQuestions({ onSelect, compact = false }: SuggestedQuestionsProps) {
  const questions = compact ? SUGGESTED_QUESTIONS.slice(0, 4) : SUGGESTED_QUESTIONS;

  return (
    <ul className={cn("grid gap-2", !compact && "sm:grid-cols-2")} aria-label="Suggested questions">
      {questions.map((question) => (
        <li key={question}>
          <button
            type="button"
            onClick={() => onSelect(question)}
            className="focus-ring border-border hover:border-primary/50 hover:bg-primary/5 flex w-full items-start gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition-colors"
          >
            <Sparkles className="text-primary mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {question}
          </button>
        </li>
      ))}
    </ul>
  );
}
