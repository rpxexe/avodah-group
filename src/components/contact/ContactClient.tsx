"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  TrendingUp,
  Compass,
  Send,
  CheckCircle2,
  ArrowRight,
  Globe,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Layers,
  Lock,
  Briefcase,
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";
import WobblyCard from "@/components/WobblyCard";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  valuationScale: string;
  microMarket: string;
  message: string;
  ndaRequested: boolean;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  service: "Sole Selling Developer Mandate",
  valuationScale: "₹100 Cr – ₹500 Cr",
  microMarket: "Bandra Kurla Complex (BKC) / Central",
  message: "",
  ndaRequested: true,
};

const ADVISORY_PILLARS = [
  {
    id: "mandates",
    name: "Developer Mandates",
    serviceValue: "Sole Selling Developer Mandate",
    desc: "Sole selling partnerships, pricing discipline & sales velocity",
    icon: Building2,
    email: "mandates@avodahgroup.co",
    badge: "High Velocity",
  },
  {
    id: "leasing",
    name: "Commercial Leasing",
    serviceValue: "Commercial Leasing Advisory",
    desc: "Grade-A corporate leasing & enterprise tenant advisory",
    icon: Briefcase,
    email: "leasing@avodahgroup.co",
    badge: "Grade-A",
  },
  {
    id: "investment",
    name: "Investment & Capital",
    serviceValue: "Real Estate Investment Advisory",
    desc: "Pre-leased assets, land syndication & capital deployment",
    icon: TrendingUp,
    email: "invest@avodahgroup.co",
    badge: "Institutional",
  },
  {
    id: "proptech",
    name: "PropTech & FinTech",
    serviceValue: "PropTech Platform Partnerships",
    desc: "Algorithmic underwriting, market data & closing portals",
    icon: Layers,
    email: "tech@avodahgroup.co",
    badge: "Soon",
  },
];

const MICRO_MARKETS = [
  {
    region: "Bandra Kurla Complex (BKC)",
    focus: "Corporate HQ & BFSI Grade-A Leasing",
    footprint: "Commercial Spine",
  },
  {
    region: "South Mumbai & Worli Corridor",
    focus: "Ultra-Luxury Residential & Flagship Mandates",
    footprint: "Heritage & Trophy Assets",
  },
  {
    region: "Western Suburbs (Bandra - Andheri)",
    focus: "High-Absorption Redevelopment & Mixed-Use",
    footprint: "Retail & Residential Velocity",
  },
  {
    region: "Trans-Harbour & Navi Mumbai",
    focus: "Infrastructure Catalysts, Data Centers & Logistics",
    footprint: "High-Growth Expansion Zone",
  },
];

