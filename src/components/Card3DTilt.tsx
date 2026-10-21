"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function Card3DTilt({
  children,
  className = "",
  intensity = 15,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth physics
  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Calculate 3D rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity]);

  // Glare position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = mouseX / rect.width - 0.5;
    const normY = mouseY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-sm overflow-hidden"
      >
        {children}

        {/* Dynamic Specular 3D Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 350px at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.18), transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
