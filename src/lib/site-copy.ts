import { ADDRESS, EMAIL, GEO, PHONES, SITE, TIMINGS } from "./site.ts";

export type BrandCopy = {
  name: string;
  alternateName: string;
  brand: string;
  tagline: string;
  founder: string;
  founderAlias: string;
  mission: string;
  summary: string;
  phones: typeof PHONES;
  email: string;
  address: typeof ADDRESS & { full: string };
  geo: typeof GEO;
  timings: typeof TIMINGS;
  whatsappCta: {
    chat: string;
    chatShort: string;
    mobileBar: string;
    register: string;
    talk: string;
    ask: string;
    enquire: string;
    shareMoment: string;
    defaultMessage: string;
  };
  footer: {
    copyright: string;
    cookiesGuarantee: string;
    privacyLabel: string;
    termsLabel: string;
    exploreHeading: string;
    contactHeading: string;
  };
  rating: typeof SITE.rating & { badgeText: string };
  skipToContent: string;
};

export const brandCopy: BrandCopy = {
  name: SITE.name,
  alternateName: SITE.alternateName,
  brand: SITE.brand,
  tagline: SITE.tagline,
  founder: SITE.founder,
  founderAlias: SITE.founderAlias,
  mission:
    "To eliminate the fear of English and empower learners with unshakeable speaking confidence that lasts for eternity.",
  summary:
    "Practical, live Spoken English & Soft Skills training in Madhurawada, Visakhapatnam, led personally by Mani\u00A0Sir (K. Maneendra Kumar). Offline classroom and Live Online batches.",
  phones: PHONES,
  email: EMAIL,
  address: {
    ...ADDRESS,
    full: `${ADDRESS.building}, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} - ${ADDRESS.postalCode}`,
  },
  geo: GEO,
  timings: TIMINGS,
  whatsappCta: {
    chat: "Chat on WhatsApp",
    chatShort: "WhatsApp",
    mobileBar: "WhatsApp 10 Days Free",
    register: "Register for 10 Free Classes via WhatsApp",
    talk: "Talk to Mani\u00A0Sir",
    ask: "Ask on WhatsApp",
    enquire: "Enquire on WhatsApp",
    shareMoment: "Share your LIFE moment",
    defaultMessage:
      "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.`,
    cookiesGuarantee: "No cookies. No tracking.",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Use",
    exploreHeading: "Explore",
    contactHeading: "Contact",
  },
  rating: {
    ...SITE.rating,
    badgeText: `${SITE.rating.value} Star Rated on Google by ${SITE.rating.label} Students & Professionals`,
  },
  skipToContent: "Skip to content",
};

export type HeroBenefit = {
  metric: string;
  title: string;
  description: string;
};

export type HeroCopy = {
  badgeText: string;
  headlineLead: string;
  headlineGradient: string;
  headlineFull: string;
  subheadline: string;
  ctaButtons: {
    trial: string;
    video: string;
    videoAria: string;
    videoModalTitle: string;
  };
  highlights: HeroBenefit[];
};

export const heroCopy: HeroCopy = {
  badgeText: `${SITE.rating.value} Star Rated on Google by ${SITE.rating.label} Students & Professionals`,
  headlineLead: "Speak English with Fluency and",
  headlineGradient: "Unstoppable Confidence.",
  headlineFull: "Speak English with Fluency and Unstoppable Confidence.",
  subheadline:
    "Practical, interactive Spoken English & Soft Skills training led personally by Mani\u00A0Sir. Learn without fear or grammar intimidation in Visakhapatnam or via Live Online classes.",
  ctaButtons: {
    trial: "Claim Your 10 Free Trial Classes",
    video: "Watch Mani\u00A0Sir's Video Intro",
    videoAria: "Watch Mani\u00A0Sir's Video Intro",
    videoModalTitle: "LIFE Spoken English: Video Introduction",
  },
  highlights: [
    {
      metric: "10",
      title: "Full Free Classes",
      description: "Attend 10 days risk-free before paying any fee.",
    },
    {
      metric: "Monthly",
      title: "Tuition Model",
      description: "No heavy lump-sum lock-in. Pay month-to-month.",
    },
    {
      metric: "100%",
      title: "Live Practice",
      description: "Zero pre-recorded videos. Real-time conversational drills.",
    },
  ],
};

export type CourseTrack = {
  id: "basic" | "professional" | "advanced";
  name: string;
  duration: string;
  tagline: string;
  audience: string;
  focus: string[];
};

