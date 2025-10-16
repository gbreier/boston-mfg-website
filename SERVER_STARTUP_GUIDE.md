# 🚀 Server Startup Guide

## Quick Start (Recommended)

To run your website independently of Cursor:

```bash
./start-production.sh
```

This will:
- ✅ Start both backend and frontend servers in the background
- ✅ Keep running even if you close Cursor
- ✅ Save process IDs and logs for monitoring
- ✅ Automatically handle port conflicts

## Stop Servers

```bash
./stop-servers.sh
```

## Current Server Status

After starting, your servers will be available at:
- **Frontend**: http://localhost:3000+ (Next.js picks available port)
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Monitor Servers

View real-time logs:
```bash
# Backend logs
tail -f backend.log

# Frontend logs  
tail -f frontend.log
```

Check if servers are running:
```bash
# Check backend
curl http://localhost:8000/docs

# Check frontend (replace 3000 with actual port)
curl http://localhost:3000
```

## Email Configuration

Your contact form is configured with:
- ✅ Gmail SMTP: `contact@boston-mfg.com`
- ✅ SSL/TLS properly configured
- ✅ Backup logging to files

## Troubleshooting

**If servers won't start:**
1. Run `./stop-servers.sh` first
2. Check logs: `tail -20 backend.log` or `tail -20 frontend.log`
3. Manually kill processes: `pkill -f "next dev" && pkill -f "python main.py"`
4. Try starting again: `./start-production.sh`

**Port conflicts:**
- Frontend automatically finds available ports (3000, 3001, 3002, etc.)
- Backend uses port 8000 (will error if occupied)

## Production Deployment

For production deployment, see:
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `vercel.json` - Vercel deployment configuration

