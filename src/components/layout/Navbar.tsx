"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { button, cn } from "@/lib/cn";
import { NAV_LINKS, PHONES, telLink, whatsappLink } from "@/lib/site";
import { Brand } from "./Brand";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 120) setActiveId(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-stone-800/80 bg-obsidian-950/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-18 max-w-[96rem] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Brand />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative isolate block rounded-full px-2.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors 2xl:px-3.5 2xl:text-sm",
                  activeId === link.href ? "text-white" : "text-stone-400 hover:text-white",
                )}
              >
                {activeId === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-stone-800/80 ring-1 ring-stone-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex xl:ml-0">
          <a
            href={telLink()}
            aria-label={`Call ${PHONES.primary.display}`}
            title={`Call ${PHONES.primary.display}`}
            className={button("secondary", "sm", "whitespace-nowrap xl:size-10 xl:px-0 2xl:size-auto 2xl:px-4")}
          >
            <Phone className="size-4 shrink-0 text-ember-400" />
            <span className="xl:hidden 2xl:inline">Call: {PHONES.primary.display}</span>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={button("whatsapp", "sm", "whitespace-nowrap")}
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span className="xl:hidden 2xl:inline">Chat on WhatsApp</span>
            <span className="hidden xl:inline 2xl:hidden">WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid size-11 shrink-0 place-items-center rounded-xl text-stone-200 ring-1 ring-stone-800 transition hover:bg-stone-800/60 xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-stone-800/80 xl:hidden"
          >
            <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-stone-200 transition hover:bg-stone-800/60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 grid gap-2 sm:grid-cols-2 lg:hidden">
                <a href={telLink()} className={button("secondary", "md")}>
                  <Phone className="size-4 text-ember-400" /> Call: {PHONES.primary.display}
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={button("whatsapp", "md")}>
                  <WhatsAppIcon className="size-4" /> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
