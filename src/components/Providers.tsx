"use client";

import { MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CourseInterestId } from "@/lib/content";

const TrialModal = dynamic(() => import("./modals/TrialModal"), { ssr: false });
const VideoModal = dynamic(() => import("./modals/VideoModal"), { ssr: false });

type ModalKind = "trial" | "video";

type ModalContextValue = {
  openTrial: (course?: CourseInterestId) => void;
  openVideo: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ModalKind | null>(null);
  const [mounted, setMounted] = useState<Record<ModalKind, boolean>>({ trial: false, video: false });
  const [trialCourse, setTrialCourse] = useState<CourseInterestId>("basic");

  const open = useCallback((kind: ModalKind) => {
    setMounted((prev) => (prev[kind] ? prev : { ...prev, [kind]: true }));
    setActive(kind);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      openTrial: (course = "basic") => {
        setTrialCourse(course);
        open("trial");
      },
      openVideo: () => open("video"),
    }),
    [open],
  );

  const handleOpenChange = useCallback((next: boolean) => {
    if (!next) setActive(null);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ModalContext value={value}>
        {children}
        {mounted.trial && (
          <TrialModal open={active === "trial"} onOpenChange={handleOpenChange} course={trialCourse} />
        )}
        {mounted.video && <VideoModal open={active === "video"} onOpenChange={handleOpenChange} />}
      </ModalContext>
    </MotionConfig>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used inside <Providers>");
  return ctx;
}
