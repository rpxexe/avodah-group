"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service || "Sole Selling Mandate",
      message: formData.message.trim(),
      source: "homepage",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setIsSubmitted(true);
      setSubmittedRef(data.referenceCode);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error("[CONTACT_SUBMIT_ERROR]", err);
      setFormError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  LET’S CONNECT
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--theme-text)] leading-tight mb-6 tracking-tight">
                Let’s build the future of real estate.
              </h2>

              <p className="text-sm sm:text-base text-[var(--theme-text-muted)] leading-relaxed font-light mb-10">
                Partner with us for property mandates, technology, lead generation, CRM, AI and sales execution.
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
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
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
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
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
                        name="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
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
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us a little about your project location, scale, or specific requirements..."
                      className="w-full px-4 py-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-sm text-sm text-[var(--theme-text)] focus:border-[var(--theme-accent)] outline-none transition-all resize-y placeholder:text-[var(--theme-text-muted)] opacity-90"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-400">
                      {formError}
                    </div>
                  )}

                  {!isSubmitted ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[var(--theme-accent)]/20 disabled:opacity-60 cursor-pointer"
                    >
                      <span>
                        {isSubmitting ? "Transmitting to Database..." : "Submit Consultation Request"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-5 bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/40 rounded-sm flex flex-col gap-2 text-center items-center justify-center">
                      <div className="flex items-center gap-2 text-[var(--theme-accent)] font-semibold text-xs tracking-wider uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Advisory Request Logged</span>
                      </div>
                      {submittedRef && (
                        <span className="font-mono text-xs px-2.5 py-1 bg-[var(--theme-tag-bg)] border border-[var(--theme-border)] rounded text-[var(--theme-text)] font-semibold">
                          Reference: #{submittedRef}
                        </span>
                      )}
                      <p className="text-xs text-[var(--theme-text)] font-light leading-relaxed mt-1">
                        Thank you. An advisory principal from Avodah &amp; Khen LLP will review your requirements and respond shortly.
                      </p>
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
