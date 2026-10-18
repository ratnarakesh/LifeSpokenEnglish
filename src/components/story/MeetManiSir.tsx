import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { TrialButton } from "@/components/modals/ModalTriggers";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { getFounderProfile } from "@/lib/cms";
import { aboutPageCopy, founderCopy } from "@/lib/site-copy";

export function MeetManiSir() {
  const founder = getFounderProfile();
  return (
    <section id="mani-sir" aria-labelledby="about-title" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-5">
          <figure className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-ember-500/35 via-sun-500/15 to-transparent blur-3xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-ember-500/40">
              <Image
                src={founder.portraitSrc}
                alt={founder.altText}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/85 via-transparent to-transparent" />
            </div>
            <figcaption className="glass absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl px-5 py-4 text-center shadow-2xl shadow-black/50">
              <span className="block text-lg font-bold text-white">{founder.name}</span>
              <span className="block text-sm text-ember-300">{founder.title}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-xs font-medium text-stone-500">
              <Link href="/" className="hover:text-ember-300">
                Home
              </Link>{" "}
              / <span className="text-stone-300">{aboutPageCopy.breadcrumb}</span>
            </nav>
            <h1
              id="about-title"
              className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              {aboutPageCopy.headlineLead} <GradientText>{founderCopy.alias}</GradientText>, the heart of LIFE
            </h1>
            <p className="mt-6 text-xl leading-relaxed font-semibold text-pretty text-stone-100 sm:text-2xl">
              {founderCopy.lede}
            </p>
            <div className="mt-5 space-y-4 leading-relaxed text-pretty text-stone-300 sm:text-lg">
              {founderCopy.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 text-sm font-semibold tracking-wider text-ember-300 uppercase">
              {aboutPageCopy.classroomHeading}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {founderCopy.teachingMethodology.classroomRules.map((rule) => (
                <li key={rule.title} className="glass flex gap-3 rounded-2xl p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ember-400" />
                  <span>
                    <span className="block font-semibold text-white">{rule.title}</span>
                    <span className="mt-0.5 block text-sm text-stone-400">{rule.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrialButton className={button("primary", "lg", "w-full sm:w-auto")}>
              {aboutPageCopy.ctaLearn} <ArrowRight className="size-5" />
            </TrialButton>
            <Link href="/gallery" className={button("secondary", "lg", "w-full sm:w-auto")}>
              <PlayCircle className="size-5 text-ember-400" /> {aboutPageCopy.ctaWatch}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
