"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Layers,
  MapPin,
  MessageSquare,
  Mic,
  Monitor,
  Palette,
  Pause,
  Phone,
  Play,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE, telLink, whatsappLink } from "@/lib/site";

/* =========================================================================
   TYPES & PRESET DEFINITIONS
   ========================================================================= */
export type LayoutArchetype =
  | "vibrant-split"
  | "academic-editorial"
  | "corporate-bento"
  | "organic-transformation"
  | "quiet-luxury"
  | "glassmorphic-halo"
  | "cultural-heritage"
  | "vip-platinum"
  | "classic-centered"
  | "interactive-carousel"
  | "stage-vocal-glow"
  | "transformation-slider"
  | "deluxe-spotlight-bento";

export type TypographyStyle = "sans" | "serif" | "editorial";

export interface ColorPalette {
  id: string;
  name: string;
  category: string;
  bg: string;
  bgGradient?: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  brandGradient: string;
  primaryColor: string;
  primaryText: string;
  secondaryBtnBg: string;
  secondaryBtnText: string;
  secondaryBtnBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  highlightBorder: string;
  swatches: { name: string; hex: string }[];
}

export interface MasterPreset {
  id: number;
  name: string;
  tagline: string;
  category: "light" | "interactive" | "production";
  archetype: LayoutArchetype;
  typography: TypographyStyle;
  paletteId: string;
  psychology: string;
  designHighlights: string[];
}

/* --- 10 Color Palettes (Including Original Live Dark Mode & Light Mode) --- */
export const PALETTES: Record<string, ColorPalette> = {
  saffron: {
    id: "saffron",
    name: "Sunrise Saffron & Pearl",
    category: "Vibrant Energetic",
    bg: "#ffffff",
    cardBg: "#ffffff",
    cardBorder: "rgba(249, 115, 22, 0.18)",
    cardShadow: "0 14px 34px -6px rgba(249, 115, 22, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#64748b",
    brandGradient: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
    primaryColor: "#f97316",
    primaryText: "#ffffff",
    secondaryBtnBg: "#fff7ed",
    secondaryBtnText: "#c2410c",
    secondaryBtnBorder: "rgba(249, 115, 22, 0.3)",
    badgeBg: "rgba(249, 115, 22, 0.12)",
    badgeText: "#ea580c",
    badgeBorder: "rgba(249, 115, 22, 0.3)",
    highlightBorder: "rgba(249, 115, 22, 0.45)",
    swatches: [
      { name: "White", hex: "#ffffff" },
      { name: "Saffron", hex: "#f97316" },
      { name: "Sun Gold", hex: "#f59e0b" },
      { name: "Deep Ink", hex: "#0f172a" },
      { name: "Warm Peach", hex: "#fff7ed" },
    ],
  },
  oxford: {
    id: "oxford",
    name: "Oxford Ivory & Imperial Gold",
    category: "Royal Academic",
    bg: "#fdfbf7",
    cardBg: "#ffffff",
    cardBorder: "rgba(180, 83, 9, 0.25)",
    cardShadow: "0 12px 30px -4px rgba(180, 83, 9, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
    textPrimary: "#1e293b",
    textSecondary: "#475569",
    textMuted: "#64748b",
    brandGradient: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
    primaryColor: "#b45309",
    primaryText: "#ffffff",
    secondaryBtnBg: "#fef3c7",
    secondaryBtnText: "#78350f",
    secondaryBtnBorder: "rgba(180, 83, 9, 0.35)",
    badgeBg: "rgba(180, 83, 9, 0.08)",
    badgeText: "#92400e",
    badgeBorder: "rgba(180, 83, 9, 0.3)",
    highlightBorder: "rgba(180, 83, 9, 0.5)",
    swatches: [
      { name: "Ivory", hex: "#fdfbf7" },
      { name: "Antique Gold", hex: "#b45309" },
      { name: "Amber Ochre", hex: "#d97706" },
      { name: "Midnight Navy", hex: "#1e293b" },
      { name: "Linen", hex: "#fef3c7" },
    ],
  },
  navy: {
    id: "navy",
    name: "Royal Navy & Solar Amber",
    category: "Corporate Executive",
    bg: "#f8fafc",
    cardBg: "#ffffff",
    cardBorder: "rgba(30, 58, 138, 0.14)",
    cardShadow: "0 10px 25px -3px rgba(30, 58, 138, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    brandGradient: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)",
    primaryColor: "#eab308",
    primaryText: "#0f172a",
    secondaryBtnBg: "#eff6ff",
    secondaryBtnText: "#1e3a8a",
    secondaryBtnBorder: "rgba(30, 58, 138, 0.25)",
    badgeBg: "rgba(30, 58, 138, 0.08)",
    badgeText: "#1e3a8a",
    badgeBorder: "rgba(30, 58, 138, 0.2)",
    highlightBorder: "rgba(30, 58, 138, 0.35)",
    swatches: [
      { name: "Slate Ice", hex: "#f8fafc" },
      { name: "Oxford Navy", hex: "#1e3a8a" },
      { name: "Solar Amber", hex: "#eab308" },
      { name: "Deep Ink", hex: "#0f172a" },
      { name: "Sky Tint", hex: "#eff6ff" },
    ],
  },
  emerald: {
    id: "emerald",
    name: "Emerald Growth & Golden Sun",
    category: "Life & Transformation",
    bg: "#f6faf6",
    cardBg: "#ffffff",
    cardBorder: "rgba(5, 150, 105, 0.16)",
    cardShadow: "0 14px 32px -4px rgba(5, 150, 105, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.02)",
    textPrimary: "#064e3b",
    textSecondary: "#374151",
    textMuted: "#6b7280",
    brandGradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    primaryColor: "#059669",
    primaryText: "#ffffff",
    secondaryBtnBg: "#ecfdf5",
    secondaryBtnText: "#065f46",
    secondaryBtnBorder: "rgba(5, 150, 105, 0.25)",
    badgeBg: "rgba(5, 150, 105, 0.1)",
    badgeText: "#047857",
    badgeBorder: "rgba(5, 150, 105, 0.25)",
    highlightBorder: "rgba(5, 150, 105, 0.35)",
    swatches: [
      { name: "Mint Ivory", hex: "#f6faf6" },
      { name: "Growth Emerald", hex: "#059669" },
      { name: "Spring Leaf", hex: "#10b981" },
      { name: "Forest Ink", hex: "#064e3b" },
      { name: "Sage Light", hex: "#ecfdf5" },
    ],
  },
  sandstone: {
    id: "sandstone",
    name: "Champagne & Sandstone Minimal",
    category: "Quiet Luxury / Modern",
    bg: "#faf9f6",
    cardBg: "#ffffff",
    cardBorder: "rgba(161, 98, 7, 0.2)",
    cardShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03)",
    textPrimary: "#1c1917",
    textSecondary: "#44403c",
    textMuted: "#78716c",
    brandGradient: "linear-gradient(135deg, #a16207 0%, #ca8a04 100%)",
    primaryColor: "#1c1917",
    primaryText: "#faf9f6",
    secondaryBtnBg: "#ffffff",
    secondaryBtnText: "#1c1917",
    secondaryBtnBorder: "#a16207",
    badgeBg: "rgba(161, 98, 7, 0.08)",
    badgeText: "#854d0e",
    badgeBorder: "rgba(161, 98, 7, 0.25)",
    highlightBorder: "rgba(161, 98, 7, 0.4)",
    swatches: [
      { name: "Sandstone", hex: "#faf9f6" },
      { name: "Champagne Brass", hex: "#a16207" },
      { name: "Warm Gold", hex: "#ca8a04" },
      { name: "Obsidian Ink", hex: "#1c1917" },
      { name: "Warm Taupe", hex: "#78716c" },
    ],
  },
  halo: {
    id: "halo",
    name: "Electric Amber & Frosted Halo",
    category: "High-Tech EdTech 2026",
    bg: "#fffbeb",
    bgGradient: "radial-gradient(ellipse at top, #fef3c7 0%, #fffbeb 50%, #fff7ed 100%)",
    cardBg: "rgba(255, 255, 255, 0.88)",
    cardBorder: "rgba(245, 158, 11, 0.35)",
    cardShadow: "0 20px 45px -8px rgba(245, 158, 11, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.04)",
    textPrimary: "#0b0f19",
    textSecondary: "#334155",
    textMuted: "#64748b",
    brandGradient: "linear-gradient(135deg, #ea580c 0%, #eab308 100%)",
    primaryColor: "#ea580c",
    primaryText: "#ffffff",
    secondaryBtnBg: "rgba(255, 255, 255, 0.95)",
    secondaryBtnText: "#c2410c",
    secondaryBtnBorder: "rgba(245, 158, 11, 0.4)",
    badgeBg: "rgba(245, 158, 11, 0.18)",
    badgeText: "#b45309",
    badgeBorder: "rgba(245, 158, 11, 0.4)",
    highlightBorder: "rgba(245, 158, 11, 0.6)",
    swatches: [
      { name: "Halo Mist", hex: "#fffbeb" },
      { name: "Electric Ember", hex: "#ea580c" },
      { name: "Solar Gold", hex: "#eab308" },
      { name: "Midnight Navy", hex: "#0b0f19" },
      { name: "Glass Pearl", hex: "#ffffff" },
    ],
  },
  terracotta: {
    id: "terracotta",
    name: "Warm Terracotta & Mustard",
    category: "Indian Cultural Warmth",
    bg: "#faf5ee",
    cardBg: "#fffdf9",
    cardBorder: "rgba(194, 65, 12, 0.22)",
    cardShadow: "0 12px 28px -4px rgba(194, 65, 12, 0.09), 0 4px 10px -2px rgba(0, 0, 0, 0.03)",
    textPrimary: "#26150f",
    textSecondary: "#4a332a",
    textMuted: "#7a5c50",
    brandGradient: "linear-gradient(135deg, #c2410c 0%, #d97706 100%)",
    primaryColor: "#c2410c",
    primaryText: "#ffffff",
    secondaryBtnBg: "#ffedd5",
    secondaryBtnText: "#9a3412",
    secondaryBtnBorder: "rgba(194, 65, 12, 0.3)",
    badgeBg: "rgba(194, 65, 12, 0.12)",
    badgeText: "#9a3412",
    badgeBorder: "rgba(194, 65, 12, 0.3)",
    highlightBorder: "rgba(194, 65, 12, 0.45)",
    swatches: [
      { name: "Khadi Cream", hex: "#faf5ee" },
      { name: "Terracotta", hex: "#c2410c" },
      { name: "Mustard Gold", hex: "#d97706" },
      { name: "Espresso Ink", hex: "#26150f" },
      { name: "Clay Tint", hex: "#ffedd5" },
    ],
  },
  platinum: {
    id: "platinum",
    name: "Executive Platinum & Gold Foil",
    category: "Elite Career Mastery",
    bg: "#fcfdfe",
    cardBg: "#ffffff",
    cardBorder: "rgba(161, 98, 7, 0.28)",
    cardShadow: "0 16px 40px -6px rgba(161, 98, 7, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
    textPrimary: "#030712",
    textSecondary: "#374151",
    textMuted: "#6b7280",
    brandGradient: "linear-gradient(135deg, #bf953f 0%, #b38728 50%, #aa771c 100%)",
    primaryColor: "#854d0e",
    primaryText: "#ffffff",
    secondaryBtnBg: "#fef9c3",
    secondaryBtnText: "#713f12",
    secondaryBtnBorder: "rgba(161, 98, 7, 0.35)",
    badgeBg: "rgba(161, 98, 7, 0.12)",
    badgeText: "#713f12",
    badgeBorder: "rgba(161, 98, 7, 0.35)",
    highlightBorder: "rgba(161, 98, 7, 0.55)",
    swatches: [
      { name: "Platinum Ice", hex: "#fcfdfe" },
      { name: "Gold Foil", hex: "#bf953f" },
      { name: "Deep Gold", hex: "#b38728" },
      { name: "Midnight Onyx", hex: "#030712" },
      { name: "Gold Shimmer", hex: "#fef9c3" },
    ],
  },
  obsidian: {
    id: "obsidian",
    name: "Midnight Obsidian (Live Dark Mode)",
    category: "Original Production",
    bg: "#0b0806",
    cardBg: "#120d0a",
    cardBorder: "rgba(245, 160, 74, 0.2)",
    cardShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
    textPrimary: "#ffffff",
    textSecondary: "#d6d3d1",
    textMuted: "#a8a29e",
    brandGradient: "linear-gradient(135deg, #ea8a2a 0%, #fbd83a 100%)",
    primaryColor: "#ea8a2a",
    primaryText: "#0b0806",
    secondaryBtnBg: "#1b1410",
    secondaryBtnText: "#fed5a4",
    secondaryBtnBorder: "rgba(245, 160, 74, 0.35)",
    badgeBg: "rgba(245, 160, 74, 0.15)",
    badgeText: "#fbbf7a",
    badgeBorder: "rgba(245, 160, 74, 0.35)",
    highlightBorder: "rgba(245, 160, 74, 0.5)",
    swatches: [
      { name: "Obsidian", hex: "#0b0806" },
      { name: "Deep Brown", hex: "#120d0a" },
      { name: "Ember Orange", hex: "#ea8a2a" },
      { name: "Sun Gold", hex: "#fbd83a" },
      { name: "Warm Cream", hex: "#ffffff" },
    ],
  },
};

