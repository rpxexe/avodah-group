"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Component
 *
 * Provides global, framework-appropriate scroll position restoration for Next.js App Router:
 * 1. Resets scroll position to (0, 0) upon forward navigation to any new route.
 * 2. Preserves anchor navigation (e.g., #about, /#contact) so section links scroll accurately.
 * 3. Preserves browser back/forward (popstate) scroll restoration behavior.
 * 4. Handles same-page navigation (e.g. clicking logo or nav link to current page) cleanly.
 * 5. Bypasses smooth scroll collisions during page transition to prevent partial or clamped scrolling.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const isPopStateRef = useRef(false);

  // Helper to reliably reset scroll to top across all modern browsers
  const performScrollReset = () => {
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    // Temporarily set scrollBehavior to 'auto' to ensure instant jump to top without being cancelled mid-animation
    html.style.scrollBehavior = "auto";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
    html.scrollTop = 0;
    document.body.scrollTop = 0;

    // Restore original scroll behavior on the next animation frame
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    });
  };

  // Track browser back/forward history navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handle link clicks to the current page (e.g. clicking brand logo or current nav link without hash)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore non-primary clicks or modifier keys (Ctrl/Cmd/Shift/Alt)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      // Ignore external links, downloads, new tabs, or anchor hashes
      if (
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download") ||
        anchor.origin !== window.location.origin ||
        anchor.hash
      ) {
        return;
      }

      // If clicking an internal link pointing to the exact same pathname
      if (anchor.pathname === window.location.pathname) {
        performScrollReset();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  // Handle pathname route changes
  useEffect(() => {
    // Initial page load or browser refresh: record pathname and let browser handle initial restoration
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    // No route change
    if (prevPathnameRef.current === pathname) {
      return;
    }

    prevPathnameRef.current = pathname;

    // If navigation was triggered by browser Back / Forward buttons, preserve scroll position
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }

    // Preserve anchor navigation if a hash exists (e.g., /#about, /#contact)
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const scrollToAnchor = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      };

      scrollToAnchor();
      const timer = setTimeout(scrollToAnchor, 100);
      return () => clearTimeout(timer);
    }

    // Standard forward navigation to a new route: reset scroll position to top
    performScrollReset();

    // Re-verify on next animation frame after React layout and DOM commits
    const rafId = requestAnimationFrame(() => {
      performScrollReset();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
