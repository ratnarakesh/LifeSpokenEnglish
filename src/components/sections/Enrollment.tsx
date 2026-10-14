import { CheckCircle2, Users } from "lucide-react";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { BATCH_POLICY } from "@/lib/content";

const BENEFITS = [
  "10 full live classes, absolutely free",
  "Classroom in Madhurawada or Live Online",
  "No upfront payment, no lock-in",
  "Direct reply from Mani\u00A0Sir on WhatsApp",
  `${BATCH_POLICY.booklet.title} for every enrolled learner`,
  BATCH_POLICY.eligibility,
] as const;

export function Enrollment() {
  return (
    <section id="enroll" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Instant Booking"
            title={
              <>
                Book your seat in <GradientText>under a minute.</GradientText>
              </>
            }
            description="Fill in your details and we'll open WhatsApp with a ready-to-send message to Mani&nbsp;Sir. Just tap send."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-stone-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ember-400" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 rounded-2xl border border-ember-500/40 bg-ember-500/10 p-4 text-sm leading-relaxed text-ember-50">
              <Users className="mt-0.5 size-5 shrink-0 text-ember-300" />
              <span>
                <strong className="text-white">Limited seats: </strong>
                {BATCH_POLICY.capacity}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-ember-500/25 via-sun-500/10 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white">Register for 10 Free Classes</h3>
              <p className="mt-1 mb-6 text-sm text-stone-400">New batches starting soon. Only {BATCH_POLICY.capacityShort}.</p>
              <EnrollmentForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