export type CourseCopy = {
  sectionHeading: {
    eyebrow: string;
    titleLead: string;
    titleGradient: string;
    description: string;
  };
  tracks: CourseTrack[];
  syllabusHighlights: {
    grammar: { title: string; description: string };
    hesitationRemoval: { title: string; description: string };
    publicSpeaking: { title: string; description: string };
    vocabulary: { title: string; description: string };
    interviewSkills: { title: string; description: string };
  };
  batchSchedules: {
    summary: string;
    morning: { title: string; timing: string; description: string };
    evening: { title: string; timing: string; description: string };
    online: { title: string; timing: string; description: string };
    weekend: { title: string; timing: string; description: string };
  };
  feePolicies: {
    eyebrow: string;
    titleLead: string;
    titleGradient: string;
    description: string;
    trialCard: {
      badge: string;
      name: string;
      price: string;
      priceNote: string;
      features: string[];
      cta: string;
    };
    regularCard: {
      badge: string;
      name: string;
      subtitle: string;
      price: string;
      priceNote: string;
      features: string[];
      cta: string;
    };
    mentorshipCard: {
      badge: string;
      name: string;
      price: string;
      priceNote: string;
      features: string[];
      cta: string;
      waMessage: string;
    };
    customTiming: {
      text: string;
      cta: string;
      waMessage: string;
    };
    steps: Array<{ title: string; description: string }>;
  };
  admissionTerms: {
    capacity: string;
    capacityShort: string;
    booklet: { title: string; body: string };
    eligibility: string;
    refundPolicy: string;
    outcomeDisclaimer: string;
  };
};

export const courseCopy: CourseCopy = {
  sectionHeading: {
    eyebrow: "Course Tracks",
    titleLead: "Three clear paths.",
    titleGradient: "One fluent you.",
    description:
      "Start where you are today. Every track is taught live, with practical, situation-based speaking drills.",
  },
  tracks: [
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
    },
    {
      id: "advanced",
      name: "Advanced Course",
      duration: "6-7 Months",
      tagline: "Lead the room with presence and persuasion.",
      audience: "Team leads, executives, competitive exam aspirants and aspiring public speakers.",
      focus: [
        "Stage presence",
        "Accent neutralisation",
        "Persuasive business drafting",
        "Soft skills",
        "Emotional intelligence",
        "Life leadership skills",
      ],
    },
  ],
  syllabusHighlights: {
    grammar: {
      title: "Grammar Made Easy",
      description: "Concept-first practical structures without confusing textbook jargon.",
    },
    hesitationRemoval: {
      title: "Hesitation Elimination",
      description: "Safe, non-judgmental drills to start speaking spontaneously from day one.",
    },
    publicSpeaking: {
      title: "Public Speaking & Stage Presence",
      description: "Overcoming crowd anxiety, body language, and voice modulation.",
    },
    vocabulary: {
      title: "Everyday Vocabulary & Usage",
      description: "Real-life contextual words, Telugu to English bridges, and commonly confused expressions.",
    },
    interviewSkills: {
      title: "Interview & Career Communication",
      description: "Professional self-introductions, group discussions (GDs), and corporate drafting.",
    },
  },
  batchSchedules: {
    summary: "Classes run Monday to Friday, 6:00 AM to 10:00 PM, with dedicated weekend makeup sessions.",
    morning: {
      title: "Morning Batches",
      timing: "6:00 AM to 12:00 PM",
      description: "Ideal for early risers, college students, and homemakers before daily routines begin.",
    },
    evening: {
      title: "Evening Batches",
      timing: "5:00 PM to 10:00 PM",
      description: "Tailored for working executives, IT professionals, and job seekers after office hours.",
    },
    online: {
      title: "Live Online Batches",
      timing: "Flexible interactive slots",
      description: "Full two-way live speaking drills for learners joining from any city or country.",
    },
    weekend: {
      title: "Personal Backup Sessions",
      timing: "Saturday and Sunday",
      description: "Reserved for on-demand personal makeup classes directly with Mani\u00A0Sir.",
    },
  },
  feePolicies: {
    eyebrow: "Fees & Trial Policy",
    titleLead: "Total transparency.",
    titleGradient: "Zero pressure.",
    description: "Student-friendly fees, just like school tuition. Try everything first, then pay month by month.",
    trialCard: {
      badge: "Start Here",
      name: "10-Class Free Trial",
      price: "₹0",
      priceNote: "Completely Free",
      features: [
        "10 full live sessions",
        "No advance payment",
        "Zero card details or commitment",
        "Drop out anytime if not satisfied",
      ],
      cta: "Claim Free Trial",
    },
    regularCard: {
      badge: "Most Popular",
      name: "Regular Batch",
      subtitle: "Offline or Online",
      price: "₹3,000",
      priceNote: "1st month → ₹2,000 / month thereafter",
      features: [
        "Monday to Friday · 5 days / week",
        "Flexible slots from 6:00 AM to 10:00 PM",
        "Personalized weekend backup classes",
        "Exclusive LIFE Physical Booklet included",
        "Only 15 - 20 learners per batch",
        "Live doubt clearance",
      ],
      cta: "Start with 10 Free Classes",
    },
    mentorshipCard: {
      badge: "Premium",
      name: "1-on-1 Personal Mentorship",
      price: "₹10,000",
      priceNote: "per month",
      features: [
        "Dedicated solo training with Mani\u00A0Sir",
        "Flexible timing slots",
        "Personalised curriculum",
        "Tailored to your career goals",
      ],
      cta: "Enquire on WhatsApp",
      waMessage:
        "Hello Mani Sir, I am interested in 1-on-1 Personal Mentorship at LIFE Spoken English. Please share the available time slots.",
    },
    customTiming: {
      text: "Custom batch timing or special requirements available on request via WhatsApp.",
      cta: "Ask on WhatsApp",
      waMessage:
        "Hello Mani Sir, I would like to ask about a custom batch timing or a special requirement at LIFE Spoken English.",
    },
    steps: [
      {
        title: "Register on WhatsApp",
        description: "Share your name and preferred mode. Takes 30 seconds.",
      },
      {
        title: "Attend 10 live classes",
        description: "Experience the full LIFE method, completely free.",
      },
      {
        title: "Continue monthly",
        description: "Happy? Pay month-to-month. Not satisfied? Walk away, no questions.",
      },
    ],
  },
  admissionTerms: {
    capacity:
      "Strictly limited to 15 - 20 learners per batch to guarantee individual vocal attention and live correction.",
    capacityShort: "15 - 20 learners per batch",
    booklet: {
      title: "Exclusive LIFE Physical Booklet",
      body: "Every enrolled learner receives a custom printed reference handbook designed to support classroom speaking drills and serve as a permanent lifetime communication asset.",
    },
    eligibility:
      "Open to all age groups: from upper primary school through college graduates, working professionals, and homemakers.",
    refundPolicy:
      "10-Class Free Trial allows 100% risk-free evaluation. Once a monthly batch fee is paid, fees are non-refundable for that active calendar month due to the strict 15 - 20 student seat limit. Batch pauses or transfers for genuine emergencies may be granted at Mani\u00A0Sir's sole discretion.",
    outcomeDisclaimer:
      "LIFE Spoken English provides practical spoken communication and soft skills mentorship. We do not offer or guarantee job placements, employment contracts, or academic degrees. Individual fluency outcomes depend entirely on learner practice, attendance, and commitment.",
  },
};

