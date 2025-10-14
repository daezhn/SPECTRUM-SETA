import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LazyImage } from "@/components/lazy-image";
import { useTranslation } from "@/hooks/use-translation";
import algodoneros from "@assets/algodoneros.webp";
import amistad from "@assets/amistad.webp";
import aptiv from "@assets/aptiv.webp";
import congresoEstado from "@assets/congresoestado.webp";
import dhgas from "@assets/dhgas.webp";
import doradosChihuahua from "@assets/dorados-chihuahua.webp";
import fcJuarez from "@assets/fc-juarez.webp";
import fiscalia from "@assets/fiscalia.webp";

const clients = [
  { id: 7, name: "F.C. Juárez", logo: fcJuarez, sector: "Deportes" },
  { id: 2, name: "Casa Amistad", logo: amistad, sector: "Organización" },
  { id: 6, name: "Dorados de Chihuahua", logo: doradosChihuahua, sector: "Deportes" },
  { id: 8, name: "Fiscalía del Estado", logo: fiscalia, sector: "Gobierno" },
  { id: 3, name: "APTIV", logo: aptiv, sector: "Corporativo" },
  { id: 4, name: "Congreso del Estado", logo: congresoEstado, sector: "Gobierno" },
  { id: 5, name: "DH Gas", logo: dhgas, sector: "Servicios" },
  { id: 1, name: "Algodoneros de Guasave", logo: algodoneros, sector: "Deportes" },
];

export function ClientsCarousel() {
  const { t } = useTranslation();
  const [currentSet, setCurrentSet] = useState(0);
  const itemsPerPage = 4;
  const totalSets = Math.ceil(clients.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % totalSets);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSets]);

  const getVisibleClients = () => {
    const startIdx = currentSet * itemsPerPage;
    const visible = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const idx = (startIdx + i) % clients.length;
      visible.push(clients[idx]);
    }
    return visible;
  };

  const visibleClients = getVisibleClients();

  return (
    <div className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("testimonials.title")} <span className="text-primary">SAETA</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {visibleClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group"
              data-testid={`client-logo-${client.id}`}
            >
              <div className="relative aspect-square rounded-xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/30 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20">
                <div className="absolute inset-0 p-6">
                  <LazyImage
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                    containerClassName="relative w-full h-full"
                    aspectRatio="1/1"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
              </div>
              <p className="text-center mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {client.sector}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSet(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSet ? "bg-primary w-8" : "bg-muted-foreground/30"
              }`}
              data-testid={`client-carousel-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
