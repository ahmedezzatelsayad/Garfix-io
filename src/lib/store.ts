"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./i18n";
import { dict, defaultLocale } from "./i18n";

export type View =
  | "marketing"
  | "login"
  | "dashboard"
  | "founder"
  // Footer pages
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "services-detail"
  | "pricing-detail"
  | "how-detail";

export type DashboardView =
  | "overview"
  | "landing-builder"
  | "ad-writer"
  | "fb-library"
  | "erp"
  | "order-invoice"; // NEW: WhatsApp-style order → invoice (our own ERP feature)

export type ClientPlan = "manage" | "manage-content";
export type ErpStatus = "active" | "pending" | "inactive";

export type Client = {
  id: string;
  token: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  plan: ClientPlan;
  monthlyBudget: number;
  erpStatus: ErpStatus;
  erpUrl: string; // NEW: per-client custom ERP URL (set by founder)
  createdAt: string;
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  business: string;
  plan: ClientPlan;
  monthlyBudget: number;
  erpStatus: ErpStatus;
  erpUrl: string;
};

export type InvoiceItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export type Invoice = {
  id: string;
  clientId: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  notes: string;
  status: "draft" | "sent" | "paid";
  createdAt: string;
};

type AppState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;

  view: View;
  setView: (v: View) => void;

  user: SessionUser | null;
  loginAs: (client: Client) => void;
  logout: () => void;

  dashboardView: DashboardView;
  setDashboardView: (v: DashboardView) => void;

  clients: Client[];
  addClient: (c: Client) => void;
  addClients: (cs: Client[]) => void;
  updateClient: (id: string, patch: Partial<Client>) => void;

  // NEW: invoices per client (keyed by client id)
  invoices: Record<string, Invoice[]>;
  addInvoice: (clientId: string, invoice: Invoice) => void;
  updateInvoice: (clientId: string, invoiceId: string, patch: Partial<Invoice>) => void;
  deleteInvoice: (clientId: string, invoiceId: string) => void;
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      locale: defaultLocale,
      setLocale: (locale) => set({ locale }),
      toggle: () => set({ locale: get().locale === "ar" ? "en" : "ar" }),

      view: "marketing",
      setView: (view) => set({ view }),

      user: null,
      loginAs: (client) =>
        set({
          user: {
            id: client.id,
            name: client.name,
            email: client.email,
            business: client.business,
            plan: client.plan,
            monthlyBudget: client.monthlyBudget,
            erpStatus: client.erpStatus,
            erpUrl: client.erpUrl,
          },
          view: "dashboard",
          dashboardView: "overview",
        }),
      logout: () => set({ user: null, view: "marketing", dashboardView: "overview" }),

      dashboardView: "overview",
      setDashboardView: (dashboardView) => set({ dashboardView }),

      clients: [],
      addClient: (client) =>
        set((s) => ({ clients: [client, ...s.clients] })),
      addClients: (newClients) =>
        set((s) => ({ clients: [...newClients, ...s.clients] })),
      updateClient: (id, patch) =>
        set((s) => ({
          clients: s.clients.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),

      invoices: {},
      addInvoice: (clientId, invoice) =>
        set((s) => ({
          invoices: {
            ...s.invoices,
            [clientId]: [invoice, ...(s.invoices[clientId] || [])],
          },
        })),
      updateInvoice: (clientId, invoiceId, patch) =>
        set((s) => ({
          invoices: {
            ...s.invoices,
            [clientId]: (s.invoices[clientId] || []).map((inv) =>
              inv.id === invoiceId ? { ...inv, ...patch } : inv
            ),
          },
        })),
      deleteInvoice: (clientId, invoiceId) =>
        set((s) => ({
          invoices: {
            ...s.invoices,
            [clientId]: (s.invoices[clientId] || []).filter(
              (inv) => inv.id !== invoiceId
            ),
          },
        })),
    }),
    {
      name: "garfix-app",
      // Only persist locale + clients + invoices. Session is in-memory only.
      partialize: (s) => ({
        locale: s.locale,
        clients: s.clients,
        invoices: s.invoices,
      }),
    }
  )
);

/** Convenience hook for the dictionary — re-renders on locale change. */
export function useDict() {
  const locale = useApp((s) => s.locale);
  return dict[locale];
}
