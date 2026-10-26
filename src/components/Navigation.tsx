"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import ThemeToggleSwitch from "@/components/ThemeToggleSwitch";
import { useTheme } from "@/context/ThemeContext";

const emptySubscribe = () => () => { };

interface SubMenuItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

interface NavGroup {
  name: string;
  dropdown?: SubMenuItem[];
  href?: string;
}

const NAV_GROUPS: NavGroup[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    dropdown: [
      {
        name: "Mandate",
        href: "/mandate",
        description: "Sole selling developer partnerships & GTM velocity",
      },
      {
        name: "PropTech",
        href: "/proptech",
        description: "Digital discovery portal & sales velocity engine",
        badge: "Soon",
      },
      {
        name: "FinTech",
        href: "/fintech",
        description: "Algorithmic underwriting & capital intelligence",
        badge: "Soon",
      },
      {
        name: "AI Voice Bot",
        href: "/ai-voice-bot",
        description: "Autonomous real estate calling agent for lead qualification & site visits",
        badge: "Soon",
      },
      {
        name: "Leasing and Investment Advisory",
        href: "/leasing-and-investment-advisory",
        description: "Grade-A corporate leasing & portfolio capital advisory",
      },
    ],
  },
  {
    name: "Company",
    dropdown: [
      {
        name: "Who we are",
        href: "/who-we-are",
        description: "A technology-led real estate company built around one connected ecosystem",
      },
      {
        name: "Leadership",
        href: "/#about",
        description: "20+ years domain pedigree & executive team",
      },
      {
        name: "Careers",
        href: "/careers",
        description: "Join our discreet cadre of dealmakers & engineers",
        badge: "Hiring",
      },
    ],
  },
  {
    name: "Research",
    href: "/research",
  },

];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>("Services");

  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = mounted && theme === "light";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "py-2.5 sm:py-3 bg-[var(--theme-nav-scrolled)]/95 backdrop-blur-2xl border-b border-[var(--theme-border)] shadow-xl"
            : "py-3 sm:py-3.5 bg-[var(--theme-surface-glass)]/90 backdrop-blur-xl border-b border-[var(--theme-border)]/70 shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo & Brand Wordmark */}
          <Link href="/" className="flex items-center group py-0.5">
            <div className="relative flex items-center shrink-0">
              <Image
                src="/assets/avodah-khen-logo.png"
                alt="AVODAH & KHEN LLP Logo"
                width={200}
                height={70}
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${scrolled ? "h-8 sm:h-9 md:h-10" : "h-10 sm:h-11 md:h-12"
                  } ${isLight ? "filter brightness-90 contrast-125" : "filter brightness-105"
                  }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links with Dropdown Menus */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_GROUPS.map((item) => {
              if (item.dropdown) {
                const isOpen = activeDropdown === item.name;
                return (
                  <div
                    key={item.name}
                    className="relative group py-2"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : item.name)}
                      className="flex items-center gap-1.5 text-[13px] xl:text-sm tracking-[0.14em] uppercase font-semibold text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[var(--theme-accent)]" : "opacity-70 group-hover:text-[var(--theme-accent)]"
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu Panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 pt-2 z-50 min-w-[280px] sm:min-w-[320px]"
                        >
                          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/98 backdrop-blur-2xl shadow-2xl p-2.5 overflow-hidden">
                            <div className="space-y-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group/item flex flex-col p-2.5 rounded-lg hover:bg-[var(--theme-surface-elevated)] transition-all duration-200"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold tracking-wider text-[var(--theme-text)] group-hover/item:text-[var(--theme-accent)] transition-colors uppercase">
                                      {subItem.name}
                                    </span>
                                    {subItem.badge && (
                                      <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[var(--theme-text-muted)] font-light leading-relaxed mt-0.5 group-hover/item:text-[var(--theme-text)] transition-colors">
                                    {subItem.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href || "/"}
                  className="relative text-[13px] xl:text-sm tracking-[0.14em] uppercase font-semibold text-[var(--theme-text)] hover:text-[var(--theme-accent)] py-1.5 transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--theme-accent)] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Switch */}
            <ThemeToggleSwitch variant="header" />

            {/* Direct Contact CTA - High-contrast solid accent */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--theme-surface)]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-24 sm:pt-28 lg:hidden border-l border-[var(--theme-border)] text-[var(--theme-text)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {NAV_GROUPS.map((item) => {
                if (item.dropdown) {
                  const isExpanded = mobileExpandedGroup === item.name;
                  return (
                    <div key={item.name} className="border-b border-[var(--theme-border)]/50 pb-3">
                      <button
                        onClick={() =>
                          setMobileExpandedGroup(isExpanded ? null : item.name)
                        }
                        className="w-full flex items-center justify-between font-serif text-2xl text-[var(--theme-text)] hover:text-[var(--theme-accent)] py-1.5 transition-colors text-left cursor-pointer"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[var(--theme-accent)]" : "opacity-60"
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-3 pt-2 space-y-2 overflow-hidden"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors"
                              >
                                <span className="font-semibold text-xs tracking-wider uppercase text-[var(--theme-text)]">
                                  {subItem.name}
                                </span>
                                <span className="block text-[11px] text-[var(--theme-text-muted)] font-light">
                                  {subItem.description}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href || "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl text-[var(--theme-text)] hover:text-[var(--theme-accent)] py-1.5 border-b border-[var(--theme-border)]/50 transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-[var(--theme-border)] pt-6 mt-6">
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-md mb-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                    Theme Appearance
                  </span>
                  <span className="text-[10px] text-[var(--theme-text-muted)] font-mono mt-0.5">
                    7 AM–7 PM Light • 7 PM–7 AM Dark
                  </span>
                </div>
                <ThemeToggleSwitch variant="drawer" showScheduleHint={false} />
              </div>

              <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] block mb-1 font-semibold">
                Direct Inquiry
              </span>
              <p className="text-xs text-[var(--theme-text)] opacity-80 mb-4">
                sales@avodahgroup.co • BKC, Mumbai
              </p>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-semibold text-xs uppercase tracking-widest text-center block rounded-sm shadow-lg hover:brightness-110 cursor-pointer"
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
