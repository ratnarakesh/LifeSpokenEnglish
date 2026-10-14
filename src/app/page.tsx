import type { Metadata } from "next";
import { FaqJsonLd, JsonLd } from "@/components/JsonLd";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { Contact } from "@/components/sections/Contact";
import { Courses } from "@/components/sections/Courses";
import { Enrollment } from "@/components/sections/Enrollment";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Promises } from "@/components/sections/Promises";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { WhyLife } from "@/components/sections/WhyLife";
import { getAnnouncement } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <FaqJsonLd />
      <AnnouncementBanner announcement={getAnnouncement()} />
      <Hero />
      <StoryTeaser />
      <WhyLife />
      <Courses />
      <Promises />
      <Pricing />
      <VideoShowcase />
      <Enrollment />
      <Faq />
      <Contact />
    </>
  );
}
