"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";

// Individual floating geometry element
function FloatingGeometry({
  position,
  geometry,
  color,
  speed = 1,
  size = 1,
  mouseRef,
  driftRange = 0.4,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "box" | "octahedron" | "dodecahedron";
  color: string;
  speed?: number;
  size?: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  driftRange?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePosition = useRef(position);

  useFrame((state: RootState) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime() * speed;

    // Gentle autonomous floating drift
    mesh.position.x = basePosition.current[0] + Math.sin(t * 0.4) * driftRange;
    mesh.position.y = basePosition.current[1] + Math.cos(t * 0.5) * driftRange;
    mesh.position.z = basePosition.current[2] + Math.sin(t * 0.3) * (driftRange * 0.5);

    // Rotation
    mesh.rotation.x = t * 0.15;
    mesh.rotation.y = t * 0.1;
    mesh.rotation.z = t * 0.05;

    // Interactive mouse parallax response
    mesh.position.x += mouseRef.current.x * 0.4;
    mesh.position.y += mouseRef.current.y * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "box" && <boxGeometry args={[size, size, size]} />}
      {geometry === "icosahedron" && <icosahedronGeometry args={[size, 0]} />}
      {geometry === "torus" && <torusGeometry args={[size * 0.7, size * 0.25, 16, 64]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[size, 0]} />}
      {geometry === "dodecahedron" && <dodecahedronGeometry args={[size, 0]} />}
      
      {/* Wireframe overlay for premium cyber/sci-fi style */}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.25}
      />
      {/* Internal semi-transparent glowing core */}
      <mesh ref={useRef<THREE.Mesh>(null)}>
        {geometry === "box" && <boxGeometry args={[size * 0.7, size * 0.7, size * 0.7]} />}
        {geometry === "icosahedron" && <icosahedronGeometry args={[size * 0.7, 0]} />}
        {geometry === "torus" && <torusGeometry args={[size * 0.5, size * 0.18, 12, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[size * 0.7, 0]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[size * 0.7, 0]} />}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </mesh>
  );
}

// Sparkle Particle Field
function SparkleField({ count = 1000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Wide grid distribution aligned vertically down the scroll height
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 65 - 12; // spread from Y=20 to Y=-45
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;  // focus around camera depth
      sz[i] = 0.05 + Math.random() * 0.15;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle rotation of the entire particle universe
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Nebula Clouds (Soft large particle fields)
function NebulaCloud({ color, position, size = 15, count = 40 }: { color: string; position: [number, number, number]; size?: number; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Gaussian distribution around a center
      pos[i * 3] = position[0] + (Math.random() - 0.5) * size;
      pos[i * 3 + 1] = position[1] + (Math.random() - 0.5) * size;
      pos[i * 3 + 2] = position[2] + (Math.random() - 0.5) * (size * 0.5);
    }
    return pos;
  }, [count, position, size]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Rotate slowly
    pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={3.5}
        sizeAttenuation
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Active lights that orbit around the viewport
function OrbitingLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Light 1 (Orange): orbits high up
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.5) * 12;
      light1.current.position.y = Math.cos(t * 0.3) * 6 - 4;
      light1.current.position.z = Math.sin(t * 0.4) * 4;
    }
    
    // Light 2 (Cyan): orbits lower down
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.4) * 10;
      light2.current.position.y = Math.sin(t * 0.6) * 8 - 14;
      light2.current.position.z = Math.cos(t * 0.3) * 5;
    }

    // Light 3 (Purple): orbits mid range
    if (light3.current) {
      light3.current.position.x = Math.sin(t * 0.3) * 8;
      light3.current.position.y = Math.cos(t * 0.5) * 5 - 24;
      light3.current.position.z = Math.sin(t * 0.2) * 6;
    }
  });

  return (
    <>
      <pointLight ref={light1} color="#ff6b2b" intensity={2.5} distance={15} decay={2} />
      <pointLight ref={light2} color="#06b6d4" intensity={2.0} distance={18} decay={2} />
      <pointLight ref={light3} color="#a78bfa" intensity={2.2} distance={15} decay={2} />
    </>
  );
}

