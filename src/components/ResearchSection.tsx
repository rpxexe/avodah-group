"use client";

import React from "react";
import { motion } from "framer-motion";
import Card3DTilt from "./Card3DTilt";

export default function ResearchSection() {
  const reports = [
    {
      category: "MANDATE STRATEGY",
      title: "When Should You Appoint a Sole Selling Partner?",
      summary:
        "Evaluating project scale, debt-servicing schedules, and competitive micro-market inventory to determine optimal sales mandate appointment timelines.",
      meta: "AVODAH RESEARCH BRIEF • MUMBAI RESIDENTIAL",
    },
    {
      category: "COMMERCIAL DYNAMICS",
      title: "Navigating Corporate Occupier Lease Transitions",
      summary:
        "How Grade-A office occupiers in BKC, Lower Parel, and Andheri East are restructuring floor-plate efficiencies amidst evolving corporate spatial needs.",
      meta: "COMMERCIAL LEASING DESK • QUARTERLY REPORT",
    },
    {
      category: "CAPITAL ALLOCATION",
      title: "Real Estate Portfolio Rebalancing in High-Demand Corridors",
      summary:
        "Strategic analysis on repurposing legacy holdings and redeploying liquidity into high-velocity commercial and institutional warehousing hubs.",
      meta: "PORTFOLIO ADVISORY GROUP • SPECIAL REPORT",
    },
  ];

  return (
    <section id="research" className="py-24 sm:py-36 bg-[var(--theme-bg)] text-[var(--theme-text)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-bold block mb-3">
            Domain Research
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-5 tracking-tight">
            Make better real estate decisions with better information.
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light">
            Real estate decisions require more than market knowledge. They require an acute understanding of location dynamics, demographic shifts, absorption trends, and asset quality.
          </p>
        </motion.div>

        {/* 3 Research Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report, idx) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
              className="h-full"
            >
              <Card3DTilt intensity={10} className="h-full">
                <div className="h-full flex flex-col justify-between p-8 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] shadow-[var(--theme-card-shadow)] hover:shadow-[var(--theme-shadow)] transition-all duration-300">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--theme-accent)] uppercase block mb-3">
                      {report.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--theme-text)] font-normal leading-snug mb-4">
                      {report.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed font-light mb-8">
                      {report.summary}
                    </p>
                  </div>

                  <div className="border-t border-[var(--theme-border)] pt-4">
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--theme-text-muted)] font-semibold block">
                      {report.meta}
                    </span>
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
