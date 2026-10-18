"use client";

import { BookOpen, CheckCircle2, ChevronDown, Phone, User } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { button, cn } from "@/lib/cn";
import {
  COURSE_INTEREST_OPTIONS,
  LEARNER_CATEGORIES,
  LEARNING_MODES,
  type CourseInterestId,
} from "@/lib/content";
import { enrollmentCopy } from "@/lib/site-copy";
import { whatsappLink } from "@/lib/site";

type Category = (typeof LEARNER_CATEGORIES)[number];
type Mode = (typeof LEARNING_MODES)[number];
type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

const inputClass =
  "w-full rounded-xl border border-stone-700/80 bg-obsidian-950/60 py-3 pr-4 pl-11 text-white placeholder:text-stone-500 transition outline-none focus:border-ember-500/70 focus:ring-4 focus:ring-ember-500/15 aria-invalid:border-rose-500/70";

const chipClass =
  "flex cursor-pointer items-center justify-center rounded-xl border border-stone-700/80 bg-obsidian-950/40 px-3 py-2.5 text-center text-sm font-medium text-stone-300 transition hover:border-stone-500 has-checked:border-ember-500/70 has-checked:bg-ember-500/10 has-checked:text-ember-200 has-focus-visible:ring-2 has-focus-visible:ring-ember-400";

const courseLabel = (courseId: CourseInterestId) =>
  COURSE_INTEREST_OPTIONS.find((o) => o.id === courseId)?.label ?? COURSE_INTEREST_OPTIONS[0].label;

export function EnrollmentForm({ defaultCourse = "basic" }: { defaultCourse?: CourseInterestId }) {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<Category>(LEARNER_CATEGORIES[0]);
  const [mode, setMode] = useState<Mode>(LEARNING_MODES[0]);
  const [course, setCourse] = useState<CourseInterestId>(defaultCourse);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const normalised = normalisePhone(phone);
    const nextErrors: Errors = {};
    if (trimmedName.length < 2) nextErrors.name = enrollmentCopy.validationErrors.name;
    if (!normalised) nextErrors.phone = enrollmentCopy.validationErrors.phone;
    if (!consent) nextErrors.consent = enrollmentCopy.validationErrors.consent;
    setErrors(nextErrors);
    if (!normalised || nextErrors.name || nextErrors.consent) return;

    const url = whatsappLink(
      enrollmentCopy.buildWhatsAppMessage({
        name: trimmedName,
        phone: normalised,
        category,
        mode,
        course: courseLabel(course),
      }),
    );
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-stone-200">
          {enrollmentCopy.fieldLabels.fullName}
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone-500" />
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={enrollmentCopy.placeholders.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={inputClass}
          />
        </div>
        {errors.name && (
          <p id={`${id}-name-error`} className="mt-1.5 text-sm text-rose-400">
            {errors.name}
          </p>
        )}
      </div>


      <div>
        <label htmlFor={`${id}-phone`} className="mb-1.5 block text-sm font-medium text-stone-200">
          {enrollmentCopy.fieldLabels.phoneNumber}
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone-500" />
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={enrollmentCopy.placeholders.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            className={inputClass}
          />
        </div>
        {errors.phone && (
          <p id={`${id}-phone-error`} className="mt-1.5 text-sm text-rose-400">
            {errors.phone}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-stone-200">{enrollmentCopy.fieldLabels.category}</legend>
        <div className="grid grid-cols-2 gap-2">
          {LEARNER_CATEGORIES.map((option, i) => (
            <label
              key={option}
              className={cn(
                chipClass,
                LEARNER_CATEGORIES.length % 2 === 1 && i === LEARNER_CATEGORIES.length - 1 && "col-span-2",
              )}
            >
              <input
                type="radio"
                name={`${id}-category`}
                value={option}
                checked={category === option}
                onChange={() => setCategory(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-course`} className="mb-1.5 block text-sm font-medium text-stone-200">
          {enrollmentCopy.fieldLabels.course}
        </label>
        <div className="relative">
          <BookOpen className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone-500" />
          <select
            id={`${id}-course`}
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value as CourseInterestId)}
            className={cn(inputClass, "cursor-pointer appearance-none pr-10")}
          >
            {COURSE_INTEREST_OPTIONS.map((option) => (
              <option key={option.id} value={option.id} className="bg-obsidian-900 text-white">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-stone-400" />
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-stone-200">{enrollmentCopy.fieldLabels.mode}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {LEARNING_MODES.map((option) => (
            <label key={option} className={chipClass}>
              <input
                type="radio"
                name={`${id}-mode`}
                value={option}
                checked={mode === option}
                onChange={() => setMode(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-consent`} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-300">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={`${id}-consent-note${errors.consent ? ` ${id}-consent-error` : ""}`}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-ember-500"
          />
          <span>
            {enrollmentCopy.consent.agreeText}{" "}
            <Link href="/privacy" className="text-ember-300 underline hover:text-ember-200">
              {enrollmentCopy.consent.policyLinkText}
            </Link>
            .
          </span>
        </label>
        <p id={`${id}-consent-note`} className="mt-2 pl-7 text-xs text-stone-500">
          {enrollmentCopy.consent.minorNote}
        </p>
        {errors.consent && (
          <p id={`${id}-consent-error`} className="mt-1.5 pl-7 text-sm text-rose-400">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" className={button("whatsapp", "lg", "w-full")}>
        <WhatsAppIcon className="size-5" />
        {enrollmentCopy.submitButton}
      </button>

      <p
        role="status"
        className={cn(
          "flex items-center justify-center gap-2 text-center text-xs",
          sent ? "text-ember-300" : "text-stone-500",
        )}
      >
        {sent ? (
          <>
            <CheckCircle2 className="size-4" /> {enrollmentCopy.status.opening}
          </>
        ) : (
          enrollmentCopy.status.privacyNote
        )}
      </p>
    </form>
  );
}
