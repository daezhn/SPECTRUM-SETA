import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "SAETA transformó nuestro evento gubernamental con una cobertura 4K impecable. La transmisión alcanzó más de 15,000 espectadores simultáneos sin interrupciones.",
    author: "Director de Comunicación",
    company: "Gobierno Estatal",
    sector: "Gobierno",
  },
  {
    id: 2,
    quote: "La producción cinematográfica para nuestra campaña institucional superó nuestras expectativas. El nivel de profesionalismo y creatividad es excepcional.",
    author: "Gerente de Marketing",
    company: "Institución Educativa",
    sector: "Educación",
  },
  {
    id: 3,
    quote: "Confiamos en SAETA para nuestros eventos corporativos más importantes. Su equipo multicámara y la calidad de transmisión son incomparables en la región.",
    author: "Director de Eventos",
    company: "Corporativo Internacional",
    sector: "Corporativo",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Lo que dicen nuestros <span className="text-primary">clientes</span>
            </h2>
          </motion.div>

          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
                  <Quote className="w-12 h-12 text-primary/20 mb-6" />
                  <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                    "{testimonials[current].quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[current].author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonials[current].author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[current].company} · {testimonials[current].sector}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
