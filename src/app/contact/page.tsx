import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getProfile } from "@/lib/api/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactChannels } from "@/features/contact/contact-channels";
import { ContactForm } from "@/features/contact/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Mouli V about Generative AI, RAG, FastAPI or Next.js roles and projects.",
  path: "/contact",
});

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something"
        description="Whether it's a role, a project or a question about RAG, I read every message personally."
      />
      <Container className="grid gap-8 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <ContactChannels profile={profile} />
        <Reveal className="glass-card rounded-[2rem] p-6 sm:p-10">
          <ContactForm />
        </Reveal>
      </Container>
    </>
  );
}
