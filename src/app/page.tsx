"use client";

import React from "react";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import ArchitecturalCanvasSequence from "@/components/ArchitecturalCanvasSequence";
import MarqueeStrip from "@/components/MarqueeStrip";
import EcosystemSection from "@/components/EcosystemSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import AboutSection from "@/components/AboutSection";
import ResearchSection from "@/components/ResearchSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Physics-based Custom Mouse Cursor */}
      <CustomCursor />

      {/* 3D WebGL Architectural Grid & Particle Field (Three.js) */}
      <ThreeArchitecturalBackground />

      {/* Interactive Golden Starlight & Sparkle Field throughout the website */}
      <SparkleBackground />

      {/* Sticky Top Luxury Navigation with Theme Switcher */}
      <Navigation />

      {/* Hero: REAL ESTATE. REIMAGINED WITH PROPTECH (300-Frame Scroll-Controlled Sequence) */}
      <ArchitecturalCanvasSequence />

      {/* Seamless Typographic Marquee Ribbon */}
      <MarqueeStrip />

      {/* Section 1: OUR CONNECTED ECOSYSTEM */}
      <EcosystemSection />

      {/* Section 2: CORE CAPABILITIES (Discover, Understand, Represent, Manage, Convert, Optimize) */}
      <ServicesSection />

      {/* Section 3: HOW WE WORK (Acquire, Position, Generate, Manage, Convert, Learn) */}
      <HowWeWorkSection />

      {/* Section 4: WHY AVODAH (Real-estate first, Technology-led, Execution focused, Data connected) */}
      <AboutSection />

      {/* Section 5: Domain Research & Market Intelligence */}
      <ResearchSection />

      {/* Section 6: LET’S CONNECT (Consultation Inquiry & Direct Channels) */}
      <ContactSection />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
