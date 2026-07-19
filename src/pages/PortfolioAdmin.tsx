import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
  completed?: string;
  views?: string;
  liveUrl?: string;
}

const PortfolioAdmin: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    description: '',
    category: '',
    tags: '',
    completed: '',
    views: '',
    liveUrl: ''
  });
  const token = localStorage.getItem('adminToken');
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const API_URL = `${apiBase}/admin/portfolio`;

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        setEditingItem(null);
        setFormData({
          title: '',
          client: '',
          description: '',
          category: '',
          tags: '',
          completed: '',
          views: '',
          liveUrl: ''
        });
        fetchPortfolio();
      }
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      client: item.client,
      description: item.description,
      category: item.category,
      tags: item.tags.join(', '),
      completed: item.completed || '',
      views: item.views || '',
      liveUrl: item.liveUrl || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchPortfolio();
        }
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-main py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-white">Portfolio Admin</h1>
            <p className="mt-2 text-text-muted">Manage your portfolio items</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-primary to-primary-gradient text-white px-4 py-2 rounded-lg hover:shadow-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Item
          </button>
        </div>

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
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg-card divide-y divide-border-subtle">
                {portfolio.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-white">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-white">
                      {item.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-primary hover:text-primary-gradient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
            
            {portfolio.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                No portfolio items found. Create your first one!
              </div>
            )}
          </div>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowForm(false);
              setEditingItem(null);
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
                  {editingItem ? 'Edit Portfolio Item' : 'New Portfolio Item'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
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
                    Client *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">
                      Completed Year
                    </label>
                    <input
                      type="text"
                      value={formData.completed}
                      onChange={(e) => setFormData({ ...formData, completed: e.target.value })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">
                      Views Label
                    </label>
                    <input
                      type="text"
                      value={formData.views}
                      onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
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
                    {editingItem ? 'Update' : 'Create'}
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

export default PortfolioAdmin;
