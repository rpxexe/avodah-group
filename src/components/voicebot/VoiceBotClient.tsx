"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  PhoneIncoming,
  Mic,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck,
  Bot,
  Calendar,
  MessageSquare,
  Building2,
  ArrowUpRight,
  BarChart3,
  Database,
  Sliders,
  Send,
  Plus,
  Minus,
  Sparkle,
  PhoneForwarded,
} from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";
import WobblyCard from "@/components/WobblyCard";

interface CallDialogue {
  speaker: "ai" | "buyer";
  name: string;
  time: string;
  text: string;
  sentiment?: string;
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  badge: string;
  leadName: string;
  leadBudget: string;
  dialogue: CallDialogue[];
  telemetry: {
    latency: string;
    intent: string;
    sentimentScore: string;
    outcome: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "luxury-residence",
    title: "Luxury Penthouse Qualification",
    category: "High-End Residential",
    badge: "Active Mandate",
    leadName: "Vikram Singhania",
    leadBudget: "₹18 Cr – ₹22 Cr",
    telemetry: {
      latency: "375ms",
      intent: "Site Visit Confirmed",
      sentimentScore: "0.96 (High Intent)",
      outcome: "Calendar Invite & WhatsApp Pass Dispatched",
    },
    dialogue: [
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:02",
        text: "Good afternoon Vikram! Thank you for inquiring about The Grand Skyview at Worli Sea Face. Are you looking for a 3 or 4 BHK residence for your family?",
      },
      {
        speaker: "buyer",
        name: "Vikram Singhania",
        time: "00:08",
        text: "Hi Aria, yes. We're looking for a 4 BHK duplex with unobstructed sea views. What is the approximate carpet area and handover timeline?",
        sentiment: "Curious • Direct",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:15",
        text: "The duplex penthouses in Tower A offer 4,200 sq.ft RERA carpet with private elevator lobbies. Handover is scheduled for Q2 2027. Pricing begins at ₹19.5 Crores. We have an executive sample suite ready on-site. Would this Saturday at 11:30 AM or Sunday at 4:00 PM suit you better for a private preview?",
      },
      {
        speaker: "buyer",
        name: "Vikram Singhania",
        time: "00:26",
        text: "Saturday 11:30 AM works well. Can you send the floorplans and location pin directly to my WhatsApp?",
        sentiment: "High Intent • Committed",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:32",
        text: "Consider it done, Vikram! I've confirmed Saturday at 11:30 AM with Senior Partner Rohit Mehta and dispatched the floorplans with your executive gate pass directly to your WhatsApp. Looking forward to welcoming you!",
      },
    ],
  },
  {
    id: "commercial-leasing",
    title: "Grade-A Corporate Office Leasing",
    category: "Commercial Advisory",
    badge: "Enterprise",
    leadName: "Ananya Deshmukh",
    leadBudget: "25,000 sq.ft • ₹320/sq.ft",
    telemetry: {
      latency: "390ms",
      intent: "Technical RFP Meeting Booked",
      sentimentScore: "0.92 (Institutional)",
      outcome: "NDA & Floorplate Dossier Transmitted",
    },
    dialogue: [
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:02",
        text: "Hello Ananya, this is Aria from Avodah & Khen Commercial Advisory. I received your inquiry regarding prime office space in the BKC corridor. Is your team seeking bare-shell or fully fitted floorplates?",
      },
      {
        speaker: "buyer",
        name: "Ananya Deshmukh",
        time: "00:09",
        text: "Hi Aria, our tech venture is expanding. We need roughly 25,000 square feet, warm-shell or plug-and-play, with minimum 1:100 parking ratio and LEED Gold certification.",
        sentiment: "Institutional • Specific Requirements",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:18",
        text: "Understood! We currently hold an exclusive mandate for two contiguous floorplates totaling 28,000 sq.ft at Horizon One, BKC. It features Platinum IGBC rating, 1:85 parking allocation, and dual-power redundancy. Our Head of Commercial Leasing, Mr. Aryan Sen, can walk you through the lease terms. Does Thursday at 3:00 PM work for a virtual walk-through?",
      },
      {
        speaker: "buyer",
        name: "Ananya Deshmukh",
        time: "00:29",
        text: "Thursday 3 PM is great. Please send the tenant pack and lease commercial summary to my corporate email.",
        sentiment: "Engaged • Ready to Review",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:34",
        text: "The full architectural dossier, leasing deck, and calendar invite have been transmitted to your inbox. We look forward to connecting Thursday at 3 PM!",
      },
    ],
  },
  {
    id: "nri-investor",
    title: "Cross-Border NRI Capital Deployment",
    category: "NRI Wealth",
    badge: "Cross-Border",
    leadName: "Dr. Kabir Roy (London)",
    leadBudget: "₹10 Cr – ₹15 Cr",
    telemetry: {
      latency: "410ms",
      intent: "Virtual Video Walkthrough Scheduled",
      sentimentScore: "0.95 (Defensive Yield Focus)",
      outcome: "FEMA Compliance Guide & Drone Feed Sent",
    },
    dialogue: [
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:02",
        text: "Good evening Dr. Roy! Thank you for reaching out from the UK regarding pre-leased commercial assets in Mumbai. Are you targeting defensive rental yield or capital appreciation?",
      },
      {
        speaker: "buyer",
        name: "Dr. Kabir Roy",
        time: "00:08",
        text: "Hello Aria. I'm looking for a solid 8.5% plus net rental yield with a Grade-A multinational tenant on a 9-year lock-in. What are my repatriation options?",
        sentiment: "Analytical • Yield Sensitive",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:16",
        text: "Certainly Dr. Roy. We have institutional pre-leased assets in Lower Parel leased to a global financial firm offering an 8.8% in-place yield with a 5-year remaining lock-in. Rental proceeds flow directly through NRE/NRO accounts with full FEMA repatriation compliance. I can schedule a 1-on-1 virtual walkthrough with our investment principal this Sunday at 2:30 PM GMT. Shall I lock that for you?",
      },
      {
        speaker: "buyer",
        name: "Dr. Kabir Roy",
        time: "00:28",
        text: "Yes, Sunday 2:30 PM London time is perfect. Please send the tenant lease deed summary and ROI model.",
        sentiment: "Satisfied • Moving to Due Diligence",
      },
      {
        speaker: "ai",
        name: "Aria (Avodah AI)",
        time: "00:34",
        text: "The complete investment memo, yield spreadsheet, and calendar invite have been sent to your WhatsApp and email. Have a wonderful evening in London!",
      },
    ],
  },
];

