import { Database, FileSearch, Radio, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    icon: Database,
    title: "Chunked portfolio",
    description: "My profile, roles, projects and skills are split into small, focused chunks.",
  },
  {
    icon: FileSearch,
    title: "BM25 retrieval",
    description: "Your question is ranked against every chunk with a pure-Python BM25 retriever.",
  },
  {
    icon: Radio,
    title: "Streamed answer",
    description: "The top chunks ground the model, and tokens stream back over Server-Sent Events.",
  },
  {
    icon: ShieldCheck,
    title: "Stays on topic",
    description:
      "It only answers about my work, and it says so when the answer isn't in the context.",
  },
];

export function AiLabSidebar() {
  return (
    <aside aria-labelledby="how-it-works" className="flex flex-col gap-4">
      <h2
        id="how-it-works"
        className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase"
      >
        How it works
      </h2>
      <ol className="flex flex-col gap-3">
        {STEPS.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 0.08}
            className="glass-card flex gap-4 rounded-3xl p-5"
          >
            <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <step.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium">
                <span className="text-muted-foreground mr-2 tabular-nums">0{index + 1}</span>
                {step.title}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </aside>
  );
}
