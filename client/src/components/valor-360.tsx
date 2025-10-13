import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import aiAutomationImg from "@assets/valor360-automatizacion.jpg";
import audienciasHibridasImg from "@assets/valor360-audiencias.jpg";
import narrativasImg from "@assets/valor360-narrativas.jpg";

const transformationCases = [
  {
    id: 1,
    title: "De procesos manuales a automatización inteligente",
    description: "Los plazos se acortan y la IA creativa cambió las reglas de la postproducción. ¿Nuestra respuesta? Flujos con IA para edición asistida, motion graphics generativos y versionado multiplataforma que aceleran la entrega y elevan la consistencia a escala.",
    image: aiAutomationImg,
    imagePosition: "center",
  },
  {
    id: 2,
    title: "Las audiencias híbridas y las plataformas que evolucionan minuto a minuto",
    description: "Las audiencias híbridas y las plataformas que evolucionan minuto a minuto transformaron la forma de comunicar. ¿Nuestra respuesta? Analítica en tiempo real y tableros de decisión que permiten ajustar contenido y distribución al instante, local o globalmente.",
    image: audienciasHibridasImg,
    imagePosition: "center",
  },
  {
    id: 3,
    title: "De contenido genérico a narrativas que convierten",
    description: "En un feed saturado, los mensajes planos se pierden. Por eso realizamos un Storytelling guiado por datos y pruebas creativas continuo para construir historias que resuenan y generan engagement medible.",
    image: narrativasImg,
    imagePosition: "70% center",
  },
];

export function Valor360() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformationCases.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformationCases.length) % transformationCases.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformationCases.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="valor-360" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro valor <span className="text-accent">360°</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovación en movimiento. Impacto en tiempo real.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div
            className="bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden"
            data-testid="carousel-valor-360"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-0"
              >
                {/* Image Section */}
                <div className="relative min-h-[400px] overflow-hidden">
                  <img
                    src={transformationCases[currentIndex].image}
                    alt={transformationCases[currentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: transformationCases[currentIndex].imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:to-background/90" />
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center min-h-[400px]">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-accent leading-tight">
                    {transformationCases[currentIndex].title}
                  </h3>
                  <div className="space-y-4">
                    {transformationCases[currentIndex].description.includes('¿Nuestra respuesta?') ? (
                      <>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {transformationCases[currentIndex].description.split('¿Nuestra respuesta?')[0].trim()}
                        </p>
                        <div className="border-l-4 border-accent/50 pl-4 bg-accent/5 py-3 rounded-r">
                          <p className="text-sm font-semibold text-accent/80 mb-2">¿Nuestra respuesta?</p>
                          <p className="text-lg text-foreground leading-relaxed">
                            {transformationCases[currentIndex].description.split('¿Nuestra respuesta?')[1].trim()}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {transformationCases[currentIndex].description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 backdrop-blur-md border border-accent/30 flex items-center justify-center hover:bg-accent/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-prev-valor"
            >
              <ChevronLeft className="w-6 h-6 text-accent" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 backdrop-blur-md border border-accent/30 flex items-center justify-center hover:bg-accent/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-next-valor"
            >
              <ChevronRight className="w-6 h-6 text-accent" />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {transformationCases.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-primary w-12 h-3"
                    : "bg-muted-foreground/30 w-3 h-3 hover:bg-muted-foreground/50"
                }`}
                data-testid={`dot-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
