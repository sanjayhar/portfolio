"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  "contact",
  "about",
  "experience",
  "work",
  "services",
  "hero",
] as const;

export type HomeSection = (typeof SECTIONS)[number];

export function useActiveSection() {
  const [active, setActive] = useState<HomeSection>("hero");

  useEffect(() => {
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;
      if (atBottom) {
        setActive("contact");
        return;
      }

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(id);
          return;
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return active;
}
