"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PenLine,
  Search,
  Boxes,
  LogOut,
  Menu,
  X,
  Shield,
  Globe,
  Receipt,
} from "lucide-react";
import { GarfixLogo } from "@/components/site/logo";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Overview } from "./overview";
import { LandingBuilder } from "./landing-builder";
import { AdWriter } from "./ad-writer";
import { FbLibrary } from "./fb-library";
import { ErpLink } from "./erp-link";
import { OrderInvoice } from "./order-invoice";

const NAV = [
  { key: "overview", icon: LayoutDashboard },
  { key: "landing", icon: FileText },
  { key: "ads", icon: PenLine },
  { key: "library", icon: Search },
  { key: "order-invoice", icon: Receipt },
  { key: "erp", icon: Boxes },
] as const;

export function DashboardView() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const toggle = useApp((s) => s.toggle);
  const user = useApp((s) => s.user);
  const logout = useApp((s) => s.logout);
  const setView = useApp((s) => s.setView);
  const dashboardView = useApp((s) => s.dashboardView);
  const setDashboardView = useApp((s) => s.setDashboardView);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const rate = user.plan === "manage" ? 0.2 : 0.3;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-40 w-64 bg-[#0F172A] text-white transition-transform lg:translate-x-0 rtl:lg:translate-x-0",
          mobileOpen
            ? "translate-x-0 rtl:translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0 rtl:lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <GarfixLogo
            variant="full"
            className="[&_span]:text-white"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-white/70"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1" aria-label="Dashboard nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setDashboardView(item.key);
                  setMobileOpen(false);
                }}
                data-active={isActive}
                className="side-link w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{t.dash.sidebar[item.key]}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-3 space-y-1 border-t border-white/10">
          <button
            onClick={() => setView("founder")}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Shield className="h-4 w-4" />
            <span>{t.dash.sidebar.founder}</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>{t.dash.sidebar.logout}</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ms-64 rtl:lg:me-64 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[#0F172A] hover:bg-[#F8FAFC] rounded-md"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs text-[#64748B]">{t.dash.welcome}</p>
              <p className="text-sm font-bold text-[#0F172A]">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
                user.erpStatus === "active"
                  ? "bg-[#A3E635]/15 text-[#65A30D]"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {user.erpStatus === "active"
                ? t.dash.erp.status.active
                : t.dash.erp.status.pending}
            </span>
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white p-2 text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {dashboardView === "overview" && (
            <Overview rate={rate} monthlyBudget={user.monthlyBudget} />
          )}
          {dashboardView === "landing" && <LandingBuilder />}
          {dashboardView === "ads" && <AdWriter />}
          {dashboardView === "library" && <FbLibrary />}
          {dashboardView === "order-invoice" && <OrderInvoice />}
          {dashboardView === "erp" && <ErpLink />}
        </main>
      </div>
    </div>
  );
}
