import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Film, Palette, TrendingUp } from "lucide-react";
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
      "Hasta 8 cámaras XDCAM/NXCAM",
      "Grúa, steady cam, dolly, drone 4K",
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
    description: "Contenido nativo, pauta y community para elevar engagement y leads.",
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

  return (
    <section id="servicios" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestras <span className="text-primary">Soluciones</span>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`service-card-${service.id}`}
    >
      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 h-full border-card-border">
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} transition-opacity duration-300`} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-6 left-6">
            <div className="w-14 h-14 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-2" data-testid={`service-title-${service.id}`}>
            {service.title}
          </h3>
          <p className="text-sm text-primary font-medium mb-3">{service.subtitle}</p>
          <p className="text-muted-foreground mb-6">{service.description}</p>
          
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
