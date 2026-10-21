"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Mandates & Advisory", href: "#services" },
    { name: "PropTech", href: "#ecosystem" },
    { name: "Intelligence", href: "#research" },
    { name: "Contact", href: "#contact" },
  ];

  const isLight = mounted && theme === "light";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--theme-nav-scrolled)] backdrop-blur-xl border-b border-[var(--theme-border)] shadow-xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand Wordmark */}
          <Link href="#hero" className="flex items-center gap-3.5 group">
            <div className="relative flex items-center justify-center shrink-0 w-10 h-10" style={{ position: "relative", width: "40px", height: "40px" }}>
              <Image
                src="/assets/avodah-khen-logo.png"
                alt="AVODAH & KHEN LLP Logo"
                width={40}
                height={40}
                className={`object-contain transition-all duration-300 ${
                  isLight ? "filter brightness-90 contrast-125" : "filter brightness-105"
                }`}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.2em] text-[var(--theme-text)] uppercase group-hover:text-[var(--theme-accent)] transition-colors">
                AVODAH &amp; KHEN
              </span>
              <span className="text-[10px] tracking-[0.28em] text-[var(--theme-accent)] uppercase font-semibold">
                LLP • Real Estate Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-xs tracking-[0.14em] uppercase font-medium text-[var(--theme-text)] opacity-80 hover:opacity-100 py-1 transition-all group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--theme-accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className="relative p-2.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLight ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-[#8C6D41]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-[#D4AF37]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Direct Contact CTA */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[var(--theme-accent)]/50 bg-[var(--theme-accent)]/10 hover:bg-[var(--theme-accent)] text-[var(--theme-accent)] hover:text-white dark:hover:text-[#0c0d0c] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--theme-surface)]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden border-l border-[var(--theme-border)] text-[var(--theme-text)]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-[var(--theme-border)] pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                  Theme Appearance
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--theme-border)] text-xs text-[var(--theme-text)]"
                >
                  {isLight ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#8C6D41]" />
                      <span>Light Active</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Dark Active</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] block mb-2 font-semibold">
                Direct Inquiry
              </span>
              <p className="text-sm text-[var(--theme-text)] opacity-80 mb-6">
                Mumbai Metropolitan Region<br />
                sales@avodahgroup.co
              </p>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-semibold text-xs uppercase tracking-widest text-center block rounded-sm shadow-lg hover:brightness-110"
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
