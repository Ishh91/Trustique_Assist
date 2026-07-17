import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Database, Shield, Cloud, Cpu, Zap, Globe, Smartphone,
  Sparkles, Terminal, GitBranch, Cog
} from 'lucide-react';

// Holographic Grid Component
const HolographicGrid = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 opacity-[0.03] transform-gpu">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
          <g key={i}>
            <motion.line
              x1="0"
              y1={i * 5}
              x2="100"
              y2={i * 5}
              stroke="url(#gridGradient)"
              strokeWidth="0.3"
              animate={{
                opacity: [0.1, 0.4, 0.1],
                strokeDashoffset: [0, -5, 0]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            />
            <motion.line
              x1={i * 5}
              y1="0"
              x2={i * 5}
              y2="100"
              stroke="url(#gridGradient)"
              strokeWidth="0.3"
              animate={{
                opacity: [0.1, 0.4, 0.1],
                strokeDashoffset: [0, -5, 0]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2 + 1
              }}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0056D2" />
            <stop offset="50%" stopColor="#00FF88" />
            <stop offset="100%" stopColor="#0056D2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Server Rack Animation
const ServerRacks = ({ isMobile }) => {
  const racks = Array.from({ length: isMobile ? 2 : 4 }, (_, i) => ({
    id: i,
    x: 10 + i * 25,
    height: 30 + Math.random() * 40
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20">
      {racks.map((rack) => (
        <div key={rack.id} className="absolute bottom-0" style={{ left: `${rack.x}%` }}>
          <motion.div
            className="w-8 bg-gradient-to-t from-[#0056D2] to-[#00FF88] rounded-t-lg relative"
            style={{ height: `${rack.height}px` }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                '0 0 10px rgba(0, 86, 210, 0.3)',
                '0 0 20px rgba(0, 255, 136, 0.5)',
                '0 0 10px rgba(0, 86, 210, 0.3)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: rack.id * 0.5
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1 w-1 h-1 rounded-full bg-green-400"
                style={{ top: `${10 + i * 5}px` }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3 + rack.id * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// Code Editor Windows
const CodeEditors = ({ isMobile }) => {
  const editors = Array.from({ length: isMobile ? 2 : 3 }, (_, i) => ({
    id: i,
    x: 15 + i * 25,
    y: 20 + i * 15,
    lines: Array.from({ length: 8 }, (_, j) => ({
      id: j,
      width: 30 + Math.random() * 40
    }))
  }));

  return (
    <div className="absolute inset-0">
      {editors.map((editor) => (
        <motion.div
          key={editor.id}
          className="absolute w-24 h-20 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-green-500/30 p-2"
          style={{
            left: `${editor.x}%`,
            top: `${editor.y}%`
          }}
          animate={{
            y: [0, -5, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: editor.id
          }}
        >
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          {editor.lines.map((line, index) => (
            <motion.div
              key={line.id}
              className="h-1 bg-green-400/60 rounded mb-1"
              style={{ width: `${line.width}%` }}
              animate={{
                width: [`${line.width}%`, `${line.width + 20}%`, `${line.width}%`],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2 + editor.id
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Tech Circuit Lines Component
const TechCircuitLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={`circuit-${i}`}
            d={`M${10 + i * 5},${10} L${90 - i * 5},${20} L${80},${40 + i * 10} L${20},${60 + i * 5} L${10 + i * 5},${90}`}
            stroke="url(#circuitGradient)"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2 1"
            animate={{
              pathLength: [0, 1, 0],
              strokeDashoffset: [0, 10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={Math.random() * 80 + 10}
            cy={Math.random() * 80 + 10}
            r="0.5"
            fill="#0056D2"
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
              fill: ['#0056D2', '#00FF88', '#0056D2']
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0056D2" />
            <stop offset="50%" stopColor="#00FF88" />
            <stop offset="100%" stopColor="#0056D2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const LightweightBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();

    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const techIcons = [
    { icon: Code, name: 'Code' },
    { icon: Database, name: 'Database' },
    { icon: Shield, name: 'Shield' },
    { icon: Cloud, name: 'Cloud' },
    { icon: Cpu, name: 'Cpu' },
    { icon: Zap, name: 'Zap' },
    { icon: Globe, name: 'Globe' },
    { icon: Smartphone, name: 'Smartphone' },
    { icon: Sparkles, name: 'Sparkles' },
    { icon: Terminal, name: 'Terminal' },
    { icon: GitBranch, name: 'Git' },
    { icon: Cog, name: 'Cog' }
  ];

  const particles3D = Array.from({
    length: isMobile ? 8 : isTablet ? 12 : 18
  }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (isMobile ? 2 : 3) + 1,
    depth: Math.random() * 50,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 1
  }));

  const floatingTech = Array.from({ length: isMobile ? 6 : 10 }, (_, i) => {
    const tech = techIcons[i % techIcons.length];
    return {
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      icon: tech.icon,
      size: isMobile ? 14 : 20,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 3,
      rotation: Math.random() * 360
    };
  });

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 transform-gpu" />

      <HolographicGrid isMobile={undefined} />
      <TechCircuitLines />
      <ServerRacks isMobile={undefined} />
      <CodeEditors isMobile={undefined} />

      <motion.div
        className="absolute inset-0 opacity-15 transform-gpu"
        animate={!isMobile ? {
          background: [
            'radial-gradient(circle at 20% 30%, rgba(0, 86, 210, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 20%, rgba(0, 86, 210, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(0, 86, 210, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(0, 255, 136, 0.2) 0%, transparent 50%)',
          ],
        } : {
          background: [
            'radial-gradient(circle at 30% 40%, rgba(0, 86, 210, 0.2) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(0, 255, 136, 0.1) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: isMobile ? 10 : 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {particles3D.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full transform-gpu"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, #0056D2, #00FF88)`,
            opacity: 0.2
          }}
          animate={{
            x: isMobile ? [0, Math.random() * 15 - 7.5, 0] : [0, Math.random() * 30 - 15, 0],
            y: isMobile ? [0, Math.random() * 15 - 7.5, 0] : [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {floatingTech.map((tech) => {
        const Icon = tech.icon;
        return (
          <motion.div
            key={tech.id}
            className="absolute p-1.5 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 transform-gpu"
            style={{
              left: `${tech.x}%`,
              top: `${tech.y}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotateZ: [0, 180, 360],
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: tech.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tech.delay
            }}
          >
            <Icon size={tech.size} className="text-white/60" />
          </motion.div>
        );
      })}

      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0056D2] to-[#00FF88] blur-sm opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotateY: 360,
              boxShadow: [
                '0 0 30px #0056D2',
                '0 0 50px #00FF88',
                '0 0 30px #0056D2'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      <div className="absolute inset-0">
        {Array.from({ length: isMobile ? 6 : 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#0056D2] to-[#00FF88] rounded-full transform-gpu"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LightweightBackground;
