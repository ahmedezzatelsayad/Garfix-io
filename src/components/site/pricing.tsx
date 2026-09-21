"use client";

import { useState } from "react";
import { Calculator, Gift, Lightbulb, Info } from "lucide-react";
import { useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

type Plan = "manage" | "manage-content";

export function Pricing() {
  const t = useDict();
  const [budget, setBudget] = useState(10000);
  const [plan, setPlan] = useState<Plan>("manage");

  const rate = plan === "manage" ? 0.2 : 0.3;
  const agencyFee = Math.round(budget * rate);
  const adSpend = budget - agencyFee;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US").format(n);

  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
      aria-labelledby="pricing-title"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 brand-grid" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-[#2563EB]/5 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.pricing.eyebrow}
          </span>
          <h2
            id="pricing-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#475569]">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Idea callout */}
        <div className="mt-10 rounded-2xl border border-[#A3E635]/40 bg-gradient-to-r from-[#A3E635]/10 via-[#A3E635]/5 to-transparent p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#A3E635]/20 text-[#65A30D]">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A]">
                {t.pricing.ideaTitle}
              </h3>
              <p className="mt-1 text-sm text-[#475569] leading-relaxed">
                {t.pricing.ideaBody}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Schedule table */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden">
            <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
              <h3 className="font-display text-base font-bold text-[#0F172A]">
                {t.pricing.table.title}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-start">
                    <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      {t.pricing.table.serviceHead}
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      {t.pricing.table.feeHead}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {t.pricing.table.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4 text-[#0F172A] font-medium">
                        <div className="flex items-center gap-2">
                          {i === 2 ? (
                            <Gift className="h-4 w-4 text-[#65A30D]" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                          )}
                          {r.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular",
                            i === 2
                              ? "bg-[#A3E635]/15 text-[#65A30D]"
                              : "bg-[#2563EB]/8 text-[#2563EB]"
                          )}
                        >
                          {r.fee}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive calculator */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden">
            <div className="border-b border-[#E2E8F0] bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-6 py-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-white" />
                <h3 className="font-display text-base font-bold text-white">
                  {t.pricing.calc.title}
                </h3>
              </div>
              <p className="mt-1 text-xs text-white/80">{t.pricing.calc.subtitle}</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Budget input */}
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-2">
                  {t.pricing.calc.budgetLabel}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-lg font-bold tabular text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                    aria-label={t.pricing.calc.budgetLabel}
                  />
                  <span className="absolute inset-y-0 end-3 flex items-center text-sm text-[#64748B]">
                    {t.pricing.calc.currency}
                  </span>
                </div>
                {/* Quick presets */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[5000, 10000, 25000, 50000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setBudget(v)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium tabular transition-colors",
                        budget === v
                          ? "bg-[#2563EB] text-white"
                          : "bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E8F0]"
                      )}
                    >
                      {fmt(v)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan selector */}
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-2">
                  {t.pricing.calc.planLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPlan("manage")}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-start transition-all",
                      plan === "manage"
                        ? "border-[#2563EB] bg-[#2563EB]/5 ring-1 ring-[#2563EB]/20"
                        : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                    )}
                  >
                    <div className="text-sm font-semibold text-[#0F172A]">20%</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">
                      {t.pricing.calc.plan1.split("—")[0]}
                    </div>
                  </button>
                  <button
                    onClick={() => setPlan("manage-content")}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-start transition-all",
                      plan === "manage-content"
                        ? "border-[#2563EB] bg-[#2563EB]/5 ring-1 ring-[#2563EB]/20"
                        : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                    )}
                  >
                    <div className="text-sm font-semibold text-[#0F172A]">30%</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">
                      {t.pricing.calc.plan2.split("—")[0]}
                    </div>
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-3">
                <ResultRow
                  label={t.pricing.calc.resultAgency}
                  value={`${fmt(agencyFee)} ${t.pricing.calc.currency}`}
                  tone="blue"
                />
                <ResultRow
                  label={t.pricing.calc.resultAdSpend}
                  value={`${fmt(adSpend)} ${t.pricing.calc.currency}`}
                  tone="dark"
                />
                <ResultRow
                  label={t.pricing.calc.resultGross}
                  value={`${fmt(budget)} ${t.pricing.calc.currency}`}
                  tone="muted"
                />
                <div className="border-t border-[#E2E8F0] pt-3">
                  <ResultRow
                    label={t.pricing.calc.resultErp}
                    value={t.pricing.calc.erpNote}
                    tone="lime"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#2563EB]">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-[#0F172A]">
              {t.pricing.calc.exampleTitle}
            </h3>
            <p className="mt-1 text-sm text-[#475569] leading-relaxed">
              {t.pricing.calc.exampleBody}
            </p>
          </div>
        </div>

        {/* Note */}
        <p className="mt-6 text-xs text-[#64748B] italic leading-relaxed max-w-3xl">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "dark" | "muted" | "lime";
}) {
  const toneClass = {
    blue: "text-[#2563EB]",
    dark: "text-[#0F172A]",
    muted: "text-[#64748B]",
    lime: "text-[#65A30D]",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-[#475569]">{label}</span>
      <span className={cn("font-bold tabular text-sm sm:text-base", toneClass)}>
        {value}
      </span>
    </div>
  );
}
