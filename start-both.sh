#!/bin/bash

echo "🚀 Starting Boston Manufacturing Group - Full Stack"
echo "This will start both backend (port 8000) and frontend (port 3000)"
echo ""

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Start backend in background
echo "🔄 Starting backend server..."
./start-backend.sh &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🔄 Starting frontend server..."
./start-frontend.sh &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting up!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Keep script running
wait 