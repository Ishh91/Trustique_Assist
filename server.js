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

// Middleware - Dynamic CORS configuration with env support
app.use(cors({
  origin: function (origin, callback) {
    // Base allowed origins
      const staticAllowed = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://trustiqueassist21.netlify.app',
        'https://*.netlify.app',
        'https://trustiqueassist.in',
        'https://www.trustiqueassist.in',
        'https://trustiqueassist.com',
        'https://www.trustiqueassist.com'
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

// Serve static files from the dist folder (for production)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required');
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

// Portfolio Item Schema
const portfolioItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  client: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  slug: { type: String, required: true, unique: true },
  completed: { type: String },
  views: { type: String },
  liveUrl: { type: String },
}, {
  timestamps: true
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

// Service Schema
const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  iconName: { type: String, required: true }, // Store icon name as string
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  fullDescription: { type: String },
  features: { type: [String], default: [] },
  useCases: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

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
      const newTestimonial = new Testimonial({
        id: testimonial.id || (Date.now().toString() + Math.random().toString(36).substr(2, 9)),
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
    }
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
  }
}

// Seed function to seed portfolio items
async function seedPortfolio() {
  try {
    const count = await PortfolioItem.countDocuments();
    if (count > 0) {
      console.log('Portfolio collection already contains data, skipping seed.');
      return;
    }

    const initialPortfolio = [
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: 'Website & Social Media Management for NGO',
        client: 'Samvedana Mahila Utthana Samiti',
        description: 'Developing and managing the website and social media presence for Samvedana Mahila Utthana Samiti, an NGO focused on women empowerment and community development.',
        category: 'Digital Presence',
        tags: ['NGO', 'Website', 'Social Media', 'Community'],
        slug: 'website-and-social-media-management-for-samvedana-mahila-utthana-samiti',
        completed: '2024',
        views: 'Live Project',
      },
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: 'IoT-based Software Solution',
        client: 'SafeSense Tech Pvt. Ltd.',
        description: 'Developing an IoT-based software solution enabling smart automation, real-time monitoring, and data-driven decision-making.',
        category: 'IoT & Automation',
        tags: ['IoT', 'Automation', 'Monitoring', 'Data'],
        slug: 'iot-based-software-solution-for-safesense-tech-pvt-ltd',
        completed: '2024',
        views: 'Live Project',
      }
    ];

    for (const item of initialPortfolio) {
      const newItem = new PortfolioItem(item);
      await newItem.save();
    }

    console.log('✅ Portfolio items seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding portfolio:', err);
  }
}

// Seed function to seed services
async function seedServices() {
  try {
    const count = await Service.countDocuments();
    if (count > 0) {
      console.log('Services collection already contains data, skipping seed.');
      return;
    }

    const initialServices = [
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        iconName: 'Code',
        title: 'Custom Web Development',
        description: 'Bespoke website solutions engineered for peak performance, seamless user journeys, and conversion optimization.',
        color: 'from-blue-500 to-blue-600',
        slug: 'custom-web-development',
        fullDescription: 'We architect and develop custom websites that serve as powerful digital assets for your business.',
        features: ['Custom CMS development', 'E-commerce platform integration', 'API development and integration'],
        useCases: ['Corporate websites and landing pages', 'E-commerce stores and marketplaces'],
        technologies: ['React.js', 'Next.js', 'Node.js'],
      },
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        iconName: 'Smartphone',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile experiences that captivate users and drive measurable business outcomes.',
        color: 'from-purple-500 to-purple-600',
        slug: 'mobile-app-development',
        fullDescription: 'We create immersive mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
        features: ['Native iOS and Android development', 'Cross-platform React Native/Flutter apps'],
        useCases: ['Consumer-facing mobile applications', 'Enterprise productivity tools'],
        technologies: ['React Native', 'Flutter', 'Swift'],
      }
    ];

    for (const service of initialServices) {
      const newService = new Service(service);
      await newService.save();
    }

    console.log('✅ Services seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding services:', err);
  }
}

// Blog API Routes

