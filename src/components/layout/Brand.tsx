import { SITE } from "@/lib/site";

export function Brand() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label={`${SITE.brand} – back to top`}>
      <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-emerald-400 to-cyan-500 text-lg font-black text-obsidian-950 shadow-[0_0_30px_-5px_rgb(16_185_129/0.7)] transition group-hover:rotate-[-6deg]">
        L
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-[0.2em] text-white">{SITE.brand}</span>
        <span className="block text-[11px] font-medium text-slate-400">{SITE.tagline}</span>
      </span>
    </a>
  );
}
