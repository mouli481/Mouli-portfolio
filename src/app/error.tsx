"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="bg-danger/10 text-danger flex h-16 w-16 items-center justify-center rounded-2xl">
        <TriangleAlert className="h-7 w-7" aria-hidden="true" />
      </span>
      <div className="flex max-w-lg flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground">
          This section couldn&apos;t load its data. The API may be waking up from a cold start, so
          trying again usually works.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </Container>
  );
}
