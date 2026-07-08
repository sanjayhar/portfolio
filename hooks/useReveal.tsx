"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

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

type RevealProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  delayClass?: string;
  as?: T;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({
  children,
  className = "",
  delayClass = "",
  as,
  visibleClass = "in",
  threshold,
  rootMargin,
  ...props
}: RevealProps<T>) {
  const Component = (as || "div") as ElementType;
  const ref = useReveal<HTMLElement>({ threshold, rootMargin, visibleClass });

  return createElement(
    Component,
    {
      ref,
      className: `reveal ${delayClass} ${className}`.trim(),
      ...props,
    },
    children,
  );
}
