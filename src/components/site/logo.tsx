"use client";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  showDomain?: boolean;
};

/**
 * Garfix.io logo — Wordmark + G mark.
 *
 * Design follows the Brand Book page 5 spec:
 *  - G mark = "G" letter with an upward arrow stroke (signals growth).
 *  - Wordmark = "GARFIX" in Plus Jakarta Sans Bold, ".io" in muted slate.
 *  - Primary color: Electric Blue (#2563EB).
 *  - Accent: Lime Green (#A3E635) on the growth arrow tip.
 *
 * The logo is fully vector — scales from 16px favicons to large hero displays
 * without losing sharpness. Works on both light and dark backgrounds.
 */
export function GarfixLogo({ variant = "full", className, showDomain = true }: LogoProps) {
  if (variant === "mark") {
    return <GMark className={className} />;
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <GMark className="h-7 w-7" />
      <span className="font-display font-extrabold tracking-tight text-[#0F172A] text-xl leading-none">
        GARFIX
        {showDomain && (
          <span className="text-[#2563EB] font-bold">.io</span>
        )}
      </span>
    </div>
  );
}

/**
 * The G mark — a stylized "G" with an embedded upward arrow.
 *
 * Geometry:
 *  - 32x32 viewBox with rounded outer form.
 *  - The "G" stroke is built from a 6px-thick arc with rounded caps.
 *  - The arrow tip is a separate path in Lime Green, sitting at the top-right
 *    of the G's opening, signaling growth (per Brand Book spec #1:
 *    "G — engineering stroke containing an upward-pointing arrow").
 */
export function GMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      role="img"
      aria-label="Garfix G mark"
    >
      {/* Soft rounded square background */}
      <rect
        x="0"
        y="0"
        width="32"
        height="32"
        rx="9"
        fill="url(#garfix-gradient)"
      />
      {/* Inner highlight ring for depth */}
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      {/* The G arc — three-quarter circle */}
      <path
        d="M22.5 11.5C21 9.5 18.5 8 16 8C11.6 8 8 11.6 8 16C8 20.4 11.6 24 16 24C19.5 24 22.5 21.7 23.5 18.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* The horizontal bar that closes the G + arrow tip */}
      <path
        d="M16 14.5H24"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Upward arrow tip — Lime Green, signaling growth */}
      <path
        d="M22.2 12.5L24.5 14.5L22.2 16.5"
        stroke="#A3E635"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient
          id="garfix-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Standalone G mark for the footer or favicon.
 */
export function GarfixMarkOnly({ className }: { className?: string }) {
  return <GMark className={className} />;
}
