"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { brandCopy, contactCopy } from "@/lib/site-copy";
import { ADDRESS, EMAIL, FOOTER_LINKS, LINKS, PHONES, SITE, TIMINGS, mailtoLink, telLink } from "@/lib/site";
import { FullLogo } from "./Brand";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/theme-lab")) return null;

  return (
    <footer className="relative border-t border-stone-800/80 bg-obsidian-950 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" aria-label={`${SITE.brand}, home`} className="inline-block">
            <FullLogo className="h-auto w-28 sm:w-32" />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-400">
            {brandCopy.summary}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube channel"
              className="grid size-10 place-items-center rounded-xl text-stone-300 ring-1 ring-stone-800 transition hover:text-[#FF0033] hover:ring-stone-600"
            >
              <YouTubeIcon className="size-5" />
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="grid size-10 place-items-center rounded-xl text-stone-300 ring-1 ring-stone-800 transition hover:text-pink-400 hover:ring-stone-600"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">{brandCopy.footer.exploreHeading}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-stone-400 transition hover:text-ember-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">{brandCopy.footer.contactHeading}</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-400">
            <li>
              <span className="block text-xs text-stone-500">{contactCopy.phoneLabel}</span>
              <a href={telLink(PHONES.primary.e164)} className="font-medium text-stone-200 hover:text-ember-300">
                {PHONES.primary.display}
              </a>
            </li>
            <li>
              <span className="block text-xs text-stone-500">Email</span>
              <a href={mailtoLink()} className="font-medium break-all text-stone-200 hover:text-ember-300">
                {EMAIL}
              </a>
            </li>
            <li>
              <span className="block text-xs text-stone-500">{TIMINGS.weekdays}</span>
              <span className="font-medium text-stone-200">{TIMINGS.weekdayDetail}</span>
            </li>
            <li>
              {ADDRESS.locality}, {ADDRESS.city} - {ADDRESS.postalCode}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-stone-500 sm:px-6 md:flex-row md:text-left lg:px-8">
          <p>{brandCopy.footer.copyright}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-stone-400">
              <ShieldCheck className="size-3.5 text-ember-400" /> {brandCopy.footer.cookiesGuarantee}
            </span>
            <Link href="/privacy" className="hover:text-ember-300">
              {brandCopy.footer.privacyLabel}
            </Link>
            <Link href="/terms" className="hover:text-ember-300">
              {brandCopy.footer.termsLabel}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
