import React, { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Smartphone, Globe, Database, Cloud, Zap, Users, TrendingUp, Award, Star, Bot, Brain, Cpu, Shield, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import { services } from '../data/services';

// Lazy load heavy components
// @ts-ignore – JS component without types
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

// Optimized animation variants for mobile
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

// Optimized animated section with reduced motion for mobile
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Loading fallback for background
const BackgroundFallback = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 z-0" />
);

// Optimized image component with lazy loading
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className={`bg-gray-200 animate-pulse ${className}`} />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'block' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default function Home() {
  const [currentBackground, setCurrentBackground] = useState('gradient'); // Simpler default
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoize data to prevent recalculations
  const featured = useMemo(() => services.slice(0, 6), []);

  // Fallback testimonials
  const fallbackTestimonials: Testimonial[] = useMemo(() => [
    {
      id: 'fallback-1',
      name: 'Pushpanjali Groups',
      role: 'E-commerce Partner',
      company: 'Pushpanjali Groups',
      review: 'Pushpanjali is a food e-commerce website we developed to sell organic Amla products. It features a clean design, easy navigation, secure payments, and smooth shopping experience.',
      project: 'Amla E-commerce Platform',
      rating: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      name: 'SafeSense Tech Pvt. Ltd.',
      role: 'Technology Partner',
      company: 'SafeSense Tech Pvt. Ltd.',
      review: 'We created the official website for SafeSense Tech with modern, responsive design and professional interface reflecting their focus on smart technology.',
      project: 'IoT Solutions Website',
      rating: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fallback-3',
      name: 'Safecure Services Limited',
      role: 'Security Services Partner',
      company: 'Safecure Services Limited',
      review: 'We developed a professional website emphasizing safety and reliability with modern approach and advanced technology.',
      project: 'Security Services Website',
      rating: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], []);

  // Memoized static data
  const technologies = useMemo(() => [
    { name: 'AI & ML', icon: Brain },
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

  const processSteps = useMemo(() => [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze requirements and create detailed project roadmap'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'UI/UX design and interactive prototypes'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with continuous testing'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Seamless deployment and ongoing support'
    }
  ], []);

  const stats = useMemo(() => [
    { number: '50+', label: 'Developers' },
    { number: '200+', label: 'Projects' },
    { number: '15+', label: 'Technologies' },
    { number: '24/7', label: 'Support' }
  ], []);

  // Optimized testimonial fetch with timeout
  const fetchTestimonials = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'));
      const testimonialsUrl = apiBase.endsWith('/api')
        ? `${apiBase}/testimonials`
        : `${apiBase}/api/testimonials`;
      
      const response = await fetch(testimonialsUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Failed to fetch (${response.status})`);
      
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setTestimonials(fallbackTestimonials);
        return;
      }
      
      const data = await response.json();
      setTestimonials(data && Array.isArray(data) && data.length > 0 ? data : fallbackTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  }, [fallbackTestimonials]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Remove complex background cycling on mobile
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b' && window.innerWidth > 768) {
        const backgrounds = ['gradient', 'particles', 'shapes']; // Simplified options
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
      {/* Lazy loaded background with fallback */}
      <Suspense fallback={<BackgroundFallback />}>
        <AnimatedBackground type={currentBackground} />
      </Suspense>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Technologies Stack - Optimized for mobile */}
        <AnimatedSection className="py-12 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Tech Stack</span> 
              </motion.h2>
              <motion.p 
                className="text-base text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Cutting-edge technologies enhanced with AI
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {technologies.map((tech) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={scaleIn}
                    className="group text-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ y: -2 }}
                  >
                    <div className="relative z-10">
                      <motion.div 
                        className="inline-flex p-2 rounded-lg brand-gradient-bg mb-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="text-white w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-xs leading-tight">{tech.name}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Development Process - Simplified */}
        <AnimatedSection className="py-16 bg-gray-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                 <span className="text-gradient">Our</span> Process
              </motion.h2>
              <motion.p
                className="text-base text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent methodology for superior solutions
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="group relative text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-all duration-200"
                  whileHover={{ y: -2 }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 brand-gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xs"
                    >
                      {step.step}
                    </motion.div>
                    <div className="mb-4 pt-4">
                      <Zap className="w-8 h-8 text-[#0056D2] mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Stats Section - Optimized */}
        <motion.section 
          className="py-12 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
                >
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Services - Optimized */}
        <AnimatedSection className="py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Our</span> Services
              </motion.h2>
              <motion.p
                className="text-base text-gray-600 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent software solutions powered by AI
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-30px" }}
            >
              {featured.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    variants={fadeInUp}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-all duration-200 block"
                    >
                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-lg brand-gradient-bg mb-4`}>
                          <Icon className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{service.description}</p>
                        <div className="mt-3 flex items-center text-[#0056D2] font-medium text-sm">
                          Learn more <ArrowRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/services" className="brand-gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 flex items-center gap-2 justify-center max-w-xs mx-auto shadow-md text-sm">
                View All Solutions
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Why Choose Us - Optimized */}
        <AnimatedSection className="py-16 bg-gray-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Why Choose <span className="text-gradient">Our AI Team</span>
                </h2>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  We are passionate developers, AI specialists, and designers dedicated to delivering intelligent software solutions.
                </p>
                <div className="space-y-3">
                  {[
                    'AI experts with 5+ years experience',
                    'Machine learning integration',
                    'Agile development methodology',
                    '24/7 technical support',
                    'Scalable and intelligent code',
                    'Security-first AI approach'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#00FF88] mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative order-first lg:order-last"
              >
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Development Team"
                  className="rounded-xl shadow-lg relative w-full"
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <section id="testimonials">
          <AnimatedSection className="py-16 bg-white/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Client <span className="text-gradient">Success Stories</span>
                </motion.h2>
                <motion.p
                  className="text-base text-gray-600 px-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Real feedback from our satisfied clients
                </motion.p>
              </div>
              
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#0056D2]"></div>
                  <p className="mt-3 text-gray-600 text-sm">Loading testimonials...</p>
                </div>
              )}
              
              {!loading && testimonials.length > 0 && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  {testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      variants={fadeInUp}
                      className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-all duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative">
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                            <span key={starIndex} className="text-[#00FF88] text-base">★</span>
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 italic line-clamp-4">
                          "{testimonial.review}"
                        </p>
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 font-medium">Project:</div>
                          <div className="text-[#0056D2] font-semibold text-sm">{testimonial.project}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                            <div className="text-xs text-gray-600">{testimonial.role}, {testimonial.company}</div>
                          </div>
                          <div className="px-2 py-1 rounded-full bg-gray-100 text-[#0056D2] text-xs font-medium">
                            Verified
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </AnimatedSection>
        </section>

        {/* CTA Section - Optimized */}
        <motion.section 
          className="py-16 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Build Your Next AI Project?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let's discuss your software development needs.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-[#0056D2] px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2 justify-center shadow-md text-sm"
              >
                Start Your Project
                <ArrowRight size={16} />
              </Link>
              <Link 
                to="/services" 
                className="bg-white text-[#0056D2] px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2 justify-center shadow-md text-sm"
              >
                View Our Work
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}