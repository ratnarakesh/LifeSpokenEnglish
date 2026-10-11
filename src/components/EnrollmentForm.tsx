"use client";

import { CheckCircle2, Phone, User } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { button, cn } from "@/lib/cn";
import { LEARNER_CATEGORIES, LEARNING_MODES } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

type Category = (typeof LEARNER_CATEGORIES)[number];
type Mode = (typeof LEARNING_MODES)[number];
type Errors = Partial<Record<"name" | "phone", string>>;

function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function buildMessage(name: string, phone: string, category: Category, mode: Mode) {
  return [
    "Hello Mani Sir,",
    "",
    "I would like to register for the 10 Free Trial Classes at LIFE Spoken English & Soft Skills Institute.",
    "",
    `• Name: ${name}`,
    `• Phone: +91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
    `• I am a: ${category}`,
    `• Preferred Mode: ${mode}`,
    "",
    "Kindly share the upcoming batch timings. Thank you!",
  ].join("\n");
}

const inputClass =
  "w-full rounded-xl border border-stone-700/80 bg-obsidian-950/60 py-3 pr-4 pl-11 text-white placeholder:text-stone-500 transition outline-none focus:border-ember-500/70 focus:ring-4 focus:ring-ember-500/15 aria-invalid:border-rose-500/70";

const chipClass =
  "flex cursor-pointer items-center justify-center rounded-xl border border-stone-700/80 bg-obsidian-950/40 px-3 py-2.5 text-center text-sm font-medium text-stone-300 transition hover:border-stone-500 has-checked:border-ember-500/70 has-checked:bg-ember-500/10 has-checked:text-ember-200 has-focus-visible:ring-2 has-focus-visible:ring-ember-400";

export function EnrollmentForm() {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<Category>(LEARNER_CATEGORIES[0]);
  const [mode, setMode] = useState<Mode>(LEARNING_MODES[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const normalised = normalisePhone(phone);
    const nextErrors: Errors = {};
    if (trimmedName.length < 2) nextErrors.name = "Please enter your full name.";
    if (!normalised) nextErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    setErrors(nextErrors);
    if (!normalised || nextErrors.name) return;

    const url = whatsappLink(buildMessage(trimmedName, normalised, category, mode));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-stone-200">
          Full Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone-500" />
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lakshmi Prasanna"
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
          Phone Number
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
            placeholder="98765 43210"
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
        <legend className="mb-1.5 text-sm font-medium text-stone-200">I am a</legend>
        <div className="grid grid-cols-2 gap-2">
          {LEARNER_CATEGORIES.map((option) => (
            <label key={option} className={chipClass}>
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

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-stone-200">Preferred Mode</legend>
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

      <button type="submit" className={button("whatsapp", "lg", "w-full")}>
        <WhatsAppIcon className="size-5" />
        Register for 10 Free Classes via WhatsApp
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
            <CheckCircle2 className="size-4" /> Opening WhatsApp… just tap send to confirm.
          </>
        ) : (
          "Your details are only shared with Mani Sir over WhatsApp. No spam, ever."
        )}
      </p>
    </form>
  );
}
