import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, selectedTag]);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedTag) params.append('tag', selectedTag);
      
      const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'));
      const response = await fetch(`${apiBase}/blog?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts (${response.status})`);
      }
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response from blog list:', text.slice(0, 200));
        throw new Error('Unexpected non-JSON response from blog list');
      }
      const data = await response.json();
      setPosts(data);
      
      // Extract unique tags from posts
      const allTags = data.flatMap((post: BlogPost) => post.tags || []);
      const uniqueTags = [...new Set(allTags)];
      setAvailableTags(uniqueTags);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const seoTags = (
    <SEO 
      title="Trustique Assist Blog - Tech Insights & Guides"
      description="Explore the Trustique Assist blog for insights on web development, AI, digital transformation, software engineering, and more!"
      keywords="trustique blog, tech insights, web development guides, AI articles, digital transformation blog"
      url="https://trustiqueassist.com/blog"
    />
  );
  
  if (loading) {
    return (
      <>
        {seoTags}
        <section className="py-24 bg-bg-main">
          <div className="px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-xl text-text-muted">Loading blog posts...</div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        {seoTags}
        <section className="py-24 bg-bg-main">
          <div className="px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-xl text-red-400">{error}</div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {seoTags}
      <section className="py-24 bg-bg-main animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-white mb-4">
            Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Insights, guides, and stories from our team
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 bg-bg-card/90 border border-border-subtle p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-border-subtle bg-bg-secondary text-text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 border border-border-subtle bg-bg-secondary text-text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            {(searchTerm || selectedTag) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="px-6 py-3 bg-bg-secondary text-text-muted rounded-lg hover:bg-bg-card transition-colors border border-border-subtle"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group relative bg-bg-card/95 p-8 rounded-2xl border border-border-subtle hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 brand-gradient-soft rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-sm text-text-muted mb-2">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                </div>
                <h3 className="text-2xl font-bold text-text-white mb-3">{post.title}</h3>
                <p className="text-text-muted leading-relaxed">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary-gradient/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-primary font-medium">Read more →</div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-text-muted">No blog posts available yet.</p>
            <Link
              to="/blog-admin"
              className="inline-block mt-4 brand-gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-lg transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