export type FounderCopy = {
  name: string;
  alias: string;
  role: string;
  title: string;
  lede: string;
  paragraphs: string[];
  experienceSummary: {
    foundedYear: string;
    summary: string;
    reviewsCount: string;
    rating: string;
  };
  keyQuotes: string[];
  teachingMethodology: {
    classroomRules: Array<{ title: string; body: string }>;
    coreTruthsIntro: string;
    coreTruths: Array<{ title: string; body: string }>;
  };
};

export const founderCopy: FounderCopy = {
  name: SITE.founder,
  alias: SITE.founderAlias,
  role: "Founder, Director & Lead Trainer",
  title: "Founder & Lead Trainer",
  lede: "Some teachers teach English. Mani\u00A0Sir teaches people to believe in their own voice.",
  paragraphs: [
    "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
    "In his classroom, mistakes are not punished; they are welcomed as proof that you are trying. Lessons sound like real life: waking up, travelling, explaining, negotiating, interviewing. A new word is not finished until every student has said it aloud and used it in a sentence of their own.",
    "By bridging every idea from Telugu to English, he turns the language people feared most into something that feels familiar. Students often say his classes feel more like watching a movie than sitting through a lecture.",
    "Today his lessons travel far beyond one classroom through YouTube and live online batches. But the goal has never changed: the day each student speaks without fear.",
  ],
  experienceSummary: {
    foundedYear: "2018",
    summary:
      "Teaching spoken English and mentoring learners across Visakhapatnam and online since 2018.",
    reviewsCount: "1,800+",
    rating: "5.0",
  },
  keyQuotes: [
    "Nobody is bad at English. Most people have just never been given a safe place to speak it.",
    "Language lives on your tongue, not in a notebook.",
    "Your mother tongue is your strength, not a weakness. We bridge thoughts from Telugu into fluent English naturally.",
    "Come with hesitation. Walk away with fluency you will Live For Eternity.",
    "Fly with me. Just a little today.",
  ],
  teachingMethodology: {
    classroomRules: [
      {
        title: "Speak first, polish later",
        body: "Confidence comes before perfection. You will speak from day one.",
      },
      {
        title: "Every question is welcome",
        body: "Basic or advanced, no question is too small or too big.",
      },
      {
        title: "Telugu is a bridge",
        body: "Your mother tongue helps you think; we use it, never mock it.",
      },
      {
        title: "Real life is the textbook",
        body: "Home, shop, office, interview: practice the English you actually need.",
      },
    ],
    coreTruthsIntro: "Mani\u00A0Sir chose to rebuild the entire learning experience on three student-first truths:",
    coreTruths: [
      {
        title: "Remove the Fear of Money First",
        body: "If someone already fears English, do not add financial pressure. This created our famous policy: attend your first 10 live classes completely free. Pay only if you see real transformation in your own voice, and pay in easy monthly installments just like school tuition.",
      },
      {
        title: "Language Lives on Your Tongue, Not in a Notebook",
        body: "You cannot learn to swim by reading about water. You learn to speak only by speaking. Every class at LIFE is an active, conversational dialogue rooted in your daily life, family, and workplace situations.",
      },
      {
        title: "Telugu to English Without Shame",
        body: "Your mother tongue is your strength, not a weakness. We bridge thoughts from Telugu into fluent English naturally, with zero judgment and endless encouragement.",
      },
    ],
  },
};

