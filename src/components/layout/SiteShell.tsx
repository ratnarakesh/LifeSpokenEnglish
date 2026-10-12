import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { MobileActionBar } from "./MobileActionBar";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ember-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-obsidian-950"
      >
        Skip to content
      </a>
      <div className="relative isolate overflow-x-clip">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60rem] bg-mesh" aria-hidden="true" />
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </div>
      <MobileActionBar />
    </Providers>
  );
}
