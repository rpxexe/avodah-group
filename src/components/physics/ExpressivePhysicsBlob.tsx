"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Sparkles, Activity, Compass, Zap, RotateCcw, Heart, Gauge } from "lucide-react";

export type BlobTheme = "proptech" | "fintech";

interface ExpressivePhysicsBlobProps {
  theme?: BlobTheme;
  interactiveName?: string;
}

type MouthState = "idle" | "open" | "straining" | "smile" | "dizzy";

interface PhysicsPoint {
  r: number;       // Current displacement from equilibrium radius R0
  v: number;       // Radial velocity
  targetR: number; // Resting displacement (0)
}

interface Orbiter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  trail: { x: number; y: number }[];
  color: string;
}

export default function ExpressivePhysicsBlob({
  theme = "proptech",
  interactiveName = "AVODAH Core AI",
}: ExpressivePhysicsBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // User-tweakable physical constants (Hooke's law, friction, surface tension, gravity)
  const [gravityPreset, setGravityPreset] = useState<"zero" | "earth" | "moon">("zero");
  const [viscosityLevel, setViscosityLevel] = useState<"jelly" | "honey" | "superfluid">("jelly");
  const [elasticity, setElasticity] = useState<number>(0.85); // 0.65 to 0.95
  const [currentMood, setCurrentMood] = useState<"curious" | "excited" | "surprised" | "straining" | "dizzy" | "happy">("curious");

  // Real-time telemetry readouts
  const [telemetry, setTelemetry] = useState({
    velocity: 0,
    kineticEnergy: 0,
    strain: 0,
    fps: 60,
    headingDeg: 0,
    statusText: "EQUILIBRIUM",
  });

  // State refs to avoid recreation on every render
  const simState = useRef({
    // Center of mass Newtonian dynamics
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    mass: 2.8,

    // Soft-body radial mesh (36 perimeter spring nodes)
    nodeCount: 36,
    baseRadius: 130,
    nodes: [] as PhysicsPoint[],

    // Facial expression & eye tracking
    blinkProgress: 0, // 0 = open, 1 = shut
    isBlinking: false,
    lookX: 0, // -1 to 1
    lookY: 0, // -1 to 1
    lookTargetX: 0,
    lookTargetY: 0,
    mouthState: "idle" as MouthState,
    blushIntensity: 0.2,

    // Dragging & slingshot physics
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    mousePos: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    lastMousePos: { x: 0, y: 0 },
    lastTime: 0,

    // Orbiting data nodes
    orbiters: [] as Orbiter[],

    // Environmental ripple effects
    ripples: [] as { x: number; y: number; r: number; alpha: number; color: string }[],
  });

  // Color schemes based on theme wrapped in useMemo
  const colors = useMemo(() => {
    return theme === "proptech"
      ? {
          primary: "#C9A97C",
          secondary: "#A8875B",
          glow: "rgba(201, 169, 124, 0.45)",
          highlight: "#F5F2EC",
          core: "rgba(212, 175, 55, 0.25)",
          orbiter: "#D4AF37",
          eyeGlint: "#FFFFFF",
          hudAccent: "#C9A97C",
        }
      : {
          primary: "#38BDF8",
          secondary: "#0284C7",
          glow: "rgba(56, 189, 248, 0.45)",
          highlight: "#E0F2FE",
          core: "rgba(14, 165, 233, 0.25)",
          orbiter: "#38BDF8",
          eyeGlint: "#FFFFFF",
          hudAccent: "#38BDF8",
        };
  }, [theme]);

  // Initialize perimeter nodes and orbiters
  useEffect(() => {
    const s = simState.current;
    s.nodes = [];
    for (let i = 0; i < s.nodeCount; i++) {
      s.nodes.push({ r: 0, v: 0, targetR: 0 });
    }

    // Initialize 14 orbiting quantum data particles obeying Newton's law of gravitation
    s.orbiters = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const dist = s.baseRadius * (1.4 + Math.random() * 0.9);
      // Tangential velocity for stable orbit
      const speed = 1.2 + Math.random() * 0.8;
      s.orbiters.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        vx: -Math.sin(angle) * speed,
        vy: Math.cos(angle) * speed,
        radius: 2 + Math.random() * 2.5,
        trail: [],
        color: i % 2 === 0 ? colors.primary : colors.orbiter,
      });
    }
  }, [colors.primary, colors.orbiter]);

  // Handle Canvas resize & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Center resting target position
      simState.current.targetX = rect.width / 2;
      simState.current.targetY = rect.height / 2;
      if (simState.current.x === 0 && simState.current.y === 0) {
        simState.current.x = rect.width / 2;
        simState.current.y = rect.height / 2;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Main 60FPS Physics Simulation Loop
    const render = (time: number) => {
      const ctx = canvas.getContext("2d");
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const s = simState.current;

      const dt = 1; // Normalized simulation timestep

      // 1. CALCULATE FORCES & NEWTON'S SECOND LAW (F = ma => a = F/m)
      let fx = 0;
      let fy = 0;

      // Hooke's Law Restoring Spring to Anchor Center: F = -k * dx - c * v
      const anchorK = s.isDragging ? 0.008 : 0.045; // softer spring during drag
      const anchorDamping = viscosityLevel === "honey" ? 0.92 : viscosityLevel === "superfluid" ? 0.99 : 0.95;

      const dxToCenter = s.x - s.targetX;
      const dyToCenter = s.y - s.targetY;
      fx += -anchorK * dxToCenter;
      fy += -anchorK * dyToCenter;

      // Gravity Force: F = m * g
      if (gravityPreset === "earth") {
        fy += s.mass * 0.45;
      } else if (gravityPreset === "moon") {
        fy += s.mass * 0.15;
      }

      // Drag Force / Slingshot Tension if user is dragging: F = k_drag * (mouse - blob)
      if (s.isDragging) {
        const dragDistX = s.mousePos.x - s.x;
        const dragDistY = s.mousePos.y - s.y;
        fx += dragDistX * 0.22;
        fy += dragDistY * 0.22;

        // Radial strain in drag direction: deform vertices along stretch vector
        const dragDist = Math.hypot(dragDistX, dragDistY);
        const dragAngle = Math.atan2(dragDistY, dragDistX);
        const stretchAmount = Math.min(dragDist * 0.35, 90);

        for (let i = 0; i < s.nodeCount; i++) {
          const theta = (i / s.nodeCount) * Math.PI * 2;
          const alignment = Math.cos(theta - dragAngle);
          // Stretch along pull axis, squash perpendicular (Volume Conservation / Incompressibility)
          const targetOffset = alignment > 0 ? alignment * stretchAmount : alignment * (stretchAmount * 0.4);
          s.nodes[i].targetR = targetOffset;
        }
      } else {
        // Relax vertices back to zero offset
        for (let i = 0; i < s.nodeCount; i++) {
          s.nodes[i].targetR = 0;
        }
      }

      // Accelerations: a = F / m
      s.ax = fx / s.mass;
      s.ay = fy / s.mass;

      // Integrate velocity & apply viscosity damping
      s.vx = (s.vx + s.ax * dt) * anchorDamping;
      s.vy = (s.vy + s.ay * dt) * anchorDamping;

      // Integrate position
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // 2. BOUNDARY COLLISIONS (Newton's 3rd Law & Coefficient of Restitution)
      const currentRadius = s.baseRadius;
      const padding = 15;
      let collided = false;

      if (s.x - currentRadius < padding) {
        s.x = padding + currentRadius;
        s.vx = -s.vx * elasticity;
        collided = true;
        // Inject squash impulse on left nodes
        for (let i = 12; i <= 24; i++) s.nodes[i].v += 8;
      } else if (s.x + currentRadius > width - padding) {
        s.x = width - padding - currentRadius;
        s.vx = -s.vx * elasticity;
        collided = true;
        for (let i = 0; i < 7; i++) s.nodes[i].v += 8;
        for (let i = 30; i < s.nodeCount; i++) s.nodes[i].v += 8;
      }

      if (s.y - currentRadius < padding) {
        s.y = padding + currentRadius;
        s.vy = -s.vy * elasticity;
        collided = true;
        for (let i = 22; i <= 32; i++) s.nodes[i].v += 8;
      } else if (s.y + currentRadius > height - padding) {
        s.y = height - padding - currentRadius;
        s.vy = -s.vy * elasticity;
        collided = true;
        for (let i = 4; i <= 14; i++) s.nodes[i].v += 8;
      }

      if (collided && (Math.abs(s.vx) > 3 || Math.abs(s.vy) > 3)) {
        s.blushIntensity = 0.9;
        s.mouthState = "dizzy";
        setCurrentMood("dizzy");
        s.ripples.push({
          x: s.x,
          y: s.y,
          r: currentRadius * 0.8,
          alpha: 0.8,
          color: colors.primary,
        });
      }

      // 3. SOFT-BODY PERIMETER PHYSICS (Hooke's Restoring Force + Surface Tension Wave Equation)
      const hookeK = 0.065; // Radial spring stiffness
      const surfaceTension = 0.18; // Coupling to neighboring nodes
      const nodeDamping = viscosityLevel === "honey" ? 0.88 : viscosityLevel === "superfluid" ? 0.985 : 0.93;
      const breathTime = time * 0.002;

      // Calculate transverse surface tension wave forces
      const nodeForces = new Float32Array(s.nodeCount);
      for (let i = 0; i < s.nodeCount; i++) {
        const prev = s.nodes[(i - 1 + s.nodeCount) % s.nodeCount].r;
        const next = s.nodes[(i + 1) % s.nodeCount].r;
        const curr = s.nodes[i].r;

        // Laplace wave term: (prev + next - 2*curr)
        const tensionForce = surfaceTension * (prev + next - 2 * curr);
        // Hooke restoring force: -k * (r - targetR)
        const hookeForce = -hookeK * (curr - s.nodes[i].targetR);
        // Gentle organic breathing wave
        const breathForce = Math.sin(breathTime + (i / s.nodeCount) * Math.PI * 4) * 0.45;

        nodeForces[i] = tensionForce + hookeForce + breathForce;
      }

      // Cursor proximity perturbation (poking / wave injection)
      if (!s.isDragging) {
        const mouseRelX = s.mousePos.x - s.x;
        const mouseRelY = s.mousePos.y - s.y;
        const mouseDist = Math.hypot(mouseRelX, mouseRelY);

        if (mouseDist < s.baseRadius + 60 && mouseDist > 20) {
          const mouseAngle = Math.atan2(mouseRelY, mouseRelX);
          const mouseSpeed = Math.hypot(s.mouseVelocity.x, s.mouseVelocity.y);

          if (mouseSpeed > 0.8) {
            for (let i = 0; i < s.nodeCount; i++) {
              const theta = (i / s.nodeCount) * Math.PI * 2;
              let diff = Math.abs(theta - mouseAngle);
              if (diff > Math.PI) diff = Math.PI * 2 - diff;

              if (diff < 0.6) {
                // Transfer kinetic energy from cursor to soft body
                s.nodes[i].v += (0.6 - diff) * mouseSpeed * 0.45;
              }
            }
          }
        }
      }

      // Integrate nodes
      let totalVolumeDisplacement = 0;
      for (let i = 0; i < s.nodeCount; i++) {
        s.nodes[i].v = (s.nodes[i].v + nodeForces[i]) * nodeDamping;
        s.nodes[i].r += s.nodes[i].v;
        totalVolumeDisplacement += s.nodes[i].r;
      }

      // Fluid Incompressibility Constraint (Conserve Volume)
      const avgDisplacement = totalVolumeDisplacement / s.nodeCount;
      for (let i = 0; i < s.nodeCount; i++) {
        s.nodes[i].r -= avgDisplacement * 0.25;
      }

      // 4. BIOMECHANICAL & FACIAL BEHAVIORS (Eye Gaze, Blinking, Mood)
      // Natural Stochastic Blinking
      if (Math.random() < 0.007 && !s.isBlinking) {
        s.isBlinking = true;
      }
      if (s.isBlinking) {
        s.blinkProgress += 0.12;
        if (s.blinkProgress >= 1) {
          s.blinkProgress = 0;
          s.isBlinking = false;
        }
      }

      // Saccadic Eye Tracking to Cursor
      const gazeVectorX = s.mousePos.x - s.x;
      const gazeVectorY = s.mousePos.y - s.y;
      const gazeDist = Math.hypot(gazeVectorX, gazeVectorY);
      if (gazeDist > 0) {
        s.lookTargetX = Math.max(-1, Math.min(1, gazeVectorX / 250));
        s.lookTargetY = Math.max(-1, Math.min(1, gazeVectorY / 250));
      } else {
        s.lookTargetX = 0;
        s.lookTargetY = 0;
      }
      s.lookX += (s.lookTargetX - s.lookX) * 0.15;
      s.lookY += (s.lookTargetY - s.lookY) * 0.15;

      // Dynamic Mood Transitions based on Velocity & Dragging
      const currentSpeed = Math.hypot(s.vx, s.vy);
      if (s.mouthState === "open") {
        // Preserved during click/poke shockwave
      } else if (s.isDragging) {
        s.mouthState = "straining";
        setCurrentMood("straining");
        s.blushIntensity = 0.7;
      } else if (currentSpeed > 6) {
        s.mouthState = "dizzy";
        setCurrentMood("dizzy");
      } else if (currentSpeed > 2.5) {
        s.mouthState = "smile";
        setCurrentMood("excited");
        s.blushIntensity = 0.5;
      } else if (s.mouthState !== "idle") {
        s.mouthState = "idle";
        setCurrentMood("curious");
        s.blushIntensity += (0.2 - s.blushIntensity) * 0.05;
      }

      // 5. ORBITING DATA NODES (Newton's Universal Gravitation: F = G * M * m / r^2)
      const G = 2400; // Gravitational constant
      for (const orb of s.orbiters) {
        const ox = orb.x - 0; // relative to blob center
        const oy = orb.y - 0;
        const r2 = ox * ox + oy * oy;
        const r = Math.sqrt(r2) + 0.1;

        // Gravitational acceleration vector towards center
        const fGrav = -G / Math.max(r2, 2500);
        const ax = (ox / r) * fGrav;
        const ay = (oy / r) * fGrav;

        orb.vx += ax;
        orb.vy += ay;
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Trail history
        orb.trail.push({ x: orb.x + s.x, y: orb.y + s.y });
        if (orb.trail.length > 8) orb.trail.shift();
      }

      // 6. RENDER FRAME
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // Draw Shockwave Ripples
        for (let i = s.ripples.length - 1; i >= 0; i--) {
          const rip = s.ripples[i];
          rip.r += 3.5;
          rip.alpha -= 0.022;

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = rip.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = Math.max(0, rip.alpha);
          ctx.stroke();
          ctx.globalAlpha = 1.0;

          if (rip.alpha <= 0) s.ripples.splice(i, 1);
        }

        // Draw Orbiters and Fading Trails
        for (const orb of s.orbiters) {
          if (orb.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(orb.trail[0].x, orb.trail[0].y);
            for (let j = 1; j < orb.trail.length; j++) {
              ctx.lineTo(orb.trail[j].x, orb.trail[j].y);
            }
            ctx.strokeStyle = orb.color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.35;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }

          // Quantum orbiter particle
          ctx.beginPath();
          ctx.arc(orb.x + s.x, orb.y + s.y, orb.radius, 0, Math.PI * 2);
          ctx.fillStyle = orb.color;
          ctx.shadowColor = orb.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Build Smooth Closed Curve for Blob Perimeter using Catmull-Rom / Quadratic Béziers
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i < s.nodeCount; i++) {
          const theta = (i / s.nodeCount) * Math.PI * 2;
          const rad = Math.max(25, s.baseRadius + s.nodes[i].r);
          points.push({
            x: s.x + Math.cos(theta) * rad,
            y: s.y + Math.sin(theta) * rad,
          });
        }

        ctx.save();

        // Outer Subsurface Glow
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = 45;

        // Liquid Shading with 3D Radial Highlights
        const grad = ctx.createRadialGradient(
          s.x - s.baseRadius * 0.35,
          s.y - s.baseRadius * 0.35,
          s.baseRadius * 0.1,
          s.x,
          s.y,
          s.baseRadius * 1.3
        );
        grad.addColorStop(0, colors.highlight);
        grad.addColorStop(0.3, colors.primary);
        grad.addColorStop(0.75, colors.secondary);
        grad.addColorStop(1, "rgba(12, 13, 12, 0.95)");

        ctx.beginPath();
        const firstMidX = (points[0].x + points[1].x) / 2;
        const firstMidY = (points[0].y + points[1].y) / 2;
        ctx.moveTo(firstMidX, firstMidY);

        for (let i = 1; i < s.nodeCount; i++) {
          const next = points[(i + 1) % s.nodeCount];
          const midX = (points[i].x + next.x) / 2;
          const midY = (points[i].y + next.y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        // Close spline smoothly
        ctx.quadraticCurveTo(points[0].x, points[0].y, firstMidX, firstMidY);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = colors.primary;
        ctx.stroke();

        ctx.restore();

        // Draw Internal Specular Reflection Sheen (Upper Crescent)
        ctx.save();
        ctx.beginPath();
        const sheenRadius = s.baseRadius * 0.65;
        ctx.ellipse(
          s.x - s.baseRadius * 0.3,
          s.y - s.baseRadius * 0.38,
          sheenRadius * 0.6,
          sheenRadius * 0.28,
          -Math.PI / 5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
        ctx.fill();
        ctx.restore();

        // 7. DRAW EXPRESSIVE FACE (Biomechanical Eyes, Blinking, Pupils & Mouth)
        const faceCenterX = s.x + s.lookX * 16;
        const faceCenterY = s.y + s.lookY * 12 - 10;
        const eyeSpacing = 36;
        const eyeRadius = 14;

        // Blushing cheeks
        const blushAlpha = s.blushIntensity;
        ctx.beginPath();
        ctx.arc(faceCenterX - eyeSpacing * 1.15, faceCenterY + 18, 9, 0, Math.PI * 2);
        ctx.arc(faceCenterX + eyeSpacing * 1.15, faceCenterY + 18, 9, 0, Math.PI * 2);
        ctx.fillStyle = theme === "proptech" ? `rgba(239, 68, 68, ${blushAlpha * 0.5})` : `rgba(56, 189, 248, ${blushAlpha * 0.5})`;
        ctx.fill();

        // Left & Right Eyes
        [-eyeSpacing, eyeSpacing].forEach((offset) => {
          const eyeX = faceCenterX + offset;
          const eyeY = faceCenterY;

          // Eye Sclera / Socket
          ctx.save();
          ctx.beginPath();
          const openScaleY = Math.max(0.08, 1 - Math.sin(s.blinkProgress * Math.PI));
          ctx.ellipse(eyeX, eyeY, eyeRadius, eyeRadius * openScaleY, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#0C0D0C";
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = colors.primary;
          ctx.stroke();

          // Saccadic Pupil Tracking
          if (openScaleY > 0.25) {
            const pupilX = eyeX + s.lookX * 6;
            const pupilY = eyeY + s.lookY * 4.5;
            const pupilRadius = currentMood === "excited" ? 8 : currentMood === "straining" ? 4.5 : 6;

            ctx.beginPath();
            ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
            ctx.fillStyle = colors.primary;
            ctx.shadowColor = colors.primary;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Specular Glint in Eye (3D reflection)
            ctx.beginPath();
            ctx.arc(pupilX - 2.5, pupilY - 2.5, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
          }
          ctx.restore();
        });

        // Expressive Reactive Mouth
        ctx.save();
        ctx.beginPath();
        const mouthY = faceCenterY + 22;

        if (s.mouthState === "open" || s.mouthState === "dizzy") {
          // Surprised round 'O'
          ctx.arc(faceCenterX, mouthY, 7, 0, Math.PI * 2);
          ctx.fillStyle = "#0C0D0C";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = colors.primary;
          ctx.stroke();
        } else if (s.mouthState === "straining") {
          // Playful squiggly grimace while stretched
          ctx.moveTo(faceCenterX - 14, mouthY - 2);
          ctx.quadraticCurveTo(faceCenterX - 7, mouthY + 5, faceCenterX, mouthY - 2);
          ctx.quadraticCurveTo(faceCenterX + 7, mouthY - 7, faceCenterX + 14, mouthY);
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = colors.primary;
          ctx.stroke();
        } else if (s.mouthState === "smile") {
          // Beaming smile
          ctx.arc(faceCenterX, mouthY - 4, 13, 0.2 * Math.PI, 0.8 * Math.PI);
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = colors.primary;
          ctx.stroke();
        } else {
          // Gentle curious resting smirk
          ctx.arc(faceCenterX, mouthY - 2, 11, 0.25 * Math.PI, 0.75 * Math.PI);
          ctx.lineWidth = 2;
          ctx.strokeStyle = colors.primary;
          ctx.stroke();
        }
        ctx.restore();

        // Drag Vector Slingshot Line when pulling
        if (s.isDragging) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.mousePos.x, s.mousePos.y);
          ctx.setLineDash([4, 6]);
          ctx.strokeStyle = colors.primary;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Pull target reticle
          ctx.beginPath();
          ctx.arc(s.mousePos.x, s.mousePos.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = colors.primary;
          ctx.fill();
          ctx.restore();
        }
      }

      // 8. UPDATE TELEMETRY READOUTS (Calculated according to Classical Physics)
      frameCount++;
      if (time - lastFpsUpdate >= 250) {
        const vel = Math.hypot(s.vx, s.vy);
        const ke = 0.5 * s.mass * (vel * vel);
        const totalStrain = s.nodes.reduce((acc, n) => acc + Math.abs(n.r), 0) / (s.nodeCount * s.baseRadius);
        const heading = (Math.atan2(s.vy, s.vx) * (180 / Math.PI) + 360) % 360;

        let status = "EQUILIBRIUM";
        if (s.isDragging) status = "POTENTIAL_ENERGY_CHARGING";
        else if (vel > 5) status = "HIGH_INERTIA_FLIGHT";
        else if (vel > 1.5) status = "HARMONIC_DAMPING";
        else if (gravityPreset !== "zero") status = "GRAVITATIONAL_PULL";

        setTelemetry({
          velocity: Math.round(vel * 18.5), // px/s equivalent
          kineticEnergy: parseFloat(ke.toFixed(2)),
          strain: parseFloat((totalStrain * 100).toFixed(1)),
          fps: Math.round((frameCount * 1000) / (time - lastFpsUpdate)),
          headingDeg: Math.round(heading),
          statusText: status,
        });

        frameCount = 0;
        lastFpsUpdate = time;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [gravityPreset, viscosityLevel, elasticity, colors, currentMood, theme]);

  // Pointer & Drag Handlers (Injecting Momentum & Energy)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = simState.current;
    const distToBlob = Math.hypot(x - s.x, y - s.y);

    // If clicked within or near blob, grab it for slingshot physics
    if (distToBlob <= s.baseRadius + 40) {
      s.isDragging = true;
      s.dragStartX = x;
      s.dragStartY = y;
      s.mousePos = { x, y };
      s.lastMousePos = { x, y };
      s.mouthState = "straining";
      canvas.setPointerCapture(e.pointerId);
    } else {
      // Poking ambient field: inject a shockwave ripple
      s.ripples.push({
        x,
        y,
        r: 10,
        alpha: 0.9,
        color: colors.primary,
      });

      // Attract center slightly towards click impulse
      const angle = Math.atan2(y - s.y, x - s.x);
      s.vx += Math.cos(angle) * 4;
      s.vy += Math.sin(angle) * 4;
      s.mouthState = "open";
      setTimeout(() => {
        if (simState.current.mouthState === "open") simState.current.mouthState = "idle";
      }, 450);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = simState.current;
    const now = performance.now();
    const dt = s.lastTime === 0 ? 16 : Math.max(1, now - s.lastTime);

    s.mouseVelocity = {
      x: (x - s.lastMousePos.x) / (dt * 0.06),
      y: (y - s.lastMousePos.y) / (dt * 0.06),
    };

    s.mousePos = { x, y };
    s.lastMousePos = { x, y };
    s.lastTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = simState.current;
    if (s.isDragging) {
      s.isDragging = false;
      // Slingshot Release: Convert elastic displacement into sudden release velocity
      const pullX = s.mousePos.x - s.x;
      const pullY = s.mousePos.y - s.y;
      const impulse = 0.35;

      // Newton's 3rd Law: Release fires backwards from mouse pull vector!
      s.vx = -pullX * impulse + s.mouseVelocity.x * 0.4;
      s.vy = -pullY * impulse + s.mouseVelocity.y * 0.4;

      s.mouthState = "dizzy";
      s.blushIntensity = 0.8;
      s.ripples.push({
        x: s.x,
        y: s.y,
        r: 25,
        alpha: 1.0,
        color: colors.primary,
      });

      try {
        canvasRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture fallback
      }
    }
  };

  // Interactive Action Buttons
  const handlePoke = useCallback(() => {
    const s = simState.current;
    // Inject high frequency transverse waves into all 36 nodes
    for (let i = 0; i < s.nodeCount; i++) {
      s.nodes[i].v += (Math.random() - 0.5) * 22;
    }
    s.mouthState = "open";
    s.blushIntensity = 0.9;
    s.ripples.push({
      x: s.x,
      y: s.y,
      r: s.baseRadius * 0.9,
      alpha: 1.0,
      color: colors.primary,
    });
    setTimeout(() => {
      if (simState.current.mouthState === "open") simState.current.mouthState = "idle";
    }, 600);
  }, [colors.primary]);

  const handleSlingshot = useCallback(() => {
    const s = simState.current;
    const angle = (Math.random() * Math.PI * 2);
    const power = 18;
    s.vx = Math.cos(angle) * power;
    s.vy = Math.sin(angle) * power;
    s.mouthState = "dizzy";
    s.blushIntensity = 0.95;
    for (let i = 0; i < s.nodeCount; i++) {
      s.nodes[i].v += (Math.random() - 0.5) * 16;
    }
  }, []);

  const handlePet = useCallback(() => {
    const s = simState.current;
    s.mouthState = "smile";
    s.blushIntensity = 1.0;
    // Gentle rhythmic purr oscillation
    for (let i = 0; i < s.nodeCount; i++) {
      s.nodes[i].v += Math.sin((i / s.nodeCount) * Math.PI * 6) * 4;
    }
  }, []);

  const handleResetCenter = useCallback(() => {
    const s = simState.current;
    s.x = s.targetX;
    s.y = s.targetY;
    s.vx = 0;
    s.vy = 0;
    s.ax = 0;
    s.ay = 0;
    for (let i = 0; i < s.nodeCount; i++) {
      s.nodes[i].r = 0;
      s.nodes[i].v = 0;
    }
    s.mouthState = "idle";
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Interactive Physics Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-bg)]/60 backdrop-blur-md shadow-2xl transition-all"
        style={{
          boxShadow: `0 25px 60px -15px ${theme === "proptech" ? "rgba(201,169,124,0.18)" : "rgba(56,189,248,0.18)"}`,
        }}
      >
        {/* Subtle Background Physics Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.primary} 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Floating Badge & Identity */}
        <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] shadow-sm backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: colors.primary }} />
            <span className="w-2.5 h-2.5 rounded-full absolute" style={{ backgroundColor: colors.primary }} />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--theme-text)] font-semibold">
              {interactiveName}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--theme-tag-bg)] text-[var(--theme-text-muted)] border border-[var(--theme-tag-border)]">
              PHYSICS ENGINE v4.2
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[var(--theme-text-muted)] bg-[var(--theme-surface-glass)] px-3 py-1.5 rounded-full border border-[var(--theme-border)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>CLICK &amp; DRAG TO SLINGSHOT // HOVER TO JOLT</span>
          </div>
        </div>

        {/* Live Simulation HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />

        {/* Real-Time Physics Telemetry HUD (Bottom Left) */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] backdrop-blur-xl shadow-lg max-w-[280px] sm:max-w-[320px] text-xs font-mono">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--theme-border)]">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--theme-accent)] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                DYNAMICS TELEMETRY
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                {telemetry.fps} FPS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
              <div>
                <span className="text-[var(--theme-text-faint)] block text-[9px] uppercase">VELOCITY |v|</span>
                <span className="font-semibold text-[var(--theme-text)]">{telemetry.velocity} px/s</span>
              </div>
              <div>
                <span className="text-[var(--theme-text-faint)] block text-[9px] uppercase">ENERGY (0.5mv²)</span>
                <span className="font-semibold text-[var(--theme-text)]">{telemetry.kineticEnergy} J</span>
              </div>
              <div>
                <span className="text-[var(--theme-text-faint)] block text-[9px] uppercase">STRAIN ε (STRETCH)</span>
                <span className="font-semibold text-[var(--theme-text)]">{telemetry.strain}%</span>
              </div>
              <div>
                <span className="text-[var(--theme-text-faint)] block text-[9px] uppercase">HEADING θ</span>
                <span className="font-semibold text-[var(--theme-text)]">{telemetry.headingDeg}°</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[var(--theme-border)] flex items-center justify-between text-[10px]">
              <span className="text-[var(--theme-text-muted)]">STATE:</span>
              <span className="font-bold tracking-wider" style={{ color: colors.primary }}>
                {telemetry.statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Physics Lab Controls (Bottom Right) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex flex-wrap gap-2 justify-end">
          <button
            onClick={handlePoke}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--theme-surface-glass)] hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] border border-[var(--theme-border)] shadow-md transition-all active:scale-95"
            title="Inject high-frequency harmonic shockwave"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Poke Wave</span>
          </button>

          <button
            onClick={handleSlingshot}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--theme-surface-glass)] hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] border border-[var(--theme-border)] shadow-md transition-all active:scale-95"
            title="Launch with high kinetic momentum"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Slingshot</span>
          </button>

          <button
            onClick={handlePet}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--theme-surface-glass)] hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text)] border border-[var(--theme-border)] shadow-md transition-all active:scale-95"
            title="Tickle and trigger blissful purr oscillation"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Pet AI</span>
          </button>

          <button
            onClick={handleResetCenter}
            className="flex items-center justify-center p-2 rounded-xl bg-[var(--theme-surface-glass)] hover:bg-[var(--theme-surface-elevated)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)] shadow-md transition-all active:scale-95"
            title="Zero all velocities and return to equilibrium anchor"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Physics Law Configurator Bar */}
      <div className="w-full mt-4 p-4 rounded-2xl bg-[var(--theme-surface-glass)] border border-[var(--theme-border)] backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Gravity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--theme-text-muted)] font-mono text-[11px] uppercase flex items-center gap-1">
              <Gauge className="w-3 h-3 text-[var(--theme-accent)]" />
              GRAVITY:
            </span>
            <div className="flex bg-[var(--theme-bg)] p-0.5 rounded-lg border border-[var(--theme-border)]">
              {(["zero", "earth", "moon"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGravityPreset(g)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium uppercase transition-all ${
                    gravityPreset === g
                      ? "bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] font-bold shadow-sm"
                      : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                  }`}
                >
                  {g === "zero" ? "Zero-G" : g === "earth" ? "Earth (9.8m/s²)" : "Moon"}
                </button>
              ))}
            </div>
          </div>

          {/* Viscosity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--theme-text-muted)] font-mono text-[11px] uppercase">
              VISCOSITY:
            </span>
            <div className="flex bg-[var(--theme-bg)] p-0.5 rounded-lg border border-[var(--theme-border)]">
              {(["jelly", "honey", "superfluid"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setViscosityLevel(v)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium capitalize transition-all ${
                    viscosityLevel === v
                      ? "bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] font-bold shadow-sm"
                      : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Elasticity / Restitution Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--theme-text-muted)] font-mono text-[11px] uppercase">
              ELASTICITY:
            </span>
            <div className="flex bg-[var(--theme-bg)] p-0.5 rounded-lg border border-[var(--theme-border)]">
              {[
                { label: "Soft", val: 0.65 },
                { label: "Normal", val: 0.85 },
                { label: "Bouncy", val: 0.95 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setElasticity(item.val)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-all ${
                    elasticity === item.val
                      ? "bg-[var(--theme-accent)] text-white dark:text-[#0C0D0C] font-bold shadow-sm"
                      : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Mood Pill */}
        <div className="flex items-center gap-2 text-xs font-mono ml-auto">
          <span className="text-[var(--theme-text-faint)] text-[10px] uppercase">EMOTIVE STATE:</span>
          <span
            className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border shadow-sm"
            style={{
              backgroundColor: `${colors.primary}18`,
              borderColor: `${colors.primary}40`,
              color: colors.primary,
            }}
          >
            {currentMood}
          </span>
        </div>
      </div>
    </div>
  );
}
