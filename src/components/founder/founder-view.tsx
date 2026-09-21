"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpLeft,
  Search,
  Copy,
  Check,
  UserPlus,
  Power,
  PowerOff,
  ExternalLink,
  Users,
  CheckCircle2,
  Boxes,
  Clock,
  Shield,
  X,
} from "lucide-react";
import { GarfixLogo } from "@/components/site/logo";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Client } from "@/lib/store";

// Seed clients so the founder panel has data on first load
const SEED_CLIENTS: Client[] = [
  {
    id: "c-001",
    token: "garfix-token-ahmed",
    name: "أحمد محمود",
    email: "ahmed@store.com",
    phone: "01012345678",
    business: "متجر إلكترونيات",
    plan: "manage-content",
    monthlyBudget: 25000,
    erpStatus: "active",
    createdAt: "2026-08-12",
  },
  {
    id: "c-002",
    token: "garfix-token-sara",
    name: "سارة عبدالله",
    email: "sara@moda.com",
    phone: "01098765432",
    business: "بوتيك أزياء",
    plan: "manage",
    monthlyBudget: 12000,
    erpStatus: "active",
    createdAt: "2026-08-25",
  },
  {
    id: "c-003",
    token: "garfix-token-khaled",
    name: "خالد إبراهيم",
    email: "khaled@gymfuel.com",
    phone: "01155554444",
    business: "مكملات غذائية",
    plan: "manage-content",
    monthlyBudget: 50000,
    erpStatus: "pending",
    createdAt: "2026-09-02",
  },
  {
    id: "c-004",
    token: "garfix-token-mona",
    name: "منى السيد",
    email: "mona@learnhub.com",
    phone: "01077778888",
    business: "كورسات أونلاين",
    plan: "manage",
    monthlyBudget: 8000,
    erpStatus: "inactive",
    createdAt: "2026-09-10",
  },
];

