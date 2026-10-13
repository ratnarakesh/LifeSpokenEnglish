import { Sparkles, UsersRound } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCES, BATCH_POLICY } from "@/lib/content";
import { SITE } from "@/lib/site";

const STATS = [
  { value: `${SITE.rating.value}★`, label: "Google Rating" },
  { value: SITE.rating.label, label: "Authentic Reviews" },
  { value: "10", label: "Free Trial Classes" },
  { value: "2", label: "Modes: Classroom & Online" },
] as const;

export function WhyLife() {
  return (
    <section id="for-you" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who It's For"
          title={
            <>
              Built for everyone who has ever <GradientText>hesitated to speak.</GradientText>
            </>
          }
          description="Whether you're facing your first campus interview, speaking up at a parents' meeting, or leading a client call, LIFE meets you exactly where you are."
        />

        <Reveal delay={0.05} className="mx-auto mt-8 max-w-3xl">
          <p className="flex flex-col items-center gap-3 rounded-2xl border border-ember-500/40 bg-linear-to-r from-ember-500/15 via-sun-500/10 to-ember-500/15 px-5 py-4 text-center text-sm leading-relaxed font-medium text-stone-100 sm:flex-row sm:text-left sm:text-base">
            <UsersRound className="size-6 shrink-0 text-sun-300" />
            <span>
              <strong className="text-white">Eligibility: </strong>
              {BATCH_POLICY.eligibility}
            </span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <GlowCard className="flex h-full flex-col justify-between p-8">
              <div>
                <Sparkles className="size-8 text-ember-400/80" />
                <p className="mt-4 text-xs font-semibold tracking-wider text-ember-300 uppercase">
                  The LIFE Approach
                </p>
                <p className="mt-2 text-lg leading-relaxed text-stone-200">
                  Live, face-to-face speaking practice rooted in real-life situations, with equal focus
                  on understanding concepts and speaking them aloud, explained in a Telugu-friendly way
                  so no learner is left behind.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 text-xl font-black text-obsidian-950">
                    MS
                  </span>
                  <div>
                    <p className="font-bold text-white">{SITE.founder}</p>
                    <p className="text-sm text-stone-400">
                      &ldquo;{SITE.founderAlias}&rdquo; · Founder & Lead Trainer
                    </p>
                  </div>
                </div>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-stone-500">{s.label}</dt>
                    <dd className="mt-1 text-2xl font-extrabold text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </GlowCard>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {AUDIENCES.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <GlowCard className="h-full p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sun-500/10 text-sun-300 ring-1 ring-sun-500/30">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{description}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
