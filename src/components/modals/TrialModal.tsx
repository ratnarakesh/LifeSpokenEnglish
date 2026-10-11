"use client";

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
      <div className="p-6 sm:p-8">
        <EnrollmentForm />
      </div>
    </Modal>
  );
}