export function FounderView() {
  const t = useDict();
  const setView = useApp((s) => s.setView);
  const clients = useApp((s) => s.clients);
  const addClient = useApp((s) => s.addClient);
  const addClients = useApp((s) => s.addClients);
  const updateClient = useApp((s) => s.updateClient);
  const loginAs = useApp((s) => s.loginAs);
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Seed on first mount if no clients
  useEffect(() => {
    if (clients.length === 0) {
      addClients(SEED_CLIENTS);
    }
  }, [clients.length, addClients]);

  const filtered = useMemo(() => {
    if (!query.trim()) return clients;
    const q = query.trim().toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.business.toLowerCase().includes(q)
    );
  }, [clients, query]);

  const stats = useMemo(() => {
    return {
      total: clients.length,
      active: clients.filter((c) => c.plan).length, // all are active clients
      erp: clients.filter((c) => c.erpStatus === "active").length,
      pending: clients.filter((c) => c.erpStatus === "pending").length,
    };
  }, [clients]);

  const buildLoginUrl = (token: string) => {
    if (typeof window === "undefined") return `?token=${token}`;
    return `${window.location.origin}/?token=${token}`;
  };

  const copyLink = (c: Client) => {
    navigator.clipboard.writeText(buildLoginUrl(c.token));
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 1500);
    toast({
      title: t.founder.copied,
      description: c.name,
    });
  };

  const toggleErp = (c: Client) => {
    const next = c.erpStatus === "active" ? "inactive" : "active";
    updateClient(c.id, { erpStatus: next });
    toast({
      title:
        next === "active"
          ? t.founder.activate
          : t.founder.deactivate,
      description: c.name,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#0F172A] text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GarfixLogo variant="full" className="[&_span]:text-white" />
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              <Shield className="h-3 w-3" />
              {t.founder.title}
            </span>
          </div>
          <button
            onClick={() => setView("marketing")}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowUpLeft className="h-4 w-4" />
            <span>{t.founder.backToSite}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            {t.founder.title}
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">{t.founder.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label={t.founder.stats.total}
            value={stats.total}
            tone="blue"
          />
          <StatCard
            icon={CheckCircle2}
            label={t.founder.stats.active}
            value={stats.active}
            tone="navy"
          />
          <StatCard
            icon={Boxes}
            label={t.founder.stats.erp}
            value={stats.erp}
            tone="lime"
          />
          <StatCard
            icon={Clock}
            label={t.founder.stats.pending}
            value={stats.pending}
            tone="amber"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute inset-y-0 start-3 h-4 w-4 text-[#94A3B8] mt-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.founder.search}
              className="w-full rounded-lg border border-[#E2E8F0] bg-white ps-10 pe-4 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            {t.founder.addClient}
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <Th>{t.founder.table.name}</Th>
                  <Th>{t.founder.table.business}</Th>
                  <Th>{t.founder.table.plan}</Th>
                  <Th>{t.founder.table.budget}</Th>
                  <Th>{t.founder.table.erp}</Th>
                  <Th>{t.founder.table.loginLink}</Th>
                  <Th>{t.founder.table.actions}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-[#64748B]">
                      {t.founder.search}: "{query}"
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-[#0F172A]">{c.name}</div>
                        <div className="text-xs text-[#64748B]">{c.email}</div>
                      </td>
                      <td className="px-4 py-3 text-[#475569]">{c.business}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 text-[#2563EB] px-2 py-0.5 text-xs font-semibold">
                          {c.plan === "manage" ? "20%" : "30%"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#0F172A] font-semibold tabular">
                        {c.monthlyBudget.toLocaleString("en-US")}
                        <span className="text-xs font-normal text-[#64748B] ms-1">
                          {t.pricing.calc.currency}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ErpBadge status={c.erpStatus} t={t} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => copyLink(c)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                        >
                          {copiedId === c.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#65A30D]" />
                              {t.founder.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              {t.founder.copyLink}
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleErp(c)}
                            title={
                              c.erpStatus === "active"
                                ? t.founder.deactivate
                                : t.founder.activate
                            }
                            className={cn(
                              "inline-flex items-center justify-center rounded-md p-1.5 transition-colors",
                              c.erpStatus === "active"
                                ? "text-[#65A30D] hover:bg-[#A3E635]/10"
                                : "text-[#94A3B8] hover:bg-slate-100"
                            )}
                          >
                            {c.erpStatus === "active" ? (
                              <Power className="h-4 w-4" />
                            ) : (
                              <PowerOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => loginAs(c)}
                            title={t.founder.openAs}
                            className="inline-flex items-center justify-center rounded-md p-1.5 text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddForm && (
        <AddClientDialog
          onClose={() => setShowAddForm(false)}
          onCreate={(c) => {
            addClient(c);
            setShowAddForm(false);
            toast({
              title: t.founder.newClient.title,
              description: c.name,
            });
          }}
        />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: "blue" | "navy" | "lime" | "amber";
}) {
  const toneClass = {
    blue: "bg-[#2563EB]/10 text-[#2563EB]",
    navy: "bg-[#0F172A]/8 text-[#0F172A]",
    lime: "bg-[#A3E635]/15 text-[#65A30D]",
    amber: "bg-amber-100 text-amber-700",
  }[tone];

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg", toneClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3">
        <div className="text-2xl font-extrabold text-[#0F172A] tabular">{value}</div>
        <div className="text-xs text-[#64748B] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-[#64748B]">
      {children}
    </th>
  );
}

function ErpBadge({
  status,
  t,
}: {
  status: "active" | "pending" | "inactive";
  t: ReturnType<typeof useDict>;
}) {
  const info = {
    active: {
      label: t.dash.erp.status.active,
      className: "bg-[#A3E635]/15 text-[#65A30D]",
    },
    pending: {
      label: t.founder.pending,
      className: "bg-amber-100 text-amber-700",
    },
    inactive: {
      label: t.dash.erp.status.inactive,
      className: "bg-slate-100 text-slate-600",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
        info.className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {info.label}
    </span>
  );
}

function AddClientDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (c: Client) => void;
}) {
  const t = useDict();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [plan, setPlan] = useState<"manage" | "manage-content">("manage");
  const [budget, setBudget] = useState(10000);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const id = `c-${Date.now()}`;
    const token = `garfix-token-${id}`;
    onCreate({
      id,
      token,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      business: business.trim(),
      plan,
      monthlyBudget: budget,
      erpStatus: "pending",
      createdAt: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
          <h3 className="font-display text-base font-bold text-[#0F172A]">
            {t.founder.newClient.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded-md"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.founder.newClient.name}
            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.founder.newClient.email}
            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            dir="ltr"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.founder.newClient.phone}
            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            dir="ltr"
          />
          <input
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder={t.founder.newClient.business}
            className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.founder.newClient.plan}
              </span>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as "manage" | "manage-content")}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              >
                <option value="manage">20% — {t.dash.ads.platforms.fb}</option>
                <option value="manage-content">30% — {t.pricing.table.rows[1].service}</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.founder.newClient.budget}
              </span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
            >
              {t.founder.newClient.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors"
            >
              {t.founder.newClient.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
