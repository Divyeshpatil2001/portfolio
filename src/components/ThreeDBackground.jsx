import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createThreeScene, isMobileDevice, createThrottledAnimation, handleResize } from '../utils/threeSetup';
import './ThreeDBackground.css';

// Emerald green color palette
const EMERALD_GREEN = 0x00ff9c;

/**
 * ThreeDBackground Component
 * 
 * A clean, subtle 3D ambient particle system background.
 * Removed the wireframe core and orbiting particles to prevent text overlap
 * and keep readability optimal for a professional software engineer portfolio.
 */
export default function ThreeDBackground() {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = isMobileDevice();
    const targetFPS = isMobile ? 30 : 60; // Reduce FPS on mobile for better performance

    // Create Three.js scene
    const canvas = document.createElement('canvas');
    containerRef.current.appendChild(canvas);

    const { scene, camera, renderer } = createThreeScene(canvas);
    sceneRef.current = scene;

    // ============================================
    // SOFT AMBIENT FLOATING PARTICLES
    // ============================================
    // Particle system for soft background star field effect
    const particleCount = isMobile ? 400 : 800; // Fewer particles on mobile
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Distribute particles in a large space around the camera
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random distribution in a large box
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5; // offset behind camera
      
      // Vary particle sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: EMERALD_GREEN,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35, // Subtle background opacity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // ============================================
    // LIGHTING
    // ============================================
    const ambientLight = new THREE.AmbientLight(EMERALD_GREEN, 0.15);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(EMERALD_GREEN, 0.3, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    const animate = (currentTime) => {
      timeRef.current = currentTime * 0.001; // Convert to seconds
      const time = timeRef.current;

      // Rotate soft particles slowly (very subtle background motion)
      if (particlesRef.current) {
        particlesRef.current.rotation.x = time * 0.015;
        particlesRef.current.rotation.y = time * 0.02;
      }

      // Render
      renderer.render(scene, camera);
    };

    // Start animation loop
    if (isMobile && targetFPS < 60) {
      const throttledAnimate = createThrottledAnimation(animate, targetFPS);
      animationFrameId.current = requestAnimationFrame(throttledAnimate);
    } else {
      const loop = () => {
        animate(performance.now());
        animationFrameId.current = requestAnimationFrame(loop);
      };
      animationFrameId.current = requestAnimationFrame(loop);
    }

    // Handle window resize
    const cleanupResize = handleResize(camera, renderer);

    // Cleanup function - critical for preventing memory leaks
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      cleanupResize();
      
      // Dispose of geometries and materials to free memory
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      // Remove canvas
      if (containerRef.current && canvas.parentNode) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-d-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
