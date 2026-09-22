"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { canRenderHeroScene } from "@/features/home/hero-scene/device-capabilities";

const NeuralField = dynamic(
  () => import("@/features/home/hero-scene/neural-field").then((module) => module.NeuralField),
  { ssr: false }
);

const IDLE_TIMEOUT_MS = 1500;
const STATIC_GLOW = [
  "radial-gradient(ellipse at 72% 38%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
  "radial-gradient(ellipse at 18% 85%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 55%)",
].join(", ");

function whenIdle(callback: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const handle = window.requestIdleCallback(callback, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = globalThis.setTimeout(callback, 600);
  return () => globalThis.clearTimeout(handle);
}

export function HeroBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !canRenderHeroScene()) {
      setShouldRenderScene(false);
      return undefined;
    }
    return whenIdle(() => setShouldRenderScene(true));
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: STATIC_GLOW }} />
      {shouldRenderScene ? <NeuralField /> : null}
      <div className="from-background absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  );
}
