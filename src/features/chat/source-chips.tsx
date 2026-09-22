import { FileText } from "lucide-react";
import type { ChatSource } from "@/types/api";

export function SourceChips({ sources }: { sources: ChatSource[] }) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-xs font-medium">Sources</p>
      <ul className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <li key={`${source.section}-${source.title}`}>
            <span
              title={source.snippet}
              className="border-primary/30 bg-primary/10 text-foreground/90 inline-flex max-w-[16rem] items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
            >
              <FileText className="text-primary h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{source.title}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
