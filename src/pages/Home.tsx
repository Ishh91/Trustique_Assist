import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import { Code, Shield, Cloud, Database, Smartphone, Globe, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
// @ts-ignore
import { AnimatedBackground } from '../components/AnimatedBackground';

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
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
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
  const featured = services.slice(0, 6);

  const technologies = [
    { name: 'React & Next.js', icon: Code },
    { name: 'Node.js & Python', icon: Cloud },
    { name: 'AWS & Azure', icon: Database },
    { name: 'Mobile Apps', icon: Smartphone },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Global Scale', icon: Globe }
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
                Tech <span className="text-gradient">Stack</span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Modern technologies we excel in
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
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
                    className="group text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                    }}
                  >
                    <motion.div 
                      className="inline-flex p-3 rounded-lg brand-gradient-bg mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm">{tech.name}</h3>
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
                Our <span className="text-gradient">Process</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Agile methodology for delivering quality software
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, threshold: 0.1 }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="group relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
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
                      <Zap className="w-12 h-12 text-[#0056D2] mx-auto" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
        <AnimatedSection className="py-24 bg-white/80 backdrop-blur-sm" id="featured-services" delay={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our <span className="text-gradient">Solutions</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Custom software solutions for your business needs
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, threshold: 0.1 }}
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
                      className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 block"
                    >
                      <motion.div 
                        className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                      <div className="relative">
                        <motion.div 
                          className={`inline-flex p-4 rounded-xl brand-gradient-bg mb-6`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="text-white" size={28} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        <motion.div 
                          className="mt-4 flex items-center text-[#0056D2] font-medium"
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
                  Why Choose <span className="text-gradient">Our Team</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We are a team of passionate developers, designers, and strategists dedicated to delivering exceptional software solutions that drive business growth.
                </p>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    'Expert developers with 5+ years experience',
                    'Agile development methodology',
                    'Continuous integration & deployment',
                    '24/7 technical support',
                    'Scalable and maintainable code',
                    'Security-first approach'
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

        {/* Testimonials */}
        <AnimatedSection id="testimonials" className="py-24 bg-white/80 backdrop-blur-sm" delay={0.4}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Client <span className="text-gradient">Reviews</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                What our clients say about working with us
              </motion.p>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, threshold: 0.1 }}
            >
              {[
                {
                  name: "Alex Johnson",
                  role: "CTO, FinTech Group",
                  review: "Trustique delivered an exceptional ERP system that streamlined our operations. Their technical expertise and attention to detail were impressive.",
                },
                {
                  name: "Sarah Chen",
                  role: "Product Manager, TechStart",
                  review: "The mobile app they developed exceeded our expectations. Great communication throughout the project and delivered ahead of schedule.",
                },
                {
                  name: "Mike Rodriguez",
                  role: "CEO, RetailChain",
                  review: "Outstanding web development services. They understood our business needs and delivered a scalable e-commerce platform that boosted our sales.",
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
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
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-[#00FF88] text-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          viewport={{ once: true }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      "{testimonial.review}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                      <motion.div 
                        className="px-3 py-1 rounded-full bg-gray-100 text-[#0056D2] text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Verified
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

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
              Ready to Build Your Next Project?
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
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
                  className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0056D2] transition-all duration-300 font-semibold"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Our Work
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}