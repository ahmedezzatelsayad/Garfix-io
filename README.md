# Garfix.io

> **Grow. Manage. Scale.** — A smart digital advertising agency + free ERP platform for committed clients. All your tools in one place.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?logo=shadcnui)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/license-Commercial-orange)](#license)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Per-Client ERP Workflow](#-per-client-erp-workflow)
- [Login & Authentication](#-login--authentication)
- [Brand & Design System](#-brand--design-system)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🎯 Overview

**Garfix.io** is a SaaS platform that combines an advertising agency's services with a free ERP system for committed clients. Built for the MENA region, it serves Arabic and English speakers with a focus on small and medium-sized businesses that need a single integrated partner instead of juggling multiple disconnected tools.

**The value proposition:** When a client commits to monthly advertising, they get a full dashboard to build landing pages, write ad copy, search Facebook Ads Library, and access Garfix ERP — **all free, throughout the contract**.

### Why Garfix.io exists

Small business owners in MENA typically juggle:
- A separate advertising agency
- A separate designer for ad creatives
- A separate ERP system for sales/inventory
- A separate landing page builder

The result: many invoices, many teams, disconnected data. Garfix.io solves this by combining everything under one roof with full financial transparency.

---

## ✨ Key Features

### Marketing Site
- **Hero** with tagline "Grow. Manage. Scale." and live stats
- **Stats Bar** showing 1,200+ active clients, 38% avg. sales growth, 850K+ EGP managed monthly
- **Value Proposition** — 4 cards explaining the integrated partner model
- **Services** — 4 services (Campaign Management, Content Production, Garfix ERP, Marketplaces)
- **Pricing Tiers** — 3 monthly tiers: Starter, Growth (most popular), Scale
- **Comparison Table** — Garfix.io vs Madgicx / AdCreative / HighLevel / HubSpot
- **Testimonials** — 4 real client stories from Cairo, Alexandria, Riyadh, Mansoura
- **Pricing Calculator** — interactive monthly cost calculator
- **How We Work** — 9-step client journey timeline
- **FAQ** — 6 collapsible common questions
- **Governance & CTA** — commitment principles + final CTA

### Footer Pages (7 complete pages)
- **About** — company story, values, stats
- **Contact** — 4 channels (WhatsApp, Email, Facebook, Instagram) + contact form
- **Privacy Policy** — 7 sections covering data ownership, ad budget, tokens, ERP, etc.
- **Terms & Conditions** — 7 sections governing the legal framework
- **Services Detail** — every service in depth
- **Pricing Detail** — 3 tiers with full feature breakdown
- **How Detail** — 9-step journey expanded

### Client Dashboard (per user)
- **Overview** with KPIs (budget, agency fee, ad spend, ERP status), Performance Charts (Area chart for spend + Bar chart for conversions, toggleable), Activity Feed (live indicator), and Onboarding Checklist (interactive, 5 steps with progress bar)
- **Landing Page Builder** — form-based editor with live preview, mobile/desktop preview toggle
- **Ad Writer** — AI-powered 3 ad copy generator + Brand Kit (4 color palettes + custom color pickers) + Hashtag Generator (15 hashtags from one keyword)
- **Facebook Ads Library Search** — search competitor ads with country/platform filters + direct link to Facebook's real Ads Library
- **Order → Invoice** (the strongest ERP feature) — WhatsApp-style message parser that extracts products, quantities, and prices from natural language, converts to a full invoice with draft/sent/paid statuses
- **Garfix ERP** link card — opens the client's own ERP deployment in a new tab

### Founder Panel
- **Client management table** — name, business, plan, budget, ERP status, login link, actions
- **Per-client ERP URL editor** — inline editable input, Enter to save / Escape to cancel, auto-activates ERP when URL is added
- **Activate/deactivate ERP** toggle per client
- **Generate login link** — copies `?token=xxx` URL to clipboard
- **"Open as client"** — instantly login as any client for testing
- **Add new client** dialog with full form (name, email, phone, business, plan, budget)
- **Stats** — total clients, active, ERP activated, pending

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui (New York) |
| **State Management** | Zustand + persist middleware |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Fonts** | Readex Pro (Arabic), Plus Jakarta Sans + Inter (Latin), Tajawal + IBM Plex Sans Arabic (fallbacks) |
| **Database** | Prisma ORM (SQLite/PostgreSQL client) — *configured but optional* |
| **Animations** | tw-animate-css, custom keyframes |
| **Package Manager** | Bun |

---

## 🏛 Architecture

Garfix.io is a **single-page application** built on Next.js App Router. Due to environment constraints (only `/` route is user-visible), the app uses **state-based view switching** instead of multi-route navigation.

### State Machine

```
┌──────────────────────────────────────────────────────────────┐
│                       Root Layout                            │
│   <LocaleProvider> applies lang/dir to <html>                │
│   Reads ?token=xxx from URL → auto-login                     │
└──────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                       page.tsx                               │
│   Switches view based on `view` state from store             │
└──────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  marketing    │  │  login          │  │  founder        │
│  (default)    │  │  (auth form)    │  │  (admin panel)  │
└───────────────┘  └─────────────────┘  └─────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  dashboard      │
                    │  (per client)   │
                    │                 │
                    │  • overview     │
                    │  • landing      │
                    │  • ad-writer    │
                    │  • fb-library   │
                    │  • order-invoice│
                    │  • erp-link     │
                    └─────────────────┘
```

### State Persistence

Only **locale** + **clients** + **invoices** are persisted to `localStorage`. Session state (`user`, `view`, `dashboardView`) is in-memory only to prevent rehydration races with `loginAs()` and `setView()`.

### Token-Based Auto-Login

When a client visits `/?token=garfix-token-ahmed`:
1. `LocaleProvider` reads the token from the URL
2. Looks up matching client in the store
3. If found → calls `loginAs(client)` → redirects to dashboard
4. Cleans the URL (removes `?token=`) so refresh doesn't re-trigger

---

## 📁 Project Structure

```
Garfix-io/
├── public/                          # Static assets
│   ├── logo.svg                     # Garfix favicon
│   └── robots.txt
├── prisma/
│   └── schema.prisma                # Database schema (optional)
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (fonts, LocaleProvider)
│   │   ├── page.tsx                 # View router (state-based)
│   │   ├── globals.css              # Tailwind + brand tokens + utilities
│   │   └── api/                     # API routes (extensible)
│   ├── components/
│   │   ├── ui/                      # shadcn/ui primitives (40+ components)
│   │   ├── site/                    # Marketing site components
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── value-proposition.tsx
│   │   │   ├── services.tsx
│   │   │   ├── pricing-tiers.tsx
│   │   │   ├── pricing.tsx          # Calculator
│   │   │   ├── comparison.tsx       # vs competitors
│   │   │   ├── testimonials.tsx
│   │   │   ├── how-we-work.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── governance.tsx       # CTA section
│   │   │   ├── footer.tsx           # 4-column links
│   │   │   ├── footer-pages.tsx     # 7 standalone pages
│   │   │   ├── locale-provider.tsx  # Applies lang/dir + token login
│   │   │   └── logo.tsx             # GARFIX SVG (Wordmark + G mark)
│   │   ├── auth/
│   │   │   └── login-view.tsx       # Email/password + founder access
│   │   ├── dashboard/
│   │   │   ├── dashboard-view.tsx   # Sidebar + topbar shell
│   │   │   ├── overview.tsx         # KPIs + Quick Actions
│   │   │   ├── performance-charts.tsx  # Recharts (Area + Bar)
│   │   │   ├── activity-feed.tsx
│   │   │   ├── onboarding-checklist.tsx
│   │   │   ├── landing-builder.tsx # Form + live preview (mobile/desktop)
│   │   │   ├── ad-writer.tsx        # 3-copy generator
│   │   │   ├── brand-kit.tsx        # Color palettes + pickers
│   │   │   ├── hashtag-generator.tsx # 15 hashtags from 1 keyword
│   │   │   ├── fb-library.tsx       # Mock + real Facebook link
│   │   │   ├── order-invoice.tsx    # WhatsApp → Invoice parser
│   │   │   └── erp-link.tsx         # Per-client ERP URL card
│   │   └── founder/
│   │       └── founder-view.tsx     # Client management + ERP URL editor
│   ├── lib/
│   │   ├── store.ts                 # Zustand store (the source of truth)
│   │   ├── i18n.ts                  # Bilingual dictionary (AR/EN)
│   │   ├── utils.ts                 # cn() class merge helper
│   │   └── db.ts                    # Prisma client (optional)
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── Caddyfile                        # Gateway config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (or **Bun 1.1+** — recommended)
- **Git**

### Installation

```bash
# Clone the repo
git clone https://github.com/ahmedezzatelsayad/Garfix-io.git
cd Garfix-io

# Install dependencies (Bun recommended)
bun install

# OR with npm
npm install
```

### Run the dev server

```bash
bun run dev
# → http://localhost:3000
```

The dev server runs on **port 3000** with Turbopack for fast HMR.

### Production build

```bash
bun run build
bun run start
```

> ⚠️ In the current sandbox environment, only `bun run dev` is officially supported. `bun run build` is not used.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server on port 3000 (auto-restarts) |
| `bun run lint` | Run ESLint (TypeScript + Next.js rules) |
| `bun run build` | Production build (not used in sandbox) |
| `bun run start` | Start production server (not used in sandbox) |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run migrations |
| `bun run db:reset` | Reset database |

---

## 🔐 Environment Variables

Create a `.env` file in the project root. Currently, the app runs fully client-side, so env vars are minimal. Add them as needed:

```env
# Optional: Prisma database URL (if you enable persistence)
DATABASE_URL="file:./prisma/dev.db"

# Optional: NextAuth.js (if you enable real auth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Optional: Real Facebook Marketing API (for live ad management)
FB_ACCESS_TOKEN=""
FB_AD_ACCOUNT_ID=""

# Optional: Real OpenAI / z-ai-web-dev-sdk (for AI ad copy generation)
ZAI_API_KEY=""
```

> The current deployment uses **no env vars** — everything runs client-side with local state.

---

## 🌐 Deployment

### Option 1: Vercel (recommended for Next.js)

1. Push your code to GitHub (already done — `Garfix-io` repo)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `bun run build` (or `npm run build`)
   - **Output Directory**: `.next`
   - **Install Command**: `bun install` (or `npm install`)
5. Add any environment variables in the Vercel dashboard
6. Click **Deploy**

### Option 2: Self-hosted (per-client deployment)

For the per-client ERP deployments described in [Per-Client ERP Workflow](#-per-client-erp-workflow):

```bash
# On each client's VPS
git clone https://github.com/ahmedezzatelsayad/Garfix-io.git
cd Garfix-io
bun install
bun run build

# Use PM2 or systemd for production
bun run start
```

Configure nginx/Caddy reverse proxy to route `https://client-name.garfix-erp.app` → `localhost:3000`.

### Option 3: Docker

Create a `Dockerfile`:

```dockerfile
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["bun", "run", "start"]
```

```bash
docker build -t garfix-io .
docker run -p 3000:3000 garfix-io
```

---

## 🔗 Per-Client ERP Workflow

This is the **core deployment architecture** for Garfix.io. Each client gets their own ERP instance on a separate server, and the founder manages the URLs from the admin panel.

### Step-by-step

1. **Founder deploys ERP for client X**
   ```bash
   # On a fresh VPS for client X
   git clone https://github.com/ahmedezzatelsayad/Garfix-io.git
   cd Garfix-io
   bun install && bun run build
   bun run start  # runs on port 3000
   ```
   Configure DNS: `client-x.garfix-erp.app` → VPS IP

2. **Founder logs into the Founder Panel**
   - Open the site → scroll to footer → click "Founder Panel"
   - Or visit `/?token=<founder-token>` (TBD)

3. **Founder sets the client's ERP URL**
   - Find the client in the table
   - Click "+ Add ERP URL" (or click the existing URL to edit)
   - Paste `https://client-x.garfix-erp.app`
   - Press **Enter** to save (or Escape to cancel)
   - ERP status auto-activates from `inactive` → `active`

4. **Client accesses their ERP**
   - Client logs into their Garfix dashboard via `?token=<client-token>`
   - Clicks "Garfix ERP" in the sidebar
   - Sees their custom URL displayed in a card
   - Clicks "Open Garfix ERP" → opens in a **new tab**

### Token-based login

Each client has a unique token (e.g., `garfix-token-ahmed`). Share the URL:
```
https://garfix.io/?token=garfix-token-ahmed
```
The client is auto-logged in to their dashboard. Tokens are generated by the founder panel when adding a client.

### Security notes

- Tokens are stored in `localStorage` (persisted state) — treat them as confidential
- If a token is leaked, the founder can regenerate it by editing the client record
- For production, consider:
  - Server-side token validation
  - Token expiration
  - IP allowlisting per client

---

## 🔑 Login & Authentication

### Current (demo) auth

The app uses **demo credentials** + token-based login:

- **Email/password**: `client@garfix.io` / `123456`
- **Token URL**: `https://garfix.io/?token=garfix-token-ahmed` (any seeded client)

### Seeded clients

| Name | Token | Plan | Budget | ERP URL |
|------|-------|------|--------|---------|
| أحمد محمود | `garfix-token-ahmed` | manage-content | 25,000 EGP | `https://ahmed.garfix-erp.app` |
| سارة عبدالله | `garfix-token-sara` | manage | 12,000 EGP | `https://sara.garfix-erp.app` |
| خالد إبراهيم | `garfix-token-khaled` | manage-content | 50,000 EGP | (empty — set by founder) |
| منى السيد | `garfix-token-mona` | manage | 8,000 EGP | (empty — set by founder) |

### Upgrading to real auth

The codebase includes `NextAuth.js v4` as a dependency. To enable real authentication:

1. Configure providers in `src/app/api/auth/[...nextauth]/route.ts`
2. Add `NEXTAUTH_SECRET` to `.env`
3. Replace `loginAs()` in `src/lib/store.ts` with API-backed session management

---

## 🎨 Brand & Design System

### Color Palette (per Brand Book page 5)

| Token | Hex | Usage |
|------|-----|-------|
| `--brand-blue` | `#2563EB` | Electric Blue — Primary |
| `--brand-navy` | `#0F172A` | Deep Navy — Headings |
| `--brand-gray` | `#F8FAFC` | Soft Gray — Backgrounds |
| `--brand-lime` | `#A3E635` | Lime Green — Growth accent |
| `--brand-slate` | `#64748B` | Slate Gray — Secondary text |

### Typography

- **Arabic primary**: Readex Pro (modern, clean, designed for screens)
- **Arabic fallbacks**: Tajawal, IBM Plex Sans Arabic
- **Latin headings**: Plus Jakarta Sans
- **Latin body**: Inter
- **Mono**: Geist Mono

### Logo

The GARFIX logo is a **Wordmark + G mark** combination, drawn as inline SVG in `src/components/site/logo.tsx`:

- **G mark**: A stylized "G" letter with an embedded upward arrow (signaling growth)
- **Wordmark**: "GARFIX" in Plus Jakarta Sans Bold + ".io" in Electric Blue
- **Variant**: `mark` (G mark only) or `full` (Wordmark + G mark)

```tsx
import { GarfixLogo } from "@/components/site/logo";

<GarfixLogo />              // Full logo
<GarfixLogo variant="mark" />  // G mark only
```

### Spacing & Radius

- Base radius: `0.75rem` (12px)
- Cards: `rounded-2xl` (1rem) or `rounded-3xl` (1.5rem)
- Buttons: `rounded-full` for CTAs, `rounded-lg` for forms
- Section spacing: `py-20 sm:py-28`

---

## 🌍 Internationalization (i18n)

The app is **fully bilingual** (Arabic / English) with RTL/LTR switching.

### Architecture

All copy lives in `src/lib/i18n.ts` as a nested dictionary:

```typescript
export const dict = {
  ar: { /* Arabic strings */ },
  en: { /* English strings */ },
};
```

The `useDict()` hook returns the current locale's dictionary and re-renders on locale change:

```tsx
import { useDict } from "@/lib/store";

function MyComponent() {
  const t = useDict();
  return <h1>{t.hero.title1}</h1>;
}
```

### Language toggle

The header includes a globe button that toggles between AR/EN. The `<html lang dir>` attributes are updated via `LocaleProvider`.

### Default

Arabic is the default locale (MENA focus). The `<html>` tag starts as `<html lang="ar" dir="rtl">`.

---

## 🛣 Roadmap

### Done ✅

- [x] Marketing site (Hero, Stats, Value Prop, Services, Pricing Tiers, Comparison, Testimonials, Pricing Calc, How, FAQ, CTA)
- [x] 7 footer pages (About, Contact, Privacy, Terms, Services detail, Pricing detail, How detail)
- [x] Client dashboard (Overview, Landing Builder, Ad Writer, FB Library, Order → Invoice, ERP Link)
- [x] Founder panel (client management, ERP URL editor, login link generator)
- [x] Token-based auto-login
- [x] Bilingual AR/EN with RTL/LTR
- [x] Brand system (colors, fonts, logo)

### Next 🚧

- [ ] **Real Garfix ERP** (separate deployment per client with shared codebase)
- [ ] Server-side authentication (NextAuth.js)
- [ ] Real Facebook Marketing API integration
- [ ] Real AI ad copy generation (z-ai-web-dev-sdk or OpenAI)
- [ ] Server-side persistence (Prisma + PostgreSQL)
- [ ] Invoice PDF export
- [ ] Email notifications
- [ ] Multi-team permissions
- [ ] Mobile app

---

## 📄 License

**Commercial** — All rights reserved by Garfix.io.

This repository is the source for the Garfix.io platform. Deployment is allowed for authorized clients per their contract terms. See the [Terms & Conditions](#) page in the app for the full legal framework.

---

## 👥 Authors

- **Ahmed Ezzat Elsayad** — [ahmedezzatelsayad](https://github.com/ahmedezzatelsayad)

---

## 🙏 Acknowledgments

- Brand identity defined in the **Garfix.io Brand Book v1.0** (September 2026)
- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/) (Readex Pro, Plus Jakarta Sans, Inter, Tajawal, IBM Plex Sans Arabic)

---

<p align="center">
  <strong>Grow. Manage. Scale.</strong><br>
  <em>كبّر… نظّم… وسّع نشاطك</em>
</p>
