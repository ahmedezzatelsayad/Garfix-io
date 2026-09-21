"use client";

import { useMemo, useState } from "react";
import { Search, ExternalLink, Facebook, Instagram, Play, ImageIcon } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { cn } from "@/lib/utils";

type MockAd = {
  id: string;
  pageName: string;
  text: string;
  platform: "fb" | "ig";
  country: string;
  status: "active" | "paused";
  daysActive: number;
  category: string;
};

const MOCK_ADS: MockAd[] = [
  {
    id: "ad-001",
    pageName: "TechStore Egypt",
    text: "خصم 30% على كل الإكسسوارات لفترة محدودة! اطلب دلوقتي واحصل على شحن مجاني.",
    platform: "fb",
    country: "EG",
    status: "active",
    daysActive: 14,
    category: "إلكترونيات",
  },
  {
    id: "ad-002",
    pageName: "ModaStyle",
    text: "تشكيلة صيف 2026 وصلت! فساتين قطن بتصاميم حصرية. كتالوج كامل على الموقع.",
    platform: "ig",
    country: "EG",
    status: "active",
    daysActive: 32,
    category: "أزياء",
  },
  {
    id: "ad-003",
    pageName: "GymFuel",
    text: "واي بروتين أصلي بنكهات جديدة. اشتري 2 واحصل على 1 مجانًا. لفترة محدودة.",
    platform: "fb",
    country: "EG",
    status: "active",
    daysActive: 7,
    category: "صحة",
  },
  {
    id: "ad-004",
    pageName: "BeautyBox",
    text: "منتجات العناية بالبشرة الطبيعية 100%. جمالك يبدأ من هنا.",
    platform: "ig",
    country: "SA",
    status: "active",
    daysActive: 21,
    category: "تجميل",
  },
  {
    id: "ad-005",
    pageName: "HomeCare",
    text: "أجهزة منزلية بضمان 5 سنوات وخدمة صيانة مجانية. اطلب خلال 48 ساعة.",
    platform: "fb",
    country: "EG",
    status: "paused",
    daysActive: 60,
    category: "أجهزة منزلية",
  },
  {
    id: "ad-006",
    pageName: "LearnHub",
    text: "كورس برمجة كامل من الصفر للاحتراف. شهادة معتمدة وفرصة عمل بعد الكورس.",
    platform: "fb",
    country: "EG",
    status: "active",
    daysActive: 45,
    category: "تعليم",
  },
  {
    id: "ad-007",
    pageName: "FoodieExpress",
    text: "تطبيق توصيل الأكل الأسرع في مصر. حمّل دلوقتي واحصل على خصم 50% على أول طلب.",
    platform: "ig",
    country: "EG",
    status: "active",
    daysActive: 18,
    category: "تطبيقات",
  },
  {
    id: "ad-008",
    pageName: "BabyWorld",
    text: "كل احتياجات البيبي في مكان واحد. ملابس، ألعاب، ومستلزمات بأفضل الأسعار.",
    platform: "fb",
    country: "SA",
    status: "active",
    daysActive: 28,
    category: "أطفال",
  },
];

const COUNTRIES = [
  { code: "all", label: { ar: "الكل", en: "All" } },
  { code: "EG", label: { ar: "مصر", en: "Egypt" } },
  { code: "SA", label: { ar: "السعودية", en: "Saudi Arabia" } },
];

export function FbLibrary() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [platformFilter, setPlatformFilter] = useState<"all" | "fb" | "ig">("all");

  const results = useMemo(() => {
    let list = [...MOCK_ADS];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.pageName.toLowerCase().includes(q) ||
          a.text.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    if (country !== "all") list = list.filter((a) => a.country === country);
    if (platformFilter !== "all")
      list = list.filter((a) => a.platform === platformFilter);
    return list;
  }, [query, country, platformFilter]);

  const openRealFb = () => {
    const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EG&q=${encodeURIComponent(
      query || ""
    )}&search_type=keyword_unordered`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0F172A]">
          {t.dash.library.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">{t.dash.library.subtitle}</p>
      </div>

      {/* Search bar */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute inset-y-0 start-3 h-4 w-4 text-[#94A3B8] mt-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.dash.library.searchPh}
              className="w-full rounded-lg border border-[#E2E8F0] bg-white ps-10 pe-4 py-2.5 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </div>
          <button
            onClick={openRealFb}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">{t.dash.library.openFb}</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <span className="block text-xs font-semibold text-[#475569] mb-1.5">
              {t.dash.library.country}
            </span>
            <div className="flex gap-1.5">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                    country === c.code
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                  )}
                >
                  {c.label[locale]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#475569] mb-1.5">
              {t.dash.library.platform}
            </span>
            <div className="flex gap-1.5">
              {(["all", "fb", "ig"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                    platformFilter === p
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"
                  )}
                >
                  {p === "all"
                    ? t.dash.library.all
                    : p === "fb"
                    ? "Facebook"
                    : "Instagram"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-bold text-[#0F172A]">
            {t.dash.library.results}
            <span className="ms-2 text-xs font-normal text-[#64748B] tabular">
              ({results.length})
            </span>
          </h2>
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white/50 p-10 text-center">
            <Search className="h-10 w-10 mx-auto text-[#CBD5E1]" />
            <p className="mt-3 text-sm text-[#64748B]">{t.dash.library.noResults}</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {results.map((ad) => (
              <article
                key={ad.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden card-hover hover:shadow-md hover:border-[#2563EB]/20"
              >
                {/* Ad creative */}
                <div className="aspect-video bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#A3E635]/10 flex items-center justify-center relative">
                  {ad.platform === "ig" ? (
                    <Instagram className="h-8 w-8 text-[#2563EB]" />
                  ) : (
                    <Facebook className="h-8 w-8 text-[#2563EB]" />
                  )}
                  {ad.platform === "ig" && (
                    <span className="absolute top-2 end-2 inline-flex items-center gap-1 rounded-full bg-black/40 text-white px-2 py-0.5 text-[10px]">
                      <Play className="h-2.5 w-2.5" />
                      Reel
                    </span>
                  )}
                  {ad.platform === "fb" && (
                    <span className="absolute top-2 end-2 inline-flex items-center gap-1 rounded-full bg-black/40 text-white px-2 py-0.5 text-[10px]">
                      <ImageIcon className="h-2.5 w-2.5" />
                      Image
                    </span>
                  )}
                </div>

                {/* Ad body */}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#2563EB]">
                          {ad.pageName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0F172A] truncate">
                          {ad.pageName}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          {t.dash.library.from} {ad.category} · {ad.country}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        ad.status === "active"
                          ? "bg-[#A3E635]/15 text-[#65A30D]"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {ad.status === "active" ? t.dash.library.active : t.dash.library.paused}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#475569] leading-relaxed line-clamp-3">
                    {ad.text}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>
                      {t.dash.library.ad} · {ad.id}
                    </span>
                    <span className="tabular">
                      {ad.daysActive} {t.dash.library.days}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
