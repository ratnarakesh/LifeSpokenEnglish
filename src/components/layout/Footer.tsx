import { InstagramIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { ADDRESS, LINKS, NAV_LINKS, PHONES, SITE, telLink } from "@/lib/site";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-obsidian-950 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Brand />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Practical, live Spoken English & Soft Skills training in {ADDRESS.locality},{" "}
            {ADDRESS.city}, led personally by {SITE.founderAlias} ({SITE.founder}). Offline classroom
            and Live Online batches.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube channel"
              className="grid size-10 place-items-center rounded-xl text-slate-300 ring-1 ring-slate-800 transition hover:text-[#FF0033] hover:ring-slate-600"
            >
              <YouTubeIcon className="size-5" />
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="grid size-10 place-items-center rounded-xl text-slate-300 ring-1 ring-slate-800 transition hover:text-pink-400 hover:ring-slate-600"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-slate-400 transition hover:text-emerald-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>
              <span className="block text-xs text-slate-500">Offline & Mani Sir Direct</span>
              <a href={telLink(PHONES.primary.e164)} className="font-medium text-slate-200 hover:text-emerald-300">
                {PHONES.primary.display}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-500">Online Batches Desk</span>
              <a href={telLink(PHONES.online.e164)} className="font-medium text-slate-200 hover:text-emerald-300">
                {PHONES.online.display}
              </a>
            </li>
            <li>
              {ADDRESS.locality}, {ADDRESS.city} – {ADDRESS.postalCode}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800/80">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
