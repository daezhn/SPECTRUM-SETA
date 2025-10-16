import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReveal, staggerRevealVariants, itemRevealVariants } from "@/hooks/use-reveal";
import { LazyImage } from "@/components/lazy-image";
import { useKenBurnsEffect } from "@/hooks/use-animations";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";

import eventImg1 from "/INFORME DE GOBIERNO.jpg";
import liveImg from "@assets/stock_images/multi_camera_video_p_7e46d6b3.jpg";
import contentImg from "@assets/stock_images/creative_content_pro_c51ec741.jpg";

const galleryItems = [
  {
    id: "gobierno-1",
    title: "Informe de Gobierno",
    category: "Live & Streaming",
    image: eventImg1,
    video: "/MEDIA/INFORMEGOB.mp4",
    description: "Transmisión en vivo Full HD con multicámara para evento gubernamental de alto impacto",
    client: "Gobierno Estatal",
    results: ["11 cámaras", "6 pantallas LED", "Grabación Full HD"],
  },
  {
    id: "juarez-2",
    title: "F.C. Juárez - Video Institucional",
    category: "Content Studio",
    image: "/MEDIA/CLIENTES/image.png",
    video: "/bravosok.mp4",
    description: "Grabación y producción de video institucional profesional para equipo de fútbol de primera división mexicana",
    client: "F.C. Juárez",
    results: ["Producción HD", "Material institucional", "Campaña digital"],
  },
  {
    id: "renard-3",
    title: "Cobertura y creación de contenido Renard Jhonson",
    category: "Brand & Digital",
    image: "/0H3A5437.jpg",
    video: "/RENARD JHONSON MAYOR PASO DEL NORTE PAGINA WEB.mp4",
    description: "Cobertura interna para el alcalde de El Paso, Tx.",
    client: "El Paso mayor; Renard Jhonson",
    results: ["Fotografía y video profesional", "4.8/5 satisfacción", "Alcance global"],
  },
  {
    id: "replay-4",
    title: "Replay Challenge",
    category: "Live & Streaming",
    image: "/ÑEB.png",
  video: "/RETOLEB.mp4",
    description: "Challenge para retar jugadas en la semiprofesional de baseball LEB Chihuahua",
    client: "Liga Estatal de Baseball Chihuahua",
    results: ["Repetición multicamara", "10 equipos simultaneos", "+ 1,400 horas revisadas"],
  },
  {
    id: "ia-5",
    title: "Creación contenido IA",
    category: "Brand & Digital",
    image: liveImg,
    description: "Creación de videos, imagenes, guiones y reels profesionales por medio de inteligencia artificial",
    client: "JMAS Delicias",
    results: ["8 piezas creativas", "3K+ impresiones"],
  },
  {
    id: "community-6",
    title: "Contenido nativo, pauta y community",
    category: "Content Studio",
    image: contentImg,
    description: "Manejo de redes sociales a represantes del estado",
    client: "Jesús Valenciano",
    results: ["129K followers en FB.", "250K+ vistas"],
  },
];

export function Gallery() {
  const { t } = useTranslation();
  const { ref: titleRef, controls: titleControls } = useReveal({ threshold: 0.1 });
  const { ref: gridRef, controls: gridControls } = useReveal({ threshold: 0.05, delay: 0.3 });
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

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
            {t("gallery.title")} <span className="text-accent">{t("gallery.titleHighlight")}</span>
          </motion.h2>
          <motion.p variants={itemRevealVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("gallery.subtitle")}
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          ref={gridRef}
          initial="hidden"
          animate={gridControls}
          variants={staggerRevealVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={itemRevealVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                data-testid={`gallery-item-${item.id}`}
              >
                <div
                  className="group relative overflow-hidden cursor-pointer rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 group-hover:border-primary/50 transition-all duration-500">
                    <motion.div 
                      className="absolute inset-0"
                      variants={useKenBurnsEffect(7)}
                      initial="initial"
                      whileHover="animate"
                    >
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover scale-105"
                        containerClassName="absolute inset-0"
                        aspectRatio="4/3"
                        priority
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border border-primary/30 shadow-lg">
                        {item.category}
                      </Badge>
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" data-testid={`gallery-title-${item.id}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/15 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
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
                {selectedItem.video ? (
                  <video
                    src={encodeURI(selectedItem.video)}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={encodeURI(selectedItem.image)}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </>
                )}
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
