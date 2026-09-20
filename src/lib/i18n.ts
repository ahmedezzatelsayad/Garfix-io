export type Locale = "ar" | "en";

export const defaultLocale: Locale = "ar";

/**
 * Bilingual dictionary for Garfix.io
 * Mirrors the Arabic Brand Book content — same message, two languages.
 */
export const dict = {
  ar: {
    dir: "rtl",
    langName: "العربية",
    switchTo: "English",
    brand: {
      name: "GARFIX",
      domain: ".io",
      tagline: "Grow. Manage. Scale.",
      arabicTagline: "كبّر… نظّم… وسّع نشاطك",
      shortPitch: "أعلن بذكاء… وأدر مشروعك بسهولة.",
      heroEyebrow: "وكالة إعلانات + ERP مجاني للعملاء",
    },
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      pricing: "التسعير",
      how: "كيف نعمل",
      contact: "تواصل معنا",
      cta: "ابدأ الآن",
    },
    hero: {
      title1: "أعلن بذكاء،",
      title2: "وأدر مشروعك",
      title3: "بسهولة.",
      subtitle:
        "GARFIX.io عالم تجاري يجمع بين وكالة إعلانات رقمية ذكية ومنصة لإدارة الحملات الإعلانية مع تقديم خدمات إدارة الأعمال والمبيعات والمخزون مجانًا شهريًا للعملاء الملتزمين، فوق شروط العرض.",
      primaryCta: "ابدأ الآن",
      secondaryCta: "تعرّف على نموذج التسعير",
      stats: [
        { value: "20%", label: "عمولة إدارة الحملات فقط" },
        { value: "30%", label: "إدارة الحملات + صناعة المحتوى" },
        { value: "مجاني", label: "Garfix ERP طوال فترة التعاقد" },
      ],
      trustLine: "نتعامل مع أنظمة Facebook و Instagram و Garfix ERP",
    },
    valueProp: {
      eyebrow: "القيمة المقترحة",
      title: "ليست مجرد وكالة إعلانات أو منصة برمجيات، بل شريك رقمي متكامل",
      body:
        "نوفّر أدوات لإدارة الأعمال والمبيعات والمخزون مع إدارة الحملات الإعلانية، بأنفسنا دون الحاجة لاشتراك ERP خارجي فوق شروط العرض. ذلك يعني فاتورة واحدة، فريق واحد، ونظام بيانات واحد لمشروعك بالكامل.",
      cards: [
        {
          title: "وكالة لا منصة",
          desc: "نتعامل مع إعلاناتك بأنفسنا وفق المعايير المهنية ونلتزم بتحقيق أهداف فعلية، وليس فقط إطلاق الحملات.",
        },
        {
          title: "ERP مدمج ومجاني",
          desc: "للعملاء الملتزمين بالإعلان الشهري، نوفّر Garfix ERP مجانًا طوال فترة التعاقد — إدارة عملاء ومبيعات ومخزون.",
        },
        {
          title: "شفافية مالية كاملة",
          desc: "ميزانية إعلانية منفصلة عن أتعاب الوكالة، عمولة محسوبة على الإنفاق الفعلي أو أساس محدد في العقد، وتقارير دورية بالأداء.",
        },
        {
          title: "محتوى يصنع النتائج",
          desc: "فريق داخلي للتصميم والفيديو يحدد عدد المخرجات مسبقًا حسب نطاق العمل وقطاع المشروع.",
        },
      ],
    },
    services: {
      eyebrow: "خدماتنا",
      title: "أربع خدمات مترابطة تحت سقف واحد",
      subtitle:
        "كل خدمة قابلة للتعاقد منفردة أو مجمّعة ضمن باقة شهرية — حسب احتياج مشروعك ومرحلته.",
      items: [
        {
          id: "campaigns",
          title: "إدارة الحملات الإعلانية",
          enTitle: "Campaign Management",
          desc:
            "إدارة حملات Facebook و Instagram مقابل 20% من الإنفاق الإعلاني الفعلي فوق شروط العرض. نتولى الاستهداف، الميزانية، الاختبارات (A/B)، وإعادة الاستهداف. لا تشمل صناعة المحتوى إلا عند التعاقد عليه.",
          fee: "20%",
          feeLabel: "من الإنفاق الإعلاني",
          features: [
            "استهداف احترافي للجمهور المناسب",
            "متابعة يومية للأداء وإعادة التوزيع",
            "تقارير أسبوعية وشهرية بمؤشرات الأداء",
            "ضوابط شفافة على الميزانية الإعلانية",
          ],
        },
        {
          id: "content",
          title: "إدارة الحملات + صناعة المحتوى",
          enTitle: "Campaigns + Content",
          desc:
            "تشمل خدمة إدارة الحملات، مع إضافة صناعة المحتوى (تصاميم وفيديوهات) مقابل 30% من الإنفاق الإعلاني فوق شروط العرض. عدد التصاميم والفيديوهات يُحدد مسبقًا حسب نطاق العمل وقطاع المشروع.",
          fee: "30%",
          feeLabel: "من الإنفاق الإعلاني",
          features: [
            "تصاميم سوشيال ميديا احترافية",
            "فيديوهات قصيرة وملصقات متحركة",
            "هوية بصرية موحّدة عبر كل المنصات",
            "جدول نشر شهري منسّق مع الحملات",
          ],
        },
        {
          id: "erp",
          title: "Garfix ERP",
          enTitle: "Garfix ERP",
          desc:
            "نظام إدارة أعمال مجاني للعملاء الملتزمين بالإعلان الشهري، طوال فترة التعاقد. يشمل إدارة الأعمال، المبيعات، المخزون، والمهام، مع تطبيق شروط الأهلية والدعم والمتابعة.",
          fee: "مجاني",
          feeLabel: "طوال فترة التعاقد",
          features: [
            "إدارة عمولات ومبيعات ومخزون من نظام واحد",
            "تطبيق شروط الأهلية والدعم والمتابعة",
            "تصدير دوري للبيانات",
            "صلاحيات متعددة المستويات للفريق",
          ],
          gift: true,
        },
        {
          id: "marketplaces",
          title: "المعارض والمواقع",
          enTitle: "Marketplaces & Sites",
          desc:
            "حلول رقمية تساعد على عرض المنتجات وتحويل الزيارات إلى طلبات — ربط مع المنصات، تجهيز صفحات المنتجات، ومتابعة التحويلات عبر Garfix ERP.",
          fee: "تسعير",
          feeLabel: "منفصل حسب نطاق المشروع",
          features: [
            "ربط مع المنصات ومتاجر إلكترونية",
            "تجهيز صفحات منتجات احترافية",
            "متابعة التحويلات في Garfix ERP",
            "تقارير أداء المنتجات",
          ],
        },
      ],
    },
    pricing: {
      eyebrow: "نموذج التسعير",
      title: "نموذج تسعير واضح لوكالة الإعلانات",
      subtitle:
        "أنت تقدّم إدارة الحملات الإعلانية، والعميل يحصل على ERP مجانًا طالما يتعامل إعلانات معاك شهريًا.",
      ideaTitle: "الفكرة الأساسية",
      ideaBody:
        "أنت تقدّم إدارة الحملات الإعلانية، والعميل يحصل على ERP مجانًا طالما يتعامل إعلانات معاك شهريًا.",
      table: {
        title: "نظام العمولات",
        serviceHead: "الخدمة",
        feeHead: "أتعاب الوكالة",
        rows: [
          { service: "إدارة الحملات الإعلانية فقط", fee: "20% من الإنفاق الإعلاني" },
          { service: "إدارة الحملات + صناعة المحتوى", fee: "30% من الإنفاق الإعلاني" },
          { service: "ERP", fee: "مجاني طوال فترة التعاقد" },
        ],
      },
      calc: {
        title: "حاسبة تكلفة العمل",
        subtitle: "أدخل ميزانية الإعلانات الشهرية لتقدير أتعاب الوكالة والمتبقي من الميزانية الإعلانية.",
        budgetLabel: "ميزانية الإعلانات الشهرية",
        currency: "ج.م",
        planLabel: "اختر الباقة",
        plan1: "إدارة فقط — 20%",
        plan2: "إدارة + محتوى — 30%",
        resultAgency: "أتعاب الوكالة",
        resultAdSpend: "الإنفاق الإعلاني الفعلي",
        resultGross: "إجمالي ما يدفعه العميل",
        resultErp: "Garfix ERP",
        erpNote: "مجاني طوال فترة التعاقد",
        exampleTitle: "مثال تطبيقي",
        exampleBody:
          "عميل ميزانيته 10,000 جنيه شهريًا. يختار بين باقة الإدارة فقط (أتعاب الوكالة 2,000 جنيه) أو باقة الإدارة + المحتوى (أتعاب الوكالة 3,000 جنيه). في كلتا الحالتين يحصل على Garfix ERP مجانًا طوال فترة تعاقده معنا.",
      },
      note: "كل عرض يذكّر بأن ميزانية الإعلانات منفصلة عن أتعاب الإدارة، وأن GARFIX يحسب العمولة على الإنفاق الفعلي أو الأساس المحدد في العقد.",
    },
    how: {
      eyebrow: "كيف نعمل",
      title: "رحلة العميل من أول زيارة حتى التقرير الشهري",
      subtitle:
        "عملية واضحة من 9 خطوات — لا مفاجآت ولا التزامات خفية، فقط شفافية كاملة في كل مرحلة.",
      steps: [
        {
          n: "01",
          title: "زيارة الموقع",
          desc: "العميل يزور Garfix.io ويتعرف على الخدمات والقيمة المقترحة.",
        },
        {
          n: "02",
          title: "طلب التسجيل",
          desc: "يطلب التسجيل عبر نموذج مختصر، دون إفشاء أي تكاليف.",
        },
        {
          n: "03",
          title: "تحديد النشاط والهدف",
          desc: "نحدد نشاط المشروع، أهدافه، وميزانيته المتوقعة.",
        },
        {
          n: "04",
          title: "اختيار الخدمة",
          desc: "إدارة الحملات فقط، أو إدارة الحملات مع صناعة المحتوى.",
        },
        {
          n: "05",
          title: "توقيع الاتفاق",
          desc: "توقيع العقد وتحديد الصلاحيات والمسؤوليات.",
        },
        {
          n: "06",
          title: "إنشاء الحساب",
          desc: "ننشئ حسابًا على Garfix ERP ونبدأ الحملة.",
        },
        {
          n: "07",
          title: "تجهيز البيانات",
          desc: "تجهيز بيانات النشاط والمنتجات والمحتوى للحملة.",
        },
        {
          n: "08",
          title: "التقارير الدورية",
          desc: "العميل يحصل على تقرير دوري شهري مع مراجعة الأداء.",
        },
        {
          n: "09",
          title: "ERP مجاني",
          desc: "يستمر الحساب المجاني على Garfix ERP طوال فترة التعاقد.",
        },
      ],
    },
    governance: {
      eyebrow: "الحوكمة والشفافية",
      title: "مبادئ الالتزام قبل الإطلاق",
      items: [
        "العميل يحتفظ بملكية حساباته الإعلانية وبياناته فوق العقد.",
        "لا يقدّم أي وعد مضمون بمبيعات أو أرباح.",
        "يجب الحصول على الموافقات اللازمة قبل استخدام قصص النجاح أو بيانات العملاء.",
        "ميزانية الإعلانات يجب أن تكون مفصّلة محاسبيًا وقانونيًا عن أتعاب الإدارة.",
        "عند توقيت التعاقد يجب تحديد ما يحدث للحساب على ERP بآلية عادلة.",
      ],
    },
    cta: {
      title: "جاهز تكبّر مشروعك؟",
      subtitle: "ابدأ الآن — حساب ERP مجاني، إدارة إعلانات احترافية، وشفافية كاملة.",
      button: "اطلب خدمتك الآن",
      secondary: "تواصل مع فريق المبيعات",
    },
    footer: {
      tagline: "Grow. Manage. Scale.",
      arabicTagline: "كبّر… نظّم… وسّع نشاطك",
      desc:
        "وثيقة تأسيسية للهوية الاستراتيجية والبصرية والتجارية، تساعد على توحيد ظهور Garfix.io في الموقع والمنصة والإعلانات.",
      sections: [
        {
          title: "الخدمات",
          links: [
            "إدارة الحملات الإعلانية",
            "إدارة الحملات + المحتوى",
            "Garfix ERP",
            "المعارض والمواقع",
          ],
        },
        {
          title: "الشركة",
          links: ["من نحن", "كيف نعمل", "نموذج التسعير", "الحوكمة والشفافية"],
        },
        {
          title: "تواصل",
          links: ["Facebook", "Instagram", "البريد الإلكتروني", "واتساب"],
        },
      ],
      rights: "© 2026 Garfix.io — جميع الحقوق محفوظة.",
      edition: "الإصدار 1.0 — سبتمبر 2026",
    },
  },
  en: {
    dir: "ltr",
    langName: "English",
    switchTo: "العربية",
    brand: {
      name: "GARFIX",
      domain: ".io",
      tagline: "Grow. Manage. Scale.",
      arabicTagline: "Grow. Manage. Scale.",
      shortPitch: "Advertise smartly. Manage your project with ease.",
      heroEyebrow: "Ad agency + free ERP for committed clients",
    },
    nav: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      how: "How we work",
      contact: "Contact",
      cta: "Start now",
    },
    hero: {
      title1: "Advertise smartly,",
      title2: "manage your project",
      title3: "with ease.",
      subtitle:
        "GARFIX.io is a commercial world that combines a smart digital advertising agency with a platform to manage ad campaigns, sales, inventory, and operations — with free monthly ERP for committed clients, above the offer terms.",
      primaryCta: "Start now",
      secondaryCta: "See the pricing model",
      stats: [
        { value: "20%", label: "Campaign management fee only" },
        { value: "30%", label: "Campaigns + content production" },
        { value: "Free", label: "Garfix ERP throughout the contract" },
      ],
      trustLine: "We work with Facebook, Instagram, and Garfix ERP",
    },
    valueProp: {
      eyebrow: "Value proposition",
      title: "Not just an ad agency or a SaaS — an integrated digital partner",
      body:
        "We provide tools to manage operations, sales, and inventory alongside ad campaign management, in-house, with no external ERP subscription required above the offer terms. One invoice, one team, one data system for your whole project.",
      cards: [
        {
          title: "Agency, not just platform",
          desc: "We run your ads ourselves following professional standards and commit to real outcomes, not just campaign launches.",
        },
        {
          title: "Embedded free ERP",
          desc: "For clients committed to monthly advertising, Garfix ERP is free throughout the contract — CRM, sales, and inventory in one place.",
        },
        {
          title: "Full financial transparency",
          desc: "Ad budget is separate from agency fees. Commission is calculated on actual spend or the basis defined in the contract, with periodic performance reports.",
        },
        {
          title: "Content that drives results",
          desc: "An in-house design and video team. The number of deliverables is defined upfront based on scope and project sector.",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Four connected services under one roof",
      subtitle:
        "Each service is available standalone or bundled in a monthly package — depending on your project stage and needs.",
      items: [
        {
          id: "campaigns",
          title: "Ad campaign management",
          enTitle: "Campaign Management",
          desc:
            "Manage Facebook and Instagram campaigns for 20% of actual ad spend above offer terms. We handle targeting, budgeting, A/B testing, and retargeting. Does not include content production unless contracted.",
          fee: "20%",
          feeLabel: "of ad spend",
          features: [
            "Professional audience targeting",
            "Daily performance tracking and reallocation",
            "Weekly and monthly KPI reports",
            "Transparent ad-budget controls",
          ],
        },
        {
          id: "content",
          title: "Campaigns + content production",
          enTitle: "Campaigns + Content",
          desc:
            "Includes campaign management plus content production (designs and videos) for 30% of ad spend above offer terms. The number of designs and videos is defined upfront based on scope and sector.",
          fee: "30%",
          feeLabel: "of ad spend",
          features: [
            "Professional social-media designs",
            "Short videos and motion graphics",
            "Unified visual identity across platforms",
            "Monthly publishing calendar aligned with campaigns",
          ],
        },
        {
          id: "erp",
          title: "Garfix ERP",
          enTitle: "Garfix ERP",
          desc:
            "A free operations management system for clients committed to monthly advertising, throughout the contract. Includes CRM, sales, inventory, and tasks, with eligibility conditions and ongoing support.",
          fee: "Free",
          feeLabel: "throughout the contract",
          features: [
            "Commissions, sales, and inventory in one system",
            "Eligibility conditions and ongoing support",
            "Periodic data exports",
            "Multi-tier team permissions",
          ],
          gift: true,
        },
        {
          id: "marketplaces",
          title: "Marketplaces & sites",
          enTitle: "Marketplaces & Sites",
          desc:
            "Digital solutions to showcase products and turn visits into orders — platform integrations, product page setup, and conversion tracking through Garfix ERP.",
          fee: "Custom",
          feeLabel: "priced per project scope",
          features: [
            "Platform and e-commerce integrations",
            "Professional product page setup",
            "Conversion tracking in Garfix ERP",
            "Product performance reports",
          ],
        },
      ],
    },
    pricing: {
      eyebrow: "Pricing model",
      title: "A clear pricing model for the ad agency",
      subtitle:
        "You provide ad campaign management; the client gets ERP for free as long as they run ads with you monthly.",
      ideaTitle: "The core idea",
      ideaBody:
        "You provide ad campaign management; the client gets ERP for free as long as they run ads with you monthly.",
      table: {
        title: "Commission schedule",
        serviceHead: "Service",
        feeHead: "Agency fee",
        rows: [
          { service: "Ad campaign management only", fee: "20% of ad spend" },
          { service: "Campaigns + content production", fee: "30% of ad spend" },
          { service: "ERP", fee: "Free throughout the contract" },
        ],
      },
      calc: {
        title: "Cost calculator",
        subtitle:
          "Enter your monthly ad budget to estimate the agency fee and the remaining ad budget.",
        budgetLabel: "Monthly ad budget",
        currency: "EGP",
        planLabel: "Choose a plan",
        plan1: "Management only — 20%",
        plan2: "Management + content — 30%",
        resultAgency: "Agency fee",
        resultAdSpend: "Actual ad spend",
        resultGross: "Total client payment",
        resultErp: "Garfix ERP",
        erpNote: "Free throughout the contract",
        exampleTitle: "Worked example",
        exampleBody:
          "A client with a 10,000 EGP monthly budget chooses between management only (2,000 EGP fee) or management + content (3,000 EGP fee). Either way, Garfix ERP is free throughout the contract.",
      },
      note: "Every proposal reminds the client that the ad budget is separate from management fees, and that GARFIX calculates commission on actual spend or the basis defined in the contract.",
    },
    how: {
      eyebrow: "How we work",
      title: "The client journey from first visit to monthly report",
      subtitle:
        "A clear 9-step process — no surprises, no hidden commitments, just full transparency at every stage.",
      steps: [
        {
          n: "01",
          title: "Visit the website",
          desc: "The client visits Garfix.io and learns about the services and value proposition.",
        },
        {
          n: "02",
          title: "Request signup",
          desc: "A short signup form is submitted — no costs disclosed yet.",
        },
        {
          n: "03",
          title: "Define activity & goal",
          desc: "We define the project activity, goals, and expected budget.",
        },
        {
          n: "04",
          title: "Choose service",
          desc: "Campaign management only, or campaigns plus content production.",
        },
        {
          n: "05",
          title: "Sign agreement",
          desc: "Sign the contract and define permissions and responsibilities.",
        },
        {
          n: "06",
          title: "Create account",
          desc: "We create a Garfix ERP account and launch the campaign.",
        },
        {
          n: "07",
          title: "Prepare data",
          desc: "Prepare activity, product, and content data for the campaign.",
        },
        {
          n: "08",
          title: "Periodic reports",
          desc: "The client receives a monthly report with a performance review.",
        },
        {
          n: "09",
          title: "Free ERP",
          desc: "The free Garfix ERP account continues throughout the contract.",
        },
      ],
    },
    governance: {
      eyebrow: "Governance & transparency",
      title: "Commitment principles before launch",
      items: [
        "The client retains ownership of their ad accounts and data above the contract.",
        "No guaranteed sales or profit promises are made.",
        "Required approvals must be obtained before using success stories or client data.",
        "The ad budget must be detailed separately from management fees, accounting- and legally.",
        "At contract end, the ERP account is handled under a fair automated policy.",
      ],
    },
    cta: {
      title: "Ready to grow your project?",
      subtitle: "Start now — free ERP account, professional ad management, full transparency.",
      button: "Request your service",
      secondary: "Talk to sales",
    },
    footer: {
      tagline: "Grow. Manage. Scale.",
      arabicTagline: "Grow. Manage. Scale.",
      desc:
        "A foundational document for the strategic, visual, and commercial identity — helping unify Garfix.io across the website, the platform, and ads.",
      sections: [
        {
          title: "Services",
          links: [
            "Campaign management",
            "Campaigns + content",
            "Garfix ERP",
            "Marketplaces & sites",
          ],
        },
        {
          title: "Company",
          links: ["About", "How we work", "Pricing model", "Governance & transparency"],
        },
        {
          title: "Contact",
          links: ["Facebook", "Instagram", "Email", "WhatsApp"],
        },
      ],
      rights: "© 2026 Garfix.io — All rights reserved.",
      edition: "Edition 1.0 — September 2026",
    },
  },
} as const;

export type Dict = (typeof dict)["ar"];
