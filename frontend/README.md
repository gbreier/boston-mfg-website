# Boston Manufacturing Group - Frontend

JavaScript frontend application that consumes the Python backend API to render the Boston Manufacturing Group website.

## Features

- **Vanilla JavaScript**: No complex frameworks, pure JS for maximum performance
- **Client-Side Routing**: Single-page application with URL routing
- **Tailwind CSS**: Same styling as original with CDN integration
- **Responsive Design**: Mobile-first responsive layout
- **API Integration**: Consumes backend API endpoints
- **SEO Friendly**: Dynamic meta tags and page titles

## Architecture

- `index.html` - Main HTML file with Tailwind CSS setup
- `js/api.js` - API service for backend communication
- `js/router.js` - Client-side routing system
- `js/components.js` - Page rendering components
- `js/main.js` - Application controller and initialization

## Setup

1. **Start the Backend Server**
   Make sure the Python backend is running on `http://localhost:8000`

2. **Serve the Frontend**
   You can use any HTTP server. Here are a few options:

   **Option 1: Python HTTP Server**
   ```bash
   cd frontend
   python -m http.server 3000
   ```

   **Option 2: Node.js HTTP Server**
   ```bash
   cd frontend
   npx http-server -p 3000
   ```

   **Option 3: Live Server (VS Code Extension)**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` and select "Open with Live Server"

3. **Access the Application**
   Open `http://localhost:3000` in your browser

## Pages

- `/` - Home page with hero, services, team, testimonials
- `/about` - About page with five-phase approach
- `/sourcing` - Sourcing capabilities and process
- `/reports` - Reports listing
- `/reports/{report-id}` - Individual report pages

## Development

- Frontend runs on `http://localhost:3000` (or your chosen port)
- Backend API must be running on `http://localhost:8000`
- No build process required - direct HTML/JS/CSS serving
- Changes are reflected immediately on page refresh

## Styling

Uses Tailwind CSS via CDN with the exact same color scheme and design as the original:
- Primary: `#c1272d` (BMG Red)
- Secondary: `#2a4e7e` (BMG Blue)  
- Accent: `#3a3a3a` (Dark Gray)
- Background: `#ffffff` (White)

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with responsive design 