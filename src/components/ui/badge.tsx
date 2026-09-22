import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-border bg-foreground/[0.03] text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        className
      )}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-primary inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase",
        className
      )}
      {...props}
    />
  );
}
