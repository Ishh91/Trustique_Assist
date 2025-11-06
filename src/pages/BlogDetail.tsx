import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/blog';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-6">Post not found</h2>
        <Link to="/blog" className="text-[#0056D2]">Back to Blog</Link>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 animate-slide-up">
          <Link to="/blog" className="text-[#0056D2]">← Back to Blog</Link>
        </div>
        <div className="text-sm text-gray-500 mb-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>{new Date(post.date).toLocaleDateString()}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>{post.title}</h1>
        <article className="prose max-w-none text-gray-800 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {post.content}
        </article>
        {post.tags.length > 0 && (
          <div className="mt-8 flex gap-2 flex-wrap animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {post.tags.map((t, i) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-sm border border-[#E5E5E5] text-gray-600"
                style={{ animationDelay: `${0.45 + i * 0.05}s` }}
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}