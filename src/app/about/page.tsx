import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getExperience, getProfile } from "@/lib/api/server";
import { PageHeader } from "@/components/ui/page-header";
import { AboutIntro } from "@/features/about/about-intro";
import { StorySection } from "@/features/about/story-section";
import { ValuesGrid } from "@/features/about/values-grid";
import { JourneyTimeline } from "@/features/about/journey-timeline";
import { CtaSection } from "@/features/home/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "The story of Mouli V: from a Computer Science graduate to a Python Full Stack Developer building production Generative AI and RAG systems.",
  path: "/about",
});

export default async function AboutPage() {
  const [profile, experience] = await Promise.all([getProfile(), getExperience()]);

  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="Engineer, builder, AI enthusiast"
        description={profile.tagline}
      />
      <AboutIntro profile={profile} />
      <StorySection bio={profile.bio} />
      <JourneyTimeline education={profile.education} experience={experience} />
      <ValuesGrid values={profile.values} />
      <CtaSection email={profile.email} />
    </>
  );
}
