import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ThreeArchitecturalBackground from "@/components/ThreeArchitecturalBackground";
import SparkleBackground from "@/components/SparkleBackground";
import Navigation from "@/components/Navigation";
import ContactClient from "@/components/contact/ContactClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Get in Touch & Advisory Consultations — AVODAH & KHEN LLP",
  description:
    "Initiate a confidential strategic dialogue with AVODAH & KHEN LLP in Mumbai. Structured sole selling developer mandates, corporate commercial leasing, and institutional real estate investment consultations.",
  keywords: [
    "Get in Touch Avodah Khen",
    "Contact Avodah & Khen Mumbai",
    "Real Estate Mandate Consultation",
    "Developer Sales Partnership Inquiry",
    "Commercial Corporate Leasing Mumbai",
    "Real Estate Capital Markets Advisory",
    "Bandra Kurla Complex Advisory Chambers",
  ],
  openGraph: {
    title: "Get in Touch — AVODAH & KHEN LLP | Real Estate & Architectural Advisory",
    description:
      "Connect directly with our advisory principals for developer sole selling mandates, commercial leasing, and institutional capital sourcing across Mumbai.",
    type: "website",
  },
};

export default function ContactPage() {
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

      {/* Main Interactive Contact & Consultation Experience */}
      <ContactClient />

      {/* Architectural Colophon & Footer */}
      <Footer />
    </main>
  );
}