export type FaqItem = {
  question: string;
  answer: string;
  category: "Trial & Fees" | "Eligibility & Language" | "Schedule & Batches" | "Missed Classes & Support";
};

export type FaqCopy = {
  eyebrow: string;
  titleLead: string;
  titleGradient: string;
  description: string;
  categories: Array<FaqItem["category"]>;
  items: FaqItem[];
};

export const faqCopy: FaqCopy = {
  eyebrow: "Questions & Answers",
  titleLead: "Everything you asked,",
  titleGradient: "answered.",
  description: "Quick answers about the free trial, who LIFE is for, timings, and missed classes.",
  categories: ["Trial & Fees", "Eligibility & Language", "Schedule & Batches", "Missed Classes & Support"],
  items: [
    {
      category: "Trial & Fees",
      question: "How do the 10 free trial classes work at LIFE?",
      answer:
        "You attend 10 full, live classes with Mani\u00A0Sir 100% free, with zero upfront fees and no advance payment. Join the classroom in Madhurawada or the live online batch, experience the speaking practice for yourself, and stop at any time during the trial. Only if you decide to continue do you pay the monthly fee: ₹3,000 for the first month, then ₹2,000 per month.",
    },
    {
      category: "Eligibility & Language",
      question: "Is this suitable for Telugu-medium learners and homemakers?",
      answer:
        "Yes. LIFE was built for Telugu-medium learners, homemakers and complete beginners. Mani\u00A0Sir bridges every idea from Telugu to English with zero judgment, so you can start from square one and speak with confidence. Batches are open to all age groups: from upper primary school through college graduates, working professionals, and homemakers.",
    },
    {
      category: "Schedule & Batches",
      question: "What are the class timings and batch sizes?",
      answer:
        "Classes run Monday to Friday, 6:00 AM to 10:00 PM, so you can choose a batch that fits your day. Every batch is strictly limited to 15 - 20 learners to guarantee individual vocal attention and live correction from Mani\u00A0Sir.",
    },
    {
      category: "Missed Classes & Support",
      question: "What happens if I miss a weekday class?",
      answer:
        "You do not fall behind. Students who miss weekday sessions receive flexible, personalized makeup sessions on Saturday and Sunday, arranged directly with Mani\u00A0Sir.",
    },
  ],
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  outcome: string;
};

export type TestimonialsCopy = {
  rating: string;
  reviewCount: string;
  badge: string;
  heading: string;
  description: string;
  items: Testimonial[];
};

export const testimonialsCopy: TestimonialsCopy = {
  rating: SITE.rating.value,
  reviewCount: SITE.rating.label,
  badge: "Student Success",
  heading: "Real Transformations, Real Voices",
  description: "Read how students, homemakers, and professionals built lasting English fluency at LIFE.",
  items: [
    {
      name: "Lakshmi Prasanna",
      role: "Homemaker",
      quote:
        "I was always afraid of speaking during parent-teacher meetings. After joining LIFE with Mani\u00A0Sir, I now converse with teachers effortlessly and guide my children with pride.",
      outcome: "Fluent everyday conversations with school teachers and neighbors.",
    },
    {
      name: "Venkata Sai",
      role: "College Graduate & Software Engineer",
      quote:
        "Coming from a Telugu-medium background, campus GDs and interviews terrified me. Mani\u00A0Sir's live drills removed my fear completely, and I cracked my MNC placement interview.",
      outcome: "Cleared multi-round campus interview in a leading software company.",
    },
    {
      name: "Rajesh Kumar",
      role: "IT Project Lead",
      quote:
        "Mani\u00A0Sir's focus on professional communication, business drafting, and vocal modulation helped me lead client meetings and deliver presentations without hesitation.",
      outcome: "Commanding international client calls and drafting clear executive emails.",
    },
    {
      name: "Pravallika Reddy",
      role: "Fresh Graduate",
      quote:
        "The 10 free trial classes gave me total confidence that this institute is different. No boring lectures, 100% speaking from day one. Best decision ever.",
      outcome: "Eliminated public speaking hesitation in front of large audiences.",
    },
  ],
};

export type AudienceProfile = {
  title: string;
  description: string;
};

export type LifePromiseCopy = {
  title: string;
  description: string;
};

