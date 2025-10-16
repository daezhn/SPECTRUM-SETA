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
  const [blurDataUrl, setBlurDataUrl] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "50px",
    skip: priority, // Skip intersection observer for priority images
  });

  // Generate a simple blur placeholder (you could also generate this server-side)
  useEffect(() => {
    // Create a simple gradient blur placeholder
    const canvas = document.createElement("canvas");
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Create gradient based on image theme
      const gradient = ctx.createLinearGradient(0, 0, 40, 40);
      gradient.addColorStop(0, "rgba(147, 51, 234, 0.1)");
      gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.05)");
      gradient.addColorStop(1, "rgba(147, 51, 234, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 40, 40);
      setBlurDataUrl(canvas.toDataURL());
    }
  }, []);

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