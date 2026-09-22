import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
  label: string;
}

export function Marquee({ items, reverse = false, className, label }: MarqueeProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className={cn(
            "animate-marquee flex shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {items.map((item, index) => (
            <li key={index} className="shrink-0">
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
