"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 35 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsEnabled(supportsFinePointer && !prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const target = event.target;
      if (target instanceof Element) {
        setIsHoveringInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isEnabled, cursorX, cursorY]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="border-primary/60 bg-primary/10 pointer-events-none fixed top-0 left-0 z-[60] rounded-full border mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHoveringInteractive ? 56 : 20,
        height: isHoveringInteractive ? 56 : 20,
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
