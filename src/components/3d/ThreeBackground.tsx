import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

// Enhanced Particle System with Glassmorphism Effect
function EnhancedParticles({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const particlesCount = 1500;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = Math.random() * 60 - 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = time * 0.015;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Animate individual particles
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.005;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={isDark ? 0.15 : 0.12}
        color={isDark ? '#00d4ff' : '#7c3aed'}
        transparent
        opacity={isDark ? 0.8 : 0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Glowing Crystal Circles
function GlowingCircles({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const colors = useMemo(() => 
    isDark 
      ? { primary: '#00f6ff', secondary: '#41deff', accent: '#ffffff' }
      : { primary: '#8b5cf6', secondary: '#d946ef', accent: '#06b6d4' }
  , [isDark]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.z = time * 0.3;
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.8) * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[-25, 0, -20]}>
      {/* Main glowing circle */}
      <mesh>
        <torusGeometry args={[15, 0.3, 16, 100]} />
        <meshBasicMaterial 
          color={colors.primary}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner glow rings */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} scale={[1 + i * 0.1, 1 + i * 0.1, 1]}>
          <torusGeometry args={[15, 0.1, 16, 100]} />
          <meshBasicMaterial 
            color={colors.secondary}
            transparent
            opacity={0.3 - i * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={`particle-${i}`}
          position={[
            Math.cos(i * Math.PI / 4) * 18,
            Math.sin(i * Math.PI / 4) * 18,
            0
          ]}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial 
            color={colors.accent}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tech Lines Network - Fixed for React Three Fiber
function TechLines({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData = [];
    const nodeCount = 15; // Reduced for better performance
    
    for (let i = 0; i < nodeCount; i++) {
      const connections = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < connections; j++) {
        const start = new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 80
        );
        
        const end = new THREE.Vector3(
          start.x + (Math.random() - 0.5) * 25,
          start.y + (Math.random() - 0.5) * 15,
          start.z + (Math.random() - 0.5) * 25
        );
        
        lineData.push({ 
          points: [start, end], 
          opacity: Math.random() * 0.4 + 0.2 
        });
      }
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i}>
          <tubeGeometry args={[
            new THREE.CatmullRomCurve3(line.points),
            64,
            0.02,
            8,
            false
          ]} />
          <meshBasicMaterial
            color={isDark ? '#00d4ff' : '#8b5cf6'}
            transparent
            opacity={line.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

// Crystalline Grid Floor
function CrystalGrid({ isDark }: { isDark: boolean }) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, -25, 0]}>
      <gridHelper 
        args={[120, 20, isDark ? '#003366' : '#6366f1', isDark ? '#001a33' : '#4338ca']}
      />
    </group>
  );
}

// Floating Geometric Shapes with Glassmorphism
function FloatingGeometry({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 80,
        Math.random() * 40 - 20,
        (Math.random() - 0.5) * 80
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 2 + 0.5,
      type: i % 4,
      speed: Math.random() * 0.02 + 0.01
    }));
  }, []);

  const colors = useMemo(() => 
    isDark 
      ? ['#00f6ff', '#41deff', '#ffd700', '#ffffff']
      : ['#8b5cf6', '#d946ef', '#06b6d4', '#f59e0b']
  , [isDark]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const shape = shapes[i];
        child.rotation.x += shape.speed;
        child.rotation.y += shape.speed * 0.7;
        child.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime + i) * 2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh 
          key={i}
          position={shape.position}
          rotation={shape.rotation}
          scale={[shape.scale, shape.scale, shape.scale]}
        >
          {shape.type === 0 && <boxGeometry args={[2, 2, 2]} />}
          {shape.type === 1 && <sphereGeometry args={[1, 16, 16]} />}
          {shape.type === 2 && <octahedronGeometry args={[1.5]} />}
          {shape.type === 3 && <tetrahedronGeometry args={[1.8]} />}
          
          <meshPhongMaterial 
            color={colors[shape.type]}
            transparent 
            opacity={isDark ? 0.7 : 0.5}
            emissive={colors[shape.type]}
            emissiveIntensity={isDark ? 0.2 : 0.1}
            shininess={100}
          />
        </mesh>
      ))}
    </group>
  );
}


export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 15, 45], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        {/* Enhanced Lighting System */}
        <ambientLight intensity={isDark ? 0.4 : 0.6} color={isDark ? '#001122' : '#f8fafc'} />
        
        <directionalLight 
          position={[20, 20, 10]} 
          intensity={isDark ? 1.2 : 1.5}
          color={isDark ? '#00f6ff' : '#8b5cf6'}
          castShadow
        />
        
        <pointLight 
          position={[-15, 15, -10]} 
          intensity={isDark ? 0.8 : 1.0}
          color={isDark ? '#41deff' : '#d946ef'}
          distance={100}
        />
        
        <pointLight 
          position={[15, -10, 15]} 
          intensity={isDark ? 0.6 : 0.8}
          color={isDark ? '#ffd700' : '#06b6d4'}
          distance={80}
        />
        
        <spotLight
          position={[0, 30, 0]}
          angle={0.3}
          penumbra={1}
          intensity={isDark ? 0.5 : 0.7}
          color={isDark ? '#ffffff' : '#f1f5f9'}
          castShadow
        />

        {/* Advanced 3D Elements */}
        <EnhancedParticles isDark={isDark} />
        <GlowingCircles isDark={isDark} />
        <TechLines isDark={isDark} />
        <CrystalGrid isDark={isDark} />
        <FloatingGeometry isDark={isDark} />

        {/* Fog for Depth */}
        <fog 
          attach="fog" 
          args={[
            isDark ? '#0a0a1a' : '#f8fafc', 
            30, 
            120
          ]} 
        />

        {/* Enhanced Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isDark ? 0.5 : 0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 8}
          enableDamping
          dampingFactor={0.05}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};