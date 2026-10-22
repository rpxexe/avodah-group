"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/context/ThemeContext";

const emptySubscribe = () => () => {};

export default function CustomCursor() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isPointerFine = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const isInitialized = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isInitialized.current) {
        currentPos.current.x = e.clientX;
        currentPos.current.y = e.clientY;
        isInitialized.current = true;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Interactive element hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, input, select, textarea, [role="button"], .tilt-card, .interactive-item, [data-interactive="true"]'
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Ultra-smooth 60fps/120fps hardware-accelerated RAF render loop
    let animId: number;
    const renderLoop = () => {
      if (isInitialized.current && cursorRef.current) {
        const mx = mousePos.current.x;
        const my = mousePos.current.y;

        // Snappy, organic follow physics
        currentPos.current.x += (mx - currentPos.current.x) * 0.35;
        currentPos.current.y += (my - currentPos.current.y) * 0.35;

        const cx = currentPos.current.x;
        const cy = currentPos.current.y;

        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted || !isPointerFine) return null;

  const isLight = theme === "light";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
      }}
    >
      {/* Outer Magnetic Ring */}
      <div
        className="rounded-full flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          width: isHovered ? "52px" : "32px",
          height: isHovered ? "52px" : "32px",
          border: isHovered
            ? isLight
              ? "1.5px solid rgba(140, 109, 65, 0.95)"
              : "1.5px solid rgba(212, 175, 55, 0.95)"
            : isLight
            ? "1px solid rgba(140, 109, 65, 0.45)"
            : "1px solid rgba(201, 169, 124, 0.45)",
          backgroundColor: isHovered
            ? isLight
              ? "rgba(140, 109, 65, 0.12)"
              : "rgba(201, 169, 124, 0.15)"
            : "transparent",
        }}
      >
        {/* Central pointer dot - structurally and mathematically centered inside the ring */}
        <div
          className="rounded-full transition-transform duration-150 ease-out"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: isLight ? "#8C6D41" : "#D4AF37",
            boxShadow: isLight
              ? "0 0 6px rgba(140, 109, 65, 0.6)"
              : "0 0 8px rgba(212, 175, 55, 0.8)",
            transform: isHovered ? "scale(1.5)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
