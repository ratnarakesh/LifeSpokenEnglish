import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { BrandStory } from "@/components/sections/BrandStory";
import { Contact } from "@/components/sections/Contact";
import { Courses } from "@/components/sections/Courses";
import { Enrollment } from "@/components/sections/Enrollment";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Promises } from "@/components/sections/Promises";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { WhyLife } from "@/components/sections/WhyLife";

export default function Home() {
  return (
    <Providers>
      <JsonLd />
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
        <main id="main">
          <Hero />
          <BrandStory />
          <WhyLife />
          <Courses />
          <Promises />
          <Pricing />
          <VideoShowcase />
          <Enrollment />
          <Contact />
        </main>
        <Footer />
      </div>
      <MobileActionBar />
    </Providers>
  );
}
