export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-24 sm:px-6">
      <span className="border-border text-muted-foreground glass-card rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase">
        Design system preview
      </span>
      <h1 className="max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
        Python Full Stack Developer building{" "}
        <span className="text-gradient">Generative AI &amp; RAG</span> systems
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg">
        This is a placeholder home page proving out the design system: dark theme by default,
        glassmorphism cards, the electric blue and amber accent palette, and the shared layout
        shell. The real hero, bento grid and content land in the next phase.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className="focus-ring bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-medium transition-colors"
        >
          Primary action
        </button>
        <button
          type="button"
          className="focus-ring border-border hover:border-primary/50 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
        >
          Secondary action
        </button>
      </div>
      <div className="glass-card mt-4 w-full rounded-2xl p-8">
        <p className="text-sm font-medium">Glass card surface</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Cards across the site use this translucent, blurred surface over the animated gradient
          mesh background.
        </p>
      </div>
    </div>
  );
}
