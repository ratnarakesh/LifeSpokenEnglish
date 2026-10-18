import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LogoStory } from "@/components/story/LogoStory";
import { MeetManiSir } from "@/components/story/MeetManiSir";
import { StoryFinale } from "@/components/story/StoryFinale";
import { StoryJourney } from "@/components/story/StoryJourney";
import { StoryMeaning } from "@/components/story/StoryMeaning";
import { StoryReel } from "@/components/story/StoryReel";

import { aboutPageCopy } from "@/lib/site-copy";

export const metadata: Metadata = pageMetadata({
  title: aboutPageCopy.title,
  description: aboutPageCopy.description,
  path: "/about",
});

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
