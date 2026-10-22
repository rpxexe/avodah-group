"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { JellyBlobMascot, BlobSpeech, type JellyBlobMood } from "feral-blob";
import "feral-blob/blob.css";

export type FeralTheme = "proptech" | "fintech";

interface FeralBlobShowcaseProps {
  theme?: FeralTheme;
  interactiveName?: string;
  className?: string;
}

const PROPTECH_SPEECHES: Record<JellyBlobMood, string> = {
  curious: "Scanning Bandra absorption...",
  happy: "Zero lead leakage detected!",
  wave: "Welcome to AVODAH PropTech!",
  surprised: "Closed in under 12 mins!",
  love: "Grade-A assets look prime.",
  hmm: "Calibrating price curves...",
  sideEye: "Unverified listing? Denied.",
  password: "Mandate protocols locked.",
  shy: "Exclusive mandates only...",
  sleepy: "Telemetry idle. Ready.",
  angry: "Don't spam our engine!",
  sad: "Lead lost? Not on our watch.",
  neutral: "PropTech Core: Online.",
};

const FINTECH_SPEECHES: Record<JellyBlobMood, string> = {
  curious: "Underwriting ₹1,200 Cr debt...",
  happy: "Underwriting verified!",
  wave: "Welcome to AVODAH FinTech!",
  surprised: "Milestone escrow cleared!",
  love: "Risk-adjusted yields prime.",
  hmm: "Stress-testing cash flows...",
  sideEye: "Scrutinizing debt ratios...",
  password: "Escrow keys locked safe.",
  shy: "Private family backing...",
  sleepy: "Ledger batch amortized.",
  angry: "Escrow condition missing!",
  sad: "High rates? We structure it.",
  neutral: "FinTech Engine active.",
};

export default function FeralBlobShowcase({
  theme = "proptech",
  className = "",
}: FeralBlobShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<JellyBlobMood>("wave");
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sparkle, setSparkle] = useState(false);

  const isProptech = theme === "proptech";
  const speeches = isProptech ? PROPTECH_SPEECHES : FINTECH_SPEECHES;

  // Custom luxury theme palette CSS variables for Feral-Blob
  const themeStyles = isProptech
    ? ({
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
      } as React.CSSProperties)
    : ({
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
      } as React.CSSProperties);

  // Mouse move tracker across container and viewport so the blob's eyes track the user
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    const gazeX = Math.max(-26, Math.min(26, (relX / (rect.width / 2)) * 26));
    const gazeY = Math.max(-18, Math.min(18, (relY / (rect.height / 2)) * 18));

    setGaze({ x: gazeX, y: gazeY });
  };

  // Global pointer tracking so the blob gazes across the screen at the user
  useEffect(() => {
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
  }, []);

  const handlePoke = useCallback(() => {
    setSparkle(true);
    setMood("surprised");
    setTimeout(() => {
      setSparkle(false);
      setMood("happy");
    }, 1200);
    setTimeout(() => {
      setMood("curious");
    }, 4500);
  }, []);

  const handleOverpoke = useCallback(() => {
    setMood("angry");
    setTimeout(() => {
      setMood("sideEye");
    }, 2500);
    setTimeout(() => {
      setMood("curious");
    }, 5000);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={themeStyles}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Speech Cloud */}
      <div className="mb-2 max-w-[340px] w-full flex justify-center pointer-events-none">
        <BlobSpeech
          mood={mood}
          messages={speeches}
          className="text-xs font-sans tracking-tight text-[var(--theme-text)] shadow-lg"
        />
      </div>

      {/* The Pure Feral UI Jelly Blob Mascot */}
      <div
        onClick={handlePoke}
        className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="Poke the Feral UI blob!"
      >
        <JellyBlobMascot
          mood={mood}
          gaze={gaze}
          sparkle={sparkle}
          onPoke={handlePoke}
          onOverpoke={handleOverpoke}
          className="w-full h-full drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
