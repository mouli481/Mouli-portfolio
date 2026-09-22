import { ArrowRight } from "lucide-react";
import type { ProjectSummary } from "@/types/api";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/features/projects/project-card";
import { cn } from "@/lib/utils";

const BENTO_SPANS = ["lg:col-span-2 lg:row-span-2", "lg:col-span-1", "lg:col-span-1"];

export function FeaturedProjects({ projects }: { projects: ProjectSummary[] }) {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <Container className="py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems I've designed, built and shipped"
          description="From an enterprise RAG platform serving real teams to the AI-powered site you are on right now."
        />
        <Reveal>
          <ButtonLink href="/projects" variant="outline">
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.1} className={cn(BENTO_SPANS[index])}>
            <ProjectCard project={project} size={index === 0 ? "large" : "default"} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
