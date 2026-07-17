import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="section-subheading">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                className="group relative surface-card p-6 md:p-8 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Background gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-gradient/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex p-4 rounded-xl brand-gradient-bg mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-text-white mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-text-muted leading-relaxed mb-6 group-hover:text-text-white transition-colors">
                    {service.description}
                  </p>

                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-primary-gradient"
                  >
                    Learn More
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
