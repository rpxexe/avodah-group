"use client";

import React from "react";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import ArchitecturalCanvasSequence from "@/components/ArchitecturalCanvasSequence";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import EcosystemSection from "@/components/EcosystemSection";
import ResearchSection from "@/components/ResearchSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Physics-based Custom Mouse Cursor */}
      <CustomCursor />

      {/* 3D WebGL Architectural Grid & Particle Field (Three.js) */}
      <ThreeArchitecturalBackground />

      {/* Interactive Golden Starlight & Sparkle Field throughout the website */}
      <SparkleBackground />

      {/* Sticky Top Luxury Navigation with Theme Switcher */}
      <Navigation />

      {/* Redesigned Hero & 300-Frame Scroll-Controlled Architectural Canvas Experience */}
      <ArchitecturalCanvasSequence />

      {/* Seamless Typographic Marquee Ribbon */}
      <MarqueeStrip />

      {/* Section 1: Firm Overview & Philosophy */}
      <AboutSection />

      {/* Section 2: Core Mandates & Institutional Advisory (3D Tilt Cards) */}
      <ServicesSection />

      {/* Section 3: Connected PropTech & FinTech Ecosystem */}
      <EcosystemSection />

      {/* Section 4: Domain Research & Market Intelligence */}
      <ResearchSection />

      {/* Section 5: Consultation Inquiry & Direct Channels */}
      <ContactSection />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
