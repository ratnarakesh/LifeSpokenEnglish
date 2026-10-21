"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-xl transition duration-300 print:hidden",
        showLabel
          ? "w-full px-4 py-3 text-base font-medium text-stone-200 hover:bg-stone-800/60"
          : "size-10 text-stone-300 ring-1 ring-stone-800 hover:border-ember-500/50 hover:bg-stone-800/70 hover:text-white",
        className,
      )}
    >
      <div className="relative grid size-5 place-items-center">
        <Sun
          className={cn(
            "size-4.5 transition-all duration-300",
            isDark ? "scale-0 rotate-90 opacity-0 absolute" : "scale-100 rotate-0 opacity-100 text-ember-500",
          )}
        />
        <Moon
          className={cn(
            "size-4.5 transition-all duration-300",
            isDark ? "scale-100 rotate-0 opacity-100 text-sun-300" : "scale-0 -rotate-90 opacity-0 absolute",
          )}
        />
      </div>
      {showLabel && (
        <span className="flex-1 text-left">
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </span>
      )}
    </button>
  );
}
