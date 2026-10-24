import type { Metadata } from "next";
import { ThemeLabClient } from "./ThemeLabClient";

export const metadata: Metadata = {
  title: "Mani\u00A0Sir Theme Lab | 8 Logo-Matched Light Themes | LIFE Spoken English",
  description:
    "Interactive showcase preview for Mani Sir to evaluate 8 distinct light design presets on mobile and desktop.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThemeLabPage() {
  return <ThemeLabClient />;
}
