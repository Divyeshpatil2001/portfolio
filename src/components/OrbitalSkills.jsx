import { useEffect, useState, useRef, useCallback } from 'react';
import { skills } from '../mock';
import './OrbitalSkills.css';

// Distribute N points on a sphere using Fibonacci / golden-angle method
// Returns array of { x, y, z } unit vectors
function fibonacciSphere(n) {
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n); // polar angle
    const phi = (2 * Math.PI * i) / goldenRatio;       // azimuthal
    points.push({
      x: Math.sin(theta) * Math.cos(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(theta),
    });
  }
  return points;
}

const SPHERE_RADIUS = 220; // px radius of the sphere

const SkillsOrbit = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  // Rotation angles (degrees)
  const rotationRef = useRef({ x: -20, y: 0 }); // slight initial X tilt
  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const animationRef = useRef();

  useEffect(() => { setMounted(true); }, []);

  // Compute base positions on sphere surface (Fibonacci distribution)
  const spherePositions = fibonacciSphere(skills.length);

  // ── Animation loop ──
  useEffect(() => {
    let lastTime = 0;

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      if (autoRotateRef.current && !isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x,
          y: rotationRef.current.y + dt * 0.018, // deg/ms → slow auto-spin
        };
        setRotation({ ...rotationRef.current });
      } else if (!isDragging) {
        // Momentum decay
        const vx = velocityRef.current.x;
        const vy = velocityRef.current.y;
        if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) {
          rotationRef.current = {
            x: rotationRef.current.x + vx,
            y: rotationRef.current.y + vy,
          };
          velocityRef.current.x *= 0.95;
          velocityRef.current.y *= 0.95;
          setRotation({ ...rotationRef.current });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging]);

  // ── Mouse handlers ──
  const startDrag = useCallback((clientX, clientY) => {
    setIsDragging(true);
    autoRotateRef.current = false;
    lastMouseRef.current = { x: clientX, y: clientY };
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  const moveDrag = useCallback((clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - lastMouseRef.current.x;
    const dy = clientY - lastMouseRef.current.y;
    const sens = 0.45;
    velocityRef.current = { x: -dy * sens, y: dx * sens };
    rotationRef.current = {
      x: rotationRef.current.x - dy * sens,
      y: rotationRef.current.y + dx * sens,
    };
    setRotation({ ...rotationRef.current });
    lastMouseRef.current = { x: clientX, y: clientY };
  }, [isDragging]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      if (Math.abs(velocityRef.current.x) < 0.1 && Math.abs(velocityRef.current.y) < 0.1) {
        autoRotateRef.current = true;
      }
    }, 1200);
  }, []);

  const handleMouseDown = useCallback((e) => startDrag(e.clientX, e.clientY), [startDrag]);
  const handleMouseMove = useCallback((e) => moveDrag(e.clientX, e.clientY), [moveDrag]);
  const handleMouseUp = useCallback(endDrag, [endDrag]);
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, [startDrag]);
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 1) { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }
  }, [moveDrag]);
  const handleTouchEnd = useCallback(endDrag, [endDrag]);

  if (!mounted) return null;

  // Convert rotation angles to radians for 3D math
  const rx = (rotation.x * Math.PI) / 180;
  const ry = (rotation.y * Math.PI) / 180;

  // Build display data: apply rotation matrix to each sphere point, compute 2D project
  const nodes = skills.map((skill, i) => {
    const { x: ux, y: uy, z: uz } = spherePositions[i];

    // Rotate around Y axis first, then X axis
    // Ry rotation
    const x1 = ux * Math.cos(ry) + uz * Math.sin(ry);
    const y1 = uy;
    const z1 = -ux * Math.sin(ry) + uz * Math.cos(ry);

    // Rx rotation
    const x2 = x1;
    const y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);

    // Project to 2D (simple perspective)
    const perspective = 900;
    const scale = perspective / (perspective - z2 * SPHERE_RADIUS);

    // Normalize z2 from [-1,1] to [0,1] for depth cues
    const depth = (z2 + 1) / 2; // 0 = back, 1 = front

    return {
      skill,
      px: x2 * SPHERE_RADIUS * scale,   // 2D x offset from center
      py: y2 * SPHERE_RADIUS * scale,   // 2D y offset from center
      scale: 0.6 + depth * 0.55,        // far=0.6, near=1.15
      opacity: 0.35 + depth * 0.65,     // far=0.35, near=1.0
      z: z2,                             // for z-index sorting
      zIndex: Math.round(depth * 100),
    };
  });

  // Sort back-to-front so front nodes render on top
  nodes.sort((a, b) => a.z - b.z);

  return (
    <div className="skills-orbit-wrapper">
      <div className="orbit-container">
        {/* Background glow */}
        <div className="orbit-glow-bg-1" />
        <div className="orbit-glow-bg-2" />

        {/* Interactive container */}
        <div
          ref={containerRef}
          className={`orbit-interactive-container orbit-3d ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Orbital rings (decorative ellipses that hint at the sphere shape) */}
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />

          {/* Center core */}
          <div className="orbit-core">
            <div className="orbit-core-inner">
              <div className="orbit-core-dot" />
            </div>
          </div>

          {/* Skill nodes */}
          {nodes.map(({ skill, px, py, scale: nodeScale, opacity, zIndex }) => (
            <div
              key={skill.name}
              className="skill-node-3d"
              style={{
                transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px)) scale(${nodeScale})`,
                opacity,
                zIndex,
              }}
            >
              <div
                className="skill-ball-3d"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${skill.color}55, ${skill.color}18)`,
                  borderColor: `${skill.color}99`,
                  boxShadow: `0 0 ${Math.round(nodeScale * 20)}px ${skill.color}55, inset 0 1px 1px rgba(255,255,255,0.25)`,
                }}
              >
                <span className="skill-icon-3d">{skill.icon}</span>
              </div>
              <div
                className="skill-label-3d"
                style={{ borderColor: `${skill.color}80`, color: skill.color }}
              >
                {skill.name}
              </div>
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <p className="orbit-hint">Drag to rotate · Scroll on page to spin</p>
      </div>
    </div>
  );
};

export default SkillsOrbit;
