import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LogoStory } from "@/components/story/LogoStory";
import { MeetManiSir } from "@/components/story/MeetManiSir";
import { StoryFinale } from "@/components/story/StoryFinale";
import { StoryJourney } from "@/components/story/StoryJourney";
import { StoryMeaning } from "@/components/story/StoryMeaning";
import { StoryReel } from "@/components/story/StoryReel";

const description =
  "Meet Mani Sir (K. Maneendra Kumar), founder of LIFE Spoken English & Soft Skills Institute in Madhurawada, Visakhapatnam. Discover the meaning of LIFE: Live It For Eternity, the story inside our logo, and our journey since 2018.";

export const metadata: Metadata = pageMetadata({ title: "About LIFE & Mani Sir: Our Story Since 2018", description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <MeetManiSir />
      <StoryMeaning />
      <LogoStory />
      <StoryJourney />
      <StoryReel />
      <StoryFinale />
    </>
  );
}
