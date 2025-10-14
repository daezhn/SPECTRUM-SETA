import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";

// Text Reveal Mask Animation Hook
export function useTextReveal(delay: number = 0) {
  return {
    initial: { 
      clipPath: "inset(0 100% 0 0)",
      opacity: 0 
    },
    animate: { 
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        clipPath: {
          duration: 1.2,
          delay,
          ease: [0.77, 0, 0.175, 1] // Cinematic easing
        },
        opacity: {
          duration: 0.3,
          delay
        }
      }
    }
  };
}

// Scramble Numbers Animation Hook
export function useScrambleNumber(value: number, duration: number = 2500) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "0123456789";
  const targetValue = value.toString();
  
  useEffect(() => {
    setIsScrambling(true);
    const startTime = Date.now();
    const scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 0.8) {
        // Scramble phase
        let scrambled = "";
        for (let i = 0; i < targetValue.length; i++) {
          if (Math.random() > progress) {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          } else {
            scrambled += targetValue[i];
          }
        }
        setDisplayValue(scrambled);
      } else {
        // Final reveal phase
        const revealProgress = (progress - 0.8) / 0.2;
        let result = "";
        for (let i = 0; i < targetValue.length; i++) {
          if (i / targetValue.length < revealProgress) {
            result += targetValue[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayValue(result);
      }
      
      if (progress >= 1) {
        clearInterval(scrambleInterval);
        setDisplayValue(targetValue);
        setIsScrambling(false);
      }
    }, 50);
    
    return () => clearInterval(scrambleInterval);
  }, [value, duration]);
  
  return { displayValue, isScrambling };
}

// Magnetic Hover Effect Hook
export function useMagneticHover(strength: number = 0.3): {
  ref: RefObject<HTMLDivElement>;
  style: {
    x: any;
    y: any;
  };
} {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      const magneticRadius = 60; // Attraction radius in pixels
      
      if (distance < magneticRadius) {
        const force = (1 - distance / magneticRadius) * strength;
        x.set(distX * force);
        y.set(distY * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);
  
  return {
    ref,
    style: {
      x: xSpring,
      y: ySpring,
    }
  };
}

// Pulsing Glow Animation Variants
export const pulsingGlowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(139, 92, 246, 0.4)",
      "0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)",
      "0 0 20px rgba(139, 92, 246, 0.4)"
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Ken Burns Effect Animation Hook
export function useKenBurnsEffect(duration: number = 8) {
  const variants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
    },
    animate: {
      scale: [1, 1.05, 1.03, 1.05, 1],
      x: [0, -10, 5, -5, 0],
      y: [0, 5, -10, 5, 0],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };
  
  return variants;
}

// Text Split for Character Animation
export function useSplitText(text: string) {
  const words = text.split(' ');
  const characters = text.split('');
  
  return {
    words: words.map((word, i) => ({
      text: word,
      key: `word-${i}`,
    })),
    characters: characters.map((char, i) => ({
      text: char === ' ' ? '\u00A0' : char,
      key: `char-${i}`,
    }))
  };
}

// Cinematic Text Reveal Component
export function CinematicTextReveal({ 
  children, 
  delay = 0,
  className = ""
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  const { words } = useSplitText(children);
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={word.key}
          initial={{ 
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            filter: "blur(4px)"
          }}
          animate={{ 
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.08,
            ease: [0.77, 0, 0.175, 1]
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word.text}
        </motion.span>
      ))}
    </span>
  );
}