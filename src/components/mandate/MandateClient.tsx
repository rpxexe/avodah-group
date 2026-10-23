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
  XCircle,
  Plus,
  Minus,
  ShieldCheck,
  TrendingUp,
  Layers,
  Users,
  BarChart3,
  Building2,
  Target,
  Award,
  Rocket,
  Check,
  AlertTriangle,
  Scale,
  Compass,
  Briefcase
} from "lucide-react";
import WobblyCard from "@/components/WobblyCard";

interface StepItem {
  id: string;
  stepNum: string;
  title: string;
  shortDesc: string;
  expandedPoints: string[];
}

const STEPS_DATA: StepItem[] = [
  {
    id: "step-1",
    stepNum: "01",
    title: "Define Your Sales Objectives as Your Sole Selling Partner",
    shortDesc: "Establishing unambiguous revenue targets, pricing discovery curves, and timeline benchmarks before going to market.",
    expandedPoints: [
      "Establish gross sales value (GSV) milestones and minimum quarterly absorption targets.",
      "Define floor price thresholds and phase-wise price discovery appreciation bands.",
      "Identify target buyer demographics, configuration preferences, and micro-market absorption patterns.",
      "Align on developer brand equity guidelines and non-negotiable governance policies.",
    ],
  },
  {
    id: "step-2",
    stepNum: "02",
    title: "Negotiate the Mandate Agreement",
    shortDesc: "Structuring a clear, balanced exclusive mandate contract with aligned incentives, tenure, and sole authority.",
    expandedPoints: [
      "Define the exclusive sales mandate tenure and clear territorial or project scope jurisdiction.",
      "Establish transparent, performance-linked commission schedules and shared marketing co-investment formulas.",
      "Formulate strict sole-representation terms preventing unauthorized third-party broker undercutting.",
      "Incorporate transparent audit rights, escrow flow mechanisms, and clear SLA clauses.",
    ],
  },
  {
    id: "step-3",
    stepNum: "03",
    title: "Set Performance KPIs (Key Performance Indicators)",
    shortDesc: "Instituting data-backed accountability metrics from lead acquisition to site visit conversion and final collection.",
    expandedPoints: [
      "Mandate enquiry-to-visit (CP & digital) and visit-to-booking conversion efficiency ratios.",
      "Measure realized price per square foot appreciation across sequential tower and wing releases.",
      "Track channel partner active participation, broker sourcing velocity, and network reach.",
      "Enforce lead turnaround time SLAs within centralized CRM infrastructure.",
    ],
  },
  {
    id: "step-4",
    stepNum: "04",
    title: "Coordinate Sales Execution",
    shortDesc: "Mobilizing dedicated on-ground sales teams, launching the experiential sales galleria, and synchronizing brokers.",
    expandedPoints: [
      "Deploy full-time, institutional on-site sales directors, relationship managers, and closing specialists.",
      "Curate the luxury sales pavilion, architectural scale models, and high-touch customer experiential journeys.",
      "Conduct structured channel partner conclaves, broker incentive rollouts, and launch briefings.",
      "Implement real-time CRM dashboards providing developer leadership with 24/7 pipeline transparency.",
    ],
  },
];

