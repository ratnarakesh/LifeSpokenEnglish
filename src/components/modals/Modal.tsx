"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ModalShellProps = ModalProps & {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
  /** Focus the close button on open (e.g. when the body is an iframe that would trap keyboard focus). */
  focusClose?: boolean;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  hideHeader,
  focusClose,
}: ModalShellProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-[60] bg-obsidian-950/80 backdrop-blur-md" />
        <Dialog.Content
          {...(!description && { "aria-describedby": undefined })}
          onOpenAutoFocus={(event) => {
            if (!focusClose) return;
            event.preventDefault();
            closeRef.current?.focus();
          }}
          className={cn(
            "dialog-content fixed top-1/2 left-1/2 z-[70] max-h-[92dvh] w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-stone-800 bg-obsidian-900/95 shadow-2xl shadow-black/60 focus:outline-none",
            className,
          )}
        >
          <div className={cn(hideHeader ? "sr-only" : "px-6 pt-6 pr-14 sm:px-8 sm:pt-8")}>
            <Dialog.Title className="text-xl font-bold text-white sm:text-2xl">{title}</Dialog.Title>
            {description && (
              <Dialog.Description className="mt-1.5 text-sm text-stone-400">
                {description}
              </Dialog.Description>
            )}
          </div>
          {children}
          <Dialog.Close
            ref={closeRef}
            className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-stone-900/80 text-stone-300 ring-1 ring-stone-700 transition hover:bg-stone-800 hover:text-white focus-visible:outline-2 focus-visible:outline-ember-400"
            aria-label="Close"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
