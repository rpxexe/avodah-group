import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import LaunchingSoonClient from "@/components/launching-soon/LaunchingSoonClient";

export const metadata: Metadata = {
  title: "PropTech Ecosystem — Launching Soon — AVODAH & KHEN LLP",
  description:
    "Next-generation real estate technology ecosystem. An intelligent connected platform for property discovery, automated developer mandates, CRM, and spatial AI intelligence.",
  keywords: [
    "PropTech Mumbai",
    "Real Estate Technology India",
    "AI Property Discovery",
    "Developer Mandate CRM",
    "Real Estate Digital Twin",
    "Avodah & Khen PropTech",
  ],
  openGraph: {
    title: "PropTech Ecosystem — Launching Soon — AVODAH & KHEN LLP",
    description:
      "A connected platform for property discovery, automated developer mandates, high-velocity CRM, and spatial AI intelligence.",
    type: "website",
  },
};

export default function ProptechPage() {
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
      <LaunchingSoonClient type="proptech" />
    </main>
  );
}
