"use client";

import { Facebook, Instagram, Mail, MessageCircle, Lock } from "lucide-react";
import { GarfixLogo } from "./logo";
import { useApp, useDict } from "@/lib/store";
import type { View } from "@/lib/store";

export function Footer() {
  const t = useDict();
  const setView = useApp((s) => s.setView);

  const goTo = (v: View) => (e: React.MouseEvent) => {
    e.preventDefault();
    setView(v);
  };

  return (
    <footer className="bg-[#0F172A] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <GarfixLogo variant="full" className="[&_span]:text-white" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-md">
              {t.footer.desc}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
              <span className="text-xs text-white/80">{t.footer.edition}</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="mailto:hello@garfix.io" label="Email"><Mail className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://wa.me/201000000000" label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialIcon>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <FooterColumn title={t.footer.sections.services}>
              <FooterLink onClick={goTo("services-detail")}>{t.footer.links.servicesDetail}</FooterLink>
              <FooterLink onClick={goTo("pricing-detail")}>{t.footer.links.pricingDetail}</FooterLink>
              <FooterLink onClick={goTo("how-detail")}>{t.footer.links.howDetail}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t.footer.sections.company}>
              <FooterLink onClick={goTo("about")}>{t.footer.links.about}</FooterLink>
              <FooterLink onClick={goTo("contact")}>{t.footer.links.contact}</FooterLink>
              <FooterLink onClick={goTo("founder")}>{t.footer.links.founder}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t.footer.sections.legal}>
              <FooterLink onClick={goTo("privacy")}>{t.footer.links.privacy}</FooterLink>
              <FooterLink onClick={goTo("terms")}>{t.footer.links.terms}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t.footer.sections.resources}>
              <FooterLink onClick={goTo("about")}>{t.footer.links.about}</FooterLink>
              <FooterLink onClick={goTo("contact")}>{t.footer.links.contact}</FooterLink>
              <FooterLink onClick={goTo("founder")}>{t.footer.links.founder}</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-xs text-white/50">{t.footer.rights}</p>
            <button
              onClick={goTo("founder")}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#A3E635] transition-colors"
              aria-label={t.footer.founderHint}
            >
              <Lock className="h-3 w-3" />
              {t.footer.founderHint}
            </button>
          </div>
          <p className="font-display text-sm font-bold tracking-tight text-white/80">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ onClick, children }: { onClick: (e: React.MouseEvent) => void; children: React.ReactNode }) {
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className="text-sm text-white/60 hover:text-white transition-colors"
      >
        {children}
      </a>
    </li>
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
