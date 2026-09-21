"use client";

import { useState } from "react";
import { Palette, Save, Check } from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PRESET_PALETTES = [
  {
    name: { ar: "أزرق كهربائي", en: "Electric Blue" },
    colors: ["#2563EB", "#0F172A", "#A3E635", "#F8FAFC"],
  },
  {
    name: { ar: "غروب الشمس", en: "Sunset" },
    colors: ["#F97316", "#EC4899", "#FBBF24", "#1F2937"],
  },
  {
    name: { ar: "غابة", en: "Forest" },
    colors: ["#059669", "#10B981", "#F59E0B", "#0F172A"],
  },
  {
    name: { ar: "ملكي", en: "Royal" },
    colors: ["#7C3AED", "#1E40AF", "#F59E0B", "#0F172A"],
  },
];

export function BrandKit() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("");
  const [colors, setColors] = useState<string[]>(PRESET_PALETTES[0].colors);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    toast({
      title: locale === "ar" ? "اتحفظ الـ Brand Kit" : "Brand Kit saved",
      description: brandName || (locale === "ar" ? "بدون اسم" : "Untitled"),
    });
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/8 text-[#2563EB]">
          <Palette className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-[#0F172A]">
            {locale === "ar" ? "Brand Kit — هويتك البصرية" : "Brand Kit — your visual identity"}
          </h3>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            {locale === "ar"
              ? "احفظ ألوان براندك عشان تستخدمها في كل الـ Landing Pages والإعلانات"
              : "Save your brand colors to reuse across all Landing Pages and ads"}
          </p>
        </div>
      </div>

      <label className="block mb-3">
        <span className="block text-xs font-semibold text-[#475569] mb-1.5">
          {locale === "ar" ? "اسم البراند" : "Brand name"}
        </span>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder={locale === "ar" ? "مثلاً: TechStore" : "e.g. TechStore"}
          className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
        />
      </label>

      <span className="block text-xs font-semibold text-[#475569] mb-2">
        {locale === "ar" ? "اختر لوحة ألوان" : "Pick a color palette"}
      </span>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {PRESET_PALETTES.map((palette, i) => {
          const isActive = colors.join() === palette.colors.join();
          return (
            <button
              key={i}
              onClick={() => setColors(palette.colors)}
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 transition-all",
                isActive
                  ? "border-[#2563EB] ring-1 ring-[#2563EB]/20"
                  : "border-[#E2E8F0] hover:border-[#CBD5E1]"
              )}
            >
              <div className="flex gap-0.5">
                {palette.colors.map((c, ci) => (
                  <div
                    key={ci}
                    className="h-5 w-5 rounded-full border border-white/40"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#0F172A]">
                {palette.name[locale]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom colors */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((c, i) => (
          <label
            key={i}
            className="block cursor-pointer rounded-lg border border-[#E2E8F0] overflow-hidden hover:border-[#2563EB]/40 transition-colors"
            style={{ background: c }}
          >
            <div className="bg-white/85 backdrop-blur px-2 py-1 text-[10px] font-mono text-center">
              {c}
            </div>
            <input
              type="color"
              value={c}
              onChange={(e) => {
                const next = [...colors];
                next[i] = e.target.value;
                setColors(next);
              }}
              className="block w-full h-8 opacity-0 cursor-pointer"
              aria-label={`Color ${i + 1}`}
            />
          </label>
        ))}
      </div>

      <button
        onClick={save}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
          saved
            ? "bg-[#A3E635] text-[#0F172A]"
            : "bg-[#2563EB] text-white hover:bg-[#1E40AF]"
        )}
      >
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved
          ? locale === "ar"
            ? "اتحفظ"
            : "Saved"
          : locale === "ar"
          ? "احفظ الـ Brand Kit"
          : "Save Brand Kit"}
      </button>
    </div>
  );
}
