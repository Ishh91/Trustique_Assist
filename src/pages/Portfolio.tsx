import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Eye, Code, Smartphone, Globe, Database, Users, Calendar, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { portfolio as staticPortfolio } from '../data/portfolio';

type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
  completed?: string;
  views?: string;
  liveUrl?: string;
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

// Category icons mapping
const categoryIcons = {
  'Website': Globe,
  'E-commerce': Smartphone,
  'Corporate': Users,
  'IoT': Database,
  'IoT & Automation': Database,
  'Digital Presence': Target,
  'Web Application': Code
};

// Animated Particle Background Component

// Floating Shapes Background

// Animated Background Orbs

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiBase}/portfolio`);
        if (!response.ok) throw new Error('Failed to fetch portfolio');
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio, using static data:', error);
        // Use static data as fallback
        setPortfolio(staticPortfolio);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <>
      <SEO 
        title="Trustique Assist Portfolio - Our Projects & Case Studies"
        description="Explore Trustique Assist's portfolio of web development, mobile apps, AI solutions, and digital transformation projects. See our work and success stories!"
        keywords="trustique assist portfolio, case studies, web development portfolio, mobile app portfolio, AI projects"
        url="https://trustiqueassist.com/portfolio"
      />
      <div className="pt-24 min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-bg-main overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 relative z-10">
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
              Our <span className="text-gradient">Portfolio</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed"
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
                className="btn-primary rounded-full"
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/services" 
                className="btn-secondary rounded-full"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 relative z-10 section-shell">
        <div className="px-4 sm:px-6 lg:px-8">
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
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center surface-card p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-text-muted font-medium">{stat.label}</div>
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
              const CategoryIcon = (categoryIcons as Record<string, typeof Globe>)[item.category] || Globe;
              
              return (
                <motion.div
                  key={item.slug}
                  variants={fadeInUp}
                  className="group relative surface-card shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
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
                          <h3 className="text-2xl font-bold text-text-white group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                            <Users size={14} />
                            Client: {item.client}
                          </p>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <motion.span 
                        className="px-4 py-2 rounded-full brand-gradient-soft text-primary border border-primary/20 text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.category}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-text-muted leading-relaxed text-lg mb-6">
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
                          className="px-3 py-2 bg-bg-secondary text-text-muted rounded-xl text-sm font-medium border border-border-subtle hover:shadow-md transition-shadow duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Calendar size={16} />
                        <span>Completed: {item.completed || '2024'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Eye size={16} />
                        <span>{item.views || 'Live Project'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link 
                        to="/contact" 
                        className="flex-1 btn-primary rounded-xl text-center flex items-center justify-center gap-2 group/btn"
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
                          className="px-4 py-3 border-2 border-border-subtle text-text-muted hover:border-primary hover:text-primary transition-all duration-300 font-semibold flex items-center gap-2 rounded-xl"
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
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none"
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
            <div className="brand-gradient-bg rounded-3xl p-12 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with cutting-edge technology and innovative solutions.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/contact" 
                    className="bg-white text-primary px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2"
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
                    className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-semibold"
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
    </>
  );
}