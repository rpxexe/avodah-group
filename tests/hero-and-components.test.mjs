import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Hero Section & Narrative Sequence Configuration", () => {
  const compPath = path.resolve("src/components/ArchitecturalCanvasSequence.tsx");
  const content = fs.readFileSync(compPath, "utf-8");

  test("Component contains all 6 architectural stages", () => {
    assert.match(content, /id:\s*"stage-1"/);
    assert.match(content, /id:\s*"stage-2"/);
    assert.match(content, /id:\s*"stage-3"/);
    assert.match(content, /id:\s*"stage-4"/);
    assert.match(content, /id:\s*"stage-5"/);
    assert.match(content, /id:\s*"stage-6"/);
  });

  test("Hero Stage 1 contains revised architectural text and proof-point metrics", () => {
    assert.match(content, /Where Vision Meets/);
    assert.match(content, /Structural Reality\./);
    assert.match(content, /₹2,500\+\s*Cr/);
    assert.match(content, /20\+\s*Years/);
    assert.match(content, /Cat A & B/);
    assert.match(content, /PropTech/);
  });

  test("Hero contains interactive physics components and touch support", () => {
    assert.match(content, /MagneticPhysicsWrapper/);
    assert.match(content, /WobblyCard/);
    assert.match(content, /handleTouchMove/);
    assert.match(content, /handleTouchEnd/);
  });

  test("Hero stage is fully responsive for mobile view", () => {
    assert.match(content, /onTouchMove=\{handleTouchMove\}/);
    assert.match(content, /grid-cols-2\s+sm:grid-cols-4/);
    assert.match(content, /flex-col\s+sm:flex-row/);
  });
});

describe("Assets & Static Integrity Verification", () => {
  test("Brand logo asset exists with valid PNG dimensions", () => {
    const logoPath = path.resolve("public/assets/avodah-khen-logo.png");
    assert.equal(fs.existsSync(logoPath), true, "Brand logo must exist at public/assets/avodah-khen-logo.png");

    const buf = fs.readFileSync(logoPath);
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    assert.equal(width, 847, "Logo width should be 847px");
    assert.equal(height, 295, "Logo height should be 295px");
  });

  test("Architectural sequence video frames exist", () => {
    const framesDir = path.resolve("public/assets/video-frames");
    assert.equal(fs.existsSync(framesDir), true, "Video frames directory must exist");
    const frame1 = path.join(framesDir, "ezgif-frame-001.jpg");
    const frame25 = path.join(framesDir, "ezgif-frame-025.jpg");
    assert.equal(fs.existsSync(frame1), true, "Initial frame 001 must exist");
    assert.equal(fs.existsSync(frame25), true, "Priority frame 025 must exist");
  });
});

