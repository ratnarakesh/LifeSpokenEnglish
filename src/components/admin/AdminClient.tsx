"use client";

import {
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Delete,
  ExternalLink,
  FileText,
  HelpCircle,
  Lock,
  LogOut,
  Megaphone,
  Phone,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  User,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { button, cn } from "@/lib/cn";
import { heroCopy } from "@/lib/site-copy";
import { PHONES } from "@/lib/site";
import type {
  AdminAnnouncement,
  AdminCourseTrack,
  AdminFaqItem,
  AdminFounderProfile,
  AdminGalleryItem,
  AdminLegalDocument,
  AdminSiteSettings,
  AdminStoryLore,
  AdminTestimonialItem,
  FullAdminData,
} from "../../../functions/api/admin/content";

type AdminTab =
  | "announcements"
  | "gallery"
  | "courses"
  | "faqs"
  | "reviews"
  | "story"
  | "legal";

const DEFAULT_ANNOUNCEMENT: AdminAnnouncement = {
  isActive: true,
  message: "New batches are starting soon. Book your 10 free trial classes with Mani\u00A0Sir today.",
  ctaText: "New Batch",
  ctaUrl: "/#enroll",
};

const DEFAULT_SETTINGS: AdminSiteSettings = {
  heroTitle: heroCopy.headlineFull,
  heroSubtitle: heroCopy.subheadline,
  primaryPhone: PHONES.primary.display,
  whatsappNumber: PHONES.primary.display,
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
  trialBadgeText: heroCopy.badgeText,
  heroSubheadline: heroCopy.subheadline,
  coursesSectionTitle: "Every Stage of English Fluency",
  coursesSectionSubtitle: "From foundational hesitation removal to stage-ready executive communication.",
  promisesSectionTitle: "The 10 LIFE Promises",
  promisesSectionSubtitle: "Ten commitments you won't find anywhere else, straight from Mani\u00A0Sir.",
  contactAddress:
    "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
  contactPhone: PHONES.primary.display,
  contactEmail: "lifebymanisir@gmail.com",
  whatsappMessage:
    "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.",
};

const DEFAULT_LEGAL_DOCS: AdminLegalDocument[] = [
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
];

const DEFAULT_FOUNDER: AdminFounderProfile = {
  name: "Mani\u00A0Sir",
  title: "Founder, Director & Lead Trainer",
  bio: "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
  altText: "Mani\u00A0Sir in the LIFE Spoken English classroom, Madhurawada",
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
};

const DEFAULT_STORY_LORE: AdminStoryLore = {
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
};

export function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("announcements");

  // Content states
  const [announcement, setAnnouncement] = useState<AdminAnnouncement>(DEFAULT_ANNOUNCEMENT);
  const [siteSettings, setSiteSettings] = useState<AdminSiteSettings>(DEFAULT_SETTINGS);
  const [storyLore, setStoryLore] = useState<AdminStoryLore>(DEFAULT_STORY_LORE);
  const [founderProfile, setFounderProfile] = useState<AdminFounderProfile>(DEFAULT_FOUNDER);
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]);
  const [courseTracks, setCourseTracks] = useState<AdminCourseTrack[]>([]);
  const [faqItems, setFaqItems] = useState<AdminFaqItem[]>([]);
  const [deletedFaqIds, setDeletedFaqIds] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>([]);
  const [deletedTestimonialIds, setDeletedTestimonialIds] = useState<string[]>([]);
  const [legalDocuments, setLegalDocuments] = useState<AdminLegalDocument[]>(DEFAULT_LEGAL_DOCS);

  // FAQ Accordion expanded IDs
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // New video form state
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState<AdminGalleryItem["category"]>("Lessons");

  // Gallery Photo upload state
  const [galleryAddMode, setGalleryAddMode] = useState<"video" | "photo">("video");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState<AdminGalleryItem["category"]>("Classroom");
  const [photoOrder, setPhotoOrder] = useState<number>(1);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState<string | null>(null);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);

  // Founder Portrait upload state
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);
  const [activePortraitUrl, setActivePortraitUrl] = useState<string>("/media/people/mani-sir-portrait-v2.webp");
  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);
  const [portraitUploadSuccess, setPortraitUploadSuccess] = useState<string | null>(null);
  const [portraitUploadError, setPortraitUploadError] = useState<string | null>(null);

  // Replace gallery photo state
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);
  const [replacePhotoSuccess, setReplacePhotoSuccess] = useState<string | null>(null);
  const [replacePhotoError, setReplacePhotoError] = useState<string | null>(null);

  // Cloudflare Pages / Contentful configuration status
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  // New FAQ form state
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("Trial & Fees");

  // New Review form state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewQuote, setNewReviewQuote] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  function handlePromiseChange(index: number, value: string) {
    setSiteSettings((prev) => {
      const currentPromises =
        prev.promises && prev.promises.length > 0 ? [...prev.promises] : [...DEFAULT_SETTINGS.promises!];
      currentPromises[index] = value;
      return { ...prev, promises: currentPromises };
    });
  }

  function handleLegalDocChange(slug: string, field: keyof AdminLegalDocument, value: string) {
    setLegalDocuments((prev) =>
      prev.map((doc) => (doc.slug === slug ? { ...doc, [field]: value } : doc)),
    );
  }

  // Check auth session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = (await res.json()) as { authenticated?: boolean };
          if (data.authenticated) {
            setIsAuthenticated(true);
            loadContent();
            return;
          }
        }
      } catch {
        // Fallback for dev / static mode
      }
      setIsAuthenticated(false);
    }
    checkAuth();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = (await res.json()) as Partial<FullAdminData>;
        if (data.announcement) setAnnouncement((prev) => ({ ...prev, ...data.announcement }));
        if (data.siteSettings) setSiteSettings((prev) => ({ ...prev, ...data.siteSettings }));
        if (data.storyLore) setStoryLore((prev) => ({ ...prev, ...data.storyLore }));
        if (data.founderProfile) {
          setFounderProfile((prev) => ({ ...prev, ...data.founderProfile }));
          if (data.founderProfile.portraitUrl) {
            setActivePortraitUrl(data.founderProfile.portraitUrl);
          }
        }
        if (Array.isArray(data.galleryItems)) setGalleryItems(data.galleryItems);
        if (Array.isArray(data.courseTracks)) setCourseTracks(data.courseTracks);
        if (Array.isArray(data.faqItems)) setFaqItems(data.faqItems);
        if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
        if (Array.isArray(data.legalDocuments) && data.legalDocuments.length > 0) {
          setLegalDocuments(data.legalDocuments);
        }
        if (typeof data.isConfigured === "boolean") {
          setIsConfigured(data.isConfigured);
        }
      }
    } catch {
      // Content fallback already in place
    }
  }

  async function handlePasscodeSubmit(codeToVerify?: string) {
    const code = codeToVerify ?? passcode;
    if (!code) {
      setPasscodeError("Please enter your admin passcode.");
      return;
    }
    setIsVerifying(true);
    setPasscodeError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPasscode("");
        loadContent();
      } else {
        const err = (await res.json()) as { error?: string };
        setPasscodeError(
          err.error === "Invalid passcode"
            ? "Incorrect passcode. Please try again."
            : err.error || "Incorrect passcode. Please try again.",
        );
      }
    } catch {
      setPasscodeError("Connection error. Could not verify passcode.");
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
    setPasscode("");
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const payload = {
        announcement,
        siteSettings,
        storyLore,
        founderProfile,
        galleryItems,
        deletedGalleryIds,
        courseTracks,
        faqItems,
        deletedFaqIds,
        testimonials,
        deletedTestimonialIds,
        legalDocuments,
      };

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = (await res.json()) as { message?: string };
        setSaveStatus({
          type: "success",
          message:
            data.message ||
            "Draft saved to CMS instantly. Click 'Publish to Live Site' when ready to deploy.",
        });
        setDeletedGalleryIds([]);
        setDeletedFaqIds([]);
        setDeletedTestimonialIds([]);
      } else {
        const err = (await res.json()) as { error?: string };
        setSaveStatus({
          type: "error",
          message: err.error || "Failed to save changes. Please try again.",
        });
      }
    } catch {
      setSaveStatus({
        type: "error",
        message: "Network error occurred while saving. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeploy() {
    setIsDeploying(true);
    setDeployStatus(null);
    try {
      const res = await fetch("/api/admin/deploy", {
        method: "POST",
      });
      const data = (await res.json()) as { success?: boolean; message?: string; error?: string };
      if (res.ok && data.success) {
        setDeployStatus({
          type: "success",
          message: data.message || "Deployment started! The live site will refresh in ~60 seconds.",
        });
      } else {
        setDeployStatus({
          type: "error",
          message: data.error || "Failed to trigger live deployment. Please verify CLOUDFLARE_DEPLOY_HOOK_URL.",
        });
      }
    } catch {
      setDeployStatus({
        type: "error",
        message: "Network error triggering deployment. Please try again.",
      });
    } finally {
      setIsDeploying(false);
    }
  }

  // Gallery helpers
  function handleAddVideo() {
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
    const match = newVideoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/,
    );
    const yId = match ? match[1] : newVideoUrl.trim();
    const newItem: AdminGalleryItem = {
      id: `new-${Date.now()}`,
      title: newVideoTitle.trim(),
      category: newVideoCategory,
      mediaType: "Video",
      youtubeUrl: newVideoUrl.trim().startsWith("http")
        ? newVideoUrl.trim()
        : `https://www.youtube.com/watch?v=${yId}`,
      youtubeId: yId,
      order: galleryItems.length + 1,
    };
    setGalleryItems((prev) => [...prev, newItem]);
    setNewVideoTitle("");
    setNewVideoUrl("");
  }

  function handleDeleteGalleryItem(id: string) {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    if (!id.startsWith("new-")) {
      setDeletedGalleryIds((prev) => [...prev, id]);
    }
  }

  // Photo & Portrait Upload Handlers
  async function handleUploadPhoto() {
    if (!photoFile || !photoTitle.trim()) return;
    setIsUploadingPhoto(true);
    setPhotoUploadSuccess(null);
    setPhotoUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", photoFile);
      formData.append("title", photoTitle.trim());
      formData.append("target", "galleryPhoto");
      formData.append("category", photoCategory);
      formData.append("order", photoOrder.toString());

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = (await res.json()) as { assetUrl?: string; message?: string };
        const newItem: AdminGalleryItem = {
          id: `photo-${Date.now()}`,
          title: photoTitle.trim(),
          category: photoCategory,
          mediaType: "Photo",
          imageUrl: data.assetUrl || photoPreview || "/media/people/mani-sir-classroom-v2.webp",
          order: photoOrder,
        };
        setGalleryItems((prev) => [...prev, newItem].sort((a, b) => a.order - b.order));
        setPhotoUploadSuccess(
          data.message || "Classroom photo uploaded and added to gallery successfully!",
        );
        setPhotoFile(null);
        setPhotoPreview(null);
        setPhotoTitle("");
        setPhotoOrder((prev) => prev + 1);
      } else {
        const err = (await res.json()) as { error?: string };
        setPhotoUploadError(err.error || "Failed to upload photo. Please try again.");
      }
    } catch {
      setPhotoUploadError("Network connection error during photo upload.");
    } finally {
      setIsUploadingPhoto(false);
    }
  }

  async function handleReplacePhoto(itemId: string, file: File) {
    if (!file) return;
    setReplacingPhotoId(itemId);
    setReplacePhotoSuccess(null);
    setReplacePhotoError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", "replacePhoto");
      formData.append("entryId", itemId);
      formData.append(
        "title",
        galleryItems.find((it) => it.id === itemId)?.title || "Classroom Photo",
      );

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = (await res.json()) as { assetUrl?: string; message?: string };
        const newUrl = data.assetUrl || URL.createObjectURL(file);
        setGalleryItems((prev) =>
          prev.map((it) => (it.id === itemId ? { ...it, imageUrl: newUrl } : it)),
        );
        setReplacePhotoSuccess(
          data.message || "Photo replaced successfully! Website is rebuilding...",
        );
        setTimeout(() => setReplacePhotoSuccess(null), 6000);
      } else {
        const err = (await res.json()) as { error?: string };
        setReplacePhotoError(err.error || "Failed to replace photo. Please try again.");
      }
    } catch {
      setReplacePhotoError("Network connection error during photo upload.");
    } finally {
      setReplacingPhotoId(null);
    }
  }

  async function handleUploadPortrait() {
    if (!portraitFile) return;
    setIsUploadingPortrait(true);
    setPortraitUploadSuccess(null);
    setPortraitUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", portraitFile);
      formData.append("title", "Mani\u00A0Sir Official Portrait");
      formData.append("target", "founderPortrait");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = (await res.json()) as { assetUrl?: string; message?: string };
        if (data.assetUrl) {
          setActivePortraitUrl(data.assetUrl);
          setFounderProfile((prev) => ({ ...prev, portraitUrl: data.assetUrl }));
        }
        setPortraitUploadSuccess(
          data.message || "Official portrait updated successfully! Website is rebuilding.",
        );
        setPortraitFile(null);
        setPortraitPreview(null);
      } else {
        const err = (await res.json()) as { error?: string };
        setPortraitUploadError(err.error || "Failed to upload portrait. Please try again.");
      }
    } catch {
      setPortraitUploadError("Network connection error during portrait upload.");
    } finally {
      setIsUploadingPortrait(false);
    }
  }

  // FAQ helpers
  function handleAddFaq() {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newItem: AdminFaqItem = {
      id: `new-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory,
      order: faqItems.length + 1,
    };
    setFaqItems((prev) => [...prev, newItem]);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  }

  function handleDeleteFaq(id: string) {
    setFaqItems((prev) => prev.filter((item) => item.id !== id));
    if (!id.startsWith("new-")) {
      setDeletedFaqIds((prev) => [...prev, id]);
    }
  }

  // Review helpers
  function handleAddReview() {
    if (!newReviewName.trim() || !newReviewQuote.trim()) return;
    const newItem: AdminTestimonialItem = {
      id: `new-${Date.now()}`,
      name: newReviewName.trim(),
      role: newReviewRole.trim() || "Student",
      quote: newReviewQuote.trim(),
      rating: newReviewRating,
      order: testimonials.length + 1,
    };
    setTestimonials((prev) => [...prev, newItem]);
    setNewReviewName("");
    setNewReviewRole("");
    setNewReviewQuote("");
    setNewReviewRating(5);
  }

  function handleDeleteReview(id: string) {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    if (!id.startsWith("new-")) {
      setDeletedTestimonialIds((prev) => [...prev, id]);
    }
  }

  function handleKeypadPress(digit: string) {
    if (digit === "clear") {
      setPasscode("");
      setPasscodeError("");
      return;
    }
    if (digit === "back") {
      setPasscode((prev) => prev.slice(0, -1));
      setPasscodeError("");
      return;
    }
    if (passcode.length < 8) {
      setPasscode((prev) => prev + digit);
      setPasscodeError("");
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-ember-400" />
      </div>
    );
  }

  // 1. LOCKED PASSCODE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="mx-auto w-full max-w-sm px-4 py-16 sm:py-24">
        <div className="overflow-hidden rounded-3xl border border-stone-800/80 bg-obsidian-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500/20 to-sun-500/10 text-ember-400 ring-1 ring-ember-500/30">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-stone-100 sm:text-2xl">
              LIFE Spoken English - Mani&nbsp;Sir Control Panel
            </h1>
            <p className="mt-1 text-xs text-stone-400">
              Enter your admin passcode to access live website controls.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasscodeSubmit();
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="admin-passcode" className="sr-only">
                Admin Passcode
              </label>
              <input
                id="admin-passcode"
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError("");
                }}
                placeholder="Enter Passcode"
                className="w-full rounded-xl border border-stone-700 bg-obsidian-950 px-4 py-3 text-center text-2xl font-mono tracking-widest text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500"
              />
            </div>

            {passcodeError && (
              <p
                role="alert"
                className="rounded-lg bg-red-500/10 p-2 text-center text-xs font-medium text-red-400"
              >
                {passcodeError}
              </p>
            )}

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKeypadPress(k)}
                  aria-label={k === "back" ? "Backspace" : undefined}
                  className="flex h-12 items-center justify-center rounded-xl border border-stone-800 bg-obsidian-950/70 text-lg font-semibold text-stone-200 transition active:scale-95 hover:border-stone-700 hover:bg-stone-800/40"
                >
                  {k === "clear" ? (
                    <span className="text-xs uppercase tracking-wider text-stone-400">Clear</span>
                  ) : k === "back" ? (
                    <Delete className="h-5 w-5 text-stone-400" />
                  ) : (
                    k
                  )}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying || !passcode}
              className={cn(
                button("primary", "md"),
                "mt-4 w-full justify-center text-sm font-semibold",
              )}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Unlock Control Panel
                </>
              )}
            </button>
          </form>
          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-stone-400 hover:text-ember-300 transition"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED EXECUTIVE DASHBOARD
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-8 pb-36">
      {/* Executive Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-800/80 bg-obsidian-900/90 p-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/15 text-ember-400 ring-1 ring-ember-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-stone-100 sm:text-lg">
              LIFE Spoken English - Mani&nbsp;Sir Control Panel
            </h1>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Connected
              </span>
              <p className="text-xs text-stone-400">
                Full-Site Live Management &bull; Instant Updates via Cloudflare
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-ember-600 via-ember-500 to-sun-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-ember-950/40 transition hover:from-ember-500 hover:to-sun-400 disabled:opacity-50"
            title="Deploy changes to live site via Cloudflare"
          >
            {isDeploying ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Triggering</span> Deploy...
              </>
            ) : (
              <>
                <Rocket className="h-3.5 w-3.5 text-amber-200" />
                Publish to Live Site
              </>
            )}
          </button>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-stone-700/60 bg-stone-800/50 px-3 py-1.5 text-xs font-medium text-stone-300 transition hover:bg-stone-700 hover:text-stone-100"
            title="Open public website in a new tab"
          >
            <ExternalLink className="h-3.5 w-3.5 text-ember-400" />
            <span className="hidden sm:inline">View</span> Live Site
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-stone-700/60 bg-stone-800/50 px-3 py-1.5 text-xs font-medium text-stone-300 transition hover:bg-stone-700 hover:text-stone-100"
          >
            <LogOut className="h-3.5 w-3.5 text-stone-400" />
            Logout
          </button>
        </div>
      </div>

      {/* Modern Horizontal Tab Bar */}
      <div className="mb-6 flex overflow-x-auto rounded-xl border border-stone-800 bg-obsidian-950 p-1.5 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("announcements")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "announcements"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <Megaphone className="h-4 w-4" />
          Announcements &amp; Hero
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "gallery"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <Video className="h-4 w-4" />
          Videos &amp; Gallery ({galleryItems.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("courses")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "courses"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <BookOpen className="h-4 w-4" />
          Courses &amp; Syllabus ({courseTracks.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "faqs"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <HelpCircle className="h-4 w-4" />
          FAQs ({faqItems.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "reviews"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <Star className="h-4 w-4" />
          Reviews &amp; Founder
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("story")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "story"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <Sparkles className="h-4 w-4" />
          Story &amp; Promises
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("legal")}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
            activeTab === "legal"
              ? "bg-ember-500/20 text-ember-300 ring-1 ring-ember-500/40"
              : "text-stone-400 hover:text-stone-200",
          )}
        >
          <ShieldCheck className="h-4 w-4" />
          Legal &amp; Policies ({legalDocuments.length})
        </button>
      </div>

      {/* Cloudflare Pages Environment Missing Warning Banner */}
      {isConfigured === false && (
        <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <HelpCircle className="h-4 w-4 shrink-0 text-amber-400" />
            <span>Cloudflare Pages Environment Variables Required for Live Updates</span>
          </div>
          <p className="mt-1 text-stone-300">
            Changes saved here cannot be written to Contentful or trigger website rebuilds until you add the following variables in your <strong>Cloudflare Dashboard &rarr; Workers &amp; Pages &rarr; Settings &rarr; Environment variables</strong>:
          </p>
          <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="rounded bg-obsidian-950 px-2 py-1 text-ember-300 border border-stone-800">CONTENTFUL_SPACE_ID</span>
            <span className="rounded bg-obsidian-950 px-2 py-1 text-ember-300 border border-stone-800">CONTENTFUL_MANAGEMENT_TOKEN</span>
            <span className="rounded bg-obsidian-950 px-2 py-1 text-ember-300 border border-stone-800">CONTENTFUL_ACCESS_TOKEN</span>
            <span className="rounded bg-obsidian-950 px-2 py-1 text-ember-300 border border-stone-800">CLOUDFLARE_DEPLOY_HOOK_URL</span>
          </div>
        </div>
      )}

      {/* Save Feedback Banner */}
      {saveStatus && (
        <div
          role="status"
          className={cn(
            "mb-4 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium",
            saveStatus.type === "success"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border border-red-500/30 bg-red-500/10 text-red-300",
          )}
        >
          {saveStatus.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          )}
          <div>
            <p>{saveStatus.message}</p>
          </div>
        </div>
      )}

      {/* Deploy Feedback Banner */}
      {deployStatus && (
        <div
          role="status"
          className={cn(
            "mb-6 flex items-start justify-between gap-3 rounded-2xl p-4 text-sm font-medium",
            deployStatus.type === "success"
              ? "border border-sun-500/30 bg-sun-500/10 text-sun-200"
              : "border border-red-500/30 bg-red-500/10 text-red-300",
          )}
        >
          <div className="flex items-start gap-3">
            {deployStatus.type === "success" ? (
              <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-sun-400" />
            ) : (
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            )}
            <div>
              <p className="font-semibold text-white">
                {deployStatus.type === "success" ? "Live Site Deployment Started" : "Deployment Notice"}
              </p>
              <p className="text-xs text-stone-300 mt-0.5">{deployStatus.message}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDeployStatus(null)}
            className="text-stone-400 hover:text-white text-base leading-none px-1"
            aria-label="Dismiss deployment status"
          >
            &times;
          </button>
        </div>
      )}

      {/* TAB 1: ANNOUNCEMENTS & HERO */}
      {activeTab === "announcements" && (
        <div className="space-y-6">
          {/* Announcement Banner Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-stone-200">
                <Megaphone className="h-5 w-5 text-ember-400" />
                <h2 className="text-base font-semibold">Batch Announcement Bar</h2>
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <span className="text-xs font-medium text-stone-400">
                  {announcement.isActive ? "Banner Active" : "Banner Hidden"}
                </span>
                <input
                  type="checkbox"
                  checked={announcement.isActive}
                  onChange={(e) =>
                    setAnnouncement((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-stone-700 bg-obsidian-950 text-ember-500 focus:ring-ember-500"
                />
              </label>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="announcement-msg" className="block text-xs font-semibold text-stone-300">
                  Announcement Message
                </label>
                <input
                  id="announcement-msg"
                  type="text"
                  value={announcement.message}
                  onChange={(e) =>
                    setAnnouncement((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="e.g. New batches are starting soon..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="badge-label" className="block text-xs font-semibold text-stone-300">
                    Badge / Button Label
                  </label>
                  <input
                    id="badge-label"
                    type="text"
                    value={announcement.ctaText}
                    onChange={(e) =>
                      setAnnouncement((prev) => ({ ...prev, ctaText: e.target.value }))
                    }
                    placeholder="e.g. New Batch"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="dest-url" className="block text-xs font-semibold text-stone-300">
                    Destination Link URL
                  </label>
                  <input
                    id="dest-url"
                    type="text"
                    value={announcement.ctaUrl}
                    onChange={(e) =>
                      setAnnouncement((prev) => ({ ...prev, ctaUrl: e.target.value }))
                    }
                    placeholder="/#enroll"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Numbers Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Phone className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Contact &amp; Phone Numbers</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="primary-call-phone" className="block text-xs font-semibold text-stone-300">
                  Primary Call Phone
                </label>
                <input
                  id="primary-call-phone"
                  type="text"
                  value={siteSettings.primaryPhone}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, primaryPhone: e.target.value }))
                  }
                  placeholder="+91 73374 12999"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="whatsapp-inquiry" className="block text-xs font-semibold text-stone-300">
                  WhatsApp Inquiry Number
                </label>
                <input
                  id="whatsapp-inquiry"
                  type="text"
                  value={siteSettings.whatsappNumber}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                  }
                  placeholder="+91 73374 12999"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="center-address" className="block text-xs font-semibold text-stone-300">
                  Center Address
                </label>
                <textarea
                  id="center-address"
                  rows={2}
                  value={siteSettings.address}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, address: e.target.value }))
                  }
                  placeholder="First Floor, Beside HP Petrol Bunk..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Hero & Trial Policy Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Sparkles className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Hero &amp; Trial Details</h2>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="hero-main-title" className="block text-xs font-semibold text-stone-300">
                  Hero Main Headline
                </label>
                <input
                  id="hero-main-title"
                  type="text"
                  value={siteSettings.heroTitle}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, heroTitle: e.target.value }))
                  }
                  placeholder="Speak English with Fluency..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="hero-subheadline" className="block text-xs font-semibold text-stone-300">
                  Hero Subheadline / Mission
                </label>
                <textarea
                  id="hero-subheadline"
                  rows={3}
                  value={siteSettings.heroSubheadline || siteSettings.heroSubtitle}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroSubtitle: e.target.value,
                      heroSubheadline: e.target.value,
                    }))
                  }
                  placeholder="Practical, interactive Spoken English..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="trial-badge-text" className="block text-xs font-semibold text-stone-300">
                  Hero Trial Badge Text
                </label>
                <input
                  id="trial-badge-text"
                  type="text"
                  value={siteSettings.trialBadgeText ?? "10 Days Free Trial"}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, trialBadgeText: e.target.value }))
                  }
                  placeholder="e.g. 10 Days Free Trial"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="trial-policy-note" className="block text-xs font-semibold text-stone-300">
                  Trial Policy Summary Note
                </label>
                <textarea
                  id="trial-policy-note"
                  rows={2}
                  value={siteSettings.trialTerms}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, trialTerms: e.target.value }))
                  }
                  placeholder="10 full live classes completely free..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: VIDEOS & GALLERY */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          {/* Add New Item Form */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Plus className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">
                {galleryAddMode === "video" ? "Add New Video Lesson" : "Upload Classroom & Event Photo"}
              </h2>
            </div>

            {/* Segmented Toggle: [ Add Video Lesson ] | [ Upload Photo ] */}
            <div className="mt-4 flex max-w-xs rounded-xl border border-stone-800 bg-obsidian-950 p-1">
              <button
                type="button"
                onClick={() => setGalleryAddMode("video")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 px-3 text-xs font-semibold transition",
                  galleryAddMode === "video"
                    ? "bg-ember-500 text-obsidian-950 shadow-sm"
                    : "text-stone-400 hover:text-stone-200",
                )}
              >
                <Video className="h-3.5 w-3.5" />
                Add Video Lesson
              </button>
              <button
                type="button"
                onClick={() => setGalleryAddMode("photo")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 px-3 text-xs font-semibold transition",
                  galleryAddMode === "photo"
                    ? "bg-ember-500 text-obsidian-950 shadow-sm"
                    : "text-stone-400 hover:text-stone-200",
                )}
              >
                <Camera className="h-3.5 w-3.5" />
                Upload Photo
              </button>
            </div>

            {galleryAddMode === "video" ? (
              /* Add Video Lesson Form */
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300">
                    YouTube Video Link or ID
                  </label>
                  <input
                    type="text"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or 11-char ID"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300">
                    Video Lesson Title
                  </label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="e.g. Everyday Situational Dialogue Practice"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300">
                    Category
                  </label>
                  <select
                    value={newVideoCategory}
                    onChange={(e) =>
                      setNewVideoCategory(e.target.value as AdminGalleryItem["category"])
                    }
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                  >
                    <option value="Lessons">Lessons</option>
                    <option value="Orientation">Orientation</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Student Success">Student Success</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    disabled={!newVideoTitle.trim() || !newVideoUrl.trim()}
                    className={cn(
                      button("primary", "sm"),
                      "w-full sm:w-auto font-semibold",
                    )}
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add Video to Gallery
                  </button>
                </div>
              </div>
            ) : (
              /* Upload Photo Form */
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-stone-300">
                    Classroom / Event Photo File
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {photoPreview && (
                      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-stone-700 bg-stone-900 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoPreview}
                          alt="Classroom preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <label
                        htmlFor="gallery-photo-input"
                        className={cn(
                          button("secondary", "sm"),
                          "cursor-pointer text-xs font-semibold inline-flex items-center gap-1.5",
                        )}
                      >
                        <Camera className="h-3.5 w-3.5 text-ember-400" />
                        {photoFile ? "Change Photo File" : "Choose Image File"}
                      </label>
                      <input
                        id="gallery-photo-input"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPhotoFile(file);
                            setPhotoPreview(URL.createObjectURL(file));
                            setPhotoUploadSuccess(null);
                            setPhotoUploadError(null);
                          }
                        }}
                        className="sr-only"
                      />
                      {photoFile && (
                        <p className="text-[11px] font-mono text-stone-400">
                          Selected: {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                      <p className="text-[11px] text-stone-500">
                        Supports JPEG, PNG, or WebP. Automatically converted to high-speed WebP.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="e.g. Mani Sir mentoring students in classroom practice session"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300">
                    Category
                  </label>
                  <select
                    value={photoCategory}
                    onChange={(e) =>
                      setPhotoCategory(e.target.value as AdminGalleryItem["category"])
                    }
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                  >
                    <option value="Classroom">Classroom</option>
                    <option value="Event">Event</option>
                    <option value="Student Success">Student Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={photoOrder}
                    onChange={(e) => setPhotoOrder(parseInt(e.target.value, 10) || 1)}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                  />
                </div>

                {photoUploadSuccess && (
                  <div className="sm:col-span-2 flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{photoUploadSuccess}</span>
                  </div>
                )}

                {photoUploadError && (
                  <p className="sm:col-span-2 text-xs text-red-400">{photoUploadError}</p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleUploadPhoto}
                    disabled={!photoFile || !photoTitle.trim() || isUploadingPhoto}
                    className={cn(
                      button("primary", "sm"),
                      "w-full sm:w-auto font-semibold",
                    )}
                  >
                    {isUploadingPhoto ? (
                      <>
                        <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                        Uploading Photo...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mr-1.5 h-4 w-4" />
                        Upload &amp; Add to Gallery
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Existing Gallery Items Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider text-stone-400 uppercase">
                Existing Gallery Items ({galleryItems.length})
              </h3>
            </div>

            {replacePhotoSuccess && (
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{replacePhotoSuccess}</span>
              </div>
            )}

            {replacePhotoError && (
              <p className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-400">
                {replacePhotoError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-stone-800 bg-obsidian-900/80 p-4 transition hover:border-stone-700"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-ember-500/10 px-2 py-0.5 text-[11px] font-semibold text-ember-400">
                        {item.category} &bull; {item.mediaType}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="text-stone-500 transition hover:text-red-400"
                        title="Delete video"
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {item.imageUrl && (
                      <div className="relative mb-3 overflow-hidden rounded-lg border border-stone-800 bg-obsidian-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                          loading="lazy"
                        />
                        {item.mediaType === "Photo" && (
                          <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                            <label
                              htmlFor={`replace-photo-${item.id}`}
                              className="cursor-pointer rounded-lg bg-obsidian-950/90 px-2.5 py-1 text-[11px] font-semibold text-ember-300 shadow backdrop-blur hover:bg-ember-500 hover:text-white transition flex items-center gap-1"
                            >
                              <Camera className="h-3 w-3" />
                              {replacingPhotoId === item.id ? "Replacing..." : "Replace Photo"}
                            </label>
                            <input
                              type="file"
                              id={`replace-photo-${item.id}`}
                              accept="image/*"
                              className="hidden"
                              disabled={replacingPhotoId === item.id}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleReplacePhoto(item.id, f);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGalleryItems((prev) =>
                            prev.map((it) => (it.id === item.id ? { ...it, title: val } : it)),
                          );
                        }}
                        className="w-full rounded-lg border border-stone-700 bg-obsidian-950 px-2.5 py-1.5 text-xs font-medium text-stone-100 focus:border-ember-500 focus:outline-none"
                      />

                      {item.youtubeUrl && (
                        <p className="truncate text-[11px] font-mono text-stone-500">
                          {item.youtubeUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-stone-800/80 pt-2 text-[11px] text-stone-400">
                    <span>Order: #{item.order}</span>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const val = e.target.value as AdminGalleryItem["category"];
                        setGalleryItems((prev) =>
                          prev.map((it) => (it.id === item.id ? { ...it, category: val } : it)),
                        );
                      }}
                      className="rounded border border-stone-700 bg-obsidian-950 px-2 py-1 text-[11px] text-stone-300 focus:outline-none"
                    >
                      <option value="Lessons">Lessons</option>
                      <option value="Orientation">Orientation</option>
                      <option value="Classroom">Classroom</option>
                      <option value="Student Success">Student Success</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COURSES & SYLLABUS */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <BookOpen className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Course Tracks &amp; Syllabus</h2>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Edit course section titles, track details, descriptions, and syllabus key highlights.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="courses-section-title" className="block text-xs font-semibold text-stone-300">
                  Courses Section Title
                </label>
                <input
                  id="courses-section-title"
                  type="text"
                  value={siteSettings.coursesSectionTitle ?? "Every Stage of English Fluency"}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, coursesSectionTitle: e.target.value }))
                  }
                  placeholder="Every Stage of English Fluency"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="courses-section-subtitle" className="block text-xs font-semibold text-stone-300">
                  Courses Section Subtitle
                </label>
                <input
                  id="courses-section-subtitle"
                  type="text"
                  value={siteSettings.coursesSectionSubtitle ?? "From foundational hesitation removal to stage-ready executive communication."}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, coursesSectionSubtitle: e.target.value }))
                  }
                  placeholder="From foundational hesitation removal..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {courseTracks.map((track) => (
              <div
                key={track.id}
                className="rounded-2xl border border-stone-800 bg-obsidian-900/80 p-5 shadow-md"
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-300">
                        Track Title
                      </label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCourseTracks((prev) =>
                            prev.map((t) => (t.id === track.id ? { ...t, title: val } : t)),
                          );
                        }}
                        className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300">
                        Track ID (Slug)
                      </label>
                      <input
                        type="text"
                        disabled
                        value={track.trackId}
                        className="mt-1 w-full rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2 text-sm text-stone-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300">
                      Tagline / Description
                    </label>
                    <textarea
                      rows={2}
                      value={track.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCourseTracks((prev) =>
                          prev.map((t) => (t.id === track.id ? { ...t, description: val } : t)),
                        );
                      }}
                      className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300">
                      Syllabus Highlights (one bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={track.highlights.join("\n")}
                      onChange={(e) => {
                        const val = e.target.value.split("\n").filter(Boolean);
                        setCourseTracks((prev) =>
                          prev.map((t) => (t.id === track.id ? { ...t, highlights: val } : t)),
                        );
                      }}
                      className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 font-mono text-xs text-stone-200 focus:border-ember-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FAQS & CONTACTS */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {/* Contact Numbers & Center Address Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Phone className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Contact &amp; Branch Information</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tab4-primary-phone" className="block text-xs font-semibold text-stone-300">
                  Primary Contact Phone
                </label>
                <input
                  id="tab4-primary-phone"
                  type="text"
                  value={siteSettings.contactPhone || siteSettings.primaryPhone}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      primaryPhone: e.target.value,
                      contactPhone: e.target.value,
                    }))
                  }
                  placeholder="+91 73374 12999"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="tab4-whatsapp-number" className="block text-xs font-semibold text-stone-300">
                  WhatsApp Inquiry Number
                </label>
                <input
                  id="tab4-whatsapp-number"
                  type="text"
                  value={siteSettings.whatsappNumber}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                  }
                  placeholder="+91 73374 12999"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="tab4-contact-email" className="block text-xs font-semibold text-stone-300">
                  Official Contact Email
                </label>
                <input
                  id="tab4-contact-email"
                  type="email"
                  value={siteSettings.contactEmail ?? "lifebymanisir@gmail.com"}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, contactEmail: e.target.value }))
                  }
                  placeholder="lifebymanisir@gmail.com"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="tab4-whatsapp-message" className="block text-xs font-semibold text-stone-300">
                  Default WhatsApp Message
                </label>
                <input
                  id="tab4-whatsapp-message"
                  type="text"
                  value={siteSettings.whatsappMessage ?? "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details."}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, whatsappMessage: e.target.value }))
                  }
                  placeholder="Hello Mani Sir..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="tab4-contact-address" className="block text-xs font-semibold text-stone-300">
                  Branch Full Address
                </label>
                <textarea
                  id="tab4-contact-address"
                  rows={2}
                  value={siteSettings.contactAddress || siteSettings.address}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      address: e.target.value,
                      contactAddress: e.target.value,
                    }))
                  }
                  placeholder="First Floor, Beside HP Petrol Bunk..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Add New FAQ Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Plus className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Add New FAQ Question</h2>
            </div>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-300">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="e.g. What if I miss a weekend session?"
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300">
                    Category
                  </label>
                  <select
                    value={newFaqCategory}
                    onChange={(e) => setNewFaqCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                  >
                    <option value="Trial & Fees">Trial &amp; Fees</option>
                    <option value="Eligibility & Language">Eligibility &amp; Language</option>
                    <option value="Schedule & Batches">Schedule &amp; Batches</option>
                    <option value="Missed Classes & Support">Missed Classes &amp; Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300">
                  Answer
                </label>
                <textarea
                  rows={3}
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  placeholder="Detailed answer for students..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  disabled={!newFaqQuestion.trim() || !newFaqAnswer.trim()}
                  className={cn(
                    button("primary", "sm"),
                    "w-full sm:w-auto font-semibold",
                  )}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Add FAQ Item
                </button>
              </div>
            </div>
          </section>

          {/* Existing FAQ List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-stone-400 uppercase">
              Current FAQs ({faqItems.length})
            </h3>
            {faqItems.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-stone-800 bg-obsidian-900/80 shadow transition"
                >
                  <div
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="flex cursor-pointer items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[10px] font-semibold text-stone-400">
                        {faq.category}
                      </span>
                      <h4 className="text-sm font-medium text-stone-200">{faq.question}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(faq.id);
                        }}
                        className="text-stone-500 transition hover:text-red-400"
                        title="Delete FAQ"
                        aria-label={`Delete ${faq.question}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-stone-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-stone-800/80 p-4 space-y-3 bg-obsidian-950/40">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300">
                          Question
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFaqItems((prev) =>
                              prev.map((f) => (f.id === faq.id ? { ...f, question: val } : f)),
                            );
                          }}
                          className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300">
                          Answer
                        </label>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFaqItems((prev) =>
                              prev.map((f) => (f.id === faq.id ? { ...f, answer: val } : f)),
                            );
                          }}
                          className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: REVIEWS & FOUNDER */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          {/* Founder Profile Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <User className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Founder Profile &amp; Bio</h2>
            </div>

            {/* Official Portrait Photo Management */}
            <div className="mt-4 rounded-xl border border-stone-800 bg-obsidian-950/80 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                Official Founder Portrait Photo
              </label>
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl border border-stone-700 bg-stone-900 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portraitPreview || activePortraitUrl}
                    alt={founderProfile.name}
                    className="h-full w-full object-cover"
                  />
                  {portraitPreview ? (
                    <span className="absolute bottom-1 left-1 rounded bg-amber-500/90 px-1 py-0.5 text-[9px] font-bold text-obsidian-950 uppercase">
                      Preview
                    </span>
                  ) : (
                    <span className="absolute bottom-1 left-1 rounded bg-emerald-500/90 px-1 py-0.5 text-[9px] font-bold text-obsidian-950 uppercase">
                      Live
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <p className="text-xs text-stone-400">
                    Update Mani&nbsp;Sir&apos;s official portrait shown on the homepage and about page.
                    Supports JPEG, PNG, or WebP up to 10MB.
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <label
                      htmlFor="founder-portrait-input"
                      className={cn(
                        button(portraitFile ? "secondary" : "primary", "sm"),
                        "cursor-pointer text-xs font-semibold inline-flex items-center gap-1.5",
                      )}
                    >
                      <Camera className="h-3.5 w-3.5 text-ember-400" />
                      {portraitFile ? "Choose Different Photo" : "Upload New Portrait Photo"}
                    </label>
                    <input
                      id="founder-portrait-input"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPortraitFile(file);
                          setPortraitPreview(URL.createObjectURL(file));
                          setPortraitUploadSuccess(null);
                          setPortraitUploadError(null);
                        }
                      }}
                      className="sr-only"
                    />

                    {portraitFile && (
                      <button
                        type="button"
                        onClick={handleUploadPortrait}
                        disabled={isUploadingPortrait}
                        className={cn(
                          button("primary", "sm"),
                          "text-xs font-semibold inline-flex items-center gap-1.5",
                        )}
                      >
                        {isUploadingPortrait ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            Uploading Portrait...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-3.5 w-3.5" />
                            Upload New Portrait Photo
                          </>
                        )}
                      </button>
                    )}

                    {portraitFile && !isUploadingPortrait && (
                      <button
                        type="button"
                        onClick={() => {
                          setPortraitFile(null);
                          setPortraitPreview(null);
                        }}
                        className="text-xs text-stone-500 hover:text-stone-300 underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {portraitFile && (
                    <p className="text-[11px] font-mono text-stone-400">
                      Selected: {portraitFile.name} ({(portraitFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}

                  {portraitUploadSuccess && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{portraitUploadSuccess}</span>
                    </div>
                  )}

                  {portraitUploadError && (
                    <p className="text-xs text-red-400">{portraitUploadError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-stone-300">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={founderProfile.name}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300">
                  Founder Title
                </label>
                <input
                  type="text"
                  value={founderProfile.title}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-300">
                  Biography &amp; Mentor Overview
                </label>
                <textarea
                  rows={3}
                  value={founderProfile.bio}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderBioHeadline" className="block text-xs font-semibold text-stone-300">
                  Founder Bio Headline
                </label>
                <input
                  id="founderBioHeadline"
                  type="text"
                  value={founderProfile.bioHeadline ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, bioHeadline: e.target.value }))
                  }
                  placeholder="e.g. Teaching with Empathy & Conviction"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderBioParagraphs" className="block text-xs font-semibold text-stone-300">
                  Full Narrative Bio Paragraphs
                </label>
                <textarea
                  id="founderBioParagraphs"
                  rows={5}
                  value={founderProfile.bioParagraphs ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, bioParagraphs: e.target.value }))
                  }
                  placeholder="Full narrative bio..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderMissionStatement" className="block text-xs font-semibold text-stone-300">
                  Mission Statement
                </label>
                <textarea
                  id="founderMissionStatement"
                  rows={2}
                  value={founderProfile.missionStatement ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, missionStatement: e.target.value }))
                  }
                  placeholder="To eliminate the fear of English..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="statsExperience" className="block text-xs font-semibold text-stone-300">
                  Stats: Experience
                </label>
                <input
                  id="statsExperience"
                  type="text"
                  value={founderProfile.statsExperience ?? "20+ Years"}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, statsExperience: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="statsStudents" className="block text-xs font-semibold text-stone-300">
                  Stats: Students Trained
                </label>
                <input
                  id="statsStudents"
                  type="text"
                  value={founderProfile.statsStudents ?? "25,000+ Students"}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, statsStudents: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="statsBatches" className="block text-xs font-semibold text-stone-300">
                  Stats: Batches Completed
                </label>
                <input
                  id="statsBatches"
                  type="text"
                  value={founderProfile.statsBatches ?? "1,200+ Batches"}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, statsBatches: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderStoryHeadline" className="block text-xs font-semibold text-stone-300">
                  About Page Story Headline
                </label>
                <input
                  id="founderStoryHeadline"
                  type="text"
                  value={founderProfile.storyHeadline ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, storyHeadline: e.target.value }))
                  }
                  placeholder="e.g. Meet Mani Sir, the heart of LIFE"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderTeachingPhilosophy" className="block text-xs font-semibold text-stone-300">
                  Teaching Philosophy (Core Belief on English Fluency)
                </label>
                <textarea
                  id="founderTeachingPhilosophy"
                  rows={4}
                  value={founderProfile.teachingPhilosophy ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, teachingPhilosophy: e.target.value }))
                  }
                  placeholder="His core belief on English fluency and spoken confidence..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderSpiritOfLifeContent" className="block text-xs font-semibold text-stone-300">
                  The Spirit of LIFE Narrative
                </label>
                <textarea
                  id="founderSpiritOfLifeContent"
                  rows={4}
                  value={founderProfile.spiritOfLifeContent ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, spiritOfLifeContent: e.target.value }))
                  }
                  placeholder="The Spirit of LIFE philosophy narrative (paragraphs separated by blank lines)..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="founderJourneyMilestones" className="block text-xs font-semibold text-stone-300">
                  {"Journey Milestones (JSON format: [{ year, title, body }])"}
                </label>
                <textarea
                  id="founderJourneyMilestones"
                  rows={5}
                  value={founderProfile.journeyMilestones ?? ""}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, journeyMilestones: e.target.value }))
                  }
                  placeholder='[{"year":"2018","title":"The first classroom","body":"A single room at Vasu Brothers Nilayam..."}]'
                  className="mt-1 w-full font-mono rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-xs text-stone-100 focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Add New Review Card */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Plus className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Add Student Testimonial</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-stone-300">
                  Student Name
                </label>
                <input
                  type="text"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300">
                  Role / Profession
                </label>
                <input
                  type="text"
                  value={newReviewRole}
                  onChange={(e) => setNewReviewRole(e.target.value)}
                  placeholder="e.g. Civil Engineer, Visakhapatnam"
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-300">
                  Student Review Quote
                </label>
                <textarea
                  rows={3}
                  value={newReviewQuote}
                  onChange={(e) => setNewReviewQuote(e.target.value)}
                  placeholder="Quote describing transformation..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddReview}
                  disabled={!newReviewName.trim() || !newReviewQuote.trim()}
                  className={cn(
                    button("primary", "sm"),
                    "w-full sm:w-auto font-semibold",
                  )}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Add Review
                </button>
              </div>
            </div>
          </section>

          {/* Existing Testimonials */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-stone-400 uppercase">
              Current Reviews ({testimonials.length})
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col justify-between rounded-xl border border-stone-800 bg-obsidian-900/80 p-4 transition hover:border-stone-700"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sun-400">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(test.id)}
                        className="text-stone-500 transition hover:text-red-400"
                        title="Delete review"
                        aria-label={`Delete review by ${test.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="italic text-xs text-stone-300">&ldquo;{test.quote}&rdquo;</p>
                  </div>

                  <div className="mt-3 border-t border-stone-800/80 pt-2 text-xs">
                    <p className="font-semibold text-stone-200">{test.name}</p>
                    <p className="text-[11px] text-stone-400">{test.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: STORY & PROMISES */}
      {activeTab === "story" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ember-400" />
              The 10 Core Commitment Promises
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              The ten commitments highlighted on the homepage that eliminate every barrier between students and fluent spoken English. Format: Title: Description
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="promisesSectionTitle" className="block text-xs font-semibold text-stone-300">
                  Promises Section Title
                </label>
                <input
                  id="promisesSectionTitle"
                  type="text"
                  value={siteSettings.promisesSectionTitle ?? "The 10 Promises"}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, promisesSectionTitle: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="promisesSectionSubtitle" className="block text-xs font-semibold text-stone-300">
                  Promises Section Subtitle
                </label>
                <input
                  id="promisesSectionSubtitle"
                  type="text"
                  value={siteSettings.promisesSectionSubtitle ?? ""}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, promisesSectionSubtitle: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {(siteSettings.promises && siteSettings.promises.length > 0
                ? siteSettings.promises
                : DEFAULT_SETTINGS.promises!
              ).map((promise, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ember-500/10 text-xs font-bold text-ember-400 ring-1 ring-ember-500/20">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <input
                    type="text"
                    value={promise}
                    onChange={(e) => handlePromiseChange(idx, e.target.value)}
                    className="w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    placeholder={`Promise ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sun-400" />
              Logo Story &amp; LIFE Meaning
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              The parable of the young eagle learning to fly, and what L.I.F.E. (Live It For Eternity) stands for.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="logoStory" className="block text-xs font-semibold text-stone-300">
                  Logo Story &amp; Brand Philosophy Summary
                </label>
                <textarea
                  id="logoStory"
                  rows={3}
                  value={siteSettings.logoStory ?? ""}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, logoStory: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  placeholder="Enter logo story and brand philosophy..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="eagleStoryTitle" className="block text-xs font-semibold text-stone-300">
                    Eagle Story Title
                  </label>
                  <input
                    id="eagleStoryTitle"
                    type="text"
                    value={storyLore.eagleStoryTitle ?? ""}
                    onChange={(e) =>
                      setStoryLore((prev) => ({ ...prev, eagleStoryTitle: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="eagleStorySubtitle" className="block text-xs font-semibold text-stone-300">
                    Eagle Story Subtitle
                  </label>
                  <input
                    id="eagleStorySubtitle"
                    type="text"
                    value={storyLore.eagleStorySubtitle ?? ""}
                    onChange={(e) =>
                      setStoryLore((prev) => ({ ...prev, eagleStorySubtitle: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="logoStoryEagle" className="block text-xs font-semibold text-stone-300">
                  Full Eagle Parable Narrative (About Page)
                </label>
                <textarea
                  id="logoStoryEagle"
                  rows={6}
                  value={siteSettings.logoStoryEagle ?? storyLore.eagleStoryParagraphs ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteSettings((prev) => ({ ...prev, logoStoryEagle: val }));
                    setStoryLore((prev) => ({ ...prev, eagleStoryParagraphs: val }));
                  }}
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  placeholder="The complete eagle parable narrative and moral..."
                />
              </div>

              <div>
                <label htmlFor="eagleStoryMoral" className="block text-xs font-semibold text-stone-300">
                  Eagle Story Moral / Core Lesson
                </label>
                <textarea
                  id="eagleStoryMoral"
                  rows={2}
                  value={storyLore.eagleStoryMoral ?? ""}
                  onChange={(e) =>
                    setStoryLore((prev) => ({ ...prev, eagleStoryMoral: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  placeholder="Core lesson / moral..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="spiritOfLifeTitle" className="block text-xs font-semibold text-stone-300">
                    Spirit of LIFE Title
                  </label>
                  <input
                    id="spiritOfLifeTitle"
                    type="text"
                    value={storyLore.spiritOfLifeTitle ?? ""}
                    onChange={(e) =>
                      setStoryLore((prev) => ({ ...prev, spiritOfLifeTitle: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="spiritOfLifeIntro" className="block text-xs font-semibold text-stone-300">
                    Spirit of LIFE Subtitle / Intro
                  </label>
                  <input
                    id="spiritOfLifeIntro"
                    type="text"
                    value={storyLore.spiritOfLifeIntro ?? ""}
                    onChange={(e) =>
                      setStoryLore((prev) => ({ ...prev, spiritOfLifeIntro: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white focus:border-ember-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  The 4 Pillars: L.I.F.E. Acronym Definitions
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <span className="block font-serif text-sm font-bold text-sun-400 mb-1">L</span>
                    <input
                      type="text"
                      value={siteSettings.lifeAcronymL ?? storyLore.pillarLTitle ?? "Live"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteSettings((prev) => ({ ...prev, lifeAcronymL: val }));
                        setStoryLore((prev) => ({ ...prev, pillarLTitle: val }));
                      }}
                      className="w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                    <textarea
                      rows={2}
                      value={storyLore.pillarLText ?? ""}
                      onChange={(e) =>
                        setStoryLore((prev) => ({ ...prev, pillarLText: e.target.value }))
                      }
                      placeholder="L pillar description..."
                      className="mt-2 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-sm font-bold text-sun-400 mb-1">I</span>
                    <input
                      type="text"
                      value={siteSettings.lifeAcronymI ?? storyLore.pillarITitle ?? "It"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteSettings((prev) => ({ ...prev, lifeAcronymI: val }));
                        setStoryLore((prev) => ({ ...prev, pillarITitle: val }));
                      }}
                      className="w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                    <textarea
                      rows={2}
                      value={storyLore.pillarIText ?? ""}
                      onChange={(e) =>
                        setStoryLore((prev) => ({ ...prev, pillarIText: e.target.value }))
                      }
                      placeholder="I pillar description..."
                      className="mt-2 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-sm font-bold text-sun-400 mb-1">F</span>
                    <input
                      type="text"
                      value={siteSettings.lifeAcronymF ?? storyLore.pillarFTitle ?? "For"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteSettings((prev) => ({ ...prev, lifeAcronymF: val }));
                        setStoryLore((prev) => ({ ...prev, pillarFTitle: val }));
                      }}
                      className="w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                    <textarea
                      rows={2}
                      value={storyLore.pillarFText ?? ""}
                      onChange={(e) =>
                        setStoryLore((prev) => ({ ...prev, pillarFText: e.target.value }))
                      }
                      placeholder="F pillar description..."
                      className="mt-2 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-sm font-bold text-sun-400 mb-1">E</span>
                    <input
                      type="text"
                      value={siteSettings.lifeAcronymE ?? storyLore.pillarETitle ?? "Eternity"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteSettings((prev) => ({ ...prev, lifeAcronymE: val }));
                        setStoryLore((prev) => ({ ...prev, pillarETitle: val }));
                      }}
                      className="w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                    <textarea
                      rows={2}
                      value={storyLore.pillarEText ?? ""}
                      onChange={(e) =>
                        setStoryLore((prev) => ({ ...prev, pillarEText: e.target.value }))
                      }
                      placeholder="E pillar description..."
                      className="mt-2 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3 py-2 text-xs text-stone-300 placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-ember-400" />
              Operating Hours &amp; Batch Timings
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              Mani&nbsp;Sir&apos;s daily classroom and online live batch schedule slots across the week.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="workingHours" className="block text-xs font-semibold text-stone-300">
                  Operating Hours Summary
                </label>
                <input
                  id="workingHours"
                  type="text"
                  value={siteSettings.workingHours ?? ""}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, workingHours: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  placeholder="e.g. Monday to Friday: 6:00 AM to 10:00 PM"
                />
              </div>

              <div>
                <label htmlFor="batchTimings" className="block text-xs font-semibold text-stone-300">
                  Daily Batch Timings (Morning, Evening, Online &amp; Weekend)
                </label>
                <textarea
                  id="batchTimings"
                  rows={4}
                  value={siteSettings.batchTimings ?? ""}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, batchTimings: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  placeholder="Morning slots, evening slots, and weekend backup details..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LEGAL & POLICIES */}
      {activeTab === "legal" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Legal Policies &amp; DPDP Compliance
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              Manage your legal documents, terms of use, privacy policies, and grievance contacts required by the Digital Personal Data Protection Act, 2023.
            </p>
          </div>

          {legalDocuments.map((doc) => (
            <div key={doc.slug} className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-ember-400" />
                    {doc.title || doc.slug}
                  </h3>
                  <span className="font-mono text-xs text-stone-500">
                    URL: /{doc.slug === "privacy-policy" ? "privacy" : doc.slug === "terms-of-use" ? "terms" : doc.slug}
                  </span>
                </div>
                <a
                  href={`/${doc.slug === "privacy-policy" ? "privacy" : doc.slug === "terms-of-use" ? "terms" : doc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-ember-400 hover:underline"
                >
                  View Live Page &rarr;
                </a>
              </div>

              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`doc-title-${doc.slug}`} className="block text-xs font-semibold text-stone-300">
                      Document Title
                    </label>
                    <input
                      id={`doc-title-${doc.slug}`}
                      type="text"
                      value={doc.title}
                      onChange={(e) => handleLegalDocChange(doc.slug, "title", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>

                  <div>
                    <label htmlFor={`doc-date-${doc.slug}`} className="block text-xs font-semibold text-stone-300">
                      Last Updated Notice
                    </label>
                    <input
                      id={`doc-date-${doc.slug}`}
                      type="text"
                      value={doc.lastUpdated}
                      onChange={(e) => handleLegalDocChange(doc.slug, "lastUpdated", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-stone-800 bg-obsidian-900 px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`doc-content-${doc.slug}`} className="block text-xs font-semibold text-stone-300">
                    Policy Content / Clauses (Markdown or Structured Text)
                  </label>
                  <textarea
                    id={`doc-content-${doc.slug}`}
                    rows={8}
                    value={doc.content}
                    onChange={(e) => handleLegalDocChange(doc.slug, "content", e.target.value)}
                    className="mt-1.5 w-full font-mono rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Full clauses, refund policies, disclaimers, and grievance officer details.
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-stone-800 bg-obsidian-950 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ember-400" />
              Trial &amp; Refund Guarantee Terms
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              The 10-day trial rules and fee terms displayed across booking forms and footer guarantee notes.
            </p>
            <div className="mt-4">
              <textarea
                rows={3}
                value={siteSettings.trialTerms}
                onChange={(e) =>
                  setSiteSettings((prev) => ({ ...prev, trialTerms: e.target.value }))
                }
                className="w-full rounded-xl border border-stone-800 bg-obsidian-900 p-3 text-xs text-white placeholder-stone-600 focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
                placeholder="10 full live classes completely free..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Sticky Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-800 bg-obsidian-950/95 px-4 py-3 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-stone-300">
              Editing: <span className="text-ember-400 font-semibold">{activeTab.toUpperCase()}</span>
            </p>
            <p className="text-[11px] text-stone-500">
              Drafts save to CMS instantly. Click Publish to Live Site when ready to deploy.
            </p>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              aria-label="Save Changes to CMS"
              className={cn(
                button("secondary", "md"),
                "w-full sm:w-auto font-semibold text-xs border-stone-700 bg-stone-900/90 hover:bg-stone-800 text-stone-200",
              )}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin text-ember-400" />
                  Saving to CMS...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4 text-ember-400" />
                  Save Changes to CMS
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDeploy}
              disabled={isDeploying}
              className={cn(
                button("primary", "md"),
                "w-full sm:w-auto font-bold text-xs bg-gradient-to-r from-ember-600 via-ember-500 to-sun-500 hover:from-ember-500 hover:to-sun-400 text-white shadow-lg shadow-ember-950/50",
              )}
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4 text-amber-200" />
                  Publish to Live Site
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
