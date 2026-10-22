"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originVx: number;
  originVy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function SparkleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const pointer = { x: -9999, y: -9999, active: false };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? -9999 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? -9999 : e.clientY;
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);

    // Density matched to full viewport
    const particleCount = Math.min(110, Math.max(55, Math.floor((width * height) / 14000)));
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        originVx: vx,
        originVy: vy,
        radius: Math.random() * 2.2 + 1.1,
        baseAlpha: Math.random() * 0.4 + 0.28,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.012,
      };
    });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      // High-contrast, rich architectural gold & warm bronze
      const color = isLight ? "160, 115, 45" : "225, 185, 70";
      const connectionDist = 110;
      const pointerMaxDist = 150;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interactive mouse physics: responsive repulsion matching the card
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < pointerMaxDist && dist > 1) {
            const force = (1 - dist / pointerMaxDist) * 3.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Fluid momentum recovery to origin speed
        p.vx = p.vx * 0.94 + p.originVx * 0.06;
        p.vy = p.vy * 0.94 + p.originVy * 0.06;
        p.x += p.vx;
        p.y += p.vy;

        // Seamless screen wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle organic breathing pulse
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.85 + Math.sin(p.pulsePhase) * 0.25);

        // Render soft glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentAlpha})`;
        ctx.shadowBlur = p.radius * 5;
        ctx.shadowColor = `rgba(${color}, 0.65)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Render interconnected constellation filaments between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / connectionDist) * 0.22})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Subtle interactive filament to mouse pointer when nearby
        if (pointer.active) {
          const pDist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (pDist < pointerMaxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - pDist / pointerMaxDist) * 0.28})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full block opacity-85"
      aria-hidden="true"
    />
  );
}
