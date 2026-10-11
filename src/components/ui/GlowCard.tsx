"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

function trackGlow(e: PointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      onPointerMove={trackGlow}
      className={cn(
        "glow-card glass rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/50 hover:shadow-[0_20px_60px_-20px_rgb(234_138_42/0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
