import type { Metadata } from "next";
import { PT_Sans, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { GlobalSpaceSceneLoader } from "@/components/three/GlobalSpaceSceneLoader";
import { TechBackgroundLoader } from "@/components/three/TechBackgroundLoader";
import { portfolio } from "@/data/portfolio";
import "@/styles/globals.css";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: portfolio.title,
    template: `%s — ${portfolio.name}`,
  },
  description: portfolio.meta.description,
  keywords: portfolio.meta.keywords.split(", "),
  authors: [{ name: portfolio.meta.author }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: portfolio.meta.ogTitle,
    description: portfolio.meta.ogDescription,
    type: "website",
    url: portfolio.meta.ogUrl,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ptSans.variable} ${dmSans.variable} bg-zinc-50 dark:bg-[#030014] text-zinc-900 dark:text-zinc-100 antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {portfolio.activeBackground === "tech" ? (
              <TechBackgroundLoader />
            ) : (
              <GlobalSpaceSceneLoader />
            )}
            <div className="relative z-10">{children}</div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

