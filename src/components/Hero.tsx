import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Database, Shield, Cloud, Cpu, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const floatAnimation = {
  animate: {
    y: [-20, 20, -20],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const bounceAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "backOut" }
};

// Particle background component
const AnimatedBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(0, 86, 210, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 20%, rgba(0, 86, 210, 0.4) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(0, 255, 136, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(0, 86, 210, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(0, 86, 210, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#0056D2] to-[#00FF88]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: Math.random() * 0.6 + 0.2
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 86, 210, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 86, 210, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Pulsing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0056D2] to-[#00FF88] rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#00FF88] to-[#0056D2] rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating tech icons */}
      <motion.div
        className="absolute top-20 left-10"
        variants={bounceAnimation}
        animate="animate"
      >
        <Code size={32} className="text-[#0056D2]/30" />
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Database size={40} className="text-[#00FF88]/30" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-20"
        variants={spinAnimation}
        animate="animate"
      >
        <Cpu size={36} className="text-[#0056D2]/25" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-32"
        variants={bounceAnimation}
        animate="animate"
        transition={{ delay: 0.5 }}
      >
        <Cloud size={44} className="text-[#00FF88]/25" />
      </motion.div>

      {/* Animated code snippets */}
      <motion.div
        className="absolute top-1/3 left-16"
        variants={floatAnimation}
        animate="animate"
      >
        <div className="text-xs font-mono text-[#0056D2]/30 bg-white/20 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          &lt;AI Powered /&gt;
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 right-20"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        variants={floatAnimation}
        transition={{ delay: 3 }}
      >
        <div className="text-xs font-mono text-[#00FF88]/30 bg-white/20 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          function innovate()
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-16"
        variants={floatAnimation}
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <div className="text-xs font-mono text-[#0056D2]/30 bg-white/20 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          .automate-workflow
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/2 left-32"
        variants={floatAnimation}
        animate="animate"
        transition={{ delay: 2.5 }}
      >
        <div className="text-xs font-mono text-[#00FF88]/30 bg-white/20 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          secureSystem()
        </div>
      </motion.div>

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M100,100 C300,50 500,150 700,100"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M200,300 C400,250 600,350 800,300"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0056D2" />
            <stop offset="100%" stopColor="#00FF88" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wave animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
        animate={{
          background: [
            'linear-gradient(90deg, transparent, #0056D2, transparent)',
            'linear-gradient(90deg, transparent, #00FF88, transparent)',
            'linear-gradient(90deg, transparent, #0056D2, transparent)'
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#0056D2] px-4 py-2 rounded-full mb-6 border border-white/20 shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 86, 210, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span className="text-sm font-medium">Digital Solutions for Modern Business</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Transform Your Business
            <br />
            <motion.span 
              className="text-gradient bg-gradient-to-r from-[#0056D2] to-[#00FF88] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              With Trustique Assist
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We blend innovation in software with strong security expertise. We build AI-powered ERP & CRM systems, smart websites, and intelligent apps that automate workflows, boost efficiency, and accelerate digital growth.
          </motion.p>

          {/* Feature Tags */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-3 justify-center mb-8"
          >
            {[
              { icon: Code, text: "Smart Software & AI", delay: 0.1 },
              { icon: Shield, text: "Integrated Security Solutions", delay: 0.2 },
              { icon: Database, text: "Facility Management", delay: 0.3 }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.span
                  key={item.text}
                  variants={scaleIn}
                  className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-[#0056D2] border border-white/20 shadow-lg flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 15px 30px rgba(0, 86, 210, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={16} />
                  {item.text}
                </motion.span>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/services" className="group relative overflow-hidden">
              <motion.div
                className="brand-gradient-bg text-white px-8 py-4 rounded-full flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 86, 210, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span>View Solutions</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            </Link>
            
            <Link to="/contact">
              <motion.div
                className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 hover:border-[#0056D2] hover:text-[#0056D2] bg-white/80 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#0056D2",
                  color: "#0056D2",
                  boxShadow: "0 15px 30px rgba(0, 86, 210, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1, borderColor: "#0056D2" }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}