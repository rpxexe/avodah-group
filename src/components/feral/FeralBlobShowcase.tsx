"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { JellyBlobMascot, BlobSpeech, type JellyBlobMood } from "feral-blob";
import "feral-blob/blob.css";

export type FeralTheme = "proptech" | "fintech" | "voicebot";

interface FeralBlobShowcaseProps {
  theme?: FeralTheme;
  interactiveName?: string;
  className?: string;
  externalMood?: JellyBlobMood | null;
  gazeTarget?: { x: number; y: number } | null;
  celebrate?: number;
  customSpeeches?: Partial<Record<JellyBlobMood, string>>;
}

// Ordered narrative sequence of moods matching the cloud speeches
const MOOD_SEQUENCE: JellyBlobMood[] = [
  "wave",       // Greeting
  "curious",    // Discovery
  "happy",      // Optimism
  "hmm",        // Quantitative analysis
  "surprised",  // Innovation impact
  "love",       // Client satisfaction
  "sideEye",    // Legacy disruption
  "shy",        // Understated luxury
  "sleepy",     // Background computation
  "neutral",    // Composed executive presence
];

const PROPTECH_SPEECHES: Record<JellyBlobMood, string> = {
  curious: "Exploring the future of real estate...",
  happy: "Smarter property decisions ahead!",
  wave: "Something big is taking shape...",
  surprised: "Real estate. Reimagined.",
  love: "Built for better property journeys.",
  hmm: "Mapping what's next in PropTech...",
  sideEye: "Old-school real estate? Not for long.",
  password: "Unlocking a smarter property ecosystem...",
  shy: "A new way to discover real estate...",
  sleepy: "The future is loading...",
  angry: "Outdated property tech? Not anymore!",
  sad: "Lost in property search? Those days are numbered.",
  neutral: "AVODAH PropTech: Coming Soon.",
};

const FINTECH_SPEECHES: Record<JellyBlobMood, string> = {
  curious: "Exploring smarter ways to invest...",
  happy: "Big opportunities are taking shape!",
  wave: "The future of real estate finance awaits!",
  surprised: "Capital meets opportunity.",
  love: "Built for smarter investments.",
  hmm: "Connecting capital with potential...",
  sideEye: "Traditional finance? Time for a rethink.",
  password: "Securing the future of financial innovation...",
  shy: "A new chapter in property finance...",
  sleepy: "Something valuable is brewing...",
  angry: "Inefficient capital flows? Not for long!",
  sad: "Missed opportunities? Let's change that.",
  neutral: "AVODAH FinTech: Coming Soon.",
};

const VOICEBOT_SPEECHES: Record<JellyBlobMood, string> = {
  curious: "Listening to buyer intent in real-time...",
  happy: "Lead qualified in under 10 seconds!",
  wave: "Autonomous real estate calling is coming...",
  surprised: "Natural conversations. Zero robotic lag.",
  love: "Site visits booked directly to your calendar.",
  hmm: "Analyzing dialect and property preferences...",
  sideEye: "Manual cold calling? That's history.",
  password: "Syncing verified developer inventory...",
  shy: "Learning every floor plan and price sheet...",
  sleepy: "24/7 autonomous outreach standing by...",
  angry: "Dropped leads and unanswered calls? Never again.",
  sad: "Losing deals to slow follow-up? We fixed that.",
  neutral: "AVODAH AI Voice Bot: Coming Soon.",
};

