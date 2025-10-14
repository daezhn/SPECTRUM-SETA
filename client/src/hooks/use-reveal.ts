import { useInView } from "react-intersection-observer";
import { useAnimation, AnimationControls } from "framer-motion";
import { useEffect } from "react";

interface RevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export function useReveal({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = "0px",
  delay = 0,
}: RevealOptions = {}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start("visible");
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [inView, controls, delay, triggerOnce]);

  return { ref, controls, inView };
}

export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const staggerRevealVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemRevealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};