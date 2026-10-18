import { Quote, Sparkles, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { REEL, type LifeVideo } from "@/lib/content";
import { storyCopy } from "@/lib/site-copy";
import { SITE } from "@/lib/site";
import { VideoCard } from "./VideoCard";

const reel = (id: string) => REEL.find((v) => v.id === id) as LifeVideo;

export function AcronymCards({ size = "lg" }: { size?: "lg" | "sm" }) {
  const lg = size === "lg";
  return (
    <dl className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="LIFE stands for Live It For Eternity">
      {storyCopy.acronym.map(({ letter, word }) => (
        <div
          key={letter}
          className="glass rounded-2xl px-2 py-4 text-center transition duration-300 hover:-translate-y-1 hover:border-ember-500/50 sm:py-5"
        >
          <dt
            className={`bg-linear-to-b from-sun-300 to-ember-500 bg-clip-text font-serif font-black text-transparent ${lg ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"}`}
          >
            {letter}
          </dt>
          <dd className="mt-1 text-[11px] font-semibold tracking-wider text-stone-300 uppercase sm:text-sm">{word}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StoryMeaning() {
  return (
    <section id="meaning" aria-labelledby="meaning-title" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-ember-300 uppercase">
              <Sparkles className="size-3.5" /> {storyCopy.eyebrow}
            </p>
            <h2
              id="meaning-title"
              className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              {storyCopy.meaningTitle}: <GradientText>{storyCopy.meaningLead}</GradientText>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-stone-300 sm:text-lg">
              {storyCopy.meaningParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="font-semibold text-white">{storyCopy.namedLine}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <AcronymCards />
          </Reveal>

          <Reveal delay={0.15}>
            <blockquote className="relative mt-6 rounded-3xl border-l-4 border-ember-500 bg-linear-to-r from-ember-500/10 to-transparent p-5 pl-6 sm:p-6 sm:pl-8">
              <Quote className="absolute top-4 right-4 size-8 text-ember-500/25" aria-hidden="true" />
              <p className="pr-8 text-lg leading-relaxed font-medium text-pretty text-stone-100 sm:pr-10 sm:text-xl">
                {storyCopy.promise}
              </p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm pt-6 pb-16 sm:max-w-md lg:max-w-none">
            <div className="pointer-events-none absolute inset-[8%] -z-10 rounded-full bg-ember-500/30 blur-3xl" aria-hidden="true" />
            <div className="grid grid-cols-5 items-end gap-3">
              <div className="col-span-3 -rotate-2">
                <VideoCard video={reel("4LtuKMa_cIQ")} />
              </div>
              <div className="col-span-2 mb-10 rotate-3">
                <VideoCard video={reel("5WTLd30TzjE")} />
              </div>
            </div>
            <div className="glass absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 whitespace-nowrap shadow-2xl shadow-black/50">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-sm font-semibold text-white">
                {SITE.rating.value} · {SITE.rating.label} reviews
              </span>
            </div>
            <div className="absolute top-0 right-2 z-10 rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 px-4 py-2 text-center text-obsidian-950 shadow-xl shadow-ember-900/40 sm:right-6">
              <span className="block text-[10px] font-bold tracking-wider uppercase">Since</span>
              <span className="block font-serif text-2xl leading-none font-black">{storyCopy.beginning.year}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
