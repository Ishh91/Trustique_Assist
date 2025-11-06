import { Link } from 'react-router-dom';
import { posts } from '../data/blog';

export default function Blog() {
  return (
    <section className="py-24 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, guides, and stories from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-[#E5E5E5] hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 text-[#0056D2] font-medium">Read more →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}