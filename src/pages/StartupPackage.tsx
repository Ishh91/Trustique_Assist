import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function StartupPackage() {
  const navigate = useNavigate();

  const packages = useMemo(() => [
    {
      name: 'Basic',
      tagline: 'Perfect for new startups',
      features: [
        'Company Incorporation',
        'GST Registration',
        'Logo & Brand Kit',
        '5-Page Website',
        'Business Email',
        'Basic SEO Setup'
      ],
      unavailable: [
        'Mobile App',
        'CRM / ERP',
        'AI Automation'
      ],
      popular: false,
      buttonText: 'Get Started'
    },
    {
      name: 'Medium',
      tagline: 'For growing businesses',
      features: [
        'Everything in Basic',
        'Trademark Filing',
        '15-Page Website + Hosting',
        'Social Media Design (Monthly)',
        'Cloud Setup & CRM',
        'Performance Marketing',
        'Analytics Dashboard',
        'Investor Deck'
      ],
      unavailable: [],
      popular: true,
      buttonText: 'Get Started'
    },
    {
      name: 'Elite',
      tagline: 'Complete business transformation',
      features: [
        'Everything in Medium',
        'Mobile App (iOS + Android)',
        'Custom CRM / ERP',
        'AI Agents & Automation',
        'Dedicated Tech Team',
        'Investor-Ready Pitch Deck',
        'Funding Assistance',
        '24×7 Priority Support'
      ],
      unavailable: [],
      popular: false,
      buttonText: 'Get Started'
    }
  ], []);

  return (
    <>
      <SEO 
        title="Trustique Assist Full Startup Package - Launch Your Business"
        description="Launch your startup with our complete package: company registration, website, brand identity, marketing, and more. All-in-one solution for new businesses!"
        keywords="startup package, startup registration, business launch, company incorporation, website for startup"
        url="https://trustiqueassist.com/startup-package"
      />
      <div className="min-h-screen bg-bg-main py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Full Startup Package
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
            Everything a new business needs,
            <br />
            in one plan.
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Registration, brand, website, marketing, and support — bundled so you launch
            with one invoice, not fifteen.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                pkg.popular 
                  ? 'bg-bg-card border-2 border-primary shadow-2xl shadow-primary/20' 
                  : 'bg-bg-card border border-border-subtle'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-white mb-2">{pkg.name}</h3>
                <p className="text-text-muted text-sm">{pkg.tagline}</p>
              </div>

              <div className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-text-white">
                    <CheckCircle size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {pkg.unavailable.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-500 opacity-50">
                    <CheckCircle size={16} className="flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/contact')}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-primary to-primary-gradient text-white hover:shadow-lg hover:shadow-primary/30'
                    : 'bg-bg-secondary border border-border-subtle text-text-muted hover:bg-border-subtle'
                }`}
              >
                {pkg.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
