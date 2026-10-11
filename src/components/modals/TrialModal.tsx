"use client";

import Image from "next/image";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { Modal, type ModalProps } from "./Modal";

export default function TrialModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      title="Claim Your 10 Free Trial Classes"
      description="No fee, no commitment. Share a few details and continue on WhatsApp with Mani Sir."
      className="max-w-lg"
    >
      <Image
        src="/brand/life-emblem.png"
        alt=""
        width={256}
        height={256}
        className="pointer-events-none absolute -top-6 -right-6 size-36 opacity-15"
      />
      <div className="p-6 sm:p-8">
        <EnrollmentForm />
      </div>
    </Modal>
  );
}
