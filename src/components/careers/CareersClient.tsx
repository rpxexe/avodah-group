"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  Building2,
  Sparkles,
  Upload,
  X,
  Award,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  DollarSign,
  Laptop,
  Compass,
  FileText,
  AlertCircle
} from "lucide-react";
import WobblyCard from "@/components/WobblyCard";

interface JobRole {
  id: string;
  title: string;
  department: "Mandates & Sales" | "Commercial Advisory" | "PropTech & Engineering" | "Quantitative Strategy";
  location: string;
  experience: string;
  type: string;
  compensation: string;
  tagline: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  perks: string[];
}

const JOB_ROLES: JobRole[] = [
  {
    id: "svp-mandates",
    title: "Senior Vice President — Developer Sole Selling Mandates",
    department: "Mandates & Sales",
    location: "BKC, Mumbai",
    experience: "10–15 Years",
    type: "Full-Time",
    compensation: "Top-Tier Base + Sole Mandate Success Carry",
    tagline: "Direct exclusive Category A developer projects exceeding ₹500 Cr+ GDV with institutional velocity.",
    overview:
      "As Senior Vice President of Sole Selling Mandates at Avodah & Khen LLP, you will hold executive accountability for developer mandate acquisitions, sales velocity orchestration, and high-performance go-to-market execution across South Mumbai and Western Suburbs.",
    responsibilities: [
      "Originate, structure, and execute Category A & B developer sole selling partnerships with projected project GDVs ranging from ₹250 Cr to ₹1,500 Cr.",
      "Lead a dedicated team of mandate directors, sales managers, and digital performance analysts.",
      "Devise pricing velocity strategies, inventory absorption schedules, and ultra-high-net-worth investor roadshows.",
      "Direct regular executive board reporting with developer promoters, providing econometric insights and competitive micro-market positioning.",
    ],
    qualifications: [
      "10–15+ years of demonstrable track record in Tier-1 residential or mixed-use project sole selling mandates in Mumbai/MMR.",
      "Extensive personal relationships with leading developers, family offices, and Tier-1 channel partners.",
      "Mastery of institutional deal structuring, RERA compliance frameworks, and real estate marketing funnels.",
      "Bachelor's / Master's degree in Business, Real Estate, Finance, or Architecture.",
    ],
    perks: [
      "Direct profit/carry participation on project mandate performance milestones",
      "Executive suite at our flagship BKC office",
      "Global architectural & real estate forum delegations",
    ],
  },
  {
    id: "dir-commercial",
    title: "Director — Grade-A Commercial Advisory & Corporate Leasing",
    department: "Commercial Advisory",
    location: "BKC, Mumbai / Gurugram",
    experience: "8–12 Years",
    type: "Full-Time",
    compensation: "Executive Base + Transaction Advisory Split",
    tagline: "Advise Fortune 500 corporations, GCCs, and BFSI leaders on large-format prime commercial leases.",
    overview:
      "Avodah & Khen's Commercial Advisory practice guides multinational enterprises, global capability centers (GCCs), and institutional asset owners through prime office acquisitions, consolidations, and strategic lease restructurings.",
    responsibilities: [
      "Originate and advise on Grade-A corporate office leasing transactions exceeding 50,000 to 500,000+ sq. ft.",
      "Provide corporate occupiers with spatial efficiency underwriting, green building certification advisory (LEED/WELL), and financial lease modeling.",
      "Cultivate high-level advisory relationships with institutional REIT asset managers and corporate real estate heads.",
      "Partner with our PropTech analytics team to deploy proprietary micro-market rental yield and absorption simulations.",
    ],
    qualifications: [
      "8–12 years in institutional commercial real estate advisory with leading international or premier boutique consultancies.",
      "Proven history of closing large-scale MNC tenant representation or landlord mandate assignments.",
      "Strong understanding of leasehold legal covenants, stamp duty, capital expenditure amortizations, and fit-out modeling.",
    ],
    perks: [
      "Uncapped transaction incentive structure",
      "Full premium executive health and wellness coverage",
      "Flexible hybrid client engagement framework",
    ],
  },
  {
    id: "lead-proptech",
    title: "Lead PropTech Systems Architect (Full Stack / WebGL)",
    department: "PropTech & Engineering",
    location: "Mumbai (Hybrid)",
    experience: "5–8 Years",
    type: "Full-Time",
    compensation: "Competitive Base + Tech Equity Incentive",
    tagline: "Architect proprietary advisory platforms, real-time spatial digital twins, and algorithmic price discovery engines.",
    overview:
      "We are bridging traditional 20-year real estate advisory pedigree with bleeding-edge technology. You will lead the development of our interactive spatial sequencing engines, developer portal, and proprietary micro-market intelligence algorithms.",
    responsibilities: [
      "Architect and build client-facing luxury web applications using Next.js App Router, React 19, TypeScript, and Three.js/WebGL.",
      "Develop high-throughput real estate data pipelines integrating registry data, developer inventory, and predictive price curves.",
      "Collaborate with spatial visualizers to render interactive 3D architectural digital twins directly in web browsers with 60 FPS performance.",
      "Oversee cloud architecture, API integrations, and robust zero-trust security for high-net-worth transactional portals.",
    ],
    qualifications: [
      "5–8 years of full-stack engineering experience with heavy frontend performance engineering (Next.js, TypeScript, React, Tailwind CSS).",
      "Proficiency with WebGL, Three.js, or shader programming for interactive spatial experiences.",
      "Demonstrated ability to architect scalable microservices and database schemas (PostgreSQL, Redis, Cloud Run).",
      "Obsession with aesthetic micro-interactions, responsive physics, and sub-100ms load times.",
    ],
    perks: [
      "Top-spec Apple M-Series hardware & Herman Miller workstation setup",
      "Generous tech learning, conference, and cloud experimentation stipends",
      "Direct equity participation in Avodah's PropTech spin-outs",
    ],
  },
  {
    id: "avp-capital-markets",
    title: "Associate Vice President — Real Estate Capital Markets",
    department: "Quantitative Strategy",
    location: "BKC, Mumbai",
    experience: "6–10 Years",
    type: "Full-Time",
    compensation: "Base + Structured Capital Placement Bonus",
    tagline: "Structure institutional private equity, structured debt, and developer joint venture capital stacks.",
    overview:
      "Partner with private equity funds, NBFCs, sovereign wealth managers, and Tier-1 developers to structure high-yield debt, mezzanine financing, and development equity for premier real estate undertakings.",
    responsibilities: [
      "Underwrite and evaluate structured finance and joint-development proposals across residential, commercial, and warehousing assets.",
      "Draft institutional investment memoranda, detailed DCF models, and risk-adjusted IRR scenarios for capital allocators.",
      "Liaise with legal counsels and valuation experts to execute due diligence and covenant drafting.",
      "Build deep syndication relationships with family offices, private debt funds, and domestic financial institutions.",
    ],
    qualifications: [
      "6–10 years in real estate private equity, investment banking, or capital markets advisory.",
      "Mastery of financial modeling, debt structuring, waterfall distributions, and asset valuation.",
      "MBA from a premier institution (IIM / ISB / Ivy League) or CFA charterholder preferred.",
    ],
    perks: [
      "Lucrative syndication carry and performance-linked bonuses",
      "Direct mentorship from senior founding partners with ₹2,500+ Cr cumulative transaction record",
      "Access to bespoke institutional real estate networks",
    ],
  },
  {
    id: "sr-quant-analyst",
    title: "Senior Quantitative Real Estate Analyst",
    department: "Quantitative Strategy",
    location: "Mumbai (Hybrid)",
    experience: "3–6 Years",
    type: "Full-Time",
    compensation: "High-Growth Base + Discretionary Performance Bonus",
    tagline: "Build econometric micro-market absorption models, yield analysis, and quarterly research publications.",
    overview:
      "Transform disparate urban planning, registry sales deeds, and developer launch data into actionable mathematical intelligence that guides our developer advisory and institutional investor mandates.",
    responsibilities: [
      "Formulate predictive econometric models forecasting micro-market price appreciation and developer sales velocity.",
      "Conduct in-depth quantitative research on infrastructure catalysts (Metro 3, Coastal Road, Trans-Harbour Link) and their property valuation impacts.",
      "Produce quarterly institutional market reports published to our high-net-worth investor network and media publications.",
      "Assist mandate teams in custom financial feasibility studies and competitor benchmarking.",
    ],
    qualifications: [
      "3–6 years in real estate research, equity research, or econometric consulting.",
      "High proficiency in Python (Pandas/NumPy), SQL, and statistical regression modeling.",
      "Strong technical writing skills with an eye for clear, beautiful data visualization.",
    ],
    perks: [
      "Co-authorship on high-visibility national real estate reports",
      "Hybrid work schedule with collaborative BKC office access",
      "Accelerated path to advisory director roles",
    ],
  },
  {
    id: "spatial-designer",
    title: "Spatial Experience & 3D Architectural Visualizer",
    department: "PropTech & Engineering",
    location: "Mumbai (Hybrid)",
    experience: "4–7 Years",
    type: "Full-Time",
    compensation: "Competitive Base + Creative Project Milestones",
    tagline: "Craft ultra-luxury interactive digital twin experiences and spatial architectural storyboards.",
    overview:
      "Avodah & Khen LLP represents the pinnacle of luxury architectural real estate. You will translate blueprints, BIM files, and architectural concepts into hyper-photorealistic digital twins, walkthroughs, and interactive web visualizers.",
    responsibilities: [
      "Transform CAD and Revit architectural models into optimized, photo-real 3D assets for interactive web and cinematic presentations.",
      "Produce cinematic architectural renders, lighting simulations, and material palettes for ultra-luxury penthouses and commercial developments.",
      "Collaborate with the frontend engineering team to optimize 3D meshes, textures, and GLTF models for seamless browser delivery.",
      "Establish aesthetic guidelines for digital architectural storytelling across all firm mandates.",
    ],
    qualifications: [
      "4–7 years in architectural visualization, 3D digital twin creation, or luxury CGI production.",
      "Proficiency with 3ds Max, Blender, Unreal Engine, V-Ray / Corona, and WebGL optimization pipelines.",
      "Deep understanding of architectural proportion, materiality, photometrics, and cinematic composition.",
    ],
    perks: [
      "Dedicated high-powered RTX workstation and render farm allocations",
      "Portfolio of India's most prestigious architectural projects",
      "Flexible creative studio hours",
    ],
  },
];

