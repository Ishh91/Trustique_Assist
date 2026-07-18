#!/bin/bash

# 🚀 Render Deployment Helper Script
# Run this after your backend is deployed on Render

echo "🚀 Render Backend Deployment Helper"
echo "=================================="

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your Render backend URL as an argument"
    echo "Usage: ./render-deploy.sh https://your-app-name.onrender.com"
    exit 1
fi

BACKEND_URL=$1
echo "📝 Using backend URL: $BACKEND_URL"

# Update frontend configuration files
echo "🔄 Updating frontend configuration..."

# Update .env.production
sed -i.bak "s|https://your-app-name.onrender.com|$BACKEND_URL|g" .env.production
echo "✅ Updated .env.production"

# Update netlify.toml
sed -i.bak "s|https://your-app-name.onrender.com|$BACKEND_URL|g" netlify.toml
echo "✅ Updated netlify.toml"

# Build the frontend
echo "🏗️  Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Test backend connectivity
echo "🧪 Testing backend connectivity..."
HEALTH_CHECK="$BACKEND_URL/health"
TESTIMONIALS_API="$BACKEND_URL/api/testimonials"

echo "Testing health endpoint: $HEALTH_CHECK"
curl -s -o /dev/null -w "%{http_code}" "$HEALTH_CHECK" | grep -q "200" && echo "✅ Health check passed" || echo "⚠️  Health check failed"

echo "Testing testimonials API: $TESTIMONIALS_API"
curl -s -o /dev/null -w "%{http_code}" "$TESTIMONIALS_API" | grep -q "200" && echo "✅ Testimonials API working" || echo "⚠️  Testimonials API failed"

# Final instructions
echo ""
echo "🎉 Deployment preparation complete!"
echo "====================================="
echo ""
echo "Next steps:"
echo "1. Deploy the 'dist' folder to Netlify"
echo "2. Update your Render backend environment variables:"
echo "   FRONTEND_URL=https://trustiqueassist.com"
echo ""
echo "3. Test the integration:"
echo "   - Visit your Netlify site"
echo "   - Check if testimonials load"
echo "   - Verify no CORS errors in console"
echo ""
echo "🔗 URLs:"
echo "   Frontend: https://trustiqueassist.com"
echo "   Backend: $BACKEND_URL"
echo "   Health: $BACKEND_URL/health"
echo "   Testimonials: $BACKEND_URL/api/testimonials"
echo ""
echo "Need help? Check RENDER_DEPLOYMENT.md for detailed instructions!"