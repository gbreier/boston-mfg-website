#!/usr/bin/env python3
"""
Boston Manufacturing Group Backend Server
Run this script to start the API server
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("🚀 Starting Boston Manufacturing Group API Server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📚 API documentation at: http://localhost:8000/docs")
    print("🔄 Auto-reload enabled for development")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 