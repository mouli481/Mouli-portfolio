import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

export const fieldClassName = cn(
  "bg-background/60 border-border placeholder:text-muted-foreground/70 w-full rounded-2xl border px-4 py-3 text-base transition-colors outline-none",
  "focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-4",
  "aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20"
);

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint ? <span className="text-muted-foreground text-xs">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-danger text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
