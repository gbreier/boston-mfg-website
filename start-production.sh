#!/bin/bash

echo "🚀 Starting Boston Manufacturing Group - Production Mode"
echo "This will start both backend and frontend in production mode"
echo ""

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    pkill -f "uvicorn.*main:app" 2>/dev/null
    pkill -f "next.*dev" 2>/dev/null
    pkill -f "npm.*run.*dev" 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup INT TERM

# Start backend in background
echo "🔄 Starting backend server..."
cd backend
source venv/bin/activate
python run.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 5

# Start frontend in background
echo "🔄 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running and wait for processes
wait $BACKEND_PID $FRONTEND_PID