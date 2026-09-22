import Image from "next/image";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="from-primary/40 to-accent/40 absolute -inset-4 rounded-[2rem] bg-gradient-to-br opacity-60 blur-2xl"
      />
      <div className="glass-card relative overflow-hidden rounded-[1.75rem] p-2">
        <Image
          src="/images/mouli-portrait.webp"
          alt="Portrait of Mouli V at his desk"
          width={660}
          height={800}
          priority
          sizes="(min-width: 1024px) 384px, 80vw"
          className="h-auto w-full rounded-[1.4rem] object-cover"
        />
      </div>
      <div className="bg-surface/95 border-card-border absolute -bottom-5 -left-4 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md">
        <p className="text-muted-foreground text-xs">Based in</p>
        <p className="text-sm font-medium">Bengaluru, India</p>
      </div>
    </div>
  );
}
