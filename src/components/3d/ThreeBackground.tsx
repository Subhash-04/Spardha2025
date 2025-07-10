import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

// Enhanced 3D Platform with Holographic Elements
function HolographicPlatform({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  const colors = useMemo(() => ({
    light: {
      primary: '#8b5cf6',   // Purple
      secondary: '#06b6d4', // Cyan
      accent: '#d946ef',    // Magenta
      glow: '#c084fc'       // Light Purple
    },
    dark: {
      primary: '#00f6ff',   // Cyan
      secondary: '#41deff',  // Light Cyan
      accent: '#ffd700',    // Gold
      glow: '#00bfff'       // Deep Sky Blue
    }
  }), []);

  const currentColors = isDark ? colors.dark : colors.light;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Glowing Platform */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, -3, 0]}>
          <cylinderGeometry args={[12, 12, 0.8, 64]} />
          <meshPhongMaterial 
            color={currentColors.primary} 
            transparent 
            opacity={0.4}
            emissive={currentColors.primary}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Holographic Rings */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 3) * (15 + i * 2),
              Math.sin(i * 0.3) * 4 + 2,
              Math.sin(i * Math.PI / 3) * (15 + i * 2)
            ]}
            rotation={[Math.PI / 2 + i * 0.1, i * 0.2, i]}
          >
            <ringGeometry args={[3 + i * 0.5, 4 + i * 0.5, 32]} />
            <meshPhongMaterial 
              color={i % 2 === 0 ? currentColors.secondary : currentColors.accent} 
              transparent 
              opacity={0.5}
              emissive={i % 2 === 0 ? currentColors.secondary : currentColors.accent}
              emissiveIntensity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}

      {/* Floating Data Panels */}
      {[...Array(8)].map((_, i) => (
        <Float key={`panel-${i}`} speed={0.4 + i * 0.05} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 4) * 20,
              Math.sin(i * 0.5) * 6 + 5,
              Math.sin(i * Math.PI / 4) * 20
            ]}
            rotation={[0, -i * Math.PI / 4, 0]}
          >
            <planeGeometry args={[4, 2.5]} />
            <meshPhongMaterial 
              color={currentColors.glow} 
              transparent 
              opacity={0.3}
              emissive={currentColors.glow}
              emissiveIntensity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Enhanced Particle System with Dynamic Colors
function EnhancedParticles({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const particlesCount = 800;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = Math.random() * 60 - 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={isDark ? '#00f6ff' : '#8b5cf6'}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Cyberpunk HUD Elements (Dark Theme)
function CyberpunkHUD() {
  return (
    <group>
      {/* Main HUD Ring */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[25, 27, 64]} />
          <meshPhongMaterial 
            color="#00f6ff" 
            transparent 
            opacity={0.4}
            emissive="#00f6ff"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      {/* Floating HUD Panels */}
      {[...Array(6)].map((_, i) => (
        <Float key={`hud-${i}`} speed={0.3 + i * 0.1} rotationIntensity={0.05} floatIntensity={0.15}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 3) * 18,
              8 + Math.sin(i) * 3,
              Math.sin(i * Math.PI / 3) * 18
            ]}
            rotation={[0, -i * Math.PI / 3, 0]}
          >
            <planeGeometry args={[3.5, 2]} />
            <meshPhongMaterial 
              color="#41deff" 
              transparent 
              opacity={0.25}
              emissive="#41deff"
              emissiveIntensity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}

      {/* Energy Cores */}
      {[...Array(4)].map((_, i) => (
        <Float key={`core-${i}`} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <Sphere 
            position={[
              Math.cos(i * Math.PI / 2) * 30,
              4 + Math.sin(i * 2) * 2,
              Math.sin(i * Math.PI / 2) * 30
            ]}
            args={[0.8, 16, 16]}
          >
            <meshPhongMaterial 
              color="#ffd700" 
              transparent 
              opacity={0.6}
              emissive="#ffd700"
              emissiveIntensity={0.3}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// Holographic Elements (Light Theme)
function HolographicElements() {
  return (
    <group>
      {/* Holographic Dome */}
      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[0, 10, 0]}>
          <sphereGeometry args={[20, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhongMaterial 
            color="#d946ef" 
            transparent 
            opacity={0.2}
            emissive="#d946ef"
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Floating Crystals */}
      {[...Array(8)].map((_, i) => (
        <Float key={`crystal-${i}`} speed={0.6 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 4) * 16,
              Math.sin(i * 0.8) * 6 + 8,
              Math.sin(i * Math.PI / 4) * 16
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <octahedronGeometry args={[1.2]} />
            <meshPhongMaterial 
              color={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'} 
              transparent 
              opacity={0.7}
              emissive={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Holographic Grid Lines */}
      {[...Array(5)].map((_, i) => (
        <Float key={`grid-${i}`} speed={0.2} rotationIntensity={0.05} floatIntensity={0.1}>
          <mesh 
            position={[0, i * 3 - 6, -25]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[50, 0.1]} />
            <meshPhongMaterial 
              color="#c084fc" 
              transparent 
              opacity={0.4}
              emissive="#c084fc"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 8, 35], fov: 65 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Dynamic Lighting System */}
        <ambientLight intensity={isDark ? 0.2 : 0.4} />
        
        {/* Main Directional Light */}
        <directionalLight 
          position={[20, 20, 10]} 
          intensity={isDark ? 0.6 : 1}
          color={isDark ? '#00f6ff' : '#8b5cf6'}
          castShadow
        />
        
        {/* Accent Lights */}
        <pointLight 
          position={[-15, 10, -10]} 
          intensity={isDark ? 0.4 : 0.6}
          color={isDark ? '#41deff' : '#d946ef'}
          distance={50}
        />
        
        <pointLight 
          position={[15, -5, 15]} 
          intensity={isDark ? 0.3 : 0.4}
          color={isDark ? '#ffd700' : '#06b6d4'}
          distance={40}
        />

        {/* Core 3D Elements */}
        <HolographicPlatform isDark={isDark} />
        <EnhancedParticles isDark={isDark} />
        
        {/* Theme-specific Elements */}
        {isDark ? <CyberpunkHUD /> : <HolographicElements />}

        {/* Interactive Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          dampingFactor={0.05}
          enableDamping
        />
        
        {/* Fog for Depth */}
        <fog attach="fog" args={[isDark ? '#0a0f1e' : '#f1f5f9', 30, 100]} />
      </Canvas>
    </div>
  );
};