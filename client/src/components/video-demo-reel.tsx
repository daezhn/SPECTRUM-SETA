import { motion } from "framer-motion";
import demoReelImage from "@assets/stock_images/professional_video_p_4c4e9095.jpg";

export function VideoDemoReel() {
  return (
    <section 
      id="demo-reel" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border/50"
      data-testid="section-demo-reel"
    >
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

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 max-w-5xl mx-auto"
          >
            <video
              autoPlay
              muted
              playsInline
              controls
              poster={demoReelImage}
              className="w-full rounded-xl shadow-2xl border border-white/10"
              data-testid="video-player"
            >
              <source src="/attached_assets/demo-reel.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light"
          >
            Descubre cómo decirle al mundo cuan buena y mejor es tu empresa
          </motion.p>
        </div>
      </div>
    </section>
  );
}
