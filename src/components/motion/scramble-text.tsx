"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]#$%&*";
const FRAME_MS = 28;

function scrambleFrame(text: string, revealedCount: number): string {
  return text
    .split("")
    .map((character, index) => {
      if (index < revealedCount || character === " ") {
        return character;
      }
      return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
    })
    .join("");
}

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text);
      return undefined;
    }

    let revealed = 0;
    const step = Math.max(1, Math.ceil(text.length / 28));
    setDisplay(scrambleFrame(text, 0));
    const timer = window.setInterval(() => {
      revealed += step;
      setDisplay(scrambleFrame(text, revealed));
      if (revealed >= text.length) {
        window.clearInterval(timer);
        setDisplay(text);
      }
    }, FRAME_MS);

    return () => window.clearInterval(timer);
  }, [text, prefersReducedMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
