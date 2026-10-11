import { ArrowRight, CalendarCheck, Mic, PlayCircle, Star, Wallet } from "lucide-react";
import { TrialButton, VideoButton } from "@/components/modals/ModalTriggers";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { SITE } from "@/lib/site";

const HIGHLIGHTS = [
  {
    icon: CalendarCheck,
    metric: "10",
    title: "Full Free Classes",
    description: "Attend 10 days risk-free before paying any fee.",
  },
  {
    icon: Wallet,
    metric: "Monthly",
    title: "Tuition Model",
    description: "No heavy lump-sum lock-in. Pay month-to-month.",
  },
  {
    icon: Mic,
    metric: "100%",
    title: "Live Practice",
    description: "Zero pre-recorded videos. Real-time conversational drills.",
  },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        className="animate-float pointer-events-none absolute top-10 -left-32 -z-10 size-[28rem] rounded-full bg-emerald-500/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="animate-float pointer-events-none absolute top-40 -right-32 -z-10 size-[26rem] rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-4s]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
            {SITE.rating.value} Star Rated on Google by {SITE.rating.label} Students & Professionals
          </a>
        </Reveal>

        <h1 className="mx-auto mt-7 max-w-5xl text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
          Speak English with Fluency and <GradientText>Unstoppable Confidence.</GradientText>
        </h1>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-slate-400 sm:text-lg">
            Practical, interactive Spoken English & Soft Skills training led personally by{" "}
            <strong className="font-semibold text-slate-200">{SITE.founderAlias}</strong>. Learn without
            fear or grammar intimidation in Visakhapatnam or via Live Online classes.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrialButton className={button("primary", "lg", "w-full sm:w-auto")}>
            Claim Your 10 Free Trial Classes
            <ArrowRight className="size-5" />
          </TrialButton>
          <VideoButton className={button("secondary", "lg", "w-full sm:w-auto")}>
            <PlayCircle className="size-5 text-emerald-400" />
            Watch Mani Sir&apos;s Video Intro
          </VideoButton>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, metric, title, description }, i) => (
            <Reveal key={title} delay={0.25 + i * 0.08}>
              <GlowCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-2xl font-extrabold text-white">
                    {metric} <span className="text-base font-semibold text-slate-300">{title}</span>
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
