import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ClientsCarousel } from "@/components/testimonials-carousel";
import { Gallery } from "@/components/gallery";
import { Team } from "@/components/team";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Team />
      <ClientsCarousel />
      <Contact />
      <Footer />
    </div>
  );
}
