import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Smartphone, Globe, Database, Cloud, Zap, Users, TrendingUp, Award, Star, Bot, Brain, Cpu, Shield, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import { services } from '../data/services';

// Lazy load heavy components
const AnimatedBackground = lazy(() => import('../components/AnimatedBackground'));

// Testimonial interface
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  project: string;
  rating: number;
  featuredImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Animation variants - optimized for mobile
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05 // Reduced for faster loading
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Reusable animated section component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }} // Reduced margin for earlier triggering
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Loading fallback for lazy components
const BackgroundFallback = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 z-0" />
);

export default function Home() {
  const [currentBackground, setCurrentBackground] = useState('combined');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoize featured services to prevent recalculations
  const featured = useMemo(() => services.slice(0, 6), []);

  // Fallback testimonials used when API is unavailable or blocked
  const fallbackTestimonials: Testimonial[] = useMemo(() => [
    {
      id: 'fallback-1',
      name: 'Pushpanjali Groups',
      role: 'E-commerce Partner',
      company: 'Pushpanjali Groups',
      review: 'Pushpanjali is a food e-commerce website we developed to sell organic Amla (Indian Gooseberry) products. It features a clean design, easy navigation, secure payments, and a smooth shopping experience — promoting healthy, traditional food products through a modern online platform.',
      project: 'Amla E-commerce Platform',
      rating: 5,
      featuredImage: undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      name: 'SafeSense Tech Pvt. Ltd.',
      role: 'Technology Partner',
      company: 'SafeSense Tech Pvt. Ltd.',
      review: 'We created the official website for SafeSense Tech Pvt. Ltd., a company that provides IoT-based software solutions. The website showcases their products, services, and innovations with a modern, responsive design and a professional interface that reflects their focus on smart technology and digital transformation.',
      project: 'IoT Solutions Website',
      rating: 5,
      featuredImage: undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fallback-3',
      name: 'Safecure Services Limited',
      role: 'Security Services Partner',
      company: 'Safecure Services Limited',
      review: 'We developed a professional and dynamic website for Safecure Service Limited, emphasizing their commitment to safety, reliability, and integrated security solutions. The site showcases their modern approach, advanced technology, and client-focused services, designed to strengthen their digital presence and brand credibility.',
      project: 'Security Services Website',
      rating: 5,
      featuredImage: undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], []);

  // Memoized technologies array
  const technologies = useMemo(() => [
    { name: 'AI & Machine Learning', icon: Brain },
    { name: 'React & Next.js', icon: Code },
    { name: 'Node.js & Python', icon: Cloud },
    { name: 'AWS & Azure', icon: Database },
    { name: 'Mobile Apps', icon: Smartphone },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Global Scale', icon: Globe },
    { name: 'AI Automation', icon: Bot },
    { name: 'Cloud Computing', icon: Cpu },
    { name: 'Smart Solutions', icon: Sparkles }
  ], []);

  // Memoized process steps
  const processSteps = useMemo(() => [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed project roadmap'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'UI/UX design and interactive prototypes to visualize your solution'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with continuous integration and testing'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Seamless deployment and ongoing maintenance & support'
    }
  ], []);

  // Memoized stats
  const stats = useMemo(() => [
    { number: '50+', label: 'Developers' },
    { number: '200+', label: 'Projects Completed' },
    { number: '15+', label: 'Technologies' },
    { number: '24/7', label: 'Support' }
  ], []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'));
      const testimonialsUrl = apiBase.endsWith('/api')
        ? `${apiBase}/testimonials`
        : `${apiBase}/api/testimonials`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(testimonialsUrl, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials (${response.status})`);
      }
      
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response from testimonials:', text.slice(0, 200));
        setError(null);
        setTestimonials(fallbackTestimonials);
        return;
      }
      
      const data = await response.json();
      setTestimonials(data && Array.isArray(data) && data.length > 0 ? data : fallbackTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(null);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  // Remove background selector in production - for demo only
  useEffect(() => {
    const handleKeyPress = (e: { ctrlKey: any; key: string; }) => {
      if (e.ctrlKey && e.key === 'b') {
        const backgrounds = ['particles', 'gradient', 'shapes', 'waves', 'hexagons', 'combined'];
        const currentIndex = backgrounds.indexOf(currentBackground);
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        setCurrentBackground(backgrounds[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentBackground]);

  return (
    <div className="relative min-h-screen">
      {/* Lazy loaded Animated Background with fallback */}
      <Suspense fallback={<BackgroundFallback />}>
        <AnimatedBackground type={currentBackground} />
      </Suspense>

      {/* Hidden background selector - Press Ctrl+B to cycle through backgrounds */}
      <div className="fixed top-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm">
          Background: {currentBackground} (Ctrl+B to change)
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Technologies Stack - Optimized for mobile */}
        <AnimatedSection className="py-12 md:py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Tech Stack</span> 
              </motion.h2>
              <motion.p 
                className="text-base md:text-lg text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Cutting-edge technologies enhanced with artificial intelligence
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={scaleIn}
                    className="group text-center p-4 md:p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    whileHover={{ 
                      y: -4,
                      scale: 1.02,
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="inline-flex p-2 md:p-3 rounded-lg brand-gradient-bg mb-3 md:mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="text-white w-4 h-4 md:w-6 md:h-6" />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-xs md:text-sm leading-tight group-hover:text-[#0056D2] transition-colors duration-300">{tech.name}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Development Process - Mobile optimized */}
        <AnimatedSection className="py-16 md:py-24 bg-gray-50/90 backdrop-blur-sm" delay={0.1}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                 <span className="text-gradient">Our</span> Process
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent methodology for delivering superior software solutions
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="group relative text-center p-6 md:p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 brand-gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.div>
                    <div className="mb-4 pt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Zap className="w-8 h-8 md:w-12 md:h-12 text-[#0056D2] mx-auto group-hover:text-[#00FF88] transition-colors duration-300" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#0056D2] transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Stats Section - Mobile optimized */}
        <motion.section 
          className="py-12 md:py-16 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-20px" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: index * 0.1 
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-blue-100 font-medium text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Services - Mobile optimized */}
        <AnimatedSection className="py-16 md:py-24 bg-white/90 backdrop-blur-sm" delay={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Our</span> Services
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent software solutions powered by cutting-edge AI technology
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {featured.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group relative bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 block overflow-hidden"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`inline-flex p-3 md:p-4 rounded-xl brand-gradient-bg mb-4 md:mb-6`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="text-white w-5 h-5 md:w-7 md:h-7" />
                        </motion.div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#0056D2] transition-colors duration-300">{service.title}</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300 line-clamp-3">{service.description}</p>
                        <motion.div 
                          className="mt-3 md:mt-4 flex items-center text-[#0056D2] font-medium group-hover:text-[#00FF88] transition-colors duration-300 text-sm md:text-base"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          Learn more <ArrowRight size={14} className="ml-1 md:ml-2" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.div 
              className="text-center mt-8 md:mt-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link to="/services" className="group brand-gradient-bg text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center max-w-xs mx-auto shadow-lg text-sm md:text-base">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  View All Solutions
                </motion.span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Why Choose Us - Mobile optimized */}
        <AnimatedSection className="py-16 md:py-24 bg-gray-50/90 backdrop-blur-sm" delay={0.3}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Why Choose <span className="text-gradient">Our AI Team</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  We are a team of passionate developers, AI specialists, designers, and strategists dedicated to delivering intelligent software solutions that drive business growth and innovation.
                </p>
                <motion.div 
                  className="space-y-3 md:space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-20px" }}
                >
                  {[
                    'AI experts with 5+ years experience',
                    'Machine learning integration',
                    'Agile development methodology',
                    '24/7 technical support',
                    'Scalable and intelligent code',
                    'Security-first AI approach'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      variants={fadeInUp}
                      className="flex items-center"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88] mr-2 md:mr-3 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative order-first lg:order-last"
              >
                <motion.div 
                  className="absolute -inset-2 md:-inset-4 brand-gradient-bg rounded-2xl opacity-20 blur-xl"
                  whileInView={{ scale: 1.02 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                <motion.img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Development Team"
                  className="rounded-2xl shadow-xl relative w-full"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section with id="testimonials" - Mobile optimized */}
        <section id="testimonials">
          <AnimatedSection className="py-16 md:py-24 bg-white/90 backdrop-blur-sm" delay={0.4}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Client <span className="text-gradient">Success Stories</span>
                </motion.h2>
                <motion.p
                  className="text-base md:text-lg text-gray-600 px-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Real feedback from our satisfied clients
                </motion.p>
              </div>
              
              {loading && (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-[#0056D2]"></div>
                  <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">Loading testimonials...</p>
                </div>
              )}
              
              {error && (
                <div className="text-center py-8 md:py-12">
                  <p className="text-red-600 mb-3 md:mb-4 text-sm md:text-base">Error loading testimonials: {error}</p>
                  <button 
                    onClick={fetchTestimonials}
                    className="px-4 py-2 bg-[#0056D2] text-white rounded-lg hover:bg-[#0044A8] transition-colors text-sm md:text-base"
                  >
                    Retry
                  </button>
                </div>
              )}
              
              {!loading && !error && testimonials.length === 0 && (
                <div className="text-center py-8 md:py-12">
                  <p className="text-gray-600 text-sm md:text-base">No testimonials available yet.</p>
                </div>
              )}
              
              {!loading && !error && testimonials.length > 0 && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  {testimonials.map((testimonial, i) => (
                  <motion.div
                      key={testimonial.id}
                      variants={fadeInUp}
                      className="group relative bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ 
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex gap-1 mb-3 md:mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                            <motion.span
                              key={starIndex}
                              className="text-[#00FF88] text-base md:text-lg"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: starIndex * 0.1 + 0.2 }}
                              viewport={{ once: true }}
                            >
                              ★
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6 italic line-clamp-4 md:line-clamp-5">
                          "{testimonial.review}"
                        </p>
                        <div className="mb-3 md:mb-4">
                          <div className="text-xs md:text-sm text-gray-500 font-medium">Project:</div>
                          <div className="text-[#0056D2] font-semibold text-sm md:text-base">{testimonial.project}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</div>
                            <div className="text-xs md:text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                          </div>
                          <motion.div 
                            className="px-2 py-1 rounded-full bg-gray-100 text-[#0056D2] text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            Verified Client
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </motion.div>
              )}
            </div>
          </AnimatedSection>
        </section>

        {/* CTA Section - Mobile optimized */}
        <motion.section 
          className="py-16 md:py-24 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Build Your Next AI Project?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let's discuss your software development needs and create something amazing together.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-20px" }}
            >
              <motion.div variants={fadeInUp}>
                <Link 
                  to="/contact" 
                  className="bg-white text-[#0056D2] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 justify-center shadow-lg text-sm md:text-base w-full sm:w-auto"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    Start Your Project
                  </motion.span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link 
                  to="/services" 
                  className="bg-white text-[#0056D2] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 justify-center shadow-lg text-sm md:text-base w-full sm:w-auto"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Our Work
                  </motion.span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}