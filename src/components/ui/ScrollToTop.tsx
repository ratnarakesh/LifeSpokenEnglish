"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/theme-lab")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={cn(
        "group fixed right-5 bottom-20 z-40 grid size-11 place-items-center rounded-full glass shadow-xl transition-all duration-300 md:right-8 md:bottom-8 print:hidden",
        "border border-stone-700/60 text-stone-200 hover:border-ember-500/80 hover:text-ember-400 hover:shadow-ember-500/20 active:scale-95",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
          : "pointer-events-none translate-y-4 opacity-0 scale-75",
      )}
    >
      <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
