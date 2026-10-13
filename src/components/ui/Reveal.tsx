import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

// CSS-only scroll reveal (see `.reveal` in globals.css): no JavaScript, never hides content.
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const style = {
    "--reveal-y": `${y}px`,
    ...(delay > 0 && { "--reveal-shift": `${Math.round(delay * 40)}%` }),
  } as CSSProperties;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
