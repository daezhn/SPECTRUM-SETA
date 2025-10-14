import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "@/hooks/use-translation";
import aiAutomationImg from "@assets/valor360-automatizacion.jpg";
import audienciasHibridasImg from "@assets/valor360-audiencias.jpg";
import narrativasImg from "@assets/88220530_1049505392072982_934368232574287872_n_1760398681667.jpg";

export function Valor360() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation();

  const transformationCases = [
    {
      id: 1,
      title: t("valor360.cases.automation.title"),
      problem: t("valor360.cases.automation.problem"),
      solution: t("valor360.cases.automation.solution"),
      image: aiAutomationImg,
      imagePosition: "center",
    },
    {
      id: 2,
      title: t("valor360.cases.hybridAudiences.title"),
      problem: t("valor360.cases.hybridAudiences.problem"),
      solution: t("valor360.cases.hybridAudiences.solution"),
      image: audienciasHibridasImg,
      imagePosition: "center",
    },
    {
      id: 3,
      title: t("valor360.cases.narratives.title"),
      problem: t("valor360.cases.narratives.problem"),
      solution: t("valor360.cases.narratives.solution"),
      image: narrativasImg,
      imagePosition: "75% center",
    },
  ];

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
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("valor360.title")} <span className="text-accent">{t("valor360.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("valor360.subtitle")}
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
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {transformationCases[currentIndex].problem}
                    </p>
                    <div className="border-l-4 border-accent/50 pl-4 bg-accent/5 py-3 rounded-r">
                      <p className="text-sm font-semibold text-accent/80 mb-2">{t("valor360.ourResponse")}</p>
                      <p className="text-lg text-foreground leading-relaxed">
                        {transformationCases[currentIndex].solution}
                      </p>
                    </div>
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
              aria-label={t("valor360.navigation.previous")}
            >
              <ChevronLeft className="w-6 h-6 text-accent" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 backdrop-blur-md border border-accent/30 flex items-center justify-center hover:bg-accent/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-next-valor"
              aria-label={t("valor360.navigation.next")}
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
                aria-label={`${t("valor360.navigation.goToSlide")} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}