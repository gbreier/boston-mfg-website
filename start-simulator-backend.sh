#!/bin/bash

# Simple script to start the simulator backend
# Run this in a separate terminal window

cd "$(dirname "$0")/simulator" || exit 1

echo "🚀 Starting Simulator Backend..."
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi

# Setup virtual environment if needed
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing/updating dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Check API key
if [ ! -f "ChatGPT.API.env" ]; then
    echo ""
    echo "⚠️  WARNING: ChatGPT.API.env not found!"
    echo "   Creating from template..."
    cp env.example ChatGPT.API.env
    echo ""
    echo "   ⚠️  IMPORTANT: Edit ChatGPT.API.env and add your OpenAI API key:"
    echo "      OPENAI_API_KEY=your_key_here"
    echo ""
    echo "   Press Enter to continue (backend will start but won't work without API key)..."
    read
fi

# Start the server
echo ""
echo "🌐 Starting backend server on http://localhost:8000"
echo "   Keep this terminal open!"
echo "   Press Ctrl+C to stop"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

python start.py