// Inner Scene content that connects to scroll and viewport
function SceneContent({
  mouseRef,
  scrollRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 8;

  // Float positions are relative to layout sections.
  // As camera Y scrolls down, these elements emerge into view.
  const shapes = useMemo(
    () => [
      // Hero section geometries (Y around 1.5 to -1.5)
      { position: [-3.2, 1.6, -1.0] as [number, number, number], geometry: "icosahedron" as const, color: "#ff6b2b", speed: 0.7, size: 0.85 },
      { position: [3.4, -0.4, -1.5] as [number, number, number], geometry: "torus" as const, color: "#06b6d4", speed: 0.5, size: 0.9 },
      { position: [2.2, 1.8, -1.2] as [number, number, number], geometry: "box" as const, color: "#a78bfa", speed: 0.8, size: 0.75 },

      // Services section geometries (Y around -4 to -8)
      { position: [-3.8, -5.5, -1.0] as [number, number, number], geometry: "dodecahedron" as const, color: "#a78bfa", speed: 0.6, size: 0.8 },
      { position: [4.0, -7.0, -1.8] as [number, number, number], geometry: "icosahedron" as const, color: "#ff6b2b", speed: 0.9, size: 0.9 },
      { position: [-2.0, -8.2, -1.5] as [number, number, number], geometry: "octahedron" as const, color: "#06b6d4", speed: 0.7, size: 0.7 },

      // Work section geometries (Y around -12 to -16)
      { position: [3.2, -13.5, -1.2] as [number, number, number], geometry: "torus" as const, color: "#ff6b2b", speed: 0.6, size: 0.95 },
      { position: [-3.0, -15.0, -1.0] as [number, number, number], geometry: "box" as const, color: "#06b6d4", speed: 0.8, size: 0.8 },

      // Experience & About sections (Y around -20 to -26)
      { position: [3.5, -21.0, -1.5] as [number, number, number], geometry: "octahedron" as const, color: "#a78bfa", speed: 0.5, size: 0.8 },
      { position: [-3.5, -23.5, -1.0] as [number, number, number], geometry: "icosahedron" as const, color: "#ff6b2b", speed: 0.8, size: 0.9 },
      { position: [2.5, -26.0, -1.2] as [number, number, number], geometry: "dodecahedron" as const, color: "#06b6d4", speed: 0.6, size: 0.85 },

      // Contact section geometries (Y around -30 to -34)
      { position: [-2.8, -31.5, -1.0] as [number, number, number], geometry: "torus" as const, color: "#ff6b2b", speed: 0.7, size: 1.0 },
      { position: [3.0, -33.0, -1.5] as [number, number, number], geometry: "octahedron" as const, color: "#a78bfa", speed: 0.9, size: 0.8 },
    ],
    [],
  );

  useFrame((state: RootState) => {
    // Current normalized scroll
    const scroll = scrollRef.current;

    // Total Y-depth of our layout. Let's make the camera descend 35 units along the Y axis
    const targetY = -scroll * 35;
    
    // Slight Z wobble/zoom based on scroll
    const targetZ = 6.5 + Math.sin(scroll * Math.PI) * 1.5;

    // Smooth camera interpolation
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.065);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.065);

    // Slowly rotate camera direction based on scroll to add depth and orientation shifts
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, scroll * 0.35, 0.065);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -scroll * 0.15, 0.065);

    // Mouse follow effect on the overall camera perspective
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseRef.current.x * 0.75, 0.08);
    state.camera.position.y += (mouseRef.current.y * 0.35 - state.camera.position.y + targetY) * 0.08;
  });

  return (
    <group scale={scale}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 15, 5]} intensity={0.5} color="#ffffff" />
      
      {/* Space environment elements */}
      <SparkleField count={1600} />
      
      {/* Ambient colorful space nebulas at key section depths */}
      <NebulaCloud color="#ff6b2b" position={[5, 2, -10]} size={18} count={45} />
      <NebulaCloud color="#06b6d4" position={[-8, -8, -12]} size={20} count={50} />
      <NebulaCloud color="#a78bfa" position={[8, -18, -10]} size={22} count={40} />
      <NebulaCloud color="#ff6b2b" position={[-5, -28, -12]} size={18} count={45} />
      
      {/* Moving lighting sources */}
      <OrbitingLights />

      {/* Floating 3D Geometries */}
      {shapes.map((shape, idx) => (
        <FloatingGeometry key={idx} {...shape} mouseRef={mouseRef} />
      ))}
    </group>
  );
}

export function GlobalSpaceScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion to disable WebGL if needed
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Track mouse coordinates normalized between -1 and 1
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    // Track normalized page scroll percentage
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent mouseRef={mouseRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
