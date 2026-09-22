import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getExperience, getProfile } from "@/lib/api/server";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { CtaSection } from "@/features/home/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Mouli V's professional experience across ITC Infotech, Binder-sa and Onward Technologies, from enterprise RAG platforms to micro frontends.",
  path: "/experience",
});

export default async function ExperiencePage() {
  const [experience, profile] = await Promise.all([getExperience(), getProfile()]);
  const companies = experience.map((item) => item.company);

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where I've built and shipped"
        description={`${profile.years_experience}+ years across enterprise software, B2B platforms and Generative AI, with every role pushing me closer to production AI systems.`}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Companies">
          {companies.map((company) => (
            <li key={company}>
              <Badge className="text-foreground">{company}</Badge>
            </li>
          ))}
        </ul>
      </PageHeader>
      <ExperienceTimeline items={experience} />
      <CtaSection email={profile.email} />
    </>
  );
}
