"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Rocket } from "lucide-react";
import { useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "complete-profile", icon: "👤" },
  { id: "first-landing", icon: "📄" },
  { id: "first-ad", icon: "✍️" },
  { id: "connect-fb", icon: "🔍" },
  { id: "open-erp", icon: "📦" },
] as const;

export function OnboardingChecklist() {
  const t = useDict();
  // Translation map for step labels (since they're dynamic IDs)
  const stepLabels: Record<string, string> = {
    "complete-profile":
      t.dash.sidebar.overview === "Overview"
        ? "Complete your profile"
        : "أكمل بيانات حسابك",
    "first-landing":
      t.dash.sidebar.landing === "Landing Page builder"
        ? "Build your first Landing Page"
        : "ابني أول Landing Page ليك",
    "first-ad":
      t.dash.sidebar.ads === "Ad writer"
        ? "Write your first ad copy"
        : "اكتب أول نسخة إعلانية",
    "connect-fb":
      t.dash.sidebar.library === "Facebook Ads Library"
        ? "Search Facebook Ads Library"
        : "ابحث في Facebook Ads Library",
    "open-erp":
      t.dash.sidebar.erp === "Garfix ERP"
        ? "Open Garfix ERP"
        : "افتح Garfix ERP",
  };

  const [done, setDone] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = Math.round((done.size / STEPS.length) * 100);

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white via-white to-[#EFF6FF] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-[#0F172A]">
              {t.dash.sidebar.overview === "Overview"
                ? "Onboarding checklist"
                : "قائمة البدء"}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {done.size}/{STEPS.length} · {progress}%
            </p>
          </div>
        </div>
        {progress === 100 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#A3E635]/15 px-2.5 py-1 text-xs font-semibold text-[#65A30D]">
            <CheckCircle2 className="h-3 w-3" />
            {t.dash.sidebar.overview === "Overview" ? "Done!" : "خلصت!"}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2563EB] to-[#A3E635] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-1">
        {STEPS.map((step) => {
          const isDone = done.has(step.id);
          return (
            <li key={step.id}>
              <button
                onClick={() => toggle(step.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-start transition-colors",
                  isDone
                    ? "bg-[#A3E635]/8 text-[#65A30D]"
                    : "hover:bg-[#F8FAFC] text-[#0F172A]"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 flex-shrink-0 text-[#CBD5E1]" />
                )}
                <span className="text-base" aria-hidden>
                  {step.icon}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium leading-snug",
                    isDone && "line-through opacity-60"
                  )}
                >
                  {stepLabels[step.id]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
