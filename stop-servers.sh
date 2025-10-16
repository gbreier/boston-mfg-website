#!/bin/bash

echo "🛑 Stopping Boston Manufacturing Group servers..."

# Stop backend
if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    echo "Stopping backend (PID: $BACKEND_PID)..."
    kill $BACKEND_PID 2>/dev/null || true
    rm backend.pid
fi

# Stop frontend
if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    echo "Stopping frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID 2>/dev/null || true
    rm frontend.pid
fi

# Force kill any remaining processes on our ports
echo "Cleaning up any remaining processes..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "python main.py" 2>/dev/null || true

echo "✅ All servers stopped"

