"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Megaphone } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BrandKit } from "./brand-kit";
import { HashtagGenerator } from "./hashtag-generator";

type Platform = "fb" | "ig" | "both";
type Tone = "pro" | "friendly" | "urgent";

type AdCopy = {
  headline: string;
  body: string;
  cta: string;
};

export function AdWriter() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const { toast } = useToast();

  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState<Platform>("fb");
  const [tone, setTone] = useState<Tone>("friendly");
  const [results, setResults] = useState<AdCopy[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    if (!product.trim()) {
      toast({
        title: locale === "ar" ? "اكتب اسم المنتج الأول" : "Enter product name first",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResults(buildAds(product, audience, tone, locale));
      setLoading(false);
    }, 800);
  };

  const copyAd = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
    toast({ title: t.dash.ads.copied });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.ads.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.ads.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
          <label className="block">
            <span className="block text-xs font-semibold text-[#475569] mb-1.5">
              {t.dash.ads.product}
            </span>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder={t.dash.ads.productPh}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-semibold text-[#475569] mb-1.5">
              {t.dash.ads.audience}
            </span>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder={t.dash.ads.audiencePh}
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.dash.ads.platform}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["fb", "ig", "both"] as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-xs font-medium transition-all",
                      platform === p
                        ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                        : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                    )}
                  >
                    {t.dash.ads.platforms[p]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                {t.dash.ads.tone}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["pro", "friendly", "urgent"] as Tone[]).map((tn) => (
                  <button
                    key={tn}
                    onClick={() => setTone(tn)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-xs font-medium transition-all",
                      tone === tn
                        ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                        : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                    )}
                  >
                    {t.dash.ads.tones[tn]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? t.dash.ads.generating : t.dash.ads.generate}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-[#0F172A]">
              {t.dash.ads.results}
            </h2>
            {results.length > 0 && (
              <button
                onClick={generate}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:underline"
              >
                <RefreshCw className="h-3 w-3" />
                {t.dash.ads.regenerate}
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white/50 p-10 text-center">
              <Megaphone className="h-10 w-10 mx-auto text-[#CBD5E1]" />
              <p className="mt-3 text-sm text-[#64748B]">{t.dash.ads.empty}</p>
            </div>
          ) : (
            results.map((ad, i) => {
              const fullText = `${ad.headline}\n\n${ad.body}\n\n${ad.cta}`;
              return (
                <article
                  key={i}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5 card-hover hover:shadow-md hover:border-[#2563EB]/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#2563EB]/8 text-[#2563EB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                      #{i + 1}
                    </span>
                    <button
                      onClick={() => copyAd(fullText, i)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
                    >
                      {copiedIdx === i ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#65A30D]" />
                          {t.dash.ads.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          {t.dash.ads.copy}
                        </>
                      )}
                    </button>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-[#0F172A] leading-snug">
                    {ad.headline}
                  </h3>
                  <p className="mt-2 text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                    {ad.body}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#2563EB]">
                    {ad.cta}
                  </p>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* NEW: Brand Kit + Hashtag Generator side-by-side */}
      <div className="grid lg:grid-cols-2 gap-4">
        <BrandKit />
        <HashtagGenerator />
      </div>
    </div>
  );
}

/** Build 3 ad copies locally (no AI call needed for demo). */
function buildAds(
  product: string,
  audience: string,
  tone: Tone,
  locale: "ar" | "en"
): AdCopy[] {
  const ar = locale === "ar";
  const aud = audience.trim() || (ar ? "الجمهور المناسب ليك" : "your ideal audience");

  const toneWord =
    tone === "pro"
      ? ar ? "احترافي" : "professional"
      : tone === "friendly"
      ? ar ? "ودود" : "friendly"
      : ar ? "عاجل" : "urgent";

  const templates: AdCopy[] = ar
    ? [
        {
          headline: `🔥 ${product} — الحل اللي بيدور عليه ${aud}`,
          body: `لو إنت من ${aud}، فـ ${product} هو اللي محتاجه.\n\n✓ جودة عالية\n✓ سعر مناسب\n✓ توصيل سريع\n\nمتأخرش، الفرصة دي مش هتتكرر!`,
          cta: "اطلب دلوقتي وادي أول خطوة 👇",
        },
        {
          headline: `تعرف ليه ${product} مختلف؟`,
          body: `لأنه اتعمل خصيصًا لـ ${aud} اللي زيك.\nمفيش حلول عامة، إحنا بنقدم حل مخصص لاحتياجك.\n\nالنبرة: ${toneWord}.\nاطلب النهارده واستلم أسرع.`,
          cta: "اضغط هنا واطلب دلوقتي 🚀",
        },
        {
          headline: `🚀 ${product} وصل أخيرًا!`,
          body: `بعد طلب كتير من ${aud}، إحنا بنقدم لك ${product}.\nجودة ممتازة، سعر مناسب، وتجربة شراء سلسة.\n\nالكمية محدودة!`,
          cta: "احجز دلوقتي قبل ما يخلص ⏰",
        },
      ]
    : [
        {
          headline: `🔥 ${product} — the solution ${aud} have been waiting for`,
          body: `If you're part of ${aud}, ${product} is exactly what you need.\n\n✓ Premium quality\n✓ Fair price\n✓ Fast delivery\n\nDon't wait — this won't last!`,
          cta: "Order now and take the first step 👇",
        },
        {
          headline: `Know why ${product} is different?`,
          body: `Because it's built specifically for ${aud} like you.\nNo generic solutions — we deliver a custom fit.\n\nTone: ${toneWord}.\nOrder today and get it faster.`,
          cta: "Click here to order now 🚀",
        },
        {
          headline: `🚀 ${product} has finally arrived!`,
          body: `After heavy demand from ${aud}, we're launching ${product}.\nPremium quality, fair pricing, and a seamless buying experience.\n\nLimited stock!`,
          cta: "Reserve yours before it runs out ⏰",
        },
      ];

  return templates;
}
