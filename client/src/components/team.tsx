import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { JoinTeamForm } from "@/components/join-team-form";
import teamMember1 from "@assets/stock_images/professional_latino__44b49307.jpg";
import teamMember2 from "@assets/stock_images/professional_latino__da6bb506.jpg";
import teamMember3 from "@assets/stock_images/professional_latino__5b7a43b7.jpg";
import teamMember4 from "@assets/stock_images/professional_latino__44b49307.jpg";
import teamMember5 from "@assets/stock_images/professional_latino__3b619d55.jpg";
import teamMember6 from "@assets/stock_images/professional_latino__029b061c.jpg";
import teamMember7 from "@assets/stock_images/professional_latino__aa2914c3.jpg";
import teamMember8 from "@assets/stock_images/professional_latino__6a701fb1.jpg";
import teamMember9 from "@assets/stock_images/professional_latino__65ea9a22.jpg";
import teamMember10 from "@assets/stock_images/professional_latino__2aaf66ad.jpg";

const team = [
  {
    id: 1,
    name: "Wilhelmy Guzman",
    role: "Director General",
    image: teamMember1,
  },
  {
    id: 2,
    name: "Angel Coronado",
    role: "Director de arte",
    image: teamMember2,
  },
  {
    id: 3,
    name: "José Montañez",
    role: "Jefe de producción",
    image: teamMember3,
  },
  {
    id: 4,
    name: "David Hernández",
    role: "Sistemas e Inteligencia Artificial",
    image: teamMember4,
  },
  {
    id: 5,
    name: "David Valencia",
    role: "Productor Audiovisual",
    image: teamMember5,
  },
  {
    id: 6,
    name: "Alexis Rosas",
    role: "Animación",
    image: teamMember6,
  },
  {
    id: 7,
    name: "Karla Ramos",
    role: "Ejecutora de contenido",
    image: teamMember7,
  },
  {
    id: 8,
    name: "David Marrufo",
    role: "Camarografo",
    image: teamMember8,
  },
  {
    id: 9,
    name: "Nancy ------- ",
    role: "Fotografa",
    image: teamMember9,
  },
  {
    id: 10,
    name: "--------",
    role: "---------",
    image: teamMember10,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
