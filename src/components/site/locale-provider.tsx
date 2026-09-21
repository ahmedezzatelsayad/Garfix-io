"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";

/**
 * Applies the current locale to <html lang/dir>.
 * Reads `?token=...` from the URL on first load — if it matches a known client,
 * logs them in and clears the dashboard view.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useApp((s) => s.locale);
  const setView = useApp((s) => s.setView);
  const loginAs = useApp((s) => s.loginAs);
  const clients = useApp((s) => s.clients);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (!token) return;

    // Wait one tick so persisted store is hydrated
    const t = setTimeout(() => {
      const match = clients.find((c) => c.token === token);
      if (match) {
        loginAs(match);
        // Clean the URL so refresh doesn't keep re-applying
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());
      } else if (clients.length > 0) {
        // Token doesn't match any persisted client — go to login screen
        setView("login");
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());
      }
    }, 80);
    return () => clearTimeout(t);
  }, [clients, loginAs, setView]);

  return <>{children}</>;
}
