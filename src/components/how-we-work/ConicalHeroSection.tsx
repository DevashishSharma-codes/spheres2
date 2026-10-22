"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";

// Exact tars.pro wave shaders with 3D noise and Three.js fog integration
const VERTEX_SHADER = `
  #include <fog_pars_vertex>

  uniform float uTime;
  uniform float uBigWavesElevation;
  uniform vec2 uBigWavesFrequency;
  uniform float uBigWaveSpeed;
  uniform float uSmallWavesElevation;
  uniform float uSmallWavesFrequency;
  uniform float uSmallWavesSpeed;
  uniform float uSmallWavesIterations;
  varying vec2 vUv;
  varying float vElevation;

  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  void main() {
    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = 
      sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWaveSpeed) 
      * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWaveSpeed) 
      * uBigWavesElevation;
    
    for(float i = 1.0; i <= 10.0; i++) {
      elevation -= abs(
        cnoise(
          vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)
          ) 
          * uSmallWavesElevation / i
        );
      if(i >= uSmallWavesIterations ) {
        break;
      }
    }
    
    modelPosition.y += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
  }
`;

const FRAGMENT_SHADER = `
  #include <fog_pars_fragment>
  precision mediump float;
  uniform vec3 uDepthColor;
  uniform vec3 uSurfaceColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;
  varying float vElevation;

  void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, clamp(mixStrength, 0.0, 1.0));
    gl_FragColor = vec4(color, 1.0);
    #include <fog_fragment>
  }
`;

// Exact mathematical stepped orthogonal polygon matching the focused center funnel of the amphitheater
const EXACT_CONE_CLIP_PATH = 
  "polygon(120.5px 0, 120.5px 235.5px, 242.5px 235.5px, 242.5px 345px, 364.5px 345px, 364.5px 438px, 488.5px 438px, 488.5px 522px, 612.5px 522px, 612.5px 604px, 737.5px 604px, 737.5px 522px, 861.5px 522px, 861.5px 438px, 985.5px 438px, 985.5px 345px, 1107.5px 345px, 1107.5px 235.5px, 1229.5px 235.5px, 1229.5px 0)";

// 4 Sprint Stages: Stage 1, Stage 2, Stage 3, Stage 4 with clean, rich architecture data
const SPRINT_STEPS = [
  {
    step: "01",
    stageNum: "STAGE 01 // DISCOVERY & TOPOLOGY",
    title: "Discovery, Wireframes & Systems Topology",
    text: "Deep technical intake session, architectural feasibility analysis, and full interactive wireframes approved before coding.",
    keyPoints: [
      "45–60 min technical architecture & feasibility discovery",
      "Interactive wireframes, UX journeys & click prototype",
      "Strict SRS specification, data contracts & latency budgets",
    ],
  },
  {
    step: "02",
    stageNum: "STAGE 02 // ARCHITECTURE & ENGINE",
    title: "Zero-Bloat Tech Stack & Engine Design",
    text: "Selecting bespoke runtimes tailored for high concurrency, deterministic execution, and sub-50ms P99 SLAs with zero legacy bloat.",
    keyPoints: [
      "Zero-bloat stack (Next.js 15, TypeScript, Rust, Python)",
      "Distributed multi-agent logic loops & state graph",
      "Sub-50ms hybrid vector search & streaming pipelines",
    ],
  },
  {
    step: "03",
    stageNum: "STAGE 03 // SPRINTS & TACTILE UI",
    title: "Structured Sprints & 120 FPS Interface Lab",
    text: "High-velocity 14-day sprint cadences with asynchronous CRM access, continuous pull-request reviews, and tactile desktop-grade micro-interactions.",
    keyPoints: [
      "Bi-weekly sprint deliverables with live cloud staging",
      "Direct client CRM access, Slack sync & 24h PR reviews",
      "120 FPS fluid micro-interactions with zero layout shift",
    ],
  },
  {
    step: "04",
    stageNum: "STAGE 04 // HARDENING & FLEET",
    title: "Security Audits, Edge Fleet & Handover",
    text: "Rigorous automated penetration testing, zero-trust cloud edge hardening, and complete intellectual property handover with post-launch hypercare.",
    keyPoints: [
      "Automated OWASP security audits & zero-trust auth",
      "Global multi-region edge deployment with sub-20ms CDN",
      "100% repository IP handover + 30-day hypercare",
    ],
  },
];

