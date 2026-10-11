import { ArrowUpRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { YouTubeLite } from "@/components/YouTubeLite";
import { GoogleIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { LINKS, SITE, VIDEO_ID } from "@/lib/site";

type Social = { href: string; icon: ReactNode; label: string; handle: string; accent: string };

const SOCIALS: Social[] = [
  {
    href: LINKS.youtube,
    icon: <YouTubeIcon className="size-6 text-[#FF0033]" />,
    label: "YouTube Channel",
    handle: "@englishbymanisir",
    accent: "hover:border-red-500/50",
  },
  {
    href: LINKS.instagram,
    icon: <InstagramIcon className="size-6 text-pink-400" />,
    label: "Instagram",
    handle: "@english.by.mani.sir",
    accent: "hover:border-pink-500/50",
  },
  {
    href: LINKS.googleMaps,
    icon: <GoogleIcon className="size-6" />,
    label: "Google Reviews",
    handle: `${SITE.rating.value} ★ · ${SITE.rating.label} reviews`,
    accent: "hover:border-amber-500/50",
  },
];

export function VideoShowcase() {
  return (
    <section id="video" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Video Tour"
          title={
            <>
              Meet Mani Sir <GradientText>before your first class.</GradientText>
            </>
          }
          description="Watch the official orientation to understand exactly how LIFE classes work, then follow along for daily English tips."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-3xl p-2 sm:p-3">
              <YouTubeLite videoId={VIDEO_ID} title="LIFE Spoken English – Official Orientation by Mani Sir" />
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="flex-1">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass group flex h-full items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${s.accent}`}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-950/60 ring-1 ring-slate-800">
                    {s.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-slate-400">{s.label}</span>
                    <span className="block truncate font-semibold text-white">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                <div className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-amber-100">
                  Rated <strong>{SITE.rating.value}</strong> by {SITE.rating.label} learners on Google
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
