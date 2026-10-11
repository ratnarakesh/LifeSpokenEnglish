import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-ember-300 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-stone-400 sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-linear-to-r from-ember-400 via-sun-300 to-sun-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
