"use client";

import { Check, X, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Comparison() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const setView = useApp((s) => s.setView);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="comparison"
      className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="comparison-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.comparison.eyebrow}
          </span>
          <h2
            id="comparison-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.comparison.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569]">
            {t.comparison.subtitle}
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden shadow-lg">
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="px-6 py-5 text-start text-xs font-bold uppercase tracking-wide text-[#64748B] w-1/2">
                    {t.comparison.columns.feature}
                  </th>
                  <th className="px-6 py-5 text-center bg-[#2563EB] text-white">
                    <div className="font-display text-base font-extrabold">
                      {t.comparison.columns.garfix}
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-[#64748B]">
                    <div className="font-display text-sm font-bold">
                      {t.comparison.columns.competitors}
                    </div>
                    <div className="text-[10px] mt-1 opacity-70">
                      Madgicx · AdCreative · HighLevel · HubSpot
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {t.comparison.features.map((f, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#0F172A]">
                      {f.name}
                    </td>
                    <td className="px-6 py-4 text-center bg-[#2563EB]/5">
                      <Cell value={f.garfix} highlight />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={f.others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748B] max-w-md">
            {t.comparison.subtitle}
          </p>
          <button
            onClick={() => setView("login")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors"
          >
            {t.comparison.cta}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Cell({
  value,
  highlight = false,
}: {
  value: boolean | string;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center h-7 w-7 rounded-full",
          highlight ? "bg-[#2563EB] text-white" : "bg-[#A3E635]/15 text-[#65A30D]"
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 text-slate-400">
        <X className="h-4 w-4" />
      </span>
    );
  }
  // String value (e.g. "separate", "limited")
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        highlight
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "bg-amber-100 text-amber-700"
      )}
    >
      <Minus className="h-3 w-3" />
      {value}
    </span>
  );
}
