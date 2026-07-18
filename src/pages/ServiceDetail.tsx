import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle, Clock, Users, Zap, Shield, Target } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Service = {
  id: string;
  iconName: string;
  title: string;
  description: string;
  color: string;
  slug: string;
  fullDescription?: string;
  features?: string[];
  useCases?: string[];
  technologies?: string[];
};

// Particle Background Component for Service Pages
const ServiceParticleBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.body.scrollHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    (canvas as HTMLCanvasElement).width = dimensions.width;
    (canvas as HTMLCanvasElement).height = dimensions.height;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      oscillation: number;
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = Math.random() > 0.7 ? '#00C8D7' : '#43E8FF';
        this.alpha = Math.random() * 0.3 + 0.1;
        this.oscillation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX + Math.sin(this.oscillation) * 0.5;
        this.y += this.speedY + Math.cos(this.oscillation) * 0.5;
        this.oscillation += 0.02;

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

    const particles: {
      x: any;
      update(): unknown;
      draw(): unknown; y: any; 
}[] = [];
    const particleCount = Math.min(60, Math.floor((dimensions.width * dimensions.height) / 20000));

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
            ctx.strokeStyle = `rgba(0, 200, 215, ${0.05 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
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
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.4 }}
    />
  );
};

// Floating Elements Background
const FloatingElementsBackground = () => {
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? 'circle' : 'square',
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-gradient/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.05, 0.15],
          x: [0, -40, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${
            shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'
          } bg-gradient-to-br from-primary/5 to-primary-gradient/5 backdrop-blur-sm border border-border-subtle`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, 0],
            rotate: shape.type === 'square' ? [0, 90, 180, 270, 360] : 0,
            scale: [1, 1.1, 1],
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
            linear-gradient(rgba(0, 200, 215, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 215, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

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

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const [serviceRes, servicesRes] = await Promise.all([
          fetch(`${apiBase}/services/${slug}`),
          fetch(`${apiBase}/services`)
        ]);
        if (serviceRes.ok && servicesRes.ok) {
          const serviceData = await serviceRes.json();
          const servicesData = await servicesRes.json();
          setService(serviceData);
          setServices(servicesData);
        } else {
          setService(null);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading...
        </motion.h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Service not found
        </motion.h2>
        <Link to="/services" className="text-primary hover:text-primary-gradient transition-colors">
          Back to Services
        </Link>
      </div>
    );
  }

  const Icon = (Icons as Record<string, any>)[service.iconName] || Icons.Code;

  return (
    <div className="relative min-h-screen bg-bg-main">
      {/* Animated Backgrounds */}
      <ServiceParticleBackground />
      <FloatingElementsBackground />
      
      {/* Content */}
      <section className="relative z-10 py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/services" 
              className="inline-flex items-center text-primary hover:text-primary-gradient transition-colors group font-medium backdrop-blur-sm bg-bg-card/80 px-4 py-2 rounded-full border border-border-subtle"
            >
              <ArrowRight className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              Back to All Services
            </Link>
          </motion.div>

          {/* Service Header */}
          <motion.div 
            className="bg-bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border-subtle shadow-xl mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <motion.div 
                className="inline-flex p-4 rounded-xl brand-gradient-bg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="text-white" size={40} />
              </motion.div>
              <div className="flex-1">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {service.title}
                </motion.h1>
                <motion.p 
                  className="text-xl text-text-muted leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {service.description}
                </motion.p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              <motion.div 
                className="bg-bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border-subtle shadow-lg"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h2 className="text-2xl font-bold text-text-white mb-6">Service Overview</h2>
                <p className="text-text-muted leading-relaxed text-lg">
                  {service.fullDescription}
                </p>
              </motion.div>

              {/* Key Features */}
              {service.features && (
                <motion.div 
                  className="bg-bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border-subtle shadow-lg"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-3">
                    <Zap className="text-primary" size={24} />
                    Key Features & Capabilities
                  </h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        variants={scaleIn}
                        className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary transition-colors"
                      >
                        <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-text-muted">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Use Cases */}
              {service.useCases && (
                <motion.div 
                  className="bg-bg-card/90 backdrop-blur-sm p-8 rounded-2xl border border-border-subtle shadow-lg"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-3">
                    <Target className="text-primary" size={24} />
                    Common Use Cases
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.useCases.map((useCase, index) => (
                      <motion.div
                        key={useCase}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary/70 hover:bg-bg-secondary transition-colors"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-muted">{useCase}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              {service.technologies && (
                <motion.div 
                  className="bg-bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border-subtle shadow-lg"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-text-white mb-4 flex items-center gap-2">
                    <Shield className="text-primary" size={20} />
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.4 }}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary-gradient/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Process Timeline */}
              <motion.div 
                className="bg-bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border-subtle shadow-lg"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-text-white mb-6 flex items-center gap-2">
                  <Clock className="text-primary" size={20} />
                  Our Process
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Discovery & Analysis', description: 'Understand your requirements and goals' },
                    { step: '02', title: 'Planning & Strategy', description: 'Create detailed project roadmap' },
                    { step: '03', title: 'Design & Development', description: 'Build and implement the solution' },
                    { step: '04', title: 'Testing & Quality', description: 'Ensure everything works perfectly' },
                    { step: '05', title: 'Deployment & Launch', description: 'Go live with full support' },
                    { step: '06', title: 'Support & Maintenance', description: 'Ongoing optimization and updates' }
                  ].map((stage, index) => (
                    <motion.div
                      key={stage.step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 brand-gradient-bg rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
                          {stage.step}
                        </div>
                        {index < 5 && (
                          <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary-gradient mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-text-white mb-1">{stage.title}</h4>
                        <p className="text-text-muted text-sm">{stage.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div 
                className="bg-gradient-to-br from-primary to-primary-gradient p-6 rounded-2xl text-white shadow-lg"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="text-white" size={20} />
                  Why Choose Us
                </h3>
                <div className="space-y-3">
                  {[
                    'Expert team with proven track record',
                    'Transparent communication & pricing',
                    'Agile development methodology',
                    'Quality-focused approach',
                    'Ongoing support & maintenance',
                    'Timely delivery guaranteed'
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle size={18} className="text-white/90" />
                      <span className="text-white/90 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6"
                >
                  <Link
                    to="/contact"
                    className="block w-full bg-white text-primary text-center py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Related Services */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-white mb-8 text-center">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services
                .filter(s => s.slug !== service.slug)
                .slice(0, 3)
                .map((relatedService, index) => {
                  const RelatedIcon = (Icons as Record<string, any>)[relatedService.iconName] || Icons.Code;
                  return (
                    <motion.div
                      key={relatedService.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <Link
                        to={`/services/${relatedService.slug}`}
                        className="block bg-bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border-subtle shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                      >
                        <div className="inline-flex p-3 rounded-lg brand-gradient-bg mb-4 group-hover:scale-110 transition-transform">
                          <RelatedIcon className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-text-white mb-2">{relatedService.title}</h3>
                        <p className="text-text-muted text-sm leading-relaxed">{relatedService.description}</p>
                        <div className="mt-4 flex items-center text-primary font-medium text-sm">
                          Learn more
                          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
