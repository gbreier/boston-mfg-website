#!/bin/bash

echo "🚀 Starting Boston Manufacturing Group Frontend (Next.js)..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the Next.js development server
echo "🌐 Starting Next.js server on http://localhost:3000"
echo "📍 Open http://localhost:3000 in your browser"
echo "⚠️  Make sure the backend is running on http://localhost:8000"
npm run dev 