"use client";

import { useDict } from "@/lib/locale-store";

export function HowWeWork() {
  const t = useDict();

  return (
    <section
      id="how"
      className="py-20 sm:py-28 bg-[#0F172A] relative overflow-hidden"
      aria-labelledby="how-title"
    >
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-[#2563EB] blur-3xl" />
        <div className="absolute bottom-0 end-1/4 h-72 w-72 rounded-full bg-[#A3E635] blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-white">
            {t.how.eyebrow}
          </span>
          <h2
            id="how-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            {t.how.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/70">
            {t.how.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.how.steps.map((step, i) => (
            <li
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 transition-all hover:bg-white/[0.08] hover:border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white shadow-lg shadow-[#2563EB]/30">
                  <span className="font-display text-base font-extrabold tabular">
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Subtle number watermark */}
              <span className="pointer-events-none absolute -bottom-4 -end-2 font-display text-7xl font-extrabold text-white/[0.04] tabular">
                {step.n}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
