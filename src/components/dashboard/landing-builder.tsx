"use client";

import { useState } from "react";
import { Save, Eye, Sparkles } from "lucide-react";
import { useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  product: string;
  headline: string;
  subheadline: string;
  features: string;
  cta: string;
  price: string;
  currency: string;
};

const initial: FormData = {
  product: "",
  headline: "",
  subheadline: "",
  features: "",
  cta: "اطلب دلوقتي",
  price: "",
  currency: "ج.م",
};

export function LandingBuilder() {
  const t = useDict();
  const { toast } = useToast();
  const [data, setData] = useState<FormData>(initial);

  const features = data.features
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const onSave = () => {
    toast({
      title: t.dash.landing.saved,
      description: data.product || data.headline || "—",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.landing.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.landing.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
          <Field label={t.dash.landing.product}>
            <input
              type="text"
              value={data.product}
              onChange={(e) => update("product", e.target.value)}
              placeholder={t.dash.landing.productPh}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </Field>

          <Field label={t.dash.landing.headline}>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => update("headline", e.target.value)}
              placeholder={t.dash.landing.headlinePh}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </Field>

          <Field label={t.dash.landing.subheadline}>
            <textarea
              value={data.subheadline}
              onChange={(e) => update("subheadline", e.target.value)}
              placeholder={t.dash.landing.subheadlinePh}
              rows={2}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </Field>

          <Field label={t.dash.landing.features}>
            <textarea
              value={data.features}
              onChange={(e) => update("features", e.target.value)}
              placeholder={t.dash.landing.featuresPh}
              rows={4}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm font-mono focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field label={t.dash.landing.price}>
                <input
                  type="number"
                  value={data.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder={t.dash.landing.pricePh}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                />
              </Field>
            </div>
            <Field label={t.dash.landing.currency}>
              <input
                type="text"
                value={data.currency}
                onChange={(e) => update("currency", e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </Field>
          </div>

          <Field label={t.dash.landing.cta}>
            <input
              type="text"
              value={data.cta}
              onChange={(e) => update("cta", e.target.value)}
              placeholder={t.dash.landing.ctaPh}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </Field>

          <button
            onClick={onSave}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors"
          >
            <Save className="h-4 w-4" />
            {t.dash.landing.save}
          </button>
        </div>

        {/* Live preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            <Eye className="h-3.5 w-3.5" />
            {t.dash.landing.preview}
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
            {/* Preview header */}
            <div className="h-8 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center px-3 gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div className="ms-2 text-[10px] text-[#94A3B8]">preview</div>
            </div>

            {/* Preview body */}
            {data.product || data.headline ? (
              <div className="p-6">
                {/* Product image placeholder */}
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#A3E635]/10 flex items-center justify-center mb-5">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 mx-auto text-[#2563EB]" />
                    <p className="mt-2 text-[10px] text-[#64748B]">placeholder</p>
                  </div>
                </div>

                {data.product && (
                  <p className="text-xs text-[#2563EB] font-semibold uppercase tracking-wide">
                    {data.product}
                  </p>
                )}
                {data.headline && (
                  <h3 className="mt-2 font-display text-xl font-extrabold text-[#0F172A] leading-tight">
                    {data.headline}
                  </h3>
                )}
                {data.subheadline && (
                  <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                    {data.subheadline}
                  </p>
                )}

                {features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#0F172A]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#A3E635] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  {data.price && (
                    <div>
                      <span className="text-2xl font-extrabold text-[#0F172A] tabular">
                        {data.price}
                      </span>
                      <span className="text-sm text-[#64748B] ms-1">
                        {data.currency}
                      </span>
                    </div>
                  )}
                  <button className="ms-auto inline-flex items-center rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors">
                    {data.cta || t.dash.landing.ctaPh}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Sparkles className="h-10 w-10 mx-auto text-[#CBD5E1]" />
                <p className="mt-3 text-sm text-[#64748B]">{t.dash.landing.empty}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#475569] mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
