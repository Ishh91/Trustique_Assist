import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, Shield } from 'lucide-react';

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
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            Let's Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch and let's build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-xl">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Call / WhatsApp</h3>
                  <p className="text-gray-600 mb-2">+91 8112403000</p>
                  <button 
                    onClick={handleQuickWhatsApp}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <MessageCircle size={16} />
                    Start Chat
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-xl">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">Info@trustiqueassist.in</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-xl">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Visit Our Office</h3>
                  <p className="text-gray-600">Noida, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl text-white">
              <h3 className="font-bold text-lg mb-3">Quick Connect</h3>
              <button 
                onClick={handleQuickWhatsApp}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle size={20} />
                WhatsApp Now
              </button>
              <a 
                href={`tel:${businessWhatsApp}`}
                className="w-full border border-white text-white py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Directly
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      placeholder="+91 XXX XXX XXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your project requirements, timeline, and budget..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </button>

                <p className="text-center text-sm text-gray-500">
                  We'll connect with you on WhatsApp and email to discuss your project
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 animate-slide-up">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-gray-600">We typically reply within 1-2 hours during business days</p>
          </div>

          <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Expert Consultation</h3>
            <p className="text-gray-600">Free initial consultation with our technical experts</p>
          </div>

          <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">NDA Protected</h3>
            <p className="text-gray-600">Your ideas are safe with us. We sign NDAs for all projects</p>
          </div>
        </div>
      </div>
    </section>
  );
}