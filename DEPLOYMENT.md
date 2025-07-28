# Deployment Guide

This guide covers deploying the Boston Manufacturing Group application to production environments.

## 🏗️ Architecture

- **Backend**: FastAPI Python application
- **Frontend**: Static HTML/CSS/JavaScript files
- **Assets**: Static images and videos served by backend

## 🌐 Production Deployment Options

### Option 1: Traditional Server (VPS/Dedicated)

#### Backend Deployment
```bash
# 1. Clone repository
git clone <repository-url>
cd Boston-mfg

# 2. Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Install production server
pip install gunicorn

# 4. Run with Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

#### Frontend Deployment
```bash
# Serve frontend with Nginx
sudo apt install nginx

# Copy frontend files to web directory
sudo cp -r frontend/* /var/www/html/

# Configure Nginx (see nginx.conf example below)
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Static assets served by backend
    location /static/ {
        proxy_pass http://localhost:8000;
    }
}
```

### Option 2: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .
COPY public/ ../public/

EXPOSE 8000
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]
```

#### Frontend Dockerfile
```dockerfile
FROM nginx:alpine

COPY frontend/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8000:8000"
    
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Option 3: Cloud Platform Deployment

#### Heroku
```bash
# Backend (separate app)
heroku create bmg-api
git subtree push --prefix=backend heroku main

# Frontend (separate app)  
heroku create bmg-frontend
# Add buildpack for static sites
heroku buildpacks:add heroku-buildpack-static
git subtree push --prefix=frontend heroku main
```

#### Vercel/Netlify (Frontend only)
- Deploy frontend as static site
- Update API base URL to point to backend deployment

#### AWS/GCP/Azure
- Backend: Deploy to Container Service or App Engine
- Frontend: Deploy to Static Hosting (S3, Cloud Storage)
- Configure CDN for static assets

## 🔒 Security Considerations

### Backend Security
```python
# Update main.py for production
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Restrict CORS origins in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],  # Specific domains only
    allow_credentials=True,
    allow_methods=["GET"],  # Only needed methods
    allow_headers=["*"],
)
```

### Environment Variables
```bash
# Backend environment variables
export ENVIRONMENT=production
export API_HOST=0.0.0.0
export API_PORT=8000
export CORS_ORIGINS=https://your-domain.com
```

### Frontend Configuration
```javascript
// Update js/api.js for production
class API {
    constructor(baseURL = 'https://api.your-domain.com') {  // Production API URL
        this.baseURL = baseURL;
    }
    // ... rest of the code
}
```

## 📊 Performance Optimization

### Backend Optimizations
```bash
# Install production dependencies
pip install gunicorn uvloop httptools

# Run with optimizations
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app \
  --bind 0.0.0.0:8000 \
  --worker-class uvicorn.workers.UvicornWorker \
  --max-requests 1000 \
  --max-requests-jitter 100
```

### Frontend Optimizations
- Enable Nginx gzip compression
- Set proper cache headers for static assets
- Use CDN for static files
- Minify JavaScript (optional, already lightweight)

## 🔍 Monitoring

### Health Checks
Add to backend `main.py`:
```python
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
```

### Logging
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add to endpoints
logger.info(f"API request: {request.url}")
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] CORS origins restricted to production domains
- [ ] Static assets accessible via backend `/static/` route
- [ ] Frontend API URL updated to production backend
- [ ] SSL/HTTPS certificates configured
- [ ] Health checks implemented
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Domain DNS configured

## 🔄 CI/CD Pipeline Example

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Deploy backend to your server
          
      - name: Deploy Frontend  
        run: |
          # Deploy frontend to your server
```

## 📝 Notes

- Test deployment in staging environment first
- Keep development and production configurations separate
- Monitor performance and errors after deployment
- Set up automated backups for any persistent data 