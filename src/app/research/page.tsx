import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import ResearchClient from "@/components/research/ResearchClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Research & Insights — AVODAH & KHEN LLP | Know the Market. See the Opportunity.",
  description:
    "Real estate decisions are driven by data—but meaningful insights come from understanding what the data is telling you. Turning property data into meaningful market intelligence.",
  keywords: [
    "Real Estate Market Research",
    "Location Intelligence Mumbai",
    "Market & Price Trends",
    "Project & Competitor Intelligence",
    "Buyer & Demand Insights",
    "Project Positioning Strategy",
    "Avodah & Khen Research",
  ],
  openGraph: {
    title: "RESEARCH & INSIGHTS — AVODAH & KHEN LLP",
    description:
      "Know the Market. See the Opportunity. Make Better Decisions. Turning property data into meaningful market intelligence.",
    type: "website",
  },
};

export default function ResearchPage() {
  return (
    <main className="relative isolate min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Physics-based Custom Mouse Cursor */}
      <CustomCursor />

      {/* 3D WebGL Architectural Grid Background */}
      <ThreeArchitecturalBackground />

      {/* Interactive Golden Starlight & Sparkle Field throughout the website */}
      <SparkleBackground />

      {/* Sticky Top Luxury Navigation with Dropdown Menus */}
      <Navigation />

      {/* Main Interactive Research Experience */}
      <ResearchClient />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
