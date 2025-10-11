import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import metaLogo from "@assets/stock_images/meta_facebook_logo_w_5e6cb8bf.jpg";
import googleLogo from "@assets/stock_images/google_logo_colorful_f7b42a92.jpg";
import sonyLogo from "@assets/stock_images/sony_corporation_log_1269efb8.jpg";
import openaiLogo from "@assets/stock_images/openai_logo_artifici_c8b25ef4.jpg";

const partners = [
  {
    id: "meta",
    name: "Meta",
    logo: metaLogo,
    description: "Alianza estratégica para soluciones avanzadas en redes sociales, publicidad digital y experiencias inmersivas que conectan marcas con audiencias globales.",
  },
  {
    id: "google",
    name: "Google",
    logo: googleLogo,
    description: "Partner tecnológico en analítica avanzada, soluciones cloud y herramientas de medición para optimizar el rendimiento de cada proyecto.",
  },
  {
    id: "sony",
    name: "Sony",
    logo: sonyLogo,
    description: "Colaboración en equipamiento profesional de imagen y sonido de clase mundial para producciones cinematográficas de máxima calidad.",
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: openaiLogo,
    description: "Integración de inteligencia artificial de vanguardia para potenciar la creación de contenido, automatización y experiencias personalizadas.",
  },
];

export function CommercialPartners() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="aliados-comerciales" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros <span className="text-primary">Aliados Comerciales</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trabajamos de la mano con líderes tecnológicos globales para ofrecer soluciones de vanguardia a nuestros clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`partner-card-${partner.id}`}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={partner.logo}
                      alt={`Logo de ${partner.name}`}
                      className="w-full h-full object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      data-testid={`partner-logo-${partner.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                  
                  <h3 
                    className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
                    data-testid={`partner-name-${partner.id}`}
                  >
                    {partner.name}
                  </h3>
                  
                  <p 
                    className="text-sm text-muted-foreground text-center leading-relaxed"
                    data-testid={`partner-description-${partner.id}`}
                  >
                    {partner.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estas alianzas estratégicas nos permiten estar a la vanguardia tecnológica y ofrecer soluciones innovadoras que superan las expectativas de nuestros clientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
