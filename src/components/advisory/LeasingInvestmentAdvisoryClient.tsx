"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Plus,
  Minus,
  Building2,
  TrendingUp,
  PieChart,
  LineChart,
  Briefcase,
  Users2,
  Landmark,
  ShieldCheck,
  Check,
  Search,
  CheckSquare,
  BadgeCheck,
  Compass
} from "lucide-react";
import WobblyCard from "@/components/WobblyCard";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  expandedPoints: string[];
}

const ADVISORY_SERVICES: ServiceItem[] = [
  {
    id: "leasing",
    num: "01",
    title: "Leasing Advisory",
    shortDesc: "Helping occupiers and property owners navigate commercial leasing opportunities with greater clarity.",
    expandedPoints: [
      "Tenant space acquisition across Grade-A office parks, IT corridors, and CBD locations.",
      "Lease restructuring, renewals, rent reviews, and bespoke tenancy terms negotiation.",
      "Developer tenant-mix curation and anchor occupier onboarding for premium commercial towers.",
      "Cost-benefit lease analysis, fit-out amortization modeling, and exit flexibility clauses.",
    ],
  },
  {
    id: "investment",
    num: "02",
    title: "Investment Advisory",
    shortDesc: "Identifying and evaluating real estate opportunities aligned with investment objectives.",
    expandedPoints: [
      "Commercial asset underwriting, capitalization rate benchmarking, and cash flow forecasting.",
      "Structured pre-leased office asset acquisitions offering defensive rental yields.",
      "Institutional deal structuring, co-investment frameworks, and developer equity placement.",
      "Detailed technical, title, municipal, and commercial lease due diligence oversight.",
    ],
  },
  {
    id: "portfolio",
    num: "03",
    title: "Portfolio Advisory",
    shortDesc: "Helping clients understand and optimize their existing real estate portfolios.",
    expandedPoints: [
      "Portfolio rationalization, asset rebalancing, and strategic capital reallocation.",
      "Occupier space footprint consolidation and hybrid workplace space utilization audits.",
      "Lease expiry risk management, mitigating rollover vacancy and lease renewal cliffs.",
      "Capex planning, ESG asset enhancements, and long-term asset repositioning roadmap.",
    ],
  },
  {
    id: "intelligence",
    num: "04",
    title: "Market Intelligence",
    shortDesc: "Turning real estate data into actionable insights.",
    expandedPoints: [
      "Micro-market rental benchmarks, pricing velocity, and historical yield analysis.",
      "Supply pipeline mapping, impending absorption dynamics, and vacancy rate projections.",
      "Infrastructure impact analysis: metro line expansion, arterial bridges, and coastal road corridors.",
      "Tenant covenant health assessment, credit evaluation, and industry absorption trends.",
    ],
  },
];

