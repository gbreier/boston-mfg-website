# MySimulator Integration Guide

The AI Supply Chain Simulator has been integrated into the Boston Manufacturing Group website and is accessible at `/MySimulator`.

## Architecture

The simulator is integrated as follows:

1. **Frontend**: HTML files are served from `/public/MySimulator/`
2. **API Routes**: Next.js API routes at `/api/MySimulator/[...path]` proxy requests to the Python FastAPI backend
3. **Main Page**: Next.js page at `/pages/MySimulator/index.js` redirects to the login page

## Access Points

- **Web URL**: `https://www.boston-mfg.com/MySimulator` (or `http://localhost:3000/MySimulator` in development)
- **Login Page**: `/MySimulator/login.html`
- **API Endpoints**: `/api/MySimulator/*` (proxies to Python backend)

## How It Works

1. User visits `/MySimulator` → Redirects to `/MySimulator/login.html`
2. User logs in → Redirects to `/MySimulator/index.html`
3. Frontend makes API calls to `/api/disruption-analysis`, etc.
4. `api-config.js` intercepts these calls and routes them to `/api/MySimulator/disruption-analysis`
5. Next.js API route proxies the request to the Python backend at `http://localhost:8000/api/disruption-analysis`
6. Response is returned to the frontend

## Setup

### Development

1. **Start the Python Backend**:
   ```bash
   cd simulator
   python start.py
   ```
   The backend should run on `http://localhost:8000`

2. **Start Next.js**:
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:3000`

3. **Access the Simulator**:
   - Visit `http://localhost:3000/MySimulator`
   - Or click "Launch AI Analysis Tool" from the `/ai-analysis` page

### Production

For production deployment, you have two options:

#### Option 1: Keep Python Backend (Recommended for now)

1. Deploy the Python backend separately (e.g., on a VPS, Heroku, or similar)
2. Set the `SIMULATOR_BACKEND_URL` environment variable in your Next.js deployment:
   ```
   SIMULATOR_BACKEND_URL=https://your-backend-url.com
   ```
3. Deploy Next.js as usual

#### Option 2: Convert to Next.js API Routes (Future)

Convert the Python FastAPI endpoints to Next.js API routes for a fully serverless deployment. This would require:
- Converting Python logic to JavaScript/Node.js
- Moving helper functions to Next.js API routes
- Updating dependencies

## Files Structure

```
Boston-mfg/
├── pages/
│   ├── MySimulator/
│   │   └── index.js          # Next.js page (redirects to login)
│   └── api/
│       └── MySimulator/
│           └── [...path].js   # API proxy route
├── public/
│   └── MySimulator/           # Simulator frontend files
│       ├── login.html
│       ├── index.html
│       ├── api-config.js       # API routing configuration
│       └── ...
└── simulator/                  # Python backend (for development)
    ├── backend/
    ├── frontend/               # Original files (backup)
    └── start.py
```

## API Configuration

The `api-config.js` file automatically intercepts all API calls from the simulator frontend and routes them through Next.js:

- `/api/find-supplier` → `/api/MySimulator/find-supplier`
- `/api/disruption-analysis` → `/api/MySimulator/disruption-analysis`
- etc.

## Environment Variables

- `SIMULATOR_BACKEND_URL`: URL of the Python backend (default: `http://localhost:8000`)
- `OPENAI_API_KEY`: Required in the Python backend's `ChatGPT.API.env` file

## Troubleshooting

### Simulator not loading
- Check that the Python backend is running on port 8000
- Verify `SIMULATOR_BACKEND_URL` is set correctly
- Check browser console for API errors

### API calls failing
- Ensure the Python backend is accessible
- Check that `api-config.js` is loaded (check Network tab)
- Verify the API proxy route is working: `/api/MySimulator/model-modes`

### Login not working
- Check that `/MySimulator/login.html` is accessible
- Verify sessionStorage is enabled in the browser
- Default credentials: username: `SCuser`, password: `bmg`

## Future Improvements

1. **Convert Python to Node.js**: For better Vercel/serverless compatibility
2. **Add Authentication**: Integrate with Next.js auth system
3. **Optimize Loading**: Convert HTML to React components for better performance
4. **Error Handling**: Better error messages when backend is unavailable

