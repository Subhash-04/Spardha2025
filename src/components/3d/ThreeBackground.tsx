import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDark: boolean;
}

// Enhanced Particle System
function EnhancedParticles({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const particlesCount = 1000;
  
  const positions = useMemo(() => {
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }
    return posArray;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x += 0.00005;
      meshRef.current.rotation.y += 0.0001;
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
        size={0.08}
        color={isDark ? '#4682B4' : '#8b5cf6'}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Glowing Circle with Particles
function GlowingCircle({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + (Math.random() - 0.5) * 3;
      posArray[i * 3] = Math.cos(angle) * radius;
      posArray[i * 3 + 1] = Math.sin(angle) * radius;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return posArray;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.z += 0.0008;
      groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.03;
      
      // Animate opacity
      const mainCircle = groupRef.current.children[0] as THREE.Mesh;
      if (mainCircle?.material) {
        (mainCircle.material as THREE.MeshBasicMaterial).opacity = 0.7 + Math.sin(time * 1.5) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={[-20, 0, -15]} rotation={[0.1, 0, 0]}>
      {/* Main neon circle */}
      <mesh>
        <torusGeometry args={[12, 0.2, 16, 100]} />
        <meshBasicMaterial 
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner glow rings */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} scale={[1 + i * 0.1, 1 + i * 0.1, 1]}>
          <torusGeometry args={[12, 0.08, 16, 100]} />
          <meshBasicMaterial 
            color={isDark ? '#00AAFF' : '#d946ef'}
            transparent
            opacity={0.3 - i * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.7}
        />
      </points>
    </group>
  );
}

// Tech Lines Network - Fixed to use proper geometry
function TechLines({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData = [];
    const count = 25;
    
    for (let i = 0; i < count; i++) {
      const points = [];
      
      // Random starting point
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 70
      );
      points.push(startPoint);
      
      // Add connected points
      const segments = Math.floor(Math.random() * 2) + 2;
      let currentPoint = startPoint.clone();
      
      for (let j = 0; j < segments; j++) {
        const randomOffset = new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        currentPoint = currentPoint.clone().add(randomOffset);
        points.push(currentPoint);
      }
      
      const colors = [0x0066AA, 0x0088CC, 0x00AAFF];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Create proper line geometry using TubeGeometry
      const curve = new THREE.CatmullRomCurve3(points);
      
      lineData.push({
        curve,
        color: randomColor,
        opacity: 0.25 + Math.random() * 0.25
      });
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((lineData, i) => (
        <mesh key={i}>
          <tubeGeometry args={[lineData.curve, 64, 0.02, 8, false]} />
          <meshBasicMaterial
            color={isDark ? lineData.color : '#8b5cf6'}
            transparent
            opacity={lineData.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

// Digital Grid Floor
function DigitalGrid({ isDark }: { isDark: boolean }) {
  return (
    <group position={[0, -15, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <gridHelper 
        args={[80, 16, isDark ? '#0066AA' : '#6366f1', isDark ? '#003366' : '#4338ca']}
        material-transparent={true}
        material-opacity={0.1}
      />
    </group>
  );
}

// Secondary Circle
function SecondaryCircle({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.z += 0.0015;
      if (groupRef.current.children[1]) {
        groupRef.current.children[1].rotation.z += 0.002;
      }
    }
  });

  return (
    <group ref={groupRef} position={[20, 0, -15]} rotation={[Math.PI / 6, 0, 0]}>
      <mesh>
        <torusGeometry args={[10, 0.15, 16, 100]} />
        <meshBasicMaterial
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Partial arc */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[10, 0.2, 16, 100, Math.PI * 0.75]} />
        <meshBasicMaterial
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// ACM Logo Component with better error handling
function ACMLogo({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
  const [textureError, setTextureError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Try to load the logo, with fallback handling
    loader.load(
      'acm-logo.jpeg', // Updated path
      (texture) => {
        setLogoTexture(texture);
        setTextureError(false);
      }, 
      undefined, 
      (error) => {
        console.log('Logo texture could not be loaded, using fallback');
        setTextureError(true);
      }
    );
  }, []);

  const accentDots = useMemo(() => {
    const dots = [];
    const numDots = 6;
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * Math.PI * 2;
      const radius = 9;
      dots.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.5
        ] as [number, number, number],
        angle,
        index: i
      });
    }
    return dots;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.0005;
      
      // Gentle floating animation
      groupRef.current.position.y = 5 + Math.sin(time * 0.4) * 0.8;
      
      // Slow rotation for 3D effect
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;
      
      // Animate frame
      if (groupRef.current.children.length > 3) {
        groupRef.current.children[3].rotation.z = time * 0.15;
      }
      
      // Animate outer ring
      if (groupRef.current.children.length > 4) {
        groupRef.current.children[4].rotation.z = -time * 0.1;
      }
      
      // Animate accent dots
      accentDots.forEach((dot, i) => {
        const dotMesh = groupRef.current?.children[5 + i] as THREE.Mesh;
        if (dotMesh) {
          const scale = 1 + 0.2 * Math.sin(time * 1.5 + i);
          dotMesh.scale.setScalar(scale);
          
          const baseRadius = 9;
          const radiusOffset = Math.sin(time * 1.2 + i * 0.6) * 0.3;
          dotMesh.position.x = Math.cos(dot.angle) * (baseRadius + radiusOffset);
          dotMesh.position.y = Math.sin(dot.angle) * (baseRadius + radiusOffset);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[10, 5, 10]}>
      {/* Logo plane */}
      {logoTexture && (
        <mesh>
          <circleGeometry args={[6, 64]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Shadow */}
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[6.5, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Glow */}
      <mesh position={[0, 0, -0.3]}>
        <circleGeometry args={[7, 64]} />
        <meshBasicMaterial
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Decorative frame */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7, 0.15, 16, 64]} />
        <meshBasicMaterial
          color={isDark ? '#00AAFF' : '#8b5cf6'}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.08, 16, 64]} />
        <meshBasicMaterial
          color={isDark ? '#41B6E6' : '#d946ef'}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Accent dots */}
      {accentDots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshPhongMaterial
            color={isDark ? '#0072CE' : '#8b5cf6'}
            transparent
            opacity={0.9}
            emissive={isDark ? '#0072CE' : '#7c3aed'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Background Spheres
function BackgroundSpheres({ isDark }: { isDark: boolean }) {
  const spheresData = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 20
      ] as [number, number, number],
      radius: Math.random() * 2 + 0.5,
      hasGlow: Math.random() > 0.5,
      index: i
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.0005;
      
      groupRef.current.children.forEach((child, i) => {
        const sphereData = spheresData[i];
        child.position.y = sphereData.position[1] + Math.sin(time * (0.4 + i * 0.08)) * 0.01;
        child.rotation.y += 0.003;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {spheresData.map((sphere, i) => (
        <mesh key={i} position={sphere.position}>
          <sphereGeometry args={[sphere.radius, 12, 12]} />
          <meshStandardMaterial
            color={isDark ? '#0A0A1A' : '#f8fafc'}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
          {sphere.hasGlow && (
            <mesh>
              <sphereGeometry args={[sphere.radius * 1.2, 12, 12]} />
              <meshBasicMaterial
                color={isDark ? '#0066AA' : '#8b5cf6'}
                transparent
                opacity={0.15}
                side={THREE.BackSide}
              />
            </mesh>
          )}
        </mesh>
      ))}
    </group>
  );
}

// Mouse Interaction
function MouseInteraction({ isDark }: { isDark: boolean }) {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState(true);

  useEffect(() => {
    // Disable mouse tracking on mobile
    if (window.innerWidth < 768) {
      setMouseMoveEnabled(false);
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseMoveEnabled) {
        setMouse({
          x: event.clientX - window.innerWidth / 2,
          y: event.clientY - window.innerHeight / 2
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mouseMoveEnabled]);

  useFrame(() => {
    if (mouseMoveEnabled && mouse.x !== 0 && mouse.y !== 0) {
      // Subtle camera movements
      camera.position.x += (mouse.x * 0.005 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.005 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export const ThreeBackground = ({ isDark }: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        {/* Lighting System */}
        <ambientLight intensity={1} color={isDark ? '#111122' : '#f8fafc'} />
        <directionalLight 
          position={[5, 10, 7]} 
          intensity={1}
          color={isDark ? '#4682B4' : '#8b5cf6'}
        />
        <pointLight 
          position={[0, 0, 20]} 
          intensity={1}
          color={isDark ? '#00AAFF' : '#d946ef'}
          distance={100}
        />

        {/* 3D Elements */}
        <EnhancedParticles isDark={isDark} />
        <GlowingCircle isDark={isDark} />
        <ACMLogo isDark={isDark} />
        <TechLines isDark={isDark} />
        <DigitalGrid isDark={isDark} />
        <SecondaryCircle isDark={isDark} />
        <BackgroundSpheres isDark={isDark} />
        <MouseInteraction isDark={isDark} />

        {/* Fog for Depth */}
        <fog 
          attach="fog" 
          args={[
            isDark ? '#0A0A1A' : '#f8fafc', 
            30, 
            120
          ]} 
        />
      </Canvas>
    </div>
  );
};