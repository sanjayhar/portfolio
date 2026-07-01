import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Counter } from "@/components/Counter";
import { Magnetic } from "@/components/Magnetic";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";
import { ChevronDownIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <HeroSceneLoader />
      <div
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none blob-drift"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl pointer-events-none blob-drift-slow"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="reveal text-sm font-medium text-accent tracking-widest uppercase mb-4">
              {portfolio.availability}
            </p>
            <h1 className="reveal d1 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-zinc-900 dark:text-white mb-6">
              Hi, I&apos;m <span className="text-accent">{portfolio.name}</span>
            </h1>
            <p className="reveal d2 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-md mb-10">
              Freelance{" "}
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">
                {portfolio.role.replace(/^Freelance\s/, "")}
              </strong>
              . {portfolio.tagline}
            </p>
            <div className="reveal d3 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="shimmer inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors text-sm"
                >
                  View my work
                  <ChevronDownIcon />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
            <div className="reveal d4 flex gap-8 mt-14 pt-8 border-t border-zinc-100 dark:border-zinc-900">
              {portfolio.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal d2 flex justify-center md:justify-end">
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 float-y">
              <PhotoFrame
                src={portfolio.heroImage}
                alt={`${portfolio.name} — ${portfolio.role}`}
                width={800}
                height={800}
                priority
                frameClassName="w-full h-full rounded-3xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-accent text-white font-display font-bold text-sm px-4 py-2.5 rounded-2xl shadow-lg pulse-soft">
                {portfolio.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