export default function MandateClient() {
  const [expandedStep, setExpandedStep] = useState<string | null>("step-1");

  const toggleStep = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
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
          <span className="text-[var(--theme-accent)] font-semibold uppercase">MANDATE</span>
        </div>

        {/* HERO SECTION */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-surface-glass)] border border-[var(--theme-border-accent)] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
                AVODAH &amp; KHEN • SOLE SELLING PARTNER
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[var(--theme-text)] leading-[1.12] mb-6">
              Why Should You Appoint Us As Your Sole Selling Partner for Your Project
            </h1>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-[var(--theme-accent)] uppercase mb-6 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span>Step-By-Step Guide For Developers In India</span>
            </div>

            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed mb-6">
              Launching a real estate project is a major financial decision. Choosing the right Sole Selling Partner under structured sales mandates and brand mandates can directly impact your revenue, pricing discipline, and inventory absorption.
            </p>

            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] font-light leading-relaxed border-l-2 border-[var(--theme-accent)] pl-4 italic">
              At Avodah &amp; Khen, backed by 20+ years of experience in sales &amp; brand mandates, we support developers across Mumbai with structured exclusive mandate models.
            </p>
          </div>

          {/* Hero Feature Showcase Banner with Generated Landmark Tower Image */}
          <div className="relative rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-2xl">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black/40">
              <Image
                src="/assets/mandate/mandate-luxury-tower.jpg"
                alt="Luxury Mumbai Real Estate Mandate Landmark"
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
                    MUMBAI DEVELOPER MANDATES
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light">
                    Structured Sales Mandates. Sovereign Pricing Protection.
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shrink-0">
                  <div>
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      20+ Yrs
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Domain Mandates
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      100%
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Pricing Integrity
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-accent)]">
                      Single-Pt
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      Accountability
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: UNDERSTANDING THE MODEL */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              UNDERSTANDING THE MODEL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              What is a Sole Selling Partner?
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed">
              A Sole Selling Partner is appointed under an exclusive sales mandate agreement to manage the complete sales lifecycle of a project.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-xl">
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-text)] mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[var(--theme-accent)]" />
              <span>Our Sole Selling Model Ensures:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                {
                  title: "Centralized pricing strategy",
                  desc: "Guards against price erosion, broker discounting, and margin compression.",
                  icon: TrendingUp,
                },
                {
                  title: "Structured inventory allocation",
                  desc: "Phased batch releases to drive urgency and maximize floor-rise premiums.",
                  icon: Layers,
                },
                {
                  title: "A well-established and controlled broker network",
                  desc: "Single unified interface for hundreds of CP partners with zero channel disputes.",
                  icon: Users,
                },
                {
                  title: "Transparent reporting",
                  desc: "Real-time telemetry on lead velocity, site visits, and booking pipeline.",
                  icon: BarChart3,
                },
                {
                  title: "Clear accountability",
                  desc: "One dedicated partner fully answerable for sell-through targets and timelines.",
                  icon: Target,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)]/60 hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)] mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-sm text-[var(--theme-text)] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[var(--theme-border)]/40 text-[10px] font-mono text-[var(--theme-accent)]">
                      PILLAR {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: STEP-BY-STEP GUIDE (WITH BOARDROOM PHOTOGRAPH & ACCORDION) */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[var(--theme-border)] pb-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                STEP-BY-STEP GUIDE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
                While appointing us as your Sole Selling Partner, You Need To...
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light max-w-md">
              A disciplined four-phase roadmap that aligns developer vision with on-ground sales velocity and revenue realization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Strategic Boardroom Photo */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-xl sticky top-28">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[560px] w-full overflow-hidden bg-black/40">
                <Image
                  src="/assets/mandate/mandate-strategy-boardroom.jpg"
                  alt="Avodah & Khen Strategic Sales Mandate Boardroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold block mb-1">
                    EXECUTIVE ALIGNMENT
                  </span>
                  <p className="text-xs font-light text-white/90">
                    Collaborating with developer promoters to establish pricing governance, sales velocity, and marketing execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Interactive Drawers */}
            <div className="lg:col-span-7 space-y-4">
              {STEPS_DATA.map((step) => {
                const isOpen = expandedStep === step.id;
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] shadow-lg"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 hover:border-[var(--theme-accent)]/50"
                    }`}
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--theme-tag-bg)] text-[var(--theme-accent)] border border-[var(--theme-tag-border)] mt-0.5">
                          {step.stepNum}
                        </span>
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl font-light text-[var(--theme-text)] mb-1">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                            {step.shortDesc}
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
                            {step.expandedPoints.map((point, pIdx) => (
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

        {/* SECTION 3: KEY BENEFITS */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              KEY BENEFITS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Benefits of Appointing Avodah &amp; Khen a Sole Selling Partner
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              Transforming fragmented channel chaos into a disciplined, high-absorption institutional sales machine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Unified Brand Positioning",
                desc: "Consistent project narrative, premium collateral, and coordinated marketing campaigns across all buyer touchpoints.",
                icon: Award,
              },
              {
                title: "Strong Pricing Discipline",
                desc: "Strict adherence to developer price matrices, eliminating unauthorized broker discounting and margin compression.",
                icon: Scale,
              },
              {
                title: "Structured Inventory Release",
                desc: "Strategic batching of floors and unit categories to fuel organic urgency and capture maximum floor-rise premiums.",
                icon: Layers,
              },
              {
                title: "Data-driven Execution",
                desc: "Predictive micro-market intelligence, buyer qualification algorithms, and real-time absorption analytics.",
                icon: BarChart3,
              },
              {
                title: "Single-point Accountability",
                desc: "One trusted institutional partner taking full ownership of sales targets, broker coordination, and revenue realization.",
                icon: Target,
              },
              {
                title: "Faster Inventory Absorption",
                desc: "Coordinated GTM launches and motivated channel partner networks that shorten holding periods and financing costs.",
                icon: Rocket,
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <WobblyCard key={idx} wobbleIntensity={5} className="h-full">
                  <div className="p-7 sm:p-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)] mb-6 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--theme-accent)]">
                      <span>BENEFIT 0{idx + 1}</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </WobblyCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: THE RIGHT MOMENT */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[var(--theme-border)] pb-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                THE RIGHT MOMENT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
                When Should You Appoint Avodah &amp; Khen As Your Sole Selling Partner?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light max-w-md">
              The right sales strategy, introduced at the right stage, can make a meaningful difference to your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "New Project Launch",
                desc: "Establish a clear sales strategy, pricing structure and market positioning from day one.",
              },
              {
                title: "Pre-launch Planning",
                desc: "Prepare your project for launch with structured planning and coordinated sales activities.",
              },
              {
                title: "Large Township Developments",
                desc: "Coordinate large inventories, channel partners and sales execution through one structured model.",
              },
              {
                title: "Redevelopment Projects",
                desc: "Bring clarity, accountability and a defined sales approach to complex redevelopment projects.",
              },
              {
                title: "Slow-moving Inventory",
                desc: "Identify sales bottlenecks and strengthen pricing, marketing and conversion strategies.",
              },
              {
                title: "Expansion into Mumbai Markets",
                desc: "Build a market-focused sales strategy to support expansion across Mumbai.",
              },
            ].map((moment, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] hover:border-[var(--theme-accent)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold">
                      SCENARIO 0{idx + 1}
                    </span>
                    {/* <div className="w-7 h-7 rounded-full bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)] group-hover:bg-[var(--theme-accent)] group-hover:text-white dark:group-hover:text-black transition-colors">
                      <span className="text-sm font-bold leading-none">↗</span>
                    </div> */}
                  </div>
                  <h3 className="font-serif text-xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2.5">
                    {moment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                    {moment.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SALES STRUCTURE (HEAD-TO-HEAD COMPARISON) */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              SALES STRUCTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-3">
              Sole Selling Partner vs Multiple Channel Partners
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light">
              A side-by-side assessment of single exclusive mandates versus uncoordinated multi-broker models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Single Sole Selling Partner (Recommended / Advantage) */}
            <div className="p-8 sm:p-10 rounded-3xl border-2 border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] to-[var(--theme-bg)] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-md">
                RECOMMENDED
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-light text-[var(--theme-text)]">
                    Single Sole Selling Partner
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--theme-accent)]">
                    Why Should You Appoint a Single Sole Selling Partner?
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Strong pricing control", desc: "No price wars, unauthorized discounting, or margin cannibalization." },
                  { title: "Unified brand messaging", desc: "Consistent project narrative across marketing, press, and client meetings." },
                  { title: "Clear accountability", desc: "One single promoter-level partner responsible for monthly absorption targets." },
                  { title: "Structured inventory allocation", desc: "Phased batch releases to maximize floor rise and unit premiums." },
                  { title: "Centralized reporting", desc: "Daily telemetry on CP engagements, customer inquiries, and conversion velocity." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--theme-tag-bg)]/50 border border-[var(--theme-border)]">
                    <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[var(--theme-text)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--theme-text-muted)] font-light mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Multiple Channel Partners (Risks / Pitfalls) */}
            <div className="p-8 sm:p-10 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-light text-[var(--theme-text)]">
                    Multiple Channel Partners
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                    Why Should You Avoid Appointing Multiple Channel Partners?
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Pricing inconsistency", desc: "Different brokers quote conflicting prices and underwrite rogue discounts." },
                  { title: "Fragmented brand communication", desc: "Diluted messaging, inaccurate unit layouts, and unauthorized ad listings." },
                  { title: "Confused accountability", desc: "When sales lag, multiple brokers point fingers without taking ownership." },
                  { title: "Inventory conflicts", desc: "Multiple agents pitching the same premium units, causing customer distress." },
                  { title: "Scattered reporting", desc: "Disparate spreadsheets, lost customer inquiries, and zero pipeline visibility." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/5 border border-red-500/10">
                    <XCircle className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[var(--theme-text)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--theme-text-muted)] font-light mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: AVODAH & KHEN SALES EXPERTISE (6 PILLARS + EXPERIENCE CENTER PHOTO) */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              AVODAH &amp; KHEN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-3">
              Sales Expertise. Delivered Strategically.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light">
              How we support developers through market intelligence, brand mandates and structured sales execution.
            </p>
          </div>

          {/* Experience Center Image Feature */}
          <div className="relative rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-xl mb-12">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black/40">
              <Image
                src="/assets/mandate/mandate-experience-center.jpg"
                alt="Ultra Luxury Real Estate Sales Galleria and Experience Center"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold block mb-1">
                    ON-GROUND EXPERIENCE
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light">
                    Transforming Sales Pavilions Into High-Conversion Experiences
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-[var(--theme-accent)] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10 shrink-0">
                  MARKET KNOWLEDGE → SALES EXECUTION
                </div>
              </div>
            </div>
          </div>

          {/* 6 Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                category: "MARKET INTELLIGENCE",
                title: "Market Expertise Across Mumbai",
                desc: "Local market understanding to help position projects for the right audience.",
                icon: Compass,
              },
              {
                category: "BRAND STRATEGY",
                title: "Strategic Brand-Mandate Implementation",
                desc: "Consistent project positioning, communication and coordinated execution.",
                icon: Award,
              },
              {
                category: "SALES MANAGEMENT",
                title: "End-to-End Exclusive Sales Mandates",
                desc: "A structured approach to managing the project sales lifecycle.",
                icon: Briefcase,
              },
              {
                category: "CHANNEL PARTNERS",
                title: "Broker Ecosystem Management",
                desc: "Organised broker coordination to support reach and sales conversion.",
                icon: Users,
              },
              {
                category: "ON-GROUND EXECUTION",
                title: "On-Site Sales Deployment",
                desc: "Dedicated project-level sales support and coordinated execution.",
                icon: Building2,
              },
              {
                category: "TECHNOLOGY & INSIGHTS",
                title: "CRM-Driven Reporting",
                desc: "Structured lead tracking, transparent reporting and sales visibility.",
                icon: BarChart3,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--theme-accent)] uppercase font-semibold block mb-2">
                      {pillar.category}
                    </span>
                    <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--theme-accent)]">
                    <span className="opacity-70">PILLAR 0{idx + 1}</span>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--theme-accent)] font-semibold uppercase px-4 py-2 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]">
              <span>MARKET KNOWLEDGE</span>
              <span>→</span>
              <span>SALES EXECUTION</span>
            </span>
          </div>
        </section>

        {/* SECTION 7: OUR STRENGTH */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              OUR STRENGTH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-3">
              We Pride Ourselves With...
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light">
              Our approach is built around experience, accountability, structured execution and a deep understanding of the real estate sales ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Proven Sales Expertise",
                desc: "Exclusive sales mandate and brand-mandate experience built around structured execution.",
              },
              {
                title: "Mumbai Market Knowledge",
                desc: "Local market understanding to help developers position their projects more effectively.",
              },
              {
                title: "Dedicated Sales Teams",
                desc: "On-ground sales deployment focused on coordination, buyer engagement and execution.",
              },
              {
                title: "CRM & Reporting Systems",
                desc: "Organised lead tracking and reporting for improved visibility across the sales process.",
              },
              {
                title: "Strong Broker Network",
                desc: "Broker relationships and channel coordination to support project reach and sales opportunities.",
              },
              {
                title: "Developer Relationships",
                desc: "A relationship-led approach to working with developers and supporting their sales objectives.",
              },
            ].map((strength, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] flex items-center justify-center text-[var(--theme-accent)] font-mono text-xs font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-2.5">
                    {strength.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                    {strength.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-[var(--theme-border)]/50 text-[10px] font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                  Verified Capability
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--theme-accent)] font-semibold uppercase px-4 py-2 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]">
              <span>EXPERIENCE</span>
              <span>→</span>
              <span>EXECUTION</span>
              <span>→</span>
              <span>RESULTS</span>
            </span>
          </div>
        </section>

        {/* SECTION 8: FINAL TAKEAWAY */}
        <section className="mb-24 sm:mb-32 p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-gradient-to-b from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              FINAL TAKEAWAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-6">
              Not Just Sales. A Structured Growth System.
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed">
              Appointing a Sole Selling Partner is not outsourcing sales. It is building a structured, accountable and revenue-driven sales system backed by professional sales mandates and brand mandates.
            </p>
          </div>

          <div className="max-w-2xl mx-auto pt-6 border-t border-[var(--theme-border)]/60">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold text-center block mb-4">
              IF YOU WANT TO
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "Launch stronger",
                "Sell faster",
                "Maintain pricing discipline",
                "Avoid broker conflicts",
              ].map((goal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[var(--theme-border-accent)] bg-[var(--theme-surface)]/70 text-center flex flex-col items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span className="text-xs font-semibold text-[var(--theme-text)]">
                    {goal}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: CLOSING CTA (LET'S BUILD YOUR SALES STRATEGY) */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              LET&apos;S BUILD YOUR SALES STRATEGY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Ready to appoint us as your Sole Selling Partner?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-6">
              Partner with AVODAH &amp; KHEN to bring structure, accountability and strategic direction to your project sales.
            </p>

            <div className="space-y-1.5 text-xs text-[var(--theme-text-muted)] font-light mb-8 max-w-lg mx-auto">
              <p>Planning a new project launch?</p>
              <p>Looking for structured sales execution in Mumbai?</p>
              <p className="font-normal text-[var(--theme-text)]">
                Connect with AVODAH &amp; KHEN to discuss your project and explore an exclusive sales mandate and brand-mandate approach.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact Us Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/who-we-are"
                className="w-full sm:w-auto px-8 py-4 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Explore Who We Are
              </Link>
            </div>

            <div className="pt-6 border-t border-[var(--theme-border)]/50">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold">
                YOUR PROJECT → OUR COMMITMENT → LONG-TERM VALUE
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
