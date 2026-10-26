"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const emptySubscribe = () => () => {};

export default function Footer() {
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isLight = mounted && theme === "light";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--theme-bg-secondary)] border-t border-[var(--theme-border)] pt-20 pb-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col">
            <Link href="#hero" className="flex items-center gap-3.5 mb-6 group">
              <div className="relative flex items-center shrink-0">
                <Image
                  src="/assets/avodah-khen-logo.png"
                  alt="AVODAH & KHEN LLP"
                  width={140}
                  height={48}
                  className={`h-9 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    isLight ? "filter brightness-90 contrast-125" : "filter brightness-105"
                  }`}
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed max-w-sm mb-6 font-light">
              AVODAH &amp; KHEN LLP provides technology-driven real estate solutions, structured sole selling developer mandates, commercial leasing advisory, and institutional market intelligence across Mumbai.
            </p>

            <span className="text-[11px] font-mono tracking-widest text-[var(--theme-accent)] uppercase">
              20+ YEARS DOMAIN EXPERIENCE
            </span>
          </div>

          {/* Mandates & Advisory Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.22em] text-[var(--theme-accent)] uppercase mb-6">
              Mandates &amp; Advisory
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Sole Selling Mandates", href: "/mandate" },
                { name: "Commercial Leasing Advisory", href: "/leasing-and-investment-advisory" },
                { name: "Real Estate Investment Sourcing", href: "#services" },
                { name: "Portfolio & Asset Optimization", href: "#services" },
                { name: "Developer Marketing Systems", href: "#services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Platforms */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.22em] text-[var(--theme-accent)] uppercase mb-6">
              Technology &amp; Data
            </h4>
            <ul className="space-y-3">
              {[
                { name: "AI Voice Bot", href: "/ai-voice-bot" },
                { name: "PropTech Platform", href: "/proptech" },
                { name: "FinTech Models", href: "/fintech" },
                { name: "Research & Intelligence", href: "/research" },
                { name: "Who We Are", href: "/who-we-are" },
                { name: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels & Market Intelligence Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.22em] text-[var(--theme-accent)] uppercase mb-4">
              Headquarters
            </h4>
            <div className="space-y-2 text-xs text-[var(--theme-text-muted)] font-light mb-6">
              <p className="text-[var(--theme-text)] font-medium">sales@avodahgroup.co</p>
              <p>Mumbai, Maharashtra, India</p>
              <p>Mon — Fri: 09:30 - 18:30</p>
            </div>

            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[var(--theme-accent)] uppercase mb-2">
              Market Intelligence
            </h4>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.elements.namedItem("footerEmail") as HTMLInputElement;
                if (!emailInput?.value) return;
                try {
                  const res = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailInput.value.trim().toLowerCase(), source: "footer" }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.success) {
                    throw new Error(data.error || "Subscription failed.");
                  }
                  emailInput.value = "";
                  alert("Thank you for subscribing to Avodah & Khen market dispatches.");
                } catch (err: unknown) {
                  alert(err instanceof Error ? err.message : "Subscription failed. Please try again.");
                }
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                name="footerEmail"
                required
                placeholder="Corporate Email"
                className="w-full px-3 py-1.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-xs text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)] outline-none"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-[10px] uppercase tracking-widest rounded-sm hover:brightness-110 transition-colors shadow-sm cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-block text-[11px] text-[var(--theme-accent)] hover:underline font-mono tracking-wider uppercase font-semibold"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="border-t border-[var(--theme-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[var(--theme-text-muted)] tracking-wider font-light">
            &copy; 2026 AVODAH &amp; KHEN LLP. All rights reserved. Registered Real Estate Advisory Firm.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://avodah-khen-website-frontend.vercel.app/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors"
            >
              Reference Portal
            </a>
            <Link href="#contact" className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors">
              Privacy Notice
            </Link>
            <Link href="#contact" className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors">
              Terms of Engagement
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--theme-accent)] hover:text-[var(--theme-text)] transition-colors group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
