import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans, Inter, Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
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
    "Garfix.io is a digital world that combines an advertising agency with a smart platform to manage advertising campaigns, sales, inventory, and operations — with free ERP for clients committed to monthly advertising.",
  keywords: [
    "Garfix",
    "Garfix.io",
    "advertising agency",
    "ERP",
    "campaign management",
    "Facebook ads",
    "Instagram ads",
    "digital marketing",
    "ووكالة إعلانات",
    "إدارة الحملات الإعلانية",
    "ERP مجاني",
  ],
  authors: [{ name: "Garfix.io" }],
  openGraph: {
    title: "Garfix.io — Grow. Manage. Scale.",
    description:
      "Smart advertising agency + free ERP for committed clients. Manage Facebook & Instagram campaigns, sales, inventory, and operations in one place.",
    siteName: "Garfix.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garfix.io — Grow. Manage. Scale.",
    description: "Smart advertising agency + free ERP for committed clients.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${inter.variable} ${tajawal.variable} ${ibmPlexArabic.variable} antialiased bg-background text-foreground`}
      >
        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
