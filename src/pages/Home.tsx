import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRight, CheckCircle, Code, Smartphone, Globe, Database, Cloud, Zap, 
  Users, Shield, Bot, Brain, Cpu, Sparkles, MessageSquare, Mic, Server, 
  GitBranch, BarChart, Briefcase, Network, Blocks, Box, PenTool, Palette, 
  Crosshair, Share2, Image, TrendingUp, Search, Rocket, FileText, FileCheck2, 
  Users2, TrendingUp as TrendingUp2 
} from 'lucide-react';
import Hero from '../components/Hero';
import LogoLoop from '../components/logoloop';

// Testimonial interface
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  project: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simple 3D Components (included inline to avoid missing dependencies)
const Orbit3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full" />
      <div className="absolute inset-2 border-2 border-green-400/30 rounded-full" />
      <div className="absolute inset-4 border-2 border-purple-400/30 rounded-full" />
      <motion.div
        className="absolute top-1/2 left-0 w-2 h-2 bg-blue-400 rounded-full -translate-y-1/2 -translate-x-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 10 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotateY: intensity,
        rotateX: -intensity,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Lightweight 3D Tech Background Component
const Tech3DBackground: React.FC = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reduceMotion) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"></div>

      {/* Simplified animated elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-blue-400 opacity-30 text-xl font-mono pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {'</>'}
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 text-green-400 opacity-25 text-lg font-mono pointer-events-none"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        {'{ }'}
      </motion.div>

      {/* Simplified floating dots */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 pointer-events-none"
          style={{
            top: `${20 + index * 15}%`,
            left: `${15 + index * 12}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 1
          }}
        />
      ))}
    </div>
  );
};

// Floating Tech Card Component
const FloatingTechCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 3 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -intensity }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Optimized animated section
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Simple Hero component (in case imported one is missing)

// Fallback services data
const fallbackServices = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: Code
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications for iOS and Android with native performance.',
    icon: Smartphone
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
    icon: Cloud
  },
  {
    slug: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
    icon: Brain
  },
  {
    slug: 'database-design',
    title: 'Database Design',
    description: 'Optimized database architecture and management for high-performance applications.',
    icon: Database
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security-first approach to protect your applications and data.',
    icon: Shield
  }
];

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use fallback services if imported services are not available
  const featured = useMemo(() => {
    try {
      // @ts-ignore - services might not be available
      return services && services.slice ? services.slice(0, 6) : fallbackServices;
    } catch {
      return fallbackServices;
    }
  }, []);

  // Service Categories data as per the image
  const serviceCategories = useMemo(() => [
    {
      name: 'Software & AI',
      count: 8,
      services: [
        { name: 'Software Development', icon: Code },
        { name: 'Website Development', icon: Globe },
        { name: 'Mobile Applications', icon: Smartphone },
        { name: 'Artificial Intelligence', icon: Brain },
        { name: 'Machine Learning', icon: Bot },
        { name: 'Generative AI', icon: Sparkles },
        { name: 'Chatbots & AI Agents', icon: MessageSquare },
        { name: 'Voice & AI Automation', icon: Mic }
      ]
    },
    {
      name: 'Cloud, Data & Enterprise',
      count: 8,
      services: [
        { name: 'Cloud Computing', icon: Cloud },
        { name: 'Cloud Migration', icon: Server },
        { name: 'DevOps', icon: GitBranch },
        { name: 'Data Engineering', icon: Database },
        { name: 'Data Analytics & BI', icon: BarChart },
        { name: 'Enterprise Solutions', icon: Briefcase },
        { name: 'API Development', icon: Network },
        { name: 'CRM & ERP', icon: Users }
      ]
    },
    {
      name: 'Emerging Technology',
      count: 5,
      services: [
        { name: 'Blockchain & Web3', icon: Blocks },
        { name: 'AR / VR / XR', icon: Box },
        { name: 'Cyber Security', icon: Shield },
        { name: 'SaaS Development', icon: Smartphone },
        { name: 'Custom Product Dev', icon: Cpu }
      ]
    },
    {
      name: 'Design & Brand',
      count: 5,
      services: [
        { name: 'UI/UX Design', icon: PenTool },
        { name: 'Logo Design', icon: Palette },
        { name: 'Brand Identity', icon: Crosshair },
        { name: 'Social Media Design', icon: Share2 },
        { name: 'Poster & Creative Design', icon: Image }
      ]
    },
    {
      name: 'Marketing & Growth',
      count: 4,
      services: [
        { name: 'Digital Marketing', icon: TrendingUp },
        { name: 'SEO', icon: Search },
        { name: 'Performance Marketing', icon: Rocket },
        { name: 'Content Marketing', icon: FileText }
      ]
    },
    {
      name: 'Business, Legal & Funding',
      count: 4,
      services: [
        { name: 'Startup Registration', icon: Briefcase },
        { name: 'GST & Trademark', icon: FileCheck2 },
        { name: 'Business Consulting', icon: Users2 },
        { name: 'Pitch Deck Design', icon: TrendingUp2 }
      ]
    }
  ], []);

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
    }
  ], []);

  // Memoized static data
  const technologies = useMemo(() => [
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-semibold">AI & ML</span>
        </div>
      ),
      title: 'AI & ML' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Code className="w-6 h-6 text-primary" />
          <span className="font-semibold">React & Next.js</span>
        </div>
      ),
      title: 'React & Next.js' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Cloud className="w-6 h-6 text-primary" />
          <span className="font-semibold">Node.js & Python</span>
        </div>
      ),
      title: 'Node.js & Python' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Database className="w-6 h-6 text-primary" />
          <span className="font-semibold">AWS & Azure</span>
        </div>
      ),
      title: 'AWS & Azure' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Smartphone className="w-6 h-6 text-primary" />
          <span className="font-semibold">Mobile Apps</span>
        </div>
      ),
      title: 'Mobile Apps' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-semibold">Cybersecurity</span>
        </div>
      ),
      title: 'Cybersecurity' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-semibold">Global Scale</span>
        </div>
      ),
      title: 'Global Scale' 
    },
    { 
      node: (
        <div className="flex items-center gap-2 text-text-white">
          <Bot className="w-6 h-6 text-primary" />
          <span className="font-semibold">AI Automation</span>
        </div>
      ),
      title: 'AI Automation' 
    }
  ], []);

  const processSteps = useMemo(() => [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze requirements and create detailed project roadmap',
      icon: Users
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'UI/UX design and interactive prototypes',
      icon: Code
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with continuous testing',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Seamless deployment and ongoing support',
      icon: Cloud
    }
  ], []);

  const stats = useMemo(() => [
    { number: '50+', label: 'Developers' },
    { number: '200+', label: 'Projects' },
    { number: '15+', label: 'Technologies' },
    { number: '24/7', label: 'Support' }
  ], []);

  // Optimized testimonial fetch
  const fetchTestimonials = useCallback(async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiBase}/testimonials`);
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials (${response.status})`);
      }
      const data = await response.json();
      setTestimonials(data);
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

  return (
    <>
      <SEO 
        title="Trustique Assist - AI & Software Solutions Company | India"
        description="Trustique Assist: AI specialists, developers & designers delivering intelligent software solutions. Machine Learning, Web Development, Mobile Apps, Digital Transformation."
        keywords="AI solutions, software development, web development, machine learning, mobile app development, digital transformation, India, startup package, cloud solutions"
        url="https://trustiqueassist.com"
      />
      <div className="relative min-h-screen bg-bg-main">
      {/* Floating Button */}
      <button
        onClick={() => navigate('/startup-package')}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-primary-gradient text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105"
      >
        <Sparkles size={20} />
        Full Startup Package
      </button>

      {/* Content */}
      <div className="relative z-10">
        {/* Use SimpleHero if Hero component is not available */}
        <Hero />

        {/* Tech-enhanced banner */}
        <AnimatedSection className="mt-8 px-4">
          <TiltCard className="max-w-3xl mx-auto">
            <FloatingTechCard intensity={3}>
              <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border-subtle text-center shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-sm text-text-muted font-mono">Innovating with Code & AI</span>
                  <Cpu className="w-5 h-5 text-primary-gradient" />
                </div>
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-primary to-primary-gradient rounded-full mx-auto"
                  animate={{ width: ['16px', '32px', '16px'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </FloatingTechCard>
          </TiltCard>
        </AnimatedSection>

        {/* Technologies Stack */}
        <AnimatedSection className="section-shell bg-bg-card/90 backdrop-blur-sm rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="section-heading mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Tech Stack</span>
              </motion.h2>
              <motion.p
                className="section-subheading"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Cutting-edge technologies enhanced with AI
              </motion.p>
            </div>

            <div className="py-8">
              <LogoLoop
                logos={technologies}
                speed={80}
                direction="left"
                logoHeight={40}
                gap={48}
                pauseOnHover
                scaleOnHover
                fadeOut
                ariaLabel="Technology stack logos"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Development Process */}
        <AnimatedSection className="section-shell bg-gradient-to-b from-bg-secondary to-bg-card rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="section-heading mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Our</span> Process
              </motion.h2>
              <motion.p
                className="section-subheading"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent methodology for superior solutions powered by cutting-edge technology
              </motion.p>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <FloatingTechCard key={step.step} intensity={4}>
                    <motion.div
                      variants={fadeInUp}
                      className="group text-center p-6 bg-bg-card/90 backdrop-blur-sm rounded-xl border border-border-subtle shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="relative z-10">
                        <motion.div
                          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary to-primary-gradient rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {step.step}
                        </motion.div>
                        <div className="mb-4 pt-4">
                          <motion.div
                            className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary to-primary-gradient shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="text-white w-6 h-6" />
                          </motion.div>
                        </div>
                        <h3 className="text-lg font-bold text-text-white mb-3">{step.title}</h3>
                        <p className="text-text-muted text-sm">{step.description}</p>
                      </div>
                    </motion.div>
                  </FloatingTechCard>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <motion.section
          className="section-shell bg-gradient-to-r from-primary to-primary-gradient text-white rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
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
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Services */}
        {/* <AnimatedSection className="section-shell bg-bg-card/90 backdrop-blur-sm rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="section-heading mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">Our</span> Services
              </motion.h2>
              <motion.p
                className="section-subheading"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Intelligent software solutions powered by AI and cutting-edge technology
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((service: { icon: any; slug: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => {
                const Icon = service.icon;
                return (
                  <FloatingTechCard key={service.slug} intensity={4}>
                    <motion.div
                      variants={fadeInUp}
                      whileHover={{ y: -4 }}
                    >
                      <Link
                        to={`/services/${service.slug}`}
                        className="group block p-6 bg-bg-card/90 backdrop-blur-sm rounded-xl border border-border-subtle shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                      >
                        <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-primary to-primary-gradient mb-4 shadow-lg">
                          <Icon className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-text-white mb-3">{service.title}</h3>
                        <p className="text-text-muted text-sm mb-4">{service.description}</p>
                        <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
                          Learn more
                          <ArrowRight size={14} className="ml-1 group-hover:ml-2 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  </FloatingTechCard>
                );
              })}
            </div>
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-gradient text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 shadow-md"
              >
                View All Solutions
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection> */}

        {/* All Capabilities - Categorized Services */}
        <AnimatedSection className="section-shell bg-bg-main">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                  What We Build
                </span>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                One partner. Every capability
                <br />
                your business will ever need.
              </motion.h2>
              <motion.p
                className="text-text-muted max-w-3xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We don't just create websites. We create businesses — from the first registration
                to the AI running your support desk.
              </motion.p>
            </div>

            <div className="space-y-12">
              {serviceCategories.map((category, catIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-bold text-text-white">{category.name}</h3>
                    <span className="text-primary text-xs bg-bg-card/70 px-2 py-1 rounded-full border border-border-subtle">
                      {category.count} capabilities
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {category.services.map((service, servIndex) => {
                      const Icon = service.icon;
                      return (
                        <Link key={service.name} to="/services">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 + servIndex * 0.02 }}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(0, 200, 215, 0.5)' }}
                            className="flex items-center gap-3 p-4 bg-bg-card rounded-xl border border-border-subtle hover:shadow-lg transition-all duration-300 cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary-gradient/10">
                              <Icon className="text-primary w-4 h-4" />
                            </div>
                            <span className="text-text-white text-sm font-medium">
                              {service.name}
                            </span>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Why Choose Us */}
        <AnimatedSection className="section-shell bg-gradient-to-b from-bg-secondary to-bg-card rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-text-white mb-6">
                  Why Choose <span className="text-gradient">Our AI Team</span>
                </h2>
                <p className="text-text-muted mb-6">
                  We are passionate developers, AI specialists, and designers dedicated to delivering intelligent software solutions that drive real business results.
                </p>
                <div className="space-y-3">
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
                      className="flex items-center p-3 rounded-lg bg-bg-card/50 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <TiltCard>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      alt="Development Team"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection className="section-shell bg-bg-card/90 backdrop-blur-sm rounded-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="section-heading mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Client <span className="text-gradient">Success Stories</span>
              </motion.h2>
              <motion.p
                className="section-subheading"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Real feedback from our satisfied clients around the world
              </motion.p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <p className="mt-3 text-text-muted">Loading testimonials...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <FloatingTechCard key={testimonial.id} intensity={3}>
                    <motion.div
                      variants={fadeInUp}
                      className="p-6 bg-bg-card/90 backdrop-blur-sm rounded-xl border border-border-subtle shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <span key={i} className="text-primary-gradient">★</span>
                        ))}
                      </div>
                      <p className="text-text-white mb-4 italic">"{testimonial.review}"</p>
                      <div className="mb-3">
                        <div className="text-sm text-text-muted">Project:</div>
                        <div className="text-primary font-semibold">{testimonial.project}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-text-white">{testimonial.name}</div>
                          <div className="text-sm text-text-muted">{testimonial.role}, {testimonial.company}</div>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-bg-secondary text-primary text-xs font-medium border border-border-subtle">
                          Verified
                        </div>
                      </div>
                    </motion.div>
                  </FloatingTechCard>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <section className="section-shell bg-gradient-to-r from-primary to-primary-gradient text-white rounded-2xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Build Your Next AI Project?
            </motion.h2>
            <motion.p
              className="text-white/80 mb-6 text-lg"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let's discuss your software development needs and create something amazing together.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 justify-center"
              >
                <Code className="w-5 h-5" />
                Start Your Project
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold flex items-center gap-2 justify-center border border-white/30"
              >
                <Cpu className="w-5 h-5" />
                View Our Work
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}