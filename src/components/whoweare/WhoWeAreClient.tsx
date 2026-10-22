"use client";

import React, { useState, useEffect } from "react";
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
  Award,
  Flame,
  Users,
  ArrowRight,
  X,
  Compass,
  TrendingDown,
  EyeOff,
  Workflow,
  Maximize2,
  MapPin,
  Calendar,
  ChevronLeft
} from "lucide-react";
import WobblyCard from "@/components/WobblyCard";

interface CapabilityItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  expandedDetails: string[];
  metrics: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "portal",
    category: "PROPERTY PORTAL",
    title: "Property discovery",
    shortDesc: "A modern digital destination for property discovery and qualified enquiries.",
    expandedDetails: [
      "Curated listings for Tier-1 and Category A developer projects across Mumbai.",
      "Immersive 3D floor-plans, unit sunlight angles, and micro-market connectivity indices.",
      "Direct verified buyer inquiries routed straight to mandate sales desks without intermediary broker noise.",
    ],
    metrics: "Sub-100ms discovery velocity & verified investor profiles",
  },
  {
    id: "proptech",
    category: "AI-POWERED PROPTECH",
    title: "Intelligence in the workflow",
    shortDesc: "Use intelligence to reduce manual work and improve every stage of the property journey.",
    expandedDetails: [
      "Algorithmic buyer-unit matching based on financial capacity, life-stage, and commute preferences.",
      "Automated document processing, RERA covenant verification, and digital booking workflows.",
      "Predictive pricing optimization identifying optimal unit release milestones during construction.",
    ],
    metrics: "40% reduction in sales operational overhead",
  },
  {
    id: "mandates",
    category: "PROPERTY MANDATE SERVICES",
    title: "Representation and sales execution",
    shortDesc: "End-to-end representation and sales execution for selected projects and properties.",
    expandedDetails: [
      "Dedicated sole selling on-site leadership and sales team deployment.",
      "Institutional go-to-market choreography, launch events, and private HNI roadshows.",
      "Broker channel loyalty programs, unified pricing protection, and velocity management.",
    ],
    metrics: "₹2,500+ Cr cumulative transaction volume advised",
  },
  {
    id: "developer-solutions",
    category: "DEVELOPER SOLUTIONS",
    title: "From launch to sell-through",
    shortDesc: "A technology and execution layer for developers from launch to sell-through.",
    expandedDetails: [
      "Pre-launch cash-flow modeling, debt servicing schedules, and customer acquisition cost benchmarks.",
      "Real-time developer dashboard tracking unit bookings, collections, and channel partner attribution.",
      "Dynamic inventory management preventing double bookings and price disparities.",
    ],
    metrics: "100% accountability mandate model",
  },
  {
    id: "crm-automation",
    category: "CRM & SALES AUTOMATION",
    title: "A structured sales journey",
    shortDesc: "Turn every enquiry into a structured, measurable sales journey.",
    expandedDetails: [
      "Multi-channel lead capture from digital campaigns, channel partner portals, and site walk-ins.",
      "Automated WhatsApp and email nurturing sequences delivering personalized project brochures.",
      "Site-visit scheduling, executive interaction logging, and conversion bottleneck diagnostics.",
    ],
    metrics: "Zero lead leakage across all transaction funnels",
  },
  {
    id: "market-intelligence",
    category: "DATA & MARKET INTELLIGENCE",
    title: "Actionable business visibility",
    shortDesc: "Turn property and customer data into actionable business visibility.",
    expandedDetails: [
      "Real-time micro-market price movements, registry sales deed analysis, and competitive supply.",
      "Macroeconomic infrastructure correlation modeling (Coastal Road, Metro Line 3, MTHL impact).",
      "Quarterly institutional research briefings distributed to leading developers and capital allocators.",
    ],
    metrics: "Empirical pricing intelligence & absorption forecasting",
  },
];

