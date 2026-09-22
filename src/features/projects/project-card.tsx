import Link from "next/link";
import { ArrowUpRight, CircleCheck } from "lucide-react";
import type { ProjectSummary } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { CATEGORY_ACCENTS, CATEGORY_LABELS } from "@/features/projects/categories";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectSummary;
  size?: "default" | "large";
  className?: string;
}

export function ProjectCard({ project, size = "default", className }: ProjectCardProps) {
  const visibleStack = project.tech_stack.slice(0, size === "large" ? 8 : 4);

  return (
    <SpotlightCard className={cn("h-full", className)}>
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="View"
        className="focus-ring flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-8"
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-40 bg-gradient-to-b opacity-70",
            CATEGORY_ACCENTS[project.category]
          )}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="text-foreground">{CATEGORY_LABELS[project.category]}</Badge>
            <span className="text-muted-foreground text-xs">
              {project.company} · {project.period}
            </span>
          </div>
          <span className="border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <div className="relative flex flex-1 flex-col gap-3">
          <h3
            className={cn(
              "font-semibold tracking-tight text-balance",
              size === "large" ? "text-2xl sm:text-3xl" : "text-xl"
            )}
          >
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed text-pretty sm:text-base">
            {project.summary}
          </p>
          {size === "large" ? (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.highlights.slice(0, 4).map((highlight) => (
                <li
                  key={highlight}
                  className="border-border bg-background/30 flex gap-3 rounded-2xl border p-4 text-sm"
                >
                  <CircleCheck
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-foreground/85">{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ul className="relative flex flex-wrap gap-2" aria-label="Tech stack">
          {visibleStack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {project.tech_stack.length > visibleStack.length ? (
            <li>
              <Badge>+{project.tech_stack.length - visibleStack.length}</Badge>
            </li>
          ) : null}
        </ul>
      </Link>
    </SpotlightCard>
  );
}
