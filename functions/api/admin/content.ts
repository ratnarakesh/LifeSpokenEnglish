import {
  ADMIN_COOKIE_NAME,
  cleanText,
  jsonResponse,
  parseCookies,
  verifySession,
  type Env,
} from "./_shared";

interface EventContext {
  request: Request;
  env: Env;
}

export interface AdminAnnouncement {
  message: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

export interface AdminSiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  primaryPhone: string;
  whatsappNumber: string;
  address: string;
  trialTerms: string;
  promises?: string[];
  workingHours?: string;
  batchTimings?: string;
  logoStory?: string;
  logoStoryEagle?: string;
  lifeAcronymL?: string;
  lifeAcronymI?: string;
  lifeAcronymF?: string;
  lifeAcronymE?: string;
  trialBadgeText?: string;
  heroSubheadline?: string;
  coursesSectionTitle?: string;
  coursesSectionSubtitle?: string;
  promisesSectionTitle?: string;
  promisesSectionSubtitle?: string;
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  whatsappMessage?: string;
}

export interface AdminStoryLore {
  eagleStoryTitle: string;
  eagleStorySubtitle: string;
  eagleStoryParagraphs: string;
  eagleStoryMoral: string;
  spiritOfLifeTitle: string;
  spiritOfLifeIntro: string;
  spiritOfLifePoints: string;
  pillarLTitle: string;
  pillarLText: string;
  pillarITitle: string;
  pillarIText: string;
  pillarFTitle: string;
  pillarFText: string;
  pillarETitle: string;
  pillarEText: string;
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: "Classroom" | "Lessons" | "Orientation" | "Student Success" | "Event";
  mediaType: "Photo" | "Video";
  youtubeUrl?: string | null;
  youtubeId?: string | null;
  imageUrl?: string | null;
  order: number;
}

export interface AdminCourseTrack {
  id: string;
  title: string;
  trackId: string;
  description: string;
  highlights: string[];
  order: number;
}

export interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface AdminTestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
}

export interface AdminFounderProfile {
  name: string;
  title: string;
  bio: string;
  altText: string;
  portraitUrl?: string | null;
  storyHeadline?: string | null;
  spiritOfLifeTitle?: string | null;
  spiritOfLifeContent?: string | null;
  journeyMilestones?: string | null;
  teachingPhilosophy?: string | null;
  bioHeadline?: string | null;
  bioParagraphs?: string | null;
  missionStatement?: string | null;
  statsExperience?: string | null;
  statsStudents?: string | null;
  statsBatches?: string | null;
}

export interface AdminLegalDocument {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  content: string;
}

export interface FullAdminData {
  announcement: AdminAnnouncement;
  siteSettings: AdminSiteSettings;
  storyLore?: AdminStoryLore;
  galleryItems: AdminGalleryItem[];
  courseTracks: AdminCourseTrack[];
  faqItems: AdminFaqItem[];
  testimonials: AdminTestimonialItem[];
  founderProfile: AdminFounderProfile;
  legalDocuments: AdminLegalDocument[];
  isConfigured?: boolean;
}

