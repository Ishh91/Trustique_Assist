// components/HexagonBackground.jsx
import { motion } from 'framer-motion';

export const HexagonBackground = () => {
  const hexagons = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute opacity-10"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: `${hex.size}px`,
            height: `${hex.size}px`,
            background: 'conic-gradient(from 90deg at 40% 50%, #0056D2, #00FF88, #0056D2)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: hex.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: hex.delay
          }}
        />
      ))}
    </div>
  );
};