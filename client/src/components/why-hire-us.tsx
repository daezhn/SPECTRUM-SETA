import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Zap, Award, BarChart, HeadphonesIcon, Handshake } from "lucide-react";

const benefits = [
  {
    id: "equipo-multidisciplinario",
    icon: Users,
    title: "Equipo Multidisciplinario Experto",
    description: "Profesionales técnicos y creativos trabajando en conjunto: directores, operadores certificados, editores y especialistas en estrategia digital que aportan visiones complementarias a cada proyecto.",
  },
  {
    id: "tecnologia-vanguardia",
    icon: Zap,
    title: "Tecnología de Vanguardia",
    description: "Equipamiento HD/4K de última generación, soluciones en la nube para colaboración remota, integración con IA para post-producción y analítica, garantizando resultados al más alto nivel técnico.",
  },
  {
    id: "procesos-certificados",
    icon: Award,
    title: "Procesos Certificados",
    description: "En proceso de certificación ISO 9001:2015, aplicamos estándares internacionales de calidad en cada etapa: planificación, ejecución, verificación y mejora continua para asegurar excelencia consistente.",
  },
  {
    id: "resultados-medibles",
    icon: BarChart,
    title: "Resultados Medibles",
    description: "Integración de Google Analytics y herramientas de tracking en tiempo real, reportes de ROI detallados, métricas de engagement y performance que convierten cada proyecto en data accionable.",
  },
  {
    id: "soporte-integral",
    icon: HeadphonesIcon,
    title: "Soporte Integral 24/7",
    description: "Acompañamiento completo durante todo el ciclo de vida del proyecto: desde la conceptualización hasta la distribución, con asistencia técnica inmediata en eventos críticos y mantenimiento post-entrega.",
  },
  {
    id: "partners-estrategicos",
    icon: Handshake,
    title: "Partners Estratégicos",
    description: "Relaciones comerciales con líderes globales como Meta, Google, Sony y OpenAI, permitiéndonos acceder a tecnologías exclusivas, certificaciones oficiales y mejores prácticas internacionales.",
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
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué contratar <span className="text-primary">nuestros servicios</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiencia comprobada, tecnología de punta y compromiso con resultados medibles que transforman tu inversión en impacto real
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`benefit-card-${index}`}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30 rounded-xl p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full px-8 py-4 border border-primary/20">
            <p className="text-lg font-medium">
              <span className="text-primary">Más de 100 proyectos</span> completados exitosamente con{" "}
              <span className="text-accent">98% de satisfacción</span> del cliente
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    </section>
  );
}
