import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Camera } from "lucide-react";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/SectionHeading";
import { getGalleryPhotos } from "@/lib/cms";
import { button } from "@/lib/cn";
import { LINKS, whatsappLink } from "@/lib/site";
import { galleryCopy } from "@/lib/site-copy";

export const metadata: Metadata = pageMetadata({
  title: galleryCopy.metaTitle,
  description: galleryCopy.metaDescription,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section aria-labelledby="gallery-title" className="relative pt-10 pb-20 sm:pt-16 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="text-xs font-medium text-stone-500">
              <Link href="/" className="hover:text-ember-300">
                Home
              </Link>{" "}
              / <span className="text-stone-300">{galleryCopy.breadcrumb}</span>
            </nav>
            <h1
              id="gallery-title"
              className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              {galleryCopy.titleLead} <GradientText>{galleryCopy.titleGradient}</GradientText>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-pretty text-stone-400 sm:text-lg">
              {galleryCopy.description}
            </p>
          </Reveal>
          <div className="mt-12">
            <GalleryGrid photos={getGalleryPhotos()} />
          </div>
        </div>
      </section>

      <section aria-labelledby="share-title" className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-ember-600/30 via-bark-800/60 to-obsidian-900 p-8 ring-1 ring-ember-500/40 lg:col-span-2">
            <Camera className="size-9 text-sun-300" />
            <h2 id="share-title" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {galleryCopy.shareSection.title}
            </h2>
            <p className="mt-2 max-w-xl text-stone-300">
              {galleryCopy.shareSection.description}
            </p>
            <a
              href={whatsappLink(galleryCopy.shareSection.message)}
              target="_blank"
              rel="noopener noreferrer"
              className={button("whatsapp", "md", "mt-6")}
            >
              <WhatsAppIcon className="size-4" /> {galleryCopy.shareSection.cta}
            </a>
          </div>
          <div className="grid gap-4">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-red-500/50"
            >
              <YouTubeIcon className="size-8 text-[#FF0033]" />
              <span>
                <span className="block text-sm text-stone-400">{galleryCopy.socials.youtubeTitle}</span>
                <span className="block font-semibold text-white">{galleryCopy.socials.youtubeHandle}</span>
              </span>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-pink-500/50"
            >
              <InstagramIcon className="size-8 text-pink-400" />
              <span>
                <span className="block text-sm text-stone-400">{galleryCopy.socials.instagramTitle}</span>
                <span className="block font-semibold text-white">{galleryCopy.socials.instagramHandle}</span>
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
