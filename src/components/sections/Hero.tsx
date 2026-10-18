import { ArrowRight, CalendarCheck, Mic, PlayCircle, Star, Wallet } from "lucide-react";
import { FullLogo } from "@/components/layout/Brand";
import { TrialButton, VideoButton } from "@/components/modals/ModalTriggers";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { getSiteSettings } from "@/lib/cms";
import { heroCopy } from "@/lib/site-copy";
import { SITE } from "@/lib/site";

const HIGHLIGHT_ICONS = [CalendarCheck, Wallet, Mic] as const;

export function Hero() {
  const settings = getSiteSettings();
  const heroTitle = settings.heroTitle || heroCopy.headlineFull;
  const subheadline = settings.heroSubtitle || heroCopy.subheadline;

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-20 sm:pt-14 lg:pt-16 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        className="animate-float pointer-events-none absolute top-10 -left-32 -z-10 size-[28rem] rounded-full bg-ember-500/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="animate-float pointer-events-none absolute top-40 -right-32 -z-10 size-[26rem] rounded-full bg-sun-500/20 blur-[120px] [animation-delay:-4s]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="relative mx-auto mb-7 w-32 sm:w-40 lg:w-44">
          <div
            className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-ember-500/35 blur-3xl"
            aria-hidden="true"
          />
          <FullLogo priority className="h-auto w-full drop-shadow-[0_10px_40px_rgb(234_138_42/0.35)]" />
        </div>

        <Reveal y={12}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-200 transition hover:border-amber-400/60 sm:text-sm"
          >
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            {heroCopy.badgeText}
          </a>
        </Reveal>

        <h1 className="mx-auto mt-7 max-w-5xl text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
          {heroTitle === heroCopy.headlineFull ? (
            <>
              {heroCopy.headlineLead} <GradientText>{heroCopy.headlineGradient}</GradientText>
            </>
          ) : (
            heroTitle
          )}
        </h1>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-stone-400 sm:text-lg">
            {subheadline.includes("Mani\u00A0Sir") || subheadline.includes("Mani Sir") ? (
              <>
                {subheadline.split(/Mani[\s\u00A0]+Sir/)[0]}
                <strong className="font-semibold text-stone-200">{SITE.founderAlias}</strong>
                {subheadline.split(/Mani[\s\u00A0]+Sir/).slice(1).join("Mani\u00A0Sir")}
              </>
            ) : (
              subheadline
            )}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrialButton className={button("primary", "lg", "w-full sm:w-auto")}>
            {heroCopy.ctaButtons.trial}
            <ArrowRight className="size-5" />
          </TrialButton>
          <VideoButton className={button("secondary", "lg", "w-full sm:w-auto")}>
            <PlayCircle className="size-5 text-ember-400" />
            {heroCopy.ctaButtons.video}
          </VideoButton>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-xl gap-4 text-left md:max-w-5xl md:grid-cols-3">
          {heroCopy.highlights.map(({ metric, title, description }, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <Reveal key={title} delay={0.25 + i * 0.08}>
                <GlowCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-ember-500/10 text-ember-300 ring-1 ring-ember-500/30">
                      <Icon className="size-5" />
                    </span>
                    <p className="text-2xl font-extrabold text-white">
                      {metric} <span className="text-base font-semibold text-stone-300">{title}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{description}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
