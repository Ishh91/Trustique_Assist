import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Lightweight 3D orbit using CSS perspective and transform-only animation
// - GPU-friendly (no canvas/WebGL)
// - Honors prefers-reduced-motion
// - Few elements, minimal paint cost
export function Orbit3D({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();

  const containerStyle: React.CSSProperties = {
    perspective: '800px',
  };

  const commonLayer: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  // Static rendering when reduced motion is preferred
  if (reduce) {
    return (
      <div className={`relative ${className}`} style={containerStyle}>
        <div style={commonLayer}>
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              border: '2px solid rgba(0,86,210,0.15)',
              boxShadow: '0 0 40px rgba(0,86,210,0.08) inset',
              transform: 'translateZ(40px)'
            }}
          />
          <div
            className="absolute inset-[18%] rounded-xl"
            style={{
              border: '2px dashed rgba(0,255,136,0.12)',
              transform: 'rotateY(15deg) translateZ(-30px)'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      {/* Orbiting group */}
      <motion.div
        style={commonLayer}
        animate={{ rotateY: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {/* Front ring */}
        <div
          className="absolute inset-[12%] rounded-full"
          style={{
            border: '2px solid rgba(0,86,210,0.18)',
            boxShadow: '0 0 50px rgba(0,86,210,0.10) inset',
            transform: 'translateZ(50px)'
          }}
        />

        {/* Back ring */}
        <div
          className="absolute inset-[18%] rounded-full"
          style={{
            border: '2px solid rgba(0,255,136,0.14)',
            boxShadow: '0 0 40px rgba(0,255,136,0.08) inset',
            transform: 'rotateX(8deg) translateZ(-40px)'
          }}
        />

        {/* Small orbiting dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: 'rgba(0,86,210,0.8)',
            transformOrigin: '0 -40px',
          }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}

// Simple tilt card that subtly rotates in 3D, optional hover effect
export function TiltCard({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const base = (
    <div className={`relative ${className}`} style={{ perspective: '800px' }}>
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(0,86,210,0.08), rgba(0,255,136,0.08))',
        border: '1px solid rgba(0,0,0,0.06)'
      }} />
      <div className="relative rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );

  if (reduce) return base;

  return (
    <motion.div
      className={className}
      style={{ perspective: '800px' }}
      whileHover={{ rotateX: -4, rotateY: 6 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
    >
      <div className="absolute inset-0 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(0,86,210,0.08), rgba(0,255,136,0.08))',
        border: '1px solid rgba(0,0,0,0.06)'
      }} />
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        animate={{ rotateX: [-2, 2, -2], rotateY: [-3, 3, -3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Orbit3D;