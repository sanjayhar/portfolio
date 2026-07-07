"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { PhotoFrame } from "@/components/PhotoFrame";
import { TiltCard } from "@/components/TiltCard";
import { ArrowRightIcon } from "@/components/icons";

function ProjectTags({ tags, accentTag }: { tags: string[]; accentTag: string }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-xs px-3 py-1 rounded-full stag ${
            tag === accentTag
              ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function Work() {
  const [featured, ...others] = featuredProjects;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void)[] = [];

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // heading
        if (headingRef.current) {
          const els = headingRef.current.querySelectorAll("p, h2, a");
          gsap.set(els, { y: 25, opacity: 0 });
          const t = gsap.to(els, {
            y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          });
          cleanup.push(() => t.kill());
        }

        // featured card — slides in from left
        if (featuredRef.current) {
          gsap.set(featuredRef.current, { x: -70, opacity: 0 });
          const t = gsap.to(featuredRef.current, {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          });
          cleanup.push(() => t.kill());
        }

        // secondary cards — stagger from right + below
        othersRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { x: 60, opacity: 0, y: 20 });
          const t = gsap.to(el, {
            x: 0, y: 0, opacity: 1, duration: 0.8, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
          });
          cleanup.push(() => t.kill());
        });

        cleanup.push(() => ScrollTrigger.getAll().forEach(t => t.kill()));
      });
    });

    return () => cleanup.forEach(fn => fn());
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-xs font-medium text-accent tracking-widest uppercase mb-3">Portfolio</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">Selected work</h2>
          </div>
          <Link href="/projects" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors self-start sm:self-auto nl">
            All projects →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featured && (
            <div ref={featuredRef} className="md:row-span-2">
              <TiltCard className="h-full">
                <article className="card-h group rounded-2xl overflow-hidden bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 hover:border-accent/60 hover:shadow-[0_0_45px_rgba(255,107,43,0.15)] transition-all duration-300 h-full">
                  <PhotoFrame src={featured.image} alt={featured.title} width={900} height={640} frameClassName="w-full h-64 md:h-80" />
                  <div className="p-7">
                    <ProjectTags tags={featured.tags} accentTag={featured.categoryLabel} />
                    <Link href="/case-study">
                      <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-white mb-2 hover:text-accent transition-colors">
                        {featured.title}
                      </h3>
                    </Link>
                    {featured.featuredDescription && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 whitespace-pre-line">
                        {featured.featuredDescription}
                      </p>
                    )}
                    <Link href="/case-study" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white nl group/link">
                      View case study
                      <span className="transition-transform group-hover/link:translate-x-1">
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  </div>
                </article>
              </TiltCard>
            </div>
          )}

          {others.map((project, i) => (
            <div key={project.id} ref={(el) => { othersRef.current[i] = el; }}>
              <TiltCard className="h-full">
                <article className="card-h group rounded-2xl overflow-hidden bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 hover:border-accent/60 hover:shadow-[0_0_40px_rgba(255,107,43,0.12)] transition-all duration-300 h-full">
                  <PhotoFrame src={project.image} alt={project.title} width={800} height={384} frameClassName="w-full h-48" />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-3 py-1 rounded-full stag ${
                          tag === project.categoryLabel
                            ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
                            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}>{tag}</span>
                      ))}
                    </div>
                    <Link href="/case-study">
                      <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white mb-1.5 hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{project.description}</p>
                    <Link href="/case-study" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white nl group/link">
                      View case study
                      <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

