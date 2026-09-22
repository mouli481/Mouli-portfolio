import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getExperience, getProfile, getProjects, getSkills } from "@/lib/api/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ResumeActions } from "@/features/resume/resume-actions";
import { ResumeDocument } from "@/features/resume/resume-document";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Mouli V, Python Full Stack Developer specializing in Generative AI and RAG. View online or download as PDF.",
  path: "/resume",
});

export default async function ResumePage() {
  const [profile, experience, projects, skills] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <>
      <div className="print:hidden">
        <PageHeader
          eyebrow="Resume"
          title="The one-page version"
          description="Everything important in one place. Read it here, print it, or grab the PDF."
        >
          <ResumeActions />
        </PageHeader>
      </div>
      <Container className="pb-24 print:p-0">
        <Reveal>
          <ResumeDocument
            profile={profile}
            experience={experience}
            projects={projects}
            skills={skills}
          />
        </Reveal>
      </Container>
    </>
  );
}