// Get all published blog posts
app.get('/api/blog', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', tag = '' } = req.query;
    const offset = (page - 1) * limit;

    const query = { published: true };

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

    res.json(posts);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single blog post by slug
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, published: true });
    if (post) {
      return res.json(post);
    }
    res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    console.error('Error fetching blog post:', err);
    res.status(404).json({ error: 'Post not found' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
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
app.post('/api/admin/blog', authenticateAdmin, async (req, res) => {
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
app.put('/api/admin/blog/:id', authenticateAdmin, async (req, res) => {
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
app.delete('/api/admin/blog/:id', authenticateAdmin, async (req, res) => {
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
app.get('/api/admin/blog', authenticateAdmin, async (req, res) => {
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
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error('❌ Error in /api/testimonials:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single testimonial by ID
app.get('/api/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findOne({ id, isActive: true });
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (err) {
    console.error('❌ Error in /api/testimonials/:id:', err);
    res.status(500).json({ error: err.message });
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

// Portfolio API Routes
// Get all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await PortfolioItem.find().sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single portfolio item by slug
app.get('/api/portfolio/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const item = await PortfolioItem.findOne({ slug });
    if (item) {
      return res.json(item);
    }
    res.status(404).json({ error: 'Portfolio item not found' });
  } catch (err) {
    res.status(404).json({ error: 'Portfolio item not found' });
  }
});

// Admin Portfolio Routes
// Create new portfolio item
app.post('/api/admin/portfolio', authenticateAdmin, async (req, res) => {
  try {
    const { title, client, description, category, tags, completed, views, liveUrl } = req.body;
    if (!title || !client || !description || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const slug = generateSlug(title);
    const id = Date.now().toString();
    const newItem = new PortfolioItem({
      id, title, client, description, category,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [],
      slug, completed, views, liveUrl
    });
    await newItem.save();
    res.json({ id, slug, message: 'Portfolio item created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A portfolio item with this title already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Update portfolio item
app.put('/api/admin/portfolio/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client, description, category, tags, completed, views, liveUrl } = req.body;
    const updateData = {};
    if (title) { updateData.title = title; updateData.slug = generateSlug(title); }
    if (client) updateData.client = client;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags.split(',').map(t => t.trim()).filter(t => t);
    if (completed !== undefined) updateData.completed = completed;
    if (views !== undefined) updateData.views = views;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;

    const updatedItem = await PortfolioItem.findOneAndUpdate({ id }, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Portfolio item not found' });
    res.json({ message: 'Portfolio item updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete portfolio item
app.delete('/api/admin/portfolio/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await PortfolioItem.findOneAndDelete({ id });
    if (!deletedItem) return res.status(404).json({ error: 'Portfolio item not found' });
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all portfolio items (admin view)
app.get('/api/admin/portfolio', authenticateAdmin, async (req, res) => {
  try {
    const portfolio = await PortfolioItem.find().sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services API Routes
// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single service by slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug });
    if (service) {
      return res.json(service);
    }
    res.status(404).json({ error: 'Service not found' });
  } catch (err) {
    res.status(404).json({ error: 'Service not found' });
  }
});

// Admin Services Routes
// Create new service
app.post('/api/admin/services', authenticateAdmin, async (req, res) => {
  try {
    const { iconName, title, description, color, fullDescription, features, useCases, technologies } = req.body;
    if (!iconName || !title || !description || !color) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const slug = generateSlug(title);
    const id = Date.now().toString();
    const newService = new Service({
      id, iconName, title, description, color,
      slug, fullDescription,
      features: features ? features.split(',').map(f => f.trim()).filter(f => f) : [],
      useCases: useCases ? useCases.split(',').map(u => u.trim()).filter(u => u) : [],
      technologies: technologies ? technologies.split(',').map(t => t.trim()).filter(t => t) : []
    });
    await newService.save();
    res.json({ id, slug, message: 'Service created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A service with this title already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Update service
app.put('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { iconName, title, description, color, fullDescription, features, useCases, technologies } = req.body;
    const updateData = {};
    if (iconName) updateData.iconName = iconName;
    if (title) { updateData.title = title; updateData.slug = generateSlug(title); }
    if (description) updateData.description = description;
    if (color) updateData.color = color;
    if (fullDescription !== undefined) updateData.fullDescription = fullDescription;
    if (features !== undefined) updateData.features = features.split(',').map(f => f.trim()).filter(f => f);
    if (useCases !== undefined) updateData.useCases = useCases.split(',').map(u => u.trim()).filter(u => u);
    if (technologies !== undefined) updateData.technologies = technologies.split(',').map(t => t.trim()).filter(t => t);

    const updatedService = await Service.findOneAndUpdate({ id }, updateData, { new: true });
    if (!updatedService) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete service
app.delete('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findOneAndDelete({ id });
    if (!deletedService) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services (admin view)
app.get('/api/admin/services', authenticateAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
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

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    await seedTestimonials();
    await seedAdmin();
    await seedPortfolio();
    await seedServices();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📝 Blog API available at http://localhost:${PORT}/api/blog`);
      console.log(`⭐ Testimonials API available at http://localhost:${PORT}/api/testimonials`);
      console.log(`📁 Portfolio API available at http://localhost:${PORT}/api/portfolio`);
      console.log(`🔧 Services API available at http://localhost:${PORT}/api/services`);
      console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
      console.log(`📄 Frontend (production build): http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

startServer();