export function extractYouTubeId(urlOrId: unknown): string | null {
  if (!urlOrId || typeof urlOrId !== "string") return null;
  const s = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const match = s.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export const DEFAULT_ADMIN_DATA: FullAdminData = {
  announcement: {
    message: "New batches are starting soon. Book your 10 free trial classes with Mani\u00A0Sir today.",
    ctaText: "New Batch",
    ctaUrl: "/#enroll",
    isActive: true,
  },
  siteSettings: {
    heroTitle: "Speak English with Fluency and Unstoppable Confidence.",
    heroSubtitle:
      "Practical, interactive Spoken English & Soft Skills training led personally by Mani\u00A0Sir. Learn without fear or grammar intimidation in Visakhapatnam or via Live Online classes.",
    primaryPhone: "+91 73374 12999",
    whatsappNumber: "+91 73374 12999",
    address:
      "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
    trialTerms:
      "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
    promises: [
      "10 Days Free Demo Classes: Attend 10 full sessions before you decide.",
      "Monthly Fee Payment Option: Pay small monthly instalments like school tuition. No heavy upfront burden.",
      "100% Face-to-Face Live Teaching: Interactive two-way speaking practice. Never boring recorded videos.",
      "Real-Life Situational Learning: Practical examples from your daily life, job and career, not dry bookish grammar rules.",
      "Free Repeat Batch Guarantee: Finished the course and want more polish? Repeat the next batch for ₹0.",
      "Flexible Weekend Backup: Students who miss weekday sessions receive personalized on-demand makeup classes on Saturday and Sunday directly with Mani\u00A0Sir.",
      "Complete Soft Skills & Drafting: Master professional email writing, formal drafting and corporate etiquette.",
      "Equal Teaching & Speaking Drills: 50% concept explanation + 50% active speaking practice, every session.",
      "Vernacular-Friendly (Telugu -> English): Designed to remove the fear of English for Telugu-medium learners.",
      "Open Learning Environment: Basic track students can freely ask questions from advanced modules too.",
    ],
    workingHours: "Monday to Friday: 6:00 AM to 10:00 PM, weekends for personal backup sessions",
    batchTimings:
      "Morning: 6:00 AM - 7:00 AM, 7:00 AM - 8:00 AM, 8:00 AM - 9:00 AM\nEvening: 5:00 PM - 6:00 PM, 6:00 PM - 7:00 PM, 7:00 PM - 8:00 PM, 8:00 PM - 9:00 PM\nOnline Live: Throughout the day\nWeekend: Saturday & Sunday on-demand personal backup sessions",
    logoStory:
      "Like an eagle renewing its wings on the mountaintop, every learner at LIFE sheds their old hesitation and rises into fluent, confident expression. L.I.F.E. stands for Live It For Eternity: English not as an academic subject, but as a living life skill you will carry forever.",
    logoStoryEagle:
      "High on a cliff above the Vizag coast, a young eagle sat at the edge of its nest every morning, watching the others soar.\n\nIt knew everything about flying. It had watched a thousand flights and could explain every feather. But each time the wind called, its wings stayed folded. What if I fall? What if they laugh?\n\nOne morning, an old eagle landed beside it. He did not lecture. He did not push. He simply said, \"Fly with me. Just a little today.\"\n\nThey stepped into the warm wind together. The young eagle wobbled, dipped, and then, for the very first time, it rose. Below them, over the sea, the sun was rising too.\n\nThat morning the young eagle learned something no book had taught it: it never needed more knowledge. It needed someone to fly beside it, and the courage to open its wings.\n\nEvery learner who walks into LIFE is that young eagle: full of knowledge, held back by fear. Our job is to fly beside you until your own wings take over.",
    lifeAcronymL: "Live",
    lifeAcronymI: "It",
    lifeAcronymF: "For",
    lifeAcronymE: "Eternity",
    trialBadgeText: "10 Days Free Trial",
    heroSubheadline:
      "Practical, interactive Spoken English & Soft Skills training led personally by Mani\u00A0Sir. Learn without fear or grammar intimidation in Visakhapatnam or via Live Online classes.",
    coursesSectionTitle: "Every Stage of English Fluency",
    coursesSectionSubtitle: "From foundational hesitation removal to stage-ready executive communication.",
    promisesSectionTitle: "The 10 LIFE Promises",
    promisesSectionSubtitle: "Ten commitments you won't find anywhere else, straight from Mani\u00A0Sir.",
    contactAddress:
      "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
    contactPhone: "+91 73374 12999",
    contactEmail: "lifebymanisir@gmail.com",
    whatsappMessage:
      "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.",
  },
  storyLore: {
    eagleStoryTitle: "The Young Eagle Who Was Afraid to Fly",
    eagleStorySubtitle: "The Story Inside Our Logo",
    eagleStoryParagraphs:
      "High on a cliff above the Vizag coast, a young eagle sat at the edge of its nest every morning, watching the others soar.\n\nIt knew everything about flying. It had watched a thousand flights and could explain every feather. But each time the wind called, its wings stayed folded. What if I fall? What if they laugh?\n\nOne morning, an old eagle landed beside it. He did not lecture. He did not push. He simply said, \"Fly with me. Just a little today.\"\n\nThey stepped into the warm wind together. The young eagle wobbled, dipped, and then, for the very first time, it rose. Below them, over the sea, the sun was rising too.\n\nThat morning the young eagle learned something no book had taught it: it never needed more knowledge. It needed someone to fly beside it, and the courage to open its wings.",
    eagleStoryMoral:
      "Every learner who walks into LIFE is that young eagle: full of knowledge, held back by fear. Our job is to fly beside you until your own wings take over.",
    spiritOfLifeTitle: "The Meaning Behind Our Name",
    spiritOfLifeIntro:
      "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.\n\nWhen you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
    spiritOfLifePoints: JSON.stringify(
      [
        "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.",
        "When you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
      ],
      null,
      2,
    ),
    pillarLTitle: "Live",
    pillarLText: "English not as an academic subject, but as a living life skill you will carry forever.",
    pillarITitle: "It",
    pillarIText: "Language lives on your tongue, not in a notebook. Active speaking drills from day one.",
    pillarFTitle: "For",
    pillarFText: "Purpose-driven communication for campus placements, corporate growth, and life.",
    pillarETitle: "Eternity",
    pillarEText: "Unshakeable confidence that stays with you forever and transforms how you carry yourself.",
  },
  founderProfile: {
    name: "Mani\u00A0Sir",
    title: "Founder, Director & Lead Trainer",
    bio: "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
    altText: "Mani\u00A0Sir in the LIFE Spoken English classroom, Madhurawada",
    portraitUrl: "/media/people/mani-sir-portrait-v2.webp",
    storyHeadline: "Meet Mani\u00A0Sir, the heart of LIFE",
    spiritOfLifeTitle: "The Meaning Behind Our Name",
    spiritOfLifeContent:
      "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.\n\nWhen you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
    journeyMilestones: JSON.stringify(
      [
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
      null,
      2,
    ),
    teachingPhilosophy:
      "Some teachers teach English. Mani\u00A0Sir teaches people to believe in their own voice.\n\nK. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
    bioHeadline: "Teaching with Empathy & Conviction",
    bioParagraphs:
      "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.\n\nIn his classroom, mistakes are not punished; they are welcomed as proof that you are trying. Lessons sound like real life: waking up, travelling, explaining, negotiating, interviewing. A new word is not finished until every student has said it aloud and used it in a sentence of their own.\n\nBy bridging every idea from Telugu to English, he turns the language people feared most into something that feels familiar. Students often say his classes feel more like watching a movie than sitting through a lecture.\n\nToday his lessons travel far beyond one classroom through YouTube and live online batches. But the goal has never changed: the day each student speaks without fear.",
    missionStatement:
      "To eliminate the fear of English and empower learners with unshakeable speaking confidence that lasts for eternity.",
    statsExperience: "20+ Years",
    statsStudents: "25,000+ Students",
    statsBatches: "1,200+ Batches",
  },
  galleryItems: [
    {
      id: "mani-sir-classroom",
      title: "Mani\u00A0Sir in the LIFE classroom, Madhurawada",
      category: "Classroom",
      mediaType: "Photo",
      imageUrl: "/media/people/mani-sir-classroom-v2.webp",
      order: 1,
    },
    {
      id: "video-4LtuKMa_cIQ",
      title: "Wake up, Get up or Rise?",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "4LtuKMa_cIQ",
      youtubeUrl: "https://www.youtube.com/watch?v=4LtuKMa_cIQ",
      imageUrl: "https://img.youtube.com/vi/4LtuKMa_cIQ/hqdefault.jpg",
      order: 2,
    },
    {
      id: "video-5WTLd30TzjE",
      title: "In a fit of anger or rage (కోపంలో)",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "5WTLd30TzjE",
      youtubeUrl: "https://www.youtube.com/watch?v=5WTLd30TzjE",
      order: 3,
    },
    {
      id: "video-SwTh5KpmYJo",
      title: "Common Errors 14: Can vs Able to",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "SwTh5KpmYJo",
      youtubeUrl: "https://www.youtube.com/watch?v=SwTh5KpmYJo",
      order: 4,
    },
    {
      id: "video-7eD_4PgSrYs",
      title: "New online batch: 26 May 2025",
      category: "Orientation",
      mediaType: "Video",
      youtubeId: "7eD_4PgSrYs",
      youtubeUrl: "https://www.youtube.com/watch?v=7eD_4PgSrYs",
      order: 5,
    },
    {
      id: "video-Er5SNUeJwmk",
      title: "Official orientation by Mani\u00A0Sir",
      category: "Orientation",
      mediaType: "Video",
      youtubeId: "Er5SNUeJwmk",
      youtubeUrl: "https://www.youtube.com/watch?v=Er5SNUeJwmk",
      order: 6,
    },
  ],
  courseTracks: [
    {
      id: "life-course-everyday",
      trackId: "everyday",
      title: "Everyday Spoken English & Confidence",
      description: "Overcome fear, hesitation and stage fright in daily conversations.",
      highlights: [
        "Interactive situational speaking practice",
        "Overcoming hesitation and Mother Tongue Influence",
        "Everyday vocabulary for home, market and travel",
        "Telugu to English natural bridge technique",
      ],
      order: 1,
    },
    {
      id: "life-course-business",
      trackId: "business",
      title: "Corporate English & Professional Drafting",
      description: "Command meetings, write clear emails and present with authority.",
      highlights: [
        "Formal corporate email writing and reporting",
        "Client presentation and meeting dialogue",
        "Cross-cultural workplace communication",
        "Grammar accuracy without confusing jargon",
      ],
      order: 2,
    },
    {
      id: "life-course-interviews",
      trackId: "interviews",
      title: "Job Interview & Career Placement",
      description: "Crack HR rounds, GDs and technical interviews with ease.",
      highlights: [
        "Mock HR and technical interview drills",
        "Group Discussion techniques and leadership",
        "Resume and LinkedIn profile optimization",
        "Salary negotiation and self-introduction mastery",
      ],
      order: 3,
    },
    {
      id: "life-course-public-speaking",
      trackId: "public-speaking",
      title: "Public Speaking & Soft Skills",
      description: "Stand on stage, hold the microphone and speak without notes.",
      highlights: [
        "Stage presence and microphone handling",
        "Body language and audience eye contact",
        "Impromptu speaking (JAM sessions)",
        "Voice modulation and impactful storytelling",
      ],
      order: 4,
    },
    {
      id: "life-course-telugu-bridge",
      trackId: "telugu-bridge",
      title: "Telugu-Medium Learner Special Foundation",
      description: "Start from zero without shame; bridge your thoughts into English.",
      highlights: [
        "Bilingual explanation (Telugu to English)",
        "Zero grammatical intimidation",
        "Pronunciation corrections and tongue twisters",
        "Safe, compassionate classroom environment",
      ],
      order: 5,
    },
  ],
  faqItems: [
    {
      id: "life-faq-1",
      question: "Is the 10-day trial completely free?",
      answer:
        "Yes, 100% free with zero registration fee, advance payment or credit card requirement. Attend 10 full live classes, experience the methodology, and decide only if you see real progress.",
      category: "Trial & Fees",
      order: 1,
    },
    {
      id: "life-faq-2",
      question: "What are the fees after the 10-day trial?",
      answer:
        "After your trial, the fee is ₹3,000 for the first month (which includes your lifetime printed workbook and materials) and ₹2,000 per month thereafter. You pay month-to-month with no long-term lock-in.",
      category: "Trial & Fees",
      order: 2,
    },
    {
      id: "life-faq-3",
      question: "Can I join if I studied in Telugu medium and have zero English background?",
      answer:
        "Absolutely. More than 70% of our students come from Telugu medium or government school backgrounds. Mani\u00A0Sir explains foundational concepts using Telugu bridges so you understand without fear.",
      category: "Eligibility & Language",
      order: 3,
    },
    {
      id: "life-faq-4",
      question: "What are the daily batch timings?",
      answer:
        "We conduct batches throughout the day from 6:00 AM to 10:00 PM on weekdays. Both offline classroom batches in Madhurawada and live interactive online sessions via Google Meet are available.",
      category: "Schedule & Batches",
      order: 4,
    },
    {
      id: "life-faq-5",
      question: "What if I miss a weekday session?",
      answer:
        "We offer flexible weekend makeup classes on Saturday and Sunday. Mani\u00A0Sir personally reviews missed concepts so you never lag behind.",
      category: "Missed Classes & Support",
      order: 5,
    },
  ],
  testimonials: [
    {
      id: "life-testimonial-1",
      name: "Rajesh Kumar",
      role: "Software Engineer, Visakhapatnam",
      quote:
        "Before joining LIFE, I couldn't speak two sentences in team standups without sweating. Within 3 weeks of Mani\u00A0Sir's live practice, my hesitation completely vanished.",
      rating: 5,
      order: 1,
    },
    {
      id: "life-testimonial-2",
      name: "Sneha Reddy",
      role: "Homemaker, Madhurawada",
      quote:
        "I was terrified of attending my child's school PTMs because the teachers spoke in English. Mani\u00A0Sir gave me the confidence to speak fluently and proudly.",
      rating: 5,
      order: 2,
    },
    {
      id: "life-testimonial-3",
      name: "Venkat Rao",
      role: "Govt Employee, Vizag",
      quote:
        "Studied in Telugu medium all my life. Traditional institutes gave grammar notes that confused me more. LIFE taught me practical speaking without rote rules.",
      rating: 5,
      order: 3,
    },
  ],
  legalDocuments: [
    {
      id: "life-legal-privacy-policy",
      slug: "privacy-policy",
      title: "Privacy Policy & Data Notice",
      lastUpdated: "11 October 2026",
      content: JSON.stringify({
        intro:
          "We keep this simple: this website uses no cookies, no analytics and no tracking. We only receive your details when you choose to message or call us. This notice explains what we collect, why, and your rights under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.",
        sections: [
          {
            id: "who",
            title: "1. Who we are",
            paragraphs: [
              "LIFE Spoken English & Soft Skills Training Institute (\"LIFE\", \"we\"), run by K. Maneendra Kumar (Mani\u00A0Sir), First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh - 530041. For the personal data described here, LIFE is the Data Fiduciary.",
            ],
          },
          {
            id: "collect",
            title: "2. What we collect, and when",
            paragraphs: [
              "We do not collect passwords, payment card details, health information or any other sensitive data on this website.",
            ],
            bullets: [
              "Booking form: your name, mobile number, learner category, course of interest and preferred mode. The form does not send or store anything on our website. When you tap \"Register\", it opens WhatsApp with a ready-made message, and we receive it only if you press send.",
              "Calls and WhatsApp messages you send us directly, and anything you choose to share in them.",
              "Enrolled learners: the details needed to run your classes, such as name, contact number, batch and attendance.",
            ],
          },
          {
            id: "purpose",
            title: "3. Why we use it",
            paragraphs: [
              "We never sell your data, never add you to advertising lists, and do not share it with anyone except where the law requires.",
            ],
            bullets: [
              "To reply to your enquiry and arrange your 10 free trial classes.",
              "To share batch timings, schedule backup sessions and run your course.",
              "To keep basic records required by law.",
            ],
          },
          {
            id: "cookies",
            title: "4. Cookies and tracking",
            paragraphs: [
              "This website sets no cookies and uses no analytics, advertising pixels, fingerprinting or session recording. Because of this, there is no cookie banner to accept.",
              "To open instantly and work offline, your browser keeps a copy of the website's own files using its standard cache and a service worker. These files contain no personal information, and you can clear them at any time from your browser settings.",
            ],
          },
          {
            id: "third-party",
            title: "5. Third-party services (only when you choose)",
            paragraphs: [
              "Until you use one of these, your browser does not contact these services from our website.",
            ],
            bullets: [
              "WhatsApp (Meta): used when you tap a WhatsApp button. WhatsApp's own privacy policy applies to messages you send.",
              "YouTube (Google): videos load from the privacy-enhanced youtube-nocookie.com player, and only after you press play.",
              "Google Maps: the map loads only when you tap \"Load interactive map\" or open Google Maps.",
              "Instagram and YouTube channel links open those platforms, where their policies apply.",
            ],
          },
          {
            id: "children",
            title: "6. Learners under 18",
            paragraphs: [
              "LIFE welcomes school students. If the learner is under 18, the enquiry should be made by a parent or legal guardian, or with their permission. Before enrolling a minor, we confirm consent directly with the parent or guardian, as required by the Digital Personal Data Protection Act, 2023. We do not use children's data for tracking, profiling or advertising.",
            ],
          },
          {
            id: "retention",
            title: "7. How long we keep it",
            paragraphs: [
              "Enquiry details are kept only as long as needed to answer you and, if you join, for the duration of your course and any records the law requires. You can ask us to delete your details at any time.",
            ],
          },
          {
            id: "rights",
            title: "8. Your rights",
            paragraphs: [
              "Under the Digital Personal Data Protection Act, 2023, you can:",
            ],
            bullets: [
              "ask what personal data we hold about you and how we use it;",
              "ask us to correct, complete, update or erase it;",
              "withdraw your consent at any time (this does not affect anything done before);",
              "nominate another person to exercise these rights for you;",
              "raise a grievance with us, and if you are not satisfied, complain to the Data Protection Board of India.",
            ],
          },
          {
            id: "contact",
            title: "9. Contact and grievances",
            paragraphs: [
              "For any privacy question, request to exercise your rights, or grievance, contact our Grievance / Privacy contact:",
              "We will respond as early as possible and within the time limits set by law.",
            ],
            bullets: [
              "Name: Mani\u00A0Sir (K. Maneendra Kumar), Founder",
              "Email: lifebymanisir@gmail.com",
              "Phone: +91 73374 12999 (call or WhatsApp)",
              "Address: First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam - 530041",
            ],
          },
          {
            id: "security",
            title: "10. Security and changes",
            paragraphs: [
              "The website is served securely over HTTPS and stores no personal data on its servers. Records we keep are protected with reasonable security safeguards. If this notice changes, we will update the date above. See also our Terms of Use.",
            ],
          },
        ],
      }),
    },
    {
      id: "life-legal-terms-of-use",
      slug: "terms-of-use",
      title: "Terms of Use & Class Policies",
      lastUpdated: "11 October 2026",
      content: JSON.stringify({
        intro:
          "By using this website you agree to these terms. They also summarise how classes at LIFE Spoken English work, so there are no surprises.",
        sections: [
          {
            id: "website",
            title: "1. Using this website",
            paragraphs: [
              "This website gives information about LIFE's courses and lets you contact us. Please use it lawfully and do not attempt to disrupt it or misuse its content.",
            ],
          },
          {
            id: "information",
            title: "2. Course information and fees",
            paragraphs: [
              "We keep course details, timings and fees accurate and up to date, but they may change. The details confirmed by Mani\u00A0Sir on call or WhatsApp at the time you join apply.",
              "For any question about fees, payments or refunds, please speak to Mani\u00A0Sir directly before paying.",
            ],
            bullets: [
              "10-Class Free Trial: 10 live sessions with no fee and no advance payment. You may stop at any time during the trial.",
              "Regular Batch: ₹3,000 for the first month, then ₹2,000 per month, paid month by month.",
              "1-on-1 Personal Mentorship: ₹10,000 per month.",
              "Custom schedule requests: discuss your preferred timing directly with Mani\u00A0Sir.",
            ],
          },
          {
            id: "refunds",
            title: "3. Refund policy",
            paragraphs: [
              "10-Class Free Trial allows 100% risk-free evaluation. Once a monthly batch fee is paid, fees are non-refundable for that active calendar month due to the strict 15 - 20 student seat limit. Batch pauses or transfers for genuine emergencies may be granted at Mani\u00A0Sir's sole discretion.",
            ],
          },
          {
            id: "classes",
            title: "4. Batches, timings and backup sessions",
            paragraphs: [],
            bullets: [
              "Strict 15 - 20 student seat limit per batch.",
              "Classes run Monday to Friday, 6:00 AM to 10:00 PM. Weekends: Saturday & Sunday for personal backup sessions.",
              "Students who miss weekday sessions can take personalized on-demand makeup classes on Saturday and Sunday, arranged directly with Mani\u00A0Sir.",
              "Learners under 18 join with the consent of a parent or legal guardian.",
            ],
          },
          {
            id: "results",
            title: "5. Outcome disclaimer",
            paragraphs: [
              "LIFE Spoken English provides practical spoken communication and soft skills mentorship. We do not offer or guarantee job placements, employment contracts, or academic degrees. Individual fluency outcomes depend entirely on learner practice, attendance, and commitment.",
            ],
          },
          {
            id: "content",
            title: "6. Our content",
            paragraphs: [
              "The LIFE name and logo, the printed workbook, class material and videos belong to LIFE. Please do not copy or reuse them commercially without permission. Sharing links to our pages and videos is always welcome.",
            ],
          },
          {
            id: "links",
            title: "7. Other websites",
            paragraphs: [
              "Links to WhatsApp, YouTube, Instagram and Google Maps take you to services run by other companies under their own terms and privacy policies.",
            ],
          },
          {
            id: "law",
            title: "8. Governing law and contact",
            paragraphs: [
              "These terms are governed by the laws of India. For any question, concern or grievance, contact Mani\u00A0Sir at lifebymanisir@gmail.com or on +91 73374 12999. See our Privacy Policy for how we handle personal data.",
            ],
          },
        ],
      }),
    },
  ],
};

async function cmaFetch(
  base: string,
  token: string,
  path: string,
  options?: RequestInit,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/vnd.contentful.management.v1+json",
    ...(options?.headers ?? {}),
  };
  return fetch(`${base}${path}`, { ...options, headers });
}

export async function onRequestGet(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);

  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const space = context.env.CONTENTFUL_SPACE_ID;
  const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

  if (!space || !token) {
    return jsonResponse({ ...DEFAULT_ADMIN_DATA, isConfigured: false });
  }

  try {
    const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;

    const [entriesRes, rawAssetsRes] = await Promise.all([
      cmaFetch(base, token, "/entries?limit=1000"),
      cmaFetch(base, token, "/assets?limit=100"),
    ]);

    let assetsRes = rawAssetsRes;
    if (assetsRes.status === 429) {
      await new Promise((r) => setTimeout(r, 600));
      assetsRes = await cmaFetch(base, token, "/assets?limit=100");
    }

    const assetUrlMap = new Map<string, string>();
    if (assetsRes.ok) {
      const assetsJson = (await assetsRes.json()) as {
        items?: Array<{
          sys: { id: string };
          fields?: { file?: Record<string, { url?: string }> };
        }>;
      };
      if (Array.isArray(assetsJson.items)) {
        for (const a of assetsJson.items) {
          const f = a.fields?.file;
          const loc = f ? Object.keys(f)[0] : undefined;
          const raw = loc && f ? f[loc]?.url : undefined;
          if (raw) {
            assetUrlMap.set(a.sys.id, raw.startsWith("//") ? `https:${raw}` : raw);
          }
        }
      }
    }

    const entryMap = new Map<
      string,
      {
        sys: { id: string; contentType?: { sys?: { id?: string } } };
        fields?: Record<string, Record<string, unknown>>;
      }
    >();
    const entriesByContentType = new Map<
      string,
      Array<{
        sys: { id: string };
        fields?: Record<string, Record<string, unknown>>;
      }>
    >();

    if (entriesRes.ok) {
      const entriesJson = (await entriesRes.json()) as {
        items?: Array<{
          sys: { id: string; contentType?: { sys?: { id?: string } } };
          fields?: Record<string, Record<string, unknown>>;
        }>;
      };
      if (Array.isArray(entriesJson.items)) {
        for (const item of entriesJson.items) {
          entryMap.set(item.sys.id, item);
          const ct = item.sys.contentType?.sys?.id;
          if (ct) {
            const list = entriesByContentType.get(ct) || [];
            list.push(item);
            entriesByContentType.set(ct, list);
          }
        }
      }
    }

    const result = { ...DEFAULT_ADMIN_DATA };

    // 1. siteSettings
    const settingsEntry =
      entryMap.get("life-site-settings") || entriesByContentType.get("siteSettings")?.[0];
    if (settingsEntry) {
      const f = settingsEntry.fields ?? {};
      const locale = Object.keys(f.heroTitle ?? {})[0] ?? "en-US";
      const rawPromises = f.promises?.[locale];
      const promises = Array.isArray(rawPromises)
        ? rawPromises.map((p) => cleanText(p)).filter(Boolean)
        : result.siteSettings.promises;
      result.siteSettings = {
        heroTitle: cleanText(f.heroTitle?.[locale]) || result.siteSettings.heroTitle,
        heroSubtitle: cleanText(f.heroSubtitle?.[locale]) || result.siteSettings.heroSubtitle,
        primaryPhone: cleanText(f.primaryPhone?.[locale]) || result.siteSettings.primaryPhone,
        whatsappNumber: cleanText(f.whatsappNumber?.[locale]) || result.siteSettings.whatsappNumber,
        address: cleanText(f.address?.[locale]) || result.siteSettings.address,
        trialTerms: cleanText(f.trialTerms?.[locale]) || result.siteSettings.trialTerms,
        promises,
        workingHours: cleanText(f.workingHours?.[locale]) || result.siteSettings.workingHours,
        batchTimings: cleanText(f.batchTimings?.[locale]) || result.siteSettings.batchTimings,
        logoStory: cleanText(f.logoStory?.[locale]) || result.siteSettings.logoStory,
        logoStoryEagle: cleanText(f.logoStoryEagle?.[locale]) || result.siteSettings.logoStoryEagle,
        lifeAcronymL: cleanText(f.lifeAcronymL?.[locale]) || result.siteSettings.lifeAcronymL,
        lifeAcronymI: cleanText(f.lifeAcronymI?.[locale]) || result.siteSettings.lifeAcronymI,
        lifeAcronymF: cleanText(f.lifeAcronymF?.[locale]) || result.siteSettings.lifeAcronymF,
        trialBadgeText: cleanText(f.trialBadgeText?.[locale]) || result.siteSettings.trialBadgeText,
        heroSubheadline: cleanText(f.heroSubheadline?.[locale]) || result.siteSettings.heroSubheadline,
        coursesSectionTitle: cleanText(f.coursesSectionTitle?.[locale]) || result.siteSettings.coursesSectionTitle,
        coursesSectionSubtitle: cleanText(f.coursesSectionSubtitle?.[locale]) || result.siteSettings.coursesSectionSubtitle,
        promisesSectionTitle: cleanText(f.promisesSectionTitle?.[locale]) || result.siteSettings.promisesSectionTitle,
        promisesSectionSubtitle: cleanText(f.promisesSectionSubtitle?.[locale]) || result.siteSettings.promisesSectionSubtitle,
        contactAddress: cleanText(f.contactAddress?.[locale]) || result.siteSettings.contactAddress,
        contactPhone: cleanText(f.contactPhone?.[locale]) || result.siteSettings.contactPhone,
        contactEmail: cleanText(f.contactEmail?.[locale]) || result.siteSettings.contactEmail,
        whatsappMessage: cleanText(f.whatsappMessage?.[locale]) || result.siteSettings.whatsappMessage,
      };
    }

    // 2. announcement
    const annEntry =
      entryMap.get("life-announcement-default") || entriesByContentType.get("announcement")?.[0];
    if (annEntry) {
      const f = annEntry.fields ?? {};
      const locale = Object.keys(f.message ?? {})[0] ?? "en-US";
      result.announcement = {
        message: cleanText(f.message?.[locale]) || result.announcement.message,
        ctaText: cleanText(f.badgeText?.[locale]) || result.announcement.ctaText,
        ctaUrl: "/#enroll",
        isActive: f.isActive?.[locale] !== false,
      };
    }

    // 3. founderProfile
    const founderEntry =
      entryMap.get("life-founder-profile") ||
      entryMap.get("life-founder-mani-sir") ||
      entriesByContentType.get("founderProfile")?.[0];
    if (founderEntry) {
      const f = founderEntry.fields ?? {};
      const locale = Object.keys(f.name ?? {})[0] ?? "en-US";
      const pAssetId = (f.portraitImage?.[locale] as { sys?: { id?: string } } | undefined)?.sys?.id;
      const portraitUrl = pAssetId
        ? assetUrlMap.get(pAssetId) || "/media/people/mani-sir-portrait-v2.webp"
        : "/media/people/mani-sir-portrait-v2.webp";
      result.founderProfile = {
        name: cleanText(f.name?.[locale]) || result.founderProfile.name,
        title: cleanText(f.title?.[locale]) || result.founderProfile.title,
        bio: cleanText(f.bio?.[locale]) || result.founderProfile.bio,
        altText: cleanText(f.altText?.[locale]) || result.founderProfile.altText,
        portraitUrl,
        storyHeadline: cleanText(f.storyHeadline?.[locale]) || result.founderProfile.storyHeadline,
        spiritOfLifeTitle: cleanText(f.spiritOfLifeTitle?.[locale]) || result.founderProfile.spiritOfLifeTitle,
        spiritOfLifeContent: cleanText(f.spiritOfLifeContent?.[locale]) || result.founderProfile.spiritOfLifeContent,
        journeyMilestones: cleanText(f.journeyMilestones?.[locale]) || result.founderProfile.journeyMilestones,
        teachingPhilosophy: cleanText(f.teachingPhilosophy?.[locale]) || result.founderProfile.teachingPhilosophy,
        bioHeadline: cleanText(f.bioHeadline?.[locale]) || result.founderProfile.bioHeadline,
        bioParagraphs: cleanText(f.bioParagraphs?.[locale]) || result.founderProfile.bioParagraphs,
        missionStatement: cleanText(f.missionStatement?.[locale]) || result.founderProfile.missionStatement,
        statsExperience: cleanText(f.statsExperience?.[locale]) || result.founderProfile.statsExperience,
        statsStudents: cleanText(f.statsStudents?.[locale]) || result.founderProfile.statsStudents,
        statsBatches: cleanText(f.statsBatches?.[locale]) || result.founderProfile.statsBatches,
      };
      (result as Record<string, unknown>)._debug = {
        assetsResOk: assetsRes.ok,
        assetsResStatus: assetsRes.status,
        assetMapSize: assetUrlMap.size,
        assetMapKeys: Array.from(assetUrlMap.keys()),
        pAssetId,
        founderId: founderEntry.sys.id,
      };
    }

    // 3b. storyLore
    const loreEntry =
      entryMap.get("life-story-lore") || entriesByContentType.get("storyLore")?.[0];
    if (loreEntry) {
      const f = loreEntry.fields ?? {};
      const locale = Object.keys(f.eagleStoryTitle ?? {})[0] ?? "en-US";
      result.storyLore = {
        eagleStoryTitle: cleanText(f.eagleStoryTitle?.[locale]) || result.storyLore!.eagleStoryTitle,
        eagleStorySubtitle: cleanText(f.eagleStorySubtitle?.[locale]) || result.storyLore!.eagleStorySubtitle,
        eagleStoryParagraphs: cleanText(f.eagleStoryParagraphs?.[locale]) || result.storyLore!.eagleStoryParagraphs,
        eagleStoryMoral: cleanText(f.eagleStoryMoral?.[locale]) || result.storyLore!.eagleStoryMoral,
        spiritOfLifeTitle: cleanText(f.spiritOfLifeTitle?.[locale]) || result.storyLore!.spiritOfLifeTitle,
        spiritOfLifeIntro: cleanText(f.spiritOfLifeIntro?.[locale]) || result.storyLore!.spiritOfLifeIntro,
        spiritOfLifePoints: typeof f.spiritOfLifePoints?.[locale] === "string" ? cleanText(f.spiritOfLifePoints[locale] as string) : result.storyLore!.spiritOfLifePoints,
        pillarLTitle: cleanText(f.pillarLTitle?.[locale]) || "Live",
        pillarLText: cleanText(f.pillarLText?.[locale]) || result.storyLore!.pillarLText,
        pillarITitle: cleanText(f.pillarITitle?.[locale]) || "It",
        pillarIText: cleanText(f.pillarIText?.[locale]) || result.storyLore!.pillarIText,
        pillarFTitle: cleanText(f.pillarFTitle?.[locale]) || "For",
        pillarFText: cleanText(f.pillarFText?.[locale]) || result.storyLore!.pillarFText,
        pillarETitle: cleanText(f.pillarETitle?.[locale]) || "Eternity",
        pillarEText: cleanText(f.pillarEText?.[locale]) || result.storyLore!.pillarEText,
      };
    }

    // 4. galleryItems
    const rawGalleryItems = entriesByContentType.get("galleryItem");
    if (Array.isArray(rawGalleryItems) && rawGalleryItems.length > 0) {
      result.galleryItems = rawGalleryItems
        .map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.title ?? {})[0] ?? "en-US";
          const yUrl = cleanText(f.youtubeUrl?.[locale]) || null;
          const yId = extractYouTubeId(yUrl);
          const rawMediaType = f.mediaType ? Object.values(f.mediaType)[0] : "Video";
          const isPhoto = rawMediaType === "Photo";
          const imgAsset = f.image
            ? (Object.values(f.image)[0] as { sys?: { id?: string } } | undefined)
            : undefined;
          const imgAssetId = imgAsset?.sys?.id;
          let imageUrl: string | null = null;
          if (isPhoto) {
            imageUrl = imgAssetId
              ? assetUrlMap.get(imgAssetId) || "/media/people/mani-sir-classroom-v2.webp"
              : assetUrlMap.get("life-mani-sir-classroom") || "/media/people/mani-sir-classroom-v2.webp";
          } else if (yId) {
            imageUrl = `https://img.youtube.com/vi/${yId}/hqdefault.jpg`;
          }
          return {
            id: item.sys.id,
            title: cleanText(f.title?.[locale]) || "Gallery Item",
            category: (f.category?.[locale] as AdminGalleryItem["category"]) || "Lessons",
            mediaType: (isPhoto ? "Photo" : "Video") as "Photo" | "Video",
            youtubeUrl: yUrl,
            youtubeId: yId,
            imageUrl,
            order: typeof f.order?.[locale] === "number" ? (f.order[locale] as number) : 99,
          };
        })
        .sort((a, b) => a.order - b.order);
    }

    // 5. courseTracks
    const rawCourseTracks = entriesByContentType.get("courseTrack");
    if (Array.isArray(rawCourseTracks) && rawCourseTracks.length > 0) {
      result.courseTracks = rawCourseTracks
        .map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.title ?? {})[0] ?? "en-US";
          const rawHighlights = f.highlights?.[locale];
          const highlights = Array.isArray(rawHighlights)
            ? rawHighlights.map((h) => cleanText(h)).filter(Boolean)
            : [];
          return {
            id: item.sys.id,
            title: cleanText(f.title?.[locale]),
            trackId: cleanText(f.trackId?.[locale]) || item.sys.id,
            description: cleanText(f.description?.[locale]),
            highlights,
            order: typeof f.order?.[locale] === "number" ? (f.order[locale] as number) : 0,
          };
        })
        .sort((a, b) => a.order - b.order);
    }

    // 6. faqItems
    const rawFaqItems = entriesByContentType.get("faqItem");
    if (Array.isArray(rawFaqItems) && rawFaqItems.length > 0) {
      result.faqItems = rawFaqItems
        .map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.question ?? {})[0] ?? "en-US";
          return {
            id: item.sys.id,
            question: cleanText(f.question?.[locale]),
            answer: cleanText(f.answer?.[locale]),
            category: cleanText(f.category?.[locale]) || "General",
            order: typeof f.order?.[locale] === "number" ? (f.order[locale] as number) : 0,
          };
        })
        .sort((a, b) => a.order - b.order);
    }

    // 7. testimonials
    const rawTestimonials = entriesByContentType.get("testimonialItem");
    if (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) {
      result.testimonials = rawTestimonials
        .map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.name ?? {})[0] ?? "en-US";
          return {
            id: item.sys.id,
            name: cleanText(f.name?.[locale]),
            role: cleanText(f.role?.[locale]),
            quote: cleanText(f.quote?.[locale]),
            rating: typeof f.rating?.[locale] === "number" ? (f.rating[locale] as number) : 5,
            order: typeof f.order?.[locale] === "number" ? (f.order[locale] as number) : 0,
          };
        })
        .sort((a, b) => a.order - b.order);
    }

    // 8. legalDocuments
    const rawLegalDocuments = entriesByContentType.get("legalDocument");
    if (Array.isArray(rawLegalDocuments) && rawLegalDocuments.length > 0) {
      result.legalDocuments = rawLegalDocuments.map((item) => {
        const f = item.fields ?? {};
        const locale = Object.keys(f.title ?? {})[0] ?? "en-US";
        return {
          id: item.sys.id,
          slug: cleanText(f.slug?.[locale]),
          title: cleanText(f.title?.[locale]),
          lastUpdated: cleanText(f.lastUpdated?.[locale]),
          content: typeof f.content?.[locale] === "string" ? (f.content[locale] as string) : "",
        };
      });
    }

    return jsonResponse({ ...result, isConfigured: true });
  } catch {
    return jsonResponse({ ...DEFAULT_ADMIN_DATA, isConfigured: false });
  }
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);

  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as {
      announcement?: Partial<AdminAnnouncement>;
      siteSettings?: Partial<AdminSiteSettings>;
      storyLore?: Partial<AdminStoryLore>;
      founderProfile?: Partial<AdminFounderProfile>;
      galleryItems?: AdminGalleryItem[];
      deletedGalleryIds?: string[];
      courseTracks?: AdminCourseTrack[];
      faqItems?: AdminFaqItem[];
      deletedFaqIds?: string[];
      testimonials?: AdminTestimonialItem[];
      deletedTestimonialIds?: string[];
      legalDocuments?: AdminLegalDocument[];
    };

    const space = context.env.CONTENTFUL_SPACE_ID;
    const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

    if (!space || !token) {
      return jsonResponse(
        {
          error:
            "Cloudflare Environment Variables missing: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be added in Cloudflare Pages (Settings > Environment variables) to save live updates to Contentful.",
        },
        { status: 500 },
      );
    }

    const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;

    // 0. Pre-fetch all existing entries in ONE single subrequest to prevent Cloudflare subrequest limits
    const existingMap = new Map<
      string,
      { version: number; fields: Record<string, Record<string, unknown>> }
    >();
    try {
      const allEntriesRes = await cmaFetch(base, token, "/entries?limit=100");
      if (allEntriesRes.ok) {
        const json = (await allEntriesRes.json()) as {
          items?: Array<{
            sys: { id: string; version: number };
            fields?: Record<string, Record<string, unknown>>;
          }>;
        };
        if (Array.isArray(json.items)) {
          for (const item of json.items) {
            existingMap.set(item.sys.id, {
              version: item.sys.version,
              fields: item.fields || {},
            });
          }
        }
      }
    } catch {
      // Fall back if batch fetch fails
    }

    // Helper to upsert and publish a single CMA entry only if changed
    const upsertEntry = async (
      id: string,
      contentTypeId: string,
      fields: Record<string, unknown>,
    ) => {
      const locale = "en-US";
      const localizedFields = Object.fromEntries(
        Object.entries(fields).map(([k, v]) => [k, { [locale]: v }]),
      );

      const existing = existingMap.get(id);

      if (existing) {
        // Check if all fields match already: if so, skip to save subrequests!
        let hasChanges = false;
        for (const [key, val] of Object.entries(fields)) {
          const currentVal = existing.fields[key]?.[locale];
          if (JSON.stringify(currentVal) !== JSON.stringify(val)) {
            hasChanges = true;
            break;
          }
        }

        if (!hasChanges) {
          return;
        }

        const putRes = await cmaFetch(base, token, `/entries/${id}`, {
          method: "PUT",
          headers: { "X-Contentful-Version": String(existing.version) },
          body: JSON.stringify({ fields: { ...existing.fields, ...localizedFields } }),
        });
        if (putRes.ok) {
          const putJson = (await putRes.json()) as { sys: { version: number } };
          existing.version = putJson.sys.version;
          await cmaFetch(base, token, `/entries/${id}/published`, {
            method: "PUT",
            headers: { "X-Contentful-Version": String(putJson.sys.version) },
          });
        }
      } else {
        const putRes = await cmaFetch(base, token, `/entries/${id}`, {
          method: "PUT",
          headers: { "X-Contentful-Content-Type": contentTypeId },
          body: JSON.stringify({ fields: localizedFields }),
        });
        if (putRes.ok) {
          const putJson = (await putRes.json()) as { sys: { version: number } };
          existingMap.set(id, { version: putJson.sys.version, fields: localizedFields });
          await cmaFetch(base, token, `/entries/${id}/published`, {
            method: "PUT",
            headers: { "X-Contentful-Version": String(putJson.sys.version) },
          });
        }
      }
    };

    // Helper to unpublish and delete a single CMA entry
    const deleteEntry = async (id: string) => {
      const existing = existingMap.get(id);
      if (!existing) return;
      const unpubRes = await cmaFetch(base, token, `/entries/${id}/published`, {
        method: "DELETE",
        headers: { "X-Contentful-Version": String(existing.version) },
      });
      const unpubVersion = unpubRes.ok
        ? ((await unpubRes.json()) as { sys: { version: number } }).sys.version
        : existing.version;
      await cmaFetch(base, token, `/entries/${id}`, {
        method: "DELETE",
        headers: { "X-Contentful-Version": String(unpubVersion) },
      });
      existingMap.delete(id);
    };

      // 1. Update siteSettings
      if (body.siteSettings) {
        await upsertEntry("life-site-settings", "siteSettings", {
          ...(body.siteSettings.heroTitle && { heroTitle: cleanText(body.siteSettings.heroTitle) }),
          ...(body.siteSettings.heroSubtitle && { heroSubtitle: cleanText(body.siteSettings.heroSubtitle) }),
          ...(body.siteSettings.primaryPhone && { primaryPhone: cleanText(body.siteSettings.primaryPhone) }),
          ...(body.siteSettings.whatsappNumber && { whatsappNumber: cleanText(body.siteSettings.whatsappNumber) }),
          ...(body.siteSettings.address && { address: cleanText(body.siteSettings.address) }),
          ...(body.siteSettings.trialTerms && { trialTerms: cleanText(body.siteSettings.trialTerms) }),
          ...(Array.isArray(body.siteSettings.promises) && {
            promises: body.siteSettings.promises.map((p) => cleanText(p)).filter(Boolean),
          }),
          ...(body.siteSettings.workingHours && { workingHours: cleanText(body.siteSettings.workingHours) }),
          ...(body.siteSettings.batchTimings && { batchTimings: cleanText(body.siteSettings.batchTimings) }),
          ...(body.siteSettings.logoStory && { logoStory: cleanText(body.siteSettings.logoStory) }),
          ...(body.siteSettings.logoStoryEagle && { logoStoryEagle: cleanText(body.siteSettings.logoStoryEagle) }),
          ...(body.siteSettings.lifeAcronymL && { lifeAcronymL: cleanText(body.siteSettings.lifeAcronymL) }),
          ...(body.siteSettings.lifeAcronymI && { lifeAcronymI: cleanText(body.siteSettings.lifeAcronymI) }),
          ...(body.siteSettings.lifeAcronymF && { lifeAcronymF: cleanText(body.siteSettings.lifeAcronymF) }),
          ...(body.siteSettings.lifeAcronymE && { lifeAcronymE: cleanText(body.siteSettings.lifeAcronymE) }),
          ...(body.siteSettings.trialBadgeText && { trialBadgeText: cleanText(body.siteSettings.trialBadgeText) }),
          ...(body.siteSettings.heroSubheadline && { heroSubheadline: cleanText(body.siteSettings.heroSubheadline) }),
          ...(body.siteSettings.coursesSectionTitle && { coursesSectionTitle: cleanText(body.siteSettings.coursesSectionTitle) }),
          ...(body.siteSettings.coursesSectionSubtitle && { coursesSectionSubtitle: cleanText(body.siteSettings.coursesSectionSubtitle) }),
          ...(body.siteSettings.promisesSectionTitle && { promisesSectionTitle: cleanText(body.siteSettings.promisesSectionTitle) }),
          ...(body.siteSettings.promisesSectionSubtitle && { promisesSectionSubtitle: cleanText(body.siteSettings.promisesSectionSubtitle) }),
          ...(body.siteSettings.contactAddress && { contactAddress: cleanText(body.siteSettings.contactAddress) }),
          ...(body.siteSettings.contactPhone && { contactPhone: cleanText(body.siteSettings.contactPhone) }),
          ...(body.siteSettings.contactEmail && { contactEmail: cleanText(body.siteSettings.contactEmail) }),
          ...(body.siteSettings.whatsappMessage && { whatsappMessage: cleanText(body.siteSettings.whatsappMessage) }),
        });
      }

      // 1b. Update storyLore
      if (body.storyLore) {
        await upsertEntry("life-story-lore", "storyLore", {
          ...(body.storyLore.eagleStoryTitle && { eagleStoryTitle: cleanText(body.storyLore.eagleStoryTitle) }),
          ...(body.storyLore.eagleStorySubtitle && { eagleStorySubtitle: cleanText(body.storyLore.eagleStorySubtitle) }),
          ...(body.storyLore.eagleStoryParagraphs && { eagleStoryParagraphs: cleanText(body.storyLore.eagleStoryParagraphs) }),
          ...(body.storyLore.eagleStoryMoral && { eagleStoryMoral: cleanText(body.storyLore.eagleStoryMoral) }),
          ...(body.storyLore.spiritOfLifeTitle && { spiritOfLifeTitle: cleanText(body.storyLore.spiritOfLifeTitle) }),
          ...(body.storyLore.spiritOfLifeIntro && { spiritOfLifeIntro: cleanText(body.storyLore.spiritOfLifeIntro) }),
          ...(body.storyLore.spiritOfLifePoints && { spiritOfLifePoints: cleanText(body.storyLore.spiritOfLifePoints) }),
          ...(body.storyLore.pillarLTitle && { pillarLTitle: cleanText(body.storyLore.pillarLTitle) }),
          ...(body.storyLore.pillarLText && { pillarLText: cleanText(body.storyLore.pillarLText) }),
          ...(body.storyLore.pillarITitle && { pillarITitle: cleanText(body.storyLore.pillarITitle) }),
          ...(body.storyLore.pillarIText && { pillarIText: cleanText(body.storyLore.pillarIText) }),
          ...(body.storyLore.pillarFTitle && { pillarFTitle: cleanText(body.storyLore.pillarFTitle) }),
          ...(body.storyLore.pillarFText && { pillarFText: cleanText(body.storyLore.pillarFText) }),
          ...(body.storyLore.pillarETitle && { pillarETitle: cleanText(body.storyLore.pillarETitle) }),
          ...(body.storyLore.pillarEText && { pillarEText: cleanText(body.storyLore.pillarEText) }),
        });
      }

      // 2. Update announcement
      if (body.announcement) {
        await upsertEntry("life-announcement-default", "announcement", {
          ...(body.announcement.message && { message: cleanText(body.announcement.message) }),
          ...(body.announcement.ctaText !== undefined && { badgeText: cleanText(body.announcement.ctaText) }),
          ...(body.announcement.isActive !== undefined && { isActive: Boolean(body.announcement.isActive) }),
        });
      }

      // 3. Update founderProfile
      if (body.founderProfile) {
        const founderPayload = {
          ...(body.founderProfile.name && { name: cleanText(body.founderProfile.name) }),
          ...(body.founderProfile.title && { title: cleanText(body.founderProfile.title) }),
          ...(body.founderProfile.bio && { bio: cleanText(body.founderProfile.bio) }),
          ...(body.founderProfile.altText && { altText: cleanText(body.founderProfile.altText) }),
          ...(body.founderProfile.storyHeadline && { storyHeadline: cleanText(body.founderProfile.storyHeadline) }),
          ...(body.founderProfile.spiritOfLifeTitle && { spiritOfLifeTitle: cleanText(body.founderProfile.spiritOfLifeTitle) }),
          ...(body.founderProfile.spiritOfLifeContent && { spiritOfLifeContent: cleanText(body.founderProfile.spiritOfLifeContent) }),
          ...(body.founderProfile.journeyMilestones && { journeyMilestones: cleanText(body.founderProfile.journeyMilestones) }),
          ...(body.founderProfile.teachingPhilosophy && { teachingPhilosophy: cleanText(body.founderProfile.teachingPhilosophy) }),
          ...(body.founderProfile.bioHeadline && { bioHeadline: cleanText(body.founderProfile.bioHeadline) }),
          ...(body.founderProfile.bioParagraphs && { bioParagraphs: cleanText(body.founderProfile.bioParagraphs) }),
          ...(body.founderProfile.missionStatement && { missionStatement: cleanText(body.founderProfile.missionStatement) }),
          ...(body.founderProfile.statsExperience && { statsExperience: cleanText(body.founderProfile.statsExperience) }),
          ...(body.founderProfile.statsStudents && { statsStudents: cleanText(body.founderProfile.statsStudents) }),
          ...(body.founderProfile.statsBatches && { statsBatches: cleanText(body.founderProfile.statsBatches) }),
        };
        await upsertEntry("life-founder-profile", "founderProfile", founderPayload);
        await upsertEntry("life-founder-mani-sir", "founderProfile", founderPayload);
      }

      // 4. Update gallery items (adding/editing videos)
      if (Array.isArray(body.galleryItems)) {
        for (const item of body.galleryItems) {
          const yId = item.youtubeId || extractYouTubeId(item.youtubeUrl);
          const fields: Record<string, unknown> = {
            title: cleanText(item.title),
            category: item.category || "Lessons",
            mediaType: item.mediaType || "Video",
            order: Number(item.order) || 1,
            ...(item.youtubeUrl && { youtubeUrl: item.youtubeUrl.trim() }),
          };
          const itemId = item.id.startsWith("new-")
            ? `life-gallery-video-${yId || Date.now()}`
            : item.id;
          await upsertEntry(itemId, "galleryItem", fields);
        }
      }

      // 4b. Deleted gallery items
      if (Array.isArray(body.deletedGalleryIds)) {
        for (const id of body.deletedGalleryIds) {
          await deleteEntry(id);
        }
      }

      // 5. Update courseTracks
      if (Array.isArray(body.courseTracks)) {
        for (const track of body.courseTracks) {
          await upsertEntry(track.id, "courseTrack", {
            title: cleanText(track.title),
            trackId: cleanText(track.trackId) || track.id,
            description: cleanText(track.description),
            highlights: (track.highlights ?? []).map((h) => cleanText(h)).filter(Boolean),
            order: Number(track.order) || 1,
          });
        }
      }

      // 6. Update faqItems
      if (Array.isArray(body.faqItems)) {
        for (const faq of body.faqItems) {
          const faqId = faq.id.startsWith("new-") ? `life-faq-${Date.now()}` : faq.id;
          await upsertEntry(faqId, "faqItem", {
            question: cleanText(faq.question),
            answer: cleanText(faq.answer),
            category: cleanText(faq.category) || "Trial & Fees",
            order: Number(faq.order) || 1,
          });
        }
      }

      // 6b. Deleted FAQ items
      if (Array.isArray(body.deletedFaqIds)) {
        for (const id of body.deletedFaqIds) {
          await deleteEntry(id);
        }
      }

      // 7. Update testimonials
      if (Array.isArray(body.testimonials)) {
        for (const test of body.testimonials) {
          const testId = test.id.startsWith("new-") ? `life-testimonial-${Date.now()}` : test.id;
          await upsertEntry(testId, "testimonialItem", {
            name: cleanText(test.name),
            role: cleanText(test.role),
            quote: cleanText(test.quote),
            rating: Number(test.rating) || 5,
            order: Number(test.order) || 1,
          });
        }
      }

      // 7b. Deleted testimonials
      if (Array.isArray(body.deletedTestimonialIds)) {
        for (const id of body.deletedTestimonialIds) {
          await deleteEntry(id);
        }
      }

      // 8. Update legalDocuments
      if (Array.isArray(body.legalDocuments)) {
        for (const doc of body.legalDocuments) {
          const docId = doc.id || `life-legal-${doc.slug}`;
          await upsertEntry(docId, "legalDocument", {
            slug: cleanText(doc.slug),
            title: cleanText(doc.title),
            lastUpdated: cleanText(doc.lastUpdated),
            content: typeof doc.content === "string" ? doc.content : JSON.stringify(doc.content),
          });
        }
      }

      return jsonResponse({
        success: true,
        message:
          "Saved to CMS! Click 'Publish Changes to Live Site' when you are ready to update the public site.",
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update content";
    return jsonResponse({ error: message }, { status: 500 });
  }
}
