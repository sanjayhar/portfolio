"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";

// 1. Deforming Digital Grid Plane (representing a matrix terrain/cyber circuit)
function CyberGrid({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const size = 30;
  const segments = 30;

  // Create grid vertices
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2); // align horizontally
    return geo;
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.getElapsedTime();
    
    // Wave deformation on the grid vertices
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Sine wave equation creating data wave ripples
      const y = Math.sin(x * 0.25 + time * 0.6) * Math.cos(z * 0.25 + time * 0.5) * 0.6;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

// 2. Interactive Neural Network (Data Nodes + Connecting Lines)
function NeuralNetwork({ count = 80, color = "#06b6d4" }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate initial node positions and velocity vectors
  const [nodes, velocities] = useMemo(() => {
    const nds: { x: number; y: number; z: number }[] = [];
    const vls: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      nds.push({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 60 - 10, // spread vertically aligned to page scroll height
        z: (Math.random() - 0.5) * 10 - 2,
      });
      vls.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });
    }
    return [nds, vls];
  }, [count]);

  // Buffer arrays for rendering
  const pointPositions = useMemo(() => new Float32Array(count * 3), [count]);
  // Maximum possible lines is count * count / 2. We allocate a buffer for up to 300 lines (600 vertices)
  const maxLineVertices = 600;
  const linePositions = useMemo(() => new Float32Array(maxLineVertices * 3), []);

  useFrame(() => {
    // 1. Move nodes and update points buffer
    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      const vel = velocities[i];

      node.x += vel.x;
      node.y += vel.y;
      node.z += vel.z;

      // Boundary check & wrap-around
      if (Math.abs(node.x) > 15) vel.x *= -1;
      if (node.y > 20) node.y = -40;
      if (node.y < -40) node.y = 20;
      if (Math.abs(node.z + 2) > 8) vel.z *= -1;

      pointPositions[i * 3] = node.x;
      pointPositions[i * 3 + 1] = node.y;
      pointPositions[i * 3 + 2] = node.z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Re-calculate line connections between close nodes
    let lineIdx = 0;
    const threshold = 4.2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (lineIdx >= maxLineVertices) break;

        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold) {
          // Add connection line segment
          linePositions[lineIdx * 3] = nodes[i].x;
          linePositions[lineIdx * 3 + 1] = nodes[i].y;
          linePositions[lineIdx * 3 + 2] = nodes[i].z;

          linePositions[(lineIdx + 1) * 3] = nodes[j].x;
          linePositions[(lineIdx + 1) * 3 + 1] = nodes[j].y;
          linePositions[(lineIdx + 1) * 3 + 2] = nodes[j].z;

          lineIdx += 2;
        }
      }
    }

    // Pad remaining line vertices with zero/empty values
    for (let k = lineIdx; k < maxLineVertices; k++) {
      linePositions[k * 3] = 0;
      linePositions[k * 3 + 1] = 0;
      linePositions[k * 3 + 2] = 0;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Dynamic connecting lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.16}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// 3. Falling Binary Matrix Stream (cyber tech particles)
function BinaryStream({ count = 250, color = "#ff6b2b" }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60 - 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      spd[i] = 0.05 + Math.random() * 0.08; // falling speed
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate falling data bytes
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i]; // move down Y axis
      
      // Reset to top when going off screen
      if (pos[i * 3 + 1] < -40) {
        pos[i * 3 + 1] = 20;
        pos[i * 3] = (Math.random() - 0.5) * 30;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.08}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Tech scene container tracking mouse/scroll
function SceneContent({
  mouseRef,
  scrollRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 8;

  useFrame((state: RootState) => {
    const scroll = scrollRef.current;
    
    // Descend camera on scroll
    const targetY = -scroll * 35;
    const targetZ = 7.0 + Math.sin(scroll * Math.PI) * 1.0;

    // Smooth lerps
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    
    // Rotate camera perspective on scroll for depth
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, scroll * 0.25, 0.06);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, -scroll * 0.1, 0.06);

    // Mouse movement influence
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseRef.current.x * 0.8, 0.08);
    state.camera.position.y += (mouseRef.current.y * 0.4 - state.camera.position.y + targetY) * 0.08;
  });

  return (
    <group scale={scale}>
      <ambientLight intensity={0.4} />
      
      {/* 3D Cyber Grids placed at key layout depths */}
      <CyberGrid position={[0, 4, -12]} color="#06b6d4" />
      <CyberGrid position={[-2, -8, -12]} color="#a78bfa" />
      <CyberGrid position={[2, -20, -12]} color="#ff6b2b" />
      <CyberGrid position={[0, -32, -12]} color="#06b6d4" />

      {/* Cyber neural node network */}
      <NeuralNetwork count={85} color="#06b6d4" />
      
      {/* Falling digital stream */}
      <BinaryStream count={220} color="#ff6b2b" />
      <BinaryStream count={180} color="#a78bfa" />

      {/* Background soft glowing points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const arr = new Float32Array(500 * 3);
                for (let i = 0; i < 500; i++) {
                  arr[i * 3] = (Math.random() - 0.5) * 45;
                  arr[i * 3 + 1] = (Math.random() - 0.5) * 65 - 12;
                  arr[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
                }
                return arr;
              }, []),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.04}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function TechBackgroundScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        camera={{ position: [0, 0, 7.0], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent mouseRef={mouseRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
