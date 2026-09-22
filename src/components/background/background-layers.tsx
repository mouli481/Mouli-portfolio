export function BackgroundLayers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
    >
      <div className="grid-pattern absolute inset-0" />

      <div className="animate-aurora-spin absolute inset-[-20%] opacity-[0.35]">
        <div className="bg-primary/40 absolute top-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[140px]" />
      </div>

      <div className="animate-aurora-a absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-30 blur-[110px]" />
      <div className="animate-aurora-b absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-25 blur-[120px]" />
      <div className="animate-aurora-c absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.18] blur-[130px]" />

      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
