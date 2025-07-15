import { useRef, useEffect } from 'react';
import promoVideo from '@/assets/Create_a_sleek_second_K_v.mp4';

interface ThreeBackgroundProps {
  isDark: boolean;
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={promoVideo} type="video/mp4" />
      </video>
      
      {/* Single overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};