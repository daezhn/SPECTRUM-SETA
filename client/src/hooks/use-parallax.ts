import { useScroll, useTransform, MotionValue, type UseScrollOptions } from "framer-motion";
import { useRef } from "react";

type ScrollOffset = NonNullable<UseScrollOptions["offset"]>;

interface ParallaxOptions {
  speed?: number;
  offset?: ScrollOffset;
  easing?: (x: number) => number;
}

const defaultOffset: ScrollOffset = ["start start", "end start"];

export function useParallax({
  speed = 0.5,
  offset = defaultOffset,
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
