"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

interface ServiceItem {
  idx: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
  ctaText: string;
}

const SERVICES: ServiceItem[] = [
  {
    idx: "[ 01 ]",
    title: "Sole Selling Mandates",
    desc: "Structured sales and brand mandates for developers across Mumbai. A technology and execution layer from initial launch to complete sell-through.",
    image: "/assets/building.jpg",
    features: [
      "End-to-end sales team deployment",
      "Brand positioning & launch strategy",
      "Broker network orchestration",
      "Targeted sell-through velocity",
    ],
    ctaText: "Mandate Enquiry",
  },
  {
    idx: "[ 02 ]",
    title: "Commercial Leasing",
    desc: "Helping corporate occupiers and commercial property owners navigate leasing transactions with greater clarity, rigor, and economic efficiency.",
    image: "/assets/hero_building.jpg",
    features: [
      "Occupier representation & search",
      "Asset repositioning & marketing",
      "Lease tenure & rate negotiation",
      "Institutional space planning",
    ],
    ctaText: "Leasing Enquiry",
  },
  {
    idx: "[ 03 ]",
    title: "Investment Advisory",
    desc: "Identifying and evaluating prime real estate investment opportunities aligned with long-term capital preservation and target return metrics.",
    image: "/assets/building2.jpg",
    features: [
      "Asset underwriting & due diligence",
      "Commercial yield assessment",
      "Off-market acquisition sourcing",
      "Structured exit planning",
    ],
    ctaText: "Capital Advisory",
  },
  {
    idx: "[ 04 ]",
    title: "Portfolio Optimization",
    desc: "Helping clients understand, restructure, and optimize their existing property holdings to maximize operational performance and capital value.",
    image: "/assets/building3.jpg",
    features: [
      "Multi-asset portfolio audits",
      "Rental yield enhancement",
      "Repurposing & redevelopment review",
      "Ongoing asset performance metrics",
    ],
    ctaText: "Portfolio Audit",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-36 bg-[var(--theme-bg-secondary)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold block mb-3">
            Institutional Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-5 tracking-tight">
            Expertise designed around your real estate objectives.
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light">
            Our advisory services combine market intelligence, transaction expertise, and strategic analysis to help clients identify the right property opportunities.
          </p>
        </motion.div>

        {/* 4 Cards Grid with 3D Tilt Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="h-full"
            >
              <Card3DTilt intensity={14} className="h-full">
                <div className="h-full flex flex-col justify-between p-7 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300 relative group shadow-[var(--theme-card-shadow)]">
                  {/* Top highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--theme-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Thumbnail Image */}
                  <div className="w-full h-44 relative rounded-sm overflow-hidden mb-6 border border-[var(--theme-border)]" style={{ position: "relative", width: "100%", height: "176px", minHeight: "176px" }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] font-mono font-semibold tracking-widest text-[var(--theme-accent)] block mb-2">
                      {service.idx}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--theme-text)] font-normal leading-snug mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-light mb-6">
                      {service.desc}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-2 mb-8 pt-4 border-t border-[var(--theme-border)]">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-[11px] text-[var(--theme-text)] opacity-85 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--theme-accent)]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[var(--theme-accent)] hover:underline transition-colors group/link pt-2"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
