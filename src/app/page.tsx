import { getProfile, getProjects, getSkills, getStats } from "@/lib/api/server";
import { HeroSection } from "@/features/home/hero-section";
import { StatsSection } from "@/features/home/stats-section";
import { FeaturedProjects } from "@/features/home/featured-projects";
import { FocusAreas } from "@/features/home/focus-areas";
import { TechMarquee } from "@/features/home/tech-marquee";
import { CtaSection } from "@/features/home/cta-section";
import { ProcessSection } from "@/features/home/process-section";

export default async function HomePage() {
  const [profile, stats, projects, skills] = await Promise.all([
    getProfile(),
    getStats(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <StatsSection stats={stats} />
      <FeaturedProjects projects={projects} />
      <TechMarquee skills={skills} />
      <ProcessSection />
      <FocusAreas areas={profile.focus_areas} />
      <CtaSection email={profile.email} />
    </>
  );
}
