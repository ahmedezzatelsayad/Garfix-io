"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import { useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

const AD_SPEND_DATA = [
  { day: "س", dayEn: "Sun", v: 2400 },
  { day: "ح", dayEn: "Mon", v: 1398 },
  { day: "ن", dayEn: "Tue", v: 3800 },
  { day: "ث", dayEn: "Wed", v: 3908 },
  { day: "ر", dayEn: "Thu", v: 4800 },
  { day: "خ", dayEn: "Fri", v: 3800 },
  { day: "ج", dayEn: "Sat", v: 4300 },
];

const CONVERSIONS_DATA = [
  { day: "س", dayEn: "Sun", v: 24 },
  { day: "ح", dayEn: "Mon", v: 18 },
  { day: "ن", dayEn: "Tue", v: 32 },
  { day: "ث", dayEn: "Wed", v: 41 },
  { day: "ر", dayEn: "Thu", v: 38 },
  { day: "خ", dayEn: "Fri", v: 45 },
  { day: "ج", dayEn: "Sat", v: 52 },
];

type ChartType = "spend" | "conversions";

export function PerformanceCharts() {
  const t = useDict();
  const isEn = t.dash.sidebar.overview === "Overview";
  const [chart, setChart] = useState<ChartType>("spend");

  const data = chart === "spend" ? AD_SPEND_DATA : CONVERSIONS_DATA;
  const color = chart === "spend" ? "#2563EB" : "#A3E635";
  const gradId = chart === "spend" ? "grad-blue" : "grad-lime";

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/8 text-[#2563EB]">
            {chart === "spend" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <BarChart3 className="h-4 w-4" />
            )}
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-[#0F172A]">
              {chart === "spend"
                ? isEn
                  ? "Ad spend (last 7 days)"
                  : "الإنفاق الإعلاني (آخر 7 أيام)"
                : isEn
                ? "Conversions (last 7 days)"
                : "التحويلات (آخر 7 أيام)"}
            </h3>
            <p className="text-[10px] text-[#64748B] mt-0.5">
              {isEn ? "Updated daily" : "بيتحدّث يوميًا"}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setChart("spend")}
            className={cn(
              "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
              chart === "spend"
                ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
            )}
          >
            {isEn ? "Spend" : "إنفاق"}
          </button>
          <button
            onClick={() => setChart("conversions")}
            className={cn(
              "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
              chart === "conversions"
                ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
            )}
          >
            {isEn ? "Conv." : "تحويلات"}
          </button>
        </div>
      </div>

      <div className="h-56 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chart === "spend" ? (
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-blue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey={isEn ? "dayEn" : "day"}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "#0F172A",
                }}
                formatter={(v: number) => [`${v.toLocaleString()} EGP`, isEn ? "Spend" : "إنفاق"]}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#${gradId})`}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-lime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A3E635" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#84CC16" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey={isEn ? "dayEn" : "day"}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "#0F172A",
                }}
                formatter={(v: number) => [v, isEn ? "Conversions" : "تحويلات"]}
                cursor={{ fill: "#F8FAFC" }}
              />
              <Bar dataKey="v" fill={`url(#${gradId})`} radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
