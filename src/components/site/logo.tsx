"use client";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  showDomain?: boolean;
};

/**
 * Garfix.io logo — Wordmark + G mark.
 * Per Brand Book page 5 spec.
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
        {showDomain && <span className="text-[#2563EB] font-bold">.io</span>}
      </span>
    </div>
  );
}

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
      <rect x="0" y="0" width="32" height="32" rx="9" fill="url(#garfix-gradient)" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <path
        d="M22.5 11.5C21 9.5 18.5 8 16 8C11.6 8 8 11.6 8 16C8 20.4 11.6 24 16 24C19.5 24 22.5 21.7 23.5 18.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M16 14.5H24" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
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
