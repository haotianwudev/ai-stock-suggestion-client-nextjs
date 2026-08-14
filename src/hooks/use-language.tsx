"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { resolveTranslation, type TranslationKey } from "@/lib/i18n/strings";

export type Language = "en" | "zh";

const STORAGE_KEY = "sophie-lang";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Mounted once at the app root (see layout.tsx), mirroring UserProvider. Starts as "en"
 * on both server and first client render (matches the static `<html lang="en">` in
 * layout.tsx, so hydration never mismatches) -- then a mount-only effect resolves the
 * real value from `?lang=` (highest priority, makes a Chinese-interface link shareable)
 * or localStorage, and flips state if it's "zh". Reads `window.location.search` directly
 * rather than `useSearchParams()` since that hook would force this root-level provider
 * (and therefore the whole app) into dynamic rendering / a Suspense boundary for what's
 * just a cosmetic toggle -- not worth it here.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    const resolved: Language =
      fromQuery === "zh" || fromQuery === "en"
        ? fromQuery
        : window.localStorage.getItem(STORAGE_KEY) === "zh"
          ? "zh"
          : "en";
    // An explicit ?lang= wins for this load AND persists, so a shared link "sticks"
    // for later visits too, not just the one page it was opened on (Link navigation
    // doesn't carry the query param forward -- localStorage is what makes it stick).
    if (fromQuery === "zh" || fromQuery === "en") {
      window.localStorage.setItem(STORAGE_KEY, resolved);
    }
    if (resolved !== "en") setLanguageState(resolved);
    document.documentElement.lang = resolved;
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => resolveTranslation(language, key, vars),
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
