"use client";

import type { ReactNode } from "react";
import { useModals } from "@/components/Providers";
import type { CourseInterestId } from "@/lib/content";

type TriggerProps = { className?: string; children: ReactNode };

export function TrialButton({ className, children, course }: TriggerProps & { course?: CourseInterestId }) {
  const { openTrial } = useModals();
  return (
    <button type="button" onClick={() => openTrial(course)} className={className} aria-haspopup="dialog">
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
