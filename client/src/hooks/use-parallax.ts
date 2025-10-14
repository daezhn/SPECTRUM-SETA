import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  speed?: number;
  offset?: [string, string];
  easing?: (x: number) => number;
}

export function useParallax({
  speed = 0.5,
  offset = ["start start", "end start"],
  easing,
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const yRange = [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], yRange, {
    clamp: false,
    ease: easing,
  });

  return { ref, y, scrollYProgress };
}

export function useBackgroundParallax(speed = 0.3) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * speed);
  return y;
}