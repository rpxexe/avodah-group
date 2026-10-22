"use client";

import React from "react";
import { motion } from "framer-motion";

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

  // Quadruple items to guarantee a continuous, unbroken ticker across all monitor sizes & viewports
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-label="Avodah Khen Focus Areas"
      className="w-full bg-[var(--theme-surface)] border-y border-[var(--theme-border)] py-4 sm:py-5 overflow-hidden select-none relative z-10 transition-colors duration-300"
    >
      {/* Specular Edge Gradient Masks for luxury fade-in/fade-out */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[var(--theme-surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[var(--theme-surface)] to-transparent z-10 pointer-events-none" />

      {/* Hardware-accelerated continuous infinite scroll */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
          className="flex items-center shrink-0"
        >
          {repeatedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 sm:gap-8 px-5 sm:px-7 whitespace-nowrap shrink-0"
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[var(--theme-text)] opacity-80 uppercase hover:opacity-100 transition-opacity">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

