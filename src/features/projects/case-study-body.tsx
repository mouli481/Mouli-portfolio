import { CircleCheck, Lightbulb, TriangleAlert } from "lucide-react";
import type { ProjectDetail } from "@/types/api";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ArchitectureDiagram } from "@/features/projects/architecture-diagram";

export function CaseStudyBody({ project }: { project: ProjectDetail }) {
  const narrative = [
    { title: "The problem", body: project.problem, icon: TriangleAlert, tone: "text-accent" },
    { title: "The solution", body: project.solution, icon: Lightbulb, tone: "text-primary" },
  ];

  return (
    <Container className="flex flex-col gap-20 pb-24">
      {project.impact_metrics.length > 0 ? (
        <dl className="grid gap-4 sm:grid-cols-3">
          {project.impact_metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className="glass-card rounded-3xl p-6">
              <dt className="text-muted-foreground text-sm">{metric.label}</dt>
              <dd className="text-gradient mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {metric.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {narrative.map((section, index) => (
          <Reveal key={section.title} delay={index * 0.1}>
            <SpotlightCard tilt={false} className="h-full p-7 sm:p-9">
              <section.icon className={`h-6 w-6 ${section.tone}`} aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{section.title}</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
                {section.body}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <section aria-labelledby="architecture-heading" className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-3">
          <Eyebrow>Architecture</Eyebrow>
          <h2 id="architecture-heading" className="text-3xl font-semibold tracking-tight">
            How the pieces connect
          </h2>
        </Reveal>
        <ArchitectureDiagram
          title={project.title}
          nodes={project.architecture_nodes}
          edges={project.architecture_edges}
        />
      </section>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="highlights-heading">
          <Reveal>
            <Eyebrow>Highlights</Eyebrow>
            <h2 id="highlights-heading" className="mt-3 text-3xl font-semibold tracking-tight">
              What made it work
            </h2>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {project.highlights.map((highlight, index) => (
              <Reveal
                as="li"
                key={highlight}
                delay={index * 0.05}
                className="glass-card flex gap-3 rounded-2xl p-4"
              >
                <CircleCheck className="text-primary mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{highlight}</span>
              </Reveal>
            ))}
          </ul>
        </section>
        <section aria-labelledby="stack-heading">
          <Reveal>
            <Eyebrow>Tech stack</Eyebrow>
            <h2 id="stack-heading" className="mt-3 text-3xl font-semibold tracking-tight">
              Built with
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <li key={tech}>
                  <Badge className="text-foreground px-4 py-2 text-sm">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>
    </Container>
  );
}
