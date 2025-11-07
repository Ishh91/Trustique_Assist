import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Mail, Github, Linkedin, Twitter, Calendar, X, ExternalLink, Star, MapPin, Briefcase } from 'lucide-react';
import { teamMembers } from '../data/team';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Particle Background Component for About Page
const AboutParticleBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.body.scrollHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = Math.random() > 0.6 ? '#0056D2' : '#00FF88';
        this.alpha = Math.random() * 0.4 + 0.1;
        this.oscillation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX + Math.sin(this.oscillation) * 0.3;
        this.y += this.speedY + Math.cos(this.oscillation) * 0.3;
        this.oscillation += 0.015;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.alpha = 0.1 + Math.sin(Date.now() * 0.001 + this.x * 0.008) * 0.2;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 86, 210, ${0.08 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.3 }}
    />
  );
};

// Floating Elements Background
const AboutFloatingBackground = () => {
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    type: ['circle', 'square', 'triangle'][i % 3],
    size: Math.random() * 50 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 8
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#0056D2]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.08, 0.15],
          x: [0, -50, 0],
          y: [0, 60, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${
            shape.type === 'circle' ? 'rounded-full' : 
            shape.type === 'square' ? 'rounded-lg' : 'triangle'
          } bg-gradient-to-br from-[#0056D2]/8 to-[#00FF88]/8 backdrop-blur-sm border border-white/10`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            rotate: shape.type === 'square' ? [0, 90, 180, 270, 360] : 
                   shape.type === 'triangle' ? [0, 120, 240, 360] : 0,
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        />
      ))}

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px', '0px 0px']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 86, 210, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 86, 210, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};

// Team Member Modal Component
const TeamMemberModal = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  // Convert skills string to array
  const skillsArray = member.skills ? member.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 hover:bg-white transition-colors"
                  onClick={onClose}
                >
                  <X size={20} className="text-gray-700" />
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left Column - Image & Basic Info */}
                  <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-white p-8 rounded-l-3xl">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative inline-block"
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-2xl border-4 border-white"
                        />
                        <motion.div
                          className="absolute -bottom-2 -right-2 brand-gradient-bg rounded-full p-2 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 15 }}
                        >
                          <ExternalLink size={16} className="text-white" />
                        </motion.div>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-gray-900 mt-6 mb-2"
                      >
                        {member.name}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-[#0056D2] font-semibold mb-4"
                      >
                        {member.role}
                      </motion.p>

                      {/* Location */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-3 mb-6"
                      >
                        {member.location && (
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <MapPin size={16} />
                            <span className="text-sm">{member.location}</span>
                          </div>
                        )}
                      </motion.div>

                      {/* Social Links */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center gap-4 mb-6"
                      >
                        {member.links?.linkedin && (
                          <motion.a
                            href={member.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0056D2] hover:text-white transition-all duration-300"
                          >
                            <Linkedin size={18} />
                          </motion.a>
                        )}
                        {member.links?.github && (
                          <motion.a
                            href={member.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-300"
                          >
                            <Github size={18} />
                          </motion.a>
                        )}
                        {member.links?.email && (
                          <motion.a
                            href={`mailto:${member.links.email}`}
                            whileHover={{ scale: 1.2, y: -2 }}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Mail size={18} />
                          </motion.a>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column - Detailed Information */}
                  <div className="lg:col-span-2 p-8">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Bio */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Users size={20} className="text-[#0056D2]" />
                          About
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {member.bio || `${member.name} is a dedicated professional with expertise in their field, committed to delivering exceptional results and driving innovation forward.`}
                        </p>
                      </div>

                      {/* Skills */}
                      {skillsArray.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Star size={20} className="text-[#0056D2]" />
                            Expertise & Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, index) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                className="px-3 py-2 bg-gradient-to-r from-[#0056D2]/10 to-[#00FF88]/10 text-[#0056D2] rounded-xl text-sm font-medium border border-[#0056D2]/20 hover:shadow-md transition-shadow"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Experience */}
                      {member.experience && (
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase size={20} className="text-[#0056D2]" />
                            Experience
                          </h3>
                          <p className="text-gray-700">{member.experience}</p>
                        </div>
                      )}

                      {/* Education */}
                      {member.education && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award size={20} className="text-[#0056D2]" />
                            Education
                          </h3>
                          <p className="text-gray-700">{member.education}</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
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

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Focused on delivering measurable results that align with your business objectives.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our priority. We build lasting partnerships through trust and excellence.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'Committed to the highest standards in every project we undertake.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation First',
    description: 'Leveraging cutting-edge technology to keep you ahead of the competition.',
  },
];

export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated Backgrounds */}
      <AboutParticleBackground />
      <AboutFloatingBackground />
      
      {/* Team Member Modal */}
      <TeamMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      
      {/* Content */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                About <span className="text-gradient">Trustique Assist</span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                At Trustique Assist, we blend innovation in software with strong security expertise to deliver powerful and dependable solutions. From smart websites and intelligent apps to AI-powered ERP & CRM systems, we help organizations automate workflows and scale confidently.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Our integrated approach also spans security and facility management — including AI-powered monitoring, smart surveillance, and professional manpower services — ensuring safer, smarter, and future-ready environments.
              </motion.p>
              <motion.button 
                className="brand-gradient-bg text-white px-8 py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Calendar size={20} />
                Discover Our Story
              </motion.button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={scaleIn}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <motion.div 
                      className="brand-gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Enhanced Team Section */}
          <motion.section 
            id="team"
            className="mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-16">
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Meet Our <span className="text-gradient">Leadership & Team</span>
              </motion.h3>
              <motion.p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Click on any team member to learn more about their expertise and experience.
              </motion.p>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {teamMembers.map((member, index) => {
                // Convert skills string to array for display
                const skillsArray = member.skills ? member.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : [];
                
                return (
                  <motion.div
                    key={member.name}
                    variants={fadeInUp}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => openModal(member)}
                  >
                    <div className="absolute inset-0 brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    
                    {/* Team Member Image - Clickable */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Click Hint */}
                      <motion.div
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink size={16} className="text-gray-700" />
                      </motion.div>
                    </div>

                    {/* Team Member Info */}
                    <div className="relative z-10 p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>

                      {/* Skills Tags */}
                      {skillsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skillsArray.slice(0, 3).map((skill, skillIndex) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.1 + index * 0.05 }}
                              className="px-2 py-1 bg-gradient-to-r from-[#0056D2]/10 to-[#00FF88]/10 text-[#0056D2] rounded-full text-xs font-medium border border-[#0056D2]/20"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Click to View Text */}
                      <motion.div
                        className="flex items-center gap-2 text-[#0056D2] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Click to view profile
                        <ExternalLink size={14} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Join Team CTA - Now redirects to careers page */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/careers">
                <motion.button
                  className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 hover:border-[#0056D2] hover:text-[#0056D2] transition-all duration-300 font-medium bg-white/80 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Team
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>

          {/* Final CTA Section */}
          <motion.div 
            className="brand-gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Business?
              </motion.h3>
              <motion.p
                className="text-xl mb-8 opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Let's discuss how we can help you achieve your digital goals
              </motion.p>
              <Link to="/contact">
                <motion.button
                  className="bg-white text-[#0056D2] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-medium flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Calendar size={20} />
                  Schedule a Consultation
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}