export function BackgroundLayers() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-pattern absolute inset-0" />
      <div className="bg-primary/25 absolute -top-40 -left-40 h-[32rem] w-[32rem] animate-[pulse_10s_ease-in-out_infinite] rounded-full blur-[120px]" />
      <div className="bg-accent/20 absolute top-1/3 -right-40 h-[28rem] w-[28rem] animate-[pulse_12s_ease-in-out_infinite] rounded-full blur-[120px]" />
      <div className="bg-primary/10 absolute bottom-0 left-1/4 h-[26rem] w-[26rem] animate-[pulse_14s_ease-in-out_infinite] rounded-full blur-[130px]" />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