/* --- 14 Curated Master Presets (Light, 3D Interactive, & Production) --- */
export const MASTER_PRESETS: MasterPreset[] = [
  {
    id: 1,
    name: "Sunrise Saffron",
    tagline: "Vibrant Modern Split - High Energy & Warmth",
    category: "light",
    archetype: "vibrant-split",
    typography: "sans",
    paletteId: "saffron",
    psychology:
      "Radiates enthusiasm and approachable warmth. Designed to instantly eliminate student intimidation with high-energy saffron gradients and friendly rounded architecture.",
    designHighlights: [
      "Modern 2-Column Split Hero with floating pill badges",
      "Dynamic orange to gold glowing mesh gradients",
      "Soft 24px rounded corners and friendly cards",
    ],
  },
  {
    id: 2,
    name: "Oxford Ivory",
    tagline: "Royal Academic Editorial - Ivy League Dignity",
    category: "light",
    archetype: "academic-editorial",
    typography: "serif",
    paletteId: "oxford",
    psychology:
      "Deep scholastic authority and university pedigree. Evokes Oxford and Harvard collegiate tradition with warm parchment tones, double gold borders, and timeless serif typography.",
    designHighlights: [
      "Prestigious Serif typography with roman numerals",
      "Parchment ivory background with double gold filigree borders",
      "Classic formal portrait frame with academic crests",
    ],
  },
  {
    id: 3,
    name: "Royal Navy & Solar Amber",
    tagline: "Corporate Executive Bento - Boardroom Authority",
    category: "light",
    archetype: "corporate-bento",
    typography: "sans",
    paletteId: "navy",
    psychology:
      "Fortune 500 corporate polish. Engineered for software engineers, MNC candidates, and managers who need sharp, boardroom-ready interview confidence.",
    designHighlights: [
      "Bento Grid architecture with crisp modular blocks",
      "Deep Oxford navy header bars and corporate blue accents",
      "High-contrast solar amber CTAs with executive data metrics",
    ],
  },
  {
    id: 4,
    name: "Emerald Growth",
    tagline: "Organic Transformation - Stress-Free Fluency",
    category: "light",
    archetype: "organic-transformation",
    typography: "sans",
    paletteId: "emerald",
    psychology:
      "Calm, psychological safety and personal renewal. Emphasizes patient mentorship, human encouragement, and stress-free progress for nervous learners.",
    designHighlights: [
      "Pillowy 32px rounded cards and circular trust bubbles",
      "Soft sage and mint-ivory canvas with growth emerald accents",
      "Gentle empathetic narrative layout with generous breathing room",
    ],
  },
  {
    id: 5,
    name: "Champagne Sandstone",
    tagline: "Quiet Luxury Minimalist - Scandinavian Restraint",
    category: "light",
    archetype: "quiet-luxury",
    typography: "editorial",
    paletteId: "sandstone",
    psychology:
      "Understated modern luxury. Replaces loud marketing with architectural white space, razor-thin champagne lines, and pure focus on articulate self-expression.",
    designHighlights: [
      "1px hairline champagne borders with zero heavy drop-shadows",
      "Architectural typography and vast spacious layout",
      "Monochrome museum-style presentation with brass accents",
    ],
  },
  {
    id: 6,
    name: "Glassmorphic 2026",
    tagline: "Next-Gen EdTech Halo - Translucent Glowing Depth",
    category: "light",
    archetype: "glassmorphic-halo",
    typography: "sans",
    paletteId: "halo",
    psychology:
      "Futuristic, high-tech educational platform. Frosted glass layers, radiant halo borders, and luminous depth convey cutting-edge 2026 pedagogy.",
    designHighlights: [
      "Frosted glass cards with backdrop-blur depth",
      "Radiant amber halo border illumination and neon glow tags",
      "Multi-layered ambient illumination behind cards",
    ],
  },
  {
    id: 7,
    name: "Warm Terracotta",
    tagline: "Telugu Heartland Heritage - Welcoming Mentorship",
    category: "light",
    archetype: "cultural-heritage",
    typography: "serif",
    paletteId: "terracotta",
    psychology:
      "Authentic cultural belonging and heartfelt local teacher connection. Cultivates deep comfort, familial warmth, and respectful mentorship for regional learners.",
    designHighlights: [
      "Traditional arched portrait framing and cultural motifs",
      "Warm earthen terracotta and mustard linen palette",
      "Welcoming community narrative with regional respect",
    ],
  },
  {
    id: 8,
    name: "VIP Platinum & Gold Foil",
    tagline: "C-Suite Finishing Academy - Supreme Prestige",
    category: "light",
    archetype: "vip-platinum",
    typography: "sans",
    paletteId: "platinum",
    psychology:
      "Ultra-luxurious finishing school aesthetic. Positioned as an elite executive academy for directors, high-profile travelers, and ambitious leaders seeking supreme distinction.",
    designHighlights: [
      "Metallic Gold Ribbon gradients and platinum sheen",
      "Black Onyx contrasting header bar with diamond-cut badge tags",
      "Executive VIP finishing academy styling and high-tier credibility",
    ],
  },
  {
    id: 9,
    name: "Classic Centered (Gold Re-Skin)",
    tagline: "The Traditional Centered Layout in Light Gold",
    category: "production",
    archetype: "classic-centered",
    typography: "sans",
    paletteId: "saffron",
    psychology:
      "The classic, trusted centered presentation of the home page, beautifully illuminated in a bright golden-amber palette.",
    designHighlights: [
      "Classic balanced centered hero with prominent 5-star rating",
      "3-column metric cards and balanced side-by-side promises",
      "Familiar layout with light-first educational clarity",
    ],
  },
  {
    id: 10,
    name: "Midnight Obsidian (Live Dark Mode)",
    tagline: "The Current Live Production Website Theme",
    category: "production",
    archetype: "classic-centered",
    typography: "sans",
    paletteId: "obsidian",
    psychology:
      "The official dark-mode baseline currently live on lifespokenenglish.com. Keep this accessible so Mani Sir can directly contrast light vs. dark.",
    designHighlights: [
      "Warm obsidian dark mode with glowing ember orange buttons",
      "High contrast dark surfaces with sun gold typography",
      "The official baseline for direct side-by-side comparison",
    ],
  },
  {
    id: 11,
    name: "Interactive 3D Stage Carousel",
    tagline: "Dynamic 4-Stage Fluency Journey with Interactive Cards",
    category: "interactive",
    archetype: "interactive-carousel",
    typography: "sans",
    paletteId: "saffron",
    psychology:
      "Interactive 4-stage hero journey. Walk Mani Sir through each phase from initial stage fright to microphone mastery with interactive slide progression and 3D card tilt.",
    designHighlights: [
      "Interactive 4-Stage Hero Carousel with stage tabs & autoplay pause",
      "3D perspective hover cards with elevation lighting",
      "Dynamic interactive stage progress indicator",
    ],
  },
  {
    id: 12,
    name: "Microphone Stage Vocal Glow",
    tagline: "Vocal Microphone Coaching with Real-Time Soundwave Visualizer",
    category: "interactive",
    archetype: "stage-vocal-glow",
    typography: "sans",
    paletteId: "halo",
    psychology:
      "Centers on Mani Sir's signature daily microphone drills. Animated CSS soundwaves and high-tech glow highlights prove that this academy teaches speaking out loud.",
    designHighlights: [
      "Real-time animated audio equalizer soundwave visualizer",
      "Interactive vocal drill toggle & live microphone stage badge",
      "Radiant amber glow cards with micro-hover illumination",
    ],
  },
  {
    id: 13,
    name: "Telugu-to-English Transformation Duel",
    tagline: "Interactive Before vs After Student Transformation Slider",
    category: "interactive",
    archetype: "transformation-slider",
    typography: "sans",
    paletteId: "emerald",
    psychology:
      "Tackles the core student anxiety: 'Can a Telugu-medium student really speak fluent English?' An interactive Before vs. After slider contrasts hesitation with fearless stage confidence.",
    designHighlights: [
      "Interactive Before/After Transformation Slider with drag & toggle",
      "Side-by-side contrast of Telugu hesitation vs. English stage fluency",
      "Psychological encouragement & judgment-free classroom pledge",
    ],
  },
  {
    id: 14,
    name: "Deluxe Modular Bento Matrix",
    tagline: "High-Tech Bento Grid with 3D Card Elevation & Spotlight Shimmer",
    category: "interactive",
    archetype: "deluxe-spotlight-bento",
    typography: "sans",
    paletteId: "navy",
    psychology:
      "Ultra-modern 2026 bento structure for tech professionals and students. Dynamic hover lift, live stats counters, and interactive video peek inspire instant authority.",
    designHighlights: [
      "Modular 4-tile bento layout with 3D card tilt & elevation on hover",
      "Direct video tour tile, verified metrics, and 10-day zero-risk pill",
      "Interactive curriculum preview drawer with responsive tabs",
    ],
  },
];

