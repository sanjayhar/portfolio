"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  visibleClass?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const ref = useRef<T | null>(null);

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    visibleClass = "in",
  } = options;

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, visibleClass]);

  return ref;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayClass?: string;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
}

export function Reveal({
  children,
  className = "",
  delayClass = "",
  visibleClass = "in",
  threshold,
  rootMargin,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({
    threshold,
    rootMargin,
    visibleClass,
  });

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}