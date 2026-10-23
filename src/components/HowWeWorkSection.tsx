"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck2,
  PenTool,
  Megaphone,
  Layers,
  CheckCircle,
  LineChart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";
import Link from "next/link";

interface WorkStep {
  step: string;
  stage: string;
  action: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: WorkStep[] = [
  {
    step: "01",
    stage: "ACQUIRE",
    action: "Acquire",
    description: "Mandate / inventory",
    icon: FileCheck2,
  },
  {
    step: "02",
    stage: "POSITION",
    action: "Position",
    description: "Strategy + content",
    icon: PenTool,
  },
  {
    step: "03",
    stage: "GENERATE",
    action: "Generate",
    description: "Marketing + demand",
    icon: Megaphone,
  },
  {
    step: "04",
    stage: "MANAGE",
    action: "Manage",
    description: "CRM + channels",
    icon: Layers,
  },
  {
    step: "05",
    stage: "CONVERT",
    action: "Convert",
    description: "Visits + sales",
    icon: CheckCircle,
  },
  {
    step: "06",
    stage: "LEARN",
    action: "Learn",
    description: "Data + optimization",
    icon: LineChart,
  },
];

export default function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="how-we-work"
      className="py-24 sm:py-36 bg-[var(--theme-bg)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold">
              HOW WE WORK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-4 tracking-tight">
            A repeatable model. Measurable outcomes.
          </h2>

          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light">
            From property acquisition to data-led optimization.
          </p>
        </motion.div>

        {/* 6 Steps Grid with Sequential Connecting Visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = activeStep === idx;
            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setActiveStep(idx)}
                className="h-full"
              >
                <Card3DTilt intensity={10} className="h-full">
                  <div
                    className={`h-full flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                      isCurrent
                        ? "border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] shadow-lg shadow-[var(--theme-accent)]/10 -translate-y-1"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 hover:border-[var(--theme-accent)]/60"
                    }`}
                  >
                    {/* Top Step Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">
                        {item.step}
                      </span>
                      <div className="p-2 rounded-lg bg-[var(--theme-tag-bg)] text-[var(--theme-accent)]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Step Title & Action */}
                    <div className="mb-4">
                      <span className="text-[10px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold block mb-1">
                        {item.stage}
                      </span>
                      <h3 className="font-serif text-xl text-[var(--theme-text)] font-light leading-snug mb-1.5">
                        {item.action}
                      </h3>
                      <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Active Step Indicator Pill */}
                    <div className="pt-3 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--theme-text-muted)]">
                      <span>PHASE {item.step}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCurrent
                            ? "bg-[var(--theme-accent)] animate-pulse"
                            : "bg-[var(--theme-border)]"
                        }`}
                      />
                    </div>
                  </div>
                </Card3DTilt>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] p-8 sm:p-10 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--theme-accent)]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[10px] font-mono tracking-widest text-[var(--theme-accent)] uppercase mb-2">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>END-TO-END EXECUTION LIFECYCLE</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)] tracking-tight">
              A CONNECTED JOURNEY. LASTING VALUE.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light mt-1 max-w-xl">
              From developer mandate onboarding and algorithmic positioning to sales pipeline conversion and post-launch analytics.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.16em] uppercase rounded-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--theme-accent)]/20 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
