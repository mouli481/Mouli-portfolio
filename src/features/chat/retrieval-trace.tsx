"use client";

import { AnimatePresence, motion } from "motion/react";
import { Braces, Briefcase, ChevronDown, Layers, Scan, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { RetrievalCandidate } from "@/types/api";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<string, typeof UserRound> = {
  profile: UserRound,
  experience: Briefcase,
  projects: Layers,
  skills: Braces,
};

interface RetrievalTraceProps {
  candidates: RetrievalCandidate[];
  hasAnswerStarted: boolean;
}

export function RetrievalTrace({ candidates, hasAnswerStarted }: RetrievalTraceProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);

  useEffect(() => {
    if (hasAnswerStarted && !hasAutoCollapsed) {
      setIsExpanded(false);
      setHasAutoCollapsed(true);
    }
  }, [hasAnswerStarted, hasAutoCollapsed]);

  if (candidates.length === 0) {
    return null;
  }

  const selectedCount = candidates.filter((candidate) => candidate.selected).length;

  return (
    <div className="border-border bg-background/40 overflow-hidden rounded-2xl border">
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="focus-ring text-muted-foreground hover:text-foreground flex w-full items-center gap-2 px-3 py-2 text-xs font-medium transition-colors"
      >
        <Scan className="text-primary h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-left">
          Retrieved {candidates.length} chunk{candidates.length === 1 ? "" : "s"}, selected top{" "}
          {selectedCount} for context
        </span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 shrink-0 transition-transform", isExpanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-1.5 px-3 pb-3">
              {candidates.map((candidate, index) => {
                const SectionIcon = SECTION_ICONS[candidate.section] ?? UserRound;
                return (
                  <motion.li
                    key={candidate.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors",
                      candidate.selected ? "bg-primary/10" : "opacity-50"
                    )}
                  >
                    <SectionIcon
                      className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        candidate.selected ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">{candidate.title}</span>
                    <span className="bg-foreground/10 relative h-1.5 w-16 shrink-0 overflow-hidden rounded-full">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: candidate.relevance / 100 }}
                        transition={{ duration: 0.5, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                        className={cn(
                          "absolute inset-y-0 left-0 w-full origin-left rounded-full",
                          candidate.selected ? "bg-primary" : "bg-muted-foreground"
                        )}
                      />
                    </span>
                    <span className="text-muted-foreground w-8 shrink-0 text-right tabular-nums">
                      {candidate.relevance}%
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
