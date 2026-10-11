import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  Crown,
  GraduationCap,
  Home,
  Languages,
  Lightbulb,
  Mail,
  MessagesSquare,
  Repeat,
  Scale,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type LifePromise = { title: string; description: string; icon: LucideIcon };

export const PROMISES: LifePromise[] = [
  {
    title: "10 Days Free Demo Classes",
    description: "Not just 1 or 2 classes. Attend 10 full sessions before you decide.",
    icon: CalendarCheck,
  },
  {
    title: "Monthly Fee Payment Option",
    description: "Pay small monthly instalments like school tuition. No heavy upfront burden.",
    icon: Wallet,
  },
  {
    title: "100% Face-to-Face Live Teaching",
    description: "Interactive two-way speaking practice. Never boring recorded videos.",
    icon: Users,
  },
  {
    title: "Real-Life Situational Learning",
    description:
      "Practical examples from your daily life, job and career, not dry bookish grammar rules.",
    icon: Lightbulb,
  },
  {
    title: "Free Repeat Batch Guarantee",
    description: "Finished the course and want more polish? Repeat the next batch for ₹0.",
    icon: Repeat,
  },
  {
    title: "Weekend Backup Sessions",
    description: "Missed a class during the week? Free dedicated backup classes on weekends.",
    icon: CalendarClock,
  },
  {
    title: "Complete Soft Skills & Drafting",
    description: "Master professional email writing, formal drafting and corporate etiquette.",
    icon: Mail,
  },
  {
    title: "Equal Teaching & Speaking Drills",
    description: "50% concept explanation + 50% active speaking practice, every session.",
    icon: Scale,
  },
  {
    title: "Vernacular-Friendly (Telugu → English)",
    description: "Designed to remove the fear of English for Telugu-medium learners.",
    icon: Languages,
  },
  {
    title: "Open Learning Environment",
    description: "Basic track students can freely ask questions from advanced modules too.",
    icon: BookOpen,
  },
];

export type Course = {
  id: "basic" | "professional" | "advanced";
  name: string;
  duration: string;
  tagline: string;
  audience: string;
  focus: string[];
  icon: LucideIcon;
};

export const COURSES: Course[] = [
  {
    id: "basic",
    name: "Basic Course",
    duration: "3 Months",
    tagline: "From hesitation to everyday confidence.",
    audience: "Homemakers, beginners and Telugu-medium students starting from square one.",
    focus: [
      "Daily table conversation",
      "Eliminating hesitation",
      "Basic sentence construction",
      "Overcoming fear of speaking in public, at schools and shops",
    ],
    icon: MessagesSquare,
  },
  {
    id: "professional",
    name: "Professional Course",
    duration: "4–5 Months",
    tagline: "Communicate like a professional. Crack the interview.",
    audience: "Job aspirants, college graduates and corporate / IT professionals.",
    focus: [
      "Workplace communication",
      "Powerful self-introduction",
      "Group discussions (GDs)",
      "Email etiquette",
      "Interview cracking strategies",
    ],
    icon: Briefcase,
  },
  {
    id: "advanced",
    name: "Advanced Course",
    duration: "6–7 Months",
    tagline: "Lead the room with presence and persuasion.",
    audience:
      "Team leads, executives, competitive exam aspirants and aspiring public speakers.",
    focus: [
      "Stage presence",
      "Accent neutralisation",
      "Persuasive business drafting",
      "Soft skills",
      "Emotional intelligence",
      "Life leadership skills",
    ],
    icon: Crown,
  },
];

export type Audience = { title: string; description: string; icon: LucideIcon };

export const AUDIENCES: Audience[] = [
  {
    title: "College Students & Freshers",
    description: "Prepare for placement interviews and campus GDs with real practice.",
    icon: GraduationCap,
  },
  {
    title: "Homemakers",
    description: "Overcome hesitation and speak confidently in social and daily life.",
    icon: Home,
  },
  {
    title: "Working Professionals & IT Engineers",
    description: "Polish corporate communication, email drafting and meeting presence.",
    icon: Briefcase,
  },
  {
    title: "Telugu-Medium Learners",
    description: "Leave fear, stage fright and English hesitation behind, step by step.",
    icon: Languages,
  },
];

export const LEARNER_CATEGORIES = [
  "Homemaker",
  "College Student",
  "Working Professional",
  "Other",
] as const;

export const LEARNING_MODES = ["Classroom in Madhurawada", "Live Online"] as const;