export type StoryCopy = {
  eyebrow: string;
  meaningTitle: string;
  meaningLead: string;
  meaningParagraphs: string[];
  namedLine: string;
  acronym: Array<{ letter: string; word: string }>;
  promise: string;
  milestones: Array<{ year: string; title: string; body: string }>;
  beginning: {
    number: string;
    year: string;
    label: string;
    title: string;
    paragraphs: string[];
    whereItBegan: string;
    visitUs: string;
  };
  turningPoint: {
    number: string;
    label: string;
    title: string;
    paragraphs: string[];
    truthsIntro: string;
    truths: Array<{ title: string; body: string }>;
  };
  evolution: {
    number: string;
    label: string;
    title: string;
    intro: string;
    stories: Array<{ who: string; body: string }>;
    closing: string;
  };
  finale: {
    lead: string;
    tail: string;
    ctaTrial: string;
    ctaTalk: string;
  };
  logoStory: {
    eyebrow: string;
    title: string;
    parable: string[];
    moral: string;
    symbolsHeading: string;
    symbols: Array<{ title: string; body: string }>;
  };
  promisesHeading: {
    eyebrow: string;
    titleLead: string;
    titleGradient: string;
    description: string;
  };
  promises: LifePromiseCopy[];
  audiencesHeading: {
    eyebrow: string;
    titleLead: string;
    titleGradient: string;
    description: string;
  };
  audiences: AudienceProfile[];
  approach: {
    badge: string;
    description: string;
  };
  teaser: {
    eyebrow: string;
    headlineLead: string;
    ariaLabelRead: string;
    ctaJourney: string;
    ctaLogoStory: string;
    ctaGallery: string;
  };
  reel: {
    eyebrow: string;
    title: string;
    description: string;
    galleryButton: string;
    youtubeButton: string;
    ariaLabel: string;
  };
};

