"use client";

import dynamic from "next/dynamic";

const HeroSceneInner = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function HeroSceneLoader() {
  return <HeroSceneInner />;
}
