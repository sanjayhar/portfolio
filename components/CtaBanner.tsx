"use client";

interface CtaBannerProps {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
}

export function CtaBanner({
  eyebrow = "Ready to start?",
  title,
  description,
  buttonLabel,
  buttonHref = "/#contact",
}: CtaBannerProps) {
  return (
    <section className="pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,107,43,0.05)]">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="text-xs font-medium text-accent tracking-widest uppercase mb-4">
              {eyebrow}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-zinc-650 dark:text-zinc-400 max-w-md mx-auto mb-8">{description}</p>
            <a
              href={buttonHref}
              className="inline-flex items-center gap-2 btn-primary bg-accent text-white font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-colors"
            >
              {buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
