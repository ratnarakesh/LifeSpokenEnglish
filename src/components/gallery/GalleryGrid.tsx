"use client";

import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";
import { VideoCard } from "@/components/story/VideoCard";
import { cn } from "@/lib/cn";
import { PHOTOS, VIDEOS, type VideoCategory } from "@/lib/content";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "classroom", label: "Classroom" },
  { id: "lesson", label: "Lessons" },
  { id: "batch", label: "Batches & Orientation" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];
type Photo = (typeof PHOTOS)[number];

type Item =
  | { kind: "photo"; key: string; photo: Photo }
  | { kind: "video"; key: string; video: (typeof VIDEOS)[number] };

const ITEMS: Item[] = [
  ...PHOTOS.map((photo) => ({ kind: "photo" as const, key: photo.src, photo })),
  ...VIDEOS.map((video) => ({ kind: "video" as const, key: video.id, video })),
];

const matches = (item: Item, filter: FilterId) => {
  if (filter === "all") return true;
  if (item.kind === "photo") return filter === "classroom";
  if (filter === "lesson") return item.video.category === "lesson";
  const batchLike: VideoCategory[] = ["batch", "orientation"];
  return filter === "batch" && batchLike.includes(item.video.category);
};

export function GalleryGrid() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
  const visible = ITEMS.filter((item) => matches(item, filter));

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const count = ITEMS.filter((item) => matches(item, f.id)).length;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-ember-400",
                active
                  ? "bg-linear-to-r from-ember-400 to-sun-400 text-obsidian-950"
                  : "glass text-stone-300 hover:border-ember-500/50 hover:text-white",
              )}
            >
              {f.label} <span className={active ? "text-obsidian-950/70" : "text-stone-500"}>({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((item, i) => (
            <motion.li
              key={`${filter}-${item.key}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03 }}
              className={item.kind === "photo" ? "sm:col-span-2 lg:row-span-2" : undefined}
            >
              {item.kind === "photo" ? (
                <button
                  type="button"
                  onClick={() => setOpenPhoto(item.photo)}
                  aria-label={`Open photo: ${item.photo.caption}`}
                  className="group relative block size-full min-h-64 overflow-hidden rounded-3xl text-left ring-1 ring-stone-800 transition hover:ring-ember-500/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-400"
                >
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/90 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-obsidian-950/70 px-2.5 py-1 text-[11px] font-semibold text-sun-200 ring-1 ring-sun-400/30 backdrop-blur">
                    {item.photo.tag}
                  </span>
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-obsidian-950/70 text-white ring-1 ring-stone-700 backdrop-blur">
                    <Expand className="size-4" />
                  </span>
                  <span className="absolute inset-x-5 bottom-5 text-base font-semibold text-white sm:text-lg">
                    {item.photo.caption}
                  </span>
                </button>
              ) : (
                <VideoCard video={item.video} variant="wide" />
              )}
            </motion.li>
        ))}
      </ul>

      {openPhoto && (
        <Modal
          open={!!openPhoto}
          onOpenChange={(open) => !open && setOpenPhoto(null)}
          title={openPhoto.caption}
          hideHeader
          focusClose
          className="max-w-5xl overflow-hidden bg-black p-0"
        >
          <figure>
            <Image
              src={openPhoto.src}
              alt={openPhoto.alt}
              width={openPhoto.width}
              height={openPhoto.height}
              className="h-auto max-h-[80dvh] w-full object-contain"
            />
            <figcaption className="px-5 py-4 text-center text-sm text-stone-300">{openPhoto.caption}</figcaption>
          </figure>
        </Modal>
      )}
    </div>
  );
}
