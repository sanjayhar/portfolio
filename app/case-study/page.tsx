import Link from "next/link";
import { caseStudy } from "@/data/caseStudy";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { CtaBanner } from "@/components/CtaBanner";
import { RevealObserver } from "@/components/RevealObserver";
import { BackArrowIcon } from "@/components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: caseStudy.title,
  description: caseStudy.subtitle,
  openGraph: { type: "article", title: caseStudy.title },
};

function PrincipleIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    bolt: "M13 10V3L4 14h7v7l9-11h-7z",
    map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    spark: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  };
  return (
    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[icon] ?? paths.bolt} />
    </svg>
  );
}

export default function CaseStudyPage() {
  return (
    <>
      <ReadingProgress />
      <Navbar activePage="work" progressOffset />
      <main>
        <article>
          <header className="pt-32 pb-10 max-w-4xl mx-auto px-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors mb-8"
            >
              <BackArrowIcon />
              Back to projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {caseStudy.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    i === 0
                      ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-zinc-400 ml-1">{caseStudy.timeline}</span>
            </div>

            <h1 className="reveal font-display font-bold text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-white leading-tight mb-6">
              {caseStudy.title}
            </h1>

            <p className="reveal d1 text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              {caseStudy.subtitle}
            </p>

            <div className="reveal d2 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-zinc-100 dark:border-zinc-900">
              {caseStudy.meta.map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-medium text-zinc-900 dark:text-white text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </header>

          <div className="max-w-6xl mx-auto px-6 mb-16">
            <PhotoFrame
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              width={1400}
              height={960}
              priority
              frameClassName="reveal w-full h-72 md:h-[480px] rounded-3xl"
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 mb-16">
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5 pl-6"
                >
                  <p
                    className={`font-display font-bold text-3xl ${stat.accent ? "text-accent" : "text-zinc-900 dark:text-white"}`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 pb-4 prose-cs">
            <h2>The brief</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. The product was technically solid, but the dashboard had grown organically without a coherent design strategy.
            </p>
            <p>
              My mandate was simple: fix the first-hour experience without rebuilding from scratch. The budget was fixed and the engineering team had six weeks to ship.
            </p>
            <blockquote>
              <p>
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. They sign up, see the dashboard, and just bounce.&rdquo;
              </p>
            </blockquote>
            <h2>Discovery &amp; research</h2>
            <h3>User interviews</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Key findings from placeholder research sessions:
            </p>
            <ul>
              <li>Lorem ipsum dolor sit amet — users couldn&apos;t locate core sections without help</li>
              <li>Consectetur adipiscing elit — key panels were confused for one another</li>
              <li>Sed do eiusmod tempor — navigation had too many top-level items</li>
              <li>Ut labore et dolore — trial users wanted a clear getting-started path</li>
            </ul>
            <h3>Heuristic audit</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A full heuristic evaluation identified critical violations across visibility, recognition, and error prevention.
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 mb-4">
            <PhotoFrame
              src={PLACEHOLDER_IMAGES.project}
              alt="Dashboard audit placeholder"
              width={1200}
              height={640}
              frameClassName="reveal w-full h-56 md:h-80 rounded-2xl"
            />
            <p className="img-caption">
              Existing dashboard with heuristic violations annotated during the audit phase.
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-6 pb-4 prose-cs">
            <h2>Design strategy</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Three guiding principles:</p>
          </div>

          <div className="max-w-5xl mx-auto px-6 mb-12">
            <div className="reveal grid md:grid-cols-3 gap-5">
              {caseStudy.principles.map((principle) => (
                <div
                  key={principle.title}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-7 border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="w-10 h-10 bg-orange-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
                    <PrincipleIcon icon={principle.icon} />
                  </div>
                  <h3 className="font-display font-bold text-zinc-900 dark:text-white mb-2 text-base">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 pb-4 prose-cs">
            <h2>Process</h2>
            <h3>Week 1–2 · Information architecture</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Card sorting exercise and low-fidelity wireframes for the most-visited screens.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 mb-12">
            <div className="reveal space-y-4">
              {caseStudy.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="step-badge shrink-0 mt-0.5">{index + 1}</div>
                  <div>
                    <p className="font-display font-bold text-zinc-900 dark:text-white mb-1">
                      {step.title}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 mb-4">
            <PhotoFrame
              src={PLACEHOLDER_IMAGES.project}
              alt="High-fidelity screens placeholder"
              width={1200}
              height={640}
              frameClassName="reveal w-full h-56 md:h-80 rounded-2xl"
            />
            <p className="img-caption">
              Final hi-fi screens showing the redesigned sidebar, dashboard home, and workflow builder.
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 mb-12">
            <div className="reveal grid md:grid-cols-2 gap-4">
              <div>
                <PhotoFrame
                  src={PLACEHOLDER_IMAGES.project}
                  alt="Before placeholder"
                  width={700}
                  height={416}
                  frameClassName="w-full h-52 rounded-2xl"
                />
                <p className="img-caption mt-2">Before — cluttered sidebar, no clear entry point</p>
              </div>
              <div>
                <PhotoFrame
                  src={PLACEHOLDER_IMAGES.project}
                  alt="After placeholder"
                  width={700}
                  height={416}
                  frameClassName="w-full h-52 rounded-2xl"
                />
                <p className="img-caption mt-2">After — streamlined sidebar, goal-first onboarding</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 pb-16 prose-cs">
            <h2>Key design decisions</h2>
            <h3>Collapsing the sidebar</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A strict three-tier hierarchy reduced cognitive entry cost significantly.
            </p>
            <h3>The onboarding checklist</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A persistent checklist embedded in the dashboard home improved completion rates.
            </p>
            <h3>Empty states as teachers</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Each empty state includes explanation, CTA, and documentation link.
            </p>
            <h2>Results</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metrics tracked over six weeks post-launch:
            </p>
            <ul>
              <li><strong>SUS score:</strong> 54 → 82 (+28 points)</li>
              <li><strong>Trial-to-paid conversion:</strong> +27%</li>
              <li><strong>Onboarding completion:</strong> 21% → 68%</li>
              <li><strong>Support tickets:</strong> −35%</li>
              <li><strong>Time to first workflow:</strong> 18 min → 4 min</li>
              <li><strong>Post-launch NPS:</strong> 4.8/5</li>
            </ul>
            <blockquote>
              <p>
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Exceptionally thorough process and a pleasure to work with.&rdquo;
              </p>
            </blockquote>
            <h2>Reflections</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Most SaaS UX problems are about information architecture, not aesthetics.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A longer discovery phase would have provided more confidence on borderline navigation decisions.
            </p>
            <hr />
            <p>
              <em>
                Interested in a similar engagement?{" "}
                <Link href="/#contact">Get in touch</Link> — placeholder availability text.
              </em>
            </p>
          </div>
        </article>

        <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">
                More projects
              </h2>
              <Link
                href="/projects"
                className="text-sm font-medium text-accent nav-link hidden md:block"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudy.relatedProjects.map((project) => (
                <article
                  key={project.title}
                  className="reveal card-h group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-accent transition-colors"
                >
                  <PhotoFrame
                    src={project.image}
                    alt={project.title}
                    width={700}
                    height={352}
                    frameClassName="w-full h-44"
                  />
                  <div className="p-5">
                    <div className="flex gap-2 mb-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          project.accentTag
                            ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>
                    <Link href={project.href}>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <Link href={project.href} className="text-sm font-medium text-accent nav-link">
                      View project →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link href="/projects" className="text-sm font-medium text-accent">
                View all projects →
              </Link>
            </div>
          </div>
        </section>

        <CtaBanner
          title="Got a similar project?"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell me about what you're building and let's see if we're a good fit."
          buttonLabel="Start a project →"
        />
      </main>
      <Footer variant="full" />
      <RevealObserver visibleClass="visible" rootMargin="0px 0px -30px 0px" threshold={0.08} />
    </>
  );
}
