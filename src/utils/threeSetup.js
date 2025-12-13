import * as THREE from 'three';

/**
 * Three.js Setup Utility
 * 
 * Optimized setup for portfolio background animation.
 * Uses raw Three.js for maximum performance control.
 */

/**
 * Creates and configures a Three.js scene with optimized settings
 * @param {HTMLCanvasElement} canvas - Canvas element to render to
 * @returns {Object} { scene, camera, renderer }
 */
export function createThreeScene(canvas) {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Deep black background

  // Camera setup - Perspective camera for 3D effect
  // FOV: 60 degrees (standard), aspect ratio will be updated on resize
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 15); // Position camera to view the core

  // Renderer setup with performance optimizations
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true, // Transparent background
    antialias: true, // Smooth edges
    powerPreference: 'high-performance', // Use dedicated GPU if available
    stencil: false, // Disable stencil buffer (not needed)
    depth: true, // Enable depth buffer for proper 3D rendering
  });

  // Set pixel ratio for crisp rendering on high-DPI displays
  // Cap at 2 to prevent performance issues on very high DPI screens
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Enable shadow maps (if needed in future)
  renderer.shadowMap.enabled = false; // Disabled for performance

  // Tone mapping for better color representation
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Output encoding (for Three.js versions < r152)
  // In newer versions, use outputColorSpace instead
  if (renderer.outputEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  } else if (renderer.outputColorSpace !== undefined) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  return { scene, camera, renderer };
}

/**
 * Detects if the device is mobile or tablet
 * @returns {boolean}
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
}

/**
 * Creates a throttled animation frame function
 * Useful for reducing FPS on mobile devices
 * @param {Function} callback - Function to call on each frame
 * @param {number} targetFPS - Target frames per second (default: 60)
 * @returns {Function} Throttled function
 */
export function createThrottledAnimation(callback, targetFPS = 60) {
  let lastTime = 0;
  const interval = 1000 / targetFPS;

  return function throttledAnimation(currentTime) {
    const elapsed = currentTime - lastTime;

    if (elapsed >= interval) {
      lastTime = currentTime - (elapsed % interval);
      callback(currentTime);
    }

    requestAnimationFrame(throttledAnimation);
  };
}

/**
 * Handles window resize events
 * Updates camera aspect ratio and renderer size
 * @param {THREE.PerspectiveCamera} camera - Camera to update
 * @param {THREE.WebGLRenderer} renderer - Renderer to update
 */
export function handleResize(camera, renderer) {
  const updateSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
  };

  window.addEventListener('resize', updateSize, { passive: true });
  updateSize(); // Initial call

  return () => window.removeEventListener('resize', updateSize);
}
