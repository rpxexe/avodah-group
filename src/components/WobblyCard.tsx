"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface WobblyCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  wobbleIntensity?: number;
}

export default function WobblyCard({
  children,
  className = "",
  containerClassName = "",
  wobbleIntensity = 14,
}: WobblyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring with low damping for authentic wobbly / elastic oscillation
  const springConfig = { stiffness: 320, damping: 13, mass: 0.65 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations & wobbly translations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [wobbleIntensity, -wobbleIntensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-wobbleIntensity, wobbleIntensity]);
  const rotateZ = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Spring physics will smoothly oscillate back across 0 giving the jelly wobble settle
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`perspective-1000 ${containerClassName}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.018 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
        className={`relative ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
