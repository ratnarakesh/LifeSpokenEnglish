"use client";

import type { ReactNode } from "react";
import { useModals } from "@/components/Providers";

type TriggerProps = { className?: string; children: ReactNode };

export function TrialButton({ className, children }: TriggerProps) {
  const { openTrial } = useModals();
  return (
    <button type="button" onClick={openTrial} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}

export function VideoButton({ className, children }: TriggerProps) {
  const { openVideo } = useModals();
  return (
    <button type="button" onClick={openVideo} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}
