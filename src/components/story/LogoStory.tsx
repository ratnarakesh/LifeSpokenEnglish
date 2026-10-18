import { Bird, Infinity as InfinityIcon, Sprout, Sunrise, Wind, type LucideIcon } from "lucide-react";
import { FullLogo } from "@/components/layout/Brand";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { storyCopy } from "@/lib/site-copy";

const SYMBOL_ICONS: LucideIcon[] = [Bird, Wind, Sunrise, InfinityIcon, Sprout];

export function LogoStory() {
  const { logoStory } = storyCopy;
  const [first, ...rest] = logoStory.parable;
  return (
    <section id="logo-story" aria-labelledby="logo-story-title" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-sun-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto w-56 sm:w-72 lg:w-full lg:max-w-sm">
            <div className="pointer-events-none absolute inset-[10%] -z-10 rounded-full bg-ember-500/40 blur-3xl" aria-hidden="true" />
            <FullLogo className="animate-float h-auto w-full drop-shadow-[0_20px_60px_rgb(234_138_42/0.45)]" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-sun-400/40 bg-sun-400/10 px-3 py-1 text-xs font-semibold tracking-wider text-sun-300 uppercase">
              <Bird className="size-3.5" /> {logoStory.eyebrow}
            </p>
            <h2
              id="logo-story-title"
              className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              <GradientText>{logoStory.title}</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-pretty text-stone-200 sm:text-xl">
              <p className="first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-black first-letter:text-sun-400">
                {first}
              </p>
              {rest.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 rounded-2xl border border-ember-500/40 bg-ember-500/10 p-5 text-base leading-relaxed font-semibold text-ember-50 sm:text-lg">
              {logoStory.moral}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h3 className="text-xl font-bold text-white sm:text-2xl">{logoStory.symbolsHeading}</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {logoStory.symbols.map((symbol, i) => {
            const Icon = SYMBOL_ICONS[i];
            return (
              <li key={symbol.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <GlowCard className="h-full p-6 text-center">
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950">
                      <Icon className="size-6" />
                    </span>
                    <h4 className="mt-4 font-bold text-white">{symbol.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-stone-400">{symbol.body}</p>
                  </GlowCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
