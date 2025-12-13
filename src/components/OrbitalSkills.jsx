import { useEffect, useState, useRef, useCallback } from 'react';
import { skills } from '../mock';
import './OrbitalSkills.css';

const SkillsOrbit = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const animationRef = useRef();
  const velocityRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map skills to the format needed with layers
  const skillsData = skills.map((skill, index) => ({
    name: skill.name,
    icon: skill.icon || '💻',
    color: skill.color || '#00FFD1',
    layer: skill.layer || ((index % 3) + 1),
  }));

  // Improved animation loop with better timing
  useEffect(() => {
    let lastTime = 0;
    
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (autoRotateRef.current && !isDragging) {
        // Smoother auto-rotation with time-based animation
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + (deltaTime * 0.02) // Time-based rotation for consistent speed
        }));
      } else if (!isDragging && Math.abs(velocityRef.current.y) > 0.01) {
        // Apply momentum with time-based decay
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + velocityRef.current.y
        }));
        velocityRef.current.y *= 0.98; // Smoother decay
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  // Improved mouse handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    autoRotateRef.current = false;
    setLastMouse({ x: e.clientX, y: e.clientY });
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const sensitivity = 0.8; // Reduced for smoother control
    
    velocityRef.current = {
      x: 0,
      y: deltaX * sensitivity
    };
    
    setRotation(prev => ({
      x: prev.x,
      y: prev.y + deltaX * sensitivity
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMouse]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      if (Math.abs(velocityRef.current.y) < 0.1) {
        autoRotateRef.current = true;
      }
    }, 1000);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    autoRotateRef.current = false;
    
    const sensitivity = 0.2;
    setRotation(prev => ({
      x: prev.x,
      y: prev.y + e.deltaY * sensitivity
    }));
    
    setTimeout(() => {
      autoRotateRef.current = true;
    }, 1000);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      autoRotateRef.current = false;
      setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      velocityRef.current = { x: 0, y: 0 };
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault();
    const deltaX = e.touches[0].clientX - lastMouse.x;
    const sensitivity = 0.8;
    
    velocityRef.current = {
      x: 0,
      y: deltaX * sensitivity
    };
    
    setRotation(prev => ({
      x: prev.x,
      y: prev.y + deltaX * sensitivity
    }));
    
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, [isDragging, lastMouse]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      if (Math.abs(velocityRef.current.y) < 0.1) {
        autoRotateRef.current = true;
      }
    }, 1000);
  }, []);

  if (!mounted) return null;

  const layer1Skills = skillsData.filter(skill => skill.layer === 1);
  const layer2Skills = skillsData.filter(skill => skill.layer === 2);
  const layer3Skills = skillsData.filter(skill => skill.layer === 3);

  return (
    <div className="skills-orbit-wrapper">
      <div className="orbit-container">
        {/* Circular glow effect background */}
        <div className="orbit-glow-bg-1" />
        <div className="orbit-glow-bg-2" />
        
        {/* Interactive Container */}
        <div
          ref={containerRef}
          className={`orbit-interactive-container ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Center Core */}
          <div className="orbit-core">
            <div className="orbit-core-inner">
              <div className="orbit-core-dot" />
            </div>
          </div>

          {/* Layer 1 - Inner orbit */}
          <div
            className="orbit-layer orbit-layer-1"
            style={{
              transform: `translate(-50%, -50%) rotateZ(${rotation.y}deg)`,
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          >
            {layer1Skills.map((skill, index) => {
              const angle = (index * 360) / layer1Skills.length;
              const radius = 120;
              
              return (
                <div
                  key={skill.name}
                  className="skill-item-wrapper"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateX(${radius}px)
                      rotate(-${rotation.y}deg)
                    `,
                  }}
                >
                  <div 
                    className="skill-ball skill-ball-layer1"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                      borderColor: skill.color,
                      boxShadow: `0 0 20px ${skill.color}40`,
                    }}
                  >
                    <span 
                      className="skill-icon"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>
                  </div>
                  
                  {/* Skill name tooltip - show on hover */}
                  <div className="skill-name-tooltip-wrapper">
                    <div 
                      className="skill-name-tooltip"
                      style={{
                        borderColor: skill.color,
                      }}
                    >
                      {skill.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer 2 - Middle orbit (counter-clockwise) */}
          <div
            className="orbit-layer orbit-layer-2"
            style={{
              transform: `translate(-50%, -50%) rotateZ(${-rotation.y * 0.6}deg)`,
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          >
            {layer2Skills.map((skill, index) => {
              const angle = (index * 360) / layer2Skills.length;
              const radius = 180;
              
              return (
                <div
                  key={skill.name}
                  className="skill-item-wrapper"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateX(${radius}px)
                      rotate(${rotation.y * 0.6}deg)
                    `,
                  }}
                >
                  <div 
                    className="skill-ball skill-ball-layer2"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                      borderColor: skill.color,
                      boxShadow: `0 0 25px ${skill.color}40`,
                    }}
                  >
                    <span 
                      className="skill-icon"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>
                  </div>
                  
                  <div className="skill-name-tooltip-wrapper">
                    <div 
                      className="skill-name-tooltip"
                      style={{
                        borderColor: skill.color,
                      }}
                    >
                      {skill.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer 3 - Outer orbit */}
          <div
            className="orbit-layer orbit-layer-3"
            style={{
              transform: `translate(-50%, -50%) rotateZ(${rotation.y * 0.3}deg)`,
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          >
            {layer3Skills.map((skill, index) => {
              const angle = (index * 360) / layer3Skills.length;
              const radius = 240;
              
              return (
                <div
                  key={skill.name}
                  className="skill-item-wrapper"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateX(${radius}px)
                      rotate(-${rotation.y * 0.3}deg)
                    `,
                  }}
                >
                  <div 
                    className="skill-ball skill-ball-layer3"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
                      borderColor: skill.color,
                      boxShadow: `0 0 30px ${skill.color}40`,
                    }}
                  >
                    <span 
                      className="skill-icon"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>
                  </div>
                  
                  <div className="skill-name-tooltip-wrapper">
                    <div 
                      className="skill-name-tooltip"
                      style={{
                        borderColor: skill.color,
                      }}
                    >
                      {skill.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Orbital rings (visual guides) */}
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
          <div className="orbit-ring orbit-ring-4" />
        </div>
        
        {/* Instructions */}
        <div className="orbit-instructions">
          <p>Drag to rotate • Scroll to spin • Hover for details</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsOrbit;
