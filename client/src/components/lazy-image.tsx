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
    rootMargin: "50px",
    skip: priority, // Skip intersection observer for priority images
  });

  // Simple gradient placeholder (no need to generate canvas every time)
  const blurDataUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='rgba(147,51,234,0.1)'/%3E%3Cstop offset='50%25' stop-color='rgba(147,51,234,0.05)'/%3E%3Cstop offset='100%25' stop-color='rgba(147,51,234,0.1)'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='40' height='40' fill='url(%23g)'/%3E%3C/svg%3E";

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
      {/* Blur placeholder */}
      {blurDataUrl && !isLoaded && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}