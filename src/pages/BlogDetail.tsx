import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'));
      const response = await fetch(`${apiBase}/blog/${slug}`);
      if (!response.ok) {
        throw new Error(`Post not found (${response.status})`);
      }
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response from blog detail:', text.slice(0, 200));
        throw new Error('Unexpected non-JSON response from blog detail');
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
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
        
        {post.featuredImage && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="text-sm text-gray-500 mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()} • {post.author}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {post.title}
        </h1>
        
        <article className="prose max-w-none text-gray-800 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </article>
        
        {post.tags.length > 0 && (
          <div className="mt-8 flex gap-2 flex-wrap animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {post.tags.map((tag, i) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm border border-[#E5E5E5] text-gray-600"
                style={{ animationDelay: `${0.55 + i * 0.05}s` }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}