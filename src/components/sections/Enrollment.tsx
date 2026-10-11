import { CheckCircle2 } from "lucide-react";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";

const BENEFITS = [
  "10 full live classes, absolutely free",
  "Classroom in Madhurawada or Live Online",
  "No upfront payment, no lock-in",
  "Direct reply from Mani Sir on WhatsApp",
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
            description="Fill in your details and we'll open WhatsApp with a ready-to-send message to Mani Sir. Just tap send."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-emerald-500/25 via-cyan-500/10 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white">Register for 10 Free Classes</h3>
              <p className="mt-1 mb-6 text-sm text-slate-400">New batches starting soon. Limited seats per batch.</p>
              <EnrollmentForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
