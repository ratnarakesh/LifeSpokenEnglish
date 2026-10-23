import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LogoStory } from "@/components/story/LogoStory";
import { MeetManiSir } from "@/components/story/MeetManiSir";
import { StoryFinale } from "@/components/story/StoryFinale";
import { StoryJourney } from "@/components/story/StoryJourney";
import { StoryMeaning } from "@/components/story/StoryMeaning";
import { StoryReel } from "@/components/story/StoryReel";
import { getFounderProfile } from "@/lib/cms";
import { aboutPageCopy } from "@/lib/site-copy";

export function generateMetadata(): Metadata {
  const founder = getFounderProfile();
  return pageMetadata({
    title: aboutPageCopy.title,
    description: founder.bio || aboutPageCopy.description,
    path: "/about",
  });
}

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
