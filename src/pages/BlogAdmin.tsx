import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

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

const BlogAdmin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: '',
    tags: '',
    published: false
  });

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const API_URL = `${apiBase}/admin/blog`;
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const url = editingPost ? `${API_URL}/${editingPost.id}` : API_URL;
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingPost(null);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          featuredImage: '',
          author: '',
          tags: '',
          published: false
        });
        fetchPosts();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: post.author,
      tags: post.tags.join(', '),
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handlePublishToggle = async (post: BlogPost) => {
    try {
      const response = await fetch(`${API_URL}/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ published: !post.published }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-white">Blog Admin</h1>
              <p className="mt-2 text-text-muted">Manage your blog posts</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-primary-gradient text-white px-4 py-2 rounded-lg hover:shadow-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-8 text-text-muted">Loading...</div>
        ) : (
          <div className="bg-bg-card rounded-lg shadow overflow-hidden border border-border-subtle">
            <table className="min-w-full divide-y divide-border-subtle">
              <thead className="bg-bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg-card divide-y divide-border-subtle">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-white">{post.title}</div>
                      <div className="text-sm text-text-muted">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published
                          ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                          : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePublishToggle(post)}
                          className="text-primary hover:text-primary-gradient"
                        >
                          {post.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-primary hover:text-primary-gradient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {posts.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                No blog posts found. Create your first post!
              </div>
            )}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-white">
                  {editingPost ? 'Edit Post' : 'New Post'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                  }}
                  className="text-text-muted hover:text-text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="technology, web development, react"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-border-subtle rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-text-white">
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPost(null);
                    }}
                    className="px-4 py-2 border border-border-subtle rounded-lg text-text-muted hover:bg-bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-primary to-primary-gradient text-white rounded-lg hover:shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingPost ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;