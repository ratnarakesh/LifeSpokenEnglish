import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Questions & Answers"
          title={
            <>
              Everything you asked, <GradientText>answered.</GradientText>
            </>
          }
          description="Quick answers about the free trial, who LIFE is for, timings, and missed classes."
        />

        <Reveal className="mt-12 grid gap-3">
          {FAQS.map(({ question, answer }, i) => (
            <details
              key={question}
              open={i === 0}
              className="group glass rounded-2xl p-5 open:ring-1 open:ring-ember-500/30 sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-white sm:text-lg">{question}</h3>
                <ChevronDown
                  className="size-5 shrink-0 text-ember-400 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 sm:text-base">{answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
