import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Ring, Box } from '@react-three/drei';
import * as THREE from 'three';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
}

interface ThreeBackgroundProps {
  isDark: boolean;
}

// Floating Geometric Shapes
function FloatingShapes({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  const colors = useMemo(() => ({
    light: {
      primary: '#8b5cf6',
      secondary: '#6d28d9',
      background: '#e4e4f0'
    },
    dark: {
      primary: '#00f6ff',
      secondary: '#29abe2',
      background: '#0a0f1e'
    }
  }), []);

  const currentColors = isDark ? colors.dark : colors.light;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Platform */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[8, 8, 0.5, 64]} />
          <meshPhongMaterial 
            color={currentColors.primary} 
            transparent 
            opacity={0.3}
            emissive={currentColors.primary}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Rings */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.3}>
          <Ring 
            position={[
              Math.cos(i * 2) * (10 + i * 2),
              Math.sin(i * 3) * 3,
              Math.sin(i * 2) * (10 + i * 2)
            ]}
            args={[2 + i * 0.5, 2.5 + i * 0.5, 32]}
            rotation={[Math.PI / 2, 0, i]}
          >
            <meshPhongMaterial 
              color={currentColors.secondary} 
              transparent 
              opacity={0.4}
              emissive={currentColors.secondary}
              emissiveIntensity={0.05}
            />
          </Ring>
        </Float>
      ))}

      {/* Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <Float key={`shape-${i}`} speed={0.5 + i * 0.1} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 40
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {i % 3 === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : i % 3 === 1 ? (
              <sphereGeometry args={[0.5, 16, 16]} />
            ) : (
              <octahedronGeometry args={[0.8]} />
            )}
            <meshPhongMaterial 
              color={i % 2 === 0 ? currentColors.primary : currentColors.secondary}
              transparent 
              opacity={0.6}
              emissive={i % 2 === 0 ? currentColors.primary : currentColors.secondary}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Particle System
function ParticleSystem({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const particlesCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50 - 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        size={0.1}
        color={isDark ? '#00f6ff' : '#8b5cf6'}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// HUD Elements (Dark Theme)
function HUDElements() {
  return (
    <group>
      {/* Floating UI Panels */}
      {[...Array(4)].map((_, i) => (
        <Float key={`hud-${i}`} speed={0.3 + i * 0.1} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 2) * 15,
              5 + Math.sin(i) * 2,
              Math.sin(i * Math.PI / 2) * 15
            ]}
            rotation={[0, -i * Math.PI / 2, 0]}
          >
            <planeGeometry args={[3, 2]} />
            <meshPhongMaterial 
              color="#00ccff" 
              transparent 
              opacity={0.2}
              emissive="#00ccff"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Holographic Elements (Light Theme)
function HolographicElements() {
  return (
    <group>
      {/* Glowing Orbs */}
      {[...Array(6)].map((_, i) => (
        <Float key={`holo-${i}`} speed={0.4 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
          <Sphere 
            position={[
              Math.cos(i * Math.PI / 3) * 12,
              Math.sin(i * 0.5) * 4,
              Math.sin(i * Math.PI / 3) * 12
            ]}
            args={[0.3, 16, 16]}
          >
            <meshPhongMaterial 
              color="#a855f7" 
              transparent 
              opacity={0.4}
              emissive="#a855f7"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 30], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={isDark ? 0.5 : 0.8}
          color={isDark ? '#00f6ff' : '#8b5cf6'}
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={isDark ? 0.3 : 0.4}
          color={isDark ? '#29abe2' : '#6d28d9'}
        />

        {/* 3D Content */}
        <FloatingShapes isDark={isDark} />
        <ParticleSystem isDark={isDark} />
        
        {/* Theme-specific elements */}
        {isDark ? <HUDElements /> : <HolographicElements />}

        {/* Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};