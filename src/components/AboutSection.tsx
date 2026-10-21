"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Card3DTilt from "./Card3DTilt";

export default function AboutSection() {
  const stats = [
    { num: "20+", label: "Years Domain Expertise" },
    { num: "100%", label: "Accountability Mandate Model" },
    { num: "Cat A/B", label: "Developer Partnerships" },
    { num: "End-to-End", label: "Launch to Sell-Through" },
  ];

  return (
    <section id="about" className="py-24 sm:py-36 bg-[var(--theme-bg)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold">
                Firm Overview &amp; Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-[1.14] mb-6 tracking-tight">
              A connected real estate ecosystem integrating property, technology &amp; sales.
            </h2>

            <p className="text-base sm:text-lg text-[var(--theme-text)] opacity-85 leading-relaxed font-light mb-6">
              We bring together property, technology, sales, and data to create a seamless experience for developers, brokers, and buyers — all unified in one strategic platform.
            </p>

            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed mb-10">
              Launching and managing a real estate project is a major financial decision. Backed by over 20 years of experience in sales and brand mandates, Avodah &amp; Khen LLP supports premier developers across Mumbai with structured exclusive mandate management, institutional leasing advisory, and data-driven market intelligence.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[var(--theme-border)]">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-3xl sm:text-4xl text-[var(--theme-accent)] font-normal leading-none mb-2">
                    {stat.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)] font-medium leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Column (Interactive 3D Tilt Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5"
          >
            <Card3DTilt intensity={12}>
              <div className="relative aspect-[4/5] w-full min-h-[440px] rounded-sm overflow-hidden border border-[var(--theme-border)] shadow-[var(--theme-shadow)] group" style={{ position: "relative", width: "100%", minHeight: "440px", aspectRatio: "4/5" }}>
                <Image
                  src="/assets/building.jpg"
                  alt="Contemporary luxury architecture project in Mumbai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Architectural Badge */}
                <div
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute bottom-6 left-6 right-6 p-6 bg-[var(--theme-surface-glass)] backdrop-blur-md border border-[var(--theme-border)] rounded-sm shadow-xl"
                >
                  <h3 className="font-serif text-xl text-[var(--theme-text)] mb-1">Mumbai Focus</h3>
                  <p className="text-xs text-[var(--theme-text)] opacity-80 leading-relaxed font-light">
                    Deep rooted relationships with institutional developers and micro-market intelligence across the Mumbai Metropolitan Region.
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
