import Link from "next/link";
import { portfolio } from "@/data/portfolio";

interface FooterProps {
  variant?: "full" | "minimal";
}

export function Footer({ variant = "full" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">
          © {year} {portfolio.name}. All rights reserved.
          {variant === "full" && (
            <>
              {" "}
              <br />
              Developed by{" "}
              <a href="https://lbegey78.gumroad.com/" target="_blank" className="font-bold">
                Laurent Begey
              </a>{" "}
              • Distributed by{" "}
              <a href="https://themewagon.com/" target="_blank" className="font-bold">
                ThemeWagon
              </a>
            </>
          )}
        </p>
        <p className="text-xs text-zinc-500">
          Built with{" "}
          <a
            href="https://tailwindcss.com"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            Tailwind CSS
          </a>{" "}
          &amp;{" "}
          <Link href="/" className="hover:text-accent transition-colors">
            Next.js
          </Link>
        </p>
      </div>
    </footer>
  );
}
