"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/locale-store";

/**
 * Applies the current locale to <html lang/dir> and provides dictionary access.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale((s) => s.locale);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <>{children}</>;
}
