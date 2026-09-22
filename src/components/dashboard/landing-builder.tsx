"use client";

import { useState } from "react";
import {
  Save,
  Eye,
  Sparkles,
  Smartphone,
  Monitor,
  Wand2,
  Loader2,
  RotateCw,
  Trash2,
  Zap,
} from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type FormData = {
  product: string;
  headline: string;
  subheadline: string;
  features: string;
  cta: string;
  price: string;
  currency: string;
};

type PreviewMode = "desktop" | "mobile";
type Tone = "pro" | "friendly" | "urgent";

type AiResult = {
  headline: string;
  subheadline: string;
  features: string[];
  cta: string;
  price: string;
  currency: string;
  model: string;
  durationMs: number;
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
  const locale = useApp((s) => s.locale);
  const { toast } = useToast();
  const [data, setData] = useState<FormData>(initial);
  const [mode, setMode] = useState<PreviewMode>("desktop");

  // AI generation state
  const [aiBrief, setAiBrief] = useState("");
  const [aiBusiness, setAiBusiness] = useState("");
  const [aiAudience, setAiAudience] = useState("");
  const [aiTone, setAiTone] = useState<Tone>("friendly");
  const [generating, setGenerating] = useState(false);
  const [lastResult, setLastResult] = useState<AiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const onGenerate = async () => {
    if (!aiBrief.trim()) {
      toast({
        title: t.dash.landing.ai.error,
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/landing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: aiBrief.trim(),
          business: aiBusiness.trim(),
          audience: aiAudience.trim(),
          tone: aiTone,
          language: locale,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result: AiResult = await response.json();

      // Auto-fill the form with the generated content
      setData({
        product: aiBrief.trim(),
        headline: result.headline,
        subheadline: result.subheadline,
        features: result.features.join("\n"),
        cta: result.cta,
        price: result.price,
        currency: result.currency,
      });

      setLastResult(result);
      toast({
        title: t.dash.landing.ai.applied,
        description:
          locale === "ar"
            ? `${result.model} · ${result.durationMs}ms`
            : `${result.model} · ${result.durationMs}ms`,
      });
    } catch (err) {
      console.error(err);
      setError(t.dash.landing.ai.error);
      toast({
        title: t.dash.landing.ai.error,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const onClear = () => {
    setData(initial);
    setLastResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.landing.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.landing.subtitle}</p>
      </div>

      {/* AI Generation Section */}
      <div className="relative rounded-3xl border border-[#2563EB]/20 bg-gradient-to-br from-white via-[#EFF6FF] to-white p-5 sm:p-6 overflow-hidden">
        <div className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="pointer-events-none absolute -start-16 -bottom-16 h-48 w-48 rounded-full bg-[#A3E635]/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white shadow-lg shadow-[#2563EB]/25">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-base font-bold text-[#0F172A]">
                    {t.dash.landing.ai.title}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-[10px] font-semibold text-[#2563EB]">
                    <Sparkles className="h-3 w-3" />
                    {t.dash.landing.ai.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed max-w-2xl">
                  {t.dash.landing.ai.subtitle}
                </p>
              </div>
            </div>

            {/* Connection status */}
            <div className="flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[10px] font-medium">
              {lastResult?.model === "deepseek-chat" ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65A30D] animate-pulse" />
                  <span className="text-[#65A30D]">{t.dash.landing.ai.deepseekMode}</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span className="text-amber-700">{t.dash.landing.ai.templateMode}</span>
                </>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <label className="block sm:col-span-2">
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.dash.landing.ai.productName} *
              </span>
              <input
                type="text"
                value={aiBrief}
                onChange={(e) => setAiBrief(e.target.value)}
                placeholder={t.dash.landing.ai.productNamePh}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.dash.landing.ai.business}
              </span>
              <input
                type="text"
                value={aiBusiness}
                onChange={(e) => setAiBusiness(e.target.value)}
                placeholder={t.dash.landing.ai.businessPh}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.dash.landing.ai.audience}
              </span>
              <input
                type="text"
                value={aiAudience}
                onChange={(e) => setAiAudience(e.target.value)}
                placeholder={t.dash.landing.ai.audiencePh}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </label>
          </div>

          {/* Tone selector */}
          <div className="mb-4">
            <span className="block text-xs font-semibold text-[#475569] mb-1.5">
              {t.dash.landing.ai.toneLabel}
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(["friendly", "pro", "urgent"] as Tone[]).map((tn) => (
                <button
                  key={tn}
                  onClick={() => setAiTone(tn)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                    aiTone === tn
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                  )}
                >
                  {t.dash.landing.ai.tones[tn]}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onGenerate}
              disabled={generating || !aiBrief.trim()}
              className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.dash.landing.ai.generating}
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  {t.dash.landing.ai.generate}
                  <span className="opacity-70 text-xs font-normal">
                    (DeepSeek)
                  </span>
                </>
              )}
            </button>

            {lastResult && (
              <button
                onClick={onGenerate}
                disabled={generating}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors disabled:opacity-50"
              >
                <RotateCw className="h-4 w-4" />
                {t.dash.landing.ai.regenerate}
              </button>
            )}

            {(data.headline || data.product) && (
              <button
                onClick={onClear}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium text-[#64748B] hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                {t.dash.landing.ai.clear}
              </button>
            )}
          </div>

          {/* Last result info */}
          {lastResult && (
            <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#64748B]">
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-[#0F172A]">
                  {t.dash.landing.ai.modelLabel}:
                </span>
                <code className="rounded bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-[10px] text-[#2563EB]">
                  {lastResult.model}
                </code>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-[#0F172A]">
                  {t.dash.landing.ai.durationLabel}:
                </span>
                <span className="tabular">{lastResult.durationMs}ms</span>
              </span>
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Form + Preview */}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
              <Eye className="h-3.5 w-3.5" />
              {t.dash.landing.preview}
            </div>

            {/* Desktop/Mobile preview toggle */}
            <div className="inline-flex rounded-lg border border-[#E2E8F0] p-0.5 bg-white">
              <button
                onClick={() => setMode("desktop")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  mode === "desktop"
                    ? "bg-[#2563EB]/10 text-[#2563EB]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
                aria-label="Desktop preview"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {t.dash.sidebar.overview === "Overview" ? "Desktop" : "سطح المكتب"}
                </span>
              </button>
              <button
                onClick={() => setMode("mobile")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  mode === "mobile"
                    ? "bg-[#2563EB]/10 text-[#2563EB]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
                aria-label="Mobile preview"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {t.dash.sidebar.overview === "Overview" ? "Mobile" : "موبايل"}
                </span>
              </button>
            </div>
          </div>

          <div
            className={cn(
              "mx-auto transition-all duration-300",
              mode === "mobile" ? "max-w-[320px]" : "max-w-full"
            )}
          >
            <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm">
              {/* Preview header */}
              <div className="h-8 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center px-3 gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <div className="ms-2 text-[10px] text-[#94A3B8]">
                  {mode === "mobile" ? "mobile preview" : "desktop preview"}
                </div>
              </div>

              {/* Preview body */}
              {data.product || data.headline ? (
                <div className={cn("p-6", mode === "mobile" && "p-4")}>
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
                    <h3 className={cn(
                      "mt-2 font-display font-extrabold text-[#0F172A] leading-tight",
                      mode === "mobile" ? "text-lg" : "text-xl"
                    )}>
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
