"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import FeralBlobShowcase, { FeralTheme } from "@/components/feral/FeralBlobShowcase";

interface LaunchingSoonClientProps {
  type: "proptech" | "fintech";
}

export default function LaunchingSoonClient({ type }: LaunchingSoonClientProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isProptech = type === "proptech";
  const theme: FeralTheme = isProptech ? "proptech" : "fintech";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  const content = isProptech
    ? {
        badge: "PROPTECH ECOSYSTEM // INITIALIZATION ALPHA",
        title: "The Intelligent Real Estate Operating System Is Launching Soon.",
        subtitle: "A connected platform for property discovery, automated developer mandates, high-velocity CRM, and spatial AI intelligence.",
        targetDate: "TARGET RELEASE // Q1 2027",
        primaryColor: "#C9A97C",
        accentGlow: "rgba(201, 169, 124, 0.16)",
      }
    : {
        badge: "FINTECH PROTOCOL // CLOSED INSTITUTIONAL BETA",
        title: "Algorithmic Real Estate Capital & Underwriting Intelligence.",
        subtitle: "Bridging institutional liquidity and Grade-A developer debt with machine-speed risk assessment, fractional syndication, and transparent escrow rails.",
        targetDate: "TARGET RELEASE // Q1 2027",
        primaryColor: "#38BDF8",
        accentGlow: "rgba(56, 189, 248, 0.16)",
      };

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 md:pt-22 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-14 text-[var(--theme-text)] select-none">
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-70"
        style={{ backgroundColor: content.accentGlow }}
      />

      {/* Main Visible Hero Region: Side-by-Side Split Screen on Desktop */}
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto min-h-0 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
          {/* Left Column: Switcher, Headline, Narrative, and Early Access Whitelist Form */}
          <div className="md:col-span-7 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            {/* Navigation Switcher Pill */}
            <div className="inline-flex p-1 rounded-full bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] shadow-sm backdrop-blur-xl mb-3 sm:mb-4">
              <Link
                href="/proptech"
                className={`px-3.5 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all ${
                  isProptech
                    ? "bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] shadow-sm"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                }`}
              >
                PropTech Platform
              </Link>
              <Link
                href="/fintech"
                className={`px-3.5 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all ${
                  !isProptech
                    ? "bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] shadow-sm"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                }`}
              >
                FinTech Capital Engine
              </Link>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] text-[10px] sm:text-[11px] font-mono tracking-widest text-[var(--theme-accent)] mb-2.5 sm:mb-3">
              <Terminal className="w-3 h-3 shrink-0" />
              <span>{content.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-[1.12] mb-2 sm:mb-3 max-w-2xl text-[var(--theme-text)]">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-[var(--theme-text-muted)] font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
              {content.subtitle}
            </p>

            {/* VIP Early Access Whitelist Form */}
            <div className="w-full max-w-md mb-3 sm:mb-4">
              {submitted ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center md:justify-start gap-2 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You are on the priority whitelist! Verification queued.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email for early access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 sm:py-2.5 rounded-xl bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] placeholder-[var(--theme-text-faint)] focus:outline-none focus:border-[var(--theme-accent)] backdrop-blur-md transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Docked Meta Info / Status Bar */}
            <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[var(--theme-text-muted)] pt-2.5 border-t border-[var(--theme-border)]/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: content.primaryColor }} />
                <span>{content.targetDate}</span>
              </div>

              <a
                href="https://avodah-khen-website-frontend.vercel.app/#/contact"
                className="text-[var(--theme-accent)] hover:underline font-medium flex items-center gap-0.5"
              >
                <span>Discuss Early Integration</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: The Pure Feral UI Jelly Blob Mascot on the Side of the Screen */}
          <div className="md:col-span-5 flex items-center justify-center relative w-full py-2 md:py-0">
            {/* Soft backdrop pedestal glow */}
            <div
              className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60"
              style={{ backgroundColor: content.accentGlow }}
            />
            <FeralBlobShowcase theme={theme} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
