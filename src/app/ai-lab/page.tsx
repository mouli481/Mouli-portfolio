import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { AiLabChat } from "@/features/chat/ai-lab-chat";
import { AiLabSidebar } from "@/features/chat/ai-lab-sidebar";

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Chat with Mouli V's AI assistant: a RAG-powered chatbot that answers questions about his experience, projects and skills with cited sources.",
};

interface AiLabPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | null {
  const resolved = Array.isArray(value) ? value[0] : value;
  return resolved && resolved.trim() ? resolved.trim() : null;
}

export default async function AiLabPage({ searchParams }: AiLabPageProps) {
  const params = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="AI Lab"
        title="Talk to my portfolio"
        description="A retrieval-augmented assistant that knows my work. Ask it anything about my experience, projects or skills, and it will cite where the answer came from."
      />
      <Container className="grid gap-8 pb-24 lg:grid-cols-[1fr_320px]">
        <AiLabChat
          initialQuestion={firstValue(params.q)}
          projectSlug={firstValue(params.project)}
        />
        <AiLabSidebar />
      </Container>
    </>
  );
}
