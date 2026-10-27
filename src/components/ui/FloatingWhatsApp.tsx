"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { SITE, whatsappLink } from "@/lib/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show polite prompt after 2.5s on initial page load if not dismissed
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Exclude on administrative or lab routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/theme-lab")) {
    return null;
  }

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed right-4 bottom-20 z-40 md:right-8 md:bottom-8 print:hidden">
      {/* Interactive Floating Tooltip Prompt */}
      {showTooltip && !dismissed && (
        <div
          role="region"
          aria-label="WhatsApp quick chat notification"
          className={cn(
            "group/tip absolute right-0 bottom-full mb-3 w-64 max-w-[calc(100vw-2rem)]",
            "rounded-2xl border border-emerald-500/30 bg-obsidian-950/95 p-3.5 shadow-2xl shadow-obsidian-950/80 backdrop-blur-xl",
            "transition-all duration-300 animate-fade-up",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-xs font-bold text-white tracking-wide">
                Mani&nbsp;Sir is Available
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss chat prompt"
              className="text-stone-400 transition hover:text-white p-0.5 -mr-1 -mt-1 rounded-md"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <p className="mt-1.5 text-[11px] leading-relaxed text-stone-300">
            Have questions about timings, 10 free demo classes, or fees? Chat directly!
          </p>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start WhatsApp conversation with Mani Sir"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-950/50 transition hover:from-emerald-500 hover:to-emerald-400 active:scale-95"
          >
            <WhatsAppIcon className="size-3.5 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Little speech arrow pointing down to button */}
          <div
            className="absolute -bottom-1.5 right-6 size-3 rotate-45 border-r border-b border-emerald-500/30 bg-obsidian-950"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Fancy Floating Button */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mani Sir on WhatsApp"
        title="Chat with Mani&nbsp;Sir on WhatsApp"
        className={cn(
          "group relative flex items-center gap-2.5 rounded-full p-2.5 sm:px-4 sm:py-2.5",
          "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-2xl shadow-emerald-950/80",
          "border border-emerald-300/40 hover:border-emerald-200 transition-all duration-300",
          "hover:scale-105 hover:shadow-emerald-500/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400",
        )}
      >
        {/* Pulsing Aura Ring */}
        <span
          className="absolute -inset-1 -z-10 rounded-full bg-emerald-500/25 blur-sm transition-all duration-300 group-hover:bg-emerald-400/40 group-hover:blur-md"
          aria-hidden="true"
        />

        {/* WhatsApp Icon with Live Dot Badge */}
        <div className="relative grid size-8 sm:size-7 place-items-center rounded-full bg-white/20 backdrop-blur-sm">
          <WhatsAppIcon className="size-5 sm:size-4 fill-white" />
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300 border border-emerald-700" />
          </span>
        </div>

        {/* Text for screen readers and visible on sm+ screens */}
        <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
          <span className="text-xs font-extrabold tracking-wide text-white drop-shadow-sm">
            Chat with {SITE.founderAlias}
          </span>
          <span className="text-[10px] font-medium text-emerald-100 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
            Online &bull; 1-Tap Reply
          </span>
        </div>
      </a>
    </aside>
  );
}

