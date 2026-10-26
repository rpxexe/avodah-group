import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import CareersClient from "@/components/careers/CareersClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers — AVODAH & KHEN LLP | High-Value Real Estate & PropTech Advisory",
  description:
    "Explore executive and engineering opportunities at AVODAH & KHEN LLP in Mumbai. Lead Category A developer sole selling mandates, commercial leasing advisory, and proprietary PropTech development.",
  keywords: [
    "Avodah Careers",
    "Real Estate Jobs Mumbai",
    "Sole Selling Mandates Careers",
    "Commercial Real Estate Director",
    "PropTech Software Engineer Mumbai",
    "Real Estate Capital Markets Jobs",
    "BKC Real Estate Advisory Careers",
  ],
  openGraph: {
    title: "Careers at AVODAH & KHEN LLP — Shape the Skyline of Indian Real Estate",
    description:
      "Join our discreet cadre of institutional dealmakers, commercial leasing advisors, and PropTech engineers in Mumbai.",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main className="relative isolate min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Physics-based Custom Mouse Cursor */}
      <CustomCursor />

      {/* 3D WebGL Architectural Grid Background */}
      <ThreeArchitecturalBackground />

      {/* Interactive Golden Starlight & Sparkle Field throughout the website */}
      <SparkleBackground />

      {/* Sticky Top Luxury Navigation with Theme Switcher */}
      <Navigation />

      {/* Main Interactive Careers Board & Application Experience */}
      <CareersClient />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
