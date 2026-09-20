"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./i18n";
import { dict, defaultLocale } from "./i18n";

type LocaleState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

export const useLocale = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: defaultLocale,
      setLocale: (locale) => set({ locale }),
      toggle: () => set({ locale: get().locale === "ar" ? "en" : "ar" }),
    }),
    { name: "garfix-locale" }
  )
);

/**
 * Convenience hook: subscribe to locale changes and return the dictionary.
 * Always re-renders when locale changes.
 */
export function useDict() {
  const locale = useLocale((s) => s.locale);
  return dict[locale];
}
