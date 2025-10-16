#!/bin/bash

echo "🚀 Starting Boston Manufacturing Group - Persistent Mode"
echo "This will run servers in the background even after closing terminal"
echo ""

# Kill any existing processes
pkill -f "uvicorn.*main:app" 2>/dev/null
pkill -f "next.*dev" 2>/dev/null
sleep 2

# Start backend in background with nohup
echo "🔄 Starting backend server (persistent)..."
cd backend
source venv/bin/activate
nohup python run.py > ../backend.log 2>&1 &
echo $! > ../backend.pid
cd ..

# Wait for backend to start
sleep 5

# Start frontend in background with nohup
echo "🔄 Starting frontend server (persistent)..."
nohup npm run dev > frontend.log 2>&1 &
echo $! > frontend.pid

echo ""
echo "✅ Both servers are running persistently!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "📋 Logs:"
echo "  - Backend: backend.log"
echo "  - Frontend: frontend.log"
echo ""
echo "🛑 To stop servers: ./stop-servers.sh"
echo "💡 Servers will keep running even if you close this terminal"

