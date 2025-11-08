import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Eye, Code, Smartphone, Globe, Database, Users, Calendar, Target } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { useEffect, useRef } from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Category icons mapping
const categoryIcons = {
  'Website': Globe,
  'E-commerce': Smartphone,
  'Corporate': Users,
  'IoT': Database,
  'Digital Presence': Target,
  'Web Application': Code
};

// Animated Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.7 ? '#0056D2' : '#00FF88';
        this.alpha = Math.random() * 0.3 + 0.1;
        this.oscillation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX + Math.sin(this.oscillation) * 0.2;
        this.y += this.speedY + Math.cos(this.oscillation) * 0.2;
        this.oscillation += 0.02;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.alpha = 0.05 + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.15;
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
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(0, 86, 210, ${0.05 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.3;
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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.4 }}
    />
  );
};

// Floating Shapes Background
const FloatingShapes = () => {
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    type: ['circle', 'square', 'triangle'][i % 3],
    size: Math.random() * 80 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0056D2]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 80, 0],
          y: [0, -60, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00FF88]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.1, 0.05, 0.1],
          x: [0, -70, 0],
          y: [0, 80, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${
            shape.type === 'circle' ? 'rounded-full' : 
            shape.type === 'square' ? 'rounded-lg' : 'triangle'
          } bg-gradient-to-br from-[#0056D2]/10 to-[#00FF88]/10 backdrop-blur-sm border border-white/10`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: shape.type === 'square' ? [0, 90, 180, 270, 360] : 
                   shape.type === 'triangle' ? [0, 120, 240, 360] : 0,
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

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 86, 210, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 86, 210, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
};

// Animated Background Orbs
const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Large background orbs */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96 bg-[#0056D2]/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#00FF88]/3 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Floating dots pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0056D2 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #00FF88 2px, transparent 2px)`,
          backgroundSize: '100px 100px, 150px 150px'
        }}
      />
    </div>
  );
};

export default function Portfolio() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50/80 to-blue-50/50 relative overflow-hidden">
      {/* Animated Backgrounds */}
      <ParticleBackground />
      <FloatingShapes />
      <BackgroundOrbs />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our <span className="text-gradient-inverse">Portfolio</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Showcasing innovative digital solutions that drive business growth and transformation
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/contact" 
                className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/services" 
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0056D2] transition-all duration-300 font-semibold"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '15+', label: 'Industries Served' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0056D2] mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {portfolio.map((item, index) => {
              const CategoryIcon = categoryIcons[item.category] || Globe;
              
              return (
                <motion.div
                  key={item.slug}
                  variants={fadeInUp}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
                  whileHover={{ y: -8 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="p-3 rounded-2xl brand-gradient-bg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CategoryIcon className="text-white" size={24} />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0056D2] transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <Users size={14} />
                            Client: {item.client}
                          </p>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <motion.span 
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0056D2]/10 to-[#00FF88]/10 text-[#0056D2] border border-[#0056D2]/20 text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.category}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.1 + index * 0.05 }}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:shadow-md transition-shadow duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Completed: {item.completed || '2024'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye size={16} />
                        <span>{item.views || 'Live Project'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link 
                        to="/contact" 
                        className="flex-1 brand-gradient-bg text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center flex items-center justify-center gap-2 group/btn"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          Discuss Similar Project
                        </motion.span>
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      
                      {item.liveUrl && (
                        <motion.a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-[#0056D2] hover:text-[#0056D2] transition-all duration-300 font-semibold flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={18} />
                          View Live
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Animated border */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#0056D2]/20 transition-all duration-500 pointer-events-none"
                    whileHover={{ scale: 1.02 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-[#0056D2] to-[#00FF88] rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ['0px 0px', '50px 50px', '0px 0px']
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20l0 0 0 0 0 0 0 0 0 0zM0 20l0 0 0 0 0 0 0 0 0 0z'/%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with cutting-edge technology and innovative solutions.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/contact" 
                    className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Start Your Project
                    </motion.span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link 
                    to="/services" 
                    className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0056D2] transition-all duration-300 font-semibold"
                  >
                    Explore All Services
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}