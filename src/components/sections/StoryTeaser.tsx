import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bird, PlayCircle } from "lucide-react";
import { AcronymCards } from "@/components/story/StoryMeaning";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { MANI_SIR, STORY } from "@/lib/content";

export function StoryTeaser() {
  return (
    <section id="story" aria-labelledby="teaser-title" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-5">
          <Link
            href="/about"
            className="group relative mx-auto block max-w-sm overflow-hidden rounded-[2rem] ring-1 ring-ember-500/40 lg:max-w-none"
            aria-label="Read Mani Sir's story"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/media/people/mani-sir-portrait.webp"
                alt={`${MANI_SIR.alias} in the LIFE classroom`}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <span className="absolute inset-0 bg-linear-to-t from-obsidian-950/90 via-transparent to-transparent" />
            <span className="absolute inset-x-5 bottom-5">
              <span className="block text-lg font-bold text-white">{MANI_SIR.name}</span>
              <span className="block text-sm text-ember-300">{MANI_SIR.role}</span>
            </span>
          </Link>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-ember-300 uppercase">
              Our Story
            </p>
            <h2
              id="teaser-title"
              className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              Meet Mani&nbsp;Sir and the meaning of <GradientText>LIFE</GradientText>
            </h2>
            <p className="mt-5 text-lg leading-relaxed font-medium text-pretty text-stone-100 sm:text-xl">{MANI_SIR.lede}</p>
            <p className="mt-3 leading-relaxed text-pretty text-stone-400 sm:text-lg">{STORY.promise}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <AcronymCards size="sm" />
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/about" className={button("primary", "md", "w-full sm:w-auto")}>
              Read Our Journey <ArrowRight className="size-4" />
            </Link>
            <Link href="/about#logo-story" className={button("secondary", "md", "w-full sm:w-auto")}>
              <Bird className="size-4 text-sun-300" /> The Story Inside Our Logo
            </Link>
            <Link href="/gallery" className={button("secondary", "md", "w-full sm:w-auto")}>
              <PlayCircle className="size-4 text-ember-400" /> Gallery
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
