"use client";

import { useDict } from "@/lib/store";

export function StatsBar() {
  const t = useDict();
  return (
    <section
      className="bg-[#0F172A] text-white border-y border-white/5"
      aria-label={t.statsBar.label}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {t.statsBar.items.map((item, i) => (
            <div
              key={i}
              className="text-center sm:text-start relative group"
            >
              <dt className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular">
                <span className="gradient-text bg-gradient-to-r from-[#60A5FA] via-white to-[#A3E635] bg-clip-text text-transparent">
                  {item.value}
                </span>
              </dt>
              <dd className="mt-1.5 text-xs sm:text-sm text-white/65 leading-snug">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
