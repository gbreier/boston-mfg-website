#!/usr/bin/env python3
"""
Custom HTTP server for Single Page Application
Serves index.html for all routes to enable client-side routing
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash and decode
        if path.startswith('/'):
            path = path[1:]
        
        # If it's a file request (has extension) or is empty, serve normally
        if path == '' or '.' in os.path.basename(path):
            return super().do_GET()
        
        # For all other paths (like /sourcing, /about), serve index.html
        self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    PORT = 3000
    
    print(f"🌐 Starting SPA server on http://localhost:{PORT}")
    print(f"📍 Frontend supports direct URLs like /sourcing, /about, etc.")
    print(f"⚠️  Make sure the backend is running on http://localhost:8000")
    
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🔄 Server stopped")
            httpd.shutdown() 