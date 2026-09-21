"use client";

import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PricingTiers() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const setView = useApp((s) => s.setView);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="tiers"
      className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="tiers-title"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 brand-grid" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.pricingTiers.eyebrow}
          </span>
          <h2
            id="tiers-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.pricingTiers.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569]">
            {t.pricingTiers.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-start">
          {t.pricingTiers.tiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                "relative rounded-3xl border bg-white p-7 card-hover",
                tier.popular
                  ? "border-[#2563EB] ring-2 ring-[#2563EB]/15 shadow-xl hover:shadow-2xl"
                  : "border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-lg"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-px inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB] rounded-t-3xl" />
              )}

              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                  <Sparkles className="h-3 w-3" />
                  {t.pricingTiers.popular}
                </div>
              )}

              {/* Header */}
              <div className="text-center pt-2">
                <h3 className="font-display text-2xl font-extrabold text-[#0F172A]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-xs text-[#64748B]">{tier.tagline}</p>
              </div>

              {/* Price range */}
              <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-4 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-3xl font-extrabold text-[#0F172A] tabular">
                    {tier.minBudget}
                  </span>
                  <span className="text-sm text-[#64748B]">–</span>
                  <span className="font-display text-3xl font-extrabold text-[#0F172A] tabular">
                    {tier.maxBudget}
                  </span>
                </div>
                <div className="mt-1 text-xs text-[#64748B]">
                  {tier.currency}
                </div>
              </div>

              {/* Fee */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E2E8F0] px-4 py-3">
                <span className="text-xs text-[#475569]">{tier.feeLabel}</span>
                <span className="font-display text-lg font-bold text-[#2563EB] tabular">
                  {tier.fee}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-5 space-y-2.5">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-[#475569]">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-shrink-0",
                        tier.popular ? "text-[#2563EB]" : "text-[#65A30D]"
                      )}
                      strokeWidth={3}
                    />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setView("login")}
                className={cn(
                  "mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors group",
                  tier.popular
                    ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF]"
                    : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                )}
              >
                {t.pricingTiers.cta}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
