"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Compass, Building2, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/assets/video-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";

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
    phaseTitle: "STRUCTURAL INTEGRITY",
    title: "Every Detail\nHas a Purpose.",
    subtitle:
      "Great spaces begin with thoughtful planning, considered design, and meticulous attention to materials. We deconstruct architectural complexity to uncover true structural and commercial value.",
    tags: ["Spatial Planning", "Material Integrity", "Institutional Quality"],
    secondaryCtaText: "View Advisory Capabilities",
    secondaryCtaHref: "#services",
    alignment: "right",
  },
  {
    id: "stage-3",
    min: 0.34,
    max: 0.50,
    targetPct: 0.42,
    phaseNumber: "03",
    phaseTitle: "SOLE SELLING MANDATES",
    title: "Discover Spaces\nWith Potential.",
    subtitle:
      "Supporting Category A & B developers across Mumbai with structured sole selling mandates, dedicated sales machinery, and rigorous project positioning from pre-launch to sell-through.",
    tags: ["Sole Selling Mandates", "Brand Representation", "Developer Solutions"],
    primaryCtaText: "Developer Mandate Model",
    primaryCtaHref: "#services",
    alignment: "left",
  },
  {
    id: "stage-4",
    min: 0.52,
    max: 0.68,
    targetPct: 0.60,
    phaseNumber: "04",
    phaseTitle: "STRATEGIC CAPITAL",
    title: "Clarity Behind\nEvery Decision.",
    subtitle:
      "Navigate commercial real estate decisions with analytical financial rigor. High-yield institutional leasing advisory, corporate relocations, and structured portfolio underwriting.",
    tags: ["Commercial Leasing", "Investment Sourcing", "Portfolio Intelligence"],
    secondaryCtaText: "Explore Market Intelligence",
    secondaryCtaHref: "#research",
    alignment: "right",
  },
  {
    id: "stage-5",
    min: 0.70,
    max: 0.85,
    targetPct: 0.77,
    phaseNumber: "05",
    phaseTitle: "LIVING SPACES & PROPTECH",
    title: "Designed Around\nThe Way You Live.",
    subtitle:
      "Thoughtful architectural interiors brought alive by curated natural light, balanced spatial geometry, and accelerated by our proprietary digital discovery and CRM ecosystem.",
    tags: ["PropTech Discovery", "Smart Portals", "Connected Workflows"],
    secondaryCtaText: "Explore PropTech Ecosystem",
    secondaryCtaHref: "#ecosystem",
    alignment: "left",
  },
  {
    id: "stage-6",
    min: 0.87,
    max: 1.0,
    targetPct: 0.94,
    phaseNumber: "06",
    phaseTitle: "THE COMPLETE HORIZON",
    title: "Let's Shape\nWhat Comes Next.",
    subtitle:
      "Connect with Avodah & Khen LLP to explore exclusive mandate opportunities, portfolio acquisitions, and institutional partnerships across the Mumbai Metropolitan Region.",
    tags: ["Sole Selling Mandates", "Leasing & Investments", "PropTech Advisory"],
    primaryCtaText: "Schedule Institutional Consultation",
    primaryCtaHref: "#contact",
    secondaryCtaText: "Review Firm Profile",
    secondaryCtaHref: "#about",
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

  // Helper: Format frame filename (001 ... 300)
  const formatFrameIdx = (num: number) => String(num).padStart(3, "0");
  const getFrameSrc = (num: number) => `${FRAME_PREFIX}${formatFrameIdx(num)}${FRAME_EXT}`;

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
      rotateX: -normY * 4.5,
      rotateY: normX * 4.5,
    });
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

          {/* Vignette & Cinematic Atmospheric Gradients */}
          <div
            className="absolute inset-0 pointer-events-none z-[2] transition-opacity duration-500"
            style={{
              background: isLight
                ? "radial-gradient(circle at center, transparent 38%, rgba(246,244,238,0.3) 72%, rgba(246,244,238,0.92) 100%)"
                : "radial-gradient(circle at center, transparent 35%, rgba(12,13,12,0.45) 75%, rgba(12,13,12,0.88) 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
            style={{
              background: `linear-gradient(to top, var(--theme-bg), transparent)`,
            }}
          />
        </motion.div>

        {/* 3D Architectural Telemetry HUD */}
        <div className="absolute inset-0 z-20 pointer-events-none p-6 sm:p-10 flex flex-col justify-between">
          {/* HUD Top Bar */}
          <div className="flex items-center justify-between mt-16 sm:mt-20">
            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs tracking-[0.22em] text-[var(--theme-accent)] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-accent)] animate-pulse" />
              <span>19°04&apos;33&quot;N 72°52&apos;39&quot;E</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">ELEV 14M</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">MUMBAI MMR</span>
            </div>

            <div className="px-3.5 py-1.5 bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] rounded-sm backdrop-blur-md text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[var(--theme-text)] uppercase shadow-md">
              {activeStage.phaseNumber} / {activeStage.phaseTitle}
            </div>
          </div>

          {/* HUD Bottom Bar */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase font-semibold">
                ARCHITECTURAL TELEMETRY
              </span>
              <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-[var(--theme-accent)]">
                FRAME {formatFrameIdx(currentFrameNum)} / {TOTAL_FRAMES}
              </span>
            </div>

            <div className="flex flex-col items-end gap-2 w-40 sm:w-60">
              <span className="text-[9px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase font-medium">
                SCROLL TO EXPLORE SPACES
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

        {/* Narrative Overlays: Redesigned Grand Hero for Stage 1 & Stage Cards for 2-6 */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-6 sm:p-12">
          <AnimatePresence mode="wait">
            {activeStage.id === "stage-1" ? (
              /* =========================================================================
                 REDESIGNED GRAND HERO SECTION (Stage 01)
                 ========================================================================= */
              <motion.div
                key="hero-stage-1"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl pointer-events-auto mx-auto text-center flex flex-col items-center"
              >
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-md mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-ping" />
                  <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[var(--theme-accent)]">
                    AVODAH &amp; KHEN LLP • ARCHITECTURAL REAL ESTATE
                  </span>
                </div>

                {/* Grand Architectural Headline */}
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[var(--theme-text)] leading-[1.04] mb-6 tracking-tight">
                  Where Vision Meets<br />
                  <span className="italic font-light text-[var(--theme-accent)]">Structural Reality.</span>
                </h1>

                {/* Editorial Subtitle */}
                <p className="text-base sm:text-lg text-[var(--theme-text)] opacity-85 leading-relaxed font-light mb-8 max-w-2xl mx-auto">
                  A disciplined, design-led advisory firm curating Mumbai&apos;s most prestigious developer sole selling mandates, high-value commercial leasing, and connected PropTech ecosystems.
                </p>

                {/* Proof-Point Stat Chips Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-9">
                  {[
                    { value: "₹2,500+ Cr", label: "Mandate Pipeline", icon: TrendingUp },
                    { value: "20+ Years", label: "MMR Heritage", icon: Building2 },
                    { value: "Cat A & B", label: "Sole Selling Partner", icon: ShieldCheck },
                    { value: "PropTech", label: "Connected Platform", icon: Sparkles },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-sm border border-[var(--theme-border)] bg-[var(--theme-surface-glass)] backdrop-blur-md shadow-sm group hover:border-[var(--theme-accent)] transition-colors"
                      >
                        <Icon className="w-4 h-4 text-[var(--theme-accent)] mb-1 opacity-80 group-hover:scale-110 transition-transform" />
                        <span className="font-serif text-lg sm:text-xl font-medium text-[var(--theme-text)]">
                          {stat.value}
                        </span>
                        <span className="text-[10px] tracking-wider uppercase text-[var(--theme-text-muted)] font-medium mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Dual Interactive CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                  <button
                    onClick={() => scrollToStage(STAGES[1])}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[var(--theme-accent)]/20 hover:-translate-y-0.5"
                  >
                    <span>Explore Architectural Vision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5"
                  >
                    <span>Developer Mandate Inquiry</span>
                  </Link>
                </div>

                {/* Quick Chapter Jump Bar */}
                <div className="hidden md:flex items-center gap-2 pt-2 border-t border-[var(--theme-border)]/60">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--theme-text-muted)] mr-2 font-medium">
                    Chapters:
                  </span>
                  {STAGES.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => scrollToStage(stage)}
                      className={`text-[10px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1 rounded transition-all duration-200 ${
                        activeStage.id === stage.id
                          ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c]"
                          : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-glass)]"
                      }`}
                    >
                      {stage.phaseNumber} {stage.phaseTitle.split(" ")[0]}
                    </button>
                  ))}
                </div>

                {/* Animated Scroll Prompt Indicator */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="mt-8 flex flex-col items-center gap-1.5 opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => scrollToStage(STAGES[1])}
                >
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--theme-text-muted)] font-medium">
                    Scroll to witness reveal
                  </span>
                  <ChevronDown className="w-4 h-4 text-[var(--theme-accent)]" />
                </motion.div>
              </motion.div>
            ) : (
              /* =========================================================================
                 STAGES 02 THROUGH 06 NARRATIVE ARCHITECTURAL CARDS
                 ========================================================================= */
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-2xl pointer-events-auto ${
                  activeStage.alignment === "left"
                    ? "mr-auto ml-0 text-left"
                    : activeStage.alignment === "right"
                    ? "ml-auto mr-0 text-left"
                    : "mx-auto text-center"
                }`}
              >
                <div className="p-8 sm:p-12 rounded-sm bg-[var(--theme-surface-glass)] backdrop-blur-2xl border border-[var(--theme-border)] shadow-[var(--theme-shadow)] relative group">
                  {/* Accent top rule */}
                  <div className="absolute top-0 left-0 w-12 h-[2px] bg-[var(--theme-accent)]" />

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
                    <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[var(--theme-accent)]">
                      AVODAH &amp; KHEN LLP • STAGE {activeStage.phaseNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[var(--theme-text)] leading-[1.08] mb-5 tracking-tight whitespace-pre-line">
                    {activeStage.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-[var(--theme-text)] opacity-85 leading-relaxed font-light mb-8 max-w-xl">
                    {activeStage.subtitle}
                  </p>

                  {/* Technical Tags */}
                  {activeStage.tags && activeStage.tags.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-2 mb-8 ${
                        activeStage.alignment === "center" ? "justify-center" : ""
                      }`}
                    >
                      {activeStage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 bg-[var(--theme-tag-bg)] border border-[var(--theme-tag-border)] rounded-sm text-[var(--theme-accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div
                    className={`flex flex-wrap items-center gap-4 ${
                      activeStage.alignment === "center" ? "justify-center" : ""
                    }`}
                  >
                    {activeStage.primaryCtaText && (
                      <Link
                        href={activeStage.primaryCtaHref || "#contact"}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] text-xs font-bold tracking-[0.18em] uppercase rounded-sm hover:brightness-110 transition-all duration-300 shadow-xl shadow-[var(--theme-accent)]/20 hover:-translate-y-0.5"
                      >
                        <span>{activeStage.primaryCtaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {activeStage.secondaryCtaText && (
                      <Link
                        href={activeStage.secondaryCtaHref || "#services"}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-[var(--theme-border)] text-[var(--theme-text)] text-xs font-medium tracking-[0.18em] uppercase rounded-sm hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span>{activeStage.secondaryCtaText}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
