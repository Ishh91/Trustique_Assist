import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Auth configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// JWT verification middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
const PORT = process.env.PORT || 3001;

// Trust proxy for proper client IP detection
app.set('trust proxy', 1);

// Middleware - Simplified, permissive CORS for debugging
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from the dist folder (for production)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// MongoDB Connection (with graceful failure)
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
      console.error('❌ Error connecting to MongoDB:', err);
      console.log('⚠️  Continuing server startup without MongoDB— using JSON fallbacks!');
    });
} else {
  console.log('⚠️  No MONGODB_URI provided— using JSON fallbacks only!');
}

// Mongoose Schemas & Models

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String },
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, {
  timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  review: { type: String, required: true },
  project: { type: String, required: true },
  rating: { type: Number, default: 5 },
  featuredImage: { type: String },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Seed function to seed testimonials
async function seedTestimonials() {
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB not connected, skipping testimonials seed.');
    return;
  }
  try {
    const count = await Testimonial.countDocuments();
    if (count > 0) {
      console.log('Testimonials collection already contains data, skipping seed.');
      return;
    }
    
    const filePath = path.join(__dirname, 'testimonials.json');
    if (!fs.existsSync(filePath)) {
      console.log('testimonials.json not found, skipping seed.');
      return;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const testimonials = JSON.parse(data);

    for (const testimonial of testimonials) {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newTestimonial = new Testimonial({
        id,
        ...testimonial
      });
      await newTestimonial.save();
    }
    console.log('✅ Testimonials seeded successfully.');
  } catch (err) {
    console.error('❌ Error seeding testimonials:', err);
  }
}

// Seed function to create/update admin user
async function seedAdmin() {
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB not connected, skipping admin seed.');
    return;
  }
  try {
    // Get initial admin credentials from .env or use defaults
    const initialUsername = process.env.INITIAL_ADMIN_USERNAME || 'admin';
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || 'admin123';

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: initialUsername });
    
    if (existingAdmin) {
      // Verify if password matches (to avoid unnecessary updates)
      const passwordMatches = await bcrypt.compare(initialPassword, existingAdmin.password);
      
      if (passwordMatches) {
        console.log('Admin user exists and password matches, skipping seed.');
        return;
      }

      // Update password if it doesn't match
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      await Admin.updateOne(
        { username: initialUsername },
        { password: hashedPassword }
      );
      console.log('✅ Admin password updated successfully!');
      console.log('Username:', initialUsername);
      console.log('Password:', initialPassword);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      const newAdmin = new Admin({
        username: initialUsername,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log('✅ Initial admin user created successfully!');
      console.log('Username:', initialUsername);
      console.log('Password:', initialPassword);
    }
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
  }
}

// Seed data on connection
mongoose.connection.once('open', () => {
  seedTestimonials();
  seedAdmin();
});

// Blog API Routes

// Get all published blog posts
app.get('/api/blog', async (req, res) => {
  try {
    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
      const { page = 1, limit = 10, search = '', tag = '' } = req.query;
      const offset = (page - 1) * limit;

      let query = { published: true };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ];
      }

      if (tag) {
        query.tags = { $in: [tag] };
      }

      const posts = await BlogPost.find(query)
        .sort({ publishedAt: -1 })
        .limit(Number(limit))
        .skip(Number(offset));

      return res.json(posts);
    }
    // Fallback to empty array if no MongoDB
    res.json([]);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    // Fallback to empty array even if there's an error
    res.json([]);
  }
});

// Get single blog post by slug
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
      const post = await BlogPost.findOne({ slug, published: true });
      if (post) {
        return res.json(post);
      }
    }
    // Fallback to 404 if no MongoDB or no post
    res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    console.error('Error fetching blog post:', err);
    res.status(404).json({ error: 'Post not found' });
  }
});


// Middleware to check MongoDB connection for admin routes
const requireMongoDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Admin features unavailable— MongoDB not connected' });
  }
  next();
};

