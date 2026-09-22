import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, UserRound } from "lucide-react";
import type { ProjectDetail } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/motion/scramble-text";
import { AskAiButton } from "@/features/projects/ask-ai-button";
import { CATEGORY_LABELS } from "@/features/projects/categories";

export function CaseStudyHero({ project }: { project: ProjectDetail }) {
  const meta = [
    { icon: Briefcase, label: "Company", value: project.company },
    { icon: Calendar, label: "Period", value: project.period },
    { icon: UserRound, label: "Role", value: project.role },
  ];

  return (
    <Container className="pt-16 pb-12 sm:pt-24">
      <Reveal>
        <Link
          href="/projects"
          className="focus-ring text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-md text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>
      </Reveal>
      <div className="mt-8 flex max-w-4xl flex-col gap-6">
        <Reveal>
          <Badge className="text-foreground">{CATEGORY_LABELS[project.category]}</Badge>
        </Reveal>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
          <ScrambleText text={project.title} />
        </h1>
        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-lg text-pretty sm:text-xl">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {meta.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <item.icon className="text-primary h-4 w-4" aria-hidden="true" />
                <dt className="text-muted-foreground">{item.label}:</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
          <AskAiButton projectSlug={project.slug} projectTitle={project.title} />
        </Reveal>
      </div>
    </Container>
  );
}
