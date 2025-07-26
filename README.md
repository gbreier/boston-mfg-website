# Boston Manufacturing Group - Full Stack Application

A complete separation of the original Next.js Boston Manufacturing Group website into a **Python FastAPI backend** and **JavaScript frontend**, maintaining exact functionality and performance.

## 🏗️ Architecture

### Backend (Python + FastAPI)
- **FastAPI** for high-performance API endpoints
- **Static file serving** for images and videos  
- **CORS support** for cross-origin requests
- **Auto-generated API documentation** at `/docs`
- **Structured data models** matching original content

### Frontend (Vanilla JavaScript)
- **Pure JavaScript** for maximum performance
- **Client-side routing** for SPA functionality
- **Tailwind CSS** for consistent styling
- **Responsive design** matching original layout
- **API-driven** content loading

## 🚀 Quick Start

### Option 1: Start Everything at Once
```bash
chmod +x start-both.sh
./start-both.sh
```

### Option 2: Start Servers Separately

**Terminal 1 - Backend:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
chmod +x start-frontend.sh  
./start-frontend.sh
```

## 📍 Access Points

- **Website**: http://localhost:3000
- **API Server**: http://localhost:8000  
- **API Documentation**: http://localhost:8000/docs
- **Interactive API Docs**: http://localhost:8000/redoc

## 📁 Project Structure

```
Boston-mfg/
├── backend/                # Python FastAPI backend
│   ├── main.py            # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── run.py            # Server startup script
│   └── README.md         # Backend documentation
├── frontend/              # JavaScript frontend
│   ├── index.html        # Main HTML file
│   ├── js/               # JavaScript modules
│   │   ├── api.js        # API service
│   │   ├── router.js     # Client-side routing
│   │   ├── components.js # Page components
│   │   └── main.js       # App controller
│   └── README.md         # Frontend documentation
├── public/               # Static assets (images, videos)
├── start-backend.sh      # Backend startup script
├── start-frontend.sh     # Frontend startup script
├── start-both.sh         # Combined startup script
└── README.md            # This file
```

## 🔧 Manual Setup

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend
python3 -m http.server 3000
# OR use any other HTTP server
```

## 🌟 Features Preserved

All original functionality has been exactly preserved:

- ✅ **Home page** with hero video, services, team profiles, testimonials
- ✅ **About page** with five-phase approach and leadership bios  
- ✅ **Sourcing page** with capabilities and process details
- ✅ **Reports page** with article listings
- ✅ **Individual report pages** with full content
- ✅ **Responsive design** for all screen sizes
- ✅ **Navigation** between all pages
- ✅ **Contact information** and external links
- ✅ **SEO meta tags** and page titles
- ✅ **Smooth scrolling** for anchor links

## 🎨 Styling

Maintains the exact same visual design using Tailwind CSS:
- **Primary Color**: `#c1272d` (BMG Red)
- **Secondary Color**: `#2a4e7e` (BMG Blue)
- **Accent Color**: `#3a3a3a` (Dark Gray)
- **Background**: `#ffffff` (White)

## 🔌 API Endpoints

- `GET /api/home` - Home page data
- `GET /api/about` - About page data
- `GET /api/sourcing` - Sourcing page data  
- `GET /api/reports` - Reports listing
- `GET /api/reports/{report_id}` - Individual report
- `GET /static/*` - Static assets

## 🛠️ Development

### Backend Development
- FastAPI with hot reload enabled
- API documentation auto-generated
- Static file serving from `/public` directory
- CORS configured for frontend communication

### Frontend Development
- No build process required
- Direct file serving
- Real-time updates on refresh
- Client-side routing with history API

## 📋 Requirements

- **Python 3.8+** for backend
- **Modern web browser** for frontend
- **HTTP server** for frontend serving (Python built-in works)

## 🚨 Notes

- Backend must be running on port 8000 before starting frontend
- Frontend expects backend API at `http://localhost:8000`
- All static assets are served from the backend at `/static/` prefix
- Original performance characteristics are maintained

## 📝 License

Same as original Boston Manufacturing Group website. 