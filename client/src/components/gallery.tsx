import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReveal, staggerRevealVariants, itemRevealVariants } from "@/hooks/use-reveal";
import { LazyImage } from "@/components/lazy-image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import eventImg1 from "@assets/stock_images/corporate_event_conf_8208ce6e.jpg";
import eventImg2 from "@assets/stock_images/corporate_event_conf_40f4a11e.jpg";
import eventImg3 from "@assets/stock_images/corporate_event_conf_83e553b2.jpg";
import droneImg from "@assets/stock_images/aerial_drone_cinemat_6a2018be.jpg";
import liveImg from "@assets/stock_images/multi_camera_video_p_7e46d6b3.jpg";
import contentImg from "@assets/stock_images/creative_content_pro_c51ec741.jpg";

const galleryItems = [
  {
    id: "1",
    title: "Rendición de Cuentas Gobierno",
    category: "Live & Streaming",
    image: eventImg1,
    description: "Transmisión en vivo 4K con multicámara para evento gubernamental de alto impacto",
    client: "Gobierno Estatal",
    results: ["15K+ espectadores simultáneos", "98% uptime", "Cobertura en 3 plataformas"],
  },
  {
    id: "2",
    title: "Simposio Híbrido B2B",
    category: "Live & Streaming",
    image: eventImg2,
    description: "Cobertura profesional de evento corporativo con streaming y grabación",
    client: "Servicios Profesionales",
    results: ["500+ asistentes virtuales", "85% engagement rate", "200+ leads generados"],
  },
  {
    id: "3",
    title: "Townhall Ejecutivo",
    category: "Live & Streaming",
    image: eventImg3,
    description: "Transmisión interna corporativa con analítica en tiempo real",
    client: "Corporativo Internacional",
    results: ["92% participación", "4.8/5 satisfacción", "Alcance global"],
  },
  {
    id: "4",
    title: "Video Aéreo 4K - Complejo Industrial",
    category: "Content Studio",
    image: droneImg,
    description: "Cinematografía aérea profesional para promoción industrial",
    client: "Sector Manufacturero",
    results: ["Material 4K RAW", "8 locaciones", "Entrega en 72 hrs"],
  },
  {
    id: "5",
    title: "Campaña de Branding Institucional",
    category: "Brand & Digital",
    image: liveImg,
    description: "Producción completa de spots y material audiovisual corporativo",
    client: "Institución Educativa",
    results: ["12 piezas creativas", "3M+ impresiones", "+45% reconocimiento"],
  },
  {
    id: "6",
    title: "Serie Documental Corporativa",
    category: "Content Studio",
    image: contentImg,
    description: "Producción de serie documental sobre procesos e innovación",
    client: "Empresa Tecnológica",
    results: ["6 episodios", "250K+ vistas", "Premio regional"],
  },
];

const categories = ["Todos", "Live & Streaming", "Content Studio", "Brand & Digital"];

export function Gallery() {
  const { ref: titleRef, controls: titleControls } = useReveal({ threshold: 0.1 });
  const { ref: filtersRef, controls: filtersControls } = useReveal({ threshold: 0.1, delay: 0.2 });
  const { ref: gridRef, controls: gridControls } = useReveal({ threshold: 0.05, delay: 0.3 });
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems = selectedCategory === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedItem(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedItem(galleryItems[prevIndex]);
  };

  return (
    <section id="portafolio" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={staggerRevealVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemRevealVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Casos de <span className="text-accent">Impacto</span>
          </motion.h2>
          <motion.p variants={itemRevealVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados medidos con integración a Analytics y monitoreo en tiempo real
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          ref={filtersRef}
          initial="hidden"
          animate={filtersControls}
          variants={staggerRevealVariants}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          ref={gridRef}
          initial="hidden"
          animate={gridControls}
          variants={staggerRevealVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={itemRevealVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-testid={`gallery-item-${item.id}`}
              >
                <div
                  className="group relative overflow-hidden cursor-pointer rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/30 group-hover:border-primary/50 transition-all duration-500">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      containerClassName="absolute inset-0"
                      aspectRatio="4/3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border border-primary/30 shadow-lg">
                        {item.category}
                      </Badge>
                    </motion.div>

                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" data-testid={`gallery-title-${item.id}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 gap-0 bg-card border-card-border overflow-hidden">
          {selectedItem && (
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="button-close-lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="button-prev-image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="button-next-image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div className="relative aspect-video">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <Badge className="mb-4">{selectedItem.category}</Badge>
                <h3 className="text-3xl font-bold mb-2" data-testid="lightbox-title">
                  {selectedItem.title}
                </h3>
                {selectedItem.client && (
                  <p className="text-muted-foreground mb-4">Cliente: {selectedItem.client}</p>
                )}
                <p className="text-lg mb-6">{selectedItem.description}</p>
                
                {selectedItem.results && (
                  <div>
                    <h4 className="font-semibold mb-3">Resultados:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedItem.results.map((result, idx) => (
                        <div key={idx} className="text-center p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
