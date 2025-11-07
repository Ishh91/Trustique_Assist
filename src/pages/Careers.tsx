import { Briefcase, MapPin, Clock, Users, ArrowRight, Sparkles, Award, Heart, Zap, Globe, Star, CheckCircle, Code, Palette, Cloud, MessageCircle, LucideIcon, Mail, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationForm from '../components/ApplicationForm';

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

export default function Careers() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Scroll to open roles section
  const scrollToOpenRoles = () => {
    const element = document.getElementById('open-roles');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Copy email to clipboard
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('hr@trustiqueassist.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openRoles = [
    {
      id: 'frontend-engineer',
      title: 'Frontend Engineer (React)',
      location: 'Remote / India',
      type: 'Full-time',
      dept: 'Engineering',
      experience: '2-5 years',
      salary: '₹8-15 LPA',
      tags: ['React', 'TypeScript', 'TailwindCSS', 'Next.js', 'Redux'],
      description: 'Build beautiful, performant user interfaces for our enterprise clients. Work with modern React ecosystem and collaborate with design team.',
      requirements: ['3+ years React experience', 'Strong JavaScript/TypeScript', 'Experience with state management', 'Responsive design skills']
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer (Node.js)',
      location: 'Remote / India',
      type: 'Full-time',
      dept: 'Engineering',
      experience: '3-6 years',
      salary: '₹10-18 LPA',
      tags: ['Node.js', 'API Design', 'MongoDB', 'PostgreSQL', 'AWS'],
      description: 'Design and develop scalable backend systems and APIs. Work on microservices architecture and cloud infrastructure.',
      requirements: ['Node.js & Express.js', 'Database design skills', 'REST/GraphQL APIs', 'Cloud platform experience']
    },
    {
      id: 'product-designer',
      title: 'Product Designer (UI/UX)',
      location: 'Hybrid / Mumbai',
      type: 'Full-time',
      dept: 'Design',
      experience: '2-4 years',
      salary: '₹6-12 LPA',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing'],
      description: 'Create intuitive and beautiful user experiences. Conduct user research and translate insights into design solutions.',
      requirements: ['Portfolio required', 'Figma expertise', 'User-centered design', 'Prototyping skills']
    },
    {
      id: 'marketing-specialist',
      title: 'Digital Marketing Specialist',
      location: 'Hybrid / Bengaluru',
      type: 'Full-time',
      dept: 'Marketing',
      experience: '1-3 years',
      salary: '₹5-9 LPA',
      tags: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media', 'PPC'],
      description: 'Drive growth through digital channels. Create and execute marketing campaigns across multiple platforms.',
      requirements: ['SEO/SEM experience', 'Content creation', 'Analytics proficiency', 'Social media management']
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      location: 'Remote / India',
      type: 'Full-time',
      dept: 'Engineering',
      experience: '3-5 years',
      salary: '₹12-20 LPA',
      tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      description: 'Build and maintain our cloud infrastructure. Automate deployment processes and ensure system reliability.',
      requirements: ['Containerization expertise', 'Cloud platform experience', 'Infrastructure as Code', 'Monitoring tools']
    },
    {
      id: 'sales-executive',
      title: 'Sales Executive',
      location: 'Hybrid / Delhi',
      type: 'Full-time',
      dept: 'Sales',
      experience: '1-3 years',
      salary: '₹4-8 LPA + Commission',
      tags: ['B2B Sales', 'Client Acquisition', 'CRM', 'Negotiation', 'Communication'],
      description: 'Drive business growth by acquiring new clients and managing relationships with enterprise customers.',
      requirements: ['Sales experience', 'Excellent communication', 'CRM knowledge', 'Target-driven mindset']
    },
    {
      id: 'ai-ml-engineer',
      title: 'AI/ML Engineer',
      location: 'Remote / India',
      type: 'Full-time',
      dept: 'Engineering',
      experience: '3-6 years',
      salary: '₹15-25 LPA',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP'],
      description: 'Develop cutting-edge AI solutions and machine learning models. Work on NLP, computer vision, and predictive analytics projects.',
      requirements: ['Strong Python skills', 'ML framework experience', 'Statistical modeling', 'Data preprocessing expertise']
    },
    {
      id: 'customer-success-manager',
      title: 'Customer Success Manager',
      location: 'Hybrid / Mumbai',
      type: 'Full-time',
      dept: 'Customer Success',
      experience: '2-4 years',
      salary: '₹7-12 LPA + Bonus',
      tags: ['Client Relations', 'Account Management', 'CRM', 'Customer Support', 'Retention'],
      description: 'Ensure client satisfaction and success with our products. Build strong relationships and drive customer retention.',
      requirements: ['Customer-facing experience', 'Problem-solving skills', 'CRM proficiency', 'Excellent communication']
    }
  ];

  const benefits = [
    { 
      icon: Award, 
      title: 'Competitive Compensation', 
      desc: 'Industry-leading salaries with performance bonuses and ESOP options for key roles.' 
    },
    { 
      icon: Zap, 
      title: 'Flexible Work Culture', 
      desc: 'Hybrid & remote options with flexible hours and results-oriented work environment.' 
    },
    { 
      icon: Globe, 
      title: 'Global Opportunities', 
      desc: 'Work with international clients and potential for global assignments and conferences.' 
    },
    { 
      icon: Heart, 
      title: 'Health & Wellness', 
      desc: 'Comprehensive health insurance, mental wellness programs, and paid time off.' 
    },
    { 
      icon: Users, 
      title: 'Learning & Development', 
      desc: 'Annual learning budget, mentorship programs, and sponsored certifications.' 
    },
    { 
      icon: Star, 
      title: 'Career Growth', 
      desc: 'Clear growth paths, quarterly reviews, and opportunities for rapid advancement.' 
    }
  ];

  const stats = [
    { number: '50+', label: 'Team Members' },
    { number: '15+', label: 'Countries Served' },
    { number: '200+', label: 'Projects Delivered' },
    { number: '4.8★', label: 'Client Rating' }
  ];

  // Role icons mapping
  const roleIcons = {
    'frontend-engineer': Code,
    'backend-engineer': Cloud,
    'product-designer': Palette,
    'marketing-specialist': MessageCircle,
    'devops-engineer': Cloud,
    'sales-executive': Users,
    'ai-ml-engineer': Zap,
    'customer-success-manager': Users
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#0056D2]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#0056D2] px-4 py-2 rounded-full mb-6 border border-white/20 shadow-lg"
            >
              <Sparkles size={16} />
              <span className="text-sm font-medium">Join a mission-driven team</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Build Your Career at{' '}
              <span className="text-gradient bg-gradient-to-r from-[#0056D2] to-[#00FF88] bg-clip-text text-transparent">
                Trustique
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Join us in building the future of digital solutions. Work on challenging projects, 
              learn from industry experts, and grow your career in a supportive environment.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={scrollToOpenRoles}
                className="brand-gradient-bg text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                Explore {openRoles.length} Open Roles
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => {
                  setSelectedRoleId('');
                  setIsFormOpen(true);
                }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-[#0056D2] hover:text-[#0056D2] transition-all duration-300 font-semibold"
              >
                General Application
              </button>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions ({openRoles.length} Roles)
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our current openings and find the perfect role to match your skills and ambitions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {openRoles.map((role, index) => {
              const Icon = (roleIcons as Record<string, LucideIcon>)[role.id] || Briefcase;
              return (
                <motion.div
                  key={role.id}
                  variants={fadeInUp}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <div className="absolute inset-0 brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  
                  <div className="relative z-10 p-6">
                    {/* Role Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl brand-gradient-bg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0056D2] transition-colors">
                            {role.title}
                          </h3>
                          <p className="text-sm text-gray-600">{role.dept}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {role.type}
                      </span>
                    </div>

                    {/* Role Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-[#0056D2]" />
                        <span className="text-sm">{role.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} className="text-[#0056D2]" />
                        <span className="text-sm">{role.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award size={16} className="text-[#0056D2]" />
                        <span className="text-sm font-medium text-gray-900">{role.salary}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {role.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {role.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gradient-to-r from-[#0056D2]/10 to-[#00FF88]/10 text-[#0056D2] rounded-full text-xs font-medium border border-[#0056D2]/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {role.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{role.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedRoleId(role.id);
                          setIsFormOpen(true);
                        }}
                        className="text-[#0056D2] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300 hover:text-[#0044a8]"
                      >
                        Apply Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-gray-500 text-sm">Posted recently</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Match Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Don't see the perfect role?
              </h3>
              <p className="text-gray-600 mb-4">
                We're always looking for talented people. Send us your resume and we'll contact you when a matching position opens up.
              </p>
              <button
                onClick={() => {
                  setSelectedRoleId('');
                  setIsFormOpen(true);
                }}
                className="brand-gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                Submit General Application
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Trustique?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We invest in our team's growth and well-being with comprehensive benefits and a supportive culture.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={scaleIn}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl brand-gradient-bg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HR Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch with HR
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our hiring process or want to discuss career opportunities? 
              Our HR team is here to help.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#0056D2] to-[#00FF88] rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <div className="space-y-2">
                      <div 
                        onClick={copyEmailToClipboard}
                        className="cursor-pointer group"
                      >
                        <p className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                          hr@trustiqueassist.in
                        </p>
                        <p className="text-white/70 text-xs mt-1">
                          {copiedEmail ? '✓ Copied to clipboard!' : 'Click to copy'}
                        </p>
                      </div>
                    </div>
                    <a 
                      href="mailto:hr@trustiqueassist.in"
                      className="inline-block mt-4 bg-white text-[#0056D2] px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Send Email
                    </a>
                  </motion.div>

                  {/* Quick Response */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
                    <p className="text-white/90 text-sm mb-4">
                      We typically respond to all career inquiries within 24-48 hours
                    </p>
                    <div className="text-white/70 text-xs">
                      Mon - Fri, 9AM - 6PM IST
                    </div>
                  </motion.div>

                  {/* Application Support */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Application Support</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Need help with your application? We're here to assist you through the process.
                    </p>
                    <div className="text-white/70 text-xs">
                      Resume reviews & interview prep
                    </div>
                  </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white/80 text-sm">
                    Prefer to apply via email? Send your resume and cover letter to{' '}
                    <span 
                      onClick={copyEmailToClipboard}
                      className="font-semibold cursor-pointer hover:text-white transition-colors"
                    >
                      hr@trustiqueassist.in
                    </span>
                    {' '}with the position title in the subject line.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="brand-gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Start Your Journey?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              >
                Join our team of innovators and help us build the future of digital solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={() => {
                    setSelectedRoleId('');
                    setIsFormOpen(true);
                  }}
                  className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </button>
                <a
                  href="mailto:hr@trustiqueassist.in"
                  className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#0056D2] transition-all duration-300 font-semibold"
                >
                  Email HR Team
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Modal */}
      <ApplicationForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        availableRoles={openRoles.map(role => ({ 
          id: role.id, 
          title: role.title, 
          department: role.dept,
          experience: role.experience,
          location: role.location
        }))}
        selectedRoleId={selectedRoleId}
      />
    </div>
  );
}