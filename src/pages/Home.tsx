import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Smartphone, Globe, Database, Cloud, Zap, Users, TrendingUp, Award, Star, Bot, Brain, Cpu, Shield, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import { services } from '../data/services';
// @ts-ignore
import { AnimatedBackground } from '../components/AnimatedBackground';

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

// Reusable animated section component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [currentBackground, setCurrentBackground] = useState('combined');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const featured = services.slice(0, 6);

  // Fallback testimonials used when API is unavailable or blocked
  const fallbackTestimonials: Testimonial[] = [
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
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'));
      const testimonialsUrl = apiBase.endsWith('/api')
        ? `${apiBase}/testimonials`
        : `${apiBase}/api/testimonials`;
      const response = await fetch(testimonialsUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials (${response.status})`);
      }
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response from testimonials:', text.slice(0, 200));
        // Fall back to local testimonials when non-JSON is received (e.g., HTML from misconfigured hosting)
        setError(null);
        setTestimonials(fallbackTestimonials);
        return;
      }
      const data = await response.json();
      setTestimonials(data && Array.isArray(data) && data.length > 0 ? data : fallbackTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      // On error (network/CORS), show the provided testimonials
      setError(null);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const technologies = [
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
  ];

  const processSteps = [
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
  ];

  const stats = [
    { number: '50+', label: 'Developers' },
    { number: '200+', label: 'Projects Completed' },
    { number: '15+', label: 'Technologies' },
    { number: '24/7', label: 'Support' }
  ];

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
      {/* Animated Background */}
      <AnimatedBackground type={currentBackground} />

      {/* Hidden background selector - Press Ctrl+B to cycle through backgrounds */}
      <div className="fixed top-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm">
          Background: {currentBackground} (Ctrl+B to change)
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Technologies Stack */}
        <AnimatedSection className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Tech Stack</span> 
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Cutting-edge technologies enhanced with artificial intelligence
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={scaleIn}
                    className="group text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                    }}
                  >
                    {/* Dynamic hover background */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-[#0056D2]/10 to-[#00FF88]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="inline-flex p-3 rounded-lg brand-gradient-bg mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="text-white" size={24} />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-[#0056D2] transition-colors duration-300">{tech.name}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Development Process */}
        <AnimatedSection className="py-24 bg-gray-50/80 backdrop-blur-sm" delay={0.1}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                 <span className="text-gradient">Our</span> Process
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent methodology for delivering superior software solutions
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="group relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Dynamic hover background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-[#0056D2]/5 via-transparent to-[#00FF88]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Floating particles effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{
                      background: [
                        "radial-gradient(circle at 20% 20%, rgba(0, 86, 210, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 60%, rgba(0, 86, 210, 0.1) 0%, transparent 50%)"
                      ],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 brand-gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    <div className="mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Zap className="w-12 h-12 text-[#0056D2] mx-auto group-hover:text-[#00FF88] transition-colors duration-300" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#0056D2] transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <motion.section 
          className="py-16 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold mb-2"
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
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Services */}
        <AnimatedSection className="py-24 bg-white/80 backdrop-blur-sm" delay={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Our</span> Services
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent software solutions powered by cutting-edge AI technology
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featured.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 block overflow-hidden"
                    >
                      {/* Dynamic hover backgrounds */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-[#0056D2]/10 via-transparent to-[#00FF88]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <motion.div 
                        className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                      
                      {/* AI circuit pattern overlay */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230056D2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '30px 30px'
                        }}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`inline-flex p-4 rounded-xl brand-gradient-bg mb-6`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="text-white" size={28} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0056D2] transition-colors duration-300">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{service.description}</p>
                        <motion.div 
                          className="mt-4 flex items-center text-[#0056D2] font-medium group-hover:text-[#00FF88] transition-colors duration-300"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          Learn more <ArrowRight size={16} className="ml-2" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link to="/services" className="group brand-gradient-bg text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center gap-2 justify-center max-w-xs mx-auto shadow-lg">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  View All Solutions
                </motion.span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Why Choose Us */}
        <AnimatedSection className="py-24 bg-gray-50/80 backdrop-blur-sm" delay={0.3}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose <span className="text-gradient">Our AI Team</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We are a team of passionate developers, AI specialists, designers, and strategists dedicated to delivering intelligent software solutions that drive business growth and innovation.
                </p>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
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
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-5 h-5 text-[#00FF88] mr-3 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div 
                  className="absolute -inset-4 brand-gradient-bg rounded-2xl opacity-20 blur-xl"
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                <motion.img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Development Team"
                  className="rounded-2xl shadow-2xl relative w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section with id="testimonials" */}
        <section id="testimonials">
          <AnimatedSection className="py-24 bg-white/80 backdrop-blur-sm" delay={0.4}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Client <span className="text-gradient">Success Stories</span>
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Real feedback from our satisfied clients
                </motion.p>
              </div>
              
              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0056D2]"></div>
                  <p className="mt-4 text-gray-600">Loading testimonials...</p>
                </div>
              )}
              
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">Error loading testimonials: {error}</p>
                  <button 
                    onClick={fetchTestimonials}
                    className="px-4 py-2 bg-[#0056D2] text-white rounded-lg hover:bg-[#0044A8] transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
              
              {!loading && !error && testimonials.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No testimonials available yet.</p>
                </div>
              )}
              
              {!loading && !error && testimonials.length > 0 && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {testimonials.map((testimonial, i) => (
                  <motion.div
                      key={testimonial.id}
                      variants={fadeInUp}
                      className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                            <motion.span
                              key={starIndex}
                              className="text-[#00FF88] text-lg"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: starIndex * 0.1 + 0.2 }}
                              viewport={{ once: true }}
                            >
                              ★
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6 italic">
                          "{testimonial.review}"
                        </p>
                        <div className="mb-4">
                          <div className="text-sm text-gray-500 font-medium">Project:</div>
                          <div className="text-[#0056D2] font-semibold">{testimonial.project}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                          </div>
                          <motion.div 
                            className="px-3 py-1 rounded-full bg-gray-100 text-[#0056D2] text-xs font-medium"
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

        {/* CTA Section */}
        <motion.section 
          className="py-24 bg-gradient-to-r from-[#0056D2] to-[#00FF88] text-white relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Build Your Next AI Project?
            </motion.h2>
            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let's discuss your software development needs and create something amazing together.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Link 
                  to="/contact" 
                  className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2 justify-center shadow-lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Start Your Project
                  </motion.span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link 
                  to="/services" 
                  className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2 justify-center shadow-lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Our Work
                  </motion.span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}