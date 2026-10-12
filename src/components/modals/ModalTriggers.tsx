"use client";

import type { ReactNode } from "react";
import { useModals, type VideoTarget } from "@/components/Providers";
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

export function VideoButton({
  className,
  children,
  video,
  ariaLabel,
}: TriggerProps & { video?: VideoTarget; ariaLabel?: string }) {
  const { openVideo } = useModals();
  return (
    <button
      type="button"
      onClick={() => openVideo(video)}
      className={className}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
