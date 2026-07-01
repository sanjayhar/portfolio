import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { RevealObserver } from "@/components/RevealObserver";
import { PageLoader } from "@/components/PageLoader";
import { CursorGlow } from "@/components/CursorGlow";
import { BackToTop } from "@/components/BackToTop";
import { ReadingProgress } from "@/components/ReadingProgress";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <ReadingProgress />
      <CursorGlow />
      <Navbar variant="home" progressOffset />
      <main>
        <Hero />
        <Services />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer variant="full" />
      <RevealObserver />
      <BackToTop />
    </>
  );
}
