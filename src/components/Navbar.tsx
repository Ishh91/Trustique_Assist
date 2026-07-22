import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Cpu } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo.png';
import GooeyNav from './nav';
import { services as staticServices } from '../data/services';

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const location = useLocation();
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiBase}/services`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services, using static data:', error);
        // Convert static data to match the new API format
        const convertedStaticServices = staticServices.map((service, idx) => ({
          id: service.id || idx.toString(),
          iconName: service.icon.name, // Get icon name from static service's icon component
          title: service.title,
          description: service.description,
          color: service.color,
          slug: service.slug,
          fullDescription: service.fullDescription,
          features: service.features,
          useCases: service.useCases,
          technologies: service.technologies
        }));
        setServices(convertedStaticServices);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile services are open
  useEffect(() => {
    if (isMobileServicesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileServicesOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  const handleMobileServicesToggle = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  // Define navigation items for GooeyNav
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  // Determine initial active index based on current location
  const getInitialActiveIndex = () => {
    const index = navItems.findIndex(item => {
      if (item.href === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.href);
    });
    return index !== -1 ? index : 0;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-bg-card/98 backdrop-blur-2xl shadow-xl border-b border-border-subtle'
          : 'bg-transparent backdrop-blur-0 border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <motion.div
                ref={logoContainerRef}
                className="relative flex items-center justify-center p-1.5 rounded-xl"
                style={{
                  background: '#00c8d7ff',
                  boxShadow: '0 4px 20px rgba(0,200,215,0.4)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Inner glow effect - using white for contrast */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                  }}
                />

                {/* Logo background circle - using white glow */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 'calc(100% + 20px)',
                    height: 'calc(100% + 20px)',
                    left: '-10px',
                    top: '-10px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isLogoHovered ? 1.2 : 0.9,
                    opacity: isLogoHovered ? 1 : 0.6
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Dot/Glow effect behind the logo - using white and cyan blend */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 'calc(100% + 40px)',
                    height: 'calc(100% + 40px)',
                    left: '20px',
                    top: '-20px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,200,215,0.2) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isLogoHovered ? 1.2 : 0.5,
                    opacity: isLogoHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Particle effects around the logo when hovered - using white for visibility */}
                <AnimatePresence>
                  {isLogoHovered && (
                    <>
                      {[...Array(8)].map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const distance = 35;
                        return (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              width: '4px',
                              height: '4px',
                              background: i % 2 === 0 ? '#FFFFFF' : '#E0F7FA',
                              left: '50%',
                              top: '50%',
                              marginLeft: '-2px',
                              marginTop: '-2px',
                              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
                            }}
                            initial={{
                              x: 0,
                              y: 0,
                              scale: 0,
                              opacity: 0
                            }}
                            animate={{
                              x: Math.cos(angle) * distance,
                              y: Math.sin(angle) * distance,
                              scale: 1,
                              opacity: [0, 1, 0]
                            }}
                            exit={{
                              scale: 0,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.05,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </AnimatePresence>

                <img
                  src={logo}
                  alt="Trustique Assist"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain relative z-10"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.h1
                  className="text-base sm:text-lg md:text-xl font-bold text-text-white leading-tight group-hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  Trustique
                </motion.h1>
                <span className="text-[10px] sm:text-xs md:text-sm text-white font-medium leading-tight flex items-center gap-0.5 sm:gap-1">
                  <motion.span
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Cpu size={10} className="sm:hidden" />
                    <Cpu size={12} className="hidden sm:inline md:hidden" />
                    <Cpu size={14} className="hidden md:inline" />
                  </motion.span>
                  Assist
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <GooeyNav
              items={navItems}
              initialActiveIndex={getInitialActiveIndex()}
              currentPath={location.pathname}
              particleDistances={[60, 10]}
              particleCount={12}
              animationTime={500}
            />

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="ml-2 sm:ml-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary to-primary-gradient text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:from-[#0098a5] hover:to-[#35b8d9] transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
              >
                <span>Get Started</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight size={14} className="sm:hidden" />
                  <ChevronRight size={16} className="hidden sm:inline" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-500 relative overflow-hidden ${isMobileMenuOpen
                  ? 'bg-gradient-to-r from-primary/20 to-primary-gradient/20'
                  : 'hover:bg-bg-secondary'
                }`}
            >
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 w-5 sm:w-7 h-5 sm:h-7">
                <motion.span
                  animate={isMobileMenuOpen ? {
                    y: 8,
                    rotate: 45,
                    backgroundColor: '#FFFFFF'
                  } : {
                    y: 0,
                    rotate: 0,
                    backgroundColor: '#F5F7F8'
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    opacity: 0,
                    backgroundColor: '#FFFFFF'
                  } : {
                    opacity: 1,
                    backgroundColor: '#F5F7F8'
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    y: -8,
                    rotate: -45,
                    backgroundColor: '#FFFFFF'
                  } : {
                    y: 0,
                    rotate: 0,
                    backgroundColor: '#F5F7F8'
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 rounded-full"
                />
              </div>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/20 to-primary-gradient/20"
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-card/98 backdrop-blur-2xl border-b border-border-subtle overflow-y-auto max-h-[85vh] z-50"
          >
            <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-5 sm:pb-6 space-y-1.5 sm:space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 relative overflow-hidden ${isActive(link.to)
                        ? 'text-white bg-gradient-to-r from-primary/30 to-primary-gradient/30 border border-white/30'
                        : 'text-text-muted hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary-gradient/20'
                      }`}
                    onClick={handleMobileLinkClick}
                  >
                    {isActive(link.to) && (
                      <motion.div
                        layoutId="mobileActiveNav"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white to-primary-gradient rounded-r-full"
                      />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Services Dropdown */}
              <motion.div
                className="relative"
                ref={mobileDropdownRef}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.34 }}
              >
                <motion.button
                  onClick={handleMobileServicesToggle}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 text-text-muted hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary-gradient/20 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center gap-2">
                    <Cpu size={14} className={isMobileServicesOpen ? 'text-white' : 'text-text-muted'} />
                    Services
                  </span>
                  <motion.div
                    animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} className={isMobileServicesOpen ? 'text-white' : 'text-text-muted'} />
                  </motion.div>
                </motion.button>

                {/* Mobile Services Dropdown Content */}
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2 mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 overflow-hidden"
                    >
                      <div className="max-h-56 sm:max-h-64 overflow-y-auto pr-0.5 sm:pr-1">
                        {services.map((service, index) => {
                          const Icon = (Icons as Record<string, any>)[service.iconName] || Icons.Code;
                          return (
                            <motion.div
                              key={service.slug}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 5 }}
                            >
                              <Link
                                to={`/services/${service.slug}`}
                                className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 px-2.5 sm:px-3 rounded-xl sm:rounded-2xl text-text-muted hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary-gradient/20 transition-all duration-300 group border border-transparent hover:border-white/20"
                                onClick={handleMobileLinkClick}
                              >
                                <div className="flex-shrink-0">
                                  <motion.div
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-primary-gradient flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                                    whileHover={{ rotate: 10 }}
                                  >
                                    <Icon className="text-white" size={14} />
                                  </motion.div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-text-white text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                  </h4>
                                  <p className="text-text-muted text-[10px] sm:text-xs line-clamp-1 mt-0.5 group-hover:text-white/80 transition-colors duration-300">
                                    {service.description}
                                  </p>
                                </div>
                                <ChevronRight size={14} className="text-text-muted group-hover:text-white transition-colors duration-300" />
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: services.length * 0.05 + 0.15 }}
                        className="pt-2.5 sm:pt-3 border-t border-border-subtle mt-2.5 sm:mt-3"
                      >
                        <Link
                          to="/services"
                          className="block"
                          onClick={handleMobileLinkClick}
                        >
                          <motion.button
                            className="w-full bg-gradient-to-r from-primary to-primary-gradient text-white py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm mt-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Cpu size={14} />
                            View All Services
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remaining Mobile Links */}
              {[
                { label: 'Blog', to: '/blog' },
                { label: 'Careers', to: '/careers' },
                { label: 'Contact', to: '/contact' }
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.42 + index * 0.08 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 relative overflow-hidden ${isActive(link.to)
                        ? 'text-white bg-gradient-to-r from-primary/30 to-primary-gradient/30 border border-white/30'
                        : 'text-text-muted hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary-gradient/20'
                      }`}
                    onClick={handleMobileLinkClick}
                  >
                    {isActive(link.to) && (
                      <motion.div
                        layoutId="mobileActiveNav"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white to-primary-gradient rounded-r-full"
                      />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Get Started Button */}
              <motion.div
                className="pt-4 sm:pt-5 border-t border-border-subtle mt-3 sm:mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.66, type: "spring", damping: 20 }}
              >
                <Link
                  to="/contact"
                  onClick={handleMobileLinkClick}
                >
                  <motion.button
                    className="w-full bg-gradient-to-r from-primary to-primary-gradient text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Get Started</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}