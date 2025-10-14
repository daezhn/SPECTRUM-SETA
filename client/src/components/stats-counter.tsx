import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrambleNumber } from "@/hooks/use-animations";
import { useTranslation } from "@/hooks/use-translation";

interface StatItemProps {
  value: number;
  prefix?: string;
  label: string;
  delay?: number;
}

function StatCounter({ value, prefix = "", label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hasStarted, setHasStarted] = useState(false);
  const { displayValue } = useScrambleNumber(hasStarted ? value : 0, 2500);

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay, hasStarted]);

  const formattedValue = () => {
    if (!hasStarted) return "0";
    const numValue = parseInt(displayValue);
    if (prefix === "+") {
      return prefix + " " + numValue.toLocaleString();
    }
    return numValue.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-center"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="text-7xl md:text-8xl lg:text-9xl font-black text-primary mb-4 leading-none tracking-tight font-mono flex justify-center">
        <span className="inline-block min-w-[6ch] text-center tabular-nums">
          {formattedValue()}
        </span>
      </div>
      <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsCounter() {
  const { t, language } = useTranslation();
  
  const stats: { value: number; prefix?: string; labelKey: string; delay: number }[] = [
    { value: 19, labelKey: "hero.stats.yearsExperience", delay: 0 },
    { value: 184, labelKey: "hero.stats.projectsDelivered", delay: 0.2 },
    { value: 3055, labelKey: "hero.stats.satisfactionRate", delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Desde 2006 / Since 2006 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tracking-widest uppercase">
            {language === "es" ? "Desde" : "Since"} <span className="font-bold text-primary">2006</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              prefix={stat.prefix}
              label={t(stat.labelKey)}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
            <span className="text-xs text-primary/60 uppercase tracking-wider">Descubre más</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
