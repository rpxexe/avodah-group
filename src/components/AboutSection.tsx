"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Card3DTilt from "./Card3DTilt";
import { Building2, Cpu, Crosshair, BarChart3 } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Real-estate first",
      desc: "Products and workflows designed around property businesses.",
      icon: Building2,
    },
    {
      num: "02",
      title: "Technology-led",
      desc: "Modern digital experiences, automation and AI.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Execution focused",
      desc: "Technology paired with hands-on sales and mandate capabilities.",
      icon: Crosshair,
    },
    {
      num: "04",
      title: "Data connected",
      desc: "Performance visibility across the customer and sales journey.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-36 bg-[var(--theme-bg)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold">
                  WHY AVODAH
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-[1.14] mb-4 tracking-tight">
                Technology grounded in real estate execution.
              </h2>

              <p className="text-base sm:text-lg text-[var(--theme-text-muted)] leading-relaxed font-light mb-10">
                Built to bridge technology and real estate execution.
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--theme-border)]">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.num}
                      className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-sm hover:border-[var(--theme-accent)]/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">
                          {pillar.num}
                        </span>
                        <div className="p-2 rounded-lg bg-[var(--theme-tag-bg)] text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-serif text-lg text-[var(--theme-text)] font-medium mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[var(--theme-border)] mt-8">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-[var(--theme-accent)] font-normal mb-1">
                  20+
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-medium">
                  Years Real Estate
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-[var(--theme-accent)] font-normal mb-1">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-medium">
                  Accountability Model
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-[var(--theme-accent)] font-normal mb-1">
                  Cat A &amp; B
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-medium">
                  Developer Mandates
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl text-[var(--theme-accent)] font-normal mb-1">
                  End-to-End
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-medium">
                  Connected Intelligence
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column (Interactive 3D Tilt Card - Vertical Full Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 h-full flex flex-col min-h-[500px]"
          >
            <Card3DTilt intensity={12} className="h-full w-full flex-1 flex flex-col">
              <div
                className="relative w-full h-full min-h-[500px] rounded-sm overflow-hidden border border-[var(--theme-border)] shadow-[var(--theme-shadow)] group flex flex-col justify-end"
                style={{ position: "relative", width: "100%", height: "100%", minHeight: "500px" }}
              >
                <Image
                  src="/assets/building.jpg"
                  alt="Contemporary luxury architecture project in Mumbai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Floating Architectural Badge */}
                <div
                  style={{ transform: "translateZ(30px)" }}
                  className="relative m-6 p-6 bg-[var(--theme-surface-glass)] backdrop-blur-md border border-[var(--theme-border)] rounded-sm shadow-xl z-10"
                >
                  <h3 className="font-serif text-xl text-[var(--theme-text)] mb-1">Mumbai Focus</h3>
                  <p className="text-xs text-[var(--theme-text)] opacity-80 leading-relaxed font-light">
                    Deep-rooted relationships with institutional developers and micro-market intelligence across the Mumbai Metropolitan Region.
                  </p>
                </div>
              </div>
            </Card3DTilt>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
