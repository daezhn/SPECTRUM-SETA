import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Award, Zap } from "lucide-react";

const isoSteps = [
  {
    phase: "PLANEAR",
    icon: CheckCircle2,
    items: [
      "Análisis de requisitos del cliente",
      "Definición de alcance y objetivos",
      "Planificación de recursos técnicos",
      "Establecimiento de KPIs",
    ],
  },
  {
    phase: "HACER",
    icon: Zap,
    items: [
      "Ejecución con equipo certificado",
      "Producción con tecnología de punta",
      "Seguimiento en tiempo real",
      "Control de calidad continuo",
    ],
  },
  {
    phase: "VERIFICAR",
    icon: Award,
    items: [
      "Revisión de entregables",
      "Validación de métricas",
      "Análisis de resultados",
      "Feedback del cliente",
    ],
  },
  {
    phase: "ACTUAR",
    icon: Shield,
    items: [
      "Implementación de mejoras",
      "Actualización de procesos",
      "Capacitación continua",
      "Innovación tecnológica",
    ],
  },
];

const features = [
  {
    title: "Renovación Tecnológica Constante",
    description: "Equipo HD/4K renovado periódicamente con redundancia para calidad consistente y menor riesgo operativo.",
    icon: Zap,
  },
  {
    title: "Planes de Contingencia",
    description: "Pruebas previas, doble enlace, backups y failover para garantizar continuidad en transmisiones críticas.",
    icon: Shield,
  },
  {
    title: "Seguridad & Privacidad",
    description: "NDA, control de accesos, protocolos de data privacy, backups automáticos y trazabilidad completa.",
    icon: Award,
  },
];

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="nosotros" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="text-primary">SAETA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Operación todo-en-uno: creatividad cinematográfica + cobertura multicámara en vivo con analítica integrada
          </p>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="border-card-border p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Lo que hacemos</h3>
                  <p className="text-lg text-muted-foreground">
                    Diseñamos, producimos y distribuimos contenido premium y experiencias en vivo que conectan marcas e instituciones con sus audiencias clave.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">A quién servimos</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Gobierno", "Servicios Profesionales", "Corporativo"].map((sector) => (
                      <div key={sector} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                        {sector}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ISO 9001:2015 PHVA Cycle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Gestión de Calidad <span className="text-accent">ISO 9001:2015</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro Sistema de Gestión de Calidad está guiado por el ciclo PHVA (Planear–Hacer–Verificar–Actuar)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isoSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  data-testid={`iso-step-${step.phase.toLowerCase()}`}
                >
                  <Card className="h-full hover-elevate active-elevate-2 transition-all border-card-border">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-4">{step.phase}</h4>
                      <ul className="space-y-2">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trust & Continuity Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Confianza y Continuidad</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  data-testid={`feature-${index}`}
                >
                  <Card className="h-full text-center hover-elevate active-elevate-2 transition-all border-card-border">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