const DEPARTMENTS = [
  "All Opportunities",
  "Mandates & Sales",
  "Commercial Advisory",
  "PropTech & Engineering",
  "Quantitative Strategy",
] as const;

export default function CareersClient() {
  const [selectedDept, setSelectedDept] = useState<string>("All Opportunities");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState<JobRole | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSpontaneousModal, setShowSpontaneousModal] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    experience: "",
    currentOrg: "",
    noticePeriod: "Immediate / 15 Days",
    message: "",
  });
  const [spontaneousData, setSpontaneousData] = useState({
    fullName: "",
    email: "",
    phone: "",
    areaOfMastery: "Sole Selling Mandates & Developer GTM",
  });
  const [isSpontaneousSubmitting, setIsSpontaneousSubmitting] = useState(false);
  const [spontaneousSuccess, setSpontaneousSuccess] = useState<string | null>(null);
  const [spontaneousError, setSpontaneousError] = useState<string | null>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");
  const [formError, setFormError] = useState("");

  // Filtered Roles
  const filteredRoles = useMemo(() => {
    return JOB_ROLES.filter((role) => {
      const matchesDept =
        selectedDept === "All Opportunities" || role.department === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        role.title.toLowerCase().includes(query) ||
        role.department.toLowerCase().includes(query) ||
        role.location.toLowerCase().includes(query) ||
        role.tagline.toLowerCase().includes(query) ||
        role.responsibilities.some((r) => r.toLowerCase().includes(query));
      return matchesDept && matchesQuery;
    });
  }, [selectedDept, searchQuery]);

  // Handle open modal
  const handleOpenRole = (role: JobRole) => {
    setActiveRole(role);
    setShowApplyModal(true);
    setIsSubmitted(false);
    setFormError("");
  };

  const handleCloseModal = () => {
    setShowApplyModal(false);
    setActiveRole(null);
    setIsSubmitted(false);
    setFormError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFormError("File size exceeds 10MB limit. Please upload a lighter PDF/DOCX.");
        return;
      }
      setResumeFile(file);
      setFormError("");
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          department: activeRole?.department || "General Application",
          roleTitle: activeRole?.title || "Spontaneous Application",
          experience: formData.experience.trim(),
          currentCompany: formData.currentOrg.trim(),
          noticePeriod: formData.noticePeriod,
          linkedinUrl: formData.linkedin.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.referenceCode) {
        throw new Error(data.error || "Failed to submit application to the database. Please try again.");
      }

      setApplicationRef(data.referenceCode);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("[CAREER_SUBMIT_ERROR]", err);
      setFormError(err instanceof Error ? err.message : "Failed to submit application. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpontaneousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spontaneousData.fullName.trim() || !spontaneousData.email.trim()) {
      setSpontaneousError("Please enter your name and email.");
      return;
    }

    setIsSpontaneousSubmitting(true);
    setSpontaneousError(null);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: spontaneousData.fullName.trim(),
          email: spontaneousData.email.trim(),
          phone: spontaneousData.phone.trim() || "+91 99999 99999",
          department: "VIP Talent Network",
          roleTitle: spontaneousData.areaOfMastery,
          message: `Open Executive Candidacy submitted for: ${spontaneousData.areaOfMastery}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to log candidacy.");
      }

      setSpontaneousSuccess(data.referenceCode || "REGISTERED");
      setTimeout(() => {
        setShowSpontaneousModal(false);
        setSpontaneousSuccess(null);
        setSpontaneousData({
          fullName: "",
          email: "",
          phone: "",
          areaOfMastery: "Sole Selling Mandates & Developer GTM",
        });
      }, 2500);
    } catch (err: unknown) {
      console.error("[SPONTANEOUS_SUBMIT_ERROR]", err);
      setSpontaneousError(err instanceof Error ? err.message : "Failed to record candidacy. Please try again.");
    } finally {
      setIsSpontaneousSubmitting(false);
    }
  };

  return (
    <div className="relative z-25 pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--theme-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--theme-accent)] transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--theme-accent)] font-semibold">HUMAN CAPITAL &amp; CAREERS</span>
        </div>

        {/* Hero Section */}
        <div className="relative mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-accent)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
              CAREERS AT AVODAH &amp; KHEN LLP
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--theme-text)] leading-[1.08] max-w-5xl mb-6">
            Shape the Skyline of{" "}
            <span className="italic font-normal text-[var(--theme-accent)]">
              High-Value Real Estate
            </span>{" "}
            &amp; PropTech.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--theme-text-muted)] font-light max-w-3xl leading-relaxed mb-10">
            We are curating a discreet cadre of institutional dealmakers, commercial advisors, and
            systems architects. Here, 20+ years of sole selling developer pedigree converges with
            algorithmic micro-market intelligence.
          </p>

          {/* Key Firm Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/80 backdrop-blur-md shadow-sm">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                ₹2,500<span className="text-[var(--theme-accent)]">+</span> Cr
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Transaction Volume
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                Top 1<span className="text-[var(--theme-accent)]">%</span>
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Incentive &amp; Carry Splits
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                Cat A &amp; B
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Exclusive Developer Mandates
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                BKC, Mumbai
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] font-mono tracking-wider uppercase mt-1">
                Prime Corporate HQ
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-[var(--theme-border)] pb-8">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDept === dept;
              const count =
                dept === "All Opportunities"
                  ? JOB_ROLES.length
                  : JOB_ROLES.filter((r) => r.department === dept).length;

              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] shadow-sm font-bold"
                      : "bg-[var(--theme-surface-glass)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface)] border border-[var(--theme-border)]"
                  }`}
                >
                  <span>{dept}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#0c0d0c]"
                        : "bg-[var(--theme-border)] text-[var(--theme-text-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Roles Listing Grid with WobblyCard Physics */}
        {filteredRoles.length === 0 ? (
          <div className="text-center py-16 px-6 border border-dashed border-[var(--theme-border)] rounded-2xl bg-[var(--theme-surface-glass)]/40">
            <AlertCircle className="w-10 h-10 mx-auto text-[var(--theme-accent)] mb-3 opacity-80" />
            <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] mb-2">
              No matching positions found
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] max-w-md mx-auto mb-6">
              We update our institutional requisitions regularly. Submit a spontaneous candidacy to join our VIP talent syndicate.
            </p>
            <button
              onClick={() => setShowSpontaneousModal(true)}
              className="px-5 py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 transition-all cursor-pointer"
            >
              Submit Open Candidacy
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
            {filteredRoles.map((role) => (
              <WobblyCard
                key={role.id}
                wobbleIntensity={8}
                className="p-6 sm:p-8 flex flex-col justify-between h-full bg-[var(--theme-card-bg)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-2xl transition-colors duration-300 shadow-md group relative overflow-hidden"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold">
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] px-2.5 py-1 rounded bg-[var(--theme-surface-glass)] border border-[var(--theme-border)]">
                      <Clock className="w-3 h-3 text-[var(--theme-accent)]" />
                      {role.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors duration-200 mb-3 leading-snug">
                    {role.title}
                  </h3>

                  {/* Tagline / Pitch */}
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-6">
                    {role.tagline}
                  </p>

                  {/* Location & Experience Pills */}
                  <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-[var(--theme-text-muted)] font-light">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                      {role.location}
                    </span>
                    <span className="text-[var(--theme-border)]">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                      {role.experience}
                    </span>
                    <span className="text-[var(--theme-border)]">•</span>
                    <span className="inline-flex items-center gap-1.5 text-[var(--theme-text)] font-medium">
                      <DollarSign className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                      {role.compensation}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[var(--theme-border)]/60 flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleOpenRole(role)}
                    className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Role Profile</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleOpenRole(role)}
                    className="px-4 py-2 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </WobblyCard>
            ))}
          </div>
        )}

        {/* Culture & Human Capital Pillars */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
              OUR HUMAN CAPITAL PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[var(--theme-text)] mb-4">
              Why Extraordinary Minds Choose Avodah &amp; Khen
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
              We reject rigid corporate bureaucracy in favor of sovereign deal ownership, high-trust autonomy, and uncapped remuneration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                Mandate Sovereignty &amp; High Trust
              </h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                Take direct ownership of ₹500 Cr+ Category A developer assignments. You lead strategy, negotiations, and developer advisory with full institutional backing.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                Direct Deal Carry &amp; Equity Wealth
              </h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                We believe those who originate and close landmark real estate transactions should participate directly in project carry and venture equity.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/90 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-3">
                PropTech &amp; Algorithmic Speed
              </h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed">
                Supercharge your advisory with proprietary spatial digital twins, micro-market absorption algorithms, and instant institutional investor syndication.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Perks Strip */}
        <div className="p-8 sm:p-12 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-glass)]/60 backdrop-blur-md mb-20 sm:mb-28">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-2 block">
                COMPREHENSIVE REMUNERATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)]">
                Executive Wellbeing &amp; Leadership Privileges
              </h3>
            </div>
            <button
              onClick={() => setShowSpontaneousModal(true)}
              className="px-5 py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-sm transition-all cursor-pointer shrink-0"
            >
              Contact Human Capital
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-6 border-t border-[var(--theme-border)]">
            <div className="flex flex-col gap-2">
              <Award className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">Uncapped Carry</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                Direct deal profit participation
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">Family Healthcare</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                Comprehensive platinum insurance
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Compass className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">Global Summits</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                MIPIM &amp; PropTech symposium travel
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Laptop className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">M-Series Tech</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                Flagship workstations &amp; gear
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Building2 className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">BKC Headquarters</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                Prime grade-A financial center office
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <FileText className="w-5 h-5 text-[var(--theme-accent)]" />
              <h4 className="text-xs font-semibold text-[var(--theme-text)]">Partner Mentorship</h4>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-light">
                Direct guidance from 20-yr founders
              </p>
            </div>
          </div>
        </div>

        {/* Spontaneous Application Banner */}
        <div className="relative p-8 sm:p-14 rounded-3xl border border-[var(--theme-border-accent)] bg-gradient-to-br from-[var(--theme-surface-glass)] via-[var(--theme-bg-secondary)] to-[var(--theme-surface-glass)] backdrop-blur-xl text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--theme-accent)] font-semibold mb-3 block">
              TALENT NETWORK &amp; DISCREET CANDIDACY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--theme-text)] mb-4">
              Don&apos;t See Your Exact Role?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-light leading-relaxed mb-8">
              We frequently create bespoke practice mandates and engineering leads for exceptional
              professionals. Send your confidential portfolio directly to our executive committee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowSpontaneousModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Confidential Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:careers@avodahgroup.co?subject=Confidential%20Executive%20Candidacy%20—%20Avodah%20%26%20Khen%20LLP"
                className="w-full sm:w-auto px-6 py-3 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] bg-[var(--theme-surface-glass)] text-[var(--theme-text)] font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer text-center"
              >
                Direct Partner Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Role Details & Direct Apply Modal */}
      <AnimatePresence>
        {showApplyModal && activeRole && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-glass)] transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Role Header */}
              <div className="pr-10 mb-6 border-b border-[var(--theme-border)] pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold">
                    {activeRole.department}
                  </span>
                  <span className="text-[var(--theme-border)]">•</span>
                  <span className="text-xs text-[var(--theme-text-muted)] font-light">
                    {activeRole.location}
                  </span>
                  <span className="text-[var(--theme-border)]">•</span>
                  <span className="text-xs text-[var(--theme-text-muted)] font-light">
                    {activeRole.experience}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)] mb-3 leading-snug">
                  {activeRole.title}
                </h2>

                <p className="text-xs text-[var(--theme-accent)] font-medium font-mono">
                  Remuneration: {activeRole.compensation}
                </p>
              </div>

              {!isSubmitted ? (
                <div>
                  {/* Role Overview */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-[var(--theme-accent)] uppercase mb-2">
                      Role Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed font-light">
                      {activeRole.overview}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold tracking-wider text-[var(--theme-accent)] uppercase mb-3">
                      Key Mandates &amp; Responsibilities
                    </h4>
                    <ul className="space-y-2.5">
                      {activeRole.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--theme-text-muted)] leading-relaxed font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Profile Requirements */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold tracking-wider text-[var(--theme-accent)] uppercase mb-3">
                      Candidate Profile &amp; Pedigree
                    </h4>
                    <ul className="space-y-2.5">
                      {activeRole.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--theme-text-muted)] leading-relaxed font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleSubmitApplication} className="border-t border-[var(--theme-border)] pt-6">
                    <h3 className="font-serif text-xl font-light text-[var(--theme-text)] mb-4">
                      Submit Confidential Application
                    </h3>

                    {formError && (
                      <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Vikramaditya Singhania"
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="v.singhania@firm.com"
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98200 XXXXX"
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          LinkedIn or Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Current Organization / Role
                        </label>
                        <input
                          type="text"
                          value={formData.currentOrg}
                          onChange={(e) => setFormData({ ...formData, currentOrg: e.target.value })}
                          placeholder="Current firm / designation"
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                          Notice Period
                        </label>
                        <select
                          value={formData.noticePeriod}
                          onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] cursor-pointer"
                        >
                          <option value="Immediate / 15 Days">Immediate / 15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                          <option value="Confidential Inquiry">Confidential Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload Box */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Resume / CV Dossier (PDF, DOCX up to 10MB)
                      </label>
                      <div className="border border-dashed border-[var(--theme-border)] hover:border-[var(--theme-accent)] rounded-xl p-4 text-center bg-[var(--theme-surface-glass)]/50 transition-colors">
                        <input
                          type="file"
                          id="resume-file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="resume-file"
                          className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                        >
                          <Upload className="w-5 h-5 text-[var(--theme-accent)]" />
                          <span className="text-xs text-[var(--theme-text)] font-medium">
                            {resumeFile ? resumeFile.name : "Click to select or drop resume dossier"}
                          </span>
                          <span className="text-[10px] text-[var(--theme-text-muted)]">
                            {resumeFile
                              ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB attached`
                              : "Encrypted & treated with strict partner confidentiality"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Note to the Partners */}
                    <div className="mb-6">
                      <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                        Executive Summary / Note to Partners (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Brief summary of your transactions, developer relationships, or technical portfolio..."
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-xs font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white dark:border-[#0c0d0c] border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Dossier...</span>
                          </>
                        ) : (
                          <>
                            <span>Transmit Application</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Application Success State */
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)] flex items-center justify-center text-[var(--theme-accent)] mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-[var(--theme-text)] mb-2">
                    Application Dossier Received
                  </h3>
                  <p className="text-xs font-mono text-[var(--theme-accent)] tracking-widest uppercase mb-4">
                    Reference ID: {applicationRef}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] max-w-md mx-auto leading-relaxed mb-8">
                    Your credentials have been placed into our executive committee queue. Our managing partners review all strategic appointments discreetly within 48 business hours.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 transition-all cursor-pointer"
                  >
                    Done &amp; Return to Listings
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spontaneous Open Candidacy Modal */}
      <AnimatePresence>
        {showSpontaneousModal && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpontaneousModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-2xl p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setShowSpontaneousModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-mono tracking-widest text-[var(--theme-accent)] uppercase font-semibold block mb-1">
                  VIP TALENT NETWORK
                </span>
                <h3 className="font-serif text-2xl font-light text-[var(--theme-text)] mb-2">
                  Open Executive Candidacy
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] font-light leading-relaxed">
                  Join our confidential human capital directory. We notify select professionals of discreet mandate partnerships before public announcements.
                </p>
              </div>

              {spontaneousSuccess ? (
                <div className="p-6 text-center rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-accent)]/30">
                  <div className="inline-flex p-3 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl text-[var(--theme-text)] mb-1">
                    Candidacy Recorded
                  </h4>
                  <p className="text-xs text-[var(--theme-text-muted)] font-light mb-3">
                    Your executive dossier is safely stored in our confidential registry.
                  </p>
                  <span className="font-mono text-xs px-3 py-1 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded text-[var(--theme-accent)] font-semibold">
                    Ref: #{spontaneousSuccess}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSpontaneousSubmit} className="space-y-4">
                  {spontaneousError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {spontaneousError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={spontaneousData.fullName}
                      onChange={(e) => setSpontaneousData((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={spontaneousData.email}
                      onChange={(e) => setSpontaneousData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                      Mobile Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={spontaneousData.phone}
                      onChange={(e) => setSpontaneousData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                      Area of Mastery
                    </label>
                    <select
                      name="areaOfMastery"
                      value={spontaneousData.areaOfMastery}
                      onChange={(e) => setSpontaneousData((prev) => ({ ...prev, areaOfMastery: e.target.value }))}
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                    >
                      <option>Sole Selling Mandates &amp; Developer GTM</option>
                      <option>Commercial Office Leasing Advisory</option>
                      <option>PropTech &amp; WebGL / Full-Stack Engineering</option>
                      <option>Real Estate Capital Markets &amp; Debt Syndication</option>
                      <option>Econometric Research &amp; Data Science</option>
                      <option>3D Architectural Visualization &amp; Digital Twins</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--theme-text-muted)] uppercase mb-1">
                      Direct Email to Partners
                    </label>
                    <p className="text-xs text-[var(--theme-text)] font-mono p-2.5 rounded bg-[var(--theme-surface-glass)] border border-[var(--theme-border)]">
                      careers@avodahgroup.co
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={isSpontaneousSubmitting}
                      onClick={() => setShowSpontaneousModal(false)}
                      className="px-4 py-2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSpontaneousSubmitting}
                      className="px-5 py-2 bg-[var(--theme-accent)] text-white dark:text-[#0c0d0c] font-bold text-xs uppercase tracking-widest rounded hover:brightness-110 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSpontaneousSubmitting ? "Registering..." : "Register Confidential Interest"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
