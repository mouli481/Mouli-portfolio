import type { ReactNode } from "react";

export function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-8">
      <h3 className="text-primary text-xs font-semibold tracking-[0.2em] uppercase md:pt-1">
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}
