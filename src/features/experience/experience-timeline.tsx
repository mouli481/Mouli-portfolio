import type { ExperienceItem } from "@/types/api";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ExperienceCard } from "@/features/experience/experience-card";
import { TimelineTrack } from "@/features/experience/timeline-track";
import { formatDateRange, formatDuration, monthsBetween } from "@/lib/format";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <Container className="pb-24">
      <TimelineTrack>
        <ol className="flex flex-col gap-12">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="relative grid gap-4 pl-12 md:grid-cols-[180px_1fr] md:gap-16 md:pl-0"
            >
              <Reveal delay={0.05} className="hidden pt-6 text-right md:block">
                <p className="font-medium">{formatDateRange(item.start_date, item.end_date)}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {formatDuration(monthsBetween(item.start_date, item.end_date))}
                </p>
              </Reveal>
              <span
                aria-hidden="true"
                className="border-primary bg-background absolute top-7 left-[6px] flex h-5 w-5 items-center justify-center rounded-full border-2 md:left-[202px]"
              >
                <span
                  className={
                    item.is_current
                      ? "bg-success h-2 w-2 animate-pulse rounded-full"
                      : "bg-primary h-2 w-2 rounded-full"
                  }
                />
              </span>
              <Reveal delay={index * 0.05}>
                <ExperienceCard item={item} />
              </Reveal>
            </li>
          ))}
        </ol>
      </TimelineTrack>
    </Container>
  );
}
