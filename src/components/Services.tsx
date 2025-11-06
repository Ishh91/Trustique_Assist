import { Link } from 'react-router-dom';
import { services } from '../data/services';

// Define an array of different dark hover colors
const hoverColors = [
  'from-blue-700/20 to-blue-800/20',
  'from-green-700/20 to-green-800/20',
  'from-purple-700/20 to-purple-800/20',
  'from-red-700/20 to-red-800/20',
  'from-amber-700/20 to-amber-800/20',
  'from-pink-700/20 to-pink-800/20',
  'from-indigo-700/20 to-indigo-800/20',
  'from-emerald-700/20 to-emerald-800/20',
  'from-orange-700/20 to-orange-800/20',
  'from-rose-700/20 to-rose-800/20',
  'from-cyan-700/20 to-cyan-800/20',
  'from-violet-700/20 to-violet-800/20'
];

// Darker solid colors for icons
const iconColors = [
  'from-blue-700 to-blue-800',
  'from-green-700 to-green-800',
  'from-purple-700 to-purple-800',
  'from-red-700 to-red-800',
  'from-amber-700 to-amber-800',
  'from-pink-700 to-pink-800',
  'from-indigo-700 to-indigo-800',
  'from-emerald-700 to-emerald-800',
  'from-orange-700 to-orange-800',
  'from-rose-700 to-rose-800',
  'from-cyan-700 to-cyan-800',
  'from-violet-700 to-violet-800'
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const hoverColor = hoverColors[index % hoverColors.length];
            const iconColor = iconColors[index % iconColors.length];
            
            return (
              <div
                key={service.title}
                className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-[#E5E5E5] hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${hoverColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>

                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-[#0056D2] font-medium flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-blue-700"
                  >
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}