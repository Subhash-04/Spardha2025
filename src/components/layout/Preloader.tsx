import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import vvitacmLogo from '@/assets/vvitacm_logo.png';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <div 
              className={`w-4 h-4 ${i % 3 === 0 ? 'bg-primary/20' : i % 3 === 1 ? 'bg-accent/20' : 'bg-primary-glow/20'} 
                         ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm rotate-45'}`}
            />
          </motion.div>
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced 3D VVIT ACM Logo */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", bounce: 0.4 }}
        >
          <div className="relative w-40 h-40 mx-auto perspective-1000">
            {/* Outer Rotating Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle Rotating Ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-accent/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Glow Ring */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo Container with 3D Effects */}
            <motion.div
              className="absolute inset-6 rounded-full bg-background/10 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl"
              animate={{ 
                rotateY: [0, 10, -10, 0],
                rotateX: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                boxShadow: `
                  0 0 30px rgba(79, 70, 229, 0.3),
                  inset 0 2px 10px rgba(255, 255, 255, 0.1),
                  inset 0 -2px 10px rgba(0, 0, 0, 0.1)
                `
              }}
            >
              <motion.img 
                src={vvitacmLogo} 
                alt="VVIT ACM Chapter" 
                className="w-24 h-24 object-contain rounded-full filter drop-shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    'drop-shadow(0 0 10px rgba(79, 70, 229, 0.5))',
                    'drop-shadow(0 0 20px rgba(79, 70, 229, 0.8))',
                    'drop-shadow(0 0 10px rgba(79, 70, 229, 0.5))'
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
                transform={`translate(-50%, -50%) translate(${60 + i * 10}px, 0)`}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Loading Text with 3D Effect */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gradient mb-2 font-audiowide"
            animate={{
              textShadow: [
                '0 0 10px rgba(79, 70, 229, 0.5)',
                '0 0 20px rgba(79, 70, 229, 0.8)',
                '0 0 10px rgba(79, 70, 229, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{fontFamily: 'Audiowide, cursive'}}
          >
            SPARDHA 2025
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing the future...
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Bar with 3D Effects */}
        <motion.div
          className="w-80 h-3 bg-muted/30 rounded-full overflow-hidden mx-auto relative backdrop-blur-sm"
          initial={{ width: 0 }}
          animate={{ width: 320 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            boxShadow: `
              inset 0 2px 4px rgba(0, 0, 0, 0.2),
              0 1px 2px rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary-glow relative overflow-hidden"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          {/* Progress Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 blur-sm"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Enhanced Progress Text */}
        <motion.div
          className="mt-6 text-lg text-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span
            animate={{ 
              color: [
                'hsl(var(--muted-foreground))',
                'hsl(var(--primary))',
                'hsl(var(--muted-foreground))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {progress}%
          </motion.span>
        </motion.div>

        {/* Loading Dots Animation */}
        <motion.div
          className="flex justify-center space-x-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
    </motion.div>
  );
};