export const storyCopy: StoryCopy = {
  eyebrow: "The Spirit of LIFE and Mani\u00A0Sir",
  meaningTitle: "The Meaning Behind Our Name",
  meaningLead: "Live It For Eternity",
  meaningParagraphs: [
    "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.",
    "When you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
  ],
  namedLine: "That is why Mani\u00A0Sir named the institute LIFE:",
  acronym: [
    { letter: "L", word: "Live" },
    { letter: "I", word: "It" },
    { letter: "F", word: "For" },
    { letter: "E", word: "Eternity" },
  ],
  promise:
    "We do not teach you English to get through tomorrow. We build an unshakeable speaking voice that you will live with, grow with, and celebrate for eternity.",
  milestones: [
    {
      year: "2018",
      title: "The first classroom",
      body: "A single room at Vasu Brothers Nilayam, Midhilapuri VUDA Colony, Madhurawada.",
    },
    {
      year: "2024",
      title: "LIFE goes digital",
      body: "Mani\u00A0Sir's YouTube channel begins sharing everyday English lessons, Telugu to English.",
    },
    {
      year: "2025",
      title: "Live online batches",
      body: "Interactive live online batches welcome learners far beyond Vizag.",
    },
    {
      year: "Today",
      title: "1,800+ five-star reviews",
      body: "A perfect 5.0 on Google, earned one confident speaker at a time.",
    },
  ],
  beginning: {
    number: "01",
    year: "2018",
    label: "The Beginning: Where the Journey Started",
    title: "A Single Room in Madhurawada, Visakhapatnam",
    paragraphs: [
      "The story started in 2018 in a humble classroom at Vasu Brothers Nilayam, Midhilapuri VUDA Colony.",
      "Mani\u00A0Sir (K. Maneendra Kumar) met countless students, homemakers, and working graduates across Visakhapatnam who shared the exact same pain: they had studied English for 10 to 15 years in schools and colleges, yet their throats tightened whenever they had to speak a single spontaneous sentence.",
      "They were not lacking intelligence. They were simply trapped in fear, stage fright, and the silent guilt of coming from Telugu-medium or non-English backgrounds.",
    ],
    whereItBegan: "Where it all began",
    visitUs: "Visit us",
  },
  turningPoint: {
    number: "02",
    label: "The Turning Point: Why LIFE Broke the Traditional Rules",
    title: "Education Built on Empathy, Not Commercial Exploitation",
    paragraphs: [
      "Mani\u00A0Sir noticed that traditional institutes treated language training like a business trap: demanding heavy upfront fees, forcing students to silently copy grammar notes, and lecturing from a stage without letting students speak. If a student still could not speak after months, the institute blamed the student.",
    ],
    truthsIntro: "Mani\u00A0Sir chose to rebuild the entire learning experience on three student-first truths:",
    truths: [
      {
        title: "Remove the Fear of Money First",
        body: "If someone already fears English, do not add financial pressure. This created our famous policy: attend your first 10 live classes completely free. Pay only if you see real transformation in your own voice, and pay in easy monthly installments just like school tuition.",
      },
      {
        title: "Language Lives on Your Tongue, Not in a Notebook",
        body: "You cannot learn to swim by reading about water. You learn to speak only by speaking. Every class at LIFE is an active, conversational dialogue rooted in your daily life, family, and workplace situations.",
      },
      {
        title: "Telugu to English Without Shame",
        body: "Your mother tongue is your strength, not a weakness. We bridge thoughts from Telugu into fluent English naturally, with zero judgment and endless encouragement.",
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
      },
      {
        who: "College graduates and job seekers",
        body: "who dreaded campus placements now crack multi-round interviews and work in top multinational corporations.",
      },
      {
        who: "Working executives and public officials",
        body: "now command meetings, draft clear emails, and speak on stage without second-guessing their words.",
      },
    ],
    closing:
      "With a perfect 5.0-star rating across more than 1,800 authentic Google reviews, active classroom batches in Madhurawada, and live digital interactive sessions reaching learners across states, our promise remains timeless:",
  },
  finale: {
    lead: "Come with hesitation.",
    tail: "Walk away with fluency you will Live For Eternity.",
    ctaTrial: "Begin Your Journey: 10 Free Classes",
    ctaTalk: "Talk to Mani\u00A0Sir",
  },
  logoStory: {
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
    symbolsHeading: "Every part of the logo means something",
    symbols: [
      {
        title: "The Eagle",
        body: "Courage. Eagles rise above storms instead of hiding from them. You will rise above hesitation.",
      },
      {
        title: "Wings Spread Wide",
        body: "Freedom and open learning. No closed doors, no silly questions, no limits on what you can ask.",
      },
      {
        title: "The Rising Sun",
        body: "A fresh start in every class. Each time you speak, a new sun rises in your confidence.",
      },
      {
        title: "The Circle",
        body: "Eternity. One complete, unbroken journey: Live It For Eternity.",
      },
      {
        title: "Earth Brown",
        body: "Roots. Like your mother tongue, it is the ground you grow from, never something to hide.",
      },
    ],
  },
  promisesHeading: {
    eyebrow: "The 10 LIFE Promises",
    titleLead: "Ten commitments you won't find",
    titleGradient: "anywhere else.",
    description:
      "Straight from Mani\u00A0Sir's official orientation: a student-first approach that removes every barrier between you and fluent English.",
  },
  promises: [
    {
      title: "10 Days Free Demo Classes",
      description: "Not just 1 or 2 classes. Attend 10 full sessions before you decide.",
    },
    {
      title: "Monthly Fee Payment Option",
      description: "Pay small monthly instalments like school tuition. No heavy upfront burden.",
    },
    {
      title: "100% Face-to-Face Live Teaching",
      description: "Interactive two-way speaking practice. Never boring recorded videos.",
    },
    {
      title: "Real-Life Situational Learning",
      description:
        "Practical examples from your daily life, job and career, not dry bookish grammar rules.",
    },
    {
      title: "Free Repeat Batch Guarantee",
      description: "Finished the course and want more polish? Repeat the next batch for ₹0.",
    },
    {
      title: "Flexible Weekend Backup",
      description:
        "Students who miss weekday sessions receive personalized on-demand makeup classes on Saturday and Sunday directly with Mani\u00A0Sir.",
    },
    {
      title: "Complete Soft Skills & Drafting",
      description: "Master professional email writing, formal drafting and corporate etiquette.",
    },
    {
      title: "Equal Teaching & Speaking Drills",
      description: "50% concept explanation + 50% active speaking practice, every session.",
    },
    {
      title: "Vernacular-Friendly (Telugu → English)",
      description: "Designed to remove the fear of English for Telugu-medium learners.",
    },
    {
      title: "Open Learning Environment",
      description: "Basic track students can freely ask questions from advanced modules too.",
    },
  ],
  audiencesHeading: {
    eyebrow: "Who It's For",
    titleLead: "Built for everyone who has ever",
    titleGradient: "hesitated to speak.",
    description:
      "Whether you're facing your first campus interview, speaking up at a parents' meeting, or leading a client call, LIFE meets you exactly where you are.",
  },
  audiences: [
    {
      title: "College Students & Freshers",
      description: "Prepare for placement interviews and campus GDs with real practice.",
    },
    {
      title: "Homemakers",
      description: "Overcome hesitation and speak confidently in social and daily life.",
    },
    {
      title: "Working Professionals & IT Engineers",
      description: "Polish corporate communication, email drafting and meeting presence.",
    },
    {
      title: "Telugu-Medium Learners",
      description: "Leave fear, stage fright and English hesitation behind, step by step.",
    },
  ],
  approach: {
    badge: "The LIFE Approach",
    description:
      "Live, face-to-face speaking practice rooted in real-life situations, with equal focus on understanding concepts and speaking them aloud, explained in a Telugu-friendly way so no learner is left behind.",
  },
  teaser: {
    eyebrow: "Our Story",
    headlineLead: "Meet Mani\u00A0Sir and the meaning of",
    ariaLabelRead: "Read Mani Sir's story",
    ctaJourney: "Read Our Journey",
    ctaLogoStory: "The Story Inside Our Logo",
    ctaGallery: "Gallery",
  },
  reel: {
    eyebrow: "Real Classes, Real Energy",
    title: "See Mani\u00A0Sir in action",
    description: "Tap any lesson to play it right here. Swipe for more.",
    galleryButton: "Open the Gallery",
    youtubeButton: "More on YouTube",
    ariaLabel: "Mani Sir video lessons",
  },
};

