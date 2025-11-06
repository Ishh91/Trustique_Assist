import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo.png';

// Import services directly with a fallback
let services: any[] = [];

try {
  // Try different possible import paths
  const servicesModule = require('../data/services');
  services = servicesModule.services || servicesModule.default || [];
} catch (error) {
  console.log('Services import failed, using fallback:', error);
  
  // Fallback services data in case import fails
  services = [
    {
      icon: () => <span>💻</span>,
      title: 'Web Development',
      description: 'Custom websites and web applications',
      slug: 'custom-web-development'
    },
    {
      icon: () => <span>📱</span>,
      title: 'Mobile Apps',
      description: 'iOS and Android applications',
      slug: 'mobile-app-development'
    },
    {
      icon: () => <span>🔒</span>,
      title: 'Cybersecurity',
      description: 'Security solutions and audits',
      slug: 'cybersecurity-and-compliance'
    },
    {
      icon: () => <span>🤖</span>,
      title: 'AI Solutions',
      description: 'Artificial intelligence systems',
      slug: 'ai-and-machine-learning-solutions'
    },
    {
      icon: () => <span>☁️</span>,
      title: 'Cloud Services',
      description: 'Cloud infrastructure and deployment',
      slug: 'cloud-infrastructure-and-devops'
    },
    {
      icon: () => <span>🎨</span>,
      title: 'UI/UX Design',
      description: 'User interface and experience design',
      slug: 'ux-ui-design-and-product-strategy'
    }
  ];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation links with Services positioned after About
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      } border-b border-[#E5E5E5]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo}
                alt="Trustique Assist" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Trustique</h1>
                <span className="text-sm text-[#0056D2] font-medium leading-tight">Assist</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              to="/"
              className="text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium"
            >
              About
            </Link>
            
            {/* Services Dropdown - Positioned after About */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium group relative"
              >
                Services
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    isServicesDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Our Services</h3>
                      
                      <div className="grid gap-2 max-h-96 overflow-y-auto">
                        {services.map((service, index) => {
                          const Icon = service.icon;
                          return (
                            <motion.div
                              key={service.slug}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={`/services/${service.slug}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0056D2]/5 hover:to-[#00FF88]/5 transition-all duration-200 group border border-transparent hover:border-[#0056D2]/10"
                                onClick={() => setIsServicesDropdownOpen(false)}
                              >
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-lg brand-gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <Icon className="text-white" size={18} />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#0056D2] transition-colors">
                                    {service.title}
                                  </h4>
                                  <p className="text-gray-600 text-xs line-clamp-2 mt-1">
                                    {service.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      {/* View All Services Link */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <Link
                          to="/services"
                          className="block text-center brand-gradient-bg text-white py-2.5 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-semibold"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining Links */}
            <Link
              to="/blog"
              className="text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/careers"
              className="text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium"
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium"
            >
              Contact
            </Link>

            <Link 
              to="/contact" 
              className="brand-gradient-bg text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#0056D2] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#E5E5E5] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Home Link */}
              <Link
                to="/"
                className="block text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                to="/about"
                className="block text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Services Section - Positioned after About */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
                  {services.slice(0, 6).map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="block text-gray-600 hover:text-[#0056D2] transition-colors duration-200 text-sm py-2 pl-4 border-l-2 border-gray-200 hover:border-[#0056D2]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="block text-[#0056D2] font-semibold text-sm py-2 mt-2 pl-4 border-l-2 border-[#0056D2]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>

              {/* Remaining Mobile Links */}
              <Link
                to="/blog"
                className="block text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                to="/careers"
                className="block text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>

              <Link
                to="/contact"
                className="block text-gray-700 hover:text-[#0056D2] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/contact" 
                  className="w-full brand-gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-semibold text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}