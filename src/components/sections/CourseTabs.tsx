"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, BookMarked, CheckCircle2, Clock, Users } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { TrialButton } from "@/components/modals/ModalTriggers";
import { button, cn } from "@/lib/cn";
import { COURSES, type Course } from "@/lib/content";
import { courseCopy } from "@/lib/site-copy";

export function CourseTabs() {
  const [value, setValue] = useState<Course["id"]>(COURSES[0].id);

  return (
    <Tabs.Root value={value} onValueChange={(v) => setValue(v as Course["id"])} className="mt-14">
      <Tabs.List
        aria-label="Course tracks"
        className="glass mx-auto grid max-w-3xl grid-cols-3 gap-1 rounded-2xl p-1.5"
      >
        {COURSES.map((course) => {
          const Icon = course.icon;
          const active = value === course.id;
          return (
            <Tabs.Trigger
              key={course.id}
              value={course.id}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-ember-400 sm:flex-row sm:justify-center sm:gap-2 sm:text-sm",
                active
                  ? "bg-linear-to-r from-ember-400 to-sun-400 text-obsidian-950 shadow-[0_8px_30px_-8px_rgb(234_138_42/0.6)]"
                  : "text-stone-400 hover:bg-stone-800/50 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              <span>{course.name.replace(" Course", "")}</span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {COURSES.map((course) => (
        <Tabs.Content key={course.id} value={course.id} className="mt-8 focus-visible:outline-none">
          <CoursePanel course={course} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

function CoursePanel({ course }: { course: Course }) {
  const Icon = course.icon;
  return (
    <div
      className="animate-fade-up glass glow-card grid gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 lg:grid-cols-5"
    >
      <div className="lg:col-span-2">
        <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-ember-400 to-sun-500 text-obsidian-950">
          <Icon className="size-7" />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">{course.name}</h3>
        <p className="mt-2 text-stone-400">{course.tagline}</p>

        <dl className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-amber-400" />
            <div>
              <dt className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Duration</dt>
              <dd className="font-semibold text-white">{course.duration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 size-5 shrink-0 text-sun-400" />
            <div>
              <dt className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Ideal for</dt>
              <dd className="text-stone-200">{course.audience}</dd>
            </div>
          </div>
        </dl>

        <TrialButton course={course.id} className={button("primary", "md", "mt-8")}>
          {courseCopy.feePolicies.regularCard.cta} <ArrowRight className="size-4" />
        </TrialButton>
      </div>

      <div className="rounded-2xl border border-stone-800 bg-obsidian-950/50 p-6 sm:p-8 lg:col-span-3">
        <p className="text-xs font-semibold tracking-wider text-ember-300 uppercase">What you&apos;ll master</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {course.focus.map((item, i) => (
            <li
              key={item}
              style={{ "--delay": `${100 + i * 50}ms` } as CSSProperties}
              className="animate-fade-up flex items-start gap-3 rounded-xl border border-stone-800/80 bg-stone-900/50 p-4"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ember-400" />
              <span className="text-sm font-medium text-stone-200">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs font-semibold tracking-wider text-sun-300 uppercase">Included in every track</p>
        <ul className="mt-4 grid gap-3">
          <li className="flex items-start gap-3 rounded-xl border border-ember-500/30 bg-ember-500/5 p-4">
            <Users className="mt-0.5 size-5 shrink-0 text-ember-400" />
            <span className="text-sm text-stone-200">
              <strong className="block text-white">Small, exclusive batches</strong>
              {courseCopy.admissionTerms.capacity}
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-sun-400/30 bg-sun-400/5 p-4">
            <BookMarked className="mt-0.5 size-5 shrink-0 text-sun-300" />
            <span className="text-sm text-stone-200">
              <strong className="block text-white">{courseCopy.admissionTerms.booklet.title}</strong>
              {courseCopy.admissionTerms.booklet.body}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
