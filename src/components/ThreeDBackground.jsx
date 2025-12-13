import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDBackground.css';

function Particles({ count = 1500 }) {
  const mesh = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00FFD1"
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="three-d-background">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        <Particles count={1500} />
      </Canvas>
    </div>
  );
}
