"use client";

import Image from "next/image";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import type { CourseInterestId } from "@/lib/content";
import { courseCopy, enrollmentCopy } from "@/lib/site-copy";
import { Modal, type ModalProps } from "./Modal";

export default function TrialModal({ course, ...props }: ModalProps & { course: CourseInterestId }) {
  return (
    <Modal
      {...props}
      title={enrollmentCopy.modal.title}
      description={enrollmentCopy.modal.description}
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
          {courseCopy.admissionTerms.capacity}
        </p>
        <EnrollmentForm defaultCourse={course} />
      </div>
    </Modal>
  );
}
