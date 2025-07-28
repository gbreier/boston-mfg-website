#!/bin/bash

echo "🚀 Starting Boston Manufacturing Group Frontend..."

# Check if Python is available for HTTP server
if command -v python3 &> /dev/null; then
    echo "🌐 Starting frontend server on http://localhost:3000"
    echo "📍 Open http://localhost:3000 in your browser"
    echo "⚠️  Make sure the backend is running on http://localhost:8000"
    cd frontend
    python3 -m http.server 3000
elif command -v python &> /dev/null; then
    echo "🌐 Starting frontend server on http://localhost:3000"
    echo "📍 Open http://localhost:3000 in your browser"
    echo "⚠️  Make sure the backend is running on http://localhost:8000"
    cd frontend
    python -m http.server 3000
else
    echo "❌ Python is not installed."
    echo "Please install Python or use another HTTP server:"
    echo "  - Node.js: npx http-server frontend -p 3000"
    echo "  - VS Code: Use Live Server extension"
    exit 1
fi 