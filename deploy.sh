#!/bin/bash

# Backend Deployment Script
# This script helps deploy your backend to various platforms

echo "🚀 Backend Deployment Helper"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production values"
fi

# Test the server
echo "🧪 Testing server..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test health endpoint
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Server is running and healthy"
else
    echo "❌ Server health check failed"
fi

# Kill the test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 Backend is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Choose your hosting platform (Railway, Render, Vercel)"
echo "2. Follow the instructions in HOSTING_GUIDE.md"
echo "3. Update your .env file with production values"
echo "4. Deploy your backend!"
echo ""
echo "📚 Documentation:"
echo "- HOSTING_GUIDE.md - Step-by-step hosting guide"
echo "- BACKEND_DEPLOYMENT.md - Detailed backend info"