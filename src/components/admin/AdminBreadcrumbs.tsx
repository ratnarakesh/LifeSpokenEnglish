"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  Video,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type AdminTab =
  | "announcements"
  | "gallery"
  | "courses"
  | "faqs"
  | "reviews"
  | "story"
  | "legal";

export interface TabConfig {
  id: AdminTab;
  number: number;
  shortLabel: string;
  fullLabel: string;
  breadcrumbLabel: string;
  ariaLabel: string;
  description: string;
  icon: LucideIcon;
}

export const ADMIN_TABS: TabConfig[] = [
  {
    id: "announcements",
    number: 1,
    shortLabel: "1. Hero",
    fullLabel: "Announcements & Hero",
    breadcrumbLabel: "Announcements & Hero",
    ariaLabel: "Announcements & Hero (1. Hero)",
    description: "Top announcement bar, hero headline, trial badge & CTA",
    icon: Megaphone,
  },
  {
    id: "gallery",
    number: 2,
    shortLabel: "2. Gallery",
    fullLabel: "Videos & Gallery",
    breadcrumbLabel: "Videos & Gallery",
    ariaLabel: "Videos & Gallery (2. Gallery)",
    description: "YouTube lessons, classroom & event photos, lightbox",
    icon: Video,
  },
  {
    id: "courses",
    number: 3,
    shortLabel: "3. Courses",
    fullLabel: "Courses & Syllabus",
    breadcrumbLabel: "Courses & Syllabus",
    ariaLabel: "Courses & Syllabus (3. Courses)",
    description: "Basic, Professional & Advanced course track syllabus",
    icon: BookOpen,
  },
  {
    id: "faqs",
    number: 4,
    shortLabel: "4. FAQs & Contact",
    fullLabel: "FAQs & Contacts",
    breadcrumbLabel: "FAQs & Contacts",
    ariaLabel: "FAQs & Contacts (4. FAQs & Contact)",
    description: "Frequently asked questions, center phone, email & WhatsApp",
    icon: HelpCircle,
  },
  {
    id: "reviews",
    number: 5,
    shortLabel: "5. Mani Sir Profile",
    fullLabel: "Reviews & Founder",
    breadcrumbLabel: "Founder Profile & Reviews",
    ariaLabel: "Reviews & Founder (5. Mani Sir Profile)",
    description: "Official portrait, narrative bio, mission statement & testimonials",
    icon: User,
  },
  {
    id: "story",
    number: 6,
    shortLabel: "6. Logo & Promises",
    fullLabel: "Story & Promises",
    breadcrumbLabel: "Brand Story & Promises",
    ariaLabel: "Story & Promises (6. Logo & Promises)",
    description: "10 Promises, Eagle parable, Spirit of LIFE & 4 Pillars",
    icon: Sparkles,
  },
  {
    id: "legal",
    number: 7,
    shortLabel: "7. Legal",
    fullLabel: "Legal & Policies",
    breadcrumbLabel: "Legal & Policies",
    ariaLabel: "Legal & Policies (7. Legal)",
    description: "Privacy policy, Terms of use & DPDP compliance data notice",
    icon: ShieldCheck,
  },
];

export interface AdminBreadcrumbsProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isSaving?: boolean;
  saveStatus?: {
    type: "success" | "error";
    message: string;
  } | null;
  counts?: {
    gallery?: number;
    courses?: number;
    faqs?: number;
    reviews?: number;
    legal?: number;
  };
}

