"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, LogIn, Mail, Lock, ArrowUpLeft } from "lucide-react";
import { GarfixLogo } from "@/components/site/logo";
import { useApp, useDict } from "@/lib/store";

export function LoginView() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const setView = useApp((s) => s.setView);
  const clients = useApp((s) => s.clients);
  const loginAs = useApp((s) => s.loginAs);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const lower = email.trim().toLowerCase();

    // Demo credentials
    if (lower === "client@garfix.io" && password === "123456") {
      if (clients.length > 0) {
        loginAs(clients[0]);
      } else {
        loginAs({
          id: "demo-001",
          token: "demo-001",
          name: "عميل تجريبي",
          email: "client@garfix.io",
          phone: "01000000000",
          business: "متجر إلكتروني",
          plan: "manage",
          monthlyBudget: 10000,
          erpStatus: "active",
          createdAt: new Date().toISOString(),
        });
      }
      return;
    }

    // Match existing client by email
    const match = clients.find((c) => c.email.toLowerCase() === lower);
    if (match) {
      loginAs(match);
      return;
    }

    setError(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
      <header className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <button onClick={() => setView("marketing")}>
            <GarfixLogo />
          </button>
          <button
            onClick={() => setView("marketing")}
            className="inline-flex items-center gap-1.5 text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
          >
            <ArrowUpLeft className="h-4 w-4" />
            <span>{t.login.backHome}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#2563EB]/10 mb-4">
              <LogIn className="h-6 w-6 text-[#2563EB]" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
              {t.login.title}
            </h1>
            <p className="mt-2 text-sm text-[#475569]">{t.login.subtitle}</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-xl shadow-[#0F172A]/5 space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-2">
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 start-3 h-4 w-4 text-[#94A3B8] mt-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white ps-10 pe-4 py-3 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                  placeholder="client@garfix.io"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-2">
                {t.login.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 start-3 h-4 w-4 text-[#94A3B8] mt-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white ps-10 pe-4 py-3 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                  placeholder="••••••"
                  dir="ltr"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-700">
                {t.login.errInvalid}
              </div>
            )}

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors"
            >
              {t.login.button}
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            <div className="text-center">
              <p className="text-xs text-[#64748B]">{t.login.demoHint}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-[#64748B]">
                  {t.login.orHint}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setView("founder")}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-xs font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              <Lock className="h-3.5 w-3.5" />
              {t.login.founderAccess}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
