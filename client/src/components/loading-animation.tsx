import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/Logo Saeta_HZL_Negativo_1760397693781.png";

interface LoadingAnimationProps {
  isLoading: boolean;
}

export function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Logo with pulse animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
              className="relative z-10"
            >
              <motion.img
                src={logoImage}
                alt="SAETA"
                className="w-48 md:w-64 h-auto"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Animated circles */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="w-48 md:w-64 h-48 md:h-64 rounded-full border-2 border-primary/20"
                    style={{
                      boxShadow: `0 0 ${20 + i * 10}px rgba(147, 51, 234, 0.1)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
            >
              <motion.div className="flex gap-1 justify-center">
                {["C", "a", "r", "g", "a", "n", "d", "o"].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-sm font-medium text-muted-foreground"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  className="text-sm font-medium text-muted-foreground ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ...
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}