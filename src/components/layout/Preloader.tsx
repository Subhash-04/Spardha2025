import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center">
        {/* ACM VVITU Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">ACM</div>
                <div className="text-sm font-medium text-muted-foreground">VVITU</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gradient mb-2">SPARDHA 2025</h2>
          <p className="text-muted-foreground">Loading the future...</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-glow"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Progress Text */}
        <motion.div
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
};