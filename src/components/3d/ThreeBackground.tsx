import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import vvituLogo from '@/assets/vvitu-logo.png';

interface ThreeBackgroundProps {
  isDark: boolean;
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    
    // Clear existing content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4f46e5, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create 5 rotating rings
    const ringGroup = new THREE.Group();
    
    const ringConfigs = [
      { radius: 6, tube: 0.1, color: 0x4f46e5, speed: 0.01, axis: [1, 0, 0] },
      { radius: 8, tube: 0.08, color: 0x7c3aed, speed: 0.008, axis: [0, 1, 0] },
      { radius: 10, tube: 0.12, color: 0xa855f7, speed: 0.006, axis: [0, 0, 1] },
      { radius: 12, tube: 0.06, color: 0xd946ef, speed: 0.012, axis: [1, 1, 0] },
      { radius: 14, tube: 0.04, color: 0xf472b6, speed: 0.004, axis: [1, 0, 1] }
    ];

    const rings = ringConfigs.map(config => {
      const geometry = new THREE.TorusGeometry(config.radius, config.tube, 16, 100);
      const material = new THREE.MeshPhongMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.userData = { speed: config.speed, axis: config.axis };
      ringGroup.add(ring);
      return ring;
    });

    scene.add(ringGroup);

    // Add VVITU logo at center
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(vvituLogo, (texture) => {
      const logoMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const logoSprite = new THREE.Sprite(logoMaterial);
      logoSprite.scale.set(6, 6, 1);
      logoSprite.position.set(0, 0, 0);
      scene.add(logoSprite);
    });

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x4f46e5, size: 0.5 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate rings
      rings.forEach(ring => {
        const { speed, axis } = ring.userData;
        ring.rotation.x += speed * axis[0];
        ring.rotation.y += speed * axis[1];
        ring.rotation.z += speed * axis[2];
      });

      // Rotate particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <>
      {/* 3D Background Canvas Container */}
      <div 
        ref={canvasRef}
        id="canvas-container" 
        className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-3d"
      />
      
      {/* Floating Circles Decoration */}
      <div className="floating-circles fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        <div className="circle absolute rounded-full opacity-40 animate-float-1 w-32 h-32 top-20 left-20" />
        <div className="circle absolute rounded-full opacity-35 animate-float-2 w-24 h-24 top-40 right-32" />
        <div className="circle absolute rounded-full opacity-45 animate-float-3 w-20 h-20 bottom-32 left-40" />
        <div className="circle absolute rounded-full opacity-30 animate-float-4 w-28 h-28 bottom-20 right-20" />
        <div className="circle absolute rounded-full opacity-25 animate-float-5 w-36 h-36 top-60 left-60" />
        <div className="circle absolute rounded-full opacity-20 animate-float-6 w-16 h-16 bottom-60 left-20" />
        <div className="circle absolute rounded-full opacity-15 animate-float-7 w-12 h-12 top-80 right-80" />
      </div>
    </>
  );
};