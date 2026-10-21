"use client";

import React from "react";

export default function MarqueeStrip() {
  const items = [
    "MUMBAI METROPOLITAN REGION",
    "STRUCTURED SOLE SELLING MANDATES",
    "COMMERCIAL LEASING ADVISORY",
    "20+ YEARS DOMAIN HERITAGE",
    "PROPTECH ECOSYSTEM INNOVATION",
    "STRATEGIC CAPITAL & PORTFOLIO AUDITS",
    "REAL ESTATE MARKET INTELLIGENCE",
  ];

  return (
    <div className="w-full bg-[var(--theme-surface)] border-y border-[var(--theme-border)] py-5 overflow-hidden select-none relative z-10 transition-colors duration-300">
      <div className="animate-marquee flex items-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-xs font-bold tracking-[0.22em] text-[var(--theme-text)] opacity-75 uppercase hover:opacity-100 transition-opacity">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          </div>
        ))}
        {/* Duplicate for infinite seamless loop */}
        {items.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-xs font-bold tracking-[0.22em] text-[var(--theme-text)] opacity-75 uppercase hover:opacity-100 transition-opacity">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
