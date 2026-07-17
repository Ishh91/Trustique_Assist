import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Cloud, Code, Smartphone, Share2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LiquidEther from './liquid';
import logo from '../img/logo.png';

const orbitStyles = `
  .orbit-stage {
    position: relative;
    height: 680px;
    width: 680px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .orbit-stage {
      height: 560px;
      width: 560px;
    }
    .orbit-radius {
      --orbit-radius: 180px;
    }
  }

  @media (max-width: 768px) {
    .orbit-stage {
      height: 480px;
      width: 480px;
      transform: scale(0.85);
    }
    .orbit-radius {
      --orbit-radius: 150px;
    }
  }

  @media (max-width: 560px) {
    .orbit-stage {
      height: 400px;
      width: 400px;
      transform: scale(0.75);
    }
    .orbit-radius {
      --orbit-radius: 120px;
    }
  }

  .orbit-stage {
    --orbit-radius: 220px;
  }

  /* Orbit Rings */
  .orbit-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid rgba(0, 200, 215, 0.12);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .or1 {
    width: 260px;
    height: 260px;
    animation: ringspin 25s linear infinite;
  }

  .or2 {
    width: 380px;
    height: 380px;
    animation: ringspin 40s linear infinite reverse;
  }

  .or3 {
    width: 500px;
    height: 500px;
    animation: ringspin 55s linear infinite;
    border-color: rgba(0, 200, 215, 0.06);
  }

  @keyframes ringspin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Ping Effects */
  .ping {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border: 1px solid rgba(67, 232, 255, 0.4);
    border-radius: 50%;
    animation: pingOut 4s ease-out infinite;
    pointer-events: none;
  }

  .ping.p2 {
    animation-delay: 1.3s;
  }

  .ping.p3 {
    animation-delay: 2.6s;
  }

  @keyframes pingOut {
    0% {
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      opacity: 0.9;
      border-color: rgba(67, 232, 255, 0.6);
    }
    100% {
      width: 400px;
      height: 400px;
      margin: -200px 0 0 -200px;
      opacity: 0;
      border-color: rgba(67, 232, 255, 0);
    }
  }

  /* Core */
  .orbit-core {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .core-frame {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: coreFloat 5s ease-in-out infinite;
  }

  @keyframes coreFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .core-frame img {
    width: 110px;
    height: 110px;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(0, 200, 215, 0.4));
    position: relative;
    z-index: 2;
  }

  .core-glow {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 50px;
    background: radial-gradient(ellipse, rgba(0, 200, 215, 0.4), transparent 70%);
    filter: blur(6px);
    animation: coreGlow 3s ease-in-out infinite;
    z-index: 0;
  }

  @keyframes coreGlow {
    0%, 100% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.2);
    }
  }

  /* Service Cards - Proper Orbit Implementation */
  .orbit-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    will-change: transform;
  }

  .service-card {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(13, 13, 13, 0.92);
    border: 1px solid rgba(0, 200, 215, 0.25);
    padding: 10px 16px;
    border-radius: 12px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    cursor: default;
    white-space: nowrap;
    transform: translate(-50%, -50%);
  }

  .service-card:hover {
    border-color: rgba(67, 232, 255, 0.8);
    box-shadow: 0 12px 48px rgba(0, 200, 215, 0.25);
    transform: translate(-50%, -50%) scale(1.08);
    z-index: 20;
  }

  .service-card svg {
    width: 18px;
    height: 18px;
    stroke: #43E8FF;
    flex-shrink: 0;
  }

  .service-card span {
    color: #F5F7F8;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.3px;
  }

  /* Individual Orbit Animations - Reduced Radius */
  .orbit-item-1 { animation: orbit1 30s linear infinite; }
  .orbit-item-2 { animation: orbit2 30s linear infinite; }
  .orbit-item-3 { animation: orbit3 30s linear infinite; }
  .orbit-item-4 { animation: orbit4 30s linear infinite; }
  .orbit-item-5 { animation: orbit5 30s linear infinite; }
  .orbit-item-6 { animation: orbit6 30s linear infinite; }

  /* Each item starts at a different position on the orbit */
  @keyframes orbit1 {
    0% { transform: rotate(0deg) translateX(var(--orbit-radius, 220px)) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(var(--orbit-radius, 220px)) rotate(-360deg); }
  }
  
  @keyframes orbit2 {
    0% { transform: rotate(60deg) translateX(var(--orbit-radius, 220px)) rotate(-60deg); }
    100% { transform: rotate(420deg) translateX(var(--orbit-radius, 220px)) rotate(-420deg); }
  }
  
  @keyframes orbit3 {
    0% { transform: rotate(120deg) translateX(var(--orbit-radius, 220px)) rotate(-120deg); }
    100% { transform: rotate(480deg) translateX(var(--orbit-radius, 220px)) rotate(-480deg); }
  }
  
  @keyframes orbit4 {
    0% { transform: rotate(180deg) translateX(var(--orbit-radius, 220px)) rotate(-180deg); }
    100% { transform: rotate(540deg) translateX(var(--orbit-radius, 220px)) rotate(-540deg); }
  }
  
  @keyframes orbit5 {
    0% { transform: rotate(240deg) translateX(var(--orbit-radius, 220px)) rotate(-240deg); }
    100% { transform: rotate(600deg) translateX(var(--orbit-radius, 220px)) rotate(-600deg); }
  }
  
  @keyframes orbit6 {
    0% { transform: rotate(300deg) translateX(var(--orbit-radius, 220px)) rotate(-300deg); }
    100% { transform: rotate(660deg) translateX(var(--orbit-radius, 220px)) rotate(-660deg); }
  }

  /* Responsive orbit radius - Reduced */
  @media (max-width: 1024px) {
    .orbit-item-1 { --orbit-radius: 180px; }
    .orbit-item-2 { --orbit-radius: 180px; }
    .orbit-item-3 { --orbit-radius: 180px; }
    .orbit-item-4 { --orbit-radius: 180px; }
    .orbit-item-5 { --orbit-radius: 180px; }
    .orbit-item-6 { --orbit-radius: 180px; }
  }

  @media (max-width: 768px) {
    .orbit-item-1 { --orbit-radius: 150px; }
    .orbit-item-2 { --orbit-radius: 150px; }
    .orbit-item-3 { --orbit-radius: 150px; }
    .orbit-item-4 { --orbit-radius: 150px; }
    .orbit-item-5 { --orbit-radius: 150px; }
    .orbit-item-6 { --orbit-radius: 150px; }
  }

  @media (max-width: 560px) {
    .orbit-item-1 { --orbit-radius: 120px; }
    .orbit-item-2 { --orbit-radius: 120px; }
    .orbit-item-3 { --orbit-radius: 120px; }
    .orbit-item-4 { --orbit-radius: 120px; }
    .orbit-item-5 { --orbit-radius: 120px; }
    .orbit-item-6 { --orbit-radius: 120px; }
  }
`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const timer = setTimeout(() => setAnimationsReady(true), 300);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, []);

  const serviceItems = [
    { icon: Cloud, label: 'Cloud Solutions', className: 'orbit-item-1' },
    { icon: Code, label: 'AI & Automation', className: 'orbit-item-2' },
    { icon: Share2, label: 'Digital Marketing', className: 'orbit-item-3' },
    { icon: Layers, label: 'Blockchain', className: 'orbit-item-4' },
    { icon: Code, label: 'Web Development', className: 'orbit-item-5' },
    { icon: Smartphone, label: 'Mobile Apps', className: 'orbit-item-6' }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-main"
    >
      <style>{orbitStyles}</style>
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther 
          colors={['#00C8D7', '#43E8FF', '#007A87']} 
          mouseForce={20} 
          cursorSize={100} 
          isViscous 
          viscous={30} 
          iterationsViscous={32} 
          iterationsPoisson={32} 
          resolution={0.5} 
          isBounce={false} 
          autoDemo 
          autoSpeed={0.5} 
          autoIntensity={2.2} 
          takeoverDuration={0.25} 
          autoResumeDelay={3000} 
          autoRampDuration={0.6} 
        />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left lg:pr-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={animationsReady ? "animate" : "initial"}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-bg-card/90 backdrop-blur-sm text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 border border-border-subtle shadow-lg text-xs md:text-sm"
                whileHover={{ 
                  scale: isMobile ? 1 : 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0, 200, 215, 0.1)",
                }}
              >
                <motion.div
                  animate={{ rotate: isMobile ? 0 : [0, 180, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={isMobile ? 12 : 16} className="text-primary" />
                </motion.div>
                <span className="font-medium">Trust · Integrity · Impact</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-white mb-4 md:mb-6 leading-tight"
              >
                Engineering Ideas
                <br className="hidden sm:block" />
                <motion.span 
                  className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-gradient"
                  animate={animationsReady ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  } : {}}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  into Digital Reality.
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl text-text-muted mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                From <strong className="text-text-white">Startup Registration</strong> to <strong className="text-text-white">AI Products</strong>.<br className="hidden sm:block" />
                From <strong className="text-text-white">Websites</strong> to <strong className="text-text-white">Enterprise Software</strong>.<br className="hidden sm:block" />
                From <strong className="text-text-white">Branding</strong> to <strong className="text-text-white">Growth</strong>.<br />
                <span className="text-primary font-semibold">We build everything your business needs.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-center"
              >
                <Link to="/contact" className="w-full sm:w-auto">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-primary-gradient text-white px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center gap-2 font-semibold justify-center text-sm md:text-base w-full"
                    whileHover={{ 
                      scale: isMobile ? 1 : 1.05,
                      y: -2,
                      boxShadow: "0 20px 40px rgba(0, 200, 215, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Start Your Project</span>
                    <motion.div
                      animate={isMobile ? {} : { x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={isMobile ? 16 : 20} />
                    </motion.div>
                  </motion.div>
                </Link>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <motion.div
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full border-2 border-border-subtle text-text-white hover:border-primary hover:text-primary bg-bg-card/90 backdrop-blur-sm font-semibold text-center text-sm md:text-base w-full"
                    whileHover={{ 
                      scale: isMobile ? 1 : 1.05,
                      y: -2,
                      borderColor: "#00C8D7",
                      color: "#00C8D7",
                      boxShadow: "0 15px 30px rgba(0, 200, 215, 0.15)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Services
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Orbit System */}
          <div className="flex-1 relative hidden lg:flex items-center justify-center">
            <div className="orbit-stage">
              {/* Ping Effects */}
              <div className="ping"></div>
              <div className="ping p2"></div>
              <div className="ping p3"></div>

              {/* Orbit Rings - Reduced sizes */}
              <div className="orbit-ring or1"></div>
              <div className="orbit-ring or2"></div>
              <div className="orbit-ring or3"></div>

              {/* Service Cards on Orbit */}
              {serviceItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className={`orbit-item ${item.className}`}
                  >
                    <div className="service-card">
                      <Icon />
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}

              {/* Core Logo */}
              <div className="orbit-core">
                <div className="core-frame">
                  <img src={logo} alt="Trustique Assist" />
                  <div className="core-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={animationsReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className={`border-2 border-text-muted/50 rounded-full flex justify-center cursor-pointer overflow-hidden ${
              isMobile ? 'w-5 h-8' : 'w-6 h-10'
            }`}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ 
              scale: 1.1, 
              borderColor: "#00C8D7",
            }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary to-primary-gradient rounded-full flex justify-center pt-1"
              animate={{
                background: [
                  'linear-gradient(to bottom, #00C8D7, #43E8FF)',
                  'linear-gradient(to bottom, #43E8FF, #00C8D7)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className={`bg-white rounded-full ${
                  isMobile ? 'w-1 h-2' : 'w-1.5 h-3'
                }`}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}