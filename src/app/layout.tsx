import type { Metadata } from "metadata";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Plus_Jakarta_Sans,
  Inter,
  Tajawal,
  IBM_Plex_Sans_Arabic,
  Readex_Pro,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/components/site/locale-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Primary modern Arabic font
const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Garfix.io — Grow. Manage. Scale.",
  description:
    "منصة Garfix.io — أعلن بذكاء، أنشئ لاندنج بيج، اكتب إعلاناتك، ابحث في Facebook Ads Library، وأدر شغلك من Garfix ERP. كل ده في مكان واحد.",
  keywords: [
    "Garfix",
    "Garfix.io",
    "وكالة إعلانات",
    "ERP",
    "إدارة الحملات الإعلانية",
    "بناء لاندنج بيج",
    "Facebook Ads Library",
    "كتابة الإعلانات",
  ],
  authors: [{ name: "Garfix.io" }],
  openGraph: {
    title: "Garfix.io — Grow. Manage. Scale.",
    description:
      "منصة واحدة لإدارة إعلاناتك وبناء لاندنج بيج وكتابة الإعلانات والوصول لـ Garfix ERP.",
    siteName: "Garfix.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garfix.io — Grow. Manage. Scale.",
    description: "منصة واحدة لإدارة إعلاناتك وبناء لاندنج بيج والوصول لـ Garfix ERP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${inter.variable} ${readexPro.variable} ${tajawal.variable} ${ibmPlexArabic.variable} antialiased bg-background text-foreground`}
      >
        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
