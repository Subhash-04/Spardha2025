import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import promoVideo from '@/assets/Create_a_sleek_second_K_v.mp4';

export const PromoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <section id="promo" className="py-12 sm:py-24 relative px-4">
      <div className="container mx-auto">
        {/* Section Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-holographic font-audiowide mb-4" 
              style={{fontFamily: 'Audiowide, cursive'}}>
            Experience Spardha 2025
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Witness the energy and innovation of VVIT's premier techno-cultural festival
          </p>
        </motion.div>

        {/* Direct Video Player - No Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto relative"
        >
          {/* Video Player Container - Direct without card wrapper */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              muted
              playsInline
              onEnded={handleVideoEnd}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            >
              <source src={promoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Minimalist Play Button - Only shows when paused */}
            {!isPlaying && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 30px rgba(255, 255, 255, 0.3)',
                      '0 0 50px rgba(255, 255, 255, 0.5)',
                      '0 0 30px rgba(255, 255, 255, 0.3)'
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg 
                    className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Subtle Corner Indicators */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>

            {/* Elegant Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 px-4"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6 text-base sm:text-lg">
              Join thousands of students in this extraordinary celebration of technology and culture
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#register');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="ultra-liquid-glass px-8 py-4 rounded-2xl text-primary font-bold text-lg hover:scale-105 transition-all duration-300 border border-primary/30 hover:border-primary/50 w-full sm:w-auto"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Register for Spardha 2025
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#events');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="crystal-glass px-8 py-4 rounded-2xl text-foreground font-semibold hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Explore Events
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};