"use client";

import { useRef, useEffect } from "react";
import { portfolio } from "@/data/portfolio";
import { skills } from "@/data/skills";
import { PhotoFrame } from "@/components/PhotoFrame";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const headingLines = portfolio.about.heading.split("\n");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // image — parallax float as section scrolls
        if (imageRef.current) {
          gsap.set(imageRef.current, { y: 40, opacity: 0, scale: 0.96 });
          const t = gsap.to(imageRef.current, {
            y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          });
          // subtle parallax scroll
          const p = gsap.to(imageRef.current, {
            y: -30,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
          cleanup.push(() => { t.kill(); p.kill(); });
        }

        // text blocks stagger up
        if (textRef.current) {
          const els = textRef.current.querySelectorAll("p, h2");
          gsap.set(els, { y: 35, opacity: 0 });
          const t = gsap.to(els, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          });
          cleanup.push(() => t.kill());
        }

        // skill tags cascade in
        if (skillsRef.current) {
          const tags = skillsRef.current.querySelectorAll("span[role='listitem']");
          gsap.set(tags, { y: 20, opacity: 0, scale: 0.9 });
          const t = gsap.to(tags, {
            y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.03, ease: "back.out(1.6)",
            scrollTrigger: { trigger: skillsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          });
          cleanup.push(() => t.kill());
        }

        cleanup.push(() => ScrollTrigger.getAll().forEach(t => t.kill()));
      });
    });

    return () => cleanup.forEach(fn => fn());
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute left-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* image */}
          <div ref={imageRef} className="order-2 md:order-1">
            <div className="relative">
              <PhotoFrame
                src={portfolio.aboutImage}
                alt={portfolio.name}
                width={700}
                height={700}
                frameClassName="w-full aspect-square max-w-sm mx-auto rounded-3xl"
              />
              {/* floating glow ring */}
              <div className="absolute inset-0 max-w-sm mx-auto rounded-3xl ring-1 ring-accent/20 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* text */}
          <div className="order-1 md:order-2">
            <div ref={textRef}>
              <p className="text-xs font-medium text-accent tracking-widest uppercase mb-3">
                {portfolio.about.eyebrow}
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-6">
                {headingLines[0]}
                <br />
                {headingLines[1]}
              </h2>
              {portfolio.about.paragraphs.map((paragraph, i) => (
                <p key={i} className={`text-zinc-500 dark:text-zinc-400 leading-relaxed ${i === portfolio.about.paragraphs.length - 1 ? "mb-8" : "mb-4"}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div ref={skillsRef}>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
                Stack &amp; tools
              </p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Skills">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    role="listitem"
                    className="text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3.5 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
