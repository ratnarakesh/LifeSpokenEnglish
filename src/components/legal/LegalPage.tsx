import Link from "next/link";
import type { ReactNode } from "react";

export const LEGAL_UPDATED = "11 October 2026";

type LegalPageProps = {
  title: string;
  intro: ReactNode;
  breadcrumb: string;
  lastUpdated?: string;
  children: ReactNode;
};

export function LegalPage({ title, intro, breadcrumb, lastUpdated, children }: LegalPageProps) {
  return (
    <section aria-labelledby="legal-title" className="relative pt-10 pb-24 sm:pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs font-medium text-stone-500">
          <Link href="/" className="hover:text-ember-300">
            Home
          </Link>{" "}
          / <span className="text-stone-300">{breadcrumb}</span>
        </nav>
        <h1 id="legal-title" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-stone-500">Last updated: {lastUpdated || LEGAL_UPDATED}</p>
        <div className="mt-6 text-base leading-relaxed text-pretty text-stone-300 sm:text-lg">{intro}</div>
        <div className="legal-prose mt-10 space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="scroll-mt-28">
      <h2 id={id ? `${id}-title` : undefined} className="text-xl font-bold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-stone-300 [&_a]:text-ember-300 [&_a]:underline [&_a:hover]:text-ember-200 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-white [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
