"use client";

import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { button, cn } from "@/lib/cn";
import { ADDRESS, LINKS } from "@/lib/site";

type MapEmbedProps = { title: string; className?: string };

// Click-to-load map: no Google request, cookie or script until the visitor asks for it.
export function MapEmbed({ title, className }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={LINKS.mapEmbed}
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        className={cn(
          "size-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]",
          className,
        )}
        allowFullScreen
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden bg-obsidian-900 p-6 text-center",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/20 blur-3xl" aria-hidden="true" />
      <span className="relative grid size-14 place-items-center rounded-full bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950 shadow-[0_0_40px_rgb(234_138_42/0.5)]">
        <MapPin className="size-7" />
      </span>
      <p className="relative font-semibold text-white">
        {ADDRESS.locality}, {ADDRESS.city}
      </p>
      <div className="relative flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setLoaded(true)} className={button("secondary", "sm")}>
          <MapPin className="size-4 text-ember-400" /> Load interactive map
        </button>
        <a href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer" className={button("secondary", "sm")}>
          <Navigation className="size-4 text-ember-400" /> Open in Google Maps
        </a>
      </div>
      <p className="relative max-w-xs text-xs text-stone-500">
        The map is provided by Google and loads only when you choose.{" "}
        <Link href="/privacy#third-party" className="underline hover:text-ember-300">
          Privacy details
        </Link>
      </p>
    </div>
  );
}
