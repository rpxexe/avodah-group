"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  Compass,
  TrendingUp,
  Building2,
  Users,
  Target,
  Search,
  ArrowRight,
  Database,
  BarChart3,
  GitCompare,
  Lightbulb,
  Zap,
  CheckCircle2
} from "lucide-react";
import WobblyCard from "@/components/WobblyCard";

export default function ResearchClient() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [researchForm, setResearchForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    areaOfInterest: "Location Intelligence & Infrastructure",
  });
  const [isSubmittingResearch, setIsSubmittingResearch] = useState(false);
  const [researchRef, setResearchRef] = useState<string | null>(null);
  const [researchError, setResearchError] = useState<string | null>(null);

  const handleResearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchForm.fullName.trim() || !researchForm.email.trim()) {
      setResearchError("Please enter your full name and corporate email.");
      return;
    }
    setIsSubmittingResearch(true);
    setResearchError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: researchForm.fullName.trim(),
          email: researchForm.email.trim(),
          phone: researchForm.phone.trim() || "+91 99999 99999",
          service: "Investment Advisory",
          organization: "Market Research Desk",
          message: `Inquiry for Market Intelligence: ${researchForm.areaOfInterest}`,
          source: "research_intelligence",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.referenceCode) {
        throw new Error(data.error || "Failed to record inquiry in the database.");
      }

      setResearchRef(data.referenceCode);
      setInquirySent(true);
    } catch (err: unknown) {
      console.error("[RESEARCH_SUBMIT_ERROR]", err);
      setResearchError(err instanceof Error ? err.message : "Failed to record request. Please try again.");
    } finally {
      setIsSubmittingResearch(false);
    }
  };

  // What We Analyse (6 Pillars)
  const analysisPillars = [
    {
      idx: "01",
      icon: Compass,
      title: "Location Intelligence",
      description:
        "Understand micro-markets through pricing, infrastructure, connectivity, development activity and growth indicators.",
      metrics: ["Micro-Market Pricing", "Infrastructure Catalysts", "Catchment Demographics"],
    },
    {
      idx: "02",
      icon: TrendingUp,
      title: "Market & Price Trends",
      description:
        "Track property prices, inventory, absorption, rental trends and changing market conditions.",
      metrics: ["Capital Value Indices", "Quarterly Absorption Run-Rates", "Rental Yield Compression"],
    },
    {
      idx: "03",
      icon: Building2,
      title: "Project & Competitor Intelligence",
      description:
        "Analyse competing projects, configurations, pricing, amenities, offers, positioning and sales strategies.",
      metrics: ["Developer Benchmarking", "Unit Configuration Mix", "Incentive & Discount Structures"],
    },
    {
      idx: "04",
      icon: Users,
      title: "Buyer & Demand Insights",
      description:
        "Identify buyer preferences, budgets, property requirements and emerging demand patterns.",
      metrics: ["Buyer Personas & Budgets", "Ticket-Size Demand Curves", "End-User vs Investor Shifts"],
    },
    {
      idx: "05",
      icon: Target,
      title: "Project Positioning",
      description:
        "Use market intelligence to identify opportunities for pricing, product configuration, positioning and go-to-market strategy.",
      metrics: ["Value Proposition Strategy", "Launch Pricing Choreography", "Channel Partner Synergy"],
    },
    {
      idx: "06",
      icon: Search,
      title: "Opportunity Identification",
      description:
        "Discover emerging markets, high-potential locations and opportunities that may otherwise remain hidden within large volumes of property data.",
      metrics: ["Early-Stage Growth Hubs", "Transit Corridor Upsides", "Unmet Spatial Demand"],
    },
  ];

  // Market Intelligence Application Domains (6 Pillars)
  const marketIntelligenceDomains = [
    {
      idx: "01",
      title: "Acquisition",
      description: "Evaluate locations, market potential and property opportunities.",
      badge: "Land & Asset",
      tag: "Pre-Development",
    },
    {
      idx: "02",
      title: "Development",
      description: "Understand project potential, demand and product requirements.",
      badge: "Master Planning",
      tag: "Product Design",
    },
    {
      idx: "03",
      title: "Pricing",
      description: "Compare market rates, competition and pricing trends.",
      badge: "Revenue Maximization",
      tag: "Price Curves",
    },
    {
      idx: "04",
      title: "Sales",
      description: "Understand buyer demand and sales opportunities.",
      badge: "Velocity & Absorption",
      tag: "Execution",
    },
    {
      idx: "05",
      title: "Marketing",
      description: "Refine project positioning and target audiences.",
      badge: "Audience Profiling",
      tag: "GTM Strategy",
    },
    {
      idx: "06",
      title: "Investment",
      description: "Assess market opportunities and potential risks.",
      badge: "Capital Preservation",
      tag: "Risk Modeling",
    },
  ];

  // 5-Step Sequential Approach
  const approachSteps = [
    {
      step: "01",
      name: "COLLECT",
      icon: Database,
      subtitle: "Comprehensive Data Aggregation",
      detail:
        "Systematic harvesting of registered transaction deeds, micro-market pricing feeds, developer inventories, and spatial satellite mapping.",
    },
    {
      step: "02",
      name: "ANALYSE",
      icon: BarChart3,
      subtitle: "Quantitative & Econometric Modeling",
      detail:
        "Processing raw data into statistical distributions, absorption velocity curves, historical trend regressions, and infrastructure catalysts.",
    },
    {
      step: "03",
      name: "COMPARE",
      icon: GitCompare,
      subtitle: "Cross-Market Benchmarking",
      detail:
        "Rigorous comparative analysis across competing developer projects, micro-market yield spreads, and product configurations.",
    },
    {
      step: "04",
      name: "IDENTIFY",
      icon: Lightbulb,
      subtitle: "Actionable Opportunity Discovery",
      detail:
        "Pinpointing pricing asymmetries, underserved unit configurations, and high-velocity micro-corridors before broad market recognition.",
    },
    {
      step: "05",
      name: "ACT",
      icon: Zap,
      subtitle: "Strategic Execution & Go-To-Market",
      detail:
        "Translating empirical insights into decisive land acquisition bids, launch pricing matrices, sales mandate deployment, and capital allocation.",
    },
  ];

  return (
    <div className="relative z-25 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--theme-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-accent)] font-semibold">RESEARCH &amp; INSIGHTS</span>
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
              RESEARCH &amp; INSIGHTS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--theme-text)] leading-[1.08] max-w-5xl mb-6">
            Know the Market.{" "}
            <span className="italic font-normal text-[var(--theme-accent)]">
              See the Opportunity
            </span>.{" "}
            Make Better Decisions.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--theme-text-muted)] font-light max-w-3xl leading-relaxed mb-10">
            Real estate decisions are driven by data—but meaningful insights come from understanding what the data is telling you.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/80 backdrop-blur-md shadow-sm">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                20<span className="text-[var(--theme-accent)]">+</span> Years
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Domain Pedigree
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                ₹2,500<span className="text-[var(--theme-accent)]">+</span> Cr
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Transaction Volume
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                100<span className="text-[var(--theme-accent)]">%</span>
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Data-Informed Precision
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                Mumbai MMR
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Micro-Market Focus
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: REAL ESTATE MARKET RESEARCH OVERVIEW */}
        <section className="mb-24 sm:mb-32 p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/70 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              REAL ESTATE MARKET RESEARCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] leading-tight mb-6">
              Turning Property Data Into Meaningful Market Intelligence
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--theme-text-muted)] font-light leading-relaxed">
              <p>
                Our Real Estate Market Research combines technology, property intelligence and on-ground market understanding to provide a clearer view of locations, projects, pricing, competition and buyer demand.
              </p>
              <p className="text-[var(--theme-text)] font-normal">
                We help developers, investors and real estate businesses move beyond assumptions and make data-informed decisions with greater confidence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE ANALYSE (6 PILLARS) */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              WHAT WE ANALYSE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              What We Analyse
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              Granular evaluation across six foundational analytical pillars that shape real estate asset value and sales velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {analysisPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <WobblyCard
                  key={pillar.title}
                  wobbleIntensity={8}
                  className="p-6 sm:p-8 flex flex-col justify-between h-full bg-[var(--theme-card-bg)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-2xl transition-colors duration-300 shadow-md group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-[var(--theme-accent)] font-semibold">
                        {pillar.idx}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors duration-200 mb-3">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--theme-border)]/60">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.metrics.map((m, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded bg-[var(--theme-surface-glass)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </WobblyCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: MARKET INTELLIGENCE (FROM PROPERTY DATA TO MARKET INTELLIGENCE) */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              MARKET INTELLIGENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] leading-tight mb-4">
              From Property Data to Market Intelligence
            </h2>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] font-light leading-relaxed mb-3">
              We bring together technology, data and real estate expertise to turn complex market information into insights that support better decisions.
            </p>
            <p className="text-xs sm:text-sm text-[var(--theme-accent)] font-medium leading-relaxed">
              From evaluating opportunities to refining pricing and sales strategies, our research helps businesses move forward with greater clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketIntelligenceDomains.map((domain) => (
              <div
                key={domain.title}
                className="p-6 sm:p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md hover:border-[var(--theme-accent)]/60 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[var(--theme-accent)] font-semibold">
                    {domain.idx}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                    {domain.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  {domain.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                  {domain.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: OUR APPROACH (01 COLLECT -> 02 ANALYSE -> 03 COMPARE -> 04 IDENTIFY -> 05 ACT) */}
        <section className="mb-24 sm:mb-32 p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-gradient-to-b from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              OUR APPROACH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-3">
              Our Approach
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-accent)] font-mono tracking-wider uppercase font-semibold">
              Because in real estate, better information can lead to better decisions.
            </p>
          </div>

          {/* Sequential Visual Process Bar (01 COLLECT → 02 ANALYSE → 03 COMPARE → 04 IDENTIFY → 05 ACT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {approachSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={stepItem.name}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "border-[var(--theme-accent)] bg-[var(--theme-surface-elevated)] shadow-lg scale-102"
                      : "border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 hover:border-[var(--theme-accent)]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">
                        {stepItem.step}
                      </span>
                      <StepIcon className="w-4 h-4 text-[var(--theme-accent)] opacity-80" />
                    </div>

                    <h4 className="font-serif text-xl font-normal text-[var(--theme-text)] mb-1">
                      {stepItem.name}
                    </h4>

                    <p className="text-[11px] text-[var(--theme-accent)] font-mono leading-tight mb-3">
                      {stepItem.subtitle}
                    </p>
                  </div>

                  <p className="text-[11px] text-[var(--theme-text-muted)] font-light leading-relaxed">
                    {stepItem.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl border border-[var(--theme-border)]/80 bg-[var(--theme-surface-glass)]/40 text-center max-w-xl mx-auto">
            <p className="text-xs text-[var(--theme-text-muted)] font-light">
              <span className="text-[var(--theme-accent)] font-semibold font-mono uppercase tracking-wider mr-2">
                Unified Execution:
              </span>
              Every insight is calibrated with on-ground developer sole selling and leasing advisory experience.
            </p>
          </div>
        </section>

        {/* SECTION 6: CLOSING CTA */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              RESEARCH &amp; INSIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Make Better Real Estate Decisions With Better Information.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-8">
              Get a clearer understanding of the market, competition, pricing and emerging opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Request Market Intelligence Brief
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Direct Intelligence Inquiry Modal */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInquiryModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-2xl p-6 sm:p-8 z-10"
            >
              {!inquirySent ? (
                <>
                  <div className="mb-6">
                    <span className="text-[11px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold block mb-1">
                      RESEARCH DESK
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] mb-2">
                      Request Market Intelligence
                    </h3>
                    <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                      Connect directly with our research and mandate strategy directors for tailored micro-market data.
                    </p>
                  </div>

                  <form onSubmit={handleResearchSubmit} className="space-y-4">
                    {researchError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {researchError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={researchForm.fullName}
                        onChange={(e) => setResearchForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={researchForm.email}
                        onChange={(e) => setResearchForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={researchForm.phone}
                        onChange={(e) => setResearchForm((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Area of Interest
                      </label>
                      <select
                        name="areaOfInterest"
                        value={researchForm.areaOfInterest}
                        onChange={(e) => setResearchForm((prev) => ({ ...prev, areaOfInterest: e.target.value }))}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                      >
                        <option>Location Intelligence &amp; Infrastructure</option>
                        <option>Market &amp; Price Trend Benchmarks</option>
                        <option>Project &amp; Competitor Intelligence</option>
                        <option>Buyer &amp; Demand Insights</option>
                        <option>Project Positioning &amp; Pricing Strategy</option>
                        <option>Acquisition &amp; Land Opportunity Identification</option>
                      </select>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        disabled={isSubmittingResearch}
                        onClick={() => setInquiryModalOpen(false)}
                        className="px-4 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingResearch}
                        className="px-5 py-2 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingResearch ? "Submitting..." : "Submit Request"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-[var(--theme-accent)] mx-auto mb-3" />
                  <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] mb-2">
                    Request Recorded
                  </h3>
                  {researchRef && (
                    <div className="mb-3">
                      <span className="font-mono text-xs px-3 py-1 bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] rounded text-[var(--theme-accent)] font-semibold">
                        Reference: #{researchRef}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-[var(--theme-text-muted)] mb-6">
                    Our market intelligence desk will share the requested briefing dossier within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setInquiryModalOpen(false);
                      setInquirySent(false);
                      setResearchRef(null);
                      setResearchForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        areaOfInterest: "Location Intelligence & Infrastructure",
                      });
                    }}
                    className="px-5 py-2 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
