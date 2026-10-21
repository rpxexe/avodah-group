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
    scene.fog = new THREE.FogExp2(isLight ? 0xf6f4ee : 0x0c0d0c, 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. 3D Architectural Blueprint Perspective Grid
    const gridColor1 = isLight ? 0x8c6d41 : 0xa8875b;
    const gridColor2 = isLight ? 0xd0c8b8 : 0x1b3d36;
    const gridHelper = new THREE.GridHelper(30, 30, gridColor1, gridColor2);
    gridHelper.position.y = -2.5;
    gridRef.current = gridHelper;

    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = isLight ? 0.18 : 0.22;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = isLight ? 0.18 : 0.22;
    }
    scene.add(gridHelper);

    // 2. 3D Floating Architectural Wireframe Modules
    const group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(2.4, 0.4, 2.4);
    const wireMat = new THREE.LineBasicMaterial({
      color: isLight ? 0x8c6d41 : 0xc9a97c,
      transparent: true,
      opacity: isLight ? 0.25 : 0.35,
    });
    wireMatRef.current = wireMat;

    const wireframes: THREE.LineSegments[] = [];
    for (let i = 0; i < 4; i++) {
      const edges = new THREE.EdgesGeometry(boxGeo);
      const wireframe = new THREE.LineSegments(edges, wireMat.clone());
      wireframe.position.set(
        (i % 2 === 0 ? 1 : -1) * 3.5,
        i * 1.4 - 1.5,
        -1.5 - i * 0.8
      );
      group.add(wireframe);
      wireframes.push(wireframe);
    }
    scene.add(group);

    // 3. Ambient 3D Architectural Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x8c6d41 : 0xa8875b,
      size: 0.055,
      transparent: true,
      opacity: isLight ? 0.35 : 0.5,
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

      camera.position.x = currentMouseX * 1.2;
      camera.position.y = 2 - currentMouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Subtle rotation of wireframe modules
      group.rotation.y = elapsedTime * 0.08;
      wireframes.forEach((wf, idx) => {
        wf.rotation.y = Math.sin(elapsedTime * 0.3 + idx) * 0.15;
      });

      // Drifting particles
      particles.rotation.y = elapsedTime * 0.02;

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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
}
