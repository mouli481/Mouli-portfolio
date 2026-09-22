import Link from "next/link";
import { HeroPortrait } from "@/features/home/hero-portrait";

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-28">
      <div className="flex flex-col items-start gap-8">
        <span className="glass-card text-muted-foreground rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase">
          4.5+ years · Python Full Stack
        </span>
        <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Hi, I&apos;m Mouli. I build <span className="text-gradient">Generative AI &amp; RAG</span>{" "}
          systems
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Python Full Stack Developer building production AI platforms with FastAPI, LangChain,
          LangGraph and Next.js, from retrieval pipelines to the interfaces people use every day.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="focus-ring bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-medium transition-colors"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="focus-ring border-border hover:border-primary/50 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
      <HeroPortrait />
    </div>
  );
}
