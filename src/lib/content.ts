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
  Mic,
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
    duration: "4-5 Months",
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
    duration: "6-7 Months",
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

export const STORY = {
  eyebrow: "The Spirit of LIFE and Mani Sir",
  meaningTitle: "The Meaning Behind Our Name",
  meaning: [
    "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.",
    "When you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
  ],
  namedLine: "That is why Mani Sir named the institute LIFE:",
  acronym: [
    { letter: "L", word: "Live" },
    { letter: "I", word: "It" },
    { letter: "F", word: "For" },
    { letter: "E", word: "Eternity" },
  ],
  promise:
    "We do not teach you English to get through tomorrow. We build an unshakeable speaking voice that you will live with, grow with, and celebrate for eternity.",
  milestones: [
    { year: "2018", title: "The first classroom", body: "A single room at Vasu Brothers Nilayam, Midhilapuri VUDA Colony, Madhurawada." },
    { year: "2024", title: "LIFE goes digital", body: "Mani Sir's YouTube channel begins sharing everyday English lessons, Telugu to English." },
    { year: "2025", title: "Live online batches", body: "Interactive evening batches (8:00 to 9:30 PM) welcome learners far beyond Vizag." },
    { year: "Today", title: "1,800+ five-star reviews", body: "A perfect 5.0 on Google, earned one confident speaker at a time." },
  ],
  beginning: {
    number: "01",
    year: "2018",
    label: "The Beginning: Where the Journey Started",
    title: "A Single Room in Madhurawada, Visakhapatnam",
    paragraphs: [
      "The story started in 2018 in a humble classroom at Vasu Brothers Nilayam, Midhilapuri VUDA Colony.",
      "Mani Sir (K. Maneendra Kumar) met countless students, homemakers, and working graduates across Visakhapatnam who shared the exact same pain: they had studied English for 10 to 15 years in schools and colleges, yet their throats tightened whenever they had to speak a single spontaneous sentence.",
      "They were not lacking intelligence. They were simply trapped in fear, stage fright, and the silent guilt of coming from Telugu-medium or non-English backgrounds.",
    ],
  },
  turningPoint: {
    number: "02",
    label: "The Turning Point: Why LIFE Broke the Traditional Rules",
    title: "Education Built on Empathy, Not Commercial Exploitation",
    paragraphs: [
      "Mani Sir noticed that traditional institutes treated language training like a business trap: demanding heavy upfront fees, forcing students to silently copy grammar notes, and lecturing from a stage without letting students speak. If a student still could not speak after months, the institute blamed the student.",
    ],
    truthsIntro: "Mani Sir chose to rebuild the entire learning experience on three student-first truths:",
    truths: [
      {
        title: "Remove the Fear of Money First",
        body: "If someone already fears English, do not add financial pressure. This created our famous policy: attend your first 10 live classes completely free. Pay only if you see real transformation in your own voice, and pay in easy monthly installments just like school tuition.",
        icon: Wallet,
      },
      {
        title: "Language Lives on Your Tongue, Not in a Notebook",
        body: "You cannot learn to swim by reading about water. You learn to speak only by speaking. Every class at LIFE is an active, conversational dialogue rooted in your daily life, family, and workplace situations.",
        icon: Mic,
      },
      {
        title: "Telugu to English Without Shame",
        body: "Your mother tongue is your strength, not a weakness. We bridge thoughts from Telugu into fluent English naturally, with zero judgment and endless encouragement.",
        icon: Languages,
      },
    ],
  },
  evolution: {
    number: "03",
    label: "The Evolution: From a Classroom to 1,800+ Verified Lives Changed",
    title: "A Movement Built by Heart and Word of Mouth",
    intro:
      "Without running aggressive commercial advertisements, LIFE grew organically because every student who walked out became an ambassador of confidence:",
    stories: [
      {
        who: "Homemakers",
        body: "who previously felt nervous during parent-teacher meetings now converse with teachers effortlessly and guide their children with pride.",
        icon: Home,
      },
      {
        who: "College graduates and job seekers",
        body: "who dreaded campus placements now crack multi-round interviews and work in top multinational corporations.",
        icon: GraduationCap,
      },
      {
        who: "Working executives and public officials",
        body: "now command meetings, draft clear emails, and speak on stage without second-guessing their words.",
        icon: Briefcase,
      },
    ],
    closing:
      "With a perfect 5.0-star rating across more than 1,800 authentic Google reviews, active classroom batches in Madhurawada, and live digital interactive sessions reaching learners across states, our promise remains timeless:",
  },
  finale: { lead: "Come with hesitation.", tail: "Walk away with fluency you will Live For Eternity." },
} as const;

export type VideoCategory = "lesson" | "batch" | "orientation";
export type LifeVideo = { id: string; title: string; tag: string; category: VideoCategory };
export type ReelVideo = LifeVideo;

