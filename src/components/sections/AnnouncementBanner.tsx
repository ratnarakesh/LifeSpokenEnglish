import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import type { Announcement } from "@/lib/content";

// Homepage notice managed by Mani Sir in Contentful (announcement); falls back to ANNOUNCEMENT in content.ts.
export function AnnouncementBanner({ announcement }: { announcement: Announcement }) {
  return (
    <aside aria-label="Announcement" className="px-4 pt-4 sm:px-6 lg:px-8">
      <Link
        href="/#enroll"
        className="group mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-ember-500/30 bg-ember-500/10 px-4 py-3 text-sm text-stone-200 transition hover:border-ember-400/60 hover:bg-ember-500/15 sm:justify-center"
      >
        <Megaphone className="size-4 shrink-0 text-ember-300" aria-hidden="true" />
        {announcement.badgeText && (
          <span className="shrink-0 rounded-full bg-linear-to-r from-ember-400 to-sun-400 px-2.5 py-0.5 text-xs font-bold text-obsidian-950">
            {announcement.badgeText}
          </span>
        )}
        <span className="min-w-0 text-pretty">{announcement.message}</span>
        <ArrowRight
          className="ml-auto size-4 shrink-0 text-ember-300 transition group-hover:translate-x-0.5 sm:ml-0"
          aria-hidden="true"
        />
      </Link>
    </aside>
  );
}
