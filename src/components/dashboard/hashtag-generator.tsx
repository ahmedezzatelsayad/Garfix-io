"use client";

import { useState } from "react";
import { Hash, Copy, Check, Sparkles, RefreshCw } from "lucide-react";
import { useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function HashtagGenerator() {
  const t = useDict();
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    if (!keyword.trim()) return;
    const k = keyword.trim().toLowerCase().replace(/\s+/g, "_");

    // Local generator: combines the keyword with common high-engagement hashtags
    const base = [
      `#${k}`,
      `#${k}_egypt`,
      `#${k}_2026`,
      `#${k}_online`,
      `#${k}_deal`,
      `#${k}_offer`,
      `#best_${k}`,
      `#top_${k}`,
      `#shop_${k}`,
      `#buy_${k}`,
      `#new_${k}`,
      `#quality_${k}`,
    ];

    // Mix with generic high-engagement hashtags
    const generic =
      t.dash.sidebar.overview === "Overview"
        ? ["#fyp", "#viral", "#trending", "#explore", "#sale", "#newcollection", "#onlineshopping", "#musthave"]
        : ["#تسوق", "#اكسبلور", "#ترند", "#عروض", "#جديد", "#تخفيضات", "#الأكثر_مبيعا", "#توصيل_مجاني"];

    const all = [...base, ...generic].slice(0, 15);
    setHashtags(all);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
    toast({ title: t.dash.ads.copied });
  };

  const copyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast({ title: t.dash.ads.copied });
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A3E635]/15 text-[#65A30D]">
          <Hash className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-[#0F172A]">
            {t.dash.sidebar.overview === "Overview" ? "Hashtag generator" : "مولّد الهاشتاجات"}
          </h3>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            {t.dash.sidebar.overview === "Overview"
              ? "15 hashtags ready to paste"
              : "15 هاشتاج جاهز للنسخ"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={
            t.dash.sidebar.overview === "Overview"
              ? "Enter keyword (e.g. fashion)"
              : "اكتب كلمة (مثلاً: أزياء)"
          }
          className="flex-1 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
          onKeyDown={(e) => {
            if (e.key === "Enter") generate();
          }}
        />
        <button
          onClick={generate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t.dash.sidebar.overview === "Overview" ? "Generate" : "ولّد"}
        </button>
      </div>

      {hashtags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hashtags.map((tag, i) => (
              <button
                key={i}
                onClick={() => copyOne(tag)}
                className="group inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 text-xs font-medium text-[#0F172A] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:text-[#2563EB] transition-colors"
                dir="ltr"
              >
                <span>{tag}</span>
                <Copy className="h-3 w-3 opacity-40 group-hover:opacity-100" />
              </button>
            ))}
          </div>
          <button
            onClick={copyAll}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold transition-colors",
              copiedAll
                ? "text-[#65A30D] border-[#A3E635] bg-[#A3E635]/8"
                : "text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]"
            )}
          >
            {copiedAll ? (
              <>
                <Check className="h-3.5 w-3.5" />
                {t.dash.ads.copied}
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                {t.dash.sidebar.overview === "Overview"
                  ? "Copy all hashtags"
                  : "انسخ كل الهاشتاجات"}
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
