import { Navbar } from "@/components/navbar";
import { VideoDemoReel } from "@/components/video-demo-reel";
import { Hero } from "@/components/hero";
import { WhyHireUs } from "@/components/why-hire-us";
import { Valor360 } from "@/components/valor-360";
import { Services } from "@/components/services";
import { ClientsCarousel } from "@/components/testimonials-carousel";
import { Gallery } from "@/components/gallery";
import { Team } from "@/components/team";
import { About } from "@/components/about";
import { CommercialPartners } from "@/components/commercial-partners";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <Navbar />
      <VideoDemoReel />
      <Hero />
      <WhyHireUs />
      <Valor360 />
      <Services />
      <Gallery />
      <About />
      <CommercialPartners />
      <Team />
      <ClientsCarousel />
      <Contact />
      <Footer />
    </div>
  );
}
