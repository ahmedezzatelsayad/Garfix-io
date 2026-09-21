"use client";

import { ArrowRight, ArrowLeft, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { GarfixLogo } from "./logo";

export function Hero() {
  const locale = useApp((s) => s.locale);
  const setView = useApp((s) => s.setView);
  const t = useDict();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const primaryCta = () => setView("login");

  return (
    <section
      id="home"
      className="relative overflow-hidden brand-grid"
      aria-labelledby="hero-title"
    >
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-[#2563EB]/15 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -end-24 h-96 w-96 rounded-full bg-[#A3E635]/15 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#0F172A]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>{t.brand.heroEyebrow}</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
            >
              <span className="block">{t.hero.title1}</span>
              <span className="block gradient-text animated-gradient">{t.hero.title2}</span>
              <span className="block">{t.hero.title3}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#475569]">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={primaryCta}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors"
              >
                {t.hero.primaryCta}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo("pricing")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
              >
                {t.hero.secondaryCta}
              </button>
            </div>

            {/* Trust line */}
            <p className="mt-8 flex items-center gap-2 text-xs text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-[#A3E635]" />
              {t.hero.trustLine}
            </p>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {t.hero.stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-4 card-hover hover:border-[#2563EB]/30 hover:shadow-md"
                >
                  <dt className="text-2xl font-extrabold text-[#0F172A] tabular">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-[#64748B] leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const t = useDict();
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Main card — mock dashboard */}
      <div className="relative rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-2xl shadow-[#0F172A]/5">
        <div className="flex items-center justify-between">
          <GarfixLogo variant="mark" className="h-9 w-9" />
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
            live
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748B]">{t.pricing.calc.budgetLabel}</span>
            <span className="text-xs font-semibold text-[#0F172A] tabular">10,000 {t.pricing.calc.currency}</span>
          </div>

          {/* Bar chart */}
          <div className="grid grid-cols-7 gap-1.5 items-end h-32">
            {[40, 55, 35, 70, 60, 85, 95].map((h, i) => (
              <div
                key={i}
                className="rounded-t-md bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl bg-[#F8FAFC] p-3">
              <div className="text-[10px] text-[#64748B]">{t.pricing.calc.resultAgency}</div>
              <div className="text-base font-bold text-[#0F172A] tabular">2,000</div>
            </div>
            <div className="rounded-xl bg-[#A3E635]/15 p-3">
              <div className="text-[10px] text-[#64748B]">{t.pricing.calc.resultErp}</div>
              <div className="text-base font-bold text-[#65A30D]">{t.pricing.table.rows[2].fee.split(" ")[0]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -end-4 sm:-end-6 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-xl flex items-center gap-2 max-w-[180px]">
        <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="text-[10px] text-[#64748B]">+38%</div>
          <div className="text-xs font-semibold text-[#0F172A]">ROI uplift</div>
        </div>
      </div>
    </div>
  );
}
