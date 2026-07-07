// @ts-nocheck
// TypeScript errors in this file relate to R3F JSX elements (mesh, group, etc.)
// that are only resolved once @react-three/fiber is installed locally.
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  mouseRef,
}: {
  position: [number, number, number];
  geometry: "box" | "icosahedron" | "torus" | "octahedron";
  color: string;
  speed?: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const basePosition = useRef(position);

  useFrame((state: RootState) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime() * speed;

    // gentle autonomous drift
    mesh.position.x = basePosition.current[0] + Math.sin(t * 0.4) * 0.4;
    mesh.position.y = basePosition.current[1] + Math.cos(t * 0.5) * 0.4;
    mesh.rotation.x = t * 0.25;
    mesh.rotation.y = t * 0.2;

    // mouse parallax influence
    mesh.position.x += mouseRef.current.x * 0.6;
    mesh.position.y += mouseRef.current.y * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry === "box" && <boxGeometry args={[0.9, 0.9, 0.9]} />}
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.7, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.6, 0.22, 16, 48]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.7, 0]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.55}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 8;

  const shapes = useMemo(
    () =>
      [
        { position: [-3.2, 1.4, -1] as [number, number, number], geometry: "icosahedron" as const, color: "#ff6b2b", speed: 0.8 },
        { position: [3.4, -0.6, -2] as [number, number, number], geometry: "torus" as const, color: "#38bdf8", speed: 0.6 },
        { position: [2.4, 1.8, -1.5] as [number, number, number], geometry: "box" as const, color: "#a78bfa", speed: 1.1 },
        { position: [-2.6, -1.6, -1] as [number, number, number], geometry: "octahedron" as const, color: "#ff6b2b", speed: 0.9 },
      ],
    [],
  );

  return (
    <group scale={scale}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff6b2b" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#38bdf8" />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} mouseRef={mouseRef} />
      ))}
    </group>
  );
}

export function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