// Admin login endpoint
app.post('/api/admin/login', requireMongoDB, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find admin user by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token (expires in 7 days)
    const token = jwt.sign({ userId: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token });
  } catch (err) {
    console.error('❌ Error in /api/admin/login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new blog post
app.post('/api/admin/blog', authenticateAdmin, requireMongoDB, async (req, res) => {
  try {
    const { title, excerpt, content, featuredImage, author, tags = [], published = false } = req.body;

    if (!title || !excerpt || !content || !author) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const slug = generateSlug(title);
    const id = Date.now().toString();
    const publishedAt = published ? new Date() : null;

    const newPost = new BlogPost({
      id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      tags,
      published,
      publishedAt,
    });

    await newPost.save();

    res.json({ id, slug, message: 'Blog post created successfully' });
  } catch (err) {
    console.error('❌ Error in /api/admin/blog POST:', err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A post with this title already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Update blog post
app.put('/api/admin/blog/:id', authenticateAdmin, requireMongoDB, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, featuredImage, author, tags, published } = req.body;

    const updateData = {};

    if (title) {
      updateData.title = title;
      updateData.slug = generateSlug(title);
    }
    if (excerpt) updateData.excerpt = excerpt;
    if (content) updateData.content = content;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (author) updateData.author = author;
    if (tags) updateData.tags = tags;
    if (published !== undefined) {
      updateData.published = published;
      updateData.publishedAt = published ? new Date() : null;
    }

    const updatedPost = await BlogPost.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Blog post updated successfully' });
  } catch (err) {
    console.error('❌ Error in /api/admin/blog PUT:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete blog post
app.delete('/api/admin/blog/:id', authenticateAdmin, requireMongoDB, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findOneAndDelete({ id });
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('❌ Error in /api/admin/blog DELETE:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all blog posts (admin view)
app.get('/api/admin/blog', authenticateAdmin, requireMongoDB, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('❌ Error in /api/admin/blog GET:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Testimonials API Routes

// Get all active testimonials
app.get('/api/testimonials', async (req, res) => {
  console.log('✅ /api/testimonials called');
  try {
    // First try to read the JSON file directly for reliability
    const fallbackPath = path.join(__dirname, 'testimonials.json');
    console.log('Looking for testimonials.json at:', fallbackPath);
    if (fs.existsSync(fallbackPath)) {
      const fallbackData = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
      console.log('Returning testimonials from JSON file');
      return res.json(fallbackData);
    }
    // If no JSON file, try MongoDB
    if (mongoose.connection.readyState === 1) {
      const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
      if (testimonials.length > 0) {
        return res.json(testimonials);
      }
    }
    // If neither, return empty array
    res.json([]);
  } catch (err) {
    console.error('❌ Error in /api/testimonials:', err);
    // Last resort: return empty array
    res.json([]);
  }
});

// Get single testimonial by ID
app.get('/api/testimonials/:id', async (req, res) => {
  console.log('✅ /api/testimonials/:id called, id:', req.params.id);
  try {
    const { id } = req.params;
    // First try JSON file
    const fallbackPath = path.join(__dirname, 'testimonials.json');
    if (fs.existsSync(fallbackPath)) {
      const fallbackData = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
      const testimonial = fallbackData.find(t => t.id === id && t.isActive);
      if (testimonial) {
        console.log('Returning testimonial from JSON file');
        return res.json(testimonial);
      }
    }
    // Then try MongoDB
    if (mongoose.connection.readyState === 1) {
      const testimonial = await Testimonial.findOne({ id, isActive: true });
      if (testimonial) {
        return res.json(testimonial);
      }
    }
    res.status(404).json({ error: 'Testimonial not found' });
  } catch (err) {
    console.error('❌ Error in /api/testimonials/:id:', err);
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

// Admin Routes for Testimonials - Protected

// Create new testimonial
app.post('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const { name, role, company, review, project, rating = 5, featuredImage } = req.body;

    if (!name || !role || !company || !review || !project) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = Date.now().toString();
    const newTestimonial = new Testimonial({
      id,
      name,
      role,
      company,
      review,
      project,
      rating,
      featuredImage,
    });
    await newTestimonial.save();

    res.json({ id, message: 'Testimonial created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update testimonial
app.put('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete testimonial (soft delete)
app.delete('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      { id },
      { isActive: false },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all testimonials (admin view)
app.get('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all middleware for client-side routing (must come after API routes)
app.use((req, res, next) => {
  // Only handle GET requests for non-API routes
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      // In development, just pass through (Vite dev server will handle it)
      next();
    }
  } else {
    // For API routes or other methods, pass to next middleware
    next();
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 Blog API available at http://localhost:${PORT}/api/blog`);
  console.log(`⭐ Testimonials API available at http://localhost:${PORT}/api/testimonials`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
  console.log(`📄 Frontend (production build): http://localhost:${PORT}`);
});
