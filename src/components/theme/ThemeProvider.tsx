"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "life-theme";

function getThemeSnapshot(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event("storage"));
    } catch {}
    applyThemeClass(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next: Theme = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event("storage"));
    } catch {}
    applyThemeClass(next);
  }, []);

  return (
    <ThemeContext value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
