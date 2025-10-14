import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import spectrumLogo from "@assets/Spectrum-03_1760395506893.png";

export function SpectrumSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" data-testid="section-spectrum">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-shrink-0 w-full md:w-auto"
                data-testid="spectrum-logo"
              >
                <img
                  src={spectrumLogo}
                  alt="Spectrum International Media Broadcasting Services"
                  className="w-full md:w-[400px] lg:w-[500px] h-auto"
                />
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1"
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Integrada a un ecosistema especializado en comunicación, tecnología y producción multimedia, Saeta ofrece servicios audiovisuales con alcance y enfoque internacional.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
    </section>
  );
}
