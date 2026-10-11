import { ArrowRight, Check, Crown, Gift, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { TrialButton } from "@/components/modals/ModalTriggers";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { button, cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

const MENTORSHIP_MESSAGE =
  "Hello Mani Sir, I am interested in 1-on-1 Personal Mentorship at LIFE Spoken English. Please share the available time slots.";

const STEPS = [
  { title: "Register on WhatsApp", description: "Share your name and preferred mode. Takes 30 seconds." },
  { title: "Attend 10 live classes", description: "Experience the full LIFE method, completely free." },
  { title: "Continue monthly", description: "Happy? Pay month-to-month. Not satisfied? Walk away, no questions." },
] as const;

export function Pricing() {
  return (
    <section id="fees" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fees & Trial Policy"
          title={
            <>
              Total transparency. <GradientText>Zero pressure.</GradientText>
            </>
          }
          description="Student-friendly fees, just like school tuition. Try everything first, then pay month by month."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <PriceCard
              icon={<Gift className="size-6" />}
              badge="Start Here"
              name="10-Class Free Trial"
              price="₹0"
              priceNote="Completely Free"
              features={[
                "10 full live sessions",
                "No advance payment",
                "Zero card details or commitment",
                "Drop out anytime if not satisfied",
              ]}
              cta={
                <TrialButton className={button("secondary", "md", "w-full")}>
                  Claim Free Trial <ArrowRight className="size-4" />
                </TrialButton>
              }
            />
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <PriceCard
              featured
              icon={<Sparkles className="size-6" />}
              badge="Most Popular"
              name="Regular Batch"
              subtitle="Offline or Online"
              price="₹3,000"
              priceNote="1st month → ₹2,000 / month thereafter"
              features={[
                "Monday to Friday · 5 days / week",
                "Prime evening slots (e.g. 8:00 – 9:30 PM)",
                "Free weekend backup sessions",
                "Study materials included",
                "Live doubt clearance",
              ]}
              cta={
                <TrialButton className={button("primary", "md", "w-full")}>
                  Start with 10 Free Classes <ArrowRight className="size-4" />
                </TrialButton>
              }
            />
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <PriceCard
              gold
              icon={<Crown className="size-6" />}
              badge="Premium"
              name="1-on-1 Personal Mentorship"
              price="₹10,000"
              priceNote="per month"
              features={[
                "Dedicated solo training with Mani Sir",
                "Flexible timing slots",
                "Personalised curriculum",
                "Tailored to your career goals",
              ]}
              cta={
                <a
                  href={whatsappLink(MENTORSHIP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={button(
                    "secondary",
                    "md",
                    "w-full border-amber-500/40! text-amber-100 hover:border-amber-400/70!",
                  )}
                >
                  <WhatsAppIcon className="size-4" /> Enquire on WhatsApp
                </a>
              }
            />
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <ol className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-3 sm:p-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500/15 font-bold text-emerald-300 ring-1 ring-emerald-500/40">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
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
          ? "bg-linear-to-b from-emerald-500/15 to-slate-900/80 shadow-[0_30px_80px_-30px_rgb(16_185_129/0.5)] ring-1 ring-emerald-500/50 backdrop-blur-xl"
          : gold
            ? "glass hover:border-amber-500/50!"
            : "glass hover:border-emerald-500/50!",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl ring-1",
            gold ? "bg-amber-500/10 text-amber-300 ring-amber-500/30" : "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
            featured
              ? "bg-linear-to-r from-emerald-400 to-cyan-400 text-obsidian-950"
              : gold
                ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                : "bg-slate-800 text-slate-300",
          )}
        >
          {badge}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">{name}</h3>
      {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}

      <p className="mt-5 flex items-baseline gap-2">
        <span className={cn("text-5xl font-extrabold tracking-tight", gold ? "text-amber-300" : "text-white")}>
          {price}
        </span>
      </p>
      <p className="mt-1 text-sm text-slate-400">{priceNote}</p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-slate-800 pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
            <Check className={cn("mt-0.5 size-4 shrink-0", gold ? "text-amber-400" : "text-emerald-400")} />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8">{cta}</div>
    </div>
  );
}
