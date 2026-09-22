import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-6 py-24" aria-busy="true">
      <span className="sr-only" role="status">
        Loading…
      </span>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-14 w-full max-w-2xl" />
      <Skeleton className="h-6 w-full max-w-xl" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    </Container>
  );
}
