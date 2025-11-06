# Backend Hosting Guide

## 🚀 Production Deployment Instructions

### **Backend API Endpoints**

**Base URL**: `http://localhost:3001` (replace with your hosted URL)

**Available Endpoints:**

#### Blog API
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `POST /api/admin/blog` - Create new blog post (admin)
- `PUT /api/admin/blog/:id` - Update blog post (admin)
- `DELETE /api/admin/blog/:id` - Delete blog post (admin)

#### Testimonials API
- `GET /api/testimonials` - Get all active testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/admin/testimonials` - Create testimonial (admin)
- `PUT /api/admin/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/admin/testimonials/:id` - Soft delete testimonial (admin)

#### Health Check
- `GET /health` - Server health status

### **Environment Variables**

Create a `.env` file with:
```
PORT=3001
NODE_ENV=production
DATABASE_URL=./blog.db
FRONTEND_URL=https://your-frontend-domain.com
```

### **Database**
- SQLite database file: `blog.db`
- Auto-creates tables on startup
- Includes blog_posts and testimonials tables

### **CORS Configuration**
- Configured for your frontend domain
- Supports credentials
- Health endpoint available for monitoring

### **Sample Testimonials Data**
Your backend now includes 3 sample testimonials:
- Sarah Johnson (CEO, Tech Innovations Inc)
- Michael Chen (CTO, DataFlow Systems)
- Emily Rodriguez (Product Manager, InnovateTech)

### **Deployment Commands**
```bash
# Install dependencies
npm install

# Start production server
npm start

# Or start with nodemon for development
npm run server:dev
```

### **Testing**
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test testimonials API
curl http://localhost:3001/api/testimonials

# Test blog API
curl http://localhost:3001/api/blog
```

**Status**: ✅ Backend is ready for hosting!