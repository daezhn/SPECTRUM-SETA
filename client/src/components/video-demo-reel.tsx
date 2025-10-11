import { motion } from "framer-motion";
import { Play } from "lucide-react";
import demoReelImage from "@assets/stock_images/professional_video_p_4c4e9095.jpg";

export function VideoDemoReel() {
  return (
    <section 
      id="demo-reel" 
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-border/50"
      data-testid="section-demo-reel"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${demoReelImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg md:text-xl font-medium text-white/70 mb-8 uppercase tracking-wider">
              Nuestro Trabajo en Acción
            </h2>
          </motion.div>

          {/* Play Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <button
              data-testid="button-play-video"
              className="group relative mx-auto"
              aria-label="Play demo reel video"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Outer pulsing ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-primary/30 backdrop-blur-sm"
                />
                
                {/* Play button */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/50">
                  <Play className="w-10 h-10 md:w-14 md:h-14 text-white ml-2 transition-transform duration-300 group-hover:scale-110" fill="white" />
                </div>
              </motion.div>
            </button>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light"
          >
            Descubre cómo transformamos ideas en experiencias visuales impactantes
          </motion.p>
        </div>
      </div>
    </section>
  );
}
