import type { EducationItem, ExperienceItem } from "@/types/api";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Milestone {
  year: string;
  title: string;
  detail: string;
}

function buildMilestones(education: EducationItem[], experience: ExperienceItem[]): Milestone[] {
  const educationMilestones = education.map((item) => ({
    year: String(item.year),
    title: `${item.degree} graduate`,
    detail: item.institution,
  }));
  const roleMilestones = [...experience].reverse().map((item) => ({
    year: item.start_date.slice(0, 4),
    title: item.role,
    detail: item.company,
  }));
  return [
    ...educationMilestones,
    ...roleMilestones,
    { year: "Next", title: "Your team?", detail: "Let's build something great" },
  ];
}

interface JourneyTimelineProps {
  education: EducationItem[];
  experience: ExperienceItem[];
}

export function JourneyTimeline({ education, experience }: JourneyTimelineProps) {
  const milestones = buildMilestones(education, experience);

  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="The journey"
        title="From graduate to GenAI engineer"
        description="Four and a half years, three companies, and a steady move toward AI systems."
      />
      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="from-primary via-accent to-primary/0 absolute top-0 bottom-0 left-[11px] w-px bg-gradient-to-b md:top-[11px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full md:bg-gradient-to-r"
        />
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {milestones.map((milestone, index) => (
            <Reveal
              as="li"
              key={`${milestone.year}-${milestone.title}`}
              delay={index * 0.12}
              className="relative pl-10 md:pt-10 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="border-primary bg-background absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2"
              >
                <span className="bg-primary h-2 w-2 rounded-full" />
              </span>
              <p className="text-gradient text-2xl font-semibold">{milestone.year}</p>
              <p className="mt-2 font-medium">{milestone.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">{milestone.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Container>
  );
}
