import { lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { VideoDemoReel } from "@/components/video-demo-reel";
import { Hero } from "@/components/hero";
import { StatsCounter } from "@/components/stats-counter";

// Lazy load heavy components for better performance
const WhyHireUs = lazy(() => import("@/components/why-hire-us").then(m => ({ default: m.WhyHireUs })));
const Valor360 = lazy(() => import("@/components/valor-360").then(m => ({ default: m.Valor360 })));
const Services = lazy(() => import("@/components/services").then(m => ({ default: m.Services })));
const ClientsCarousel = lazy(() => import("@/components/testimonials-carousel").then(m => ({ default: m.ClientsCarousel })));
const Gallery = lazy(() => import("@/components/gallery").then(m => ({ default: m.Gallery })));
const Team = lazy(() => import("@/components/team").then(m => ({ default: m.Team })));
const About = lazy(() => import("@/components/about").then(m => ({ default: m.About })));
const CommercialPartners = lazy(() => import("@/components/commercial-partners").then(m => ({ default: m.CommercialPartners })));
const SpectrumSection = lazy(() => import("@/components/spectrum-section").then(m => ({ default: m.SpectrumSection })));
const Contact = lazy(() => import("@/components/contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/footer").then(m => ({ default: m.Footer })));

// Loading fallback component
function SectionLoader() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <Navbar />
      <VideoDemoReel />
      <Hero />
      <StatsCounter />
      <Suspense fallback={<SectionLoader />}>
        <WhyHireUs />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Valor360 />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CommercialPartners />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SpectrumSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Team />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ClientsCarousel />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
