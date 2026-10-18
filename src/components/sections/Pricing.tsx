import { ArrowRight, Check, Crown, Gift, Settings2, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { TrialButton } from "@/components/modals/ModalTriggers";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { button, cn } from "@/lib/cn";
import { getSiteSettings } from "@/lib/cms";
import { courseCopy } from "@/lib/site-copy";
import { whatsappLink } from "@/lib/site";

export function Pricing() {
  const { feePolicies } = courseCopy;
  const { trialCard, regularCard, mentorshipCard, customTiming, steps } = feePolicies;
  const settings = getSiteSettings();

  return (
    <section id="fees" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={feePolicies.eyebrow}
          title={
            <>
              {feePolicies.titleLead} <GradientText>{feePolicies.titleGradient}</GradientText>
            </>
          }
          description={feePolicies.description}
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <PriceCard
              icon={<Gift className="size-6" />}
              badge={trialCard.badge}
              name={trialCard.name}
              price={trialCard.price}
              priceNote={trialCard.priceNote}
              features={trialCard.features}
              cta={
                <TrialButton className={button("secondary", "md", "w-full")}>
                  {trialCard.cta} <ArrowRight className="size-4" />
                </TrialButton>
              }
            />
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <PriceCard
              featured
              icon={<Sparkles className="size-6" />}
              badge={regularCard.badge}
              name={regularCard.name}
              subtitle={regularCard.subtitle}
              price={regularCard.price}
              priceNote={regularCard.priceNote}
              features={regularCard.features}
              cta={
                <TrialButton className={button("primary", "md", "w-full")}>
                  {regularCard.cta} <ArrowRight className="size-4" />
                </TrialButton>
              }
            />
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <PriceCard
              gold
              icon={<Crown className="size-6" />}
              badge={mentorshipCard.badge}
              name={mentorshipCard.name}
              price={mentorshipCard.price}
              priceNote={mentorshipCard.priceNote}
              features={mentorshipCard.features}
              cta={
                <a
                  href={whatsappLink(mentorshipCard.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={button(
                    "secondary",
                    "md",
                    "w-full border-amber-500/40! text-amber-100 hover:border-amber-400/70!",
                  )}
                >
                  <WhatsAppIcon className="size-4" /> {mentorshipCard.cta}
                </a>
              }
            />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-sun-400/30 bg-sun-400/5 p-5 text-center sm:flex-row sm:text-left">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-stone-200 sm:items-center">
              <Settings2 className="mt-0.5 size-5 shrink-0 text-sun-300 sm:mt-0" />
              {customTiming.text}
            </p>
            <a
              href={whatsappLink(customTiming.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={button("whatsapp", "sm", "shrink-0")}
            >
              <WhatsAppIcon className="size-4" /> {customTiming.cta}
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <ol className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-3 sm:p-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ember-500/15 font-bold text-ember-300 ring-1 ring-ember-500/40">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-stone-400">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-8 text-center">
          <p className="text-xs text-stone-400">
            <span className="font-semibold text-stone-300">Trial Policy: </span>
            {settings.trialTerms}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

type PriceCardProps = {
  icon: ReactNode;
  badge: string;
  name: string;
  subtitle?: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: ReactNode;
  featured?: boolean;
  gold?: boolean;
};

function PriceCard({ icon, badge, name, subtitle, price, priceNote, features, cta, featured, gold }: PriceCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1",
        featured
          ? "bg-linear-to-b from-ember-500/15 to-stone-900/80 shadow-[0_30px_80px_-30px_rgb(234_138_42/0.5)] ring-1 ring-ember-500/50 backdrop-blur-xl"
          : gold
            ? "glass hover:border-amber-500/50!"
            : "glass hover:border-ember-500/50!",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl ring-1",
            gold ? "bg-amber-500/10 text-amber-300 ring-amber-500/30" : "bg-ember-500/10 text-ember-300 ring-ember-500/30",
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
            featured
              ? "bg-linear-to-r from-ember-400 to-sun-400 text-obsidian-950"
              : gold
                ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                : "bg-stone-800 text-stone-300",
          )}
        >
          {badge}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">{name}</h3>
      {subtitle && <p className="text-sm text-stone-400">{subtitle}</p>}

      <p className="mt-5 flex items-baseline gap-2">
        <span className={cn("text-5xl font-extrabold tracking-tight", gold ? "text-amber-300" : "text-white")}>
          {price}
        </span>
      </p>
      <p className="mt-1 text-sm text-stone-400">{priceNote}</p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-stone-800 pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-stone-300">
            <Check className={cn("mt-0.5 size-4 shrink-0", gold ? "text-amber-400" : "text-ember-400")} />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8">{cta}</div>
    </div>
  );
}
