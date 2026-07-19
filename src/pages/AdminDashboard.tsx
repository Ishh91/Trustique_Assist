import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, MessageSquare, LogOut, Briefcase, Code } from 'lucide-react';
import BlogAdmin from './BlogAdmin';
import TestimonialsAdmin from './TestimonialsAdmin';
import PortfolioAdmin from './PortfolioAdmin';
import ServicesAdmin from './ServicesAdmin';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Check if user is authenticated
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!token) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <header className="bg-bg-card shadow-sm border-b border-border-subtle">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-text-white">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-text-muted hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-bg-card shadow-sm border-b border-border-subtle">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'blog'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-white hover:border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blog Posts
              </div>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'testimonials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-white hover:border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Testimonials
              </div>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-white hover:border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Portfolio
              </div>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'services'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-white hover:border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Services
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'blog' && <BlogAdmin />}
          {activeTab === 'testimonials' && <TestimonialsAdmin />}
          {activeTab === 'portfolio' && <PortfolioAdmin />}
          {activeTab === 'services' && <ServicesAdmin />}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
