"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ROTATION_MS = 2600;

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  const role = roles[index] ?? "";

  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden align-bottom">
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role}
          aria-hidden="true"
          className="text-foreground inline-block font-medium"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
