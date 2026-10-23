"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  Building2,
  Users,
  TrendingUp,
  Workflow,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

interface CapabilityItem {
  id: string;
  tag: string;
  action: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    tag: "PROPERTY PORTAL",
    action: "Discover",
    title: "Property Portal",
    desc: "Discover properties and explore real estate opportunities across high-velocity micro-markets.",
    icon: Compass,
    href: "/proptech",
  },
  {
    id: "02",
    tag: "AI + DATA",
    action: "Understand",
    title: "AI + Data Intelligence",
    desc: "Turn property data into meaningful insights and informed decisions with algorithmic underwriting.",
    icon: Sparkles,
    href: "/research",
  },
  {
    id: "03",
    tag: "MANDATES",
    action: "Represent",
    title: "Sole Selling Mandates",
    desc: "Structure and represent real estate opportunities with sovereign pricing discipline and absorption speed.",
    icon: Building2,
    href: "/mandate",
  },
  {
    id: "04",
    tag: "CRM",
    action: "Manage",
    title: "High-Velocity CRM",
    desc: "Organize leads, relationships and customer journeys across institutional and retail channels.",
    icon: Users,
    href: "/proptech",
  },
  {
    id: "05",
    tag: "SALES",
    action: "Convert",
    title: "Sales Execution",
    desc: "Move qualified opportunities through the sales pipeline with on-ground conversion leadership.",
    icon: TrendingUp,
    href: "/mandate",
  },
  {
    id: "06",
    tag: "AUTOMATION",
    action: "Optimize",
    title: "Connected Automation",
    desc: "Streamline repetitive tasks and connected workflows from lead qualification to transaction closing.",
    icon: Workflow,
    href: "/fintech",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 sm:py-36 bg-[var(--theme-bg-secondary)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300"
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
              CORE CAPABILITIES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-5 tracking-tight">
            Expertise designed around your real estate objectives.
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light">
            Our connected capabilities combine market intelligence, transaction expertise, and modern technology to make buying, selling and investing in property simpler, smarter and more transparent.
          </p>
        </motion.div>

        {/* 6 Capabilities Grid with 3D Tilt Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className="h-full"
              >
                <Card3DTilt intensity={12} className="h-full">
                  <div className="h-full flex flex-col justify-between p-8 rounded-2xl bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300 relative group shadow-[var(--theme-card-shadow)] hover:shadow-xl hover:-translate-y-1">
                    {/* Top subtle golden highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--theme-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                    <div>
                      {/* Top Header Row with Icon and Action Tag */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 rounded-xl bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] text-[var(--theme-accent)] shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 font-semibold">
                          {cap.action}
                        </span>
                      </div>

                      {/* Tag & Title */}
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-[var(--theme-accent)] uppercase block mb-1.5">
                        {cap.tag}
                      </span>
                      <h3 className="font-serif text-2xl text-[var(--theme-text)] font-normal leading-snug mb-3 group-hover:text-[var(--theme-accent)] transition-colors">
                        {cap.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[var(--theme-text-muted)] leading-relaxed font-light mb-6">
                        {cap.desc}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="pt-4 border-t border-[var(--theme-border)]/60 flex items-center justify-between">
                      <Link
                        href={cap.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[var(--theme-accent)] hover:underline transition-all group/link"
                      >
                        <span>Learn More</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)] opacity-60">
                        {cap.id} / 06
                      </span>
                    </div>
                  </div>
                </Card3DTilt>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA: Discover Our Capabilities */}
        <div className="text-center">
          <Link
            href="/mandate"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[var(--theme-accent)]/20 cursor-pointer"
          >
            <span>DISCOVER OUR CAPABILITIES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
