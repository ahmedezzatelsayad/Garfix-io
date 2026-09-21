"use client";

import { ArrowUpLeft, Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Send, Shield, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { GarfixLogo } from "@/components/site/logo";
import { useApp, useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export function FooterPage() {
  const view = useApp((s) => s.view);
  const setView = useApp((s) => s.setView);

  if (view === "about") return <AboutPage />;
  if (view === "contact") return <ContactPage />;
  if (view === "privacy") return <PrivacyPage />;
  if (view === "terms") return <TermsPage />;
  if (view === "services-detail") return <ServicesDetailPage />;
  if (view === "pricing-detail") return <PricingDetailPage />;
  if (view === "how-detail") return <HowDetailPage />;

  return null;
}

function PageShell({
  children,
  accent = "blue",
}: {
  children: React.ReactNode;
  accent?: "blue" | "lime" | "navy";
}) {
  const setView = useApp((s) => s.setView);
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setView("marketing")}>
            <GarfixLogo />
          </button>
          <button
            onClick={() => setView("marketing")}
            className="inline-flex items-center gap-1.5 text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
          >
            <ArrowUpLeft className="h-4 w-4" />
            <span>
              {useDict().pages.back}
            </span>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">{children}</main>
    </div>
  );
}

function AboutPage() {
  const t = useDict();
  const p = t.pages.about;
  return (
    <PageShell>
      <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 px-3 py-1 text-xs font-semibold text-[#2563EB]">
        {t.nav.home} · {t.footer.links.about}
      </span>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
        {p.title}
      </h1>
      <p className="mt-3 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
        {p.subtitle}
      </p>

      <div className="mt-10 space-y-5 max-w-3xl">
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{p.body1}</p>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{p.body2}</p>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{p.body3}</p>
      </div>

      {/* Values */}
      <h2 className="mt-14 font-display text-2xl font-bold text-[#0F172A]">{p.valuesTitle}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {p.values.map((v, i) => (
          <div key={i} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 card-hover hover:shadow-md hover:border-[#2563EB]/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB] mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[#0F172A]">{v.title}</h3>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <h2 className="mt-14 font-display text-2xl font-bold text-[#0F172A]">{p.statsTitle}</h2>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {p.stats.map((s, i) => (
          <div key={i} className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#EFF6FF] p-5 text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#2563EB] tabular">{s.value}</div>
            <div className="mt-1 text-xs text-[#64748B]">{s.label}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const t = useDict();
  const p = t.pages.contact;
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });

  const iconMap = {
    whatsapp: MessageCircle,
    email: Mail,
    facebook: Facebook,
    instagram: Instagram,
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: p.form.sent });
    setForm({ name: "", email: "", business: "", message: "" });
  };

  return (
    <PageShell>
      <span className="inline-flex items-center rounded-full bg-[#A3E635]/10 px-3 py-1 text-xs font-semibold text-[#65A30D]">
        {t.footer.sections.contact}
      </span>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
        {p.title}
      </h1>
      <p className="mt-3 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">{p.subtitle}</p>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        {/* Channels */}
        <div>
          <h2 className="font-display text-base font-bold text-[#0F172A]">{p.channelsTitle}</h2>
          <div className="mt-4 space-y-3">
            {p.channels.map((c, i) => {
              const Icon = iconMap[c.icon as keyof typeof iconMap] || Mail;
              return (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 card-hover hover:border-[#2563EB]/30 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB] flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#64748B]">{c.label}</div>
                    <div className="text-sm font-bold text-[#0F172A] truncate" dir="ltr">{c.value}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <Send className="h-3.5 w-3.5 text-[#2563EB]" />
              {p.responseTime}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
              {p.location}
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-base font-bold text-[#0F172A]">{p.formTitle}</h2>
          <form onSubmit={onSubmit} className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 space-y-4">
            <Field label={p.form.nameLabel}>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15" />
            </Field>
            <Field label={p.form.emailLabel}>
              <input required type="email" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15" />
            </Field>
            <Field label={p.form.businessLabel}>
              <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15" />
            </Field>
            <Field label={p.form.messageLabel}>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15" />
            </Field>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors">
              <Send className="h-4 w-4" />
              {p.form.send}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function PrivacyPage() {
  const t = useDict();
  const p = t.pages.privacy;
  return (
    <PageShell accent="lime">
      <span className="inline-flex items-center rounded-full bg-[#A3E635]/10 px-3 py-1 text-xs font-semibold text-[#65A30D]">
        <Shield className="h-3 w-3 me-1" />
        {t.footer.links.privacy}
      </span>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">{p.title}</h1>
      <p className="mt-3 text-base text-[#64748B] max-w-3xl">{p.subtitle}</p>
      <div className="mt-4 text-xs text-[#64748B]">{t.pages.lastUpdate}: سبتمبر 2026</div>

      <div className="mt-10 space-y-6 max-w-3xl">
        {p.sections.map((s, i) => (
          <section key={i} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h2 className="font-display text-base font-bold text-[#0F172A]">{s.title}</h2>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function TermsPage() {
  const t = useDict();
  const p = t.pages.terms;
  return (
    <PageShell accent="navy">
      <span className="inline-flex items-center rounded-full bg-[#0F172A]/8 px-3 py-1 text-xs font-semibold text-[#0F172A]">
        <FileText className="h-3 w-3 me-1" />
        {t.footer.links.terms}
      </span>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">{p.title}</h1>
      <p className="mt-3 text-base text-[#64748B] max-w-3xl">{p.subtitle}</p>

      <div className="mt-10 space-y-6 max-w-3xl">
        {p.sections.map((s, i) => (
          <section key={i} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h2 className="font-display text-base font-bold text-[#0F172A]">{s.title}</h2>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function ServicesDetailPage() {
  const t = useDict();
  const p = t.pages.servicesDetail;
  return (
    <PageShell>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">{p.title}</h1>
      <p className="mt-3 text-base text-[#64748B] max-w-3xl">{p.subtitle}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {t.services.items.map((s, i) => (
          <article key={s.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-display text-lg font-bold text-[#0F172A]">{s.title}</h3>
            <p className="text-xs text-[#64748B] mt-0.5">{s.enTitle}</p>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed">{s.desc}</p>
            <div className="mt-4 inline-flex items-baseline gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
              <span className="font-display text-xl font-extrabold text-[#2563EB]">{s.fee}</span>
              <span className="text-xs text-[#64748B]">{s.feeLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function PricingDetailPage() {
  const t = useDict();
  const p = t.pages.pricingDetail;
  return (
    <PageShell>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">{p.title}</h1>
      <p className="mt-3 text-base text-[#64748B] max-w-3xl">{p.subtitle}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {t.pricingTiers.tiers.map((tier) => (
          <article key={tier.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-display text-xl font-extrabold text-[#0F172A]">{tier.name}</h3>
            <p className="text-xs text-[#64748B] mt-1">{tier.tagline}</p>
            <div className="mt-4 flex items-baseline justify-center gap-1 rounded-xl bg-[#F8FAFC] p-3">
              <span className="font-display text-xl font-extrabold text-[#0F172A] tabular">{tier.minBudget}</span>
              <span className="text-xs text-[#64748B]">–</span>
              <span className="font-display text-xl font-extrabold text-[#0F172A] tabular">{tier.maxBudget}</span>
              <span className="text-xs text-[#64748B] ms-1">{tier.currency}</span>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-[#E2E8F0] px-3 py-2">
              <span className="text-xs text-[#475569]">{tier.feeLabel}</span>
              <span className="font-bold text-[#2563EB]">{tier.fee}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {tier.features.map((f, fi) => (
                <li key={fi} className="text-xs text-[#475569] flex items-start gap-1.5">
                  <span className="mt-1 h-1 w-1 rounded-full bg-[#A3E635]" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function HowDetailPage() {
  const t = useDict();
  const p = t.pages.howDetail;
  return (
    <PageShell>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">{p.title}</h1>
      <p className="mt-3 text-base text-[#64748B] max-w-3xl">{p.subtitle}</p>

      <ol className="mt-10 space-y-4 max-w-3xl">
        {t.how.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white font-display text-base font-extrabold tabular">
              {step.n}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A]">{step.title}</h3>
              <p className="mt-1 text-sm text-[#475569] leading-relaxed">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#475569] mb-1.5">{label}</span>
      {children}
    </label>
  );
}