/* =========================================================================
   CAROUSEL DEMO DATA FOR INTERACTIVE TILE SHOWCASE
   ========================================================================= */
const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "10-Class Free Trial",
    subtitle: "Zero Advance Fee - Complete Risk-Free Experience",
    description:
      "Attend 10 full instructional classes before paying a single rupee. If you do not feel genuine vocal confidence, walk away with zero obligation.",
    icon: ShieldCheck,
    tag: "Non-Negotiable Promise",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    title: "Daily 1:1 Vocal Drills",
    subtitle: "Overcome Stage Fear on the Microphone",
    description:
      "Spoken English is acquired vocally, not silently on paper. Every student speaks on the microphone every single day in a caring, judgment-free space.",
    icon: Mic,
    tag: "Practical Learning",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Interview Mastery & GDs",
    subtitle: "HR Rounds, Technical Debates & Corporate English",
    description:
      "Master spontaneous self-introductions, body language, salary negotiations, and executive boardroom small talk tailored for MNC aspirants.",
    icon: BriefcaseIcon,
    tag: "Career Advancement",
    accent: "from-blue-600 to-indigo-600",
  },
  {
    id: 4,
    title: "Monthly Pay-As-You-Learn",
    subtitle: "Low-Stress Installments - Zero Loan Traps",
    description:
      "We never lock students into massive upfront loans or annual contracts. Low-stress monthly payments keep language learning accessible and honest.",
    icon: Layers,
    tag: "Student First Finance",
    accent: "from-purple-600 to-pink-600",
  },
];

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

