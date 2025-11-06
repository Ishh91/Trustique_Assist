import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Particle System Background
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? '#0056D2' : '#00FF88';
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.alpha = 0.1 + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 86, 210, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// Gradient Mesh Background
const GradientMeshBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(0, 86, 210, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 20%, rgba(0, 86, 210, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(0, 255, 136, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(0, 86, 210, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 86, 210, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 86, 210, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

// Floating Shapes Background
const FloatingShapesBackground = () => {
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? 'circle' : 'square',
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${
            shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'
          } bg-gradient-to-br from-[#0056D2]/10 to-[#00FF88]/10 backdrop-blur-sm border border-white/10`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: shape.type === 'square' ? [0, 180, 360] : 0,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        />
      ))}
    </div>
  );
};

// Wave Background
const WaveBackground = () => {
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
    <div className="absolute inset-0 overflow-hidden">
      <Wave height={150} opacity={0.15} delay={0} />
      <Wave height={120} opacity={0.1} delay={2} />
      <Wave height={180} opacity={0.08} delay={4} />
    </div>
  );
};

// Hexagon Background
const HexagonBackground = () => {
  const hexagons = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
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

// Main Background Component
export const AnimatedBackground = ({ type = "combined" }) => {
  const backgrounds = {
    particles: <ParticleBackground />,
    gradient: <GradientMeshBackground />,
    shapes: <FloatingShapesBackground />,
    waves: <WaveBackground />,
    hexagons: <HexagonBackground />,
    combined: (
      <>
        <GradientMeshBackground />
        <ParticleBackground />
        <FloatingShapesBackground />
      </>
    )
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgrounds[type]}
      
      {/* Ambient light orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0056D2]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.05, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default AnimatedBackground;