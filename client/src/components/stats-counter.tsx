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
      return prefix + Math.round(latest).toLocaleString();
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-4">
        {rounded}
      </motion.div>
      <p className="text-lg md:text-xl text-white/90 font-light max-w-xs mx-auto">
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
    <section className="relative py-20 md:py-32 bg-black border-y border-border/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
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
