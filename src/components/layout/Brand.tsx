import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function Brand() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5 sm:gap-3" aria-label={`${SITE.brand}, home`}>
      <Image
        src="/brand/life-emblem.png"
        alt=""
        width={256}
        height={256}
        priority
        className="size-11 shrink-0 drop-shadow-[0_0_14px_rgb(234_138_42/0.45)] transition duration-300 group-hover:scale-105 sm:size-12"
      />
      <span className="leading-tight whitespace-nowrap">
        <span className="block font-serif text-xl font-black tracking-[0.18em] text-white">{SITE.brand}</span>
        <span className="block text-[10px] font-medium text-stone-400 sm:text-[11px]">{SITE.tagline}</span>
      </span>
    </Link>
  );
}

export function FullLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/life-logo.png"
      alt={`${SITE.brand}: Live It For Eternity logo`}
      width={520}
      height={537}
      priority={priority}
      sizes="(min-width: 1024px) 224px, 176px"
      className={className}
    />
  );
}
