"use client";

import dynamic from "next/dynamic";

const GlobalSpaceSceneInner = dynamic(
  () => import("@/components/three/GlobalSpaceScene").then((mod) => mod.GlobalSpaceScene),
  { ssr: false },
);

export function GlobalSpaceSceneLoader() {
  return <GlobalSpaceSceneInner />;
}
