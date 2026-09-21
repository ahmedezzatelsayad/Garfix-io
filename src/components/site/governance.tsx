"use client";

import { ShieldCheck } from "lucide-react";
import { useDict } from "@/lib/store";

export function Governance() {
  const t = useDict();
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="gov-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Governance */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[#A3E635]/10 px-3 py-1 text-xs font-semibold text-[#65A30D]">
              {t.governance.eyebrow}
            </span>
            <h2
              id="gov-title"
              className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
            >
              {t.governance.title}
            </h2>
            <ul className="mt-8 space-y-4">
              {t.governance.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#A3E635]/15 text-[#65A30D]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-relaxed text-[#475569]">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div
            id="cta"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#1E40AF] to-[#0F172A] p-8 sm:p-10 text-white shadow-2xl shadow-[#2563EB]/20"
          >
            {/* Decorative grid */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {t.cta.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80">
                {t.cta.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setView("login")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg hover:bg-white/90 transition-colors"
                >
                  {t.cta.button}
                </button>
                <a
                  href="mailto:hello@garfix.io"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  {t.cta.secondary}
                </a>
              </div>

              {/* Small KPI strip */}
              <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/15">
                <div>
                  <div className="text-2xl font-extrabold tabular">9</div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    {t.how.eyebrow}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold tabular">2</div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    {t.services.eyebrow}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold tabular">100%</div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    {t.governance.eyebrow}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