export function ConicalHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js Shader Waves Background Setup (Exact tars.pro wave engine)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const bgFogColor = "#ffffff";
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(bgFogColor, 1.05, 3.0);
    scene.background = new THREE.Color(bgFogColor);

    const geometry = new THREE.PlaneGeometry(12, 12, 384, 384);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      fog: true,
      uniforms: {
        ...THREE.UniformsLib.fog,
        uTime: { value: 0 },
        uBigWavesElevation: { value: 0.27 },
        uBigWavesFrequency: { value: new THREE.Vector2(2.448, 2.136) },
        uBigWaveSpeed: { value: 1.2 },
        uSmallWavesElevation: { value: 0.17 },
        uSmallWavesFrequency: { value: 2.2 },
        uSmallWavesSpeed: { value: 0.38 },
        uSmallWavesIterations: { value: 3.0 },
        uDepthColor: { value: new THREE.Color("#caaeff") },     // Luminous lilac crests
        uSurfaceColor: { value: new THREE.Color("#6234e6") },   // Deep royal purple troughs
        uColorOffset: { value: 0.09 },
        uColorMultiplier: { value: 2.8 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.5 * Math.PI;
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(75, 1800 / 800, 0.1, 100);
    camera.position.set(1, 1.4, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number = 0;

    try {
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(1800, 800);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const clock = new THREE.Clock();

      const renderLoop = () => {
        const elapsedTime = clock.getElapsedTime();
        if (material.uniforms.uTime) {
          material.uniforms.uTime.value = elapsedTime;
        }
        if (renderer) renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(renderLoop);
      };

      renderLoop();
    } catch (err) {
      console.warn("WebGL initialization skipped or unsupported:", err);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section id="how-we-work" className="relative w-full bg-white text-black pt-10 sm:pt-14 pb-16 sm:pb-20 overflow-hidden select-none border-b border-[#DADADD]/70">
      
      {/* 1. TOP ROW: REFINED "HOW WE WORK" IN ONE SLEEK LINE (Matches About Us design system) */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-black select-none whitespace-nowrap">
              HOW WE WORK
            </h2>
          </div>

          {/* Methodology Subtitle */}
          <div className="max-w-md text-left sm:text-right pb-0.5">
            <p className="text-sm sm:text-base font-light text-black/85 leading-snug">
              Deterministic engineering protocol &amp; 4-phase agile execution.
            </p>
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-black/55 mt-1">
              SYSTEMS ARCHITECTURE // HIGH-FREQUENCY DELIVERY
            </p>
          </div>
        </div>
      </div>

      {/* 2. CENTERED CONICAL STAGE CONTAINER WITH ALL ELEMENTS AROUND IT (Exactly matching reference tars.pro) */}
      <div className="relative w-full max-w-[1520px] mx-auto min-h-[560px] sm:min-h-[600px] lg:min-h-[620px] xl:min-h-[650px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Background Amphitheater (Clipped strictly to the stepped conical funnel and centered) */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[1350px] h-[610px] scale-[0.46] sm:scale-[0.52] md:scale-[0.56] lg:scale-[0.56] xl:scale-[0.63] origin-top">
          <div 
            className="relative w-[1350px] h-[610px] overflow-hidden bg-white"
            style={{
              clipPath: EXACT_CONE_CLIP_PATH,
              WebkitClipPath: EXACT_CONE_CLIP_PATH,
            }}
          >
            {/* 1. Dynamic Three.js Animated Waves Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="absolute left-1/2 top-[-95px] -translate-x-1/2 w-[1800px] h-[800px] max-w-none block" 
              />
            </div>

            {/* 2. 3D Curved Perspective Grid Lines */}
            <div className="absolute inset-0 z-2 pointer-events-none">
              <svg width="1350" height="610" viewBox="0 0 1350 610" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric Curved Arcs */}
                <path d="M612.8 527.266C654.194 526.382 695.617 526.378 737.012 527.254" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M489 446C612.747 441.341 737.251 441.333 861 445.979" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M985 362C779.504 358.002 570.499 358 365 361.994" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M242.771 268.174C527.952 277.045 822.735 277.041 1107.91 268.165" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M121.165 159.011C483.816 201.817 866.877 201.806 1229.52 158.976" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M1 27C437.914 134.333 912.086 134.333 1349 27" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />

                {/* Vertical Radial Perspective Grid Lines */}
                <path d="M1229 0L1229 268" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M1107 0L1107 362" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M985 0C985 148.337 985 296.673 985 445" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M861 0C861 175.333 861 350.667 861 526" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M737 0L737 610" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M613 0L613 610" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M489 0L489 526" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M365 0C365 148.337 365 296.673 365 445" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M243 0L243 362" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <path d="M121 0L121 268" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <line x1="1.25" y1="0" x2="1.25" y2="159" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
                <line x1="1349.25" y1="0" x2="1349.25" y2="159" stroke="black" strokeOpacity="0.22" strokeWidth="0.6" strokeMiterlimit="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center 21Spheres Floating Spherical Logo */}
        <div className="absolute left-1/2 top-[80px] sm:top-[95px] lg:top-[105px] xl:top-[115px] -translate-x-1/2 z-20 w-[165px] sm:w-[190px] lg:w-[210px] xl:w-[235px] pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full aspect-square"
          >
            {/* Soft ambient violet glow / drop shadow on the amphitheater */}
            <div className="absolute inset-x-6 bottom-1 h-10 bg-[#7057D9]/35 blur-xl rounded-full" />
            
            {/* Continuous micro-floating levitation animation */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 1.2, 0, -1.2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src="/assets/how-we-work/spheres-logo-clean.png"
                alt="21Spheres Logo"
                width={760}
                height={760}
                priority
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(112,87,217,0.38)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 3. STEPS POSITIONED IN THE LEFT AND RIGHT SPACE AROUND THE CONICAL FUNNEL (Larger typography, pills removed, space filled) */}
        
        {/* LEFT FLANK: Step 01 at top left, Step 02 brought above to fill vertical space */}
        <div className="hidden lg:flex flex-col absolute left-4 lg:left-6 xl:left-8 top-3 w-[270px] lg:w-[295px] xl:w-[325px] z-30 pointer-events-auto text-left gap-7 xl:gap-9">
          {/* Step 01 */}
          <div className="flex flex-col max-w-[310px] xl:max-w-[330px]">
            <div className="flex items-baseline gap-2.5 mb-1.5">
              <span className="text-4xl xl:text-5xl font-mono font-light text-[#7057D9] tracking-tight leading-none">
                {SPRINT_STEPS[0].step}
              </span>
              <span className="text-xs xl:text-sm font-mono tracking-widest uppercase text-black/60 font-semibold">
                {SPRINT_STEPS[0].stageNum}
              </span>
            </div>
            <h3 className="text-lg xl:text-xl font-medium tracking-tight text-black leading-snug">
              {SPRINT_STEPS[0].title}
            </h3>
            <p className="text-sm font-light text-black/75 leading-relaxed mt-1.5">
              {SPRINT_STEPS[0].text}
            </p>
            <ul className="mt-2 space-y-1">
              {SPRINT_STEPS[0].keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-1.5 text-xs xl:text-[13px] text-black/80 font-light leading-snug">
                  <span className="text-[#7057D9] shrink-0 text-[9px] mt-0.5">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col max-w-[310px] xl:max-w-[330px]">
            <div className="flex items-baseline gap-2.5 mb-1.5">
              <span className="text-4xl xl:text-5xl font-mono font-light text-[#7057D9] tracking-tight leading-none">
                {SPRINT_STEPS[1].step}
              </span>
              <span className="text-xs xl:text-sm font-mono tracking-widest uppercase text-black/60 font-semibold">
                {SPRINT_STEPS[1].stageNum}
              </span>
            </div>
            <h3 className="text-lg xl:text-xl font-medium tracking-tight text-black leading-snug">
              {SPRINT_STEPS[1].title}
            </h3>
            <p className="text-sm font-light text-black/75 leading-relaxed mt-1.5">
              {SPRINT_STEPS[1].text}
            </p>
            <ul className="mt-2 space-y-1">
              {SPRINT_STEPS[1].keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-1.5 text-xs xl:text-[13px] text-black/80 font-light leading-snug">
                  <span className="text-[#7057D9] shrink-0 text-[9px] mt-0.5">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT FLANK: Step 03 at top right, Step 04 brought above to fill vertical space */}
        <div className="hidden lg:flex flex-col absolute right-4 lg:right-6 xl:right-8 top-3 w-[270px] lg:w-[295px] xl:w-[325px] z-30 pointer-events-auto text-left gap-7 xl:gap-9">
          {/* Step 03 */}
          <div className="flex flex-col max-w-[310px] xl:max-w-[330px]">
            <div className="flex items-baseline gap-2.5 mb-1.5">
              <span className="text-4xl xl:text-5xl font-mono font-light text-[#7057D9] tracking-tight leading-none">
                {SPRINT_STEPS[2].step}
              </span>
              <span className="text-xs xl:text-sm font-mono tracking-widest uppercase text-black/60 font-semibold">
                {SPRINT_STEPS[2].stageNum}
              </span>
            </div>
            <h3 className="text-lg xl:text-xl font-medium tracking-tight text-black leading-snug">
              {SPRINT_STEPS[2].title}
            </h3>
            <p className="text-sm font-light text-black/75 leading-relaxed mt-1.5">
              {SPRINT_STEPS[2].text}
            </p>
            <ul className="mt-2 space-y-1">
              {SPRINT_STEPS[2].keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-1.5 text-xs xl:text-[13px] text-black/80 font-light leading-snug">
                  <span className="text-[#7057D9] shrink-0 text-[9px] mt-0.5">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 04 */}
          <div className="flex flex-col max-w-[310px] xl:max-w-[330px]">
            <div className="flex items-baseline gap-2.5 mb-1.5">
              <span className="text-4xl xl:text-5xl font-mono font-light text-[#7057D9] tracking-tight leading-none">
                {SPRINT_STEPS[3].step}
              </span>
              <span className="text-xs xl:text-sm font-mono tracking-widest uppercase text-black/60 font-semibold">
                {SPRINT_STEPS[3].stageNum}
              </span>
            </div>
            <h3 className="text-lg xl:text-xl font-medium tracking-tight text-black leading-snug">
              {SPRINT_STEPS[3].title}
            </h3>
            <p className="text-sm font-light text-black/75 leading-relaxed mt-1.5">
              {SPRINT_STEPS[3].text}
            </p>
            <ul className="mt-2 space-y-1">
              {SPRINT_STEPS[3].keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-1.5 text-xs xl:text-[13px] text-black/80 font-light leading-snug">
                  <span className="text-[#7057D9] shrink-0 text-[9px] mt-0.5">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER BOTTOM: Start Now CTA directly below the cone tip */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-2 z-30 pointer-events-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#18181B] hover:bg-[#7057D9] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer group"
          >
            <span>Start Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#sprint-stages"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-black/40 hover:text-[#7057D9] transition-colors"
          >
            <span>Explore full 4-stage sprint cadence &darr;</span>
          </a>
        </div>

        {/* MOBILE & TABLET LAYOUT (< 1024px): 4 Steps in big text below the scaled cone */}
        <div className="lg:hidden relative z-30 w-full px-6 pt-[320px] sm:pt-[360px] pb-10 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {SPRINT_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="text-3xl font-mono font-light text-[#7057D9] leading-none">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/45 font-semibold">
                    {step.stageNum}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-black leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mt-2">
                  {step.text}
                </p>
                <ul className="mt-2 space-y-1">
                  {step.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5 text-xs text-black/75 font-light leading-snug">
                      <span className="text-[#7057D9] mt-0.5 shrink-0 text-[9px]">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#18181B] hover:bg-[#7057D9] text-white text-sm font-medium tracking-wide transition-all shadow-md active:scale-95"
            >
              <span>Start Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
