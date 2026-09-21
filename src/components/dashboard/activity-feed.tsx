"use client";

import {
  FileText,
  PenLine,
  Search,
  Boxes,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useDict } from "@/lib/store";

type Activity = {
  icon: React.ComponentType<{ className?: string }>;
  tone: "blue" | "lime" | "navy" | "amber";
  text: string;
  time: string;
};

export function ActivityFeed() {
  const t = useDict();
  const isEn = t.dash.sidebar.overview === "Overview";

  const activities: Activity[] = isEn
    ? [
        { icon: TrendingUp, tone: "lime", text: "Your last campaign reached +12% conversion", time: "2h ago" },
        { icon: FileText, tone: "blue", text: "New Landing Page 'Summer T-shirt' saved", time: "5h ago" },
        { icon: PenLine, tone: "navy", text: "3 ad copies generated for 'Coding Course'", time: "1d ago" },
        { icon: Search, tone: "blue", text: "You searched 'TechStore' in FB Ads Library", time: "1d ago" },
        { icon: Boxes, tone: "amber", text: "ERP activation request submitted", time: "3d ago" },
      ]
    : [
        { icon: TrendingUp, tone: "lime", text: "آخر حملة وصلت لـ +12% تحويلات", time: "من ساعتين" },
        { icon: FileText, tone: "blue", text: "Landing Page جديدة 'تيشيرت صيفي' اتحفظت", time: "من 5 ساعات" },
        { icon: PenLine, tone: "navy", text: "3 نسخ إعلانية اتولّدت لـ 'كورس برمجة'", time: "أمس" },
        { icon: Search, tone: "blue", text: "بحثت على 'TechStore' في FB Ads Library", time: "أمس" },
        { icon: Boxes, tone: "amber", text: "طلب تفعيل ERP اتبعت", time: "من 3 أيام" },
      ];

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/8 text-[#2563EB]">
            <Bell className="h-4 w-4" />
          </div>
          <h3 className="font-display text-sm font-bold text-[#0F172A]">
            {isEn ? "Recent activity" : "آخر النشاطات"}
          </h3>
        </div>
        <span className="inline-flex h-2 w-2 rounded-full bg-[#A3E635] animate-pulse" />
      </div>

      <ol className="space-y-3 max-h-80 overflow-y-auto thin-scroll pe-1">
        {activities.map((a, i) => {
          const Icon = a.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${
                  a.tone === "blue" && "bg-[#2563EB]/10 text-[#2563EB]"
                } ${a.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]"} ${
                  a.tone === "navy" && "bg-[#0F172A]/8 text-[#0F172A]"
                } ${a.tone === "amber" && "bg-amber-100 text-amber-700"}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#0F172A] leading-snug">{a.text}</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">{a.time}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
