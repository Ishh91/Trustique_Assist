import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for proper client IP detection
app.set('trust proxy', 1);

// Middleware - Dynamic CORS configuration with env support
app.use(cors({
  origin: function (origin, callback) {
    // Base allowed origins
    const staticAllowed = [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://trustiqueassist21.netlify.app',
      'https://*.netlify.app',
      'https://trustiqueassist.in',
      'https://www.trustiqueassist.in'
    ];

    // Allow adding origins via env var: CORS_ORIGINS=origin1,origin2
    const envOrigins = (process.env.CORS_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const allowedOrigins = [...staticAllowed, ...envOrigins];

    // Allow requests with no origin (mobile apps, curl, server-to-server, curl, etc.)
    if (!origin) return callback(null, true);

    // Check if origin matches any allowed pattern (supports simple wildcard like https://*.netlify.app)
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace('*', '.*');
        try {
          return new RegExp(`^${pattern}$`).test(origin);
        } catch {
          return false;
        }
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      // Do not throw errors here; let the request proceed without CORS headers
      // to avoid surfacing as HTTP 500. The browser will block disallowed origins.
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize SQLite database
const dbPath = process.env.DATABASE_URL || './blog.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create blog posts table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      featuredImage TEXT,
      author TEXT NOT NULL,
      tags TEXT,
      published BOOLEAN DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      publishedAt TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      review TEXT NOT NULL,
      project TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      featuredImage TEXT,
      isActive BOOLEAN DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, () => {
      // Seed testimonials only if the table is empty
      db.get('SELECT COUNT(*) as count FROM testimonials', (err, row) => {
        if (err) {
          console.error('Error checking testimonials count:', err);
          return;
        }
        
        if (row.count === 0) {
          console.log('Testimonials table is empty, seeding data...');
          seedTestimonials();
        } else {
          console.log('Testimonials table already contains data, skipping seed.');
        }
      });
  });
});

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function seedTestimonials() {
  fs.readFile(path.join(__dirname, 'testimonials.json'), 'utf8', (err, data) => {   
    if (err) {
      console.error('Error reading testimonials.json:', err);
      return;
    }
    try {
      const testimonials = JSON.parse(data);
      const stmt = db.prepare(
        `INSERT INTO testimonials (id, name, role, company, review, project, rating, featuredImage, isActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      db.serialize(() => {
        testimonials.forEach(testimonial => {
          const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
          stmt.run(
            id,
            testimonial.name,
            testimonial.role,
            testimonial.company,
            testimonial.review,
            testimonial.project,
            testimonial.rating,
            testimonial.featuredImage,
            testimonial.isActive
          );
        });
        stmt.finalize();
        console.log('Testimonials seeded successfully.');
      });
    } catch (parseErr) {
      console.error('Error parsing testimonials.json:', parseErr);
    }
  });
}

// Blog API Routes

// Get all published blog posts
app.get('/api/blog', (req, res) => {
  const { page = 1, limit = 10, search = '', tag = '' } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM blog_posts WHERE published = 1';
  let params = [];
  
  if (search) {
    query += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  
  if (tag) {
    query += ' AND tags LIKE ?';
    params.push(`%${tag}%`);
  }
  
  query += ' ORDER BY publishedAt DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Parse tags from JSON string
    const posts = rows.map(row => ({
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : []
    }));
    
    res.json(posts);
  });
});

// Get single blog post by slug
app.get('/api/blog/:slug', (req, res) => {
  const { slug } = req.params;
  
  db.get('SELECT * FROM blog_posts WHERE slug = ? AND published = 1', [slug], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    
    // Parse tags from JSON string
    const post = {
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : []
    };
    
    res.json(post);
  });
});

// Admin Routes (Create, Update, Delete)

// Create new blog post
app.post('/api/admin/blog', (req, res) => {
  const { title, excerpt, content, featuredImage, author, tags = [], published = false } = req.body;
  
  if (!title || !excerpt || !content || !author) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const slug = generateSlug(title);
  const id = Date.now().toString();
  const publishedAt = published ? new Date().toISOString() : null;
  const tagsJson = JSON.stringify(tags);
  
  const query = `
    INSERT INTO blog_posts (id, title, slug, excerpt, content, featuredImage, author, tags, published, publishedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [id, title, slug, excerpt, content, featuredImage, author, tagsJson, published, publishedAt], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(409).json({ error: 'A post with this title already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
      return;
    }
    
    res.json({ id, slug, message: 'Blog post created successfully' });
  });
});

// Update blog post
app.put('/api/admin/blog/:id', (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, featuredImage, author, tags = [], published = false } = req.body;
  
  const slug = title ? generateSlug(title) : undefined;
  const publishedAt = published ? new Date().toISOString() : null;
  const tagsJson = JSON.stringify(tags);
  
  const updates = [];
  const params = [];
  
  if (title) { updates.push('title = ?'); params.push(title); }
  if (excerpt) { updates.push('excerpt = ?'); params.push(excerpt); }
  if (content) { updates.push('content = ?'); params.push(content); }
  if (featuredImage !== undefined) { updates.push('featuredImage = ?'); params.push(featuredImage); }
  if (author) { updates.push('author = ?'); params.push(author); }
  if (tags) { updates.push('tags = ?'); params.push(tagsJson); }
  if (published !== undefined) { updates.push('published = ?'); params.push(published); }
  if (slug) { updates.push('slug = ?'); params.push(slug); }
  if (publishedAt !== undefined) { updates.push('publishedAt = ?'); params.push(publishedAt); }
  
  updates.push('updatedAt = CURRENT_TIMESTAMP');
  params.push(id);
  
  const query = `UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`;
  
  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    
    res.json({ message: 'Blog post updated successfully' });
  });
});

// Delete blog post
app.delete('/api/admin/blog/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM blog_posts WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    
    res.json({ message: 'Blog post deleted successfully' });
  });
});

