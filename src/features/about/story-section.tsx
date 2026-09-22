import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { ScrollHighlight } from "@/components/motion/scroll-highlight";

export function StorySection({ bio }: { bio: string[] }) {
  return (
    <Container className="grid gap-10 py-20 lg:grid-cols-[240px_1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>My story</Eyebrow>
        <p className="text-muted-foreground mt-3 text-sm">Keep scrolling, it reads itself.</p>
      </div>
      <ScrollHighlight paragraphs={bio} />
    </Container>
  );
}
