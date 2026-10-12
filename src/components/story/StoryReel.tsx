import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { YouTubeIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { button } from "@/lib/cn";
import { REEL } from "@/lib/content";
import { LINKS } from "@/lib/site";
import { VideoCard } from "./VideoCard";

export function StoryReel({ showGalleryLink = true }: { showGalleryLink?: boolean }) {
  return (
    <section aria-labelledby="reel-title" className="relative py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-wider text-ember-300 uppercase">Real Classes, Real Energy</p>
          <h2 id="reel-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            See Mani Sir in action
          </h2>
          <p className="mt-1 text-sm text-stone-400">Tap any lesson to play it right here. Swipe for more.</p>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {showGalleryLink && (
            <Link href="/gallery" className={button("secondary", "sm")}>
              Open the Gallery <ArrowUpRight className="size-4" />
            </Link>
          )}
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className={button("secondary", "sm")}>
            <YouTubeIcon className="size-4 text-[#FF0033]" /> More on YouTube
          </a>
        </div>
      </div>
      <ul
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] sm:px-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] [&::-webkit-scrollbar]:hidden"
        aria-label="Mani Sir video lessons"
      >
        {REEL.map((video) => (
          <li key={video.id} className="w-[68vw] max-w-[17rem] shrink-0 snap-start sm:w-64">
            <VideoCard video={video} />
          </li>
        ))}
      </ul>
    </section>
  );
}
