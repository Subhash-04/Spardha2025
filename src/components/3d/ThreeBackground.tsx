import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

// Simple Floating Platform
function FloatingPlatform({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  const colors = useMemo(() => ({
    light: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#d946ef'
    },
    dark: {
      primary: '#00f6ff',
      secondary: '#41deff',
      accent: '#ffd700'
    }
  }), []);

  const currentColors = isDark ? colors.dark : colors.light;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[8, 8, 0.5, 32]} />
        <meshPhongMaterial 
          color={currentColors.primary} 
          transparent 
          opacity={0.4}
          emissive={currentColors.primary}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Floating Rings */}
      {[...Array(4)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * Math.PI / 2) * 12,
            Math.sin(i * 0.5) * 3 + 2,
            Math.sin(i * Math.PI / 2) * 12
          ]}
          rotation={[Math.PI / 2, 0, i * Math.PI / 4]}
        >
          <ringGeometry args={[2 + i * 0.3, 2.5 + i * 0.3, 24]} />
          <meshPhongMaterial 
            color={currentColors.secondary} 
            transparent 
            opacity={0.5}
            emissive={currentColors.secondary}
            emissiveIntensity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Geometric Shapes */}
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={`shape-${i}`}
          position={[
            (Math.random() - 0.5) * 30,
            Math.random() * 10 - 5,
            (Math.random() - 0.5) * 30
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          {i % 3 === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : i % 3 === 1 ? (
            <sphereGeometry args={[0.5, 16, 16]} />
          ) : (
            <octahedronGeometry args={[0.7]} />
          )}
          <meshPhongMaterial 
            color={i % 2 === 0 ? currentColors.primary : currentColors.accent}
            transparent 
            opacity={0.6}
            emissive={i % 2 === 0 ? currentColors.primary : currentColors.accent}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Simple Particle System
function SimpleParticles({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const particlesCount = 400;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 40 - 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 8, 30], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight 
          position={[15, 15, 8]} 
          intensity={isDark ? 0.7 : 1}
          color={isDark ? '#00f6ff' : '#8b5cf6'}
        />
        <pointLight 
          position={[-10, 10, -8]} 
          intensity={isDark ? 0.5 : 0.7}
          color={isDark ? '#41deff' : '#d946ef'}
        />
        <pointLight 
          position={[10, -8, 10]} 
          intensity={isDark ? 0.4 : 0.5}
          color={isDark ? '#ffd700' : '#06b6d4'}
        />

        {/* 3D Elements */}
        <FloatingPlatform isDark={isDark} />
        <SimpleParticles isDark={isDark} />

        {/* Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};