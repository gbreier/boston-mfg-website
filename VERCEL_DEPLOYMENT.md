# 🚀 Vercel + Railway Deployment Guide

Since you're already using Vercel and Wix, here's how to deploy your Boston Manufacturing Group website professionally.

## Why Vercel + Railway vs Wix?

**Advantages over Wix:**
- ✅ **Working contact form** (impossible to replicate in Wix)
- ✅ **Faster performance** (Next.js optimization)
- ✅ **Professional SEO** (better than Wix)
- ✅ **Custom functionality** (your specific business needs)
- ✅ **No monthly Wix fees** (Vercel frontend is free)

## 🎯 Deployment Strategy

### Phase 1: Deploy Backend (Railway - $5/month)
### Phase 2: Deploy Frontend (Vercel - FREE)
### Phase 3: Connect Domain & Test

---

## 📋 Step-by-Step Instructions

### **Step 1: Prepare for Deployment**

```bash
# 1. Commit your current changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### **Step 2: Deploy Backend to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "Deploy from GitHub"**
4. **Select your repository**
5. **Railway will auto-detect the FastAPI backend**

**Add these Environment Variables in Railway:**
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=contact@boston-mfg.com
SMTP_PASSWORD=your-gmail-app-password
BMG_EMAIL=contact@boston-mfg.com
PORT=8000
```

6. **Copy your Railway backend URL** (e.g., `https://bmg-backend-production.up.railway.app`)

### **Step 3: Deploy Frontend to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your repository**
5. **Vercel auto-detects Next.js and deploys!**

**Add this Environment Variable in Vercel:**
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url
```

6. **Redeploy** after adding the environment variable

### **Step 4: Custom Domain (Optional)**

**If you want to use boston-mfg.com:**
1. **In Vercel Dashboard** → Your Project → Settings → Domains
2. **Add your domain:** `boston-mfg.com`
3. **Update DNS** at your domain registrar to point to Vercel

---

## 🔧 Email Setup for Production

### **Gmail App Password Setup:**
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to:** Google Account Settings → Security → 2-Step Verification
3. **Generate App Password:** Select "Mail" → Copy the password
4. **Use this password** as `SMTP_PASSWORD` in Railway

---

## ✅ Final Result

After deployment, you'll have:

- 🌐 **Frontend:** `https://your-project.vercel.app` (or your custom domain)
- 🔧 **Backend:** `https://your-app.up.railway.app`
- 📧 **Working Contact Form:** Fully functional with email notifications
- 💰 **Cost:** ~$5/month (Railway backend only, Vercel frontend is free)
- 🚀 **Performance:** Professional-grade, faster than Wix
- 📱 **Mobile Optimized:** Responsive design

---

## 🆚 Comparison: Current Setup vs Wix

| Feature | Your Vercel Deployment | Wix |
|---------|----------------------|-----|
| **Contact Form** | ✅ Fully functional with backend | ❌ Limited, no custom backend |
| **Performance** | ✅ Fast (Next.js optimized) | ⚠️ Slower |
| **SEO** | ✅ Professional SEO | ⚠️ Limited SEO control |
| **Customization** | ✅ Unlimited | ❌ Template restrictions |
| **Cost** | ✅ $5/month | ⚠️ $15-30/month |
| **Professional Domain** | ✅ boston-mfg.com | ✅ Supported |
| **Maintenance** | ✅ Auto-updates | ⚠️ Manual updates |

---

## 🚨 Migration Strategy

### **Option A: Replace Wix Completely**
- Deploy to Vercel with your domain
- Cancel Wix subscription
- **Best for:** Full control and cost savings

### **Option B: Test First**
- Deploy to Vercel with temporary domain
- Test everything works
- Then migrate domain from Wix
- **Best for:** Risk-averse approach

### **Option C: Hybrid**
- Keep Wix for main site
- Use Vercel deployment for contact form only
- **Best for:** Minimal disruption

---

## 🎯 Recommendation

**I recommend Option A (Replace Wix)** because:
1. Your Next.js site is **more professional** than typical Wix sites
2. **Working contact form** is crucial for business
3. **Cost savings:** $5/month vs $15-30/month
4. **Better performance** and SEO
5. **Full control** over your business website

Would you like me to help you start the deployment process?

