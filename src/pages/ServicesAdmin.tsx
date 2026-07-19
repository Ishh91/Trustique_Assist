import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  color: string;
  slug: string;
  fullDescription?: string;
  features?: string[];
  useCases?: string[];
  technologies?: string[];
}

const ServicesAdmin: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    iconName: 'Code',
    title: '',
    description: '',
    color: 'from-blue-500 to-blue-600',
    fullDescription: '',
    features: '',
    useCases: '',
    technologies: ''
  });
  const token = localStorage.getItem('adminToken');
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const API_URL = `${apiBase}/admin/services`;

  // Available icons for selection
  const availableIcons = [
    'Code', 'Smartphone', 'Cpu', 'BarChart', 'Zap', 'Shield',
    'Database', 'PenTool', 'Briefcase', 'MessageCircle', 'Target',
    'Package', 'Cloud', 'Users', 'ShoppingCart', 'Search', 'Mail',
    'Instagram', 'Layers', 'Globe'
  ];

  const availableColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-yellow-500 to-yellow-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600',
    'from-cyan-500 to-blue-500'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingService ? `${API_URL}/${editingService.id}` : API_URL;
      const method = editingService ? 'PUT' : 'POST';
      
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
        setEditingService(null);
        setFormData({
          iconName: 'Code',
          title: '',
          description: '',
          color: 'from-blue-500 to-blue-600',
          fullDescription: '',
          features: '',
          useCases: '',
          technologies: ''
        });
        fetchServices();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      iconName: service.iconName,
      title: service.title,
      description: service.description,
      color: service.color,
      fullDescription: service.fullDescription || '',
      features: (service.features || []).join(', '),
      useCases: (service.useCases || []).join(', '),
      technologies: (service.technologies || []).join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchServices();
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-main py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-white">Services Admin</h1>
            <p className="mt-2 text-text-muted">Manage your services</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-primary to-primary-gradient text-white px-4 py-2 rounded-lg hover:shadow-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Service
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
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg-card divide-y divide-border-subtle">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-white">{service.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {service.iconName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color}`}></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-primary hover:text-primary-gradient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
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
            
            {services.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                No services found. Create your first one!
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
              setEditingService(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-bg-card rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-white">
                  {editingService ? 'Edit Service' : 'New Service'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                  }}
                  className="text-text-muted hover:text-text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">
                      Icon *
                    </label>
                    <select
                      required
                      value={formData.iconName}
                      onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">
                      Color *
                    </label>
                    <select
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {availableColors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                </div>

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
                    Short Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={5}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Use Cases (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.useCases}
                    onChange={(e) => setFormData({ ...formData, useCases: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-bg-secondary text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingService(null);
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
                    {editingService ? 'Update' : 'Create'}
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

export default ServicesAdmin;
