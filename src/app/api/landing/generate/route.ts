/**
 * POST /api/landing/generate
 *
 * Generates a complete landing page (headline, subheadline, features, CTA,
 * price suggestion) from a short product brief using DeepSeek API.
 *
 * Request body:
 *   {
 *     "productName":   string,  // e.g. "تيشيرت قطن مصري 100%"
 *     "business":      string,  // e.g. "متجر ملابس"
 *     "audience":      string,  // e.g. "شباب 18-35 سنة"
 *     "tone":          "pro" | "friendly" | "urgent",
 *     "language":      "ar" | "en"
 *   }
 *
 * Response:
 *   {
 *     "headline":      string,
 *     "subheadline":   string,
 *     "features":      string[],   // 3-5 items
 *     "cta":           string,
 *     "price":         string,     // numeric string, e.g. "250"
 *     "currency":      string,     // "ج.م" or "EGP"
 *     "model":         "deepseek-chat" | "template",
 *     "durationMs":   number
 *   }
 *
 * Auth: server-side only. Reads DEEPSEEK_API_KEY from env.
 * If the key is missing or the call fails, falls back to a deterministic
 * template-based generator so the UI still works in demo mode.
 */

import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat"; // latest chat model (V3.x)

type Tone = "pro" | "friendly" | "urgent";
type Language = "ar" | "en";

type GenerateRequest = {
  productName?: string;
  business?: string;
  audience?: string;
  tone?: Tone;
  language?: Language;
};

type GeneratedLanding = {
  headline: string;
  subheadline: string;
  features: string[];
  cta: string;
  price: string;
  currency: string;
  model: string;
  durationMs: number;
};

export async function POST(req: NextRequest) {
  const startedAt = Date.now();

  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const productName = (body.productName || "").trim();
  const business = (body.business || "").trim();
  const audience = (body.audience || "").trim();
  const tone: Tone = body.tone === "urgent" || body.tone === "pro" ? body.tone : "friendly";
  const language: Language = body.language === "en" ? "en" : "ar";

  if (!productName) {
    return NextResponse.json(
      { error: "productName is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  // Try DeepSeek API if key is set
  if (apiKey) {
    try {
      const result = await callDeepSeek({
        productName,
        business,
        audience,
        tone,
        language,
        apiKey,
      });

      return NextResponse.json<GeneratedLanding>({
        ...result,
        model: DEEPSEEK_MODEL,
        durationMs: Date.now() - startedAt,
      });
    } catch (err: unknown) {
      console.error("[landing/generate] DeepSeek failed:", err);
      // Fall through to template fallback
    }
  }

  // Fallback: deterministic template-based generation
  const fallback = generateTemplate({
    productName,
    business,
    audience,
    tone,
    language,
  });

  return NextResponse.json<GeneratedLanding>({
    ...fallback,
    model: "template",
    durationMs: Date.now() - startedAt,
  });
}

/**
 * Calls DeepSeek chat completions API with a structured prompt.
 * Asks for strict JSON output, parses and validates it.
 */
async function callDeepSeek(params: {
  productName: string;
  business: string;
  audience: string;
  tone: Tone;
  language: Language;
  apiKey: string;
}): Promise<Omit<GeneratedLanding, "model" | "durationMs">> {
  const { productName, business, audience, tone, language, apiKey } = params;

  const toneAr: Record<Tone, string> = {
    pro: "احترافية ومباشرة",
    friendly: "ودودة وقريبة من العميل",
    urgent: "إلحاحية تدفع للإجراء الفوري",
  };
  const toneEn: Record<Tone, string> = {
    pro: "professional and direct",
    friendly: "friendly and approachable",
    urgent: "urgent, pushing for immediate action",
  };

  const systemPrompt =
    language === "ar"
      ? `أنت خبير في كتابة محتوى صفحات الهبوط (Landing Pages) للمتاجر الإلكترونية في المنطقة العربية. مهمتك توليد محتوى تسويقي كامل لمنتج بأسلوب ${toneAr[tone]}. يجب أن تكون الإجابة JSON صالح فقط بدون أي شرح أو نص إضافي.`
      : `You are an expert landing page copywriter for e-commerce stores. Generate complete marketing copy for a product in a ${toneEn[tone]} tone. Return ONLY valid JSON, no explanation or extra text.`;

  const userPrompt =
    language === "ar"
      ? `ولّد محتوى صفحة هبوط كاملة للمنتج ده:
- اسم المنتج: ${productName}
- النشاط: ${business || "متجر إلكتروني"}
- الجمهور المستهدف: ${audience || "الجمهور المناسب"}

أرجع JSON بالشكل ده بالظبط:
{
  "headline": "عنوان رئيسي جذاب 5-8 كلمات",
  "subheadline": "عنوان فرعي يوضح الفائدة 10-20 كلمة",
  "features": ["ميزة 1", "ميزة 2", "ميزة 3", "ميزة 4"],
  "cta": "نص زر الإجراء 2-4 كلمات",
  "price": "رقم السعر بالجنيه المصري بدون عملة",
  "currency": "ج.م"
}

قواعد:
- العنوان لازم يكون قوي ويخطف الانتباه
- المميزات لازم تكون ملموسة (مش عامة)
- السعر يكون رقم معقول للسوق المصري
- JSON صالح فقط، بدون markdown أو شرح`
      : `Generate a complete landing page copy for:
- Product: ${productName}
- Business: ${business || "Online store"}
- Target audience: ${audience || "Right audience"}

Return JSON in EXACTLY this shape:
{
  "headline": "compelling headline 5-8 words",
  "subheadline": "subheadline explaining benefit 10-20 words",
  "features": ["feature 1", "feature 2", "feature 3", "feature 4"],
  "cta": "CTA button text 2-4 words",
  "price": "numeric price in EGP without currency",
  "currency": "EGP"
}

Rules:
- Headline must be strong and attention-grabbing
- Features must be concrete (not generic)
- Price must be reasonable for the Egyptian market
- Return ONLY valid JSON, no markdown or explanation`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DeepSeek API ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("DeepSeek returned empty content");
  }

  // Parse JSON (DeepSeek with response_format=json_object returns clean JSON,
  // but we strip markdown fences defensively in case)
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`DeepSeek returned non-JSON: ${cleaned.slice(0, 100)}`);
  }

  // Validate + normalize
  const headline = String(parsed.headline || "").trim();
  const subheadline = String(parsed.subheadline || "").trim();
  const cta = String(parsed.cta || "").trim();
  const price = String(parsed.price || "").trim();
  const currency = String(parsed.currency || (language === "ar" ? "ج.م" : "EGP")).trim();

  let features: string[] = [];
  if (Array.isArray(parsed.features)) {
    features = parsed.features
      .map((f) => String(f || "").trim())
      .filter(Boolean)
      .slice(0, 6);
  }

  if (!headline) {
    throw new Error("DeepSeek returned empty headline");
  }

  return { headline, subheadline, features, cta, price, currency };
}

