"use client";

import { useRef, useEffect } from "react";
import { experience } from "@/data/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const line = lineRef.current;
        if (!section || !line) return;

        // Animate timeline line growing downward while scrolling
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        const lineTween = gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });

        // Animate each card sliding in from left
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, { x: -60, opacity: 0 });
          const t = gsap.to(card, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          });
          cleanup.push(() => t.kill());
        });

        cleanup.push(() => {
          lineTween.kill();
          ScrollTrigger.getAll().forEach((t) => {
            if (t.vars.trigger === section) t.kill();
          });
        });
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* heading */}
        <div className="mb-16">
          <p className="text-xs font-medium text-accent tracking-widest uppercase mb-3">
            Career
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">
            Experience
          </h2>
        </div>

        {/* timeline */}
        <div className="relative">
          {/* animated growing line */}
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div ref={lineRef} className="w-full h-full bg-accent origin-top" />
          </div>

          <ol className="space-y-10">
            {experience.timeline.map((item, i) => {
              const isCurrent = item.period.toLowerCase().includes("present");
              return (
                <li
                  key={`${item.company}-${i}`}
                  ref={(el) => { if (el) cardsRef.current[i] = el; }}
                  className="relative pl-10"
                >
                  {/* timeline dot */}
                  <span
                    className={`absolute left-0 top-5 w-3.5 h-3.5 rounded-full border-2 z-10 ${
                      isCurrent
                        ? "bg-accent border-accent pulse-soft shadow-[0_0_12px_rgba(255,107,43,0.6)]"
                        : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700"
                    }`}
                    aria-hidden="true"
                  />

                  {/* card */}
                  <div className={`glass rounded-2xl p-6 border card-h transition-all duration-300 bg-white/30 dark:bg-zinc-900/20 border-zinc-200/40 dark:border-zinc-800/40 hover:shadow-[0_0_30px_rgba(255,107,43,0.12)] ${
                    isCurrent
                      ? "border-accent/50 hover:border-accent shadow-[0_0_24px_rgba(255,107,43,0.08)]"
                      : "hover:border-accent/60"
                  }`}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-accent tracking-wide uppercase">
                        {item.period}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white mb-0.5">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                      {item.company}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
