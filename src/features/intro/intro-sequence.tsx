"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BOOT_LINES } from "@/features/intro/boot-lines";
import { IntroParticles } from "@/features/intro/intro-particles";

const SESSION_KEY = "intro-seen";
const LINE_STAGGER_MS = 300;
const BOOT_DURATION_MS = BOOT_LINES.length * LINE_STAGGER_MS + 200;
const REVEAL_DURATION_MS = 1200;
const HOLD_DURATION_MS = 350;

type Phase = "boot" | "reveal" | "exit" | "done";

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return true;
  }
}

function markIntroSeen(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    return;
  }
}

export function IntroSequence() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    if (prefersReducedMotion || hasSeenIntro()) {
      return;
    }
    markIntroSeen();
    setShouldRender(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!shouldRender || phase === "done") {
      return undefined;
    }
    const timers: number[] = [];
    if (phase === "boot") {
      timers.push(window.setTimeout(() => setPhase("reveal"), BOOT_DURATION_MS));
    } else if (phase === "reveal") {
      timers.push(window.setTimeout(() => setPhase("exit"), REVEAL_DURATION_MS + HOLD_DURATION_MS));
    } else if (phase === "exit") {
      timers.push(window.setTimeout(() => setPhase("done"), 900));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [shouldRender, phase]);

  useEffect(() => {
    if (!shouldRender || phase === "done") {
      return undefined;
    }
    const skip = () => setPhase("done");
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [shouldRender, phase]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  if (!shouldRender || phase === "done") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-label="Loading portfolio"
        className="bg-background fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="grid-pattern absolute inset-0 opacity-40" />

        {phase === "reveal" || phase === "exit" ? (
          <IntroParticles phase={phase === "exit" ? "burst" : "converge"} />
        ) : null}

        <AnimatePresence mode="wait">
          {phase === "boot" ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm text-emerald-400 sm:text-base"
            >
              {BOOT_LINES.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index * LINE_STAGGER_MS) / 1000 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          ) : (
            <motion.h1
              key="name"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-5xl font-bold tracking-tight sm:text-7xl"
            >
              <span className="text-foreground">MOULI</span>{" "}
              <span className="text-gradient">V</span>
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-muted-foreground absolute bottom-8 text-xs"
        >
          Press any key to skip
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
