"use client";

import dynamic from "next/dynamic";

const TechBackgroundInner = dynamic(
  () => import("@/components/three/TechBackgroundScene").then((mod) => mod.TechBackgroundScene),
  { ssr: false },
);

export function TechBackgroundLoader() {
  return <TechBackgroundInner />;
}
