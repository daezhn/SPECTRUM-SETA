import { lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { VideoDemoReel } from "@/components/video-demo-reel";
import { Hero } from "@/components/hero";
import { StatsCounter } from "@/components/stats-counter";

// Lazy load components that are below the fold
const WhyHireUs = lazy(() => import("@/components/why-hire-us").then(m => ({ default: m.WhyHireUs })));
const Valor360 = lazy(() => import("@/components/valor-360").then(m => ({ default: m.Valor360 })));
const Services = lazy(() => import("@/components/services").then(m => ({ default: m.Services })));
const Gallery = lazy(() => import("@/components/gallery").then(m => ({ default: m.Gallery })));
const About = lazy(() => import("@/components/about").then(m => ({ default: m.About })));
const CommercialPartners = lazy(() => import("@/components/commercial-partners").then(m => ({ default: m.CommercialPartners })));
const SpectrumSection = lazy(() => import("@/components/spectrum-section").then(m => ({ default: m.SpectrumSection })));
const Team = lazy(() => import("@/components/team").then(m => ({ default: m.Team })));
const ClientsCarousel = lazy(() => import("@/components/testimonials-carousel").then(m => ({ default: m.ClientsCarousel })));
const Contact = lazy(() => import("@/components/contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/footer").then(m => ({ default: m.Footer })));

// Loading component for suspense fallback
function ComponentLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
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
      <Suspense fallback={<ComponentLoader />}>
        <WhyHireUs />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Valor360 />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <CommercialPartners />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <SpectrumSection />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Team />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <ClientsCarousel />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<ComponentLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
