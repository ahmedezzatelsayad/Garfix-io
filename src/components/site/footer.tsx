"use client";

import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { GarfixLogo } from "./logo";
import { useDict } from "@/lib/locale-store";

export function Footer() {
  const t = useDict();

  return (
    <footer className="bg-[#0F172A] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <GarfixLogo
                variant="full"
                className="[&_span]:text-white"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-md">
              {t.footer.desc}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-xs text-white/80">{t.footer.edition}</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="mailto:hello@garfix.io" label="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://wa.me/201000000000" label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {t.footer.sections.map((section, si) => (
              <div key={si}>
                <h3 className="font-display text-sm font-bold text-white mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((l, li) => (
                    <li key={li}>
                      <a
                        href="#"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/50">{t.footer.rights}</p>
          <p className="font-display text-sm font-bold tracking-tight text-white/80">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors"
    >
      {children}
    </a>
  );
}
