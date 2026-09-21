"use client";

import {
  Boxes,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Link2,
  AlertCircle,
} from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function ErpLink() {
  const t = useDict();
  const user = useApp((s) => s.user);
  const { toast } = useToast();

  if (!user) return null;
  const status = user.erpStatus;
  const erpUrl = user.erpUrl || "";

  const statusInfo = {
    active: {
      label: t.dash.erp.status.active,
      icon: CheckCircle2,
      tone: "lime" as const,
      desc: t.dash.erp.activeDesc,
      actionLabel: t.dash.erp.openErp,
      actionAvailable: true,
    },
    pending: {
      label: t.dash.erp.status.pending,
      icon: Clock,
      tone: "amber" as const,
      desc: t.dash.erp.pendingDesc,
      actionLabel: t.dash.erp.requestErp,
      actionAvailable: false,
    },
    inactive: {
      label: t.dash.erp.status.inactive,
      icon: XCircle,
      tone: "red" as const,
      desc: t.dash.erp.inactiveDesc,
      actionLabel: t.dash.erp.requestErp,
      actionAvailable: false,
    },
  }[status];

  const openErp = () => {
    if (!erpUrl) {
      toast({
        title: t.dash.erp.status.inactive,
        description: t.dash.erp.inactiveDesc,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t.dash.erp.openInNewTab,
      description: erpUrl,
    });
    window.open(erpUrl, "_blank", "noopener,noreferrer");
  };

  const requestErp = () => {
    toast({
      title: t.dash.erp.requestErp,
      description: t.dash.erp.pendingDesc,
    });
  };

  const features = [
    { icon: ExternalLink, label: t.dash.erp.features[0] },
    { icon: Boxes, label: t.dash.erp.features[1] },
    { icon: CheckCircle2, label: t.dash.erp.features[2] },
    { icon: Link2, label: t.dash.erp.features[3] },
    { icon: AlertCircle, label: t.dash.erp.features[4] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.erp.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.erp.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status card */}
        <div className="lg:col-span-2 rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-white via-white to-[#EFF6FF] p-7 relative overflow-hidden">
          <div className="pointer-events-none absolute -end-12 -top-12 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="pointer-events-none absolute -start-12 -bottom-12 h-48 w-48 rounded-full bg-[#A3E635]/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div
              className={cn(
                "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl",
                statusInfo.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]",
                statusInfo.tone === "amber" && "bg-amber-100 text-amber-700",
                statusInfo.tone === "red" && "bg-red-100 text-red-700"
              )}
            >
              <statusInfo.icon className="h-7 w-7" />
            </div>

            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide",
                  statusInfo.tone === "lime" && "bg-[#A3E635]/15 text-[#65A30D]",
                  statusInfo.tone === "amber" && "bg-amber-100 text-amber-700",
                  statusInfo.tone === "red" && "bg-red-100 text-red-700"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {statusInfo.label}
              </span>
              <p className="mt-2 text-sm text-[#475569] leading-relaxed max-w-md">
                {statusInfo.desc}
              </p>

              <button
                onClick={statusInfo.actionAvailable ? openErp : requestErp}
                className={cn(
                  "mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition-colors",
                  statusInfo.actionAvailable
                    ? "bg-[#2563EB] text-white shadow-[#2563EB]/25 hover:bg-[#1E40AF]"
                    : "bg-[#0F172A] text-white shadow-[#0F172A]/20 hover:bg-[#1E293B]"
                )}
                disabled={!erpUrl && statusInfo.actionAvailable}
              >
                {statusInfo.actionAvailable && <ExternalLink className="h-4 w-4" />}
                {statusInfo.actionLabel}
              </button>
            </div>
          </div>

          {/* ERP URL display */}
          <div className="relative mt-6 pt-5 border-t border-[#E2E8F0]">
            <p className="text-[10px] text-[#64748B] mb-1">ERP URL</p>
            {erpUrl ? (
              <div
                className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 font-mono text-xs text-[#475569] truncate"
                dir="ltr"
              >
                {erpUrl}
              </div>
            ) : (
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700 flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {t.dash.erp.inactiveDesc}
              </div>
            )}
          </div>
        </div>

        {/* Features list */}
        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Boxes className="h-5 w-5 text-[#2563EB]" />
            <h2 className="font-display text-sm font-bold text-[#0F172A]">
              {t.dash.erp.featuresTitle}
            </h2>
          </div>
          <ul className="space-y-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#475569]">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#2563EB]/8 text-[#2563EB]">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="leading-snug">{f.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
