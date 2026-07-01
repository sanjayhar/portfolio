"use client";

import Link from "next/link";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useActiveSection, type HomeSection } from "@/hooks/useActiveSection";
import { useThemeContext } from "@/components/ThemeProvider";
import {
  ArrowRightIcon,
  CloseIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";

export type NavPage = "home" | "work" | "blog";

interface NavbarProps {
  variant?: "home" | "page";
  activePage?: NavPage;
  progressOffset?: boolean;
}

const homeLinks: { href: string; label: string; section: HomeSection }[] = [
  { href: "#services", label: "Services", section: "services" },
  { href: "#work", label: "Work", section: "work" },
  { href: "#experience", label: "Experience", section: "experience" },
  { href: "#about", label: "About", section: "about" },
  { href: "#contact", label: "Contact", section: "contact" },
];

const pageLinks: { href: string; label: string; page?: NavPage }[] = [
  { href: "/#services", label: "Services" },
  { href: "/projects", label: "Work", page: "work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar({
  variant = "page",
  activePage,
  progressOffset = false,
}: NavbarProps) {
  const scrolled = useScrollHeader();
  const trackedSection = useActiveSection();
  const activeSection = variant === "home" ? trackedSection : "hero";
  const { dark, toggle, mounted } = useThemeContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerClass = [
    "fixed inset-x-0 z-50 transition-all duration-300",
    progressOffset ? "top-0.5" : "top-0",
    scrolled
      ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm shadow-black/5"
      : variant === "page"
        ? "bg-transparent"
        : "",
  ].join(" ");

  const linkBase =
    "nl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors";
  const pageLinkBase =
    "nav-link text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors";

  return (
    <header className={headerClass}>
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href={variant === "home" ? "#hero" : "/"}
          className="font-display font-bold text-xl tracking-tight relative z-10"
        >
          <span className="text-zinc-900 dark:text-white">{portfolio.namePrefix}</span>
          <span className="text-accent">{portfolio.nameAccent}</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm" role="list">
          {variant === "home"
            ? homeLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${linkBase} ${activeSection === link.section ? "on !text-zinc-900 dark:!text-white" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))
            : pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${pageLinkBase} ${link.page === activePage ? "text-accent font-medium" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label={dark ? "Light mode" : "Dark mode"}
          >
            {mounted && dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link
            href={variant === "home" ? "#contact" : "/#contact"}
            className="hidden md:inline-flex items-center gap-2 shimmer bg-accent text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-accent-light transition-colors"
          >
            Contact me <ArrowRightIcon />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="flex flex-col px-6 py-5 gap-4 text-sm font-medium" role="list">
            {variant === "home"
              ? homeLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))
              : pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block ${link.page === activePage ? "text-accent font-medium" : "text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            <li className="pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <Link
                href={variant === "home" ? "#contact" : "/#contact"}
                onClick={() => setMobileOpen(false)}
                className="inline-flex shimmer bg-accent text-white font-medium text-sm px-5 py-2.5 rounded-full"
              >
                Contact me →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