export default function WhoWeAreClient() {
  const [expandedCapability, setExpandedCapability] = useState<string | null>("portal");
  const [activePhotoCategory, setActivePhotoCategory] = useState<"all" | "awards" | "diwali" | "picnic">("all");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const toggleCapability = (id: string) => {
    setExpandedCapability(expandedCapability === id ? null : id);
  };

  const cultureGallery = [
    {
      src: "/assets/awards/broker-excellence-award.jpg.jpeg",
      title: "Broker Excellence Recognition Gala",
      tag: "Awards & Accolades",
      category: "awards" as const,
      aspect: "aspect-[4/5]",
      date: "Q3 2025",
      location: "The St. Regis, Mumbai",
      desc: "Honoring premier broker network partners and milestone sales achievements in luxury developer mandates.",
    },
    {
      src: "/assets/awards/broker-rewards-ceremony.jpg.jpeg",
      title: "Annual Channel Partner Rewards Ceremony",
      tag: "Awards & Accolades",
      category: "awards" as const,
      aspect: "aspect-[16/10]",
      date: "Annual Gala",
      location: "Grand Hyatt Mumbai",
      desc: "Celebrating high-velocity project sell-through with our trusted network of real estate associates.",
    },
    {
      src: "/assets/awards/top-performer-broker-1.jpg.jpeg",
      title: "Top Performer Mandate Honors",
      tag: "Awards & Accolades",
      category: "awards" as const,
      aspect: "aspect-[3/4]",
      date: "Mid-Year Honors",
      location: "Avodah Corporate HQ",
      desc: "Recognizing outstanding transaction volume and institutional advisory leadership across South Mumbai.",
    },
    {
      src: "/assets/awards/top-performer-broker-2.jpg.jpeg",
      title: "Executive Achievement Accolades",
      tag: "Awards & Accolades",
      category: "awards" as const,
      aspect: "aspect-[4/5]",
      date: "Annual Awards",
      location: "BKC Executive Hall",
      desc: "Special commendation for exceptional client advisory in commercial leasing and developer mandates.",
    },
    {
      src: "/assets/diwali/diwali-2025-1.jpg.jpeg",
      title: "Diwali Festivities & Auspicious Beginnings",
      tag: "Festive Celebrations",
      category: "diwali" as const,
      aspect: "aspect-[16/10]",
      date: "Diwali 2025",
      location: "Avodah Experience Center",
      desc: "The Avodah & Khen family gathering for auspicious beginnings, traditional pooja, and holiday cheer.",
    },
    {
      src: "/assets/diwali/diwali-team-2.jpg.jpeg",
      title: "Diwali Family Celebration of Lights",
      tag: "Festive Celebrations",
      category: "diwali" as const,
      aspect: "aspect-[4/3]",
      date: "Festive Season",
      location: "Mumbai HQ Terraces",
      desc: "Celebrating camaraderie, unity, and shared triumphs across all advisory and engineering teams.",
    },
    {
      src: "/assets/diwali/diwali-team-celebration-2.jpg.jpeg",
      title: "Cultural Cohesion & Festive Spirit",
      tag: "Festive Celebrations",
      category: "diwali" as const,
      aspect: "aspect-[3/4]",
      date: "Cultural Evening",
      location: "Mumbai Central Office",
      desc: "Joyful moments with our leadership, sales directors, and PropTech team members.",
    },
    {
      src: "/assets/picnic/team-picnic-1.jpg.jpeg",
      title: "Annual Team Retreat & Strategy Outing",
      tag: "Culture & Retreats",
      category: "picnic" as const,
      aspect: "aspect-[16/10]",
      date: "Annual Offsite",
      location: "Lonavala Valley Retreat",
      desc: "Recharging in nature, collaborative team strategy sessions, and celebratory milestones.",
    },
    {
      src: "/assets/picnic/office-outing-2.jpg.jpeg",
      title: "Team Bonding & Leadership Offsite",
      tag: "Culture & Retreats",
      category: "picnic" as const,
      aspect: "aspect-[4/5]",
      date: "Leadership Retreat",
      location: "Alibaug Coastal Offsite",
      desc: "Fostering sovereign deal ownership and lasting bonds beyond the boardroom.",
    },
  ];

  const categoryCounts = {
    all: cultureGallery.length,
    awards: cultureGallery.filter((i) => i.category === "awards").length,
    diwali: cultureGallery.filter((i) => i.category === "diwali").length,
    picnic: cultureGallery.filter((i) => i.category === "picnic").length,
  };

  const filteredGallery = activePhotoCategory === "all"
    ? cultureGallery
    : cultureGallery.filter(item => item.category === activePhotoCategory);

  const activeItem = activeModalIndex !== null ? filteredGallery[activeModalIndex] : null;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex + 1) % filteredGallery.length);
  };

  useEffect(() => {
    if (activeModalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) => (prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null));
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, filteredGallery.length]);

  return (
    <div className="relative z-25 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--theme-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-accent)] font-semibold">WHO WE ARE</span>
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
              AVODAH &amp; KHEN
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--theme-text)] leading-[1.08] max-w-5xl mb-6">
            Real Estate.{" "}
            <span className="italic font-normal text-[var(--theme-accent)]">
              Technology
            </span>.{" "}
            Intelligence.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--theme-text-muted)] font-light max-w-3xl leading-relaxed mb-8">
            A connected platform for property discovery, mandates, sales, CRM, data and AI-powered real estate.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link
              href="/#contact"
              className="px-6 py-3 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Connect with us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <span className="text-xs font-mono tracking-widest text-[var(--theme-accent)] uppercase">
              PROPERTY • TECHNOLOGY • GROWTH
            </span>
          </div>

          {/* Quick Pillar Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/80 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl text-[var(--theme-accent)] font-mono">⌂</span>
              <div>
                <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase">
                  PROPERTY DISCOVERY
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Digital Portals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl text-[var(--theme-accent)] font-mono">◎</span>
              <div>
                <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase">
                  AI &amp; DATA
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Workflow Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl text-[var(--theme-accent)] font-mono">♧</span>
              <div>
                <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase">
                  MANDATES &amp; SALES
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Execution Desks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl text-[var(--theme-accent)] font-mono">▥</span>
              <div>
                <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase">
                  CRM &amp; INTELLIGENCE
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Structured Visibility</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE ARE CORE MISSION */}
        <section className="mb-24 sm:mb-32 p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/70 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              WHO WE ARE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] leading-tight mb-6">
              A technology-led real estate company built around one connected ecosystem.
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed mb-8">
              We bring together property, technology, sales and data to create a seamless experience for developers, brokers and buyers — all in one platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--theme-border)]/60">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-[var(--theme-text)] font-light">
                  Bridging traditional 20-year developer advisory pedigree with bleeding-edge PropTech automation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-1" />
                <p className="text-xs sm:text-sm text-[var(--theme-text)] font-light">
                  Direct alignment with developers through 100% accountability sole selling mandate partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE REAL ESTATE GAP & THE OPPORTUNITY */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              THE REAL ESTATE GAP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-3">
              High-Value Assets. Fragmented Workflows.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-accent)] font-mono tracking-wider uppercase font-semibold">
              Four challenges. One connected opportunity.
            </p>
          </div>

          {/* 4 Challenges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <WobblyCard
              wobbleIntensity={6}
              className="p-6 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 bg-[var(--theme-surface-glass)]/90 backdrop-blur-md transition-colors duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-accent)] font-semibold px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                    CHALLENGE 01
                  </span>
                </div>
                <h3 className="font-serif text-xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Fragmented discovery
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  Buyers navigate disconnected listings and channels with inconsistent information and verified pricing.
                </p>
              </div>
            </WobblyCard>

            <WobblyCard
              wobbleIntensity={6}
              className="p-6 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 bg-[var(--theme-surface-glass)]/90 backdrop-blur-md transition-colors duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-accent)] font-semibold px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                    CHALLENGE 02
                  </span>
                </div>
                <h3 className="font-serif text-xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Lead leakage
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  Enquiries can get lost across teams, spreadsheets and messaging, creating delayed follow-ups and lost revenue.
                </p>
              </div>
            </WobblyCard>

            <WobblyCard
              wobbleIntensity={6}
              className="p-6 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 bg-[var(--theme-surface-glass)]/90 backdrop-blur-md transition-colors duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-accent)] font-semibold px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                    CHALLENGE 03
                  </span>
                </div>
                <h3 className="font-serif text-xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Limited intelligence
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  Decisions often lack a single view of demand, pricing, inventory absorption, and competitor performance.
                </p>
              </div>
            </WobblyCard>

            <WobblyCard
              wobbleIntensity={6}
              className="p-6 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 bg-[var(--theme-surface-glass)]/90 backdrop-blur-md transition-colors duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-accent)] font-semibold px-2 py-0.5 rounded bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)]">
                    CHALLENGE 04
                  </span>
                </div>
                <h3 className="font-serif text-xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Complex sales
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  Mandates, channel partners and customer follow-ups require constant manual coordination and alignment.
                </p>
              </div>
            </WobblyCard>
          </div>

          {/* The Opportunity Banner */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--theme-border-accent)] bg-gradient-to-r from-[var(--theme-surface-glass)] via-[var(--theme-surface-elevated)] to-[var(--theme-surface-glass)] backdrop-blur-md text-center">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold block mb-2">
              THE OPPORTUNITY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)] mb-3">
              One connected real estate ecosystem.
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[var(--theme-accent)] tracking-widest uppercase">
              Property Discovery • AI + Data • CRM • Sales Execution
            </p>
          </div>
        </section>

        {/* SECTION 4: WHAT WE DO (CAPABILITIES WITH SHOW MORE+) */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              WHAT WE DO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] leading-tight mb-4">
              Capabilities across the property lifecycle.
            </h2>
            <p className="text-sm sm:text-base text-[var(--theme-text-muted)] font-light leading-relaxed">
              A connected set of services and digital capabilities for property discovery, marketing, sales and business intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => {
              const isExpanded = expandedCapability === cap.id;
              return (
                <WobblyCard
                  key={cap.id}
                  wobbleIntensity={8}
                  className="p-6 sm:p-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)]/60 transition-all duration-300 flex flex-col justify-between h-full shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold block mb-2">
                      {cap.category}
                    </span>

                    <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] mb-3">
                      {cap.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-4">
                      {cap.shortDesc}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-3 border-t border-[var(--theme-border)]/60 space-y-2 mb-4 overflow-hidden"
                        >
                          {cap.expandedDetails.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] mt-1.5 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                          <p className="text-[10px] font-mono text-[var(--theme-accent)] pt-2 uppercase">
                            Key Standard: {cap.metrics}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-4 border-t border-[var(--theme-border)]/60">
                    <button
                      onClick={() => toggleCapability(cap.id)}
                      className="text-xs font-mono tracking-wider uppercase text-[var(--theme-accent)] hover:text-[var(--theme-text)] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <Minus className="w-3.5 h-3.5" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Show more+</span>
                        </>
                      )}
                    </button>
                  </div>
                </WobblyCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: CULTURE, AWARDS & CELEBRATIONS GALLERY (MODERN MASONRY LAYOUT) */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-[var(--theme-border)] pb-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                OUR PEOPLE &amp; MOMENTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
                Excellence, Culture &amp; Recognition
              </h2>
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light mt-2 max-w-xl">
                Behind our technology and mandates is a dedicated team. From broker excellence awards to Diwali family celebrations and leadership retreats.
              </p>
            </div>

            {/* Filter buttons with live count indicators */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Moments", icon: Sparkles, count: categoryCounts.all },
                { id: "awards", label: "Awards & Galas", icon: Award, count: categoryCounts.awards },
                { id: "diwali", label: "Diwali Celebrations", icon: Flame, count: categoryCounts.diwali },
                { id: "picnic", label: "Team Retreats", icon: Users, count: categoryCounts.picnic },
              ].map((tab) => {
                const isSelected = activePhotoCategory === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActivePhotoCategory(tab.id as typeof activePhotoCategory);
                      setActiveModalIndex(null);
                    }}
                    className={`px-3.5 py-2 text-xs font-semibold tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] shadow-sm font-bold scale-[1.02]"
                        : "bg-[var(--theme-surface-glass)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-black/20 text-white dark:text-[#0c0d0c]"
                          : "bg-black/10 dark:bg-white/10 text-[var(--theme-text-muted)]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.src}
                onClick={() => setActiveModalIndex(idx)}
                className="group relative rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md shadow-md cursor-pointer hover:border-[var(--theme-accent)] transition-all duration-300 flex flex-col hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      {item.tag}
                    </span>
                  </div>

                  {/* Quick Expand Button on hover */}
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  </div>

                  {/* Contextual Chips overlaying bottom of photo */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[10px] font-mono text-white/90">
                    <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      <MapPin className="w-3 h-3 text-[var(--theme-accent)]" />
                      {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      <Calendar className="w-3 h-3 text-[var(--theme-accent)]" />
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-serif text-lg font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] text-[var(--theme-accent)] font-mono">
                    <span>View full frame</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: OUR VISION */}
        <section className="mb-24 sm:mb-32 p-8 sm:p-14 rounded-3xl border border-[var(--theme-border)] bg-gradient-to-b from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              OUR VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-6">
              A more connected, intelligent real estate future.
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-muted)] font-light leading-relaxed">
              We aim to bring property discovery, market intelligence, customer relationships and sales execution closer together through thoughtful technology and practical execution.
            </p>
          </div>
        </section>

        {/* SECTION 7: LET'S BUILD WHAT'S NEXT (CLOSING CTA) */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              LET&apos;S BUILD WHAT&apos;S NEXT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Have a property opportunity to explore together?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-8">
              Whether you are a developer planning a landmark launch, an institutional occupier seeking grade-A space, or a capital partner.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="w-full sm:w-auto px-7 py-3.5 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Explore Market Research
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Modern Lightbox Modal with Carousel Navigation */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 overflow-y-auto">
            {/* Global Backdrop with smooth click-to-close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-0"
            />

            {/* Top-Right Floating Dismiss Button (guaranteed visible and never hidden by navbar) */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[110] p-3 rounded-full bg-[var(--theme-surface-glass)]/95 hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] shadow-2xl backdrop-blur-2xl transition-all cursor-pointer group"
              aria-label="Close image preview"
              title="Close Preview (Esc)"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Desktop Side Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-[110] p-3.5 rounded-full bg-[var(--theme-surface-glass)]/90 hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] shadow-2xl backdrop-blur-xl transition-all cursor-pointer group active:scale-90"
              aria-label="Previous photograph"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNextImage}
              className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[110] p-3.5 rounded-full bg-[var(--theme-surface-glass)]/90 hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] shadow-2xl backdrop-blur-xl transition-all cursor-pointer group active:scale-90"
              aria-label="Next photograph"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[82vh] rounded-2xl bg-[var(--theme-surface-elevated)]/98 border border-[var(--theme-border)] shadow-2xl p-4 sm:p-6 z-10 overflow-hidden flex flex-col my-auto"
            >
              {/* Modal Top Control Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[var(--theme-surface-glass)] text-[var(--theme-accent)] border border-[var(--theme-border)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                    {activeItem.tag}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                    [ {String((activeModalIndex ?? 0) + 1).padStart(2, "0")} / {String(filteredGallery.length).padStart(2, "0")} ]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevImage}
                    className="p-2 rounded-full bg-[var(--theme-surface-glass)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer md:hidden"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-2 rounded-full bg-[var(--theme-surface-glass)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer md:hidden"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalIndex(null)}
                    className="p-2 rounded-full bg-[var(--theme-surface-glass)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all cursor-pointer ml-1"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Image View */}
              <div className="relative aspect-[16/10] max-h-[52vh] w-full rounded-xl overflow-hidden mb-4 bg-black/40 shadow-inner">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Bottom Caption Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-2">
                <div className="max-w-xl">
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-text)] mb-1.5">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                    {activeItem.desc}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-1 text-[11px] font-mono text-[var(--theme-text-muted)] shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-accent)]">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeItem.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeItem.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
