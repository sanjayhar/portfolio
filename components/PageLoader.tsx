"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 550);
    const hideTimer = setTimeout(() => setVisible(false), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950 transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-display font-bold text-2xl tracking-tight">
          <span className="text-zinc-900 dark:text-white">{portfolio.namePrefix}</span>
          <span className="text-accent">{portfolio.nameAccent}</span>
        </span>
        <div className="w-32 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-accent loader-bar" />
        </div>
      </div>
    </div>
  );
}
