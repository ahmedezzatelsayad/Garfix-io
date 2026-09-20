"use client";

import { Building2, Boxes, ShieldCheck, Palette } from "lucide-react";
import { useDict } from "@/lib/locale-store";

const ICONS = [Building2, Boxes, ShieldCheck, Palette];

export function ValueProposition() {
  const t = useDict();
  return (
    <section id="value-prop" className="py-20 sm:py-28 bg-white" aria-labelledby="vp-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-[#2563EB]/5 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.valueProp.eyebrow}
          </span>
          <h2
            id="vp-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.valueProp.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#475569]">
            {t.valueProp.body}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.valueProp.cards.map((c, i) => {
            const Icon = ICONS[i] ?? Building2;
            return (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 card-hover hover:border-[#2563EB]/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {c.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
