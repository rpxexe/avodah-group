"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function ThreeArchitecturalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Keep references to scene objects to update colors dynamically on theme change
  const sceneRef = useRef<THREE.Scene | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const wireMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isLight = theme === "light";
    if (!isLight) {
      scene.fog = new THREE.FogExp2(0x0c0d0c, 0.022);
    }

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Camera positioned to view deep into the architectural background
    camera.position.set(0, 1.8, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. 3D Architectural Blueprint Perspective Grid (pushed backward into deep space)
    const gridColor1 = isLight ? 0x8c6d41 : 0xa8875b;
    const gridColor2 = isLight ? 0xd0c8b8 : 0x1b3d36;
    const gridHelper = new THREE.GridHelper(50, 40, gridColor1, gridColor2);
    gridHelper.position.set(0, -3.2, -6);
    gridRef.current = gridHelper;

    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = isLight ? 0.16 : 0.20;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = isLight ? 0.16 : 0.20;
    }
    scene.add(gridHelper);

    // 2. 3D Floating Architectural Wireframe Modules (placed deeper in background)
    const group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(2.4, 0.4, 2.4);
    const wireMat = new THREE.LineBasicMaterial({
      color: isLight ? 0x8c6d41 : 0xc9a97c,
      transparent: true,
      opacity: isLight ? 0.22 : 0.30,
    });
    wireMatRef.current = wireMat;

    const wireframes: THREE.LineSegments[] = [];
    for (let i = 0; i < 4; i++) {
      const edges = new THREE.EdgesGeometry(boxGeo);
      const wireframe = new THREE.LineSegments(edges, wireMat.clone());
      // Placed backward along negative Z (deep behind any foreground content)
      wireframe.position.set(
        (i % 2 === 0 ? 1 : -1) * 4.2,
        i * 1.5 - 2,
        -5 - i * 1.8
      );
      group.add(wireframe);
      wireframes.push(wireframe);
    }
    scene.add(group);

    // 3. Ambient 3D Architectural Dust Particles (kept strictly in negative Z depth)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 28;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = -Math.random() * 22 - 3; // Kept at Z between -3 and -25 (deep background)
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x8c6d41 : 0xa8875b,
      size: 0.05,
      transparent: true,
      opacity: isLight ? 0.30 : 0.45,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    particleMatRef.current = particleMat;

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking for 3D Camera Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth camera lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 1.0;
      camera.position.y = 1.8 - currentMouseY * 0.6;
      camera.lookAt(0, 0, -6);

      // Subtle rotation of wireframe modules
      group.rotation.y = elapsedTime * 0.06;
      wireframes.forEach((wf, idx) => {
        wf.rotation.y = Math.sin(elapsedTime * 0.25 + idx) * 0.12;
      });

      // Drifting particles
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      boxGeo.dispose();
      wireMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-45 select-none"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    />
  );
}
