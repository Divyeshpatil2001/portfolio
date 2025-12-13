import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createThreeScene, isMobileDevice, createThrottledAnimation, handleResize } from '../utils/threeSetup';
import './ThreeDBackground.css';

// Emerald green color palette
const EMERALD_GREEN = 0x00ff9c;

/**
 * ThreeDBackground Component
 * 
 * A performant 3D background animation featuring:
 * - Central glowing energy core with wireframe layers
 * - Soft particle system for glow effect
 * - Orbiting particles representing skills/experience
 * - Optimized for performance with mobile detection
 * 
 * Performance Optimizations:
 * - Uses raw Three.js (not react-three/fiber) for direct control
 * - Low polygon counts (16 segments for spheres)
 * - Reduced particle counts on mobile
 * - FPS throttling on mobile devices (30fps vs 60fps)
 * - Proper cleanup of geometries and materials
 * - requestAnimationFrame for smooth animation
 * - No heavy shaders - uses built-in materials
 */
export default function ThreeDBackground() {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const sceneRef = useRef(null);
  const coreGroupRef = useRef(null);
  const particlesRef = useRef(null);
  const orbitingParticlesRef = useRef(null);
  const wireframeLayersRef = useRef([]);
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

    // Create energy core group
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // ============================================
    // ENERGY CORE - Wireframe Layers
    // ============================================
    // Multiple wireframe spheres create depth and visual interest
    // Using low segment counts (16) for performance instead of default 32
    const wireframeLayers = [];
    const layerCount = 3;
    const baseRadius = 2;

    for (let i = 0; i < layerCount; i++) {
      const radius = baseRadius + i * 0.8;
      const segments = 16; // Low segment count for performance
      const geometry = new THREE.SphereGeometry(radius, segments, segments);
      
      const material = new THREE.MeshBasicMaterial({
        color: EMERALD_GREEN,
        wireframe: true,
        transparent: true,
        opacity: 0.15 - i * 0.03, // Outer layers more transparent
        emissive: EMERALD_GREEN,
        emissiveIntensity: 0.3,
      });

      const wireframe = new THREE.Mesh(geometry, material);
      wireframeLayers.push(wireframe);
      coreGroup.add(wireframe);
    }
    wireframeLayersRef.current = wireframeLayers;

    // ============================================
    // ENERGY CORE - Soft Particle Glow
    // ============================================
    // Particle system for soft glow effect around the core
    // Using Points for efficient rendering (GPU-accelerated)
    const particleCount = isMobile ? 500 : 1000; // Fewer particles on mobile
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Distribute particles in a sphere around the core
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution with slight randomness
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Vary particle sizes for depth
      sizes[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Using PointsMaterial (built-in) instead of custom shaders for performance
    const particleMaterial = new THREE.PointsMaterial({
      color: EMERALD_GREEN,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
      depthWrite: false, // Performance optimization - don't write to depth buffer
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    coreGroup.add(particles);

    // ============================================
    // ORBITING PARTICLES
    // ============================================
    // Particles that orbit around the core representing skills/experience
    // Very low motion intensity for professional appearance
    const orbitParticleCount = isMobile ? 30 : 60;
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPositions = new Float32Array(orbitParticleCount * 3);
    const orbitSpeeds = new Float32Array(orbitParticleCount);
    const orbitRadii = new Float32Array(orbitParticleCount);
    const orbitAngles = new Float32Array(orbitParticleCount);

    // Initialize orbiting particles at various distances and angles
    for (let i = 0; i < orbitParticleCount; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 3; // Orbit radius between 4-7
      const angle = Math.random() * Math.PI * 2;
      const inclination = (Math.random() - 0.5) * Math.PI * 0.5; // Slight tilt
      
      orbitRadii[i] = radius;
      orbitAngles[i] = angle;
      orbitSpeeds[i] = 0.2 + Math.random() * 0.3; // Varying speeds for organic feel
      
      // Initial positions
      orbitPositions[i3] = radius * Math.cos(angle) * Math.cos(inclination);
      orbitPositions[i3 + 1] = radius * Math.sin(inclination);
      orbitPositions[i3 + 2] = radius * Math.sin(angle) * Math.cos(inclination);
    }

    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));

    const orbitMaterial = new THREE.PointsMaterial({
      color: EMERALD_GREEN,
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orbitingParticles = new THREE.Points(orbitGeometry, orbitMaterial);
    orbitingParticlesRef.current = {
      points: orbitingParticles,
      speeds: orbitSpeeds,
      radii: orbitRadii,
      angles: orbitAngles,
      positions: orbitPositions,
      count: orbitParticleCount,
    };
    scene.add(orbitingParticles);

    // ============================================
    // LIGHTING
    // ============================================
    // Minimal lighting setup for performance
    // The emissive materials provide most of the glow
    const ambientLight = new THREE.AmbientLight(EMERALD_GREEN, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(EMERALD_GREEN, 0.5, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    // Using requestAnimationFrame with optional throttling for mobile
    const animate = (currentTime) => {
      timeRef.current = currentTime * 0.001; // Convert to seconds

      const time = timeRef.current;

      // Rotate core group slowly (low motion intensity)
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.x = time * 0.1; // Slow rotation
        coreGroupRef.current.rotation.y = time * 0.15;
      }

      // Pulse effect (breathing) on wireframe layers
      // Very gentle pulse - only 5% scale variation
      if (wireframeLayersRef.current.length > 0) {
        wireframeLayersRef.current.forEach((layer, index) => {
          // Stagger the pulse slightly for each layer
          const layerPulse = 1 + Math.sin(time * 0.8 + index * 0.3) * 0.05;
          layer.scale.setScalar(layerPulse);
        });
      }

      // Rotate soft particles around core
      if (particlesRef.current) {
        particlesRef.current.rotation.x = time * 0.05;
        particlesRef.current.rotation.y = time * 0.08;
      }

      // Update orbiting particles
      if (orbitingParticlesRef.current) {
        const { points, speeds, radii, angles, positions, count } = orbitingParticlesRef.current;
        const positionAttribute = points.geometry.attributes.position;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          angles[i] += speeds[i] * 0.01; // Slow orbital motion
          
          const radius = radii[i];
          const angle = angles[i];
          const inclination = (i % 10) * 0.1 - 0.5; // Vary inclination
          
          // Update positions in orbit
          positions[i3] = radius * Math.cos(angle) * Math.cos(inclination);
          positions[i3 + 1] = radius * Math.sin(inclination);
          positions[i3 + 2] = radius * Math.sin(angle) * Math.cos(inclination);
        }

        positionAttribute.needsUpdate = true;
      }

      // Render
      renderer.render(scene, camera);
    };

    // Start animation loop
    if (isMobile && targetFPS < 60) {
      // Use throttled animation for mobile (30fps)
      const throttledAnimate = createThrottledAnimation(animate, targetFPS);
      animationFrameId.current = requestAnimationFrame(throttledAnimate);
    } else {
      // Standard 60fps animation for desktop
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
