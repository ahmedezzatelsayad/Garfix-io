"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./i18n";
import { dict, defaultLocale } from "./i18n";

export type View = "marketing" | "login" | "dashboard" | "founder";
export type DashboardView =
  | "overview"
  | "landing-builder"
  | "ad-writer"
  | "fb-library"
  | "erp";

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
    }),
    {
      name: "garfix-app",
      // Only persist locale + clients. Session (user/view) is in-memory only
      // so that loginAs / setView apply immediately without rehydration race.
      partialize: (s) => ({ locale: s.locale, clients: s.clients }),
    }
  )
);

/** Convenience hook for the dictionary — re-renders on locale change. */
export function useDict() {
  const locale = useApp((s) => s.locale);
  return dict[locale];
}
