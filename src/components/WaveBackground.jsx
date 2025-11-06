// components/WaveBackground.jsx
import { motion } from 'framer-motion';

export const WaveBackground = () => {
  const Wave = ({ delay = 0, height = 200, opacity = 0.1 }) => (
    <motion.div
      className="absolute bottom-0 left-0 right-0"
      style={{ height: `${height}px`, opacity }}
      animate={{
        background: [
          'linear-gradient(90deg, transparent, #0056D2, #00FF88, transparent)',
          'linear-gradient(90deg, transparent, #00FF88, #0056D2, transparent)',
          'linear-gradient(90deg, transparent, #0056D2, #00FF88, transparent)',
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Wave height={150} opacity={0.15} delay={0} />
      <Wave height={120} opacity={0.1} delay={2} />
      <Wave height={180} opacity={0.08} delay={4} />
    </div>
  );
};