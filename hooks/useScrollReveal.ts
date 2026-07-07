"use client";

import { useEffect, useRef } from "react";

type ScrollRevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  scrub?: boolean;
};

/**
 * Attaches a GSAP ScrollTrigger reveal to child elements matching `selector`
 * inside the returned containerRef. Falls back gracefully when GSAP isn't
 * loaded yet or prefers-reduced-motion is set.
 */
export function useScrollReveal(
  selector: string,
  options: ScrollRevealOptions = {},
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;
    let ScrollTriggerPlugin: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    let cleanupFns: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapInstance = gsap;
        ScrollTriggerPlugin = ScrollTrigger;

        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll<HTMLElement>(selector);
        if (!elements.length) return;

        const {
          y = 40,
          opacity = 0,
          duration = 0.9,
          stagger = 0.12,
          delay = 0,
          scrub = false,
        } = options;

        // set initial state
        gsap.set(elements, { y, opacity, willChange: "transform, opacity" });

        const tween = gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            scrub: scrub ? 0.6 : false,
          },
        });

        cleanupFns.push(() => {
          tween.kill();
          ScrollTrigger.getAll().forEach((t) => {
            if (t.vars.trigger === container) t.kill();
          });
        });
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return containerRef;
}

/**
 * Animate a single element (e.g. a heading) with a character-split reveal.
 * Splits text into spans and staggers them in.
 */
export function useSplitTextReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const original = el.innerText;
    const words = original.split(" ");

    el.innerHTML = words
      .map(
        (word) =>
          `<span class="split-word" style="display:inline-block;overflow:hidden;margin-right:0.3em">` +
          `<span class="split-inner" style="display:inline-block;transform:translateY(110%)">${word}</span>` +
          `</span>`,
      )
      .join("");

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const inners = el.querySelectorAll(".split-inner");
        gsap.set(inners, { y: "110%" });

        gsap.to(inners, {
          y: "0%",
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => {
      if (ref.current) ref.current.innerHTML = original;
    };
  }, []);

  return ref;
}
