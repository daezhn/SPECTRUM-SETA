import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatItemProps {
  value: number;
  prefix?: string;
  label: string;
  delay?: number;
}

function StatCounter({ value, prefix = "", label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (prefix === "+") {
      return prefix + " " + Math.round(latest).toLocaleString();
    }
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        delay,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-center"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div className="text-7xl md:text-8xl lg:text-9xl font-black text-primary mb-4 leading-none tracking-tight">
        {rounded}
      </motion.div>
      <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsCounter() {
  const stats = [
    { value: 19, label: "Años de experiencia", delay: 0 },
    { value: 184, label: "Marcas confían en nosotros", delay: 0.2 },
    { value: 3055, prefix: "+", label: "Horas de producción y streaming profesional", delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black border-y border-primary/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Desde 2006 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tracking-widest uppercase">
            Desde <span className="font-bold text-primary">2006</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              prefix={stat.prefix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
