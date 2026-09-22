import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectSummary } from "@/types/api";
import { Container } from "@/components/ui/container";

interface ProjectPagerProps {
  projects: ProjectSummary[];
  currentSlug: string;
}

export function ProjectPager({ projects, currentSlug }: ProjectPagerProps) {
  const index = projects.findIndex((project) => project.slug === currentSlug);
  if (index === -1 || projects.length < 2) {
    return null;
  }
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const links = [
    { project: previous, label: "Previous project", icon: ArrowLeft, align: "items-start" },
    { project: next, label: "Next project", icon: ArrowRight, align: "items-end text-right" },
  ];

  return (
    <Container className="pb-8">
      <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
        {links.map(({ project, label, icon: IconComponent, align }) =>
          project ? (
            <Link
              key={label}
              href={`/projects/${project.slug}`}
              className={`focus-ring glass-card hover:border-primary/50 flex flex-col gap-2 rounded-3xl p-6 transition-colors ${align}`}
            >
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <IconComponent className="h-4 w-4" aria-hidden="true" />
                {label}
              </span>
              <span className="text-lg font-semibold tracking-tight">{project.title}</span>
            </Link>
          ) : null
        )}
      </nav>
    </Container>
  );
}
