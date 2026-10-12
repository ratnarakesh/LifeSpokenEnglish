import { MapPin, Navigation } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button, cn } from "@/lib/cn";
import { STORY } from "@/lib/content";
import { ADDRESS, LINKS } from "@/lib/site";

type ChapterHeaderProps = { number: string; label: string; title: string; year?: string; centered?: boolean };

function ChapterHeader({ number, label, title, year, centered }: ChapterHeaderProps) {
  return (
    <div>
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span className="bg-linear-to-b from-sun-300 to-ember-600 bg-clip-text font-serif text-5xl font-black text-transparent sm:text-6xl">
          {number}
        </span>
        {year && (
          <span className="rounded-full border border-sun-400/40 bg-sun-400/10 px-3 py-1 text-xs font-bold tracking-wider text-sun-300">
            {year}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-semibold tracking-wider text-ember-300 uppercase">{label}</p>
      <h3 className="mt-2 text-2xl leading-tight font-bold text-balance text-white sm:text-3xl lg:text-4xl">{title}</h3>
    </div>
  );
}

export function StoryJourney() {
  const { beginning, turningPoint, evolution } = STORY;

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wider text-ember-300 uppercase">The Journey So Far</p>
          <h2 id="journey-title" className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
            From one room to <GradientText>thousands of confident voices</GradientText>
          </h2>
        </Reveal>
        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <span
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-ember-500/70 via-sun-400/60 to-ember-500/70 lg:block"
            aria-hidden="true"
          />
          {STORY.milestones.map((m, i) => (
            <li key={m.year}>
              <Reveal delay={i * 0.08} className="relative flex h-full flex-col items-center text-center">
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-obsidian-950 shadow-[0_0_30px_-4px_rgb(234_138_42/0.7)] ring-2 ring-ember-500/70">
                  <span className="font-serif text-sm font-black text-sun-300">{m.year}</span>
                </span>
                <GlowCard className="mt-4 h-full w-full p-5">
                  <p className="font-bold text-white">{m.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{m.body}</p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* 01. The Beginning */}
      <div className="mx-auto mt-24 grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <ChapterHeader number={beginning.number} label={beginning.label} title={beginning.title} year={beginning.year} />
          <div className="mt-6 space-y-4 leading-relaxed text-pretty text-stone-300 sm:text-lg">
            {beginning.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 2 ? "font-medium text-white" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <GlowCard className="overflow-hidden p-0">
            <div className="relative aspect-[16/10] overflow-hidden">
              <iframe
                src={LINKS.mapEmbed}
                title="Where LIFE began: Madhurawada, Visakhapatnam"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]"
              />
              <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-obsidian-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-obsidian-950/80 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-ember-500/40 backdrop-blur">
                <MapPin className="size-4 text-ember-400" /> Where it all began
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="font-bold text-white">{ADDRESS.building.split(",")[0]}</p>
                <p className="text-sm text-stone-400">
                  {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.city}
                </p>
              </div>
              <a href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer" className={button("secondary", "sm")}>
                <Navigation className="size-4 text-ember-400" /> Visit us
              </a>
            </div>
          </GlowCard>
        </Reveal>
      </div>

      {/* 02. The Turning Point */}
      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ChapterHeader number={turningPoint.number} label={turningPoint.label} title={turningPoint.title} />
            <div className="mt-6 space-y-4 leading-relaxed text-pretty text-stone-300 sm:text-lg">
              {turningPoint.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="font-semibold text-white">{turningPoint.truthsIntro}</p>
            </div>
          </Reveal>
          <ol className="grid gap-4 lg:col-span-7">
            {turningPoint.truths.map(({ title, body, icon: Icon }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08}>
                  <GlowCard className="flex gap-5 p-6 sm:p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950 shadow-[0_0_30px_-6px_rgb(234_138_42/0.7)]">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-ember-300 uppercase">Truth {i + 1}</p>
                      <h4 className="mt-1 text-lg font-bold text-white sm:text-xl">{title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">{body}</p>
                    </div>
                  </GlowCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 03. The Evolution */}
      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <ChapterHeader number={evolution.number} label={evolution.label} title={evolution.title} centered />
          <p className="mt-6 leading-relaxed text-pretty text-stone-300 sm:text-lg">{evolution.intro}</p>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {evolution.stories.map(({ who, body, icon: Icon }, i) => (
            <li key={who}>
              <Reveal delay={i * 0.08} className="h-full">
                <GlowCard className="h-full p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sun-500/10 text-sun-300 ring-1 ring-sun-500/30">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-5 leading-relaxed text-stone-300">
                    <strong className="text-lg font-bold text-white">{who}</strong> {body}
                  </p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-pretty text-stone-300 sm:text-lg">
            {evolution.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
