"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Faq() {
  const t = useDict();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {t.faq.eyebrow}
          </span>
          <h2
            id="faq-title"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            {t.faq.title}
          </h2>
        </div>

        <dl className="mt-12 space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border bg-white overflow-hidden transition-colors",
                  isOpen
                    ? "border-[#2563EB]/30 shadow-md"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                )}
              >
                <dt>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-[#0F172A]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 flex-shrink-0 text-[#2563EB] transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                </dt>
                <dd
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#475569]">
                      {item.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
