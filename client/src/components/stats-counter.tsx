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
      className="text-center py-12"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div className="text-8xl md:text-9xl lg:text-[12rem] font-black text-primary mb-6 leading-none tracking-tight">
        {rounded}
      </motion.div>
      <p className="text-xl md:text-2xl lg:text-3xl text-white font-light max-w-md mx-auto leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsCounter() {
  const stats = [
    { value: 19, label: "Años de experiencia", delay: 0 },
    { value: 184, label: "Marcas confían en nosotros", delay: 0.3 },
    { value: 3055, prefix: "+", label: "Horas de producción y streaming profesional", delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black border-y border-primary/20">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        {/* Desde 2006 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/70 tracking-widest uppercase">
            Desde <span className="font-bold text-primary">2006</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="space-y-16 md:space-y-24">
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