describe("Design System & Global Tokens", () => {
  test("Globals CSS contains both light and dark theme definitions", () => {
    const cssPath = path.resolve("src/app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    assert.match(cssContent, /--theme-bg/);
    assert.match(cssContent, /--theme-accent/);
    assert.match(cssContent, /\[data-theme="light"\]/);
  });
});

describe("Wobbly Card Physics & Sparkle Background", () => {
  test("WobblyCard component exists and implements elastic spring physics", () => {
    const wobblyPath = path.resolve("src/components/WobblyCard.tsx");
    assert.equal(fs.existsSync(wobblyPath), true, "WobblyCard.tsx must exist");
    const content = fs.readFileSync(wobblyPath, "utf-8");
    assert.match(content, /useSpring/);
    assert.match(content, /rotateX/);
    assert.match(content, /rotateY/);
    assert.match(content, /rotateZ/);
    assert.match(content, /wobbleIntensity/);
  });

  test("SparkleBackground component exists and implements mouse interaction across website", () => {
    const sparklePath = path.resolve("src/components/SparkleBackground.tsx");
    assert.equal(fs.existsSync(sparklePath), true, "SparkleBackground.tsx must exist");
    const content = fs.readFileSync(sparklePath, "utf-8");
    assert.match(content, /mousemove/);
    assert.match(content, /connectionDist/);
    assert.match(content, /pointerMaxDist/);
    assert.match(content, /originVx/);
  });

  test("Main page embeds SparkleBackground globally throughout the website", () => {
    const pagePath = path.resolve("src/app/page.tsx");
    const pageContent = fs.readFileSync(pagePath, "utf-8");
    assert.match(pageContent, /<SparkleBackground\s*\/>/);
  });
});

describe("Careers Page & Human Capital Systems", () => {
  test("Careers route page exists and integrates layout components", () => {
    const careersPagePath = path.resolve("src/app/careers/page.tsx");
    assert.equal(fs.existsSync(careersPagePath), true, "Careers page must exist at src/app/careers/page.tsx");
    const pageContent = fs.readFileSync(careersPagePath, "utf-8");
    assert.match(pageContent, /CareersClient/);
    assert.match(pageContent, /Navigation/);
    assert.match(pageContent, /Footer/);
    assert.match(pageContent, /SparkleBackground/);
    assert.match(pageContent, /ThreeArchitecturalBackground/);
  });

  test("CareersClient contains role listings, WobblyCard physics, and application modal", () => {
    const compPath = path.resolve("src/components/careers/CareersClient.tsx");
    assert.equal(fs.existsSync(compPath), true, "CareersClient.tsx must exist");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /WobblyCard/);
    assert.match(content, /Developer Sole Selling Mandates/);
    assert.match(content, /Commercial Advisory/);
    assert.match(content, /PropTech & Engineering/);
    assert.match(content, /Quantitative Strategy/);
    assert.match(content, /Submit Confidential Application/);
    assert.match(content, /Resume \/ CV Dossier/);
    assert.match(content, /showSpontaneousModal/);
  });

  test("Navigation and Footer both link to /careers route", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /href:\s*["']\/careers["']/);

    const footerContent = fs.readFileSync(path.resolve("src/components/Footer.tsx"), "utf-8");
    assert.match(footerContent, /href:\s*["']\/careers["']/);
  });
});

describe("Navigation Dropdown Menus & Research Page", () => {
  test("Navigation contains Services dropdown with mandate, proptech, fintech, and leasing & advisory", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /name:\s*"Services"/);
    assert.match(navContent, /name:\s*"Mandate"/);
    assert.match(navContent, /name:\s*"PropTech"/);
    assert.match(navContent, /name:\s*"FinTech"/);
    assert.match(navContent, /name:\s*"Leasing and Investment Advisory"/);
  });

  test("Navigation contains Company dropdown with Who we are and Leadership", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /name:\s*"Company"/);
    assert.match(navContent, /name:\s*"Who we are"/);
    assert.match(navContent, /name:\s*"Leadership"/);
  });

  test("Navigation contains Research normal menu linking to /research", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /name:\s*"Research"/);
    assert.match(navContent, /href:\s*["']\/research["']/);
  });

  test("Research dedicated page route exists and integrates components", () => {
    const researchPagePath = path.resolve("src/app/research/page.tsx");
    assert.equal(fs.existsSync(researchPagePath), true, "Research page must exist at src/app/research/page.tsx");
    const pageContent = fs.readFileSync(researchPagePath, "utf-8");
    assert.match(pageContent, /ResearchClient/);
    assert.match(pageContent, /Navigation/);
    assert.match(pageContent, /Footer/);
    assert.match(pageContent, /SparkleBackground/);
    assert.match(pageContent, /ThreeArchitecturalBackground/);
  });

  test("ResearchClient contains exact user copy, analytical pillars, and 5-step approach", () => {
    const compPath = path.resolve("src/components/research/ResearchClient.tsx");
    assert.equal(fs.existsSync(compPath), true, "ResearchClient.tsx must exist");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /WobblyCard/);
    assert.match(content, /Know the Market/);
    assert.match(content, /See the Opportunity/);
    assert.match(content, /Make Better Decisions/);
    assert.match(content, /Turning Property Data Into Meaningful Market Intelligence/);
    assert.match(content, /What We Analyse/);
    assert.match(content, /Location Intelligence/);
    assert.match(content, /Market & Price Trends/);
    assert.match(content, /Project & Competitor Intelligence/);
    assert.match(content, /Buyer & Demand Insights/);
    assert.match(content, /Project Positioning/);
    assert.match(content, /Opportunity Identification/);
    assert.match(content, /From Property Data to Market Intelligence/);
    assert.match(content, /Acquisition/);
    assert.match(content, /Development/);
    assert.match(content, /Pricing/);
    assert.match(content, /Sales/);
    assert.match(content, /Marketing/);
    assert.match(content, /Investment/);
    assert.match(content, /01/);
    assert.match(content, /COLLECT/);
    assert.match(content, /ANALYSE/);
    assert.match(content, /COMPARE/);
    assert.match(content, /IDENTIFY/);
    assert.match(content, /ACT/);
    assert.match(content, /Talk to Our Team/);
  });
});