/**
 * Deterministic template-based generator — used when no DeepSeek key is set
 * or the API call fails. Produces reasonable copy locally so the UI works
 * in demo mode.
 */
function generateTemplate(params: {
  productName: string;
  business: string;
  audience: string;
  tone: Tone;
  language: Language;
}): Omit<GeneratedLanding, "model" | "durationMs"> {
  const { productName, business, audience, tone, language } = params;
  const p = productName;
  const aud = audience || (language === "ar" ? "الجمهور المناسب" : "the right audience");

  if (language === "ar") {
    const toneEmoji = tone === "urgent" ? "🔥" : tone === "friendly" ? "✨" : "🎯";

    const headlines: Tone[] = ["friendly", "pro", "urgent"].map((_, i) => i.toString() as unknown) as Tone[];
    const templates: Record<Tone, { headline: string; sub: string; cta: string }> = {
      friendly: {
        headline: `${toneEmoji} ${p} — اللي ${aud} بيدوروا عليه`,
        sub: `جودة عالية، سعر مناسب، وتجربة شراء سلسة. ${business || "متجرنا"} بيوفرلك الأفضل.`,
        cta: "اطلب دلوقتي",
      },
      pro: {
        headline: `${p} — حل احترافي لـ ${aud}`,
        sub: `${business || "متجرنا"} بيقدّم ${p} بأعلى معايير الجودة في السوق المصري.`,
        cta: "اطلب الآن",
      },
      urgent: {
        headline: `🔥 ${p} وصل أخيرًا — الكمية محدودة!`,
        sub: `لأول مرة عند ${business || "متجرنا"} — ${p} بجودة وسعر مايتكررش. اطلب قبل ما يخلص!`,
        cta: "احجز دلوقتي ⏰",
      },
    };

    const selected = templates[tone];

    const featuresList = [
      `جودة عالية ومضمونة`,
      `سعر مناسب للسوق المصري`,
      `توصيل سريع لكل المحافظات`,
      `الدفع عند الاستلام`,
      `ضمان استبدال خلال 14 يوم`,
    ];

    // Deterministic "price" based on product name length — just for demo
    const seed = productName.length * 17 + (business.length * 9);
    const price = String(150 + (seed % 20) * 25);

    return {
      headline: selected.headline,
      subheadline: selected.sub,
      features: featuresList,
      cta: selected.cta,
      price,
      currency: "ج.م",
    };
  }

  // English fallback
  const templates: Record<Tone, { headline: string; sub: string; cta: string }> = {
    friendly: {
      headline: `✨ ${p} — exactly what ${aud} are looking for`,
      sub: `High quality, fair price, and a seamless buying experience. ${business || "Our store"} delivers the best.`,
      cta: "Order now",
    },
    pro: {
      headline: `${p} — a professional solution for ${aud}`,
      sub: `${business || "Our store"} offers ${p} at the highest quality standards in the Egyptian market.`,
      cta: "Order now",
    },
    urgent: {
      headline: `🔥 ${p} has arrived — limited stock!`,
      sub: `First time at ${business || "our store"} — ${p} at a quality and price that won't last. Order before it's gone!`,
      cta: "Reserve now ⏰",
    },
  };

  const selected = templates[tone];
  const featuresList = [
    "Premium, guaranteed quality",
    "Fair price for the Egyptian market",
    "Fast delivery to all governorates",
    "Cash on delivery",
    "14-day exchange guarantee",
  ];

  const seed = productName.length * 17 + (business.length * 9);
  const price = String(150 + (seed % 20) * 25);

  return {
    headline: selected.headline,
    subheadline: selected.sub,
    features: featuresList,
    cta: selected.cta,
    price,
    currency: "EGP",
  };
}

/**
 * GET handler — returns metadata about the endpoint.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/landing/generate",
    method: "POST",
    description:
      "Generates a complete landing page (headline, subheadline, features, CTA, price) from a product brief using DeepSeek API.",
    model: process.env.DEEPSEEK_API_KEY ? DEEPSEEK_MODEL : "template (fallback)",
    requiresAuth: false,
    docs: "https://api-docs.deepseek.com/",
  });
}