const FAQS = [
  {
    q: "How quickly does Avodah & Khen onboard a developer sole selling mandate?",
    a: "Our typical underwriting and mandate onboarding lifecycle spans 10 to 14 business days. This includes a quantitative micro-market absorption audit, unit mix recalibration, pricing tiering, and channel partner network choreography before formal launch.",
  },
  {
    q: "What is your confidentiality protocol for proprietary asset disclosures?",
    a: "Every transaction, developer inventory disclosure, and institutional leasing brief is governed under mutual Non-Disclosure Agreements (NDAs). We handle data with institutional discretion and restricted access controls.",
  },
  {
    q: "Do you represent enterprise tenants for corporate relocation and space consolidation?",
    a: "Yes. Our commercial leasing desk advises Fortune 500 corporations, financial institutions, and fast-growing technology enterprises on lease structuring, floorplate efficiency, lease renewals, and fit-out advisory across Mumbai.",
  },
  {
    q: "Can prospective clients schedule an in-person advisory briefing at our offices?",
    a: "Yes. We host private advisory briefings for developer leadership teams, fund managers, and institutional principals at our Mumbai chambers or on-site at your project location.",
  },
];

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [selectedPillar, setSelectedPillar] = useState<string>("mandates");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handlePillarSelect = (pillarId: string, serviceValue: string) => {
    setSelectedPillar(pillarId);
    setFormData((prev) => ({ ...prev, service: serviceValue }));
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim(),
          service: formData.service.trim(),
          city: formData.microMarket.trim(),
          microMarket: formData.microMarket.trim(),
          message: formData.message.trim(),
          ndaRequested: formData.ndaRequested,
          source: "contact_page",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.referenceCode) {
        throw new Error(data.error || "Failed to record inquiry in the database. Please try again.");
      }

      setSubmittedRef(data.referenceCode);
    } catch (err: unknown) {
      console.error("[CONTACT_SUBMIT_ERROR]", err);
      setFormError(err instanceof Error ? err.message : "Submission failed. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setSubmittedRef(null);
    setFormError(null);
  };

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-24 sm:pb-32">
      {/* Background Ambience Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-[var(--theme-accent)]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)] tracking-wider mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-[var(--theme-accent)] font-semibold uppercase">GET IN TOUCH</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold">
              INSTITUTIONAL ADVISORY CHANNELS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[var(--theme-text)] tracking-tight leading-[1.08] mb-6">
            Initiate a <span className="italic text-[var(--theme-accent)]">Strategic</span> Dialogue.
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-muted)] leading-relaxed font-light">
            Whether you are appointing a sole selling partner for a Category-A project, leasing prime commercial corporate space, or deploying private real estate capital in Mumbai — our principals are available for confidential consultations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-[var(--theme-border)]">
            <div>
              <span className="text-xl sm:text-2xl font-serif text-[var(--theme-accent)] block">&lt; 4 Hours</span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-text-muted)]">Response SLA</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif text-[var(--theme-accent)] block">100% NDA</span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-text-muted)]">Confidentiality</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif text-[var(--theme-accent)] block">Principal-Led</span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-text-muted)]">Direct Leadership</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif text-[var(--theme-accent)] block">₹2,500+ Cr</span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--theme-text-muted)]">Advisory Footprint</span>
            </div>
          </div>
        </div>

        {/* Advisory Pillar Selector Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-text-muted)]">
              SELECT YOUR ADVISORY FOCUS
            </span>
            <span className="text-xs text-[var(--theme-accent)] font-mono hidden sm:inline-block">
              Interactive Form Autofill
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADVISORY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === pillar.id;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handlePillarSelect(pillar.id, pillar.serviceValue)}
                  className={`p-5 rounded-sm border text-left transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? "bg-[var(--theme-surface-elevated)] border-[var(--theme-accent)] shadow-lg shadow-[var(--theme-accent)]/10"
                      : "bg-[var(--theme-surface-glass)] border-[var(--theme-border)] hover:border-[var(--theme-border-hover)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-sm border transition-colors ${
                        isSelected
                          ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] border-[var(--theme-accent)]"
                          : "bg-[var(--theme-tag-bg)] border-[var(--theme-border)] text-[var(--theme-accent)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] text-[var(--theme-text-muted)]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--theme-text)] mb-1 group-hover:text-[var(--theme-accent)] transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Section: Form & Direct Contact Chambers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Left Column: Comprehensive Interactive Form */}
          <div className="lg:col-span-7">
            <Card3DTilt intensity={6}>
              <div className="p-8 sm:p-12 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] shadow-[var(--theme-card-shadow)] relative backdrop-blur-xl">
                
                <AnimatePresence mode="wait">
                  {!submittedRef ? (
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--theme-text)]">
                          Consultation Request
                        </h2>
                        <span className="text-[10px] font-mono text-[var(--theme-accent)] uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--theme-tag-bg)] border border-[var(--theme-border)]">
                          Direct to Principals
                        </span>
                      </div>
                      <p className="text-xs text-[var(--theme-text-muted)] font-light mb-8">
                        Complete the confidential inquiry below. A senior advisory partner will respond within 4 business hours.
                      </p>

                      {formError && (
                        <div className="p-3.5 mb-6 rounded-sm bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium leading-relaxed">
                          {formError}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Row 1: Full Name & Organization */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="fullName"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="e.g. Vikramaditya Singhania"
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="organization"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Firm / Developer Entity *
                            </label>
                            <input
                              type="text"
                              id="organization"
                              required
                              value={formData.organization}
                              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                              placeholder="e.g. Skyline Realty / Apex Capital"
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)]"
                            />
                          </div>
                        </div>

                        {/* Row 2: Corporate Email & Direct Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Corporate Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="v.singhania@firm.com"
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Direct Telephone / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+91 98200 12345"
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)]"
                            />
                          </div>
                        </div>

                        {/* Row 3: Service Selection & Asset Scale */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="service"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Advisory Service Area *
                            </label>
                            <select
                              id="service"
                              required
                              value={formData.service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all"
                            >
                              <option value="Sole Selling Developer Mandate">Sole Selling Developer Mandate</option>
                              <option value="Commercial Leasing Advisory">Commercial Leasing &amp; Tenant Representation</option>
                              <option value="Real Estate Investment Advisory">Real Estate Investment Advisory</option>
                              <option value="Portfolio & Asset Optimization">Portfolio &amp; Asset Optimization</option>
                              <option value="PropTech Platform Partnerships">PropTech Platform Partnerships</option>
                              <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="valuationScale"
                              className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                            >
                              Asset / Requirement Valuation Scale
                            </label>
                            <select
                              id="valuationScale"
                              value={formData.valuationScale}
                              onChange={(e) => setFormData({ ...formData, valuationScale: e.target.value })}
                              className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all"
                            >
                              <option value="Below ₹25 Cr">Below ₹25 Cr</option>
                              <option value="₹25 Cr – ₹100 Cr">₹25 Cr – ₹100 Cr</option>
                              <option value="₹100 Cr – ₹500 Cr">₹100 Cr – ₹500 Cr</option>
                              <option value="₹500 Cr – ₹1,500 Cr">₹500 Cr – ₹1,500 Cr</option>
                              <option value="₹1,500 Cr+ Institutional">₹1,500 Cr+ (Institutional Scale)</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 4: Micro-Market / Region of Focus */}
                        <div>
                          <label
                            htmlFor="microMarket"
                            className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                          >
                            Primary Micro-Market Location
                          </label>
                          <select
                            id="microMarket"
                            value={formData.microMarket}
                            onChange={(e) => setFormData({ ...formData, microMarket: e.target.value })}
                            className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all"
                          >
                            <option value="Bandra Kurla Complex (BKC) / Central">Bandra Kurla Complex (BKC) / Central Mumbai</option>
                            <option value="South Mumbai & Worli Corridor">South Mumbai, Worli &amp; Lower Parel</option>
                            <option value="Western Suburbs (Bandra - Andheri - Borivali)">Western Suburbs (Bandra to Andheri)</option>
                            <option value="Navi Mumbai & Trans-Harbour Corridor">Navi Mumbai, Airoli &amp; MTHL Corridor</option>
                            <option value="Thane & Northern MMR">Thane &amp; Ghodbunder Growth Corridor</option>
                            <option value="Pan-India / Multi-City Requirement">Pan-India / Multi-City Requirement</option>
                          </select>
                        </div>

                        {/* Row 5: Detailed Project Brief */}
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                          >
                            Project Brief / Consultation Scope *
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Detail your development size, unit mix, launch timeframe, commercial square footage, or investment thesis..."
                            className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all resize-y placeholder:text-[var(--theme-text-muted)]"
                          />
                        </div>

                        {/* NDA Checkbox */}
                        <div className="flex items-start gap-3 p-3.5 rounded-sm bg-[var(--theme-surface)] border border-[var(--theme-border)]">
                          <input
                            type="checkbox"
                            id="ndaRequested"
                            checked={formData.ndaRequested}
                            onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                            className="mt-0.5 accent-[var(--theme-accent)] w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="ndaRequested" className="text-xs text-[var(--theme-text-muted)] leading-relaxed cursor-pointer select-none">
                            <span className="font-semibold text-[var(--theme-text)] block">Execute Mutual Non-Disclosure Agreement (NDA)</span>
                            Prior to exchanging financial models or developer floorplans, enforce formal institutional confidentiality.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[var(--theme-accent)]/20 disabled:opacity-60 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white dark:border-[#0c0d0c] border-t-transparent rounded-full animate-spin" />
                              <span>Transmitting to Advisory Principals...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Consultation Request</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* Submission Confirmation View */
                    <motion.div
                      key="submitted-view"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-[var(--theme-accent)] flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-accent)] font-semibold block mb-2">
                        INQUIRY LOGGED CONFIDENTIALLY
                      </span>

                      <h3 className="font-serif text-3xl font-normal text-[var(--theme-text)] mb-3">
                        Thank You, {formData.fullName}.
                      </h3>

                      <p className="text-sm text-[var(--theme-text-muted)] max-w-md mx-auto leading-relaxed mb-6 font-light">
                        Your consultation brief for <strong className="text-[var(--theme-text)]">{formData.service}</strong> has been transmitted directly to our advisory desk.
                      </p>

                      <div className="max-w-xs mx-auto p-4 rounded-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] text-left mb-8">
                        <div className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Advisory Reference Number
                        </div>
                        <div className="text-sm font-mono font-bold text-[var(--theme-accent)]">
                          {submittedRef}
                        </div>
                        <div className="text-[11px] text-[var(--theme-text-muted)] mt-2 pt-2 border-t border-[var(--theme-border)]">
                          Expected Response: <span className="text-[var(--theme-text)] font-medium">Within 4 Business Hours</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2.5 rounded-sm bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-elevated)] border border-[var(--theme-border)] text-xs font-semibold tracking-wider uppercase text-[var(--theme-text)] transition-colors cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                        <Link
                          href="/"
                          className="px-6 py-2.5 rounded-sm bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                        >
                          Return to Home
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Direct Advisory Desks & Concierge Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Direct Contact Points */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] block mb-1">
                  OFFICIAL CORRESPONDENCE
                </span>
                <h2 className="font-serif text-2xl text-[var(--theme-text)] font-normal">
                  Chambers &amp; Direct Desks
                </h2>
              </div>

              {/* Direct Mail Channel with 1-Click Copy */}
              <div className="p-5 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-sm bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-text-muted)] block mb-0.5">
                        Central Inquiries Desk
                      </span>
                      <a
                        href="mailto:sales@avodahgroup.co"
                        className="text-base font-medium text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors block"
                      >
                        sales@avodahgroup.co
                      </a>
                      <span className="text-xs text-[var(--theme-text-muted)] font-light mt-0.5 block">
                        Direct routing to all practice heads
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyEmail("sales@avodahgroup.co")}
                    className="p-2 rounded hover:bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail === "sales@avodahgroup.co" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Telephone & Concierge Desk */}
              <div className="p-5 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-text-muted)] block mb-0.5">
                      Direct Advisory Concierge
                    </span>
                    <a
                      href="tel:+919820084721"
                      className="text-base font-medium text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors block"
                    >
                      +91 98200 84721
                    </a>
                    <span className="text-xs text-[var(--theme-text-muted)] font-light mt-0.5 block">
                      Monday to Saturday • 09:30 – 19:30 IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Mumbai Headquarters */}
              <div className="p-5 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-sm bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-text-muted)] block mb-0.5">
                      Executive Chambers
                    </span>
                    <span className="text-sm font-medium text-[var(--theme-text)] block">
                      AVODAH &amp; KHEN LLP
                    </span>
                    <span className="text-xs text-[var(--theme-text-muted)] font-light mt-0.5 block leading-relaxed">
                      Mumbai Metropolitan Region (MMR), Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Practice Specialized Desks */}
              <div className="pt-4 border-t border-[var(--theme-border)] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] block mb-2">
                  DIRECT PRACTICE ROUTING
                </span>
                
                {[
                  { title: "Developer Sole Selling Mandates", email: "mandates@avodahgroup.co" },
                  { title: "Commercial Leasing & Tenant Rep", email: "leasing@avodahgroup.co" },
                  { title: "Private Wealth & Capital Markets", email: "invest@avodahgroup.co" },
                ].map((desk) => (
                  <div key={desk.email} className="flex items-center justify-between text-xs py-1">
                    <span className="text-[var(--theme-text)] font-light">{desk.title}</span>
                    <a
                      href={`mailto:${desk.email}`}
                      className="text-[var(--theme-accent)] font-mono hover:underline"
                    >
                      {desk.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Security Commitment Badge */}
            <div className="p-6 rounded-sm bg-[var(--theme-tag-bg)] border border-[var(--theme-border)]">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="text-xs font-semibold text-[var(--theme-text)] uppercase tracking-wider">
                  Guaranteed Confidentiality
                </span>
              </div>
              <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-light">
                All development plans, financial forecasts, and proprietary tenant briefs are treated with institutional discretion under bilateral confidentiality covenants.
              </p>
            </div>

          </div>
        </div>

        {/* Micro-Markets Covered Across Mumbai */}
        <div className="mb-20 pt-16 border-t border-[var(--theme-border)]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] block mb-2">
              GEOGRAPHIC COVERAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--theme-text)] mb-3">
              Mumbai Micro-Market Chambers
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light">
              Deep on-ground transaction intelligence across premier residential, commercial, and redevelopment corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MICRO_MARKETS.map((market, idx) => (
              <WobblyCard key={market.region} className="p-6 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--theme-accent)] tracking-widest uppercase block mb-2">
                    CORRIDOR 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-normal text-[var(--theme-text)] mb-2">
                    {market.region}
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed mb-4">
                    {market.focus}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] font-mono text-[var(--theme-accent)]">
                  <span>{market.footprint}</span>
                  <Compass className="w-3.5 h-3.5 opacity-80" />
                </div>
              </WobblyCard>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto pt-16 border-t border-[var(--theme-border)]">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] block mb-2">
              ENGAGEMENT PROTOCOLS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--theme-text)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-sm border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-[var(--theme-text)] pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--theme-accent)] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-[var(--theme-text-muted)] leading-relaxed font-light border-t border-[var(--theme-border)]/50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
