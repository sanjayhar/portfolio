"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  childSelector?: string;
}

/**
 * Wraps a block and animates children matching childSelector
 * (default: direct children) with GSAP when the block enters viewport.
 */
export function ScrollReveal({
  children,
  className = "",
  y = 50,
  delay = 0,
  stagger = 0.1,
  childSelector = ":scope > *",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = ref.current;
    if (!container) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const els = container.querySelectorAll<HTMLElement>(childSelector);
        if (!els.length) return;

        gsap.set(els, { y, opacity: 0 });

        const t = gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        cleanup.push(() => {
          t.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.vars.trigger === container) st.kill();
          });
        });
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, [y, delay, stagger, childSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Animates a single element (heading, paragraph, etc.)
 */
export function RevealItem({
  children,
  className = "",
  y = 30,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(el, { y, opacity: 0 });

        const t = gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        cleanup.push(() => {
          t.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.vars.trigger === el) st.kill();
          });
        });
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, [y, delay]);

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