export type GalleryCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  titleLead: string;
  titleGradient: string;
  description: string;
  shareSection: {
    title: string;
    description: string;
    cta: string;
    message: string;
  };
  socials: {
    youtubeTitle: string;
    youtubeHandle: string;
    instagramTitle: string;
    instagramHandle: string;
  };
  filters: Record<string, string>;
  videoBadge: string;
  filterAriaLabel: string;
};

export const galleryCopy: GalleryCopy = {
  metaTitle: "Gallery: Real Classes & Lessons with Mani Sir",
  metaDescription:
    "Photos and real video lessons from LIFE Spoken English & Soft Skills Institute, Madhurawada, Visakhapatnam: Mani Sir in the classroom, everyday English lessons, and live online batches.",
  breadcrumb: "Gallery",
  titleLead: "Real classes.",
  titleGradient: "Real energy.",
  description:
    "A peek inside LIFE: Mani\u00A0Sir in the classroom, everyday English lessons explained from Telugu to English, and our live online batches. Tap any video to play it right here.",
  shareSection: {
    title: "Were you part of a LIFE batch?",
    description:
      "Share your classroom photo, stage moment or success story. With your permission, we would love to feature it here and inspire the next learner who is still hesitating.",
    cta: "Share your LIFE moment",
    message:
      "Hello Mani Sir, I would like to share a photo or video from my LIFE class for the website gallery.",
  },
  socials: {
    youtubeTitle: "Subscribe on YouTube",
    youtubeHandle: "@englishbymanisir",
    instagramTitle: "Follow on Instagram",
    instagramHandle: "@english.by.mani.sir",
  },
  filters: {
    all: "All",
    classroom: "Classroom",
    success: "Student Success",
    event: "Events",
    lesson: "Lessons",
    batch: "Batches & Orientation",
  },
  videoBadge: "Video",
  filterAriaLabel: "Filter gallery",
};

export type EnrollmentCopy = {
  sectionHeading: {
    eyebrow: string;
    titleLead: string;
    titleGradient: string;
    description: string;
  };
  benefits: string[];
  limitedSeatsLabel: string;
  formHeading: string;
  formSubheading: string;
  fieldLabels: {
    fullName: string;
    phoneNumber: string;
    category: string;
    course: string;
    mode: string;
  };
  placeholders: {
    name: string;
    phone: string;
  };
  validationErrors: {
    name: string;
    phone: string;
    consent: string;
  };
  consent: {
    agreeText: string;
    policyLinkText: string;
    minorNote: string;
  };
  submitButton: string;
  status: {
    opening: string;
    privacyNote: string;
  };
  modal: {
    title: string;
    description: string;
  };
  buildWhatsAppMessage: (reg: {
    name: string;
    phone: string;
    category: string;
    mode: string;
    course: string;
  }) => string;
};

