import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Three.js Animation
    const initThreeAnimation = () => {
      // Check if canvas container exists
      const container = canvasRef.current;
      if (!container) return;

      // Clear any existing canvas
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Scene setup
      const scene = new THREE.Scene();
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      
      // Lights setup
      const ambientLight = new THREE.AmbientLight(0x404040, 2);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(isDark ? 0x4594e1 : 0x8b5cf6, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      const pointLight1 = new THREE.PointLight(isDark ? 0x4594e1 : 0x8b5cf6, 2, 50);
      pointLight1.position.set(10, 10, 10);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(isDark ? 0x60a5fa : 0xd946ef, 2, 50);
      pointLight2.position.set(-10, -10, -10);
      scene.add(pointLight2);

      // Create rotating rings system
      const rotatingRings = createRotatingRings();
      scene.add(rotatingRings);
      
      // Create particle system
      const particles = createParticleSystem();
      scene.add(particles);
      
      // Create centered logo
      createCenteredLogo().then(logo => {
        scene.add(logo);
      });
      
      // Mouse movement tracking for interactive effects
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Animation loop
      let animationId: number;
      
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        // Update time for animations
        const time = performance.now() * 0.001; // time in seconds
        
        // Smooth mouse movement
        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;
        
        // Animate rotating rings
        if (rotatingRings) {
          rotatingRings.children.forEach((ring, index) => {
            if (ring.userData && ring.userData.rotationSpeed) {
              const { rotationSpeed, rotationAxis } = ring.userData;
              
              // Apply rotation based on axis
              if (rotationAxis === 'x') {
                ring.rotation.x += rotationSpeed;
              } else if (rotationAxis === 'y') {
                ring.rotation.y += rotationSpeed;
              } else if (rotationAxis === 'z') {
                ring.rotation.z += rotationSpeed;
              } else if (rotationAxis === 'xy') {
                ring.rotation.x += rotationSpeed * 0.7;
                ring.rotation.y += rotationSpeed * 0.8;
              } else if (rotationAxis === 'xz') {
                ring.rotation.x += rotationSpeed * 0.6;
                ring.rotation.z += rotationSpeed * 0.9;
              }
              
              // Pulse animation
              if (ring.userData.pulseSpeed) {
                const { pulseSpeed, pulseAmount, phase } = ring.userData;
                const pulseFactor = 1 + Math.sin(time * pulseSpeed + phase) * pulseAmount;
                ring.scale.set(pulseFactor, pulseFactor, pulseFactor);
              }
            }
          });
          
          // Subtle movement based on mouse position
          rotatingRings.position.x += (targetX - rotatingRings.position.x) * 0.02;
          rotatingRings.position.y += (targetY - rotatingRings.position.y) * 0.02;
        }
        
        // Animate particles
        if (particles) {
          particles.rotation.x += 0.0005;
          particles.rotation.y += 0.001;
          
          // Update particle sizes for twinkling effect
          const sizes = particles.geometry.attributes.size.array as Float32Array;
          for (let i = 0; i < sizes.length; i++) {
            // Create a subtle pulsing effect
            const pulseFactor = Math.sin(time + i * 0.1) * 0.3 + 0.7;
            const originalSize = Math.random() * 0.7 + 0.2;
            sizes[i] = originalSize * pulseFactor;
          }
          particles.geometry.attributes.size.needsUpdate = true;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();

      // Create rotating rings system
      function createRotatingRings() {
        const group = new THREE.Group();
        
        // Define ring configurations
        const ringConfigs = [
          {
            radius: 8,
            tubeRadius: 0.15,
            color: isDark ? 0x4f46e5 : 0x8b5cf6,
            opacity: 0.9,
            rotationSpeed: 0.008,
            rotationAxis: 'x',
            pulseSpeed: 0.6,
            pulseAmount: 0.05,
            initialRotation: { x: 0, y: 0, z: 0 }
          },
          {
            radius: 10,
            tubeRadius: 0.12,
            color: isDark ? 0xa855f7 : 0xd946ef,
            opacity: 0.8,
            rotationSpeed: 0.006,
            rotationAxis: 'y',
            pulseSpeed: 0.8,
            pulseAmount: 0.08,
            initialRotation: { x: Math.PI / 4, y: 0, z: 0 }
          },
          {
            radius: 12,
            tubeRadius: 0.18,
            color: isDark ? 0xec4899 : 0xec4899,
            opacity: 0.7,
            rotationSpeed: 0.004,
            rotationAxis: 'z',
            pulseSpeed: 0.5,
            pulseAmount: 0.06,
            initialRotation: { x: 0, y: Math.PI / 3, z: 0 }
          },
          {
            radius: 14,
            tubeRadius: 0.1,
            color: isDark ? 0x818cf8 : 0x6366f1,
            opacity: 0.6,
            rotationSpeed: 0.005,
            rotationAxis: 'xy',
            pulseSpeed: 0.7,
            pulseAmount: 0.04,
            initialRotation: { x: Math.PI / 6, y: Math.PI / 2, z: 0 }
          },
          {
            radius: 16,
            tubeRadius: 0.08,
            color: isDark ? 0x60a5fa : 0x3b82f6,
            opacity: 0.5,
            rotationSpeed: 0.003,
            rotationAxis: 'xz',
            pulseSpeed: 0.4,
            pulseAmount: 0.03,
            initialRotation: { x: Math.PI / 2, y: 0, z: Math.PI / 4 }
          }
        ];
        
        // Create rings
        ringConfigs.forEach((config, index) => {
          const geometry = new THREE.TorusGeometry(config.radius, config.tubeRadius, 16, 100);
          const material = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: config.opacity
          });
          
          const ring = new THREE.Mesh(geometry, material);
          
          // Set initial rotation
          ring.rotation.x = config.initialRotation.x;
          ring.rotation.y = config.initialRotation.y;
          ring.rotation.z = config.initialRotation.z;
          
          // Add animation data
          ring.userData = {
            rotationSpeed: config.rotationSpeed,
            rotationAxis: config.rotationAxis,
            pulseSpeed: config.pulseSpeed,
            pulseAmount: config.pulseAmount,
            phase: index * Math.PI * 0.5
          };
          
          group.add(ring);
        });
        
        // Add glow effects
        const innerGlowGeometry = new THREE.TorusGeometry(10, 0.4, 16, 100);
        const innerGlowMaterial = createGlowMaterial(isDark ? 0x4f46e5 : 0x8b5cf6, 0.5, 2);
        const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
        innerGlow.scale.multiplyScalar(0.9);
        group.add(innerGlow);
        
        const outerGlowGeometry = new THREE.TorusGeometry(12, 0.3, 16, 100);
        const outerGlowMaterial = createGlowMaterial(isDark ? 0xec4899 : 0xec4899, 0.3, 3);
        const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        outerGlow.scale.multiplyScalar(1.15);
        group.add(outerGlow);
        
        return group;
      }

      // Create a glow material using shaders
      function createGlowMaterial(color: number, intensity: number, power: number) {
        const glowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            'c': { value: intensity },
            'p': { value: power },
            glowColor: { value: new THREE.Color(color) },
            viewVector: { value: new THREE.Vector3(0, 0, 1) }
          },
          vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
              vec3 vNormal = normalize(normalMatrix * normal);
              vec3 vNormel = normalize(normalMatrix * viewVector);
              intensity = pow(c - dot(vNormal, vNormel), p);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
              vec3 glow = glowColor * intensity;
              gl_FragColor = vec4(glow, 1.0);
            }
          `,
          side: THREE.FrontSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        
        return glowMaterial;
      }

      // Create a particle system for background effect
      function createParticleSystem() {
        const particleCount = 2000;
        const particles = new THREE.BufferGeometry();
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const color = new THREE.Color();
        
        for (let i = 0; i < particleCount; i++) {
          // Position - create a more spherical distribution
          const radius = 50 + Math.random() * 50;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
          
          // Updated color palette to match our design
          const colorChoice = Math.random();
          if (colorChoice < 0.3) {
            color.setHex(isDark ? 0x4f46e5 : 0x8b5cf6);
          } else if (colorChoice < 0.5) {
            color.setHex(isDark ? 0x818cf8 : 0x6366f1);
          } else if (colorChoice < 0.7) {
            color.setHex(isDark ? 0xa855f7 : 0xd946ef);
          } else if (colorChoice < 0.9) {
            color.setHex(isDark ? 0xec4899 : 0xec4899);
          } else {
            color.setHex(0xffffff);
          }
          
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
          
          // Size - vary for depth effect with some larger particles
          if (colorChoice > 0.9) {
            // Make white particles (stars) twinkle
            sizes[i] = Math.random() * 0.8 + 0.3;
          } else {
            sizes[i] = Math.random() * 0.7 + 0.2;
          }
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create a custom shader material for better particle rendering
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.7,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        
        return particleSystem;
      }

      // Create centered logo that always faces camera
      async function createCenteredLogo() {
        return new Promise<THREE.Group>((resolve) => {
          const textureLoader = new THREE.TextureLoader();
          
          // Try to load user's logo first, fallback to ACM logo
          const logoPath = '/images/logo.png'; // User can upload their logo as logo.png
          
          textureLoader.load(logoPath, (texture) => {
            const material = new THREE.SpriteMaterial({ 
              map: texture,
              transparent: true,
              opacity: 0.8
            });
            
            const group = new THREE.Group();
            const logo = new THREE.Sprite(material);
            
            // Position at center of rings
            logo.position.set(0, 0, 0);
            
            // Scale appropriately
            logo.scale.set(6, 6, 1);
            
            // Add subtle pulsing animation
            logo.userData = {
              pulseSpeed: 0.3,
              pulseAmount: 0.05,
              phase: 0
            };
            
            group.add(logo);
            
            // Animate logo pulsing
            const animateLogo = () => {
              const time = performance.now() * 0.001;
              const pulseFactor = 1 + Math.sin(time * logo.userData.pulseSpeed) * logo.userData.pulseAmount;
              logo.scale.set(6 * pulseFactor, 6 * pulseFactor, 1);
              requestAnimationFrame(animateLogo);
            };
            animateLogo();
            
            resolve(group);
          }, undefined, () => {
            // Try fallback to ACM logo
            textureLoader.load('/images/vvitacm_logo.svg', (texture) => {
              const material = new THREE.SpriteMaterial({ 
                map: texture,
                transparent: true,
                opacity: 0.7
              });
              
              const group = new THREE.Group();
              const logo = new THREE.Sprite(material);
              logo.position.set(0, 0, 0);
              logo.scale.set(5, 5, 1);
              
              logo.userData = {
                pulseSpeed: 0.3,
                pulseAmount: 0.05,
                phase: 0
              };
              
              group.add(logo);
              
              const animateLogo = () => {
                const time = performance.now() * 0.001;
                const pulseFactor = 1 + Math.sin(time * logo.userData.pulseSpeed) * logo.userData.pulseAmount;
                logo.scale.set(5 * pulseFactor, 5 * pulseFactor, 1);
                requestAnimationFrame(animateLogo);
              };
              animateLogo();
              
              resolve(group);
            }, undefined, () => {
              console.log('Logo texture not found, creating placeholder');
              resolve(new THREE.Group());
            });
          });
        });
      }

      // Cleanup function
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        scene.clear();
      };
    };

    const cleanup = initThreeAnimation();
    
    return cleanup;
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