export function AdminBreadcrumbs({
  activeTab,
  onTabChange,
  isSaving = false,
  saveStatus = null,
  counts = {},
}: AdminBreadcrumbsProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const pillListRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const currentTabConfig = ADMIN_TABS.find((t) => t.id === activeTab) || ADMIN_TABS[0];
  const CurrentIcon = currentTabConfig.icon;

  // Auto-scroll active pill into view when tab changes
  useEffect(() => {
    const activeBtn = pillRefs.current[activeTab];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  // Close popover on outside click or Escape
  useEffect(() => {
    if (!isPopoverOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsPopoverOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const getTabCount = (tabId: AdminTab): number | undefined => {
    switch (tabId) {
      case "gallery":
        return counts.gallery;
      case "courses":
        return counts.courses;
      case "faqs":
        return counts.faqs;
      case "reviews":
        return counts.reviews;
      case "legal":
        return counts.legal;
      default:
        return undefined;
    }
  };

  return (
    <nav
      aria-label="Admin Navigation"
      className="sticky top-0 z-30 mb-6 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-y sm:border border-stone-800 bg-obsidian-900/90 px-4 py-3 shadow-xl backdrop-blur-md transition-all"
    >
      {/* Top Breadcrumb Row: Left = Path + Popover Dropdown; Right = Save Status Indicator */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-stone-800/70">
        {/* Breadcrumb Path & Section Popover Toggle */}
        <div className="relative flex items-center gap-1.5 min-w-0" ref={popoverRef}>
          <span className="shrink-0 text-xs font-semibold text-stone-400">
            LIFE Admin
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-600" />

          {/* Interactive Section Name Button (opens compact popover) */}
          <button
            type="button"
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            aria-label="Jump to section"
            aria-expanded={isPopoverOpen}
            aria-haspopup="true"
            className="group flex items-center gap-1.5 rounded-lg border border-stone-700/80 bg-stone-800/60 px-2.5 py-1 text-xs font-semibold text-stone-100 transition hover:border-amber-500/60 hover:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            title="Click to jump to any section"
          >
            <CurrentIcon className="h-3.5 w-3.5 text-ember-400" />
            <span aria-hidden="true" className="truncate max-w-[170px] sm:max-w-none text-stone-100 group-hover:text-amber-300">
              {currentTabConfig.breadcrumbLabel}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3 w-3 text-stone-400 transition-transform duration-200",
                isPopoverOpen && "rotate-180 text-amber-400",
              )}
            />
          </button>

          {/* Dropdown Popover Menu (All 7 Tabs) */}
          {isPopoverOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 rounded-2xl border border-stone-700 bg-obsidian-950/95 p-2 shadow-2xl backdrop-blur-xl animate-menu-in">
              <div className="px-3 py-2 border-b border-stone-800/80 mb-1">
                <p className="text-[11px] font-bold tracking-wider uppercase text-stone-400">
                  Switch Admin Section
                </p>
                <p className="text-[11px] text-stone-500">
                  Select a section to edit its website content
                </p>
              </div>

              <div className="space-y-0.5 max-h-[60vh] overflow-y-auto">
                {ADMIN_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = tab.id === activeTab;
                  const count = getTabCount(tab.id);

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-label={`Switch to ${tab.fullLabel}`}
                      onClick={() => {
                        onTabChange(tab.id);
                        setIsPopoverOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition",
                        isSelected
                          ? "bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500/30"
                          : "text-stone-300 hover:bg-stone-800/80 hover:text-white",
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1",
                            isSelected
                              ? "bg-amber-500/20 text-amber-300 ring-amber-500/40"
                              : "bg-stone-800/80 text-stone-400 ring-stone-700/50",
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="truncate">
                          <p className="font-medium text-stone-200 leading-tight">
                            {tab.fullLabel}
                            {count !== undefined && (
                              <span className="ml-1.5 text-[10px] text-stone-500">
                                ({count})
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-stone-400 truncate mt-0.5">
                            {tab.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-amber-400 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Status Indicator: Saved / Saving / Error */}
        <div className="shrink-0 flex items-center gap-1.5 text-xs">
          {isSaving ? (
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
              <RefreshCw className="h-3 w-3 animate-spin text-amber-400" />
              <span>Saving...</span>
            </span>
          ) : saveStatus?.type === "error" ? (
            <span
              className="inline-flex items-center gap-1 text-red-400 font-medium"
              title={saveStatus.message}
            >
              <AlertCircle className="h-3 w-3 text-red-400" />
              <span>Save Error</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              <span>Saved</span>
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Fast-Track Pills Row (Tabs 1 to 7) */}
      <div
        ref={pillListRef}
        className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 scrollbar-none"
      >
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isSelected = tab.id === activeTab;
          const count = getTabCount(tab.id);

          return (
            <button
              key={tab.id}
              ref={(el) => {
                pillRefs.current[tab.id] = el;
              }}
              type="button"
              aria-label={tab.ariaLabel}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-amber-500",
                isSelected
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-obsidian-950 font-bold shadow-md shadow-amber-950/30 ring-1 ring-amber-400/50"
                  : "border border-stone-800 bg-stone-900/70 text-stone-300 hover:border-stone-700 hover:bg-stone-800 hover:text-white",
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  isSelected
                    ? "text-obsidian-950"
                    : "text-stone-400 group-hover:text-amber-400",
                )}
              />
              <span>{tab.shortLabel}</span>
              {count !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-semibold",
                    isSelected
                      ? "bg-obsidian-950/20 text-obsidian-950"
                      : "bg-stone-800 text-stone-400 group-hover:text-stone-200",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