describe("Who We Are Page & Firm Culture Assets", () => {
  test("Who We Are route page exists and integrates layout components", () => {
    const whoPagePath = path.resolve("src/app/who-we-are/page.tsx");
    assert.equal(fs.existsSync(whoPagePath), true, "Who We Are page must exist at src/app/who-we-are/page.tsx");
    const pageContent = fs.readFileSync(whoPagePath, "utf-8");
    assert.match(pageContent, /WhoWeAreClient/);
    assert.match(pageContent, /Navigation/);
    assert.match(pageContent, /Footer/);
    assert.match(pageContent, /SparkleBackground/);
    assert.match(pageContent, /ThreeArchitecturalBackground/);
  });

  test("WhoWeAreClient contains exact user copy, gap analysis, and capabilities", () => {
    const compPath = path.resolve("src/components/whoweare/WhoWeAreClient.tsx");
    assert.equal(fs.existsSync(compPath), true, "WhoWeAreClient.tsx must exist");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /Real Estate/i);
    assert.match(content, /Technology/i);
    assert.match(content, /Intelligence/i);
    assert.match(content, /A technology-led real estate company built around one connected ecosystem/i);
    assert.match(content, /PROPERTY DISCOVERY/);
    assert.match(content, /AI &amp; DATA/);
    assert.match(content, /MANDATES &amp; SALES/);
    assert.match(content, /CRM &amp; INTELLIGENCE/);
    assert.match(content, /THE REAL ESTATE GAP/);
    assert.match(content, /High-Value Assets\. Fragmented Workflows\./);
    assert.match(content, /Fragmented discovery/);
    assert.match(content, /Lead leakage/);
    assert.match(content, /Limited intelligence/);
    assert.match(content, /Complex sales/);
    assert.match(content, /WHAT WE DO/);
    assert.match(content, /Show more\+/);
    assert.match(content, /OUR VISION/);
    assert.match(content, /LET'S BUILD WHAT'S NEXT/);
  });

  test("Awards and Diwali gallery assets exist and are embedded", () => {
    const awardsDir = path.resolve("public/assets/awards");
    assert.equal(fs.existsSync(awardsDir), true, "public/assets/awards must exist");
    const awardImg = path.join(awardsDir, "broker-excellence-award.jpg.jpeg");
    assert.equal(fs.existsSync(awardImg), true, "Award image must exist");

    const diwaliDir = path.resolve("public/assets/diwali");
    assert.equal(fs.existsSync(diwaliDir), true, "public/assets/diwali must exist");
    const diwaliImg = path.join(diwaliDir, "diwali-2025-1.jpg.jpeg");
    assert.equal(fs.existsSync(diwaliImg), true, "Diwali image must exist");

    const compPath = path.resolve("src/components/whoweare/WhoWeAreClient.tsx");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /broker-excellence-award/);
    assert.match(content, /diwali-2025-1/);
  });

  test("Navigation links Who we are to /who-we-are", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /href:\s*["']\/who-we-are["']/);
  });

  test("WhoWeAreClient implements modern responsive grid gallery with lightbox controls", () => {
    const compPath = path.resolve("src/components/whoweare/WhoWeAreClient.tsx");
    const content = fs.readFileSync(compPath, "utf-8");
    // Verify 3-column responsive grid layout
    assert.match(content, /grid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3/);
    assert.match(content, /aspect-\[4\/3\]/);
    // Verify modern badges and interactive carousel controls
    assert.match(content, /Maximize2/);
    assert.match(content, /categoryCounts/);
    assert.match(content, /handlePrevImage/);
    assert.match(content, /handleNextImage/);
  });
});

describe("Mandate Page & Sole Selling Developer Partnerships", () => {
  test("Mandate route page exists and integrates layout components", () => {
    const mandatePagePath = path.resolve("src/app/mandate/page.tsx");
    assert.equal(fs.existsSync(mandatePagePath), true, "Mandate page must exist at src/app/mandate/page.tsx");
    const pageContent = fs.readFileSync(mandatePagePath, "utf-8");
    assert.match(pageContent, /MandateClient/);
    assert.match(pageContent, /Navigation/);
    assert.match(pageContent, /Footer/);
    assert.match(pageContent, /SparkleBackground/);
    assert.match(pageContent, /ThreeArchitecturalBackground/);
  });

  test("MandateClient contains exact user copy, step-by-step guide, and comparison", () => {
    const compPath = path.resolve("src/components/mandate/MandateClient.tsx");
    assert.equal(fs.existsSync(compPath), true, "MandateClient.tsx must exist");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /Why Should You Appoint Us As Your Sole Selling Partner for Your Project/i);
    assert.match(content, /Step-By-Step Guide For Developers In India/i);
    assert.match(content, /UNDERSTANDING THE MODEL/);
    assert.match(content, /What is a Sole Selling Partner\?/);
    assert.match(content, /Centralized pricing strategy/);
    assert.match(content, /Structured inventory allocation/);
    assert.match(content, /A well-established and controlled broker network/);
    assert.match(content, /STEP-BY-STEP GUIDE/);
    assert.match(content, /Define Your Sales Objectives as Your Sole Selling Partner/);
    assert.match(content, /Negotiate the Mandate Agreement/);
    assert.match(content, /Set Performance KPIs/);
    assert.match(content, /Coordinate Sales Execution/);
    assert.match(content, /Show More \+/);
    assert.match(content, /KEY BENEFITS/);
    assert.match(content, /Benefits of Appointing Avodah &amp; Khen a Sole Selling Partner/);
    assert.match(content, /Unified Brand Positioning/);
    assert.match(content, /Strong Pricing Discipline/);
    assert.match(content, /Faster Inventory Absorption/);
    assert.match(content, /THE RIGHT MOMENT/);
    assert.match(content, /New Project Launch/);
    assert.match(content, /Large Township Developments/);
    assert.match(content, /Redevelopment Projects/);
    assert.match(content, /Slow-moving Inventory/);
    assert.match(content, /SALES STRUCTURE/);
    assert.match(content, /Sole Selling Partner vs Multiple Channel Partners/);
    assert.match(content, /Why Should You Appoint a Single Sole Selling Partner\?/);
    assert.match(content, /Why Should You Avoid Appointing Multiple Channel Partners\?/);
    assert.match(content, /Sales Expertise\. Delivered Strategically\./);
    assert.match(content, /MARKET KNOWLEDGE/);
    assert.match(content, /OUR STRENGTH/);
    assert.match(content, /We Pride Ourselves With\.\.\./);
    assert.match(content, /FINAL TAKEAWAY/);
    assert.match(content, /Not Just Sales\. A Structured Growth System\./);
    assert.match(content, /LET'S BUILD YOUR SALES STRATEGY/);
    assert.match(content, /Ready to appoint us as your Sole Selling Partner\?/);
    assert.match(content, /YOUR PROJECT → OUR COMMITMENT → LONG-TERM VALUE/);
  });

  test("Generated mandate images exist in public/assets/mandate and are embedded", () => {
    const dir = path.resolve("public/assets/mandate");
    assert.equal(fs.existsSync(dir), true, "public/assets/mandate directory must exist");
    assert.equal(fs.existsSync(path.join(dir, "mandate-luxury-tower.jpg")), true);
    assert.equal(fs.existsSync(path.join(dir, "mandate-strategy-boardroom.jpg")), true);
    assert.equal(fs.existsSync(path.join(dir, "mandate-experience-center.jpg")), true);

    const compContent = fs.readFileSync(path.resolve("src/components/mandate/MandateClient.tsx"), "utf-8");
    assert.match(compContent, /\/assets\/mandate\/mandate-luxury-tower\.jpg/);
    assert.match(compContent, /\/assets\/mandate\/mandate-strategy-boardroom\.jpg/);
    assert.match(compContent, /\/assets\/mandate\/mandate-experience-center\.jpg/);
  });

  test("Navigation and Footer link to /mandate", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /href:\s*["']\/mandate["']/);

    const footerContent = fs.readFileSync(path.resolve("src/components/Footer.tsx"), "utf-8");
    assert.match(footerContent, /href:\s*["']\/mandate["']/);
  });
});

describe("Leasing & Investment Advisory Page & Institutional Capital", () => {
  test("Leasing & Investment Advisory route page exists and integrates layout components", () => {
    const advisoryPagePath = path.resolve("src/app/leasing-and-investment-advisory/page.tsx");
    assert.equal(fs.existsSync(advisoryPagePath), true, "Advisory page must exist at src/app/leasing-and-investment-advisory/page.tsx");
    const pageContent = fs.readFileSync(advisoryPagePath, "utf-8");
    assert.match(pageContent, /LeasingInvestmentAdvisoryClient/);
    assert.match(pageContent, /Navigation/);
    assert.match(pageContent, /Footer/);
    assert.match(pageContent, /SparkleBackground/);
    assert.match(pageContent, /ThreeArchitecturalBackground/);
  });

  test("LeasingInvestmentAdvisoryClient contains exact user copy, approach, and target clients", () => {
    const compPath = path.resolve("src/components/advisory/LeasingInvestmentAdvisoryClient.tsx");
    assert.equal(fs.existsSync(compPath), true, "LeasingInvestmentAdvisoryClient.tsx must exist");
    const content = fs.readFileSync(compPath, "utf-8");
    assert.match(content, /Leasing &amp; Investment Advisory/i);
    assert.match(content, /Strategic real estate decisions, backed by market intelligence/i);
    assert.match(content, /STRATEGIC REAL ESTATE ADVISORY/);
    assert.match(content, /Making every property decision more informed/);
    assert.match(content, /OUR ADVISORY SERVICES/);
    assert.match(content, /Leasing Advisory/);
    assert.match(content, /Investment Advisory/);
    assert.match(content, /Portfolio Advisory/);
    assert.match(content, /Market Intelligence/);
    assert.match(content, /Show More \+/);
    assert.match(content, /OUR APPROACH/);
    assert.match(content, /From market insight to informed action/);
    assert.match(content, /Understand/);
    assert.match(content, /Analyse/);
    assert.match(content, /Identify/);
    assert.match(content, /Advise/);
    assert.match(content, /Execute/);
    assert.match(content, /WHY AVODAH (&amp;|&) KHEN/);
    assert.match(content, /Market Understanding/);
    assert.match(content, /Data-Led Analysis/);
    assert.match(content, /Strategic Perspective/);
    assert.match(content, /End-to-End Support/);
    assert.match(content, /WHO WE WORK WITH/);
    assert.match(content, /Businesses & Occupiers/);
    assert.match(content, /Property Owners & Developers/);
    assert.match(content, /Investors/);
    assert.match(content, /Institutional & Corporate Clients/);
    assert.match(content, /LET'S WORK TOGETHER/);
    assert.match(content, /Have a real estate decision to make\?/);
    assert.match(content, /Start a Conversation/);
  });

  test("Generated advisory images exist in public/assets/advisory and are embedded", () => {
    const dir = path.resolve("public/assets/advisory");
    assert.equal(fs.existsSync(dir), true, "public/assets/advisory directory must exist");
    assert.equal(fs.existsSync(path.join(dir, "commercial-grade-a-tower.jpg")), true);
    assert.equal(fs.existsSync(path.join(dir, "investment-advisory-lounge.jpg")), true);

    const compContent = fs.readFileSync(path.resolve("src/components/advisory/LeasingInvestmentAdvisoryClient.tsx"), "utf-8");
    assert.match(compContent, /\/assets\/advisory\/commercial-grade-a-tower\.jpg/);
    assert.match(compContent, /\/assets\/advisory\/investment-advisory-lounge\.jpg/);
  });

  test("Navigation and Footer link to /leasing-and-investment-advisory", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /href:\s*["']\/leasing-and-investment-advisory["']/);

    const footerContent = fs.readFileSync(path.resolve("src/components/Footer.tsx"), "utf-8");
    assert.match(footerContent, /href:\s*["']\/leasing-and-investment-advisory["']/);
  });
});

describe("PropTech & FinTech Launching Soon & Expressive Physics Blob", () => {
  test("PropTech and FinTech page routes exist with full metadata", () => {
    const proptechPage = path.resolve("src/app/proptech/page.tsx");
    const fintechPage = path.resolve("src/app/fintech/page.tsx");
    assert.equal(fs.existsSync(proptechPage), true, "PropTech page route must exist");
    assert.equal(fs.existsSync(fintechPage), true, "FinTech page route must exist");

    const propContent = fs.readFileSync(proptechPage, "utf-8");
    assert.match(propContent, /LaunchingSoonClient\s+type="proptech"/);
    assert.match(propContent, /PropTech Ecosystem/);

    const finContent = fs.readFileSync(fintechPage, "utf-8");
    assert.match(finContent, /LaunchingSoonClient\s+type="fintech"/);
    assert.match(finContent, /FinTech Capital Engine/);
  });

  test("Feral UI Blob Mascot component implements JellyBlobMascot, BlobSpeech, and gaze tracking without extraneous option controls", () => {
    const feralComp = path.resolve("src/components/feral/FeralBlobShowcase.tsx");
    assert.equal(fs.existsSync(feralComp), true, "FeralBlobShowcase component must exist");
    const content = fs.readFileSync(feralComp, "utf-8");

    assert.match(content, /JellyBlobMascot/);
    assert.match(content, /BlobSpeech/);
    assert.match(content, /feral-blob\/blob\.css/);
    assert.match(content, /handleMouseMove/);
    assert.match(content, /gaze/);
    assert.match(content, /--jelly-body-top/);
  });

  test("LaunchingSoonClient component renders single-screen visible layout with centered FeralBlobShowcase and early access", () => {
    const clientPath = path.resolve("src/components/launching-soon/LaunchingSoonClient.tsx");
    assert.equal(fs.existsSync(clientPath), true);
    const content = fs.readFileSync(clientPath, "utf-8");

    assert.match(content, /FeralBlobShowcase/);
    assert.match(content, /max-h-\[100dvh\]/);
    assert.match(content, /overflow-hidden/);
    assert.match(content, /Notify Me/);
    assert.match(content, /Discuss Early Integration/);
  });

  test("Navigation and Footer link to /proptech and /fintech with Soon badges", () => {
    const navContent = fs.readFileSync(path.resolve("src/components/Navigation.tsx"), "utf-8");
    assert.match(navContent, /href:\s*["']\/proptech["']/);
    assert.match(navContent, /href:\s*["']\/fintech["']/);

    const footerContent = fs.readFileSync(path.resolve("src/components/Footer.tsx"), "utf-8");
    assert.match(footerContent, /href:\s*["']\/proptech["']/);
    assert.match(footerContent, /href:\s*["']\/fintech["']/);
  });
});



