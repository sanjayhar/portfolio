"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type RefObject } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  visibleClass?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    visibleClass = "in",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, visibleClass]);

  return ref;
}

export function Reveal({
  children,
  className = "",
  delayClass = "",
  as: Tag = "div",
  visibleClass = "in",
  threshold,
  rootMargin,
}: {
  children: ReactNode;
  className?: string;
  delayClass?: string;
  as?: ElementType;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useReveal<HTMLElement>({ threshold, rootMargin, visibleClass });

  return (
    <Tag
      ref={ref as RefObject<never>}
      className={`reveal ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
