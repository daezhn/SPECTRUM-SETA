import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clientLogo1 from "@assets/stock_images/company_logos_brands_cba768a5.jpg";
import clientLogo2 from "@assets/stock_images/company_logos_brands_06333bc5.jpg";
import clientLogo3 from "@assets/stock_images/company_logos_brands_8df15b75.jpg";
import clientLogo4 from "@assets/stock_images/company_logos_brands_4b88c9e7.jpg";
import clientLogo5 from "@assets/stock_images/company_logos_brands_0abf67f6.jpg";
import clientLogo6 from "@assets/stock_images/company_logos_brands_5f8b26e0.jpg";

const clients = [
  { id: 1, name: "Cliente Gubernamental", logo: clientLogo1, sector: "Gobierno" },
  { id: 2, name: "Institución Educativa", logo: clientLogo2, sector: "Educación" },
  { id: 3, name: "Corporativo Internacional", logo: clientLogo3, sector: "Corporativo" },
  { id: 4, name: "Empresa Tecnológica", logo: clientLogo4, sector: "Tecnología" },
  { id: 5, name: "Organización Cultural", logo: clientLogo5, sector: "Cultura" },
  { id: 6, name: "Marca Comercial", logo: clientLogo6, sector: "Retail" },
];

export function ClientsCarousel() {
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
            Ellos confían en <span className="text-primary">SAETA</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Marcas líderes que han confiado en nuestra experiencia
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
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <motion.img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
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
