import { motion } from "framer-motion";
import { SiWhatsapp, SiFacebook, SiLinkedin } from "react-icons/si";
import { useMagneticHover } from "@/hooks/use-animations";
import { useTranslation } from "@/hooks/use-translation";
import demoReelImage from "@assets/stock_images/professional_video_p_4c4e9095.jpg";

// Use public folder for large video to avoid bundling
const demoReelVideo = "/demo-reel.mp4";

export function VideoDemoReel() {
  const { t } = useTranslation();
  return (
    <section 
      id="demo-reel" 
      className="relative min-h-screen flex items-end justify-center overflow-hidden border-b border-border/50"
      data-testid="section-demo-reel"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={demoReelImage}
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-background"
        >
          <source src={demoReelVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content - Bottom aligned */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pb-20 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg md:text-xl font-medium text-white/70 mb-6 uppercase tracking-wider">
              {t("videoDemoReel.title")}
            </h2>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light mb-8"
          >
            {t("videoDemoReel.subtitle")}
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <motion.a
              href="https://api.whatsapp.com/send/?phone=526141318497&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-whatsapp"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <SiWhatsapp className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.facebook.com/saetapromx"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-facebook"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <SiFacebook className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <SiLinkedin className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
