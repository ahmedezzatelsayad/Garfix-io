"use client";

import {
  Megaphone,
  PenTool,
  LayoutDashboard,
  Store,
  Check,
  Gift,
} from "lucide-react";
import { useDict } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

const ICONS = [Megaphone, PenTool, LayoutDashboard, Store];

export function Services() {
  const t = useDict();

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Top divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-white border border-[#E2E8F0] px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.services.eyebrow}
          </span>
          <h2
            id="services-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#475569]">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i] ?? Megaphone;
            const isGift = "gift" in s && s.gift;
            return (
              <article
                key={s.id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-white p-7 card-hover",
                  isGift
                    ? "border-[#A3E635]/40 ring-1 ring-[#A3E635]/20 hover:shadow-xl hover:border-[#A3E635]"
                    : "border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-lg"
                )}
              >
                {/* Soft top accent for the gift card */}
                {isGift && (
                  <div className="absolute -top-px inset-x-0 h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                        isGift
                          ? "bg-[#A3E635]/15 text-[#65A30D] group-hover:bg-[#A3E635] group-hover:text-white"
                          : "bg-[#2563EB]/8 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#0F172A] leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">{s.enTitle}</p>
                    </div>
                  </div>

                  {isGift && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#A3E635]/15 px-2 py-0.5 text-xs font-semibold text-[#65A30D]">
                      <Gift className="h-3 w-3" />
                      Free
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#475569]">
                  {s.desc}
                </p>

                {/* Fee badge */}
                <div className="mt-5 flex items-baseline gap-2 rounded-xl bg-[#F8FAFC] px-4 py-3">
                  <span className="font-display text-2xl font-extrabold text-[#2563EB] tabular">
                    {s.fee}
                  </span>
                  <span className="text-xs text-[#64748B]">{s.feeLabel}</span>
                </div>

                {/* Feature list */}
                <ul className="mt-5 space-y-2">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[#475569]">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 flex-shrink-0",
                          isGift ? "text-[#65A30D]" : "text-[#2563EB]"
                        )}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