// Real videos from Mani Sir's official YouTube channel (@ENGLISHBYMANISIR).
// Images are generated by scripts/fetch-youtube-media.mjs into public/media/yt/.
export const VIDEOS: LifeVideo[] = [
  { id: "4LtuKMa_cIQ", title: "Wake up, Get up or Rise?", tag: "Vocabulary", category: "lesson" },
  { id: "5WTLd30TzjE", title: "In a fit of anger or rage (కోపంలో)", tag: "Telugu to English", category: "lesson" },
  { id: "SwTh5KpmYJo", title: "Common Errors 14: Can vs Able to", tag: "Common Errors", category: "lesson" },
  { id: "7eD_4PgSrYs", title: "New online batch: 26 May 2025", tag: "Live Online", category: "batch" },
  { id: "VlGL4PvH4QI", title: "Common Errors: In case vs If", tag: "Common Errors", category: "lesson" },
  { id: "Z1EMnIaNG5E", title: "Narrate, Boast or Preach?", tag: "Vocabulary", category: "lesson" },
  { id: "-ITXb2VtlSM", title: "Acquired ability: Can, Able, Able to", tag: "Grammar Made Easy", category: "lesson" },
  { id: "wTCG6LFzdHs", title: "New online batch: 7 May 2025", tag: "Live Online", category: "batch" },
  { id: "3u8uwIFMfBU", title: "Believe vs Trust", tag: "Vocabulary", category: "lesson" },
  { id: "r9-7-YFfs4Q", title: "Common Errors 13: Why and Because", tag: "Common Errors", category: "lesson" },
  { id: "YcMCJvgCnmA", title: "Rob vs Steal (దొంగతనం)", tag: "Telugu to English", category: "lesson" },
  { id: "ZoxX1KZDUVw", title: "Common Errors 12: There is vs There are", tag: "Common Errors", category: "lesson" },
  { id: "jKc3s6B-4gc", title: "Wake up vs Wake someone up", tag: "Vocabulary", category: "lesson" },
  { id: "XLq_cRbhnKA", title: "Commonly Confused: Used to", tag: "Grammar Made Easy", category: "lesson" },
  { id: "XMvkLBuzCac", title: "New online batch announcement", tag: "Live Online", category: "batch" },
  { id: "Er5SNUeJwmk", title: "Official orientation by Mani Sir", tag: "Orientation", category: "orientation" },
];

const REEL_IDS = ["4LtuKMa_cIQ", "5WTLd30TzjE", "SwTh5KpmYJo", "7eD_4PgSrYs", "VlGL4PvH4QI", "Z1EMnIaNG5E", "-ITXb2VtlSM", "wTCG6LFzdHs"];
export const REEL: LifeVideo[] = REEL_IDS.map((id) => VIDEOS.find((v) => v.id === id) as LifeVideo);

export const PHOTOS = [
  {
    src: "/media/people/mani-sir-classroom.webp",
    width: 1024,
    height: 764,
    alt: "Mani Sir teaching in the LIFE Spoken English & Soft Skills classroom in Madhurawada",
    caption: "Mani Sir in the LIFE classroom, Madhurawada",
    tag: "Classroom",
  },
] as const;

export const MANI_SIR = {
  name: "K. Maneendra Kumar",
  alias: "Mani Sir",
  role: "Founder, Director & Lead Trainer",
  lede: "Some teachers teach English. Mani Sir teaches people to believe in their own voice.",
  paragraphs: [
    "K. Maneendra Kumar, known to thousands of learners simply as Mani Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
    "In his classroom, mistakes are not punished; they are welcomed as proof that you are trying. Lessons sound like real life: waking up, travelling, explaining, negotiating, interviewing. A new word is not finished until every student has said it aloud and used it in a sentence of their own.",
    "By bridging every idea from Telugu to English, he turns the language people feared most into something that feels familiar. Students often say his classes feel more like watching a movie than sitting through a lecture.",
    "Today his lessons travel far beyond one classroom through YouTube and live online batches. But the goal has never changed: the day each student speaks without fear.",
  ],
  classroomRules: [
    { title: "Speak first, polish later", body: "Confidence comes before perfection. You will speak from day one." },
    { title: "Every question is welcome", body: "Basic or advanced, no question is too small or too big." },
    { title: "Telugu is a bridge", body: "Your mother tongue helps you think; we use it, never mock it." },
    { title: "Real life is the textbook", body: "Home, shop, office, interview: practice the English you actually need." },
  ],
} as const;

export const LOGO_STORY = {
  eyebrow: "The Story Inside Our Logo",
  title: "The Young Eagle Who Was Afraid to Fly",
  parable: [
    "High on a cliff above the Vizag coast, a young eagle sat at the edge of its nest every morning, watching the others soar.",
    "It knew everything about flying. It had watched a thousand flights and could explain every feather. But each time the wind called, its wings stayed folded. What if I fall? What if they laugh?",
    "One morning, an old eagle landed beside it. He did not lecture. He did not push. He simply said, \"Fly with me. Just a little today.\"",
    "They stepped into the warm wind together. The young eagle wobbled, dipped, and then, for the very first time, it rose. Below them, over the sea, the sun was rising too.",
    "That morning the young eagle learned something no book had taught it: it never needed more knowledge. It needed someone to fly beside it, and the courage to open its wings.",
  ],
  moral:
    "Every learner who walks into LIFE is that young eagle: full of knowledge, held back by fear. Our job is to fly beside you until your own wings take over.",
  symbols: [
    { title: "The Eagle", body: "Courage. Eagles rise above storms instead of hiding from them. You will rise above hesitation." },
    { title: "Wings Spread Wide", body: "Freedom and open learning. No closed doors, no silly questions, no limits on what you can ask." },
    { title: "The Rising Sun", body: "A fresh start in every class. Each time you speak, a new sun rises in your confidence." },
    { title: "The Circle", body: "Eternity. One complete, unbroken journey: Live It For Eternity." },
    { title: "Earth Brown", body: "Roots. Like your mother tongue, it is the ground you grow from, never something to hide." },
  ],
} as const;

export const LEARNER_CATEGORIES = [
  "Homemaker",
  "College Student",
  "Working Professional",
  "Other",
] as const;

export const LEARNING_MODES = ["Classroom in Madhurawada", "Live Online"] as const;

export const COURSE_INTEREST_OPTIONS = [
  ...COURSES.map((c) => ({ id: c.id, label: `${c.name} (${c.duration})` })),
  { id: "unsure", label: "Not sure yet, please guide me" },
] as const;

export type CourseInterestId = Course["id"] | "unsure";
