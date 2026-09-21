"use client";

import { useEffect, useState } from "react";
import { Menu, X, Globe, LogIn } from "lucide-react";
import { GarfixLogo } from "./logo";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["home", "services", "pricing", "how", "contact"] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useApp((s) => s.locale);
  const toggle = useApp((s) => s.toggle);
  const setView = useApp((s) => s.setView);
  const t = useDict();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleAnchor(e, "home")}
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Garfix.io home"
          >
            <GarfixLogo />
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={(e) => handleAnchor(e, key)}
                className="nav-link px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{t.switchTo}</span>
            </button>

            <button
              onClick={() => setView("login")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>{t.nav.login}</span>
            </button>

            <a
              href="#cta"
              onClick={(e) => handleAnchor(e, "cta")}
              className="hidden sm:inline-flex items-center rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1E40AF] transition-colors"
            >
              {t.nav.cta}
            </a>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#0F172A] hover:bg-[#F8FAFC]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1" aria-label="Mobile">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={(e) => handleAnchor(e, key)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {t.nav[key]}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                setView("login");
              }}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              {t.nav.login}
            </button>
            <a
              href="#cta"
              onClick={(e) => handleAnchor(e, "cta")}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
