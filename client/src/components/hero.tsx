import { motion, useScroll, useTransform } from "framer-motion";
import { type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useBackgroundParallax } from "@/hooks/use-parallax";
import { scrollToSection } from "@/hooks/use-smooth-scroll";
import { CinematicTextReveal, useMagneticHover, pulsingGlowVariants, useKenBurnsEffect } from "@/hooks/use-animations";
const heroImage = "/professional_live_ev_418b5596.jpg";

export function Hero() {
  const parallaxY = useBackgroundParallax(0.5);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const kenBurnsVariants = useKenBurnsEffect(12);
  const magneticCTA = useMagneticHover(0.3);
  const magneticPortfolio = useMagneticHover(0.25);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with full visibility of professional equipment */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
        {/* Background pattern for aesthetic */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(139 92 246 / 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Main hero image - full professional camera equipment visible */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={heroImage}
            alt="Professional event production equipment"
            className="w-full h-full object-contain max-w-none"
            style={{ 
              maxHeight: '100vh',
              objectPosition: 'center',
            }}
            onError={(e) => {
              console.error("Hero image failed to load:", e);
            }}
          />
        </div>
        
        {/* Overlay gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-10 leading-tight">
            <CinematicTextReveal delay={0.2} className="text-white">
              Redefinimos cómo
            </CinematicTextReveal>
            {" "}
            <CinematicTextReveal delay={0.5} className="text-primary">
              conectas
            </CinematicTextReveal>
            <span className="text-white">.</span>
          </h1>

          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-12 max-w-5xl mx-auto font-light leading-relaxed">
            <CinematicTextReveal delay={0.8}>
              Diseñamos, producimos y distribuimos contenido premium y experiencias en vivo que conectan marcas e instituciones con sus audiencias clave
            </CinematicTextReveal>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap mb-20"
          >
            <motion.div
              ref={magneticCTA.ref as RefObject<HTMLDivElement>}
              style={magneticCTA.style}
              className="relative group"
              variants={pulsingGlowVariants}
              animate="animate"
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                style={{ pointerEvents: 'none' }}
              />
              <Button
                size="lg"
                onClick={() => scrollToSection("contacto")}
                data-testid="button-cta-contact"
                className="text-xl px-12 h-16 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden"
              >
                Comienza tu proyecto
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div
              ref={magneticPortfolio.ref as RefObject<HTMLDivElement>}
              style={magneticPortfolio.style}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("portafolio")}
                data-testid="button-cta-portfolio"
                className="text-xl px-12 h-16 gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Play className="w-6 h-6" />
                Ver nuestro trabajo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto"
          >
            {[
              { label: "Streaming / Producción" },
              { label: "Marketing / Diseño" },
              { label: "IA Solutions" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="text-xl md:text-2xl font-semibold text-white">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
