import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrialButton } from "@/components/modals/ModalTriggers";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { storyCopy } from "@/lib/site-copy";
import { whatsappLink } from "@/lib/site";

export function StoryFinale() {
  return (
    <section aria-label="Begin your journey" className="relative px-4 pt-8 pb-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-ember-600/30 via-bark-800/60 to-obsidian-900 p-8 text-center ring-1 ring-ember-500/40 sm:p-14">
          <Image
            src="/brand/life-emblem.webp"
            alt=""
            width={256}
            height={256}
            className="pointer-events-none absolute -bottom-16 -left-12 size-64 opacity-15"
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-sun-400/30 blur-3xl"
            aria-hidden="true"
          />
          <p className="relative text-2xl font-bold text-stone-200 sm:text-3xl">{storyCopy.finale.lead}</p>
          <p className="relative mt-2 text-3xl leading-tight font-extrabold text-balance sm:text-5xl">
            <GradientText>{storyCopy.finale.tail}</GradientText>
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrialButton className={button("primary", "lg", "w-full sm:w-auto")}>
              {storyCopy.finale.ctaTrial} <ArrowRight className="size-5" />
            </TrialButton>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={button("whatsapp", "lg", "w-full sm:w-auto")}
            >
              <WhatsAppIcon className="size-5" /> {storyCopy.finale.ctaTalk}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
