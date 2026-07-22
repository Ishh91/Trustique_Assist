import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

// Animation variants
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
  return (
    <>
      <SEO 
        title="About Trustique Assist"
        description="Learn about Trustique Assist's mission, values. We deliver AI-powered software solutions, web development, mobile apps, and digital transformation."
        keywords="about trustique assist, software solutions, AI solutions"
        url="https://trustiqueassist.com/about"
      />
      <div className="relative min-h-screen">
        {/* Content */}
        <section className="relative z-10 section-shell">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Main About Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="section-heading mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  About <span className="text-gradient">Trustique Assist</span>
                </motion.h2>
                <motion.p
                  className="text-base md:text-lg text-text-muted mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  At Trustique Assist, we blend innovation in software with strong security expertise to deliver powerful and dependable solutions. From smart websites and intelligent apps to AI-powered ERP & CRM systems, we help organizations automate workflows and scale confidently.
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-text-muted mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Our integrated approach also spans security and facility management — including AI-powered monitoring, smart surveillance, and professional manpower services — ensuring safer, smarter, and future-ready environments.
                </motion.p>
                <motion.button
                  className="btn-primary rounded-xl"
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
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      variants={scaleIn}
                      className="surface-card p-6 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <motion.div
                        className="brand-gradient-bg w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="text-white" size={24} />
                      </motion.div>
                      <h3 className="text-lg font-bold text-text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Final CTA Section */}
            <motion.div
              className="brand-gradient-bg rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl"
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
                    className="bg-white text-primary px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-medium flex items-center gap-2 mx-auto"
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
    </>
  );
}
