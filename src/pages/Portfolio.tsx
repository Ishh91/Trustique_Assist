import { Link } from 'react-router-dom';
import { portfolio } from '../data/portfolio';

export default function Portfolio() {
  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Selected projects that showcase our capabilities across digital presence and IoT solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((item) => (
            <div key={item.slug} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Client: {item.client}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    {item.category}
                  </span>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link to="/contact" className="brand-gradient-bg text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Discuss a Project
                  </Link>
                  <Link to="/services" className="text-[#0056D2] hover:underline text-sm font-semibold">
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}