"use client";

import { VIDEO_ID } from "@/lib/site";
import { Modal, type ModalProps } from "./Modal";

export default function VideoModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      title="Mani Sir's Video Introduction"
      hideHeader
      className="max-w-5xl overflow-hidden bg-black p-0"
    >
      <div className="relative aspect-video w-full">
        {props.open && (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="LIFE Spoken English: Mani Sir orientation video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  );
}
