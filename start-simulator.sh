#!/bin/bash

# Startup script for the AI Supply Chain Simulator
# This script starts the simulator backend server

echo "🚀 Starting AI Supply Chain Simulator..."
echo ""

# Change to simulator directory
cd "$(dirname "$0")/simulator" || exit 1

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed or not in PATH"
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Check for API key file
if [ ! -f "ChatGPT.API.env" ]; then
    echo "⚠️  Warning: ChatGPT.API.env not found"
    echo "   Please create this file with your OPENAI_API_KEY"
    if [ -f "env.example" ]; then
        echo "   You can copy env.example as a template: cp env.example ChatGPT.API.env"
        echo "   Then edit ChatGPT.API.env and add your OPENAI_API_KEY"
    fi
fi

# Start the server
echo ""
echo "🌐 Starting server on http://localhost:8000"
echo "   Press Ctrl+C to stop the server"
echo ""

python start.py

