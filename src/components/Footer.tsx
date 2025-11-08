import { Linkedin, Twitter, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../img/logo.png';

// Scroll to top component for individual pages
const ScrollToTopOnNavigate = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Listen for navigation events
    const unsubscribe = () => {
      window.addEventListener('popstate', handleNavigation);
      return () => window.removeEventListener('popstate', handleNavigation);
    };

    return unsubscribe();
  }, [navigate]);

  return null;
};

// Define props for SmartLink
interface SmartLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

// Enhanced Link component that scrolls to top
const SmartLink: React.FC<SmartLinkProps> = ({ to, children, className = '' }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Only handle if it's a same-origin link
    if (to.startsWith('/')) {
      e.preventDefault();
      window.scrollTo(0, 0);
      // Navigate after scroll
      setTimeout(() => {
        window.location.href = to;
      }, 100);
    }
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
};

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const footerLinks = {
    'Solutions': [
      { name: 'Web Development', path: '/services/custom-web-development' },
      { name: 'Mobile App Development', path: '/services/mobile-app-development' },
      { name: 'Data Analytics', path: '/services/data-analytics-and-business-intelligence' },
      { name: 'AI Integration', path: '/services/ai-and-machine-learning-solutions' },
      { name: 'Cloud Solutions', path: '/services/cloud-infrastructure-and-devops' },
      { name: 'Cybersecurity', path: '/services/cybersecurity-and-compliance' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about#team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Blog', path: '/blog' },
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' }
    ]
  };

  const socialLinks = [
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/trustique-assist',
      name: 'LinkedIn'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/trustiqueassist',
      name: 'Twitter'
    },
    { 
      icon: Github, 
      href: 'https://github.com/trustique-assist',
      name: 'GitHub'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/trustique.assist',
      name: 'Instagram'
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log('Newsletter subscription');
  };

  return (
    <>
      <ScrollToTopOnNavigate />
      <footer className={`bg-gray-900 text-gray-300 ${isMobile ? 'pb-20' : ''}`}>
      
       
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Newsletter on Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl p-4 md:p-6 border border-gray-700/50 h-full">
                <h4 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-3">
                  Stay Updated
                </h4>
                <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                  Get the latest tech insights and updates delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2 md:space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-xs md:text-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-xs md:text-sm"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-gray-400 text-xs mt-2 md:mt-3 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Footer Links on Right Side */}
            <div className="lg:col-span-3">
              <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
                  <div className="flex-1">
                    <SmartLink to="/" className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 group">
                      <img 
                        src={logo} 
                        alt="Trustique Assist" 
                        className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                          Trustique
                        </h3>
                        <span className="text-blue-400 font-medium leading-tight text-xs md:text-sm">
                          Assist
                        </span>
                      </div>
                    </SmartLink>
                    
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                      From concept to deployment, we build scalable, secure, and powerful applications 
                      that empower businesses to thrive in the digital age.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Mail className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                        <a 
                          href="mailto:info@trustiqueassist.in" 
                          className="hover:text-blue-400 transition-colors duration-200 break-all"
                        >
                          info@trustiqueassist.in
                        </a>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Phone className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                        <a 
                          href="tel:+918112403000" 
                          className="hover:text-blue-400 transition-colors duration-200"
                        >
                          +91 8112403000
                        </a>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                        <span className="text-gray-400">
                          India
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 md:gap-3 mt-4 md:mt-0">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 p-2 md:p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 hover:scale-110 group"
                          aria-label={social.name}
                        >
                          <Icon size={14} className="md:w-4 md:h-4 group-hover:text-white transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h4 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">{category}</h4>
                    <ul className="space-y-1 md:space-y-2">
                      {links.map((link) => (
                        <li key={link.name}>
                          <SmartLink
                            to={link.path}
                            className="hover:text-blue-400 transition-all duration-200 text-gray-400 hover:translate-x-1 inline-block text-xs md:text-sm"
                          >
                            {link.name}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                  © {currentYear} Trustique Assist. All rights reserved.
                </p>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Proudly building in India</span>
                </div>
              </div>
              
              <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
                <SmartLink 
                  to="/privacy-policy" 
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Privacy Policy
                </SmartLink>
                <SmartLink 
                  to="/terms-of-service" 
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Terms of Service
                </SmartLink>
                <SmartLink 
                  to="/cookie-policy" 
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Cookie Policy
                </SmartLink>
              </div>
            </div>

            {/* Mobile-only India badge */}
            {isMobile && (
              <div className="flex justify-center mt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Proudly building in India</span>
                </div>
              </div>
            )}

            {/* Awards/Certifications */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-3 md:gap-6 items-center justify-center text-xs text-gray-500">
                <span className="text-xs">🚀 ISO 9001 Certified</span>
                <span className="text-xs">🔒 GDPR Compliant</span>
                <span className="text-xs">⭐ 5-Star Rated</span>
                <span className="text-xs">⚡ Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}