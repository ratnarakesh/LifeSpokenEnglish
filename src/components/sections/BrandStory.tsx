import Image from "next/image";
import { CheckCircle2, MapPin, Trophy, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { STORY } from "@/lib/content";

const CHAPTER_ICONS: Record<(typeof STORY.chapters)[number]["id"], LucideIcon> = {
  where: MapPin,
  why: Zap,
  milestones: Trophy,
};

export function BrandStory() {
  return (
    <section id="why" aria-labelledby="story-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-50" aria-hidden="true" />
      <Image
        src="/brand/life-emblem.png"
        alt=""
        width={256}
        height={256}
        className="pointer-events-none absolute top-16 -right-24 -z-10 size-[26rem] opacity-[0.05] select-none sm:-right-10 lg:size-[34rem]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-ember-300 uppercase">
                  About LIFE & Mani Sir
                </p>
                <h2
                  id="story-title"
                  className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
                >
                  Why We Are Called <GradientText>&ldquo;LIFE&rdquo;</GradientText>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-pretty text-stone-300 sm:text-lg">
                  {STORY.philosophy}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="mt-8 grid grid-cols-4 gap-2 sm:gap-3" aria-label="LIFE stands for Live It For Eternity">
                  {STORY.acronym.map(({ letter, word }) => (
                    <div
                      key={letter}
                      className="glass group rounded-2xl px-2 py-4 text-center transition duration-300 hover:-translate-y-1 hover:border-ember-500/50"
                    >
                      <dt className="bg-linear-to-b from-sun-300 to-ember-500 bg-clip-text font-serif text-3xl font-black text-transparent sm:text-4xl">
                        {letter}
                      </dt>
                      <dd className="mt-1 text-[11px] font-semibold tracking-wider text-stone-400 uppercase sm:text-xs">
                        {word}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <ol className="relative space-y-6 lg:col-span-7">
            <span
              className="absolute top-4 bottom-4 left-[1.375rem] w-px bg-linear-to-b from-ember-500/60 via-sun-500/30 to-transparent sm:left-[1.625rem]"
              aria-hidden="true"
            />
            {STORY.chapters.map((chapter, i) => {
              const Icon = CHAPTER_ICONS[chapter.id];
              return (
                <li key={chapter.id} className="relative pl-14 sm:pl-18">
                  <span className="absolute top-5 left-0 grid size-11 place-items-center rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950 shadow-[0_0_30px_-6px_rgb(234_138_42/0.7)] sm:size-13">
                    <Icon className="size-5 sm:size-6" />
                  </span>
                  <Reveal delay={i * 0.08}>
                    <article className="glass glow-card rounded-3xl p-6 sm:p-8">
                      <p className="text-xs font-semibold tracking-wider text-ember-300 uppercase">
                        {String(i + 1).padStart(2, "0")} · {chapter.label}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{chapter.title}</h3>
                      <p className="mt-3 leading-relaxed text-pretty text-stone-300">{chapter.body}</p>
                      {"beliefs" in chapter && (
                        <ol className="mt-5 grid gap-3">
                          {chapter.beliefs.map((belief, b) => (
                            <li
                              key={belief}
                              className="flex gap-3 rounded-2xl border border-stone-800/80 bg-obsidian-950/50 p-4"
                            >
                              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ember-400" />
                              <span className="text-sm leading-relaxed text-stone-200">
                                <strong className="text-white">Belief {b + 1}: </strong>
                                {belief}
                              </span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
