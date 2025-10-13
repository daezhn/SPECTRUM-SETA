import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JoinTeamForm } from "@/components/join-team-form";
import teamMember1 from "@assets/stock_images/professional_latino__44b49307.jpg";
import teamMember2 from "@assets/stock_images/professional_latino__da6bb506.jpg";
import teamMember3 from "@assets/stock_images/professional_latino__5b7a43b7.jpg";
import teamMember4 from "@assets/stock_images/professional_latino__bc7c0915.jpg";

const team = [
  {
    id: 1,
    name: "Carlos Hernández",
    role: "Director General & Productor Ejecutivo",
    bio: "15+ años de experiencia en producción audiovisual y transmisiones en vivo para eventos de alto impacto.",
    image: teamMember1,
    linkedin: "https://www.linkedin.com/in/carlos-hernandez-saeta",
    email: "carlos@saeta.mx",
  },
  {
    id: 2,
    name: "Ana Martínez",
    role: "Directora de Contenido & Storytelling",
    bio: "Especialista en narrativas cinematográficas y estrategia de contenido para marcas premium.",
    image: teamMember2,
    linkedin: "https://www.linkedin.com/in/ana-martinez-saeta",
    email: "ana@saeta.mx",
  },
  {
    id: 3,
    name: "Roberto Sánchez",
    role: "Director Técnico & Live Streaming",
    bio: "Experto en sistemas multicámara 4K y transmisiones de alta disponibilidad con tecnología de punta.",
    image: teamMember3,
    linkedin: "https://www.linkedin.com/in/roberto-sanchez-saeta",
    email: "roberto@saeta.mx",
  },
  {
    id: 4,
    name: "Laura González",
    role: "Gerente de Experiencia de Marca",
    bio: "Enfocada en crear experiencias digitales memorables y estrategias de branding que convierten.",
    image: teamMember4,
    linkedin: "https://www.linkedin.com/in/laura-gonzalez-saeta",
    email: "laura@saeta.mx",
  },
];

export function Team() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="equipo" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Conócenos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            El equipo de profesionales detrás de cada proyecto exitoso
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`team-member-${member.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1" data-testid={`team-name-${member.id}`}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary/90 font-medium mb-3">{member.role}</p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      asChild
                      data-testid={`team-linkedin-${member.id}`}
                    >
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      asChild
                      data-testid={`team-email-${member.id}`}
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <JoinTeamForm />
        </div>
      </div>
    </section>
  );
}
