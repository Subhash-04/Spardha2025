import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useState, useRef } from 'react';
import promoVideo from '@/assets/Create_a_sleek_second_K_v.mp4';

export const PromoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
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
            Watch Our Promo Video
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience the energy and excitement of Spardha 2025
          </p>
        </motion.div>

        {/* Video Container - Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="dashboard-glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden">
            {/* Video Player - Responsive */}
            <div 
              ref={containerRef}
              className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-primary/20 group"
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnd}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
              >
                <source src={promoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls Overlay - Responsive */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-3 sm:space-x-6">
                  {/* Play/Pause Button - Responsive */}
                  <motion.button
                    onClick={togglePlay}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                    )}
                  </motion.button>

                  {/* Secondary Controls - Responsive */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <motion.button
                      onClick={toggleMute}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Video Info Overlay - Responsive positioning */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                <div className="liquid-glass rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 font-audiowide" 
                      style={{fontFamily: 'Audiowide, cursive'}}>
                    Spardha 2025 - Official Promo
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Experience the biggest techno-cultural fest of VVIT
                  </p>
                </div>
              </div>

              {/* Play Button Overlay - Responsive */}
              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    onClick={togglePlay}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 20px rgba(79, 70, 229, 0.5)',
                        '0 0 40px rgba(79, 70, 229, 0.8)',
                        '0 0 20px rgba(79, 70, 229, 0.5)'
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-2" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12 px-4"
        >
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            Ready to be part of the excitement?
          </p>
          <motion.button
            onClick={() => {
              const element = document.querySelector('#register');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="dashboard-glass px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl text-primary font-semibold hover:scale-105 transition-all duration-300 border-primary/30 hover:border-primary/50 text-sm sm:text-base"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Register Now for Spardha 2025
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};