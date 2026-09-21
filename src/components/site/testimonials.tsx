"use client";

import { Star, Quote } from "lucide-react";
import { useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useDict();
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 brand-grid" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-[#A3E635]/10 px-3 py-1 text-xs font-semibold text-[#65A30D]">
            {t.testimonials.eyebrow}
          </span>
          <h2
            id="testimonials-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.testimonials.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
            {t.testimonials.subtitle}
          </p>

          {/* Stars */}
          <div className="mt-5 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 fill-[#FCD34D] text-[#FCD34D]" />
            ))}
            <span className="ms-2 text-sm font-semibold text-[#0F172A]">4.9/5</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.testimonials.items.map((item, i) => (
            <article
              key={i}
              className="relative rounded-2xl border border-[#E2E8F0] bg-white p-6 card-hover hover:shadow-xl hover:border-[#2563EB]/20 hover:-translate-y-0.5"
            >
              <Quote className="h-6 w-6 text-[#2563EB]/20 mb-3" />
              <p className="text-sm leading-relaxed text-[#475569]">
                "{item.quote}"
              </p>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full font-display text-base font-bold flex-shrink-0",
                    item.tone === "blue" && "bg-[#2563EB]/10 text-[#2563EB]",
                    item.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]",
                    item.tone === "navy" && "bg-[#0F172A]/8 text-[#0F172A]"
                  )}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#0F172A] truncate">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate">
                    {item.business}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
