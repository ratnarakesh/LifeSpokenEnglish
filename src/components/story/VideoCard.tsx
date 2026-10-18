import Image from "next/image";
import { Play } from "lucide-react";
import { VideoButton } from "@/components/modals/ModalTriggers";
import { cn } from "@/lib/cn";
import type { LifeVideo } from "@/lib/content";

import { galleryCopy } from "@/lib/site-copy";

type VideoCardProps = { video: LifeVideo; className?: string; priority?: boolean; variant?: "portrait" | "wide" };

export function VideoCard({ video, className, priority, variant = "portrait" }: VideoCardProps) {
  const wide = variant === "wide";
  return (
    <VideoButton
      video={{ id: video.id, title: video.title }}
      ariaLabel={`Play video: ${video.title}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl bg-obsidian-900 text-left ring-1 ring-stone-800 transition duration-300 hover:-translate-y-1 hover:ring-ember-500/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-400",
        wide ? "aspect-video" : "aspect-[4/5]",
        className,
      )}
    >
      <Image
        src={`/media/yt/${video.id}${wide ? "-wide" : ""}.webp`}
        alt={`Mani Sir teaching: ${video.title}`}
        fill
        priority={priority}
        sizes={wide ? "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 22rem, (min-width: 640px) 18rem, 70vw"}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      {/* Subtle base vignette for bottom text legibility */}
      <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/85 via-transparent to-transparent" />

      {/* Hover backdrop gradient to let play button pop cleanly on hover */}
      <span className="pointer-events-none absolute inset-0 bg-obsidian-950/30 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

      {/* Top-left category tag badge */}
      <span className="absolute top-3 left-3 rounded-full bg-obsidian-950/75 px-2.5 py-1 text-[11px] font-semibold text-ember-200 ring-1 ring-ember-500/30 backdrop-blur-md">
        {video.tag}
      </span>

      {/* Top-right sleek glassmorphic pill badge: 100% visible on resting state, glowing on hover */}
      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-md transition-all duration-300 group-hover:border-ember-400/50 group-hover:bg-linear-to-r group-hover:from-ember-400 group-hover:to-sun-400 group-hover:text-obsidian-950 group-hover:shadow-[0_0_20px_rgb(234_138_42/0.6)]">
        <Play className="size-3 fill-current" />
        <span>{galleryCopy.videoBadge}</span>
      </span>

      {/* Centered play button: completely hidden (opacity-0 scale-90) by default to prevent obscuring artwork/text; reveals smoothly on hover/focus */}
      <span className="pointer-events-none absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950 opacity-0 shadow-[0_0_40px_rgb(234_138_42/0.7)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        <Play className="ml-0.5 size-6 fill-current" />
      </span>

      {/* Bottom title */}
      <span className="absolute inset-x-4 bottom-3.5 text-sm leading-snug font-semibold text-white drop-shadow-sm sm:text-base">
        {video.title}
      </span>
    </VideoButton>
  );
}
