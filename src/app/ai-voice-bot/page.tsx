import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import LaunchingSoonClient from "@/components/launching-soon/LaunchingSoonClient";

export const metadata: Metadata = {
  title: "AI Voice Bot — Launching Soon — AVODAH & KHEN LLP",
  description:
    "Autonomous conversational voice AI built for real estate developers and sole selling mandates. Instant lead response in under 10 seconds, multi-dialect qualification, and automated site visit scheduling.",
  keywords: [
    "AI Voice Bot Real Estate",
    "Real Estate Voice Agent Mumbai",
    "Autonomous Calling Bot Real Estate",
    "PropTech Voice AI",
    "Lead Qualification Voice Bot",
    "Automated Site Visit Scheduling",
    "Avodah & Khen AI Voice Bot",
    "Developer Sales Automation",
  ],
  openGraph: {
    title: "AI Voice Bot — Launching Soon — AVODAH & KHEN LLP",
    description:
      "Transforming cold inquiries into qualified site visits with human-parity voice AI, sub-450ms latency, and direct CRM synchronization.",
    type: "website",
  },
};

export default function VoiceBotPage() {
  return (
    <main className="relative isolate h-[100dvh] max-h-[100dvh] overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Physics-based Custom Mouse Cursor */}
      <CustomCursor />

      {/* 3D WebGL Architectural Grid Background */}
      <ThreeArchitecturalBackground />

      {/* Interactive Golden Starlight & Sparkle Field throughout the website */}
      <SparkleBackground />

      {/* Sticky Top Luxury Navigation with Dropdown Menus */}
      <Navigation />

      {/* Single-Screen Visible Launching Soon Experience with Feral UI Blob */}
      <LaunchingSoonClient type="voicebot" />
    </main>
  );
}
