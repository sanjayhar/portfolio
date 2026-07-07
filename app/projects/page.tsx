"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  projects,
  projectFilterOptions,
  type ProjectCategory,
} from "@/data/projects";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { RevealObserver } from "@/components/RevealObserver";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const visibleCount = useMemo(() => {
    if (filter === "all") return projects.length;
    return projects.filter((p) => p.category === filter).length;
  }, [filter]);

  return (
    <>
      <Navbar activePage="work" />
      <main>
        <section className="pt-36 pb-12 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h1 className="reveal font-display font-bold text-5xl md:text-6xl text-zinc-900 dark:text-white leading-tight mb-4">
              All Projects
            </h1>
            <p className="reveal text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A complete look at placeholder work across design and development.
            </p>
            <div className="reveal flex flex-wrap gap-2">
              {projectFilterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={`text-sm px-4 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${
                    filter === option.value
                      ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(255,107,43,0.3)]"
                      : "bg-white/40 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-800/40 hover:border-accent hover:text-accent"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 bg-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const visible = filter === "all" || project.category === filter;
                return (
                  <div
                    key={project.id}
                    className={`transition-all duration-300 ${
                      visible
                        ? "opacity-100 scale-100 translate-y-0"
                        : "hidden opacity-0 scale-95 translate-y-2"
                    }`}
                  >
                    <article className="project-card group h-full rounded-2xl overflow-hidden bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 hover:border-accent/60 hover:shadow-[0_0_40px_rgba(255,107,43,0.12)] transition-all duration-300">
                      <Link href="/case-study" className="block">
                        <PhotoFrame
                          src={project.image}
                          alt={project.title}
                          width={700}
                          height={416}
                          frameClassName="w-full h-52"
                        />
                      </Link>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2.5 py-1 rounded-full ${
                                tag === project.categoryLabel
                                  ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
                                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href="/case-study">
                          <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            href="/case-study"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white nav-link"
                          >
                            View project →
                          </Link>
                          <span className="text-xs text-zinc-400">{project.year}</span>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
            {visibleCount === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-400 text-sm">No projects in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <CtaBanner
          title="Want your project here?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell me about what you're building and let's see if we're a good fit."
          buttonLabel="Start a project →"
        />
      </main>
      <Footer variant="minimal" />
      <RevealObserver visibleClass="visible" rootMargin="0px 0px -30px 0px" threshold={0.08} />
    </>
  );
}
