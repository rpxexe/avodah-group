import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import LaunchingSoonClient from "@/components/launching-soon/LaunchingSoonClient";

export const metadata: Metadata = {
  title: "FinTech Capital Engine — Launching Soon — AVODAH & KHEN LLP",
  description:
    "Algorithmic real estate capital & underwriting intelligence. Machine-speed risk profiling, fractional institutional syndication rails, and automated milestone escrow liquidity.",
  keywords: [
    "FinTech Real Estate India",
    "Real Estate Capital Syndication",
    "Algorithmic Underwriting",
    "RERA Smart Escrow",
    "Institutional Mezzanine Debt",
    "Avodah & Khen FinTech",
  ],
  openGraph: {
    title: "FinTech Capital Engine — Launching Soon — AVODAH & KHEN LLP",
    description:
      "Transforming real estate capital through machine-speed underwriting, institutional syndication rails, and milestone-linked liquidity.",
    type: "website",
  },
};

export default function FintechPage() {
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
      <LaunchingSoonClient type="fintech" />
    </main>
  );
}
