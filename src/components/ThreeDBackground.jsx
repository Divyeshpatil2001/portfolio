import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import { AdditiveBlending, DoubleSide } from 'three';
import * as THREE from 'three';
import './ThreeDBackground.css';

// Light-themed floating orbs with glow
function FloatingOrb({ position, color, size = 1, scrollY = 0 }) {
  const mesh = useRef();
  const material = useRef();

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      const scrollFactor = scrollY * 0.0005;
      
      // Floating animation
      mesh.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.5;
      mesh.current.position.x = position[0] + Math.cos(time * 0.3 + position[1]) * 0.3;
      mesh.current.position.z = position[2] + Math.sin(time * 0.4) * 0.4 + scrollFactor;
      
      // Rotation
      mesh.current.rotation.x = time * 0.2;
      mesh.current.rotation.y = time * 0.3;
      
      // Pulsing scale
      const scale = size + Math.sin(time * 2) * 0.1;
      mesh.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={mesh} args={[size, 32, 32]} position={position}>
      <MeshDistortMaterial
        ref={material}
        color={color}
        transparent
        opacity={0.4}
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </Sphere>
  );
}

// Wireframe geometric shapes
function WireframeShape({ position, rotation, scrollY = 0, mouse = [0, 0] }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      const scrollFactor = scrollY * 0.0003;
      
      // Mouse influence
      mesh.current.rotation.x = rotation[0] + time * 0.1 + mouse[1] * 0.1;
      mesh.current.rotation.y = rotation[1] + time * 0.15 + mouse[0] * 0.1;
      mesh.current.rotation.z = rotation[2] + time * 0.05 + scrollFactor;
      
      // Parallax
      mesh.current.position.x = position[0] + mouse[0] * 0.5;
      mesh.current.position.y = position[1] + mouse[1] * 0.5;
    }
  });

  return (
    <Torus ref={mesh} args={[1, 0.3, 16, 100]} position={position}>
      <meshStandardMaterial
        color="#FFFFFF"
        wireframe
        transparent
        opacity={0.4}
        emissive="#FFFFFF"
        emissiveIntensity={0.3}
      />
    </Torus>
  );
}

// Connected particle network
function ParticleNetwork({ count = 1500, scrollY = 0, mouse = [0, 0] }) {
  const mesh = useRef();
  const points = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (mesh.current && points.current) {
      const time = state.clock.elapsedTime;
      const scrollFactor = scrollY * 0.001;
      
      // Dynamic rotation with mouse influence
      mesh.current.rotation.x = time * 0.02 + scrollFactor * 0.3 + mouse[1] * 0.05;
      mesh.current.rotation.y = time * 0.03 + scrollFactor * 0.2 + mouse[0] * 0.05;
      mesh.current.rotation.z = time * 0.01 + scrollFactor * 0.1;
      
      // Parallax movement
      mesh.current.position.y = scrollY * 0.0002;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={points}
        transparent
        color="#FFFFFF"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={AdditiveBlending}
      />
    </Points>
  );
}

// Secondary light particles
function LightParticles({ count = 2000, scrollY = 0, mouse = [0, 0] }) {
  const mesh = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      const scrollFactor = scrollY * 0.0008;
      
      // Counter-rotation with mouse influence
      mesh.current.rotation.x = -time * 0.015 - scrollFactor * 0.2 - mouse[1] * 0.03;
      mesh.current.rotation.y = -time * 0.025 - scrollFactor * 0.15 - mouse[0] * 0.03;
      mesh.current.rotation.z = time * 0.008 + scrollFactor * 0.08;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E6E6FA"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={AdditiveBlending}
      />
    </Points>
  );
}

// Light rays/beams effect
function LightRays({ scrollY = 0, mouse = [0, 0] }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      const scrollFactor = scrollY * 0.0002;
      
      group.current.rotation.z = time * 0.05 + scrollFactor;
      group.current.position.x = mouse[0] * 0.1;
      group.current.position.y = mouse[1] * 0.1;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[0, 0, (Math.PI * 2 * i) / 8]}
          position={[0, 0, -5]}
        >
          <planeGeometry args={[0.5, 20]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.1}
            side={DoubleSide}
            emissive="#FFFFFF"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState([0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse([x, y]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Orb positions
  const orbPositions = useMemo(() => [
    [-8, 3, -5],
    [8, -2, -8],
    [-5, -5, -6],
    [6, 4, -7],
    [0, 6, -4],
  ], []);

  // Wireframe positions
  const wireframePositions = useMemo(() => [
    [[-10, 5, -8], [0, 0, 0]],
    [[10, -5, -10], [Math.PI / 4, Math.PI / 4, 0]],
    [[0, -8, -6], [Math.PI / 2, 0, Math.PI / 4]],
  ], []);

  return (
    <div className="three-d-background">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
        }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0,
          pointerEvents: 'none'
        }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Ambient and directional lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#B0E0E6" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} color="#FFFFFF" />

        {/* Light rays */}
        <LightRays scrollY={scrollY} mouse={mouse} />

        {/* Floating orbs */}
        {orbPositions.map((pos, i) => (
          <FloatingOrb
            key={i}
            position={pos}
            color={i % 2 === 0 ? "#B0E0E6" : "#E6E6FA"}
            size={1.5 + Math.random() * 0.5}
            scrollY={scrollY}
          />
        ))}

        {/* Wireframe shapes */}
        {wireframePositions.map(([pos, rot], i) => (
          <WireframeShape
            key={i}
            position={pos}
            rotation={rot}
            scrollY={scrollY}
            mouse={mouse}
          />
        ))}

        {/* Particle networks */}
        <ParticleNetwork count={1500} scrollY={scrollY} mouse={mouse} />
        <LightParticles count={2000} scrollY={scrollY} mouse={mouse} />
      </Canvas>
    </div>
  );
}
