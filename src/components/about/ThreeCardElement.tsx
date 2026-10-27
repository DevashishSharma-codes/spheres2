"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type ThreeShapeType = "tube" | "gear" | "rings" | "knot" | "swarms" | "icosahedron";

interface ThreeCardElementProps {
  type: ThreeShapeType;
  className?: string;
}

export function ThreeCardElement({ type, className = "" }: ThreeCardElementProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    // Scene & Camera - Static Composition
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.z = 12.5;

    // WebGL Renderer with Alpha transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic Lighting for soft, luminous lighter purple aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3.6);
    dirLight.position.set(6, 9, 8);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xE9D5FF, 3.8, 25);
    rimLight.position.set(-5, -4, 6);
    scene.add(rimLight);

    const softPurpleGlow = new THREE.PointLight(0x9333EA, 3.2, 20);
    softPurpleGlow.position.set(5, 5, 5);
    scene.add(softPurpleGlow);

    // Lighter tactile purple material with smooth specular sheen
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6438D9"),
      roughness: 0.28,
      metalness: 0.10,
      clearcoat: 0.55,
      clearcoatRoughness: 0.2,
    });

    const group = new THREE.Group();
    // Static anchor positioned in lower-right of the card background (matching inspo image)
    group.scale.set(0.86, 0.86, 0.86);
    group.position.set(0.35, -0.65, 0);
    scene.add(group);

    // Build specific STATIC 3D Shape relatable to the card's context
    if (type === "tube") {
      // 1. Seamless Integration: Flowing continuous wave ribbon (matches inspo Card 1)
      const geometry = new THREE.TorusKnotGeometry(1.85, 0.6, 90, 24, 2, 3);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.45, -0.65, 0.2);
      group.add(mesh);
    } else if (type === "gear") {
      // 2. Exceptional Security: 3D Mechanical Security Cogwheel / Vault Aperture (matches inspo Card 2)
      const gearShape = new THREE.Shape();
      const teeth = 8;
      const innerRadius = 1.7;
      const outerRadius = 2.5;

      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.9) / teeth) * Math.PI * 2;
        if (i === 0) gearShape.moveTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        else gearShape.lineTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        gearShape.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
        gearShape.lineTo(Math.cos(a3) * outerRadius, Math.sin(a3) * outerRadius);
        gearShape.lineTo(Math.cos(a4) * innerRadius, Math.sin(a4) * innerRadius);
      }

      // Center vault hole
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, 0.85, 0, Math.PI * 2, true);
      gearShape.holes.push(holePath);

      const geometry = new THREE.ExtrudeGeometry(gearShape, {
        depth: 0.85,
        bevelEnabled: true,
        bevelThickness: 0.24,
        bevelSize: 0.16,
        bevelSegments: 4,
      });
      geometry.center();

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.25, 0.38, -0.12);
      group.add(mesh);
    } else if (type === "rings") {
      // 3. High Performance: Concentric sonic frequency velocity ripples (matches inspo Card 3)
      const ringGroup = new THREE.Group();
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.32, 20, 50), material);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.32, 20, 50), material);
      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.32, 20, 50), material);

      ringGroup.add(ring1);
      ringGroup.add(ring2);
      ringGroup.add(ring3);
      ringGroup.rotation.set(Math.PI / 3.2, Math.PI / 4.4, 0.1);
      group.add(ringGroup);
    } else if (type === "knot") {
      // 4. Intelligent Automation: Self-looping Möbius torus knot (self-healing pipelines)
      const geometry = new THREE.TorusKnotGeometry(1.75, 0.55, 80, 24, 1, 3);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.3, 0.48, -0.2);
      group.add(mesh);
    } else if (type === "swarms") {
      // 5. Multi-Agent Swarms: Dual interlocking gyroscopic orbits with central core sphere
      const swarmGroup = new THREE.Group();
      const torusA = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.35, 20, 50), material);
      const torusB = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.35, 20, 50), material);
      torusB.rotation.x = Math.PI / 2;
      const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
      swarmGroup.add(torusA);
      swarmGroup.add(torusB);
      swarmGroup.add(coreSphere);
      swarmGroup.rotation.set(0.42, 0.52, 0.25);
      group.add(swarmGroup);
    } else {
      // 6. Resilient Systems: Faceted geodesic crystalline shield structure (zero downtime)
      const geometry = new THREE.IcosahedronGeometry(1.9, 0);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.35, 0.45, 0.15);
      group.add(mesh);
    }

    // STATIC RENDER: Render once without continuous animation loop (as requested)
    renderer.render(scene, camera);

    // Resize Observer to re-render statically if container resizes
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.disconnect();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className={`w-full h-full pointer-events-none opacity-80 ${className}`} />;
}
