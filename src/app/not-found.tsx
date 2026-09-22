import type { Metadata } from "next";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NotFoundGlyph } from "@/features/errors/not-found-glyph";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-8 py-24 text-center">
      <NotFoundGlyph />
      <div className="flex max-w-lg flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          This page drifted out of the index
        </h1>
        <p className="text-muted-foreground text-lg">
          Even the best retriever can&apos;t rank a page that doesn&apos;t exist. Let&apos;s get you
          back to something real.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </ButtonLink>
        <ButtonLink href="/ai-lab" variant="outline">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Ask the AI instead
        </ButtonLink>
      </div>
    </Container>
  );
}
