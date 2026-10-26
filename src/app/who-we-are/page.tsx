import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import WhoWeAreClient from "@/components/whoweare/WhoWeAreClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Who We Are — AVODAH & KHEN LLP | Real Estate. Technology. Intelligence.",
  description:
    "A technology-led real estate company built around one connected ecosystem. Bridging property discovery, mandates, sales execution, CRM and AI-powered market intelligence across Mumbai.",
  keywords: [
    "Who We Are Avodah & Khen",
    "Real Estate Technology Mumbai",
    "Sole Selling Mandates",
    "Connected Real Estate Ecosystem",
    "PropTech Company India",
    "AI Real Estate Intelligence",
  ],
  openGraph: {
    title: "Who We Are — AVODAH & KHEN LLP | Real Estate. Technology. Intelligence.",
    description:
      "A connected platform for property discovery, mandates, sales, CRM, data and AI-powered real estate in Mumbai.",
    type: "website",
  },
};

export default function WhoWeArePage() {
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

      {/* Main Interactive Who We Are Experience */}
      <WhoWeAreClient />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
