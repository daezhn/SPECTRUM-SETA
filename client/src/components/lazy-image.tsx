import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio,
  priority = false,
  onLoad,
}: LazyImageProps) {
  const resolvedSrc = encodeURI(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "100px", // Increased from 50px for earlier loading
    skip: priority, // Skip intersection observer for priority images
  });

  // Load image when in view or if priority
  useEffect(() => {
    if (priority || inView) {
      const img = new Image();
      img.src = resolvedSrc;
      img.onload = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
    }
  }, [inView, priority, resolvedSrc, onLoad]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Simple blur placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5"
          style={{
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 z-10"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "-100% 0",
          }}
        />
      )}

      {/* Actual image */}
      {(priority || inView) && (
        <motion.img
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          className={`block ${className}`}
          loading={priority ? "eager" : "lazy"}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Reduced from 0.6s
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}