/* =========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================= */
export function ThemeLabClient() {
  const [activePresetId, setActivePresetId] = useState<number>(1);
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>("saffron");
  const [selectedArchetype, setSelectedArchetype] = useState<LayoutArchetype>("vibrant-split");
  const [selectedTypography, setSelectedTypography] = useState<TypographyStyle>("sans");
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [customStudioOpen, setCustomStudioOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile" | "comparator">("desktop");
  const [comparatorPresetId, setComparatorPresetId] = useState<number>(10); // Defaults to Live Dark
  const [soundwavePlaying, setSoundwavePlaying] = useState<boolean>(true);
  const [transformationTab, setTransformationTab] = useState<"before" | "after" | "split">("split");

  // Sync state when master preset changes
  const applyPreset = (preset: MasterPreset) => {
    setActivePresetId(preset.id);
    setSelectedPaletteId(preset.paletteId);
    setSelectedArchetype(preset.archetype);
    setSelectedTypography(preset.typography);
  };

  const activePreset = MASTER_PRESETS.find((p) => p.id === activePresetId) || MASTER_PRESETS[0];
  const activePalette = PALETTES[selectedPaletteId] || PALETTES.saffron;
  const comparatorPreset = MASTER_PRESETS.find((p) => p.id === comparatorPresetId) || MASTER_PRESETS[9];
  const comparatorPalette = PALETTES[comparatorPreset.paletteId] || PALETTES.obsidian;

  // Auto-play feature carousel gently every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    const prevId = activePresetId === 1 ? MASTER_PRESETS.length : activePresetId - 1;
    const target = MASTER_PRESETS.find((p) => p.id === prevId);
    if (target) applyPreset(target);
  };

  const handleNext = () => {
    const nextId = activePresetId === MASTER_PRESETS.length ? 1 : activePresetId + 1;
    const target = MASTER_PRESETS.find((p) => p.id === nextId);
    if (target) applyPreset(target);
  };

  const whatsappVoteText = `Hi Rakesh, I reviewed the designs on the Theme Lab. My favorite choice is Preset #${activePreset.id} (${activePreset.name} with ${activePalette.name}). Let's go ahead with this one!`;
  const whatsappVoteUrl = `https://wa.me/917337412999?text=${encodeURIComponent(whatsappVoteText)}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(whatsappVoteText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch {
      // fallback
    }
  };

  // Font family helper
  const fontClass =
    selectedTypography === "serif"
      ? "font-serif"
      : selectedTypography === "editorial"
        ? "font-sans tracking-wide"
        : "font-sans";

  // Filtered Presets
  const filteredPresets = MASTER_PRESETS.filter((p) => {
    if (categoryFilter === "all") return true;
    return p.category === categoryFilter;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${fontClass}`}
      style={{
        backgroundColor: activePalette.bg,
        backgroundImage: activePalette.bgGradient || "none",
        color: activePalette.textPrimary,
      }}
    >
      {/* =========================================================================
          TOP EXECUTIVE DECK: MASTER PRESET SELECTOR & LIVE CUSTOMIZER
          ========================================================================= */}
      <header className="relative md:sticky md:top-0 z-50 border-b border-stone-300/80 bg-white/95 backdrop-blur-xl shadow-md">
        {/* Top Info Bar */}
        <div className="bg-stone-900 px-4 py-2 text-center text-xs font-medium text-stone-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Mani&nbsp;Sir Theme Showcase Lab</span>
              <span className="hidden sm:inline text-stone-400">
                {" "}
                - 14 Ready-Made Combos + 3D Effects + Live Device Preview
              </span>
            </div>

            {/* Viewport & Live Site Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Device Viewport Switcher */}
              <div className="flex items-center rounded-lg bg-stone-800 p-0.5 border border-stone-700">
                <button
                  type="button"
                  onClick={() => setDeviceView("desktop")}
                  title="Desktop View"
                  aria-label="Desktop View"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    deviceView === "desktop"
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <Monitor className="size-3" />
                  <span className="hidden md:inline">Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceView("mobile")}
                  title="Mobile Frame View"
                  aria-label="Mobile Frame View"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    deviceView === "mobile"
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <Smartphone className="size-3" />
                  <span className="hidden md:inline">Mobile Frame</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceView("comparator")}
                  title="Side-by-Side Theme Comparator"
                  aria-label="Compare 2 Themes"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    deviceView === "comparator"
                      ? "bg-amber-400 text-stone-950 shadow-xs"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <Columns2 className="size-3" />
                  <span className="hidden md:inline">Compare 2 Themes</span>
                </button>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                <ArrowLeft className="size-3" />
                Live Site
              </Link>
            </div>
          </div>
        </div>

        {/* Preset Selector Carousel */}
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-ember-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Select Master Design ({activePreset.id} of {MASTER_PRESETS.length})
              </span>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 ml-2 sm:ml-4 border-l border-stone-300 pl-2 sm:pl-4">
                {[
                  { id: "all", label: `All (${MASTER_PRESETS.length})` },
                  { id: "light", label: "8 Light Presets (1-8)" },
                  { id: "interactive", label: "3D & Interactive (11-14)" },
                  { id: "production", label: "Production Baseline (9-10)" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                      categoryFilter === cat.id
                        ? "bg-stone-900 text-white shadow-xs"
                        : "text-stone-600 bg-stone-100 hover:bg-stone-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCustomStudioOpen((v) => !v)}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition border ${
                  customStudioOpen
                    ? "bg-amber-500 text-stone-950 border-amber-600"
                    : "bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200"
                }`}
              >
                <Sliders className="size-3" />
                <span>{customStudioOpen ? "Close Studio" : "Mix & Match Studio"}</span>
              </button>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous theme preset"
                className="grid size-7 place-items-center rounded-lg border border-stone-300 bg-stone-100 text-stone-700 hover:bg-stone-200"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next theme preset"
                className="grid size-7 place-items-center rounded-lg border border-stone-300 bg-stone-100 text-stone-700 hover:bg-stone-200"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Master Presets Pills - flex-wrap so ALL 14 presets (all 8 original light + 3D + baseline) are fully visible without scrolling */}
          <div className="flex flex-wrap gap-2 pt-1 pb-1">
            {filteredPresets.map((preset) => {
              const isSelected = preset.id === activePresetId;
              const isDark = preset.paletteId === "obsidian";
              const isInteractive = preset.category === "interactive";
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? isDark
                        ? "bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400"
                        : "bg-stone-900 text-white shadow-md ring-2 ring-stone-900"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                  }`}
                >
                  <span
                    className={`grid size-5 place-items-center rounded-full text-[11px] font-extrabold ${
                      isSelected
                        ? isDark
                          ? "bg-stone-950 text-amber-300"
                          : "bg-amber-400 text-stone-950"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {preset.id}
                  </span>
                  <span className="whitespace-nowrap">{preset.name}</span>
                  {isDark && (
                    <span className="rounded-full bg-stone-800 px-1.5 py-0.2 text-[9px] text-amber-300 font-bold uppercase">
                      Live Dark
                    </span>
                  )}
                  {isInteractive && (
                    <span className="rounded-full bg-orange-100 px-1.5 py-0.2 text-[9px] text-orange-700 font-bold uppercase">
                      3D / FX
                    </span>
                  )}
                  {preset.category === "light" && (
                    <span className="rounded-full bg-stone-100 px-1.5 py-0.2 text-[9px] text-stone-500 font-semibold uppercase">
                      Light
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Studio Drawer (Allows mixing any Layout + any Color Palette live!) */}
          {customStudioOpen && (
            <div className="mt-2.5 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-xs shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <span className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                  <Sliders className="size-4 text-amber-700" />
                  Interactive Mix & Match Studio - Customize Everything Live
                </span>
                <button
                  type="button"
                  onClick={() => applyPreset(activePreset)}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-900 hover:text-amber-700 font-semibold"
                >
                  <RotateCcw className="size-3" />
                  Reset to Preset
                </button>
              </div>

              <div className="mt-3 grid gap-4 md:grid-cols-3">
                {/* 1. Layout Archetype */}
                <div>
                  <p className="font-bold text-amber-950 mb-1.5 uppercase tracking-wider text-[10px]">
                    1. Layout Architecture:
                  </p>
                  <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
                    {[
                      { id: "vibrant-split", label: "Modern 2-Column Split Hero" },
                      { id: "academic-editorial", label: "Royal Academic Serif Editorial" },
                      { id: "corporate-bento", label: "Fortune 500 Executive Bento Grid" },
                      { id: "organic-transformation", label: "Organic Wellness & Pill Curves" },
                      { id: "quiet-luxury", label: "Scandinavian Quiet Luxury Minimal" },
                      { id: "glassmorphic-halo", label: "Next-Gen 2026 Frosted Glass Halo" },
                      { id: "cultural-heritage", label: "Telugu Heartland Arched Frame" },
                      { id: "vip-platinum", label: "VIP Platinum & Gold Ribbon" },
                      { id: "classic-centered", label: "Classic Centered Hero" },
                      { id: "interactive-carousel", label: "Interactive 3D Stage Carousel" },
                      { id: "stage-vocal-glow", label: "Microphone Stage Vocal Glow" },
                      { id: "transformation-slider", label: "Telugu-to-English Before/After" },
                      { id: "deluxe-spotlight-bento", label: "Deluxe Spotlight Bento Matrix" },
                    ].map((arch) => (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => setSelectedArchetype(arch.id as LayoutArchetype)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                          selectedArchetype === arch.id
                            ? "bg-stone-900 text-white font-bold"
                            : "bg-white/80 text-stone-800 hover:bg-white"
                        }`}
                      >
                        {arch.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Color Palette */}
                <div>
                  <p className="font-bold text-amber-950 mb-1.5 uppercase tracking-wider text-[10px]">
                    2. Color Palette ({Object.keys(PALETTES).length} Options):
                  </p>
                  <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
                    {Object.values(PALETTES).map((pal) => (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setSelectedPaletteId(pal.id)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                          selectedPaletteId === pal.id
                            ? "bg-stone-900 text-white font-bold"
                            : "bg-white/80 text-stone-800 hover:bg-white"
                        }`}
                      >
                        <span className="truncate">{pal.name}</span>
                        <div className="flex gap-1 shrink-0 ml-1">
                          {pal.swatches.slice(1, 4).map((sw, idx) => (
                            <span
                              key={idx}
                              className="size-3 rounded-full border border-stone-400"
                              style={{ backgroundColor: sw.hex }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Typography */}
                <div>
                  <p className="font-bold text-amber-950 mb-1.5 uppercase tracking-wider text-[10px]">
                    3. Typography Vibe:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "sans", label: "Modern Geometric Sans (Clean, Tech)", sub: "Plus Jakarta Sans" },
                      { id: "serif", label: "Royal Academic Serif (Literary, Prestige)", sub: "Playfair / Georgia" },
                      { id: "editorial", label: "Architectural Editorial (Minimal)", sub: "Spaced Uppercase" },
                    ].map((typo) => (
                      <button
                        key={typo.id}
                        type="button"
                        onClick={() => setSelectedTypography(typo.id as TypographyStyle)}
                        className={`text-left p-2 rounded-lg text-xs transition ${
                          selectedTypography === typo.id
                            ? "bg-stone-900 text-white font-bold"
                            : "bg-white/80 text-stone-800 hover:bg-white"
                        }`}
                      >
                        <p className="font-bold">{typo.label}</p>
                        <p className={`text-[10px] ${selectedTypography === typo.id ? "text-amber-300" : "text-stone-500"}`}>
                          {typo.sub}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Preset Architecture Info Banner */}
          <div className="mt-2.5 rounded-xl border border-stone-200 bg-stone-50/95 p-3 text-xs">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-stone-900 text-sm">
                    Preset #{activePreset.id}: {activePreset.name}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                    {activePreset.tagline}
                  </span>
                  <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-semibold text-stone-700">
                    Palette: {activePalette.name}
                  </span>
                </div>
                <p className="mt-1 text-stone-600 leading-relaxed max-w-3xl">
                  {activePreset.psychology}
                </p>

                {/* Highlight badges */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activePreset.designHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-stone-200/70 px-2 py-0.5 text-[10px] font-medium text-stone-700"
                    >
                      <Sparkles className="size-2.5 text-amber-600" />
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Swatches */}
              <div className="flex items-center gap-1.5 shrink-0 self-start md:self-center pt-1 md:pt-0">
                <span className="text-[11px] font-semibold text-stone-500 mr-1">Palette:</span>
                {activePalette.swatches.map((swatch) => (
                  <div
                    key={swatch.name}
                    title={`${swatch.name}: ${swatch.hex}`}
                    className="group relative"
                  >
                    <div
                      className="size-6 rounded-full border border-stone-300 shadow-xs cursor-help transition transform group-hover:scale-110"
                      style={{ backgroundColor: swatch.hex }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          DYNAMIC CANVAS & VIEWPORT CONTAINER
          ========================================================================= */}
      {deviceView === "comparator" ? (
        /* --- DUAL COMPARATOR SPLIT VIEW --- */
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 rounded-2xl bg-stone-900 text-white p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-extrabold text-base flex items-center gap-2">
                <Columns2 className="size-5 text-amber-400" />
                Dual Theme Comparator (Mani&nbsp;Sir Live Evaluation)
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Inspect how two presets look side-by-side on the exact same screen.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div>
                <label className="text-stone-400 mr-1.5 font-semibold">Theme A:</label>
                <select
                  value={activePresetId}
                  onChange={(e) => {
                    const found = MASTER_PRESETS.find((p) => p.id === Number(e.target.value));
                    if (found) applyPreset(found);
                  }}
                  className="bg-stone-800 text-amber-300 font-bold px-2 py-1 rounded border border-stone-700"
                >
                  {MASTER_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id}: {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-stone-400 mr-1.5 font-semibold">Theme B:</label>
                <select
                  value={comparatorPresetId}
                  onChange={(e) => setComparatorPresetId(Number(e.target.value))}
                  className="bg-stone-800 text-amber-300 font-bold px-2 py-1 rounded border border-stone-700"
                >
                  {MASTER_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id}: {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Column A */}
            <div
              className="rounded-3xl p-6 border shadow-xl overflow-hidden"
              style={{
                backgroundColor: activePalette.bg,
                color: activePalette.textPrimary,
                borderColor: activePalette.cardBorder,
              }}
            >
              <div className="mb-4 pb-2 border-b border-stone-300 flex items-center justify-between">
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-600">
                  Theme A: Preset #{activePreset.id} ({activePreset.name})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                  {activePalette.name}
                </span>
              </div>
              {renderHero(selectedArchetype, activePalette, soundwavePlaying, setSoundwavePlaying, transformationTab, setTransformationTab)}
            </div>

            {/* Column B */}
            <div
              className="rounded-3xl p-6 border shadow-xl overflow-hidden"
              style={{
                backgroundColor: comparatorPalette.bg,
                color: comparatorPalette.textPrimary,
                borderColor: comparatorPalette.cardBorder,
              }}
            >
              <div className="mb-4 pb-2 border-b border-stone-700 flex items-center justify-between">
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-400">
                  Theme B: Preset #{comparatorPreset.id} ({comparatorPreset.name})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-200 font-bold">
                  {comparatorPalette.name}
                </span>
              </div>
              {renderHero(comparatorPreset.archetype, comparatorPalette, soundwavePlaying, setSoundwavePlaying, transformationTab, setTransformationTab)}
            </div>
          </div>
        </div>
      ) : deviceView === "mobile" ? (
        /* --- MOBILE PHONE FRAME VIEW (IPHONE 16 PRO MOCKUP) --- */
        <div className="py-10 px-4">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold mb-2">
              <Smartphone className="size-3.5 text-amber-400" />
              Mobile Phone Simulation (iPhone 16 Pro Viewport)
            </span>
            <p className="text-xs text-stone-500">
              Scroll inside the phone frame below to see how this design looks on mobile.
            </p>
          </div>

          <div className="mx-auto max-w-[400px] rounded-[52px] border-[10px] border-stone-900 bg-stone-950 p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            {/* Dynamic Island / Notch */}
            <div className="mx-auto mb-2 flex h-6 w-32 items-center justify-center rounded-full bg-stone-900">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-stone-800" />
                <span className="size-2 rounded-full bg-stone-950" />
              </div>
            </div>

            {/* Screen Viewport */}
            <div
              className="h-[750px] overflow-y-auto rounded-[38px] p-4 text-left scrollbar-none"
              style={{
                backgroundColor: activePalette.bg,
                color: activePalette.textPrimary,
              }}
            >
              {renderMockSiteSlice(activePreset, activePalette, selectedArchetype, soundwavePlaying, setSoundwavePlaying, transformationTab, setTransformationTab, activeSlide, setActiveSlide, whatsappVoteUrl, handleCopyText, copiedToast, whatsappVoteText)}
            </div>
          </div>
        </div>
      ) : (
        /* --- STANDARD FULL DESKTOP CANVAS --- */
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {renderMockSiteSlice(activePreset, activePalette, selectedArchetype, soundwavePlaying, setSoundwavePlaying, transformationTab, setTransformationTab, activeSlide, setActiveSlide, whatsappVoteUrl, handleCopyText, copiedToast, whatsappVoteText)}
        </main>
      )}
    </div>
  );
}

/* =========================================================================
   MOCK WEBSITE SLICE RENDERER
   ========================================================================= */
function renderMockSiteSlice(
  activePreset: MasterPreset,
  activePalette: ColorPalette,
  selectedArchetype: LayoutArchetype,
  soundwavePlaying: boolean,
  setSoundwavePlaying: (v: boolean | ((prev: boolean) => boolean)) => void,
  transformationTab: "before" | "after" | "split",
  setTransformationTab: (v: "before" | "after" | "split") => void,
  activeSlide: number,
  setActiveSlide: (v: number | ((prev: number) => number)) => void,
  whatsappVoteUrl: string,
  handleCopyText: () => void,
  copiedToast: boolean,
  whatsappVoteText: string
) {
  return (
    <>
      {/* --- Header / Brand Logo Slice --- */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-8 transition-all duration-300"
        style={{
          backgroundColor: activePalette.cardBg,
          borderColor: activePalette.cardBorder,
          borderWidth: selectedArchetype === "academic-editorial" ? "2px" : "1px",
          borderStyle: selectedArchetype === "academic-editorial" ? "double" : "solid",
          boxShadow: activePalette.cardShadow,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`relative size-12 sm:size-14 overflow-hidden ${
                selectedArchetype === "quiet-luxury"
                  ? "rounded-none"
                  : selectedArchetype === "organic-transformation"
                    ? "rounded-full"
                    : "rounded-xl"
              } bg-white p-1 shadow-sm border border-stone-200`}
            >
              <Image
                src="/brand/life-logo.webp"
                alt="LIFE Spoken English Logo"
                width={56}
                height={56}
                className="object-contain size-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {SITE.name}
                </span>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                  style={{
                    backgroundColor: activePalette.badgeBg,
                    color: activePalette.badgeText,
                    borderColor: activePalette.badgeBorder,
                    borderWidth: "1px",
                  }}
                >
                  Theme #{activePreset.id} Live
                </span>
              </div>
              <p className="text-xs sm:text-sm" style={{ color: activePalette.textSecondary }}>
                Spoken English & Soft Skills | Vasu Brothers Nilayam, Madhurawada, Visakhapatnam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={telLink()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition rounded-xl"
              style={{
                backgroundColor: activePalette.secondaryBtnBg,
                color: activePalette.secondaryBtnText,
                borderColor: activePalette.secondaryBtnBorder,
                borderWidth: "1px",
              }}
            >
              <Phone className="size-3.5" />
              <span className="hidden sm:inline">Call</span> +91 73374 12999
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition rounded-xl"
            >
              <WhatsAppIcon className="size-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* --- ARCHETYPE HERO SECTION --- */}
      {renderHero(
        selectedArchetype,
        activePalette,
        soundwavePlaying,
        setSoundwavePlaying,
        transformationTab,
        setTransformationTab
      )}

      {/* =====================================================================
          FANCY INTERACTIVE CAROUSEL TILES (SIGNATURE GUARANTEES SHOWCASE)
          ===================================================================== */}
      <section className="mb-14">
        <div
          className="rounded-3xl p-6 sm:p-10 transition-all duration-300"
          style={{
            backgroundColor: activePalette.cardBg,
            borderColor: activePalette.highlightBorder,
            borderWidth: "2px",
            boxShadow: activePalette.cardShadow,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  backgroundColor: activePalette.badgeBg,
                  color: activePalette.badgeText,
                }}
              >
                <Sparkles className="size-3.5" />
                Interactive Feature Carousel
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Why Students Flourish at LIFE
              </h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: activePalette.textSecondary }}>
                Swipe or tap the arrows below to explore our signature guarantees
              </p>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))
                }
                aria-label="Previous slide"
                className="grid size-10 place-items-center rounded-xl border border-stone-300 bg-white text-stone-700 shadow-sm hover:bg-stone-50 transition"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
                aria-label="Next slide"
                className="grid size-10 place-items-center rounded-xl border border-stone-300 bg-white text-stone-700 shadow-sm hover:bg-stone-50 transition"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Active Carousel Card Showcase with 3D Depth */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/60 p-6 sm:p-8 border border-stone-200 shadow-lg transition-transform hover:-translate-y-1">
            {(() => {
              const currentSlide = CAROUSEL_SLIDES[activeSlide];
              const Icon = currentSlide.icon;
              return (
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-stone-900 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 uppercase">
                        {currentSlide.tag}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        Slide {activeSlide + 1} of {CAROUSEL_SLIDES.length}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-amber-800 mt-1">
                      {currentSlide.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed text-stone-600 mt-3 max-w-xl">
                      {currentSlide.description}
                    </p>
                  </div>

                  <div className="md:col-span-4 flex justify-center">
                    <div className="grid size-28 sm:size-32 place-items-center rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xl shadow-orange-500/20 transform hover:scale-105 transition">
                      <Icon className="size-14" />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Progress Dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? "w-8 bg-amber-500" : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SYLLABUS & 10 PROMISES SECTION --- */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Syllabus Card */}
          <div
            className="rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.cardBorder,
              borderWidth: selectedArchetype === "academic-editorial" ? "2px" : "1px",
              borderStyle: selectedArchetype === "academic-editorial" ? "double" : "solid",
              boxShadow: activePalette.cardShadow,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="grid size-11 place-items-center rounded-2xl"
                style={{
                  backgroundColor: activePalette.badgeBg,
                  color: activePalette.primaryColor,
                }}
              >
                <BookOpen className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Complete Spoken English Track</h3>
                <p className="text-xs" style={{ color: activePalette.textMuted }}>
                  From Telugu-medium hesitation to effortless conversational fluency
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-5">
              {[
                "Spontaneous sentence construction without mental Telugu-to-English translation",
                "Overcoming hesitation, nervousness, and stammering on stage & in meetings",
                "Professional interview preparation: self-introduction, HR rounds, and salary negotiation",
                "Mastery over real-life English: telephone etiquette, email drafting, and social small talk",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2
                    className="size-4 shrink-0 mt-0.5"
                    style={{ color: activePalette.primaryColor }}
                  />
                  <span style={{ color: activePalette.textSecondary }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 10 Promises Card */}
          <div
            className="rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.cardBorder,
              borderWidth: selectedArchetype === "academic-editorial" ? "2px" : "1px",
              borderStyle: selectedArchetype === "academic-editorial" ? "double" : "solid",
              boxShadow: activePalette.cardShadow,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="grid size-11 place-items-center rounded-2xl"
                style={{
                  backgroundColor: activePalette.badgeBg,
                  color: activePalette.primaryColor,
                }}
              >
                <Users className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Our Sacred Student Promises</h3>
                <p className="text-xs" style={{ color: activePalette.textMuted }}>
                  The 10 non-negotiable commitments Mani&nbsp;Sir gives every learner
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-5">
              {[
                "10 full days free trial: No questions asked, no advance fee pressure",
                "Zero textbook cramming: Learn through real-life scenarios and vocal dialogue",
                "Fear-free classroom: Everyone makes mistakes here; nobody is judged",
                "Lifetime spoken support: Continue attending practice circles whenever you want",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <Sparkles
                    className="size-4 shrink-0 mt-0.5"
                    style={{ color: activePalette.primaryColor }}
                  />
                  <span style={{ color: activePalette.textSecondary }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- THE EAGLE PARABLE CARD SLICE --- */}
      <section className="mb-12">
        <div
          className="rounded-3xl p-6 sm:p-10 transition-all duration-300 hover:-translate-y-1"
          style={{
            backgroundColor: activePalette.cardBg,
            borderColor: activePalette.highlightBorder,
            borderWidth: selectedArchetype === "academic-editorial" ? "3px" : "2px",
            borderStyle: selectedArchetype === "academic-editorial" ? "double" : "solid",
            boxShadow: activePalette.cardShadow,
          }}
        >
          <div className="max-w-3xl">
            <span
              className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider mb-3 rounded-md"
              style={{
                backgroundColor: activePalette.badgeBg,
                color: activePalette.badgeText,
              }}
            >
              The Spirit of LIFE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why the Eagle? The Parable Behind Our Logo
            </h3>
            <p
              className="mt-4 text-sm sm:text-base leading-relaxed"
              style={{ color: activePalette.textSecondary }}
            >
              When storm clouds gather, ordinary birds seek shelter in branches. But the eagle sets its wings to
              rise directly into the gale, using the storm&apos;s own fury to soar into clear blue skies.
            </p>
            <p
              className="mt-3 text-sm sm:text-base leading-relaxed"
              style={{ color: activePalette.textSecondary }}
            >
              At LIFE, spoken English is trained not as an academic burden, but as wings. Lack of spoken English is
              the storm that holds students back in interviews and workplaces. We train you to rise above that
              fearlessness and command your own future.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTACT & CLASSROOM BAR SLICE --- */}
      <div
        className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300"
        style={{
          backgroundColor: activePalette.cardBg,
          borderColor: activePalette.cardBorder,
          borderWidth: "1px",
          boxShadow: activePalette.cardShadow,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="grid size-11 place-items-center shrink-0 rounded-xl"
            style={{
              backgroundColor: activePalette.badgeBg,
              color: activePalette.primaryColor,
            }}
          >
            <MapPin className="size-5" />
          </span>
          <div>
            <p className="font-bold text-sm">LIFE Spoken English Classroom</p>
            <p className="text-xs" style={{ color: activePalette.textSecondary }}>
              Vasu Brothers Nilayam, Midhilapuri VUDA Colony, Madhurawada, Visakhapatnam - 530041
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href={telLink()}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold transition rounded-xl"
            style={{
              backgroundColor: activePalette.secondaryBtnBg,
              color: activePalette.secondaryBtnText,
              borderColor: activePalette.secondaryBtnBorder,
              borderWidth: "1px",
            }}
          >
            <Phone className="size-3.5" />
            Call Mani&nbsp;Sir
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition rounded-xl"
          >
            <WhatsAppIcon className="size-3.5" />
            WhatsApp Line
          </a>
        </div>
      </div>

      {/* =========================================================================
          MANI SIR WHATSAPP CHOICE / VOTE DOCK
          ========================================================================= */}
      <section id="voting-dock" className="mt-14 mb-8">
        <div className="rounded-3xl border-2 border-stone-900 bg-stone-900 p-6 sm:p-10 text-white shadow-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 ring-1 ring-amber-400/30 mb-4">
              <MessageSquare className="size-3.5" />
              Mani&nbsp;Sir&apos;s Design Decision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Finalize This Design, Mani&nbsp;Sir?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              You are currently viewing{" "}
              <span className="font-bold text-amber-400">
                Preset #{activePreset.id}: {activePreset.name}
              </span>{" "}
              with the <span className="font-semibold text-white">{activePalette.name}</span> palette. Tap below
              to confirm your choice directly with Rakesh via WhatsApp!
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappVoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-950/40 hover:from-emerald-400 hover:to-teal-400 transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <WhatsAppIcon className="size-5" />
                Send Mani&nbsp;Sir&apos;s Choice to WhatsApp
                <ExternalLink className="size-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyText}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-700 bg-stone-800 px-5 py-4 text-sm font-semibold text-stone-200 hover:bg-stone-700 transition"
              >
                <Copy className="size-4" />
                {copiedToast ? "Copied to Clipboard!" : "Copy WhatsApp Message"}
              </button>
            </div>

            {/* Message preview snippet */}
            <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-3 text-left">
              <p className="text-[11px] font-mono text-stone-400">
                <span className="text-stone-500">Message to send:</span> &ldquo;{whatsappVoteText}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================================
   HERO RENDERER BY ARCHETYPE (13 ARCHETYPES)
   ========================================================================= */
function renderHero(
  archetype: LayoutArchetype,
  palette: ColorPalette,
  soundwavePlaying?: boolean,
  setSoundwavePlaying?: (v: boolean | ((prev: boolean) => boolean)) => void,
  transformationTab?: "before" | "after" | "split",
  setTransformationTab?: (v: "before" | "after" | "split") => void
) {
  switch (archetype) {
    /* -------------------------------------------------------------------------
       1. VIBRANT SPLIT (2-column split, large prominent portrait on right)
       ------------------------------------------------------------------------- */
    case "vibrant-split":
      return (
        <section className="mb-14">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold mb-4 rounded-full"
                style={{
                  backgroundColor: palette.badgeBg,
                  color: palette.badgeText,
                  borderColor: palette.badgeBorder,
                  borderWidth: "1px",
                }}
              >
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                10-Class Free Trial - Zero Advance Fee
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08]">
                Transform Your English.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: palette.brandGradient }}
                >
                  Command Every Room.
                </span>
              </h1>
              <p
                className="mt-4 text-base sm:text-lg leading-relaxed max-w-xl"
                style={{ color: palette.textSecondary }}
              >
                Madhurawada&apos;s leading spoken English academy. Daily vocal microphone practice,
                fearless stage speaking, and career confidence led personally by{" "}
                <strong className="font-semibold" style={{ color: palette.textPrimary }}>
                  Mani&nbsp;Sir
                </strong>
                .
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#voting-dock"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg transition transform hover:-translate-y-0.5 rounded-2xl"
                  style={{
                    backgroundColor: palette.primaryColor,
                    color: palette.primaryText,
                    backgroundImage: palette.brandGradient,
                  }}
                >
                  Book 10-Day Free Trial
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#voting-dock"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold border transition rounded-2xl"
                  style={{
                    backgroundColor: palette.secondaryBtnBg,
                    color: palette.secondaryBtnText,
                    borderColor: palette.secondaryBtnBorder,
                  }}
                >
                  <PlayCircle className="size-4" />
                  Watch Video Intro
                </a>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative p-3 rounded-3xl shadow-xl max-w-sm w-full transition transform hover:scale-[1.02]"
                style={{
                  backgroundColor: palette.cardBg,
                  borderColor: palette.highlightBorder,
                  borderWidth: "2px",
                }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-stone-100">
                  <Image
                    src="/media/people/mani-sir-portrait.webp"
                    alt="Mani Sir - Founder & Lead Spoken English Mentor"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 text-white">
                    <p className="font-black text-lg">Mani&nbsp;Sir</p>
                    <p className="text-xs text-amber-300">15+ Years Spoken English Mentorship</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-stone-600">
                  <span>★ 1,800+ 5-Star Reviews</span>
                  <span className="text-emerald-600">● 100% Practical Drills</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       2. ACADEMIC EDITORIAL (Royal serif, parchment card, double borders)
       ------------------------------------------------------------------------- */
    case "academic-editorial":
      return (
        <section className="mb-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border-b-2 border-amber-700/40 pb-1 mb-4 text-xs uppercase tracking-widest text-amber-900 font-bold">
            <GraduationCap className="size-4 text-amber-800" />
            Estd. 2010 | Visakhapatnam Institute of Spoken English
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 leading-[1.15]">
            The Art & Discipline of{" "}
            <span className="italic text-amber-800">Spoken English Fluency</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg font-serif leading-relaxed text-stone-700 max-w-2xl mx-auto">
            Under the tutelage of <strong className="font-bold text-stone-900">Mani&nbsp;Sir</strong>, language
            is acquired through vocal practice and conversational courage - not through silent grammar rules.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#voting-dock"
              className="px-8 py-3.5 text-sm font-serif font-bold tracking-wide uppercase transition rounded-lg"
              style={{
                backgroundColor: palette.primaryColor,
                color: palette.primaryText,
              }}
            >
              Enroll in 10-Class Trial
            </a>
            <a
              href="#voting-dock"
              className="px-6 py-3.5 text-sm font-serif font-bold border tracking-wide uppercase transition rounded-lg"
              style={{
                backgroundColor: palette.secondaryBtnBg,
                color: palette.secondaryBtnText,
                borderColor: palette.secondaryBtnBorder,
              }}
            >
              The Academy Story
            </a>
          </div>

          {/* Academic Crest Frame */}
          <div className="mt-10 p-6 border-4 border-double border-amber-800/30 rounded-lg bg-white max-w-xl mx-auto shadow-md">
            <div className="flex items-center gap-6 text-left">
              <div className="size-24 shrink-0 rounded-full overflow-hidden border-2 border-amber-700 p-0.5">
                <Image
                  src="/media/people/mani-sir-portrait.webp"
                  alt="Mani Sir"
                  width={96}
                  height={96}
                  className="rounded-full object-cover size-full"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-lg text-amber-950">Mani&nbsp;Sir</p>
                <p className="text-xs font-serif text-stone-600">Chief Mentor & Founder, LIFE</p>
                <p className="mt-2 text-xs font-serif italic text-stone-700">
                  &ldquo;A student must never risk their hard-earned money to discover if a teacher can help them.
                  We prove ourselves first.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       3. CORPORATE BENTO (Fortune 500 executive grid layout)
       ------------------------------------------------------------------------- */
    case "corporate-bento":
      return (
        <section className="mb-14">
          <div className="grid md:grid-cols-12 gap-4">
            {/* Main Bento Hero Tile */}
            <div className="md:col-span-8 p-6 sm:p-8 rounded-xl border border-blue-900/15 bg-white shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Corporate Fluency & Career Advancement
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                  Command Your Interviews. <br />
                  <span className="text-blue-800">Lead Boardroom Discussions.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  Tailored communication coaching for software professionals, job aspirants, and team leaders led by{" "}
                  <strong className="font-bold text-slate-900">Mani&nbsp;Sir</strong> in Visakhapatnam.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#voting-dock"
                  className="px-6 py-3 rounded-lg text-sm font-bold bg-amber-400 text-slate-950 shadow-md hover:bg-amber-300 transition"
                >
                  Book 10-Day Free Trial
                </a>
                <a
                  href="#voting-dock"
                  className="px-5 py-3 rounded-lg text-sm font-semibold border border-blue-900/20 text-blue-900 bg-blue-50/60 hover:bg-blue-100/60 transition"
                >
                  Interview Track Syllabus
                </a>
              </div>
            </div>

            {/* Side Metric Bento Tiles */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-xl border border-blue-900/15 bg-slate-900 text-white flex items-center gap-4 shadow-md">
                <div className="size-16 shrink-0 rounded-lg overflow-hidden border border-blue-400">
                  <Image
                    src="/media/people/mani-sir-portrait.webp"
                    alt="Mani Sir"
                    width={64}
                    height={64}
                    className="object-cover size-full"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Lead Mentor</p>
                  <p className="font-bold text-base text-white">Mani&nbsp;Sir</p>
                  <p className="text-xs text-slate-400">15+ Yrs Corporate Coaching</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-blue-900/15 bg-white shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-blue-900">10 Days</span>
                  <ShieldCheck className="size-6 text-emerald-600" />
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1">100% Free Trial</p>
                <p className="text-xs text-slate-500 mt-0.5">Zero advance fees or deposit traps.</p>
              </div>

              <div className="p-5 rounded-xl border border-blue-900/15 bg-white shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-blue-900">1,800+</span>
                  <TrendingUp className="size-6 text-amber-500" />
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1">Verified 5-Star Reviews</p>
                <p className="text-xs text-slate-500 mt-0.5">From campus hires to VP directors.</p>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       4. ORGANIC TRANSFORMATION (Pillowy curves, soft mint ivory, personal breakthrough)
       ------------------------------------------------------------------------- */
    case "organic-transformation":
      return (
        <section className="mb-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <HeartHandshake className="size-3.5" />
            Safe, Encouraging & 100% Judgment-Free Environment
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-emerald-950 leading-tight">
            Stop Hesitating in English. <br />
            <span className="text-emerald-700">Find Your Natural, Confident Voice.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
            Personalized spoken English guidance by{" "}
            <strong className="font-semibold text-emerald-950">Mani&nbsp;Sir</strong>. We remove language fear
            through daily kindness, supportive vocal practice, and stress-free monthly fees.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#voting-dock"
              className="px-8 py-3.5 rounded-full text-sm font-bold bg-emerald-600 text-white shadow-md hover:bg-emerald-500 transition"
            >
              Start 10-Day Free Trial
            </a>
            <a
              href="#voting-dock"
              className="px-6 py-3.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition"
            >
              Explore Course
            </a>
          </div>

          <div className="mt-10 rounded-3xl p-6 bg-white border border-emerald-200 shadow-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-left">
            <div className="size-24 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
              <Image
                src="/media/people/mani-sir-portrait.webp"
                alt="Mani Sir"
                width={96}
                height={96}
                className="object-cover size-full"
              />
            </div>
            <div>
              <p className="font-bold text-emerald-950 text-base">Mentored by Mani&nbsp;Sir</p>
              <p className="text-xs text-emerald-700 font-medium">Founder, LIFE Spoken English</p>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                &ldquo;Everyone makes mistakes when learning to speak. At LIFE, mistakes are welcomed as the first step
                to effortless fluency.&rdquo;
              </p>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       5. QUIET LUXURY (Architectural whitespace, 1px champagne lines, minimalist poise)
       ------------------------------------------------------------------------- */
    case "quiet-luxury":
      return (
        <section className="mb-14 py-6 border-b border-stone-300">
          <div className="max-w-3xl text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800">
              01 / VOCAL ARTICULATION
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-stone-900 tracking-tight leading-tight mt-2">
              Spoken English, Refined.
            </h1>
            <p className="mt-4 text-base text-stone-700 leading-relaxed max-w-xl font-light">
              Clear articulation. Poise under scrutiny. Spontaneous verbal translation without hesitation, directed
              by <strong className="font-medium text-stone-900">Mani&nbsp;Sir</strong>.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#voting-dock"
                className="px-6 py-3 text-xs tracking-widest uppercase bg-stone-900 text-white font-medium hover:bg-stone-800 transition rounded-none"
              >
                10-Day Complimentary Trial
              </a>
              <a
                href="#voting-dock"
                className="px-6 py-3 text-xs tracking-widest uppercase border border-stone-800 text-stone-900 font-medium hover:bg-stone-100 transition rounded-none"
              >
                Curriculum
              </a>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       6. GLASSMORPHY 2026 (Translucent frosted cards, ambient halo illumination)
       ------------------------------------------------------------------------- */
    case "glassmorphic-halo":
      return (
        <section className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-900 text-xs font-bold mb-4 backdrop-blur-md">
            <Sparkles className="size-3.5 text-amber-600" />
            2026 Modern EdTech Experience | Live Vocal Coaching
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-stone-950">
            Transform Your Spoken Fluency. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500">
              Effortless & Fearless.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Next-generation speech drills and spontaneous thinking training mentored personally by{" "}
            <strong className="font-bold text-stone-950">Mani&nbsp;Sir</strong>.
          </p>

          <div className="mt-7 flex justify-center gap-3">
            <a
              href="#voting-dock"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 shadow-lg shadow-orange-900/20 hover:from-orange-500 hover:to-amber-400 transition transform hover:-translate-y-0.5"
            >
              Start Free Trial Now
            </a>
            <a
              href="#voting-dock"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold border border-amber-400/40 bg-white/80 backdrop-blur-md text-amber-950 hover:bg-white transition"
            >
              Classroom Tour
            </a>
          </div>

          <div className="mt-10 rounded-2xl p-6 bg-white/80 backdrop-blur-xl border border-amber-400/40 shadow-xl max-w-xl mx-auto flex items-center gap-4 text-left">
            <div className="size-20 rounded-xl overflow-hidden border border-amber-400 shrink-0">
              <Image
                src="/media/people/mani-sir-portrait.webp"
                alt="Mani Sir"
                width={80}
                height={80}
                className="object-cover size-full"
              />
            </div>
            <div>
              <p className="font-extrabold text-stone-950 text-base">Mentored by Mani&nbsp;Sir</p>
              <p className="text-xs text-amber-700 font-semibold">1,800+ 5-Star Reviews | 15+ Years</p>
              <p className="text-xs text-stone-600 mt-1">Daily stage speaking practice and accent clarity.</p>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       7. CULTURAL HERITAGE (Telugu heartland arched frame, warm terracotta)
       ------------------------------------------------------------------------- */
    case "cultural-heritage":
      return (
        <section className="mb-14">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-left">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-200/60 text-amber-950 text-xs font-serif font-bold mb-3">
                నమస్కారం | Welcome to LIFE Spoken English
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 leading-tight">
                Telugu-Medium to <br />
                <span className="text-orange-700">Fluent English Speaking</span>
              </h1>
              <p className="mt-4 text-base font-serif text-stone-800 leading-relaxed max-w-lg">
                No complex grammar rules. Speak with dignity and confidence under the caring guidance of{" "}
                <strong className="font-bold text-amber-950">Mani&nbsp;Sir</strong> right here in Madhurawada.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#voting-dock"
                  className="px-7 py-3 rounded-xl font-serif text-sm font-bold bg-orange-700 text-white shadow-md hover:bg-orange-600 transition"
                >
                  Join 10-Day Free Trial
                </a>
                <a
                  href="#voting-dock"
                  className="px-6 py-3 rounded-xl font-serif text-sm font-semibold border border-orange-800/30 text-amber-950 bg-amber-100/50 hover:bg-amber-100 transition"
                >
                  Watch Student Stories
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              {/* Arched Indian Portrait Frame */}
              <div className="p-3 bg-white border-2 border-orange-700/30 rounded-t-full rounded-b-2xl shadow-lg max-w-xs text-center">
                <div className="size-52 rounded-t-full rounded-b-xl overflow-hidden mx-auto bg-stone-100">
                  <Image
                    src="/media/people/mani-sir-portrait.webp"
                    alt="Mani Sir"
                    width={208}
                    height={208}
                    className="object-cover size-full"
                  />
                </div>
                <p className="mt-3 font-serif font-bold text-base text-amber-950">Mani&nbsp;Sir</p>
                <p className="text-xs font-serif text-stone-600">Founder, LIFE Spoken English</p>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       8. VIP PLATINUM (Metallic gold ribbon, high-society executive distinction)
       ------------------------------------------------------------------------- */
    case "vip-platinum":
      return (
        <section className="mb-14">
          <div className="rounded-2xl border border-amber-600/30 bg-gradient-to-r from-amber-50 via-white to-amber-50/50 p-6 sm:p-10 shadow-xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 border border-amber-400 text-amber-950 text-xs font-extrabold mb-3">
                  <Award className="size-3.5 text-amber-700" />
                  VIP Executive Communication Academy
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
                  Elite Speech Mastery for <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800">
                    High-Achieving Leaders.
                  </span>
                </h1>
                <p className="mt-3 text-base text-stone-700 leading-relaxed max-w-xl">
                  Bespoke verbal presence, global accent clarity, and executive conversational strategy led personally
                  by <strong className="font-extrabold text-stone-950">Mani&nbsp;Sir</strong>.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#voting-dock"
                    className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-700 to-yellow-600 text-white shadow-lg shadow-amber-950/20 hover:from-amber-600 hover:to-yellow-500 transition"
                  >
                    Request Executive Consultation
                  </a>
                  <a
                    href="#voting-dock"
                    className="px-6 py-3.5 rounded-xl font-bold text-sm border border-amber-700/40 text-amber-950 bg-white hover:bg-amber-50 transition"
                  >
                    Executive Track Overview
                  </a>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center">
                <div className="relative p-2 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-100 to-amber-400 shadow-2xl">
                  <div className="size-48 rounded-xl overflow-hidden bg-stone-900">
                    <Image
                      src="/media/people/mani-sir-portrait.webp"
                      alt="Mani Sir"
                      width={192}
                      height={192}
                      className="object-cover size-full"
                    />
                  </div>
                  <div className="mt-2 text-center text-xs font-black text-amber-950">
                    Mani&nbsp;Sir | Lead Executive Coach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       11. INTERACTIVE 3D STAGE CAROUSEL (Dynamic 4-Stage Hero Progression)
       ------------------------------------------------------------------------- */
    case "interactive-carousel":
      return (
        <section className="mb-14">
          <div className="rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-900 text-xs font-bold mb-3">
                <Zap className="size-3.5 text-amber-600" />
                The 4-Stage Fluency Acceleration Journey
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
                From Stage Hesitation to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                  Fearless English Command
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-600">
                Experience our step-by-step transformation path coached personally by{" "}
                <strong className="font-bold text-stone-900">Mani&nbsp;Sir</strong>.
              </p>
            </div>

            {/* 4 Interactive Stage Cards in 3D Perspective */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  step: "01",
                  title: "Stage Hesitation",
                  subtitle: "Breaking Mental Fear",
                  desc: "Eliminate Telugu-to-English translation lag with empathetic, zero-judgment conversational circles.",
                  icon: HeartHandshake,
                  badge: "Days 1 - 10",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  step: "02",
                  title: "Microphone Drills",
                  subtitle: "Vocal Projection",
                  desc: "Hold the mic on stage daily. Overcome voice trembling, throat tightness, and public speaking nervousness.",
                  icon: Mic,
                  badge: "Days 11 - 25",
                  color: "from-orange-500 to-amber-600",
                },
                {
                  step: "03",
                  title: "Debates & GDs",
                  subtitle: "Spontaneous Arguments",
                  desc: "Express quick opinions in lively group discussions and boardroom debate simulations without hesitation.",
                  icon: MessageSquare,
                  badge: "Days 26 - 45",
                  color: "from-emerald-600 to-teal-600",
                },
                {
                  step: "04",
                  title: "Interview Mastery",
                  subtitle: "Command Every Room",
                  desc: "Crush HR and technical rounds with articulate self-introductions, negotiation poise, and executive presence.",
                  icon: Award,
                  badge: "Days 46 - 60",
                  color: "from-blue-600 to-indigo-600",
                },
              ].map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={idx}
                    className="relative group p-6 rounded-2xl bg-white border border-stone-200/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-amber-500">{stage.step}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                          {stage.badge}
                        </span>
                      </div>
                      <div className="size-12 rounded-xl bg-gradient-to-tr text-white grid place-items-center mb-3 shadow-md group-hover:scale-110 transition"
                        style={{ backgroundImage: `linear-gradient(135deg, ${stage.color.split(" ")[0].replace("from-", "")}, ${stage.color.split(" ")[1].replace("to-", "")})` }}
                      >
                        <Icon className="size-6 text-amber-500" />
                      </div>
                      <h3 className="font-extrabold text-stone-900 text-lg leading-tight">{stage.title}</h3>
                      <p className="text-xs font-semibold text-amber-800 mt-0.5">{stage.subtitle}</p>
                      <p className="text-xs text-stone-600 leading-relaxed mt-2.5">{stage.desc}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-amber-700">
                      <span>Guided by Mani&nbsp;Sir</span>
                      <ArrowRight className="size-3.5 transform group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#voting-dock"
                className="px-8 py-3.5 rounded-xl font-bold text-sm bg-stone-900 text-white shadow-lg hover:bg-stone-800 transition"
              >
                Experience Stage 1 with 10-Day Free Trial
              </a>
              <a
                href="#voting-dock"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 transition"
              >
                Curriculum Breakdown
              </a>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       12. MICROPHONE STAGE VOCAL GLOW (Live Equalizer & Vocal Energy)
       ------------------------------------------------------------------------- */
    case "stage-vocal-glow":
      return (
        <section className="mb-14">
          <div className="rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-amber-500/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 -z-10 size-96 rounded-full bg-orange-600/15 blur-3xl" />

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-bold mb-4">
                  <Mic className="size-3.5 animate-pulse" />
                  Live Microphone Training in Session
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  English is Spoken With Your Vocal Cords. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
                    Not Silently On Paper.
                  </span>
                </h1>
                <p className="mt-4 text-base text-stone-300 leading-relaxed max-w-xl">
                  Mani&nbsp;Sir places a real microphone in your hands from Day 1. We replace silent grammar rules
                  with voice resonance, stage confidence, and natural speech flow.
                </p>

                {/* Animated Audio Equalizer Waveform Box */}
                <div className="mt-6 rounded-2xl bg-stone-900/90 border border-amber-500/30 p-4 max-w-md shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Volume2 className="size-4" />
                      Classroom Stage Audio Frequency Visualizer
                    </span>
                    <button
                      type="button"
                      onClick={() => setSoundwavePlaying && setSoundwavePlaying((v) => !v)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700 hover:bg-stone-700"
                    >
                      {soundwavePlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                      {soundwavePlaying ? "Pause Wave" : "Play Wave"}
                    </button>
                  </div>

                  {/* 14 Frequency Bars */}
                  <div className="flex items-end justify-between h-10 px-2 gap-1.5 bg-stone-950/70 rounded-lg p-1.5">
                    {[12, 28, 16, 24, 32, 18, 30, 22, 14, 26, 32, 20, 28, 15].map((h, i) => (
                      <span
                        key={i}
                        className={`w-full rounded-full bg-gradient-to-t from-orange-500 to-amber-300 ${
                          soundwavePlaying ? "animate-soundwave" : ""
                        }`}
                        style={{
                          height: soundwavePlaying ? undefined : `${h}px`,
                          animationDelay: `${(i % 5) * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-stone-400 text-center">
                    Simulating daily 1:1 microphone stage speech drills with Mani&nbsp;Sir
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#voting-dock"
                    className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-orange-400 transition"
                  >
                    Book 10-Day Free Mic Trial
                  </a>
                  <a
                    href="#voting-dock"
                    className="px-6 py-3.5 rounded-xl font-semibold text-sm border border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800 transition"
                  >
                    Watch Classroom Video
                  </a>
                </div>
              </div>

              {/* Right Mentor Card with Glow */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative p-3 rounded-3xl bg-gradient-to-b from-amber-500/30 via-stone-800 to-stone-900 border-2 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.2)] max-w-sm w-full">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-stone-950">
                    <Image
                      src="/media/people/mani-sir-portrait.webp"
                      alt="Mani Sir"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-4">
                      <p className="font-extrabold text-xl text-white">Mani&nbsp;Sir</p>
                      <p className="text-xs text-amber-400 font-semibold">15+ Years Direct Vocal Coaching</p>
                      <p className="mt-1 text-[11px] text-stone-300 italic">
                        &ldquo;Speak loud, make mistakes with pride, and watch fear disappear.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       13. TELUGU-TO-ENGLISH TRANSFORMATION SLIDER (Interactive Before & After)
       ------------------------------------------------------------------------- */
    case "transformation-slider":
      return (
        <section className="mb-14">
          <div className="rounded-3xl border-2 border-emerald-600/30 bg-white p-6 sm:p-10 shadow-xl">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                <Sparkles className="size-3.5 text-emerald-600" />
                The Telugu-Medium Transformation Duel
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
                Can a Telugu-Medium Student <br />
                <span className="text-emerald-700">Speak Fluent English in 30 Days?</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-600">
                Tap the buttons below to compare a student&apos;s mindset before and after joining{" "}
                <strong className="font-bold text-stone-900">Mani&nbsp;Sir</strong>&apos;s academy.
              </p>

              {/* View Switcher: Before / After / Split */}
              <div className="mt-5 inline-flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setTransformationTab && setTransformationTab("before")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    transformationTab === "before"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                >
                  🔴 Day 0: Before LIFE
                </button>
                <button
                  type="button"
                  onClick={() => setTransformationTab && setTransformationTab("after")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    transformationTab === "after"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                >
                  🟢 Day 30: After LIFE
                </button>
                <button
                  type="button"
                  onClick={() => setTransformationTab && setTransformationTab("split")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    transformationTab === "split"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                >
                  ⚡ Side-by-Side Duel
                </button>
              </div>
            </div>

            {/* Duel Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* BEFORE CARD */}
              {(transformationTab === "before" || transformationTab === "split") && (
                <div className="p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 text-left transition transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-xs uppercase tracking-wider text-rose-700">
                      🔴 Day 0: Silent Hesitation
                    </span>
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                      Typical Telugu Learner
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-rose-950 leading-tight">
                    &ldquo;I know the words in my head, but they freeze at my tongue.&rdquo;
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>Constant Telugu-to-English translation before uttering each sentence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>Severe public speaking anxiety, voice shaking, and stage avoidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>Fear of grammatical errors and what peers might whisper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>Skipping campus placements and job interviews out of embarrassment</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* AFTER CARD */}
              {(transformationTab === "after" || transformationTab === "split") && (
                <div className="p-6 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 text-left transition transform hover:-translate-y-1 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-black text-xs uppercase tracking-wider text-emerald-800">
                      🟢 Day 30: Natural Stage Command
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Mani&nbsp;Sir Mentorship
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950 leading-tight">
                    &ldquo;I hold the microphone without fear and speak from my heart.&rdquo;
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Direct English thought flow with spontaneous verbal fluency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Fearless stage presence on the microphone in front of hundreds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Confidence to speak English casually with MNC managers and HRs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Zero fear of mistakes: fluency and clear articulation over perfection</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <a
                href="#voting-dock"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 transition"
              >
                Join 10-Day Free Trial - Start Your Transformation
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       14. DELUXE MODULAR BENTO MATRIX (High-Tech 4-Tile Interactive Grid)
       ------------------------------------------------------------------------- */
    case "deluxe-spotlight-bento":
      return (
        <section className="mb-14">
          <div className="grid md:grid-cols-12 gap-4">
            {/* Tile 1: Hero & Vision */}
            <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Next-Gen Corporate & Stage Fluency
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight leading-tight">
                  Speak English with Authority. <br />
                  <span className="text-blue-800">Never Feel Inferior Again.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
                  Visakhapatnam&apos;s high-touch spoken English institute led personally by{" "}
                  <strong className="font-bold text-stone-950">Mani&nbsp;Sir</strong>. Real vocal drills,
                  authentic stage speaking, and 100% money-back integrity.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#voting-dock"
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 text-stone-950 shadow-md hover:bg-amber-400 transition"
                >
                  Book 10-Day Free Trial
                </a>
                <a
                  href="#voting-dock"
                  className="px-5 py-3 rounded-xl text-sm font-semibold border border-stone-300 bg-stone-50 text-stone-800 hover:bg-stone-100 transition"
                >
                  Classroom Video Tour
                </a>
              </div>
            </div>

            {/* Tile 2: Mani Sir Mentor Tile */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-stone-900 text-white flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="size-16 shrink-0 rounded-xl overflow-hidden border-2 border-amber-400">
                  <Image
                    src="/media/people/mani-sir-portrait.webp"
                    alt="Mani Sir"
                    width={64}
                    height={64}
                    className="object-cover size-full"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400">Chief Mentor</span>
                  <p className="text-lg font-bold text-white">Mani&nbsp;Sir</p>
                  <p className="text-xs text-stone-400">15+ Yrs Stage Mentorship</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-stone-300 italic leading-relaxed">
                &ldquo;You do not need a foreign accent. You need clear thoughts, vocal courage, and the discipline to practice.&rdquo;
              </p>
              <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-amber-300 font-semibold flex items-center justify-between">
                <span>Personal Daily Drills</span>
                <span>★ 1,800+ Reviews</span>
              </div>
            </div>

            {/* Tile 3: 10-Day Trial Guarantee */}
            <div className="md:col-span-6 p-6 rounded-2xl bg-amber-50/70 border border-amber-300/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-800">Our Ironclad Pledge</span>
                <p className="text-2xl font-black text-stone-950 mt-1">10 Full Days Completely Free</p>
                <p className="text-xs text-stone-600 mt-1 max-w-sm">
                  Attend 10 full classes before paying any fee. If you don&apos;t feel real improvement, walk away.
                </p>
              </div>
              <div className="size-14 rounded-2xl bg-amber-500 text-stone-950 grid place-items-center shrink-0 shadow-md">
                <ShieldCheck className="size-8" />
              </div>
            </div>

            {/* Tile 4: Placement & Career Stats */}
            <div className="md:col-span-6 p-6 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-blue-900">Career Advancement</span>
                <p className="text-2xl font-black text-slate-900 mt-1">MNC & Campus Success</p>
                <p className="text-xs text-slate-600 mt-1 max-w-sm">
                  Trained TCS, Infosys, Wipro candidates and government job aspirants across Andhra Pradesh.
                </p>
              </div>
              <div className="size-14 rounded-2xl bg-blue-900 text-white grid place-items-center shrink-0 shadow-md">
                <TrendingUp className="size-8" />
              </div>
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------------------------
       9 & 10. CLASSIC CENTERED (The traditional trusted centered hero)
       ------------------------------------------------------------------------- */
    case "classic-centered":
    default:
      return (
        <section className="mb-14 text-center">
          {/* 5-Star Badge */}
          <div className="inline-flex items-center justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition"
              style={{
                backgroundColor: palette.badgeBg,
                color: palette.badgeText,
                borderColor: palette.badgeBorder,
                borderWidth: "1px",
              }}
            >
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              10-Class Free Trial - Zero Risk & Zero Advance Fee
            </span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
            Transform Your English.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: palette.brandGradient }}
            >
              Command Every Room.
            </span>
          </h1>

          {/* Subheadline with Mani Sir nowrap */}
          <p
            className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: palette.textSecondary }}
          >
            Madhurawada&apos;s premier spoken English & corporate communication institute.
            Daily interactive vocal drills, interview mastery, and lifelong transformation led personally by{" "}
            <strong className="font-semibold" style={{ color: palette.textPrimary }}>
              Mani&nbsp;Sir
            </strong>
            .
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#voting-dock"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm sm:text-base font-bold transition transform hover:-translate-y-0.5 shadow-md"
              style={{
                backgroundColor: palette.primaryColor,
                color: palette.primaryText,
                backgroundImage:
                  palette.id === "saffron" || palette.id === "halo" || palette.id === "platinum"
                    ? palette.brandGradient
                    : "none",
              }}
            >
              Book 10-Day Free Trial
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#voting-dock"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold transition"
              style={{
                backgroundColor: palette.secondaryBtnBg,
                color: palette.secondaryBtnText,
                borderColor: palette.secondaryBtnBorder,
                borderWidth: "1px",
              }}
            >
              <PlayCircle className="size-4" />
              Watch Mani&nbsp;Sir in Action
            </a>
          </div>

          {/* Portrait & Trust Card */}
          <div className="mt-12 mx-auto max-w-4xl">
            <div
              className="rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: palette.cardBg,
                borderColor: palette.cardBorder,
                borderWidth: "1px",
                boxShadow: palette.cardShadow,
              }}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div
                    className="relative size-48 sm:size-56 rounded-2xl overflow-hidden p-1 shadow-lg transition"
                    style={{
                      borderColor: palette.highlightBorder,
                      borderWidth: "2px",
                      backgroundColor: palette.bg,
                    }}
                  >
                    <Image
                      src="/media/people/mani-sir-portrait.webp"
                      alt="Mani Sir - Founder & Lead Spoken English Mentor"
                      width={224}
                      height={224}
                      className="size-full object-cover rounded-xl"
                      priority
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">Mani&nbsp;Sir</h3>
                  <p className="text-xs font-medium" style={{ color: palette.textMuted }}>
                    Founder & Lead Mentor, LIFE Spoken English
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <span>★ 1,800+ 5-Star Reviews</span>
                  </div>
                </div>

                <div className="md:col-span-7">
                  <span
                    className="inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider mb-2"
                    style={{
                      backgroundColor: palette.badgeBg,
                      color: palette.badgeText,
                    }}
                  >
                    Direct Mentorship Guarantee
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    &ldquo;If you fear speaking English, the teacher must remove the risk first.&rdquo;
                  </h2>
                  <p
                    className="mt-3 text-sm sm:text-base leading-relaxed"
                    style={{ color: palette.textSecondary }}
                  >
                    Unlike commercial coaching centers that demand huge upfront fees and teach textbook rules,
                    Mani&nbsp;Sir established LIFE on two non-negotiable principles: attend 10 full classes
                    completely free, and practice speaking on stage every single day.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-3 border text-xs"
                      style={{
                        backgroundColor: palette.secondaryBtnBg,
                        borderColor: palette.secondaryBtnBorder,
                        color: palette.textPrimary,
                      }}
                    >
                      <p className="font-bold text-sm">15+ Years</p>
                      <p style={{ color: palette.textSecondary }}>Teaching in Visakhapatnam</p>
                    </div>
                    <div
                      className="rounded-xl p-3 border text-xs"
                      style={{
                        backgroundColor: palette.secondaryBtnBg,
                        borderColor: palette.secondaryBtnBorder,
                        color: palette.textPrimary,
                      }}
                    >
                      <p className="font-bold text-sm">10-Day Trial</p>
                      <p style={{ color: palette.textSecondary }}>Zero advance fee required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}
