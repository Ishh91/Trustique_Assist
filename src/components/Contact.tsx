import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessWhatsApp = '918112403000'; // Remove + for URL
  const businessEmail = 'contact@trustiqueassist.in';

  const services = [
    'Web Development',
    'Mobile App Development',
    'ERP Solutions',
    'CRM Systems',
    'AI Integration',
    'Security Solutions',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format message for WhatsApp
    const whatsappMessage = `*New Contact Request From Trustique Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Interest:* ${formData.service}
*Message:* ${formData.message}

*Sent via Trustique Contact Form*`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodedMessage}`;
    
    // Also create email link as fallback
    const emailSubject = encodeURIComponent(`New Contact Request - ${formData.name}`);
    const emailBody = encodeURIComponent(whatsappMessage);
    const emailUrl = `mailto:${businessEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Optional: Also open email client
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 1000);

    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '', service: '' });
    setIsSubmitting(false);
  };

  const handleQuickWhatsApp = () => {
    const message = encodeURIComponent("Hi Trustique Team! I'm interested in your services and would like to know more.");
    window.open(`https://wa.me/${businessWhatsApp}?text=${message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-shell">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4 animate-slide-up">
            Let's Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="section-subheading">
            Ready to transform your business? Get in touch and let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="surface-card p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <motion.div 
                  className="brand-gradient-bg p-3 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <Phone className="text-white" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-text-white mb-1">Call / WhatsApp</h3>
                  <p className="text-text-muted mb-2">+91 8112403000</p>
                  <button 
                    onClick={handleQuickWhatsApp}
                    className="text-primary hover:text-primary-gradient text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <MessageCircle size={16} />
                    Start Chat
                  </button>
                </div>
              </div>
            </div>

            <div className="surface-card p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <motion.div 
                  className="brand-gradient-bg p-3 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="text-white" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-text-white mb-1">Email Us</h3>
                  <p className="text-text-muted">Info@trustiqueassist.in</p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <motion.div 
                  className="brand-gradient-bg p-3 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <MapPin className="text-white" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-text-white mb-1">Visit Our Office</h3>
                  <p className="text-text-muted">Noida, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <motion.div 
              className="brand-gradient-bg p-6 rounded-2xl text-white shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-lg mb-3">Quick Connect</h3>
              <button 
                onClick={handleQuickWhatsApp}
                className="w-full bg-white text-primary py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 mb-3 shadow-lg"
              >
                <MessageCircle size={20} />
                WhatsApp Now
              </button>
              <a 
                href={`tel:${businessWhatsApp}`}
                className="w-full border-2 border-white text-white py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Directly
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="surface-card p-6 md:p-8 shadow-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-card text-text-white placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-card text-text-white placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-card text-text-white placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="+91 XXX XXX XXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-white mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-card text-text-white placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-white mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-card text-text-white placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project requirements, timeline, and budget..."
                      required
                    ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full brand-gradient-bg text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send via WhatsApp
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  We'll connect with you on WhatsApp and email to discuss your project
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="text-center p-6 surface-card hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-primary-gradient/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary" size={24} />
            </div>
            <h3 className="font-bold text-text-white mb-2">Quick Response</h3>
            <p className="text-text-muted">We typically reply within 1-2 hours during business days</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 surface-card hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-primary-gradient/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="font-bold text-text-white mb-2">Expert Consultation</h3>
            <p className="text-text-muted">Free initial consultation with our technical experts</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 surface-card hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-primary-gradient/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary" size={24} />
            </div>
            <h3 className="font-bold text-text-white mb-2">NDA Protected</h3>
            <p className="text-text-muted">Your ideas are safe with us. We sign NDAs for all projects</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
