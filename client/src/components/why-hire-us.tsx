import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import iconRapidez from "@assets/icon-rapidez.png";
import iconEnfoques from "@assets/icon-enfoques.png";
import iconTratoDirecto from "@assets/icon-trato-directo.png";
import iconCampos from "@assets/icon-campos.png";
import iconEntusiasmo from "@assets/icon-entusiasmo.png";

const benefits = [
  {
    id: "rapidez",
    icon: iconRapidez,
    title: "RAPIDEZ",
    description: "Nuestra promesa es que su proyecto estará terminado en menos de dos semanas.",
  },
  {
    id: "multiples-enfoques",
    icon: iconEnfoques,
    title: "USO DE MÚLTIPLES ENFOQUES",
    description: "El diseño sigue no sólo las guías de mercadotecnia, sino que se rompe con los enfoques tradicionales al utilizar técnicas psicológicas para transmitir el mensaje correcto y adecuado a sus clientes potenciales.",
  },
  {
    id: "trato-directo",
    icon: iconTratoDirecto,
    title: "TRATO DIRECTO",
    description: "Hablarán directamente con el equipo a cargo de su proyecto, así que tendremos una comunicación personal que facilitará el entendimiento.",
  },
  {
    id: "conocimiento-campos",
    icon: iconCampos,
    title: "CONOCIMIENTO EN VARIOS CAMPOS",
    description: "Trabajamos no sólo en el desarrollo web, sino en la producción de video, diseño gráfico, efectos especiales, comerciales para TV, fotomontajes, modelaje 3D, etc.",
  },
  {
    id: "entusiasmo",
    icon: iconEntusiasmo,
    title: "ENTUSIASMO",
    description: "Nos gusta nuestra labor y la disfrutamos, por eso le aseguramos que obtendrán un excelente trabajo.",
  },
];

export function WhyHireUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            ¿Por qué contratar <span className="text-accent">nuestros servicios</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiencia comprobada, tecnología de punta y compromiso con resultados medibles que transforman tu inversión en impacto real
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
