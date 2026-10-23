import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Global Scroll Position Restoration System", () => {
  const scrollToTopPath = path.resolve("src/components/ScrollToTop.tsx");
  const layoutPath = path.resolve("src/app/layout.tsx");

  test("ScrollToTop component exists and is a client component", () => {
    assert.equal(fs.existsSync(scrollToTopPath), true, "ScrollToTop.tsx component must exist in src/components/");
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /^["']use client["'];?/, "ScrollToTop must be a Client Component with 'use client'");
  });

  test("ScrollToTop uses usePathname for reliable Next.js App Router navigation detection", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /import\s*\{\s*[^}]*usePathname[^}]*\}\s*from\s*["']next\/navigation["']/, "Must import usePathname from next/navigation");
    assert.match(content, /const\s+pathname\s*=\s*usePathname\(\)/, "Must call usePathname hook");
    assert.match(content, /useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[pathname\]\s*\)/, "Must monitor pathname changes via useEffect");
  });

  test("ScrollToTop resets scroll position to top using instant scroll and DOM element fallbacks", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /window\.scrollTo\s*\(\s*\{[\s\S]*?top:\s*0[\s\S]*?left:\s*0[\s\S]*?behavior:\s*["']instant["']/, "Must call window.scrollTo with top: 0, left: 0 and instant behavior");
    assert.match(content, /html\.scrollTop\s*=\s*0/, "Must set document.documentElement.scrollTop = 0");
    assert.match(content, /document\.body\.scrollTop\s*=\s*0/, "Must set document.body.scrollTop = 0");
  });

  test("ScrollToTop bypasses smooth scroll interference during transition and restores it safely", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /scrollBehavior\s*=\s*["']auto["']/, "Must temporarily set scrollBehavior = 'auto'");
    assert.match(content, /requestAnimationFrame/, "Must use requestAnimationFrame to restore scrollBehavior and confirm top position");
  });

  test("ScrollToTop preserves browser back/forward navigation history (popstate)", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /addEventListener\s*\(\s*["']popstate["']/, "Must register popstate event listener for browser history navigation");
    assert.match(content, /removeEventListener\s*\(\s*["']popstate["']/, "Must clean up popstate event listener");
    assert.match(content, /isPopStateRef/, "Must track popstate navigation with a ref to avoid resetting on back/forward");
  });

  test("ScrollToTop preserves anchor navigation (#about, #contact) across pages", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /window\.location\.hash/, "Must inspect window.location.hash to preserve anchor navigation");
    assert.match(content, /scrollIntoView/, "Must allow target element to scrollIntoView when hash is present");
  });

  test("ScrollToTop handles same-page navigation (clicking logo or current route) gracefully", () => {
    const content = fs.readFileSync(scrollToTopPath, "utf-8");
    assert.match(content, /document\.addEventListener\s*\(\s*["']click["']/, "Must register global click listener for link navigation");
    assert.match(content, /anchor\.pathname\s*===\s*window\.location\.pathname/, "Must detect clicks on links pointing to current pathname");
  });

  test("RootLayout integrates ScrollToTop globally with Suspense inside ThemeProvider", () => {
    assert.equal(fs.existsSync(layoutPath), true, "Root layout must exist");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.match(content, /import\s+ScrollToTop\s+from\s+["']@\/components\/ScrollToTop["']/, "RootLayout must import ScrollToTop");
    assert.match(content, /import\s*\{\s*[^}]*Suspense[^}]*\}\s*from\s*["']react["']/, "RootLayout must import Suspense from react");
    assert.match(content, /<Suspense[\s\S]*?>[\s\S]*?<ScrollToTop\s*\/>[\s\S]*?<\/Suspense>/, "RootLayout must render ScrollToTop wrapped in Suspense");
  });
});