export const enrollmentCopy: EnrollmentCopy = {
  sectionHeading: {
    eyebrow: "Instant Booking",
    titleLead: "Book your seat in",
    titleGradient: "under a minute.",
    description:
      "Fill in your details and we'll open WhatsApp with a ready-to-send message to Mani\u00A0Sir. Just tap send.",
  },
  benefits: [
    "10 full live classes, absolutely free",
    "Classroom in Madhurawada or Live Online",
    "No upfront payment, no lock-in",
    "Direct reply from Mani\u00A0Sir on WhatsApp",
    `${courseCopy.admissionTerms.booklet.title} for every enrolled learner`,
    courseCopy.admissionTerms.eligibility,
  ],
  limitedSeatsLabel: "Limited seats:",
  formHeading: "Register for 10 Free Classes",
  formSubheading: `New batches starting soon. Only ${courseCopy.admissionTerms.capacityShort}.`,
  fieldLabels: {
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    category: "I am a",
    course: "Course of Interest",
    mode: "Preferred Mode",
  },
  placeholders: {
    name: "e.g. Lakshmi Prasanna",
    phone: "98765 43210",
  },
  validationErrors: {
    name: "Please enter your full name.",
    phone: "Please enter a valid 10-digit Indian mobile number.",
    consent: "Please tick the box to agree before continuing.",
  },
  consent: {
    agreeText:
      "I agree to share these details with LIFE on WhatsApp to receive trial and batch information, as explained in the",
    policyLinkText: "Privacy Policy",
    minorNote: "Learner under 18? Please ask a parent or guardian to fill this form.",
  },
  submitButton: "Register for 10 Free Classes via WhatsApp",
  status: {
    opening: "Opening WhatsApp… just tap send to confirm.",
    privacyNote:
      "Nothing is stored on this website. Your message goes only to Mani\u00A0Sir on WhatsApp. No spam, ever.",
  },
  modal: {
    title: "Claim Your 10 Free Trial Classes",
    description:
      "No fee, no commitment. Share a few details and continue on WhatsApp with Mani\u00A0Sir.",
  },
  buildWhatsAppMessage: ({ name, phone, category, mode, course }) =>
    [
      "Hello Mani Sir,",
      "",
      "I would like to register for the 10 Free Trial Classes at LIFE Spoken English & Soft Skills Institute.",
      "",
      `• Name: ${name}`,
      `• Phone: +91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      `• I am a: ${category}`,
      `• Course of Interest: ${course}`,
      `• Preferred Mode: ${mode}`,
      "",
      "Kindly share the upcoming batch timings. Thank you!",
    ].join("\n"),
};

export type ContactCopy = {
  eyebrow: string;
  titleLead: string;
  titleGradient: string;
  description: string;
  directionsButton: string;
  classTimingsHeading: string;
  phoneLabel: string;
  mapTitle: string;
};

export const contactCopy: ContactCopy = {
  eyebrow: "Location & Contact",
  titleLead: "Visit us in",
  titleGradient: "Madhurawada, Vizag.",
  description: "Drop by the centre for a chat, or call to reserve your free trial seat in the next batch.",
  directionsButton: "Get Directions",
  classTimingsHeading: "Class Timings",
  phoneLabel: "Mani\u00A0Sir Direct: Offline & Online Batches",
  mapTitle: "Map showing LIFE Spoken English Institute in Madhurawada, Visakhapatnam",
};

export type VideoShowcaseCopy = {
  eyebrow: string;
  titleLead: string;
  titleGradient: string;
  description: string;
  orientationTitle: string;
  galleryCta: string;
  googleRatingSnippet: string;
};

export const videoShowcaseCopy: VideoShowcaseCopy = {
  eyebrow: "Video Tour",
  titleLead: "Meet Mani\u00A0Sir",
  titleGradient: "before your first class.",
  description:
    "Watch the official orientation to understand exactly how LIFE classes work, then follow along for daily English tips.",
  orientationTitle: "LIFE Spoken English: Official Orientation by Mani\u00A0Sir",
  galleryCta: "See all lessons in the Gallery",
  googleRatingSnippet: `Rated ${SITE.rating.value} by ${SITE.rating.label} learners on Google`,
};

export type AnnouncementCopy = {
  bannerFallbackBadge: string;
  bannerFallbackMessage: string;
  barPrefix: string;
  barBatchNotice: string;
  barFreeNotice: string;
  barZeroPaymentNotice: string;
};

export const announcementCopy: AnnouncementCopy = {
  bannerFallbackBadge: "New Batch",
  bannerFallbackMessage:
    "New batches are starting soon. Book your 10 free trial classes with Mani\u00A0Sir today.",
  barPrefix: "🎉",
  barBatchNotice: "New Offline & Online Batches Starting Soon",
  barFreeNotice: "Attend First 10 Classes 100% Free",
  barZeroPaymentNotice: "Zero Upfront Payment",
};

export type AboutPageCopy = {
  title: string;
  description: string;
  breadcrumb: string;
  headlineLead: string;
  headlineGradient: string;
  classroomHeading: string;
  ctaLearn: string;
  ctaWatch: string;
};

export const aboutPageCopy: AboutPageCopy = {
  title: "About LIFE & Mani Sir: Our Story Since 2018",
  description:
    "Meet Mani Sir (K. Maneendra Kumar), founder of LIFE Spoken English & Soft Skills Institute in Madhurawada, Visakhapatnam. Discover the meaning of LIFE: Live It For Eternity, the story inside our logo, and our journey since 2018.",
  breadcrumb: "About LIFE",
  headlineLead: "Meet",
  headlineGradient: SITE.founderAlias,
  classroomHeading: "Inside Mani\u00A0Sir's classroom",
  ctaLearn: `Learn with ${SITE.founderAlias}: 10 Free Classes`,
  ctaWatch: "Watch his lessons",
};

export type LegalCopy = {
  lastUpdated: string;
  privacy: {
    title: string;
    breadcrumb: string;
    description: string;
  };
  terms: {
    title: string;
    breadcrumb: string;
    description: string;
  };
};

export const legalCopy: LegalCopy = {
  lastUpdated: "11 October 2026",
  privacy: {
    title: "Privacy Policy & Data Notice",
    breadcrumb: "Privacy Policy",
    description:
      "How LIFE Spoken English & Soft Skills Institute handles your personal data: no cookies, no tracking, enquiries only via WhatsApp, and your rights under India's Digital Personal Data Protection Act, 2023.",
  },
  terms: {
    title: "Terms of Use & Class Policies",
    breadcrumb: "Terms of Use",
    description:
      "Terms of use for the LIFE Spoken English & Soft Skills Institute website, and how our free trial, monthly fees, batches and backup sessions work.",
  },
};

export const SITE_COPY = {
  brand: brandCopy,
  hero: heroCopy,
  course: courseCopy,
  founder: founderCopy,
  faq: faqCopy,
  testimonials: testimonialsCopy,
  story: storyCopy,
  gallery: galleryCopy,
  enrollment: enrollmentCopy,
  contact: contactCopy,
  videoShowcase: videoShowcaseCopy,
  announcement: announcementCopy,
  aboutPage: aboutPageCopy,
  legal: legalCopy,
} as const;

export default SITE_COPY;
