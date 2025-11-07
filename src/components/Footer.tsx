import { Linkedin, Twitter, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  // Enhanced Link component that scrolls to top
  const SmartLink = ({ to, children, className = '' }) => {
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

  return (
    <>
      <ScrollToTopOnNavigate />
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Newsletter on Left Side */}
           

            {/* Footer Links on Right Side */}
            <div className="lg:col-span-3">
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <SmartLink to="/" className="flex items-center gap-3 mb-4 group">
                      <img 
                        src={logo} 
                        alt="Trustique Assist" 
                        className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                          Trustique
                        </h3>
                        <span className="text-blue-400 font-medium leading-tight text-sm">
                          Assist
                        </span>
                      </div>
                    </SmartLink>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      From concept to deployment, we build scalable, secure, and powerful applications 
                      that empower businesses to thrive in the digital age.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <a 
                          href="mailto:info@trustiqueassist.in" 
                          className="hover:text-blue-400 transition-colors duration-200"
                        >
                          info@trustiqueassist.in
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <a 
                          href="tel:+918112403000" 
                          className="hover:text-blue-400 transition-colors duration-200"
                        >
                          +91 8112403000
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400">
                          India
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 hover:scale-110 group"
                          aria-label={social.name}
                        >
                          <Icon size={18} className="group-hover:text-white transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h4 className="text-white font-bold text-lg mb-4">{category}</h4>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.name}>
                          <SmartLink
                            to={link.path}
                            className="hover:text-blue-400 transition-all duration-200 text-gray-400 hover:translate-x-1 inline-block text-sm"
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
             <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl p-6 border border-gray-700/50 h-full">
                <h4 className="text-white font-bold text-xl mb-3">
                  Stay Updated
                </h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Get the latest tech insights and updates delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-gray-400 text-xs mt-3 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Trustique Assist. All rights reserved.
                </p>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Proudly building in India</span>
                </div>
              </div>
              
              <div className="flex gap-6 text-sm">
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

            {/* Awards/Certifications */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-6 items-center justify-center text-xs text-gray-500">
                <span>🚀 ISO 9001 Certified</span>
                <span>🔒 GDPR Compliant</span>
                <span>⭐ 5-Star Rated Service</span>
                <span>⚡ Fast Delivery Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}