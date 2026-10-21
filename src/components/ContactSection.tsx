"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[var(--theme-bg)] relative z-10 border-b border-[var(--theme-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--theme-accent)] font-semibold">
                  Engage Our Team
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-6 tracking-tight">
                Have a property opportunity or mandate requirement?
              </h2>

              <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light mb-10">
                Partner with AVODAH &amp; KHEN to bring structure, accountability, and strategic direction to your project sales and real estate investments.
              </p>

              {/* Direct Channels */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] rounded-sm text-[var(--theme-accent)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-[var(--theme-text-muted)] uppercase font-semibold block mb-0.5">
                      Direct Correspondence
                    </span>
                    <a
                      href="mailto:sales@avodahgroup.co"
                      className="text-base text-[var(--theme-text)] hover:text-[var(--theme-accent)] font-medium transition-colors"
                    >
                      sales@avodahgroup.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] rounded-sm text-[var(--theme-accent)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-[var(--theme-text-muted)] uppercase font-semibold block mb-0.5">
                      Headquarters
                    </span>
                    <span className="text-sm text-[var(--theme-text)] opacity-90 font-medium">
                      Mumbai Metropolitan Region, Maharashtra, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] rounded-sm text-[var(--theme-accent)]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-[var(--theme-text-muted)] uppercase font-semibold block mb-0.5">
                      Institutional Network
                    </span>
                    <span className="text-sm text-[var(--theme-text)] opacity-90 font-medium">
                      LinkedIn • Instagram • WhatsApp Business
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--theme-border)] mt-12">
              <span className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider block">
                CONFIDENTIALITY GUARANTEED • REAL ESTATE ADVISORY
              </span>
            </div>
          </motion.div>

          {/* Right Luxury Form (3D Tilt Container) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <Card3DTilt intensity={8}>
              <div className="p-8 sm:p-12 rounded-sm bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] shadow-[var(--theme-card-shadow)] relative">
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--theme-text)] font-normal mb-2">
                  Start a Conversation
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light mb-8">
                  Please share the details of your inquiry and an advisory principal will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="e.g. Ananya Mehta"
                        className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)] opacity-90"
                      />
                    </div>

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
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)] opacity-90"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                      >
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all placeholder:text-[var(--theme-text-muted)] opacity-90"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                      >
                        Service Area *
                      </label>
                      <select
                        id="service"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all"
                      >
                        <option value="" disabled>
                          Select an advisory service...
                        </option>
                        <option value="Sole Selling Mandate">Sole Selling Developer Mandate</option>
                        <option value="Commercial Leasing">Commercial Leasing Advisory</option>
                        <option value="Investment Advisory">Real Estate Investment Advisory</option>
                        <option value="Portfolio Advisory">Portfolio &amp; Asset Optimization</option>
                        <option value="PropTech Solutions">PropTech Platform Partnerships</option>
                        <option value="General Inquiry">General Corporate Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-semibold tracking-wider uppercase text-[var(--theme-text)] opacity-80 mb-2"
                    >
                      Project Details / Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us a little about your project location, scale, or specific requirements..."
                      className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all resize-y placeholder:text-[var(--theme-text-muted)] opacity-90"
                    />
                  </div>

                  {!isSubmitted ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[var(--theme-accent)]/20 disabled:opacity-60"
                    >
                      <span>
                        {isSubmitting ? "Transmitting Information..." : "Submit Consultation Request"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-4 bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/40 rounded-sm flex items-center gap-3 text-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)]" />
                      <span className="text-xs text-[var(--theme-text)] font-medium tracking-wider">
                        Thank you. An advisory principal from Avodah &amp; Khen LLP will be in touch shortly.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </Card3DTilt>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