export default function VoiceBotClient() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // ROI Calculator State
  const [leadVolume, setLeadVolume] = useState<number>(1500);

  // Form State
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formProject, setFormProject] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Call simulation playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < selectedScenario.dialogue.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, selectedScenario.dialogue.length]);

  const handleScenarioChange = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStepIndex >= selectedScenario.dialogue.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Dynamic ROI computations based on lead volume
  const speedToLeadHoursSaved = Math.round(leadVolume * 0.45);
  const incrementalSiteVisits = Math.round(leadVolume * 0.18);
  const costSavingsLakhs = Math.round((leadVolume * 140) / 100000 * 10) / 10;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formPhone) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName || "Developer Prospect",
          email: formEmail,
          phone: formPhone,
          company: formCompany,
          message: `Interested in AI Voice Bot Deployment for project: ${formProject || "General Inquiry"}. Estimated Leads: ${leadVolume}/month`,
          source: "ai-voice-bot-page",
        }),
      });

      if (res.ok) {
        setFormSuccess(true);
      }
    } catch (err) {
      console.error("Voice bot inquiry submit failed:", err);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative z-20 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--theme-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-text-faint)]">SERVICES</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-accent)] font-semibold">AI VOICE BOT</span>
        </div>

        {/* SECTION 1: HERO HEADER */}
        <section className="relative mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
              AUTONOMOUS VOICE AGENT • 24/7 CALLING
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--theme-text)] leading-[1.08] max-w-5xl mb-6">
            Autonomous Voice Agents That{" "}
            <span className="italic font-normal text-[var(--theme-accent)]">
              Call, Qualify &amp; Convert
            </span>{" "}
            Real Estate Leads.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--theme-text-muted)] font-light max-w-3xl leading-relaxed mb-8">
            Engage inbound property inquiries within 10 seconds. Our human-parity voice AI qualifies buyer budgets, configurations, and purchase timelines—autonomously scheduling verified site visits directly into your sales team&apos;s calendars.
          </p>
    
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/80 backdrop-blur-md shadow-sm mb-12">
            <div>
              <span className="text-xl text-[var(--theme-accent)] font-mono">&lt; 10s</span>
              <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase mt-1">
                Speed to Lead
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Instant portal response</p>
            </div>
            <div>
              <span className="text-xl text-[var(--theme-accent)] font-mono">380ms</span>
              <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase mt-1">
                Audio Latency
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Ultra-natural human cadence</p>
            </div>
            <div>
              <span className="text-xl text-[var(--theme-accent)] font-mono">68%</span>
              <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase mt-1">
                Visit Booking
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">On qualified inbound intent</p>
            </div>
            <div>
              <span className="text-xl text-[var(--theme-accent)] font-mono">24 / 7</span>
              <p className="text-xs font-mono font-bold tracking-wider text-[var(--theme-text)] uppercase mt-1">
                Active Uptime
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">Zero leads left overnight</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE LIVE VOICE BOT SIMULATOR */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-[var(--theme-border)] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-5 h-[1.5px] bg-[var(--theme-accent)]" />
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--theme-accent)] font-semibold">
                  INTERACTIVE AUDIO CONSOLE
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
                Experience A Live Call Simulation.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light max-w-md">
              Switch between buyer scenarios to see how Aria qualifies intent, answers property specifications, and schedules private site tours in real-time.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {SCENARIOS.map((sc) => {
              const isSelected = selectedScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold shadow-md shadow-[var(--theme-accent)]/20"
                      : "bg-[var(--theme-surface-glass)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text)]"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>{sc.title}</span>
                  <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                    {sc.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Console Box: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Console: Simulated Audio Player & Telemetry */}
            <div className="lg:col-span-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-2xl p-6 sm:p-7 shadow-xl">
              
              {/* Call Header */}
              <div className="flex items-center justify-between border-b border-[var(--theme-border)]/70 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/50 flex items-center justify-center text-[var(--theme-accent)]">
                      <PhoneCall className="w-5 h-5 animate-pulse" />
                    </div>
                    {isPlaying && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[var(--theme-surface)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[var(--theme-text)]">
                      Aria Voice Agent
                    </h3>
                    <p className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                      Calling: {selectedScenario.leadName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold block">
                    {isPlaying ? "CALL LIVE" : "READY"}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--theme-text-faint)] mt-1 block">
                    HD 24kHz
                  </span>
                </div>
              </div>

              {/* Dynamic Audio Equalizer Bars */}
              <div className="py-6 px-4 rounded-xl bg-black/10 dark:bg-black/30 border border-[var(--theme-border)]/50 mb-6 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-1.5 h-14 w-full">
                  {[4, 12, 24, 40, 18, 32, 48, 22, 38, 54, 28, 44, 16, 30, 46, 20, 36, 10, 26, 42, 14, 28].map(
                    (baseHeight, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 rounded-full bg-[var(--theme-accent)]"
                        animate={{
                          height: isPlaying ? [baseHeight * 0.4, baseHeight, baseHeight * 0.3] : 6,
                          opacity: isPlaying ? [0.6, 1, 0.5] : 0.25,
                        }}
                        transition={{
                          duration: 0.5 + (i % 5) * 0.15,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    )
                  )}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] mt-3">
                  {isPlaying ? "Synthesizing Neural Speech Stream" : "Audio Simulator Paused"}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={handleRestart}
                  className="p-3 rounded-full border border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-all cursor-pointer"
                  title="Restart Call"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="px-6 py-3 rounded-full bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>{currentStepIndex > 0 ? "Resume Call" : "Simulate Call"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Telemetry Panel */}
              <div className="border-t border-[var(--theme-border)]/70 pt-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Voice Latency:
                  </span>
                  <span className="text-[var(--theme-accent)] font-semibold">
                    {selectedScenario.telemetry.latency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Buyer Sentiment:
                  </span>
                  <span className="text-[var(--theme-text)] font-semibold">
                    {selectedScenario.telemetry.sentimentScore}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Call Outcome:
                  </span>
                  <span className="text-emerald-500 font-semibold text-right max-w-[200px] truncate">
                    {selectedScenario.telemetry.intent}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Console: Live Transcript Dialogue Stream */}
            <div className="lg:col-span-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between min-h-[500px]">
              
              <div>
                <div className="flex items-center justify-between border-b border-[var(--theme-border)]/70 pb-4 mb-5">
                  <span className="text-xs uppercase tracking-widest font-mono text-[var(--theme-accent)] font-semibold flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Live Speech-to-Speech Transcript
                  </span>
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                    Turn {currentStepIndex + 1} of {selectedScenario.dialogue.length}
                  </span>
                </div>

                {/* Dialogue Scroll Stream */}
                <div className="space-y-4">
                  {selectedScenario.dialogue.slice(0, currentStepIndex + 1).map((turn, idx) => {
                    const isAi = turn.speaker === "ai";
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-xl border ${
                          isAi
                            ? "bg-[var(--theme-surface-elevated)] border-[var(--theme-border)]/80 ml-0 mr-8"
                            : "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]/30 ml-8 mr-0"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-xs font-semibold font-mono tracking-wider ${
                              isAi ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]"
                            }`}
                          >
                            {turn.name}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--theme-text-faint)]">
                            {turn.time}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--theme-text)] leading-relaxed font-light">
                          {turn.text}
                        </p>
                        {turn.sentiment && (
                          <div className="mt-2 text-[10px] font-mono text-[var(--theme-accent)] inline-flex items-center gap-1">
                            <Sparkle className="w-2.5 h-2.5" />
                            <span>{turn.sentiment}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Stepper & Action */}
              <div className="border-t border-[var(--theme-border)]/70 pt-4 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {selectedScenario.dialogue.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStepIndex(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i <= currentStepIndex
                          ? "w-6 bg-[var(--theme-accent)]"
                          : "w-2 bg-[var(--theme-border)]"
                      }`}
                      aria-label={`Jump to turn ${i + 1}`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-mono text-[var(--theme-accent)]">
                  {currentStepIndex === selectedScenario.dialogue.length - 1
                    ? "✓ Conversation Completed"
                    : "Conversation in progress..."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 6 ARCHITECTURAL PILLARS */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              ENTERPRISE CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] leading-tight">
              Engineered for High-Stakes Real Estate Transactions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "<10s Sub-Second Speed-to-Lead",
                desc: "Triggers calls within seconds of portal inquiry submission when buyer curiosity and buying intent are highest.",
              },
              {
                icon: Mic,
                title: "Ultra-Natural Speech Latency",
                desc: "380ms round-trip voice processing prevents unnatural pauses, robotic cadence, or awkward dead air.",
              },
              {
                icon: PhoneForwarded,
                title: "Intelligent Interruption Handling",
                desc: "Instantly halts speech and dynamically recalibrates when a buyer interjects, mirroring polite human etiquette.",
              },
              {
                icon: Database,
                title: "Real-Time Inventory Synchronization",
                desc: "Grounded directly into developer live inventory stacks to accurately quote remaining units, floor rise, and pricing.",
              },
              {
                icon: Calendar,
                title: "Autonomous Site Visit Booking",
                desc: "Secures confirmed calendar slots with closing managers, automatically sending WhatsApp passes and Google Maps coordinates.",
              },
              {
                icon: ShieldCheck,
                title: "Zero-Hallucination Guardrails",
                desc: "Strictly bounded to verified RERA brochures and pricing sheets; gracefully routes complex legal clauses to senior executives.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md p-6 hover:border-[var(--theme-accent)]/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[var(--theme-text)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE ROI & CONVERSION CALCULATOR */}
        <section className="mb-24 sm:mb-32 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/95 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Slider Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                  ROI &amp; VELOCITY CALCULATOR
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[var(--theme-text)]">
                  Measure the Impact on Your Project Mandate.
                </h2>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light mt-2">
                  See how autonomous calling replaces inefficient manual telecalling call centers while boosting site visit velocity.
                </p>
              </div>

              {/* Slider */}
              <div className="p-6 rounded-xl border border-[var(--theme-border)] bg-black/10 dark:bg-black/20 space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="lead-slider" className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text)] font-semibold">
                    Monthly Inbound Inquiries:
                  </label>
                  <span className="text-xl font-mono font-bold text-[var(--theme-accent)]">
                    {leadVolume.toLocaleString()} leads
                  </span>
                </div>

                <input
                  id="lead-slider"
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={leadVolume}
                  onChange={(e) => setLeadVolume(Number(e.target.value))}
                  className="w-full accent-[var(--theme-accent)] cursor-pointer h-2 bg-[var(--theme-border)] rounded-lg"
                />

                <div className="flex justify-between text-[10px] font-mono text-[var(--theme-text-muted)]">
                  <span>200 (Boutique)</span>
                  <span>5,000 (Multi-Tower)</span>
                  <span>10,000+ (Township Launch)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Yield Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] shadow-sm">
                <span className="text-[10px] font-mono uppercase text-[var(--theme-accent)] tracking-wider block mb-1">
                  Speed to Lead
                </span>
                <p className="font-serif text-3xl font-light text-[var(--theme-text)]">&lt; 10 sec</p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-light">
                  vs 4+ hours for traditional sales desks
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] shadow-sm">
                <span className="text-[10px] font-mono uppercase text-[var(--theme-accent)] tracking-wider block mb-1">
                  Extra Site Visits / Mo
                </span>
                <p className="font-serif text-3xl font-light text-emerald-500">
                  +{incrementalSiteVisits} visits
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-light">
                  High-intent pre-qualified buyers
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] shadow-sm">
                <span className="text-[10px] font-mono uppercase text-[var(--theme-accent)] tracking-wider block mb-1">
                  Calling Hours Saved
                </span>
                <p className="font-serif text-3xl font-light text-[var(--theme-text)]">
                  {speedToLeadHoursSaved} hrs/mo
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-light">
                  Sales managers focus only on in-person closing
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] shadow-sm">
                <span className="text-[10px] font-mono uppercase text-[var(--theme-accent)] tracking-wider block mb-1">
                  Est. Call Center Savings
                </span>
                <p className="font-serif text-3xl font-light text-[var(--theme-accent)]">
                  ₹{costSavingsLakhs} Lakhs
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-1 font-light">
                  Reduced manual telecalling overhead
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: STEP-BY-STEP DEVELOPER ONBOARDING */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              DEPLOYMENT ROADMAP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
              Live On Your Real Estate Project in 72 Hours.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Knowledge Ingestion",
                desc: "Upload project brochures, RERA documents, unit pricing sheets, and payment milestone structures.",
              },
              {
                step: "02",
                title: "Persona & Prompt Tuning",
                desc: "We calibrate voice tone, regional accents, polite objection handling, and qualification parameters.",
              },
              {
                step: "03",
                title: "Telephony & CRM Bind",
                desc: "Connect your inbound lead sources (Meta Ads, Google, Portals) and CRM via instant webhooks.",
              },
              {
                step: "04",
                title: "Autonomous Execution",
                desc: "The voice bot begins outbound calls within seconds of submission, streaming appointments live into calendars.",
              },
            ].map((stepItem, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md relative overflow-hidden"
              >
                <span className="font-mono text-3xl font-light text-[var(--theme-accent)]/40 block mb-3">
                  {stepItem.step}
                </span>
                <h3 className="font-serif text-lg font-medium text-[var(--theme-text)] mb-2">
                  {stepItem.title}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[var(--theme-text)]">
              Enterprise Voice Bot Governance.
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {[
              {
                q: "Does the voice bot sound robotic or monotone?",
                a: "No. Our models use state-of-the-art neural speech synthesis operating at 24kHz with realistic speech cadence, subtle breath sounds, and contextual pacing. In blind user testing, over 94% of callers believed they were conversing with an executive relationship manager.",
              },
              {
                q: "What happens if a customer asks a complicated or non-standard question?",
                a: "The voice agent is strictly guardrailed. If a question exceeds the verified project knowledge base (e.g. customized payment schedules or structural modifications), the agent politely states: 'I want to ensure you have the exact verified technical detail on that. Let me have Senior Sales Director Rohit connect with you on WhatsApp with the document.' It logs the specific question into the CRM.",
              },
              {
                q: "Is it compliant with Indian Telecom (TRAI) and DND regulations?",
                a: "Yes. Our calling engine operates strictly on opt-in inbound inquiries where a buyer has explicitly requested details via digital ad campaigns, portal listings, or website forms. All calling numbers are registered commercial telephony lines with full compliance telemetry.",
              },
              {
                q: "Which CRMs and calendars are supported?",
                a: "We support direct bi-directional synchronization with Salesforce, HubSpot, LeadSquared, Zoho, Google Calendar, Microsoft Outlook, and custom webhooks for developer in-house ERPs.",
              },
              {
                q: "Can the AI voice bot speak Hindi or regional dialects?",
                a: "Yes. The agent seamlessly understands and responds in Indian English, clean conversational Hindi, and Hinglish. It detects the buyer's language preference in the first greeting and adapts dynamically.",
              },
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg text-[var(--theme-text)] font-medium">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-full border border-[var(--theme-border)] text-[var(--theme-accent)]">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed border-t border-[var(--theme-border)]/50 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: DEMO INQUIRY FORM */}
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface-elevated)] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              SCHEDULE CUSTOM VOICE DEMO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)]">
              Deploy An AI Voice Agent On Your Next Launch.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light mt-3">
              Experience a custom pilot call with your own project knowledge base. Fill out your details below and our technical advisory team will initiate a test call within 2 hours.
            </p>
          </div>

          {formSuccess ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-serif text-xl font-medium text-[var(--theme-text)]">
                Demo Request Registered!
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)]">
                Our voice engineering team will contact you at {formPhone} with your test call credentials and project walkthrough.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-xs text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                    Phone Number (for Test Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-xs text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@developer.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-xs text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                    Developer / Mandate Name
                  </label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Prestige / Lodha / Independent"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-xs text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1.5">
                  Project Location / Key Inquiries
                </label>
                <input
                  type="text"
                  value={formProject}
                  onChange={(e) => setFormProject(e.target.value)}
                  placeholder="e.g. 50-Acre Luxury Launch in South Mumbai"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] text-xs text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 bg-[var(--theme-accent)] hover:brightness-110 text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {formSubmitting ? (
                  <span>Initiating Test Dispatch...</span>
                ) : (
                  <>
                    <span>Request AI Voice Bot Live Demo</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