export default function LeasingInvestmentAdvisoryClient() {
  const [expandedService, setExpandedService] = useState<string | null>("leasing");

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="relative z-25 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--theme-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-text-muted)]">SERVICES</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-accent)] font-semibold uppercase">LEASING &amp; INVESTMENT ADVISORY</span>
        </div>

        {/* HERO SECTION */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-surface-glass)] border border-[var(--theme-border-accent)] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
                AVODAH &amp; KHEN • CAPITAL &amp; ASSET ADVISORY
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[var(--theme-text)] leading-[1.12] mb-6">
              Leasing &amp; Investment Advisory
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--theme-accent)] font-light mb-6">
              Strategic real estate decisions, backed by market intelligence.
            </p>

            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed mb-8 max-w-3xl">
              We help businesses, investors and property owners make informed real estate decisions across leasing, investment and portfolio opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss Your Requirement</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Explore Advisory Capabilities
              </Link>
            </div>
          </div>

          {/* Hero Feature Showcase Banner with Grade-A Commercial Tower Image */}
          <div className="relative rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-2xl">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black/40">
              <Image
                src="/assets/advisory/commercial-grade-a-tower.jpg"
                alt="Prime Grade-A Commercial Office Tower in Bandra Kurla Complex Mumbai"
                fill
                priority
                className="object-cover object-center brightness-95"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Bottom Proof Metrics Overlay */}
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--theme-accent)] font-semibold block mb-1">
                    COMMERCIAL &amp; INVESTMENT BENCHMARKS
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light">
                    Institutional Advisory. Clear Strategic Action.
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shrink-0">
                  <div>
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      Grade-A
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Prime Assets
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      ₹2,500+ Cr
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Transaction Track
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      100%
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Data-Led Insight
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: STRATEGIC REAL ESTATE ADVISORY */}
        <section className="mb-24 sm:mb-32">
          <div className="p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-xl">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              STRATEGIC REAL ESTATE ADVISORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-6">
              Making every property decision more informed.
            </h2>
            <div className="space-y-4 max-w-4xl text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed">
              <p>
                Real estate decisions require more than market knowledge. They require a clear understanding of location, demand, pricing, asset quality, market dynamics and long-term objectives.
              </p>
              <p className="border-l-2 border-[var(--theme-accent)] pl-4 text-[var(--theme-text)] italic">
                Our Leasing &amp; Investment Advisory services combine market intelligence, transaction expertise and strategic analysis to help clients identify the right opportunities and make confident decisions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR ADVISORY SERVICES */}
        <section id="services" className="mb-24 sm:mb-32 scroll-mt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[var(--theme-border)] pb-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                OUR ADVISORY SERVICES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
                Expertise designed around your real estate objectives.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light max-w-md">
              Specialized commercial and capital frameworks built for corporate occupiers, institutional investors, and property owners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Investment Advisory Lounge Image */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-xl sticky top-28">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[560px] w-full overflow-hidden bg-black/40">
                <Image
                  src="/assets/advisory/investment-advisory-lounge.jpg"
                  alt="Avodah & Khen Executive Investment Advisory Boardroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold block mb-1">
                    PORTFOLIO &amp; UNDERWRITING
                  </span>
                  <p className="text-xs font-light text-white/90">
                    Collaborating with corporate treasuries, developers, and private wealth to execute disciplined real estate transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 4 Interactive Show More + Drawers */}
            <div className="lg:col-span-7 space-y-4">
              {ADVISORY_SERVICES.map((srv) => {
                const isOpen = expandedService === srv.id;
                return (
                  <div
                    key={srv.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] shadow-lg"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 hover:border-[var(--theme-accent)]/50"
                    }`}
                  >
                    <button
                      onClick={() => toggleService(srv.id)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--theme-tag-bg)] text-[var(--theme-accent)] border border-[var(--theme-tag-border)] mt-0.5">
                          {srv.num}
                        </span>
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl font-light text-[var(--theme-text)] mb-1">
                            {srv.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                            {srv.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--theme-accent)] flex items-center gap-1.5 shrink-0 mt-1">
                        <span>{isOpen ? "Show Less" : "Show More +"}</span>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 pt-2 border-t border-[var(--theme-border)]/50 overflow-hidden"
                        >
                          <div className="space-y-2.5 mt-2">
                            {srv.expandedPoints.map((point, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR APPROACH */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              OUR APPROACH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              From market insight to informed action.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              A disciplined, structured 5-stage advisory journey engineered for clarity and execution certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                name: "Understand",
                desc: "We begin by understanding your business objectives, investment goals, location requirements and commercial priorities.",
                icon: Compass,
              },
              {
                step: "02",
                name: "Analyse",
                desc: "We evaluate relevant market conditions, properties, pricing, demand and potential opportunities.",
                icon: Search,
              },
              {
                step: "03",
                name: "Identify",
                desc: "We shortlist opportunities that align with your requirements and strategic objectives.",
                icon: CheckSquare,
              },
              {
                step: "04",
                name: "Advise",
                desc: "We provide clear, data-backed recommendations to support decision-making.",
                icon: BadgeCheck,
              },
              {
                step: "05",
                name: "Execute",
                desc: "We support the transaction process through negotiation, coordination and closure.",
                icon: ShieldCheck,
              },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">
                        STAGE {st.step}
                      </span>
                      <Icon className="w-4 h-4 text-[var(--theme-text-muted)]" />
                    </div>
                    <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                      {st.name}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/40 text-[10px] font-mono text-[var(--theme-accent)]">
                    PHASE 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: WHY AVODAH & KHEN */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              WHY AVODAH &amp; KHEN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Intelligence that supports better real estate decisions.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              Combining institutional depth with agile on-ground market mastery across Mumbai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                id: "01",
                title: "Market Understanding",
                desc: "Deep understanding of real estate markets, locations and emerging opportunities.",
                icon: Building2,
              },
              {
                id: "02",
                title: "Data-Led Analysis",
                desc: "Market intelligence and structured analysis to support commercial decisions.",
                icon: LineChart,
              },
              {
                id: "03",
                title: "Strategic Perspective",
                desc: "We look beyond individual transactions to understand the wider business and investment objective.",
                icon: PieChart,
              },
              {
                id: "04",
                title: "End-to-End Support",
                desc: "From identifying an opportunity to supporting negotiations and execution.",
                icon: TrendingUp,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-2xl font-light text-[var(--theme-accent)]">
                        {pillar.id}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/50 text-[10px] font-mono text-[var(--theme-accent)]">
                    CORE ADVANTAGE
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: WHO WE WORK WITH (WOBBLY CARD PHYSICS) */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              WHO WE WORK WITH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Advisory built for different real estate needs.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              Tailored advisory frameworks that match the unique underwriting criteria of diverse market participants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Businesses & Occupiers",
                desc: "Finding the right commercial space to support business growth.",
                icon: Briefcase,
              },
              {
                title: "Property Owners & Developers",
                desc: "Improving leasing outcomes and identifying the right occupier opportunities.",
                icon: Building2,
              },
              {
                title: "Investors",
                desc: "Evaluating opportunities and making informed investment decisions.",
                icon: Landmark,
              },
              {
                title: "Institutional & Corporate Clients",
                desc: "Supporting strategic real estate requirements and portfolio decisions.",
                icon: Users2,
              },
            ].map((client, idx) => {
              const Icon = client.icon;
              return (
                <WobblyCard key={idx} wobbleIntensity={5} className="h-full">
                  <div className="p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)] mb-6 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                        {client.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                        {client.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--theme-accent)]">
                      <span>SEGMENT 0{idx + 1}</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </WobblyCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: LET'S WORK TOGETHER (CLOSING CTA) */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              LET&apos;S WORK TOGETHER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Have a real estate decision to make?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-8">
              Whether you are looking to lease, invest, reposition or expand, our advisory team can help you evaluate the opportunity with greater clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="w-full sm:w-auto px-8 py-4 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Explore Market Research
              </Link>
            </div>

            <div className="pt-6 border-t border-[var(--theme-border)]/50">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold">
                LEASING • INVESTMENT • PORTFOLIO • MARKET INTELLIGENCE
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
