import { Briefcase, CircleCheck, MapPin } from "lucide-react";
import type { ExperienceItem } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { formatDateRange, formatDuration, monthsBetween } from "@/lib/format";

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const duration = formatDuration(monthsBetween(item.start_date, item.end_date));

  return (
    <SpotlightCard tilt={false} className="p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
          <p className="text-primary mt-1 flex items-center gap-2 font-medium">
            <Briefcase className="h-4 w-4" aria-hidden="true" />
            {item.company}
          </p>
        </div>
        {item.is_current ? (
          <Badge className="border-success/40 text-success bg-success/10">Current role</Badge>
        ) : null}
      </div>

      <p className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:hidden">
        <span>{formatDateRange(item.start_date, item.end_date)}</span>
        <span>{duration}</span>
      </p>
      <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {item.location}
      </p>

      <p className="text-foreground/85 mt-5 leading-relaxed text-pretty">{item.summary}</p>

      <ul className="mt-5 flex flex-col gap-3">
        {item.achievements.map((achievement) => (
          <li key={achievement} className="flex gap-3 text-sm leading-relaxed">
            <CircleCheck className="text-primary mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="text-muted-foreground">{achievement}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
        {item.tech_stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
