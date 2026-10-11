"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

type YouTubeLiteProps = { videoId: string; title: string };

export function YouTubeLite({ videoId, title }: YouTubeLiteProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-linear-to-br from-emerald-400 to-cyan-500 text-obsidian-950 shadow-[0_0_60px_rgb(16_185_129/0.6)] transition duration-300 group-hover:scale-110">
            <Play className="ml-1 size-8 fill-current" />
          </span>
          <span className="absolute bottom-5 left-5 text-left">
            <span className="block text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Official Orientation
            </span>
            <span className="mt-1 block text-lg font-bold text-white sm:text-xl">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
