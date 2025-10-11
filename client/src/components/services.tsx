import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Video, Film, Palette, TrendingUp } from "lucide-react";
import { useRef } from "react";
import liveStreamingImg from "@assets/stock_images/multi_camera_video_p_7e46d6b3.jpg";
import contentStudioImg from "@assets/stock_images/creative_content_pro_c51ec741.jpg";
import brandingImg from "@assets/stock_images/brand_design_digital_468746c7.jpg";
import socialImg from "@assets/stock_images/social_media_analyti_638c9813.jpg";

const services = [
  {
    id: "live-streaming",
    icon: Video,
    title: "Live & Streaming 4K",
    subtitle: "Del en vivo incierto a experiencias estables que convierten",
    description: "Cobertura sin interrupciones y audiencia ampliada con trazabilidad completa.",
    features: [
      "Multicámara HD/4K con DVR",
      "Operadores profesionales",
      "Grúa, steady cam, dolly, drone",
      "Bitrate adaptable + Google Analytics",
    ],
    image: liveStreamingImg,
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "content-studio",
    icon: Film,
    title: "Content & StoryStudio",
    subtitle: "Del contenido aislado a un motor creativo escalable",
    description: "Narrativas cinematográficas que elevan reputación y recordación de marca.",
    features: [
      "Spots HD, documentales y cortometrajes",
      "Fotografía profesional y aérea",
      "Post producción y motion graphics",
      "Entrega ágil para social/web/TV",
    ],
    image: contentStudioImg,
    color: "from-accent/20 to-accent/5",
  },
  {
    id: "brand-digital",
    icon: Palette,
    title: "Brand & Digital Experience",
    subtitle: "Marca consistente y páginas que marcan",
    description: "Identidades sólidas y sitios que convierten, coherentes con cada experiencia.",
    features: [
      "Identidad visual y branding",
      "Diseño web con analítica integrada",
      "Landings de alto impacto",
      "Soporte y mantenimiento web",
    ],
    image: brandingImg,
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    id: "social-community",
    icon: TrendingUp,
    title: "Social & Community",
    subtitle: "De 'publicar y esperar' a performance medible",
    description: "Contenido nativo, pauta y community para elevar engagement y liderazgo.",
    features: [
      "Estrategia de contenido",
      "Gestión de comunidades",
      "Pauta digital optimizada",
      "Analítica y reportes en tiempo real",
    ],
    image: socialImg,
    color: "from-primary/20 to-accent/10",
  },
];

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="servicios" className="py-20 md:py-32 relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestras <span className="text-accent">Soluciones</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuatro suites integrales que transforman tu visión en resultados medibles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, inView }: { service: typeof services[0], index: number, inView: boolean }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`service-card-${service.id}`}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 h-full bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/50 hover:border-primary/30">
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.image})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-70 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-black/30" />
          
          <motion.div 
            className="absolute top-6 left-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center shadow-lg">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300" data-testid={`service-title-${service.id}`}>
            {service.title}
          </h3>
          <p className="text-sm text-primary/80 font-medium mb-4">{service.subtitle}</p>
          <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
          
          <ul className="space-y-3">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex items-start gap-3 text-sm group/item"
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring" }}
                />
                <span className="group-hover/item:text-foreground transition-colors">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
