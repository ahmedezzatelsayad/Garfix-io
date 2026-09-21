"use client";

import {
  FileText,
  PenLine,
  Search,
  Boxes,
  Wallet,
  TrendingUp,
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Overview({
  rate,
  monthlyBudget,
}: {
  rate: number;
  monthlyBudget: number;
}) {
  const t = useDict();
  const setDashboardView = useApp((s) => s.setDashboardView);

  const agencyFee = Math.round(monthlyBudget * rate);
  const adSpend = monthlyBudget - agencyFee;

  const kpis = [
    {
      label: t.dash.overview.kpis.budget,
      value: `${monthlyBudget.toLocaleString("en-US")}`,
      currency: t.pricing.calc.currency,
      icon: Wallet,
      tone: "blue" as const,
    },
    {
      label: t.dash.overview.kpis.agencyFee,
      value: `${agencyFee.toLocaleString("en-US")}`,
      currency: t.pricing.calc.currency,
      icon: Receipt,
      tone: "navy" as const,
    },
    {
      label: t.dash.overview.kpis.adSpend,
      value: `${adSpend.toLocaleString("en-US")}`,
      currency: t.pricing.calc.currency,
      icon: TrendingUp,
      tone: "lime" as const,
    },
  ];

  const user = useApp((s) => s.user);
  const erpStatus = user?.erpStatus ?? "pending";
  const erpInfo = {
    active: {
      label: t.dash.erp.status.active,
      icon: CheckCircle2,
      tone: "lime" as const,
    },
    pending: {
      label: t.dash.erp.status.pending,
      icon: Clock,
      tone: "amber" as const,
    },
    inactive: {
      label: t.dash.erp.status.inactive,
      icon: XCircle,
      tone: "red" as const,
    },
  }[erpStatus];

  const actions = [
    { key: "landing", icon: FileText, label: t.dash.overview.actions.newLanding, target: "landing" as const },
    { key: "ads", icon: PenLine, label: t.dash.overview.actions.newAd, target: "ads" as const },
    { key: "library", icon: Search, label: t.dash.overview.actions.searchLibrary, target: "library" as const },
    { key: "erp", icon: Boxes, label: t.dash.overview.actions.openErp, target: "erp" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.overview.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.subtitle}</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 card-hover hover:shadow-md hover:border-[#2563EB]/20"
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    kpi.tone === "blue" && "bg-[#2563EB]/10 text-[#2563EB]",
                    kpi.tone === "navy" && "bg-[#0F172A]/8 text-[#0F172A]",
                    kpi.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-extrabold text-[#0F172A] tabular">
                  {kpi.value}
                  <span className="text-xs font-normal text-[#64748B] ms-1">
                    {kpi.currency}
                  </span>
                </div>
                <div className="mt-1 text-xs text-[#64748B]">{kpi.label}</div>
              </div>
            </div>
          );
        })}

        {/* ERP status card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 card-hover hover:shadow-md hover:border-[#2563EB]/20">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                erpInfo.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]",
                erpInfo.tone === "amber" && "bg-amber-100 text-amber-700",
                erpInfo.tone === "red" && "bg-red-100 text-red-700"
              )}
            >
              <erpInfo.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-base font-bold text-[#0F172A]">{erpInfo.label}</div>
            <div className="mt-1 text-xs text-[#64748B]">
              {t.dash.overview.kpis.erp}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-sm font-bold text-[#0F172A] mb-3">
          {t.dash.overview.quickActions}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.key}
                onClick={() => setDashboardView(a.target)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-start card-hover hover:border-[#2563EB]/30 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-[#0F172A] leading-snug">
                  {a.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty hint */}
      <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white/50 p-6 text-center">
        <p className="text-sm text-[#64748B]">{t.dash.overview.empty}</p>
      </div>
    </div>
  );
}
