import { motion } from "framer-motion";
import demoReelImage from "@assets/stock_images/professional_video_p_4c4e9095.jpg";
import demoReelVideo from "@assets/demo-reel.mp4";

export function VideoDemoReel() {
  return (
    <section 
      id="demo-reel" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border/50"
      data-testid="section-demo-reel"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          poster={demoReelImage}
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-background"
        >
          <source src={demoReelVideo} type="video/mp4" />
        </video>
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