export default function FeralBlobShowcase({
  theme = "proptech",
  className = "",
  externalMood = null,
  gazeTarget = null,
  celebrate = 0,
  customSpeeches,
}: FeralBlobShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [moodIndex, setMoodIndex] = useState<number>(0);
  const [mood, setMood] = useState<JellyBlobMood>(MOOD_SEQUENCE[0]);
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sparkle, setSparkle] = useState<boolean>(false);
  const [celebrateCount, setCelebrateCount] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseSpeeches =
    theme === "voicebot"
      ? VOICEBOT_SPEECHES
      : theme === "fintech"
      ? FINTECH_SPEECHES
      : PROPTECH_SPEECHES;
  const speeches = customSpeeches ? { ...baseSpeeches, ...customSpeeches } : baseSpeeches;

  // Sync external mood when provided (e.g. from whitelist form interactions)
  useEffect(() => {
    if (externalMood) {
      setMood(externalMood);
      const foundIdx = MOOD_SEQUENCE.indexOf(externalMood);
      if (foundIdx !== -1) {
        setMoodIndex(foundIdx);
      }
    }
  }, [externalMood]);

  // Sync external gaze target when user focuses on inputs
  useEffect(() => {
    if (gazeTarget) {
      setGaze(gazeTarget);
    }
  }, [gazeTarget]);

  // Sync celebration bursts from external actions
  useEffect(() => {
    if (celebrate && celebrate > 0) {
      setCelebrateCount((c) => c + 1);
      setSparkle(true);
      const timer = setTimeout(() => setSparkle(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [celebrate]);

  // Advance mood and speech cloud synchronously to the next narrative state
  const advanceMood = useCallback(() => {
    setMoodIndex((prev) => {
      const nextIdx = (prev + 1) % MOOD_SEQUENCE.length;
      setMood(MOOD_SEQUENCE[nextIdx]);
      return nextIdx;
    });
  }, []);

  // Automatic cyclical progression so the blob expression continually adapts to each cloud speech
  useEffect(() => {
    if (isPaused || externalMood) return;

    const interval = setInterval(() => {
      advanceMood();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, externalMood, advanceMood]);

  // Custom luxury theme palette CSS variables for Feral-Blob
  const themeStyles =
    theme === "voicebot"
      ? ({
          "--jelly-body-top": "#D1FAE5",
          "--jelly-body-mid": "#34D399",
          "--jelly-body-deep": "#059669",
          "--jelly-body-rim": "#6EE7B7",
          "--jelly-outline": "#065F46",
          "--jelly-outline-light": "#10B981",
          "--jelly-arm-light": "#A7F3D0",
          "--jelly-arm-mid": "#34D399",
          "--jelly-arm-deep": "#059669",
          "--jelly-cheek": "#F472B6",
          "--jelly-cheek-light": "#FCE7F3",
          "--jelly-cheek-deep": "#DB2777",
          "--jelly-eye": "#064E3B",
          "--jelly-eye-light": "#047857",
          "--jelly-eye-deep": "#022C22",
          "--jelly-belly-glow": "#ECFDF5",
          "--jelly-eye-sparkle": "#34D399",
          "--jelly-shadow": "#022C22",
        } as React.CSSProperties)
      : theme === "fintech"
      ? ({
          "--jelly-body-top": "#E0F2FE",
          "--jelly-body-mid": "#38BDF8",
          "--jelly-body-deep": "#0284C7",
          "--jelly-body-rim": "#7DD3FC",
          "--jelly-outline": "#0369A1",
          "--jelly-outline-light": "#0EA5E9",
          "--jelly-arm-light": "#BAE6FD",
          "--jelly-arm-mid": "#38BDF8",
          "--jelly-arm-deep": "#0284C7",
          "--jelly-cheek": "#F472B6",
          "--jelly-cheek-light": "#FCE7F3",
          "--jelly-cheek-deep": "#DB2777",
          "--jelly-eye": "#0B1526",
          "--jelly-eye-light": "#1E293B",
          "--jelly-eye-deep": "#020617",
          "--jelly-belly-glow": "#F0F9FF",
          "--jelly-eye-sparkle": "#38BDF8",
          "--jelly-shadow": "#081E36",
        } as React.CSSProperties)
      : ({
          "--jelly-body-top": "#FCEFD8",
          "--jelly-body-mid": "#C9A97C",
          "--jelly-body-deep": "#8C6D41",
          "--jelly-body-rim": "#DFCA9F",
          "--jelly-outline": "#6B512C",
          "--jelly-outline-light": "#B5915D",
          "--jelly-arm-light": "#F2DFC2",
          "--jelly-arm-mid": "#C9A97C",
          "--jelly-arm-deep": "#8C6D41",
          "--jelly-cheek": "#F4B183",
          "--jelly-cheek-light": "#FDE6D2",
          "--jelly-cheek-deep": "#DD8C54",
          "--jelly-eye": "#141513",
          "--jelly-eye-light": "#2A231C",
          "--jelly-eye-deep": "#0C0D0C",
          "--jelly-belly-glow": "#FFF1D6",
          "--jelly-eye-sparkle": "#D4AF37",
          "--jelly-shadow": "#1A150E",
        } as React.CSSProperties);

  // Mouse move tracker across container and viewport so the blob's eyes track the user
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gazeTarget || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    const gazeX = Math.max(-26, Math.min(26, (relX / (rect.width / 2)) * 26));
    const gazeY = Math.max(-18, Math.min(18, (relY / (rect.height / 2)) * 18));

    setGaze({ x: gazeX, y: gazeY });
  };

  // Global pointer tracking so the blob gazes across the screen at the user
  useEffect(() => {
    if (gazeTarget) return;

    const handleGlobalPointer = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = e.clientX - centerX;
      const relY = e.clientY - centerY;

      // Smooth gaze tracking across the screen (-26 to 26)
      const maxDistX = Math.max(300, window.innerWidth / 2);
      const maxDistY = Math.max(200, window.innerHeight / 2);
      const gazeX = Math.max(-26, Math.min(26, (relX / maxDistX) * 26));
      const gazeY = Math.max(-18, Math.min(18, (relY / maxDistY) * 18));

      setGaze({ x: gazeX, y: gazeY });
    };

    window.addEventListener("mousemove", handleGlobalPointer);
    return () => window.removeEventListener("mousemove", handleGlobalPointer);
  }, [gazeTarget]);

  // Clicking the speech cloud changes the text and blob expression simultaneously
  const handleCloudClick = () => {
    setSparkle(true);
    advanceMood();
    setTimeout(() => setSparkle(false), 800);
  };

  // Poking the mascot plays physics squash, triggers eye sparkle, and updates expression to match speech
  const handlePoke = useCallback(() => {
    setSparkle(true);
    advanceMood();
    setTimeout(() => {
      setSparkle(false);
    }, 1200);
  }, [advanceMood]);

  // Overpoking expresses irritation then gracefully returns to the current speech mood
  const handleOverpoke = useCallback(() => {
    setMood("angry");
    setCelebrateCount((c) => c + 1);
    setTimeout(() => {
      setMood("sideEye");
    }, 2000);
    setTimeout(() => {
      setMood(MOOD_SEQUENCE[moodIndex]);
    }, 4500);
  }, [moodIndex]);

  if (!mounted) {
    return (
      <div
        style={themeStyles}
        className={`relative flex flex-col items-center justify-center select-none ${className}`}
      >
        <div className="mb-2 max-w-[340px] w-full flex flex-col items-center justify-center min-h-[56px]">
          <div className="px-4 py-2 rounded-2xl bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-xs font-sans text-[var(--theme-text)] opacity-70">
            {speeches[mood]}
          </div>
        </div>
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72" />
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1 h-3" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={themeStyles}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Interactive Speech Cloud — Clicking cycles the cloud text & blob expression */}
      <div
        onClick={handleCloudClick}
        className="mb-2 max-w-[340px] w-full flex flex-col items-center justify-center cursor-pointer group"
        title="Click to cycle speech & expression"
      >
        <BlobSpeech
          mood={mood}
          messages={speeches}
          className="text-xs font-sans tracking-tight text-[var(--theme-text)] shadow-lg transition-transform group-hover:scale-105"
        />
      </div>

      {/* The Pure Feral UI Jelly Blob Mascot */}
      <div
        onClick={handlePoke}
        className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="Poke the Feral UI blob to cycle expression!"
      >
        <JellyBlobMascot
          mood={mood}
          gaze={gaze}
          sparkle={sparkle}
          celebrate={celebrateCount}
          onPoke={handlePoke}
          onOverpoke={handleOverpoke}
          className="w-full h-full drop-shadow-2xl"
        />
      </div>

      {/* Subtle Narrative Mood Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
        {MOOD_SEQUENCE.map((m, idx) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMoodIndex(idx);
              setMood(m);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              mood === m
                ? "w-4 h-1.5 bg-[var(--theme-accent)] shadow-sm"
                : "w-1.5 h-1.5 bg-[var(--theme-border)] hover:bg-[var(--theme-text-muted)] opacity-50 hover:opacity-100"
            }`}
            title={`Expression: ${m} — "${speeches[m]}"`}
            aria-label={`Switch expression to ${m}`}
          />
        ))}
      </div>
    </div>
  );
}
