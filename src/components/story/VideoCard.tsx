import Image from "next/image";
import { Play } from "lucide-react";
import { VideoButton } from "@/components/modals/ModalTriggers";
import { cn } from "@/lib/cn";
import type { LifeVideo } from "@/lib/content";

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
      <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/95 via-obsidian-950/10 to-transparent" />
      <span className="absolute top-3 left-3 rounded-full bg-obsidian-950/70 px-2.5 py-1 text-[11px] font-semibold text-ember-200 ring-1 ring-ember-500/30 backdrop-blur">
        {video.tag}
      </span>
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950 opacity-90 shadow-[0_0_40px_rgb(234_138_42/0.55)] transition duration-300 group-hover:scale-110 group-hover:opacity-100">
        <Play className="ml-0.5 size-6 fill-current" />
      </span>
      <span className="absolute inset-x-4 bottom-4 text-sm leading-snug font-semibold text-white sm:text-base">
        {video.title}
      </span>
    </VideoButton>
  );
}
