"use client";

import type { VideoTarget } from "@/components/Providers";
import { Modal, type ModalProps } from "./Modal";

export default function VideoModal({ video, ...props }: ModalProps & { video: VideoTarget }) {
  return (
    <Modal {...props} title={video.title} hideHeader focusClose className="max-w-5xl overflow-hidden bg-black p-0">
      <div className="relative aspect-video w-full">
        {props.open && (
          <iframe
            key={video.id}
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={`LIFE Spoken English: ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  );
}
