import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections/Contact";
import { Courses } from "@/components/sections/Courses";
import { Enrollment } from "@/components/sections/Enrollment";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Promises } from "@/components/sections/Promises";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { WhyLife } from "@/components/sections/WhyLife";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  ...(SITE.url && { alternates: { canonical: "/" } }),
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <StoryTeaser />
      <WhyLife />
      <Courses />
      <Promises />
      <Pricing />
      <VideoShowcase />
      <Enrollment />
      <Contact />
    </>
  );
}
