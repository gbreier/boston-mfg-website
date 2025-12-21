#!/usr/bin/env python3
"""
Startup script for the Supply Chain Simulator backend.
"""

import uvicorn
import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

from backend.config import settings


def main():
    """Start the FastAPI server with configuration from settings."""
    
    # Check if OpenAI API key is set
    if not settings.openai_api_key:
        print("⚠️  Warning: OPENAI_API_KEY not set. Please set it in ChatGPT.API.env")
        print("   The application may not function properly without an API key.")
    
    print(f"🚀 Starting Supply Chain Simulator backend...")
    print(f"   Host: {settings.host}")
    print(f"   Port: {settings.port}")
    print(f"   Debug: {settings.debug}")
    print(f"   OpenAI Model: {settings.openai_model}")
    print(f"")
    print(f"🌐 Application will be available at:")
    print(f"   ➤ http://localhost:{settings.port}")
    print(f"   ➤ http://127.0.0.1:{settings.port}")
    print(f"")
    
    # Start the server
    uvicorn.run(
        "backend.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info"
    )


if __name__ == "__main__":
    main() 