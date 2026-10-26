"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, FileCheck, Wallet, PhoneCall } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import WobblyCard from "./WobblyCard";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/assets/video-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";

// Helper: Format frame filename (001 ... 300)
const formatFrameIdx = (num: number) => String(num).padStart(3, "0");
const getFrameSrc = (num: number) => `${FRAME_PREFIX}${formatFrameIdx(num)}${FRAME_EXT}`;

/**
 * Magnetic Physics Wrapper: Smoothly attracts element towards mouse with spring physics
 */
function MagneticPhysicsWrapper({
  children,
  className = "",
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



interface StageInfo {
  id: string;
  min: number;
  max: number;
  targetPct: number;
  phaseNumber: string;
  phaseTitle: string;
  title: string;
  subtitle: string;
  tags: string[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  alignment: "left" | "right" | "center";
}

const STAGES: StageInfo[] = [
  {
    id: "stage-1",
    min: 0.0,
    max: 0.14,
    targetPct: 0.0,
    phaseNumber: "01",
    phaseTitle: "ARCHITECTURAL HERO",
    title: "Where Vision\nMeets Reality.",
    subtitle:
      "A disciplined, design-led advisory firm orchestrating premier developer mandates, high-value commercial leasing, and connected PropTech intelligence across the Mumbai Metropolitan Region.",
    tags: ["20+ Years Heritage", "Mumbai Micro-Markets", "Sole Selling Partner"],
    primaryCtaText: "Explore Architectural Journey",
    primaryCtaHref: "#about",
    secondaryCtaText: "Developer Mandates Inquiry",
    secondaryCtaHref: "#contact",
    alignment: "left",
  },
  {
    id: "stage-2",
    min: 0.16,
    max: 0.32,
    targetPct: 0.24,
    phaseNumber: "02",
    phaseTitle: "SOLE SELLING MANDATES",
    title: "Mandates - We Sell Differently.\n We Build technology behind it.",
    subtitle:
      "We help real estate developers maximize sales through exclusive mandates, strategic positioning, dedicated sales teams, and technology-driven execution—from pre-launch planning to final inventory closure.",
    tags: ["Sole Selling Mandates", "Brand Representation", "Developer Solutions"],
    primaryCtaText: "Developer Mandate Model",
    primaryCtaHref: "/mandate",
    alignment: "right",
  },
  {
    id: "stage-3",
    min: 0.34,
    max: 0.50,
    targetPct: 0.42,
    phaseNumber: "03",
    phaseTitle: "LIVING SPACES & PROPTECH",
    title: "Proptech",
    subtitle:
      "We built a 360° proptech Platform that is the core funnel the way, Real Estate is Discovered, Distributed and Sold through our Portal and App",
    tags: ["PropTech Discovery", "Smart Portals", "Connected Workflows"],
    secondaryCtaText: "Explore Market Intelligence",
    secondaryCtaHref: "/proptech",
    alignment: "left",
  },
  {
    id: "stage-4",
    min: 0.52,
    max: 0.68,
    targetPct: 0.60,
    phaseNumber: "04",
    phaseTitle: "STRATEGIC CAPITAL",
    title: "Fintech",
    subtitle:
      "A comprehensive Fintech Platform that simplifies access to loans and financials products through a Single Digital Destination.",
    tags: ["PropTech Discovery", "Smart Portals", "Connected Workflows"],
    secondaryCtaText: "Explore PropTech Ecosystem",
    secondaryCtaHref: "/fintech",
    alignment: "right",
  },
  {
    id: "stage-5",
    min: 0.70,
    max: 0.85,
    targetPct: 0.77,
    phaseNumber: "05",
    phaseTitle: "THE COMPLETE HORIZON",
    title: "Let's Shape\nWhat Comes Next.",
    subtitle:
      "Connect with Avodah & Khen LLP to explore exclusive mandate opportunities, portfolio acquisitions, and institutional partnerships across the Mumbai Metropolitan Region.",
    tags: ["Sole Selling Mandates", "Leasing & Investments", "PropTech Advisory"],
    primaryCtaText: "Schedule Institutional Consultation",
    primaryCtaHref: "/contact",
    secondaryCtaText: "Review Firm Profile",
    secondaryCtaHref: "/who-we-are",
    alignment: "center",
  },
];

export default function ArchitecturalCanvasSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Loading & Frame Telemetry
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPreloaderDismissed, setIsPreloaderDismissed] = useState(false);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [activeStage, setActiveStage] = useState<StageInfo>(STAGES[0]);
  const [scrollPct, setScrollPct] = useState(0);

  // 3D Canvas Perspective Tilt on Mouse Movement
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Frame Cache Refs
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  // Find nearest loaded frame to eliminate flickering
  const getClosestLoadedFrame = useCallback((targetIdx: number): HTMLImageElement | null => {
    if (loadedFlagsRef.current[targetIdx - 1]) {
      return imagesRef.current[targetIdx - 1];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (targetIdx - offset >= 1 && loadedFlagsRef.current[targetIdx - offset - 1]) {
        return imagesRef.current[targetIdx - offset - 1];
      }
      if (targetIdx + offset <= TOTAL_FRAMES && loadedFlagsRef.current[targetIdx + offset - 1]) {
        return imagesRef.current[targetIdx + offset - 1];
      }
    }
    return imagesRef.current[0] || null;
  }, []);

  // Canvas Drawing with Responsive Aspect Ratio Cover & Theme Background
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = getClosestLoadedFrame(frameIndex);
      if (!img) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      // Theme-aware canvas background clear
      ctx.fillStyle = isLight ? "#F6F4EE" : "#0c0d0c";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Cover math
      const imgWidth = img.naturalWidth || 1280;
      const imgHeight = img.naturalHeight || 720;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderWidth = canvasWidth;
        renderHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - renderHeight) / 2;
      } else {
        renderHeight = canvasHeight;
        renderWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - renderWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    },
    [getClosestLoadedFrame, isLight]
  );

  // Resize Canvas to device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Two-Tier Progressive Preloader for 300 Frames
  useEffect(() => {
    let loadedCount = 0;
    const PRIORITY_BATCH = 25;

    const loadSingle = (idx: number, callback?: () => void) => {
      if (imagesRef.current[idx - 1]) {
        callback?.();
        return;
      }
      const img = new Image();
      img.src = getFrameSrc(idx);
      img.onload = () => {
        imagesRef.current[idx - 1] = img;
        loadedFlagsRef.current[idx - 1] = true;
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
        setLoadProgress(pct);

        if (idx === 1) {
          drawFrame(1);
        }
        callback?.();
      };
      img.onerror = () => {
        loadedCount++;
        callback?.();
      };
    };

    // 1. Priority initial batch for instant interactivity
    let priorityDone = 0;
    for (let i = 1; i <= PRIORITY_BATCH; i++) {
      loadSingle(i, () => {
        priorityDone++;
        if (priorityDone === PRIORITY_BATCH) {
          setTimeout(() => setIsPreloaderDismissed(true), 350);

          // 2. Stream remainder in small non-blocking chunks
          let nextIdx = PRIORITY_BATCH + 1;
          const streamNext = () => {
            if (nextIdx > TOTAL_FRAMES) return;
            const end = Math.min(TOTAL_FRAMES, nextIdx + 15);
            for (let j = nextIdx; j <= end; j++) {
              loadSingle(j);
            }
            nextIdx += 16;
            setTimeout(streamNext, 60);
          };
          streamNext();
        }
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, handleResize]);

  // Re-draw on theme change
  useEffect(() => {
    drawFrame(Math.round(currentFrameRef.current));
  }, [isLight, drawFrame]);

  // Scroll Progress Orchestration & Smooth Momentum Lerp Loop
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollPct(progress);

      // Map progress to frame index [1, 300]
      const frameIndex = 1 + Math.round(progress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = frameIndex;

      // Update active narrative stage
      const currentStage = STAGES.find((s) => progress >= s.min && progress <= s.max);
      if (currentStage) {
        setActiveStage(currentStage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth Lerp Animation Loop (Physics-based momentum)
    let animId: number;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.16;
        const rounded = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));
        setCurrentFrameNum(rounded);
        drawFrame(rounded);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  // 3D Mouse Parallax Tilt across Viewport
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;
    setMouseTilt({
      rotateX: -normY * 5.0,
      rotateY: normX * 5.0,
    });
  };

  // 3D Touch Tilt for Mobile Devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const normX = e.touches[0].clientX / window.innerWidth - 0.5;
    const normY = e.touches[0].clientY / window.innerHeight - 0.5;
    setMouseTilt({
      rotateX: -normY * 6.5,
      rotateY: normX * 6.5,
    });
  };

  const handleTouchEnd = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0 });
  };

  // Smooth jump to specific narrative chapter
  const scrollToStage = (stage: StageInfo) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const targetY = container.offsetTop + stage.targetPct * scrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[580vh] bg-[var(--theme-bg)] transition-colors duration-300"
    >
      <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden flex items-center justify-center perspective-1200">
        {/* Preloader */}
        <AnimatePresence>
          {!isPreloaderDismissed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-[var(--theme-bg)] flex flex-col items-center justify-center gap-6"
            >
              <div className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/20 border-t-[var(--theme-accent)] animate-spin" />
              <div className="flex flex-col items-center">
                <span className="font-serif text-2xl tracking-[0.2em] text-[var(--theme-text)]">
                  AVODAH &amp; KHEN
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--theme-accent)] mt-1 font-semibold">
                  LLP • Real Estate Advisory
                </span>
              </div>
              <div className="w-56 h-[2px] bg-[var(--theme-border)] relative overflow-hidden rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-[var(--theme-accent)] transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-[11px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase font-mono">
                Loading Architectural Sequence {loadProgress}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Tilted Canvas Container */}
        <motion.div
          animate={{
            rotateX: mouseTilt.rotateX,
            rotateY: mouseTilt.rotateY,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* HTML5 Canvas Rendering 300 Synchronized High-Res Frames */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-[1]" />

          {/* Vignette & Cinematic Atmospheric Gradients - Clean and pure in light mode without white fog */}
          <div
            className="absolute inset-0 pointer-events-none z-[2] transition-opacity duration-500"
            style={{
              background: isLight
                ? "transparent"
                : "radial-gradient(circle at center, transparent 35%, rgba(12,13,12,0.45) 75%, rgba(12,13,12,0.88) 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
            style={{
              background: isLight
                ? "transparent"
                : `linear-gradient(to top, var(--theme-bg), transparent)`,
            }}
          />
        </motion.div>

        {/* 3D Architectural Telemetry HUD */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-8 md:p-10 flex flex-col justify-between">
          {/* HUD Top Bar - Positioned cleanly below fixed navbar */}
          <div className="flex items-center justify-between mt-[76px] sm:mt-[84px] md:mt-[90px]">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.2em] text-[var(--theme-accent)] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-accent)] animate-pulse" />
              <span>19°04&apos;33&quot;N 72°52&apos;39&quot;E</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">MUMBAI MMR</span>
            </div>

            <div className="px-3 py-1 bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] rounded-sm backdrop-blur-md text-[9px] sm:text-xs font-semibold tracking-[0.16em] text-[var(--theme-text)] uppercase shadow-md">
              {activeStage.phaseNumber} / {activeStage.phaseTitle}
            </div>
          </div>

          {/* HUD Bottom Bar */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[var(--theme-text-muted)] uppercase font-semibold">
                TELEMETRY
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[var(--theme-accent)]">
                FRAME {formatFrameIdx(currentFrameNum)} / {TOTAL_FRAMES}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1.5 w-32 sm:w-52">
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[var(--theme-text-muted)] uppercase font-medium">
                SCROLL TO NAVIGATE
              </span>
              <div className="w-full h-[2px] bg-[var(--theme-border)] relative rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-light)] transition-all duration-75"
                  style={{ width: `${scrollPct * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Overlays: Anchored below the fixed navbar (top-[76px] sm:top-[88px]) so navbar NEVER overrides hero */}
        <div className="absolute inset-x-0 bottom-0 top-[76px] sm:top-[88px] md:top-[92px] z-30 pointer-events-none flex items-center justify-center p-2.5 sm:p-5 md:p-6 pb-6 sm:pb-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeStage.id === "stage-1" ? (
              /* =========================================================================
                 STREAMLINED WOBBLY HERO CONSOLE (Stage 01) - ULTRA COMPACT & ELASTIC
                 ========================================================================= */
              <motion.div
                key="hero-stage-1"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ type: "spring", damping: 20, stiffness: 150 }}
                className="w-full max-w-xl mx-auto pointer-events-auto relative px-2 my-auto"
              >
                {/* Wobbly Elastic Physics Card Wrapper */}
                <WobblyCard wobbleIntensity={12} className="w-full">
                  <div className="relative rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/92 backdrop-blur-2xl p-3 sm:p-4.5 md:p-5 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-[var(--theme-accent)]/60 hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.6)]">
                    {/* Specular hairline top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-85" />

                    {/* Interactive Content Column */}
                    <div className="relative z-20 flex flex-col items-center text-center">
                      {/* Eyebrow Badge with Magnetic Physics */}
                      <MagneticPhysicsWrapper strength={0.12} className="mb-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] shadow-xs backdrop-blur-md">
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-accent)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-accent)]" />
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--theme-accent)]">
                            REAL ESTATE. REIMAGINED WITH PROPTECH
                          </span>
                        </div>
                      </MagneticPhysicsWrapper>

                      {/* Editorial Headline */}
                      <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal text-[var(--theme-text)] leading-[1.14] tracking-tight mb-2 max-w-xl">
                        Technology-driven solutions.{" "}
                        <span className="italic font-light text-[var(--theme-accent)]">
                          Transforming the way real estate moves.
                        </span>
                      </h1>

                      {/* Concise Subtitle */}
                      <p className="text-[11px] sm:text-xs text-[var(--theme-text)] opacity-85 leading-relaxed font-light mb-2.5 max-w-lg mx-auto">
                        We combine real estate expertise with technology to make buying, selling and investing in property simpler, smarter and more transparent. Where Vision Meets Structural Reality.
                      </p>

                      {/* Proof-Point Stat Chips - Ultra Compact Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-lg mb-2.5">
                        {[
                          { value: "PropTech", label: "Smart Prop Solutions", icon: Sparkles, href: "/proptech" },
                          { value: "Mandates", label: "Exclusive Mandates", icon: FileCheck, href: "/mandate" },
                          { value: "AI Voice Bot", label: "AI-Powered Calling", icon: PhoneCall, href: "/ai-voice-bot" },
                          { value: "Fintech", label: "Real Estate Financing", icon: Wallet, href: "/fintech" },
                        ].map((stat, i) => {
                          const Icon = stat.icon;
                          return (
                            <MagneticPhysicsWrapper key={i} strength={0.12} className="w-full">
                              <Link
                                href={stat.href}
                                className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md shadow-xs group hover:border-[var(--theme-accent)] hover:shadow-xs transition-all duration-200 cursor-pointer block"
                              >
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Icon className="w-2.5 h-2.5 text-[var(--theme-accent)] opacity-80 group-hover:scale-110 transition-transform shrink-0" />
                                  <span className="font-serif text-xs sm:text-sm font-semibold text-[var(--theme-text)] whitespace-nowrap">
                                    {stat.value}
                                  </span>
                                </div>
                                <span className="text-[7.5px] sm:text-[8px] tracking-wider uppercase text-[var(--theme-text-muted)] font-medium text-center">
                                  {stat.label}
                                </span>
                              </Link>
                            </MagneticPhysicsWrapper>
                          );
                        })}
                      </div>

                      {/* Dual Interactive Magnetic CTAs */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto mb-2.5">
                        <MagneticPhysicsWrapper strength={0.2} className="w-full sm:w-auto">
                          <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase rounded-sm hover:brightness-110 transition-all duration-200 shadow-md shadow-[var(--theme-accent)]/20 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span>Talk to our team</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </MagneticPhysicsWrapper>

                        <MagneticPhysicsWrapper strength={0.2} className="w-full sm:w-auto">
                          <Link
                            href="/proptech"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase rounded-sm transition-all duration-200 backdrop-blur-md hover:-translate-y-0.5 shadow-xs"
                          >
                            <span>Explore PropTech</span>
                          </Link>
                        </MagneticPhysicsWrapper>
                      </div>

                      {/* Quick Chapter Navigation Bar & Scroll Prompt */}
                      <div className="flex items-center justify-between gap-3 w-full pt-1.5 border-t border-[var(--theme-border)]/40 text-[9px]">
                        <div className="hidden sm:flex items-center gap-1.5">
                          <span className="uppercase tracking-widest text-[var(--theme-text-muted)] mr-1 font-medium text-[8.5px]">
                            Chapters:
                          </span>
                          {STAGES.map((stage) => (
                            <button
                              key={stage.id}
                              onClick={() => scrollToStage(stage)}
                              className={`text-[8.5px] tracking-[0.12em] uppercase font-semibold px-2 py-0.5 rounded transition-all duration-200 cursor-pointer ${activeStage.id === stage.id
                                ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c]"
                                : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-glass)]"
                                }`}
                            >
                              {stage.phaseNumber}
                            </button>
                          ))}
                        </div>

                        <motion.div
                          animate={{ y: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                          className="flex items-center gap-1.5 opacity-75 hover:opacity-100 cursor-pointer text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors mx-auto sm:mx-0"
                          onClick={() => scrollToStage(STAGES[1])}
                        >
                          <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase font-medium">
                            Scroll to navigate
                          </span>
                          <ChevronDown className="w-3 h-3 text-[var(--theme-accent)]" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </WobblyCard>
              </motion.div>
            ) : (
              /* =========================================================================
                 STAGES 02 THROUGH 06 NARRATIVE ARCHITECTURAL CARDS WITH WOBBLY PHYSICS
                 ========================================================================= */
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-xl pointer-events-auto ${activeStage.alignment === "left"
                  ? "mr-auto ml-0 text-left"
                  : activeStage.alignment === "right"
                    ? "ml-auto mr-0 text-left"
                    : "mx-auto text-center"
                  }`}
              >
                <WobblyCard wobbleIntensity={8} className="w-full">
                  <div className="p-4 sm:p-7 md:p-8 rounded-2xl bg-[var(--theme-surface-glass)]/92 backdrop-blur-2xl border border-[var(--theme-border)] shadow-[var(--theme-shadow)] relative group hover:border-[var(--theme-accent)]/50 transition-all duration-300">
                    {/* Accent top rule */}
                    <div className="absolute top-0 left-0 w-14 h-[2px] bg-[var(--theme-accent)]" />

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)]">
                        AVODAH &amp; KHEN LLP • STAGE {activeStage.phaseNumber}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--theme-text)] leading-[1.12] mb-3 tracking-tight whitespace-pre-line">
                      {activeStage.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-[var(--theme-text)] opacity-85 leading-relaxed font-light mb-4 sm:mb-5 max-w-lg">
                      {activeStage.subtitle}
                    </p>

                    {/* Technical Tags */}
                    {activeStage.tags && activeStage.tags.length > 0 && (
                      <div
                        className={`flex flex-wrap gap-1.5 mb-4 sm:mb-5 ${activeStage.alignment === "center" ? "justify-center" : ""
                          }`}
                      >
                        {activeStage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] rounded-sm text-[var(--theme-accent)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons with Magnetic Physics */}
                    <div
                      className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${activeStage.alignment === "center" ? "justify-center" : ""
                        }`}
                    >
                      {activeStage.primaryCtaText && (
                        <MagneticPhysicsWrapper strength={0.2}>
                          <Link
                            href={activeStage.primaryCtaHref || "#contact"}
                            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase rounded-sm hover:brightness-110 transition-all duration-200 shadow-md shadow-[var(--theme-accent)]/20 hover:-translate-y-0.5"
                          >
                            <span>{activeStage.primaryCtaText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </MagneticPhysicsWrapper>
                      )}

                      {activeStage.secondaryCtaText && (
                        <MagneticPhysicsWrapper strength={0.2}>
                          <Link
                            href={activeStage.secondaryCtaHref || "#services"}
                            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-transparent border border-[var(--theme-border)] text-[var(--theme-text)] text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase rounded-sm hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-all duration-200 hover:-translate-y-0.5"
                          >
                            <span>{activeStage.secondaryCtaText}</span>
                          </Link>
                        </MagneticPhysicsWrapper>
                      )}
                    </div>
                  </div>
                </WobblyCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
