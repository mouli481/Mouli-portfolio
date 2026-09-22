"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/motion/confetti-burst";

interface ContactSuccessProps {
  message: string;
  onReset: () => void;
}

export function ContactSuccess({ message, onReset }: ContactSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
    >
      <ConfettiBurst />
      <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden="true">
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="var(--success)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M20 33 L28 41 L44 24"
          fill="none"
          stroke="var(--success)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
      </svg>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-semibold tracking-tight outline-none"
      >
        Message sent!
      </h2>
      <p className="text-muted-foreground max-w-sm" role="status">
        {message}
      </p>
      <Button variant="outline" onClick={onReset}>
        Send another message
      </Button>
    </motion.div>
  );
}
