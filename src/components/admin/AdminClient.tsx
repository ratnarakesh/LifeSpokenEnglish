"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Delete,
  HelpCircle,
  Lock,
  LogOut,
  Megaphone,
  Phone,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { button, cn } from "@/lib/cn";
import { heroCopy } from "@/lib/site-copy";
import { PHONES } from "@/lib/site";
import type {
  AdminAnnouncement,
  AdminCourseTrack,
  AdminFaqItem,
  AdminFounderProfile,
  AdminGalleryItem,
  AdminSiteSettings,
  AdminTestimonialItem,
  FullAdminData,
} from "../../../functions/api/admin/content";

type AdminTab = "announcements" | "gallery" | "courses" | "faqs" | "reviews";

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
};

const DEFAULT_FOUNDER: AdminFounderProfile = {
  name: "Mani\u00A0Sir",
  title: "Founder, Director & Lead Trainer",
  bio: "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
  altText: "Mani\u00A0Sir in the LIFE Spoken English classroom, Madhurawada",
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

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("announcements");

  // Content states
  const [announcement, setAnnouncement] = useState<AdminAnnouncement>(DEFAULT_ANNOUNCEMENT);
  const [siteSettings, setSiteSettings] = useState<AdminSiteSettings>(DEFAULT_SETTINGS);
  const [founderProfile, setFounderProfile] = useState<AdminFounderProfile>(DEFAULT_FOUNDER);
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]);
  const [courseTracks, setCourseTracks] = useState<AdminCourseTrack[]>([]);
  const [faqItems, setFaqItems] = useState<AdminFaqItem[]>([]);
  const [deletedFaqIds, setDeletedFaqIds] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>([]);
  const [deletedTestimonialIds, setDeletedTestimonialIds] = useState<string[]>([]);

  // FAQ Accordion expanded IDs
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // New video form state
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState<AdminGalleryItem["category"]>("Lessons");

  // New FAQ form state
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("Trial & Fees");

  // New Review form state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewQuote, setNewReviewQuote] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

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
        if (data.founderProfile) setFounderProfile((prev) => ({ ...prev, ...data.founderProfile }));
        if (Array.isArray(data.galleryItems)) setGalleryItems(data.galleryItems);
        if (Array.isArray(data.courseTracks)) setCourseTracks(data.courseTracks);
        if (Array.isArray(data.faqItems)) setFaqItems(data.faqItems);
        if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
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
        founderProfile,
        galleryItems,
        deletedGalleryIds,
        courseTracks,
        faqItems,
        deletedFaqIds,
        testimonials,
        deletedTestimonialIds,
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
            "Changes saved! Your website is rebuilding and will update in ~60 seconds.",
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
      <div className="mx-auto w-full max-w-sm px-4 py-8">
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
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED EXECUTIVE DASHBOARD
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-4 pb-36">
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
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-stone-700/60 bg-stone-800/50 px-3 py-1.5 text-xs font-medium text-stone-300 transition hover:bg-stone-700 hover:text-stone-100"
        >
          <LogOut className="h-3.5 w-3.5 text-stone-400" />
          Logout
        </button>
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
      </div>

      {/* Save Feedback Banner */}
      {saveStatus && (
        <div
          role="status"
          className={cn(
            "mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium",
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
                  value={siteSettings.heroSubtitle}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))
                  }
                  placeholder="Practical, interactive Spoken English..."
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-ember-500 focus:outline-none"
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
          {/* Add New Video Form */}
          <section className="rounded-2xl border border-stone-800 bg-obsidian-900/90 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-stone-200">
              <Plus className="h-5 w-5 text-ember-400" />
              <h2 className="text-base font-semibold">Add New Video Lesson</h2>
            </div>

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
          </section>

          {/* Existing Gallery Items Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-stone-400 uppercase">
              Existing Gallery Items ({galleryItems.length})
            </h3>
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
              Edit course track titles, descriptions, and syllabus key highlights.
            </p>
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

      {/* TAB 4: FAQS */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
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
                  Biography &amp; Mentor Philosophy
                </label>
                <textarea
                  rows={4}
                  value={founderProfile.bio}
                  onChange={(e) =>
                    setFounderProfile((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-stone-700 bg-obsidian-950 px-3.5 py-2 text-sm text-stone-100 focus:border-ember-500 focus:outline-none"
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

      {/* Global Sticky Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-800 bg-obsidian-950/95 px-4 py-3 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-stone-300">
              Editing: <span className="text-ember-400 font-semibold">{activeTab.toUpperCase()}</span>
            </p>
            <p className="text-[11px] text-stone-500">
              Hit Save to publish updates and trigger automatic site rebuild.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              button("primary", "md"),
              "w-full sm:w-auto font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-950/50",
            )}
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Publishing &amp; Rebuilding...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save &amp; Update Website
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
