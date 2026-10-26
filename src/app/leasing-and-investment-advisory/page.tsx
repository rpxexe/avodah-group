import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import LeasingInvestmentAdvisoryClient from "@/components/advisory/LeasingInvestmentAdvisoryClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Leasing & Investment Advisory — AVODAH & KHEN LLP",
  description:
    "Strategic real estate decisions, backed by market intelligence. We help businesses, investors and property owners make informed real estate decisions across leasing, investment and portfolio opportunities in Mumbai.",
  keywords: [
    "Commercial Leasing Advisory Mumbai",
    "Real Estate Investment Advisory India",
    "Portfolio Advisory Mumbai",
    "Grade A Office Leasing",
    "Corporate Real Estate Strategy",
    "Avodah & Khen Advisory",
  ],
  openGraph: {
    title: "Leasing & Investment Advisory — AVODAH & KHEN LLP",
    description:
      "Strategic real estate decisions, backed by market intelligence. We help businesses, investors and property owners make informed real estate decisions.",
    type: "website",
  },
};

export default function LeasingAndInvestmentAdvisoryPage() {
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

      {/* Main Interactive Leasing & Investment Advisory Experience */}
      <LeasingInvestmentAdvisoryClient />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
