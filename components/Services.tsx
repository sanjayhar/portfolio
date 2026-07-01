"use client";

import { useRef, useEffect } from "react";
import { services } from "@/data/services";

function ServiceIcon({ icon }: { icon: string }) {
  if (icon === "monitor") {
    return (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    );
  }
  if (icon === "code") {
    return (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // heading slides up
        const headEls = heading.querySelectorAll("p, h2");
        gsap.set(headEls, { y: 30, opacity: 0 });
        const t1 = gsap.to(headEls, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none reverse" },
        });

        // cards stagger up with scale
        const cards = grid.querySelectorAll("article");
        gsap.set(cards, { y: 60, opacity: 0, scale: 0.95 });
        const t2 = gsap.to(cards, {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)",
          scrollTrigger: { trigger: grid, start: "top 82%", toggleActions: "play none none reverse" },
        });

        cleanup.push(() => { t1.kill(); t2.kill(); ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === heading || t.vars.trigger === grid) t.kill(); }); });
      });
    });

    return () => cleanup.forEach(fn => fn());
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headingRef} className="mb-14">
          <p className="text-xs font-medium text-accent tracking-widest uppercase mb-3">What I do</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">Services</h2>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const isDark = service.variant === "dark";
            return (
              <article
                key={service.id}
                className={`card-h group rounded-2xl p-8 border hover:border-accent transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900 dark:bg-zinc-800 border-zinc-800 hover:shadow-[0_0_30px_rgba(255,107,43,0.12)]"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:shadow-[0_0_30px_rgba(255,107,43,0.08)]"
                }`}
              >
                <div className={`icon-pop w-12 h-12 flex items-center justify-center rounded-xl mb-6 transition-colors ${
                  isDark ? "bg-zinc-800 dark:bg-zinc-700 group-hover:bg-accent/20" : "bg-orange-50 dark:bg-zinc-800 group-hover:bg-accent/10"
                }`}>
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className={`font-display font-bold text-xl mb-3 ${isDark ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
