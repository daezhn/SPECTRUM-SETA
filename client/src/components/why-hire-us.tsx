import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "@/hooks/use-translation";
import iconRapidez from "@assets/icon-rapidez.png";
import iconEnfoques from "@assets/icon-enfoques.png";
import iconTratoDirecto from "@assets/icon-trato-directo.png";
import iconCampos from "@assets/icon-campos.png";
import iconEntusiasmo from "@assets/icon-entusiasmo.png";

export function WhyHireUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  const benefits = [
    {
      id: "rapidez",
      icon: iconRapidez,
      title: t("whyHireUs.benefits.speed.title"),
      description: t("whyHireUs.benefits.speed.description"),
    },
    {
      id: "multiples-enfoques",
      icon: iconEnfoques,
      title: t("whyHireUs.benefits.multipleApproaches.title"),
      description: t("whyHireUs.benefits.multipleApproaches.description"),
    },
    {
      id: "trato-directo",
      icon: iconTratoDirecto,
      title: t("whyHireUs.benefits.directCommunication.title"),
      description: t("whyHireUs.benefits.directCommunication.description"),
    },
    {
      id: "conocimiento-campos",
      icon: iconCampos,
      title: t("whyHireUs.benefits.multiFieldKnowledge.title"),
      description: t("whyHireUs.benefits.multiFieldKnowledge.description"),
    },
    {
      id: "entusiasmo",
      icon: iconEntusiasmo,
      title: t("whyHireUs.benefits.enthusiasm.title"),
      description: t("whyHireUs.benefits.enthusiasm.description"),
    },
  ];

  return (
    <section id="por-que-contratar" className="py-20 md:py-32 relative overflow-hidden" data-testid="section-why-hire-us">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("whyHireUs.title")} <span className="text-accent">{t("whyHireUs.titleHighlight")}</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("whyHireUs.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`benefit-card-${index}`}
                className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
              >
                <div className="h-full bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30 rounded-xl p-8 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-accent/10 backdrop-blur-md border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={benefit.icon} 
                      alt={benefit.title}
                      className="w-8 h-8 object-contain brightness-0 saturate-100"
                      style={{
                        filter: 'invert(47%) sepia(89%) saturate(3592%) hue-rotate(249deg) brightness(99%) contrast(103%)'
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    </section>
  );
}