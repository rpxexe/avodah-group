"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Database, Landmark, ArrowRight } from "lucide-react";
import Card3DTilt from "./Card3DTilt";
import { useTheme } from "@/context/ThemeContext";

export default function EcosystemSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const modules = [
    {
      tag: "DIGITAL PROPERTY PORTAL",
      status: "ACTIVE DEPLOYMENT",
      icon: Cpu,
      title: "Modern Discovery Destination",
      desc: "A high-precision digital portal for property discovery, rich spatial profiles, and verified direct enquiries for premium developments.",
    },
    {
      tag: "DEVELOPER EXECUTION LAYER",
      status: "INTEGRATED",
      icon: Database,
      title: "Mandate Sales & CRM Engine",
      desc: "Connecting lead intelligence, broker channel distribution, and real-time inventory management to accelerate project cash flow.",
    },
    {
      tag: "FINTECH & INTELLIGENCE",
      status: "IN DEVELOPMENT",
      icon: Landmark,
      title: "Building Smarter Financial Models",
      desc: "Developing tools that merge valuation intelligence, capital structure assessment, and transaction automation for commercial real estate.",
    },
  ];

  return (
    <section
      id="ecosystem"
      className={`py-24 sm:py-36 relative z-10 border-b border-[var(--theme-border)] overflow-hidden transition-colors duration-300 ${
        isLight
          ? "bg-gradient-to-b from-[#F6F4EE] via-[#ECE8DF] to-[#F6F4EE]"
          : "bg-gradient-to-b from-[#141513] via-[#0b1815] to-[#122622]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold">
                OUR CONNECTED ECOSYSTEM
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-6 tracking-tight">
              One ecosystem, connected intelligence.
            </h2>

            {/* Stylized Quote Callout */}
            <div className="border-l-2 border-[var(--theme-accent)] pl-6 my-6">
              <p className="font-serif italic text-xl sm:text-2xl text-[var(--theme-text)] leading-snug">
                &ldquo;From property discovery to conversion, our connected capabilities bring intelligence, relationships and execution together.&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light mb-8">
              From property discovery to conversion, our connected capabilities bring intelligence, relationships and execution together. We combine real estate expertise with technology to make buying, selling and investing in property simpler, smarter and more transparent.
            </p>

            <div>
              <Link
                href="/proptech"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.18em] uppercase rounded-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[var(--theme-accent)]/20 cursor-pointer"
              >
                <span>EXPLORE OUR ECOSYSTEM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right 3D Modules Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {modules.map((mod, idx) => {
              const IconComp = mod.icon;
              return (
                <motion.div
                  key={mod.tag}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                >
                  <Card3DTilt intensity={8}>
                    <div className="p-8 rounded-sm bg-[var(--theme-surface-glass)] backdrop-blur-xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300 shadow-[var(--theme-card-shadow)] group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[var(--theme-accent)]/10 rounded-sm text-[var(--theme-accent)]">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--theme-accent)] uppercase">
                            {mod.tag}
                          </span>
                        </div>
                        <span className="text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] rounded-sm">
                          {mod.status}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[var(--theme-text)] font-normal mb-2">
                        {mod.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed font-light">
                        {mod.desc}
                      </p>
                    </div>
                  </Card3DTilt>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