// Get all blog posts (admin view)
app.get('/api/admin/blog', (req, res) => {
  db.all('SELECT * FROM blog_posts ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Parse tags from JSON string
    const posts = rows.map(row => ({
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : []
    }));
    
    res.json(posts);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Testimonials API Routes

// Get all active testimonials
app.get('/api/testimonials', (req, res) => {
  db.all('SELECT * FROM testimonials WHERE isActive = 1 ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json(rows);
  });
});

// Get single testimonial by ID
app.get('/api/testimonials/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM testimonials WHERE id = ? AND isActive = 1', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    
    res.json(row);
  });
});

// Admin Routes for Testimonials

// Create new testimonial
app.post('/api/admin/testimonials', (req, res) => {
  const { name, role, company, review, project, rating = 5, featuredImage } = req.body;
  
  if (!name || !role || !company || !review || !project) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const id = Date.now().toString();
  
  const query = `
    INSERT INTO testimonials (id, name, role, company, review, project, rating, featuredImage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [id, name, role, company, review, project, rating, featuredImage], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ id, message: 'Testimonial created successfully' });
  });
});

// Update testimonial
app.put('/api/admin/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const { name, role, company, review, project, rating, featuredImage, isActive } = req.body;
  
  const updates = [];
  const params = [];
  
  if (name) { updates.push('name = ?'); params.push(name); }
  if (role) { updates.push('role = ?'); params.push(role); }
  if (company) { updates.push('company = ?'); params.push(company); }
  if (review) { updates.push('review = ?'); params.push(review); }
  if (project) { updates.push('project = ?'); params.push(project); }
  if (rating !== undefined) { updates.push('rating = ?'); params.push(rating); }
  if (featuredImage !== undefined) { updates.push('featuredImage = ?'); params.push(featuredImage); }
  if (isActive !== undefined) { updates.push('isActive = ?'); params.push(isActive); }
  
  updates.push('updatedAt = CURRENT_TIMESTAMP');
  params.push(id);
  
  const query = `UPDATE testimonials SET ${updates.join(', ')} WHERE id = ?`;
  
  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    
    res.json({ message: 'Testimonial updated successfully' });
  });
});

// Delete testimonial (soft delete)
app.delete('/api/admin/testimonials/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('UPDATE testimonials SET isActive = 0 WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  });
});

// Get all testimonials (admin view)
app.get('/api/admin/testimonials', (req, res) => {
  db.all('SELECT * FROM testimonials ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json(rows);
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 Blog API available at http://localhost:${PORT}/api/blog`);
  console.log(`⭐ Testimonials API available at http://localhost:${PORT}/api/testimonials`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});