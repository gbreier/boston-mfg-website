# 🚀 Production Deployment Guide

## Quick Start: Deploy in 10 Minutes

### **Option A: Vercel + Railway (Recommended)**

#### 1. **Deploy Frontend to Vercel (FREE)**
```bash
# 1. Push to GitHub (if not already done)
git add .
git commit -m "Prepare for production deployment"
git push origin main

# 2. Go to vercel.com → Sign up with GitHub
# 3. Click "New Project" → Import your repository
# 4. Vercel auto-deploys your Next.js app!
```

**Environment Variables in Vercel:**
```
NEXT_PUBLIC_API_URL=https://your-app-name.up.railway.app
```

#### 2. **Deploy Backend to Railway ($5/month)**
```bash
# 1. Go to railway.app → Sign up
# 2. "Deploy from GitHub" → Select your repository
# 3. Railway auto-detects FastAPI backend
```

**Environment Variables in Railway:**
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
BMG_EMAIL=contact@boston-mfg.com
PORT=8000
```

#### 3. **Connect Frontend to Backend**
- Copy your Railway backend URL (e.g., `https://your-app.up.railway.app`)
- Add it as `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Redeploy frontend in Vercel

---

### **Option B: Railway for Both (Single Platform)**

1. **Deploy to Railway:**
   - Go to railway.app → New Project
   - Connect GitHub repository
   - Railway creates two services automatically

2. **Configure Environment:**
   ```
   # Backend service:
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=contact@boston-mfg.com
   SMTP_PASSWORD=your-app-password
   BMG_EMAIL=contact@boston-mfg.com
   
   # Frontend service:
   NEXT_PUBLIC_API_URL=https://backend-service-url
   ```

**Cost:** ~$10/month

---

### **Option C: DigitalOcean App Platform**

1. **Create App:**
   - Go to digitalocean.com/apps
   - Connect GitHub repository
   - Auto-detects Next.js + FastAPI

2. **Configure Services:**
   - Frontend: Node.js service
   - Backend: Python service
   - Database: Optional PostgreSQL

**Cost:** $12-25/month

---

## 🔧 **Email Setup for Production**

### **Gmail Setup (Recommended):**
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
3. Use this password in your environment variables

### **Alternative: SendGrid (Professional)**
```bash
# More reliable for high-volume emails
pip install sendgrid
```

---

## 🧪 **Testing Your Deployment**

### **Test Checklist:**
- [ ] Website loads at production URL
- [ ] Contact form submits successfully
- [ ] Email notifications work
- [ ] All pages navigate correctly
- [ ] Static assets (images/videos) load

### **Test Contact Form:**
```bash
curl -X POST "https://your-backend-url.com/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "company": "Test Co",
    "title": "Manager",
    "inquiry": "manufacturing-consulting",
    "message": "Test message",
    "consent": true
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for your inquiry! We'll respond within 24-48 hours."
}
```

---

## 🎯 **Quick Deploy Commands**

### **For Vercel:**
```bash
npm install -g vercel
vercel --prod
```

### **For Railway:**
```bash
npm install -g @railway/cli
railway login
railway deploy
```

---

## ✅ **Benefits of Production Deployment**

1. **99.9% Uptime** - No more backend stopping
2. **Global CDN** - Fast worldwide loading
3. **SSL/HTTPS** - Secure by default
4. **Auto-scaling** - Handles traffic spikes
5. **Professional Email** - Reliable form submissions
6. **Custom Domain** - boston-mfg.com
7. **Analytics** - Built-in performance monitoring

---

## 🆘 **Need Help?**

**Common Issues:**
- **API not connecting:** Check NEXT_PUBLIC_API_URL environment variable
- **Emails not sending:** Verify SMTP credentials in backend
- **Build errors:** Check Node.js/Python versions

**Quick Fix:**
```bash
# Test locally first:
npm run build  # Test frontend build
cd backend && python run.py  # Test backend
```

Your website will be live 24/7 with professional hosting! 🎉 