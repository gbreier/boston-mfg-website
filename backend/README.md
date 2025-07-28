# Boston Manufacturing Group - Backend API

Python FastAPI backend server that provides API endpoints for the Boston Manufacturing Group website.

## Features

- **FastAPI**: Modern, fast web framework for building APIs
- **Static File Serving**: Serves images and videos from the original `/public` directory
- **CORS Support**: Enables cross-origin requests from the frontend
- **API Documentation**: Auto-generated docs at `/docs`
- **Hot Reload**: Development server with auto-reload on code changes

## Setup

1. **Install Python 3.8+**
   ```bash
   python --version  # Should be 3.8 or higher
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Server**
   ```bash
   python run.py
   ```

   Or manually:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## API Endpoints

- `GET /` - API info and version
- `GET /api/home` - Home page data
- `GET /api/about` - About page data  
- `GET /api/sourcing` - Sourcing page data
- `GET /api/reports` - Reports listing
- `GET /api/reports/{report_id}` - Individual report data
- `GET /static/*` - Static files (images, videos, etc.)

## Development

- Server runs on `http://localhost:8000`
- API documentation available at `http://localhost:8000/docs`
- Interactive API docs at `http://localhost:8000/redoc`

## Static Files

Static assets (images, videos) are served from `../public/` directory and accessible via `/static/` URL prefix.

## Data Structure

All page data is structured to match the original Next.js implementation, ensuring exact functionality preservation. 