"use client";

import Image from "next/image";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { BATCH_POLICY, type CourseInterestId } from "@/lib/content";
import { Modal, type ModalProps } from "./Modal";

export default function TrialModal({ course, ...props }: ModalProps & { course: CourseInterestId }) {
  return (
    <Modal
      {...props}
      title="Claim Your 10 Free Trial Classes"
      description="No fee, no commitment. Share a few details and continue on WhatsApp with Mani&nbsp;Sir."
      className="max-w-lg"
    >
      <Image
        src="/brand/life-emblem.webp"
        alt=""
        width={256}
        height={256}
        className="pointer-events-none absolute -top-6 -right-6 size-36 opacity-15"
      />
      <div className="p-6 sm:p-8">
        <p className="mb-5 rounded-xl border border-ember-500/30 bg-ember-500/10 px-4 py-3 text-xs leading-relaxed text-ember-50">
          {BATCH_POLICY.capacity}
        </p>
        <EnrollmentForm defaultCourse={course} />
      </div>
    </Modal>
  );
}
