"use client";

import { useEffect } from "react";

export function RevealObserver({
  selector = ".reveal",
  visibleClass = "in",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
}: {
  selector?: string;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  useEffect(() => {
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

    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, visibleClass, threshold, rootMargin]);

  return null;
}
