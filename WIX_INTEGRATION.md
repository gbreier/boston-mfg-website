# 🔗 Wix + Vercel Integration Guide

Since you want to keep using Wix, here's how to integrate your working contact form with your existing Wix site.

## 🎯 Integration Options

### **Option 1: Contact Form Subdomain (Recommended)**
- **Main site:** `boston-mfg.com` (Wix)
- **Contact form:** `contact.boston-mfg.com` (Vercel)
- **User experience:** Seamless transition between sites

### **Option 2: Contact Page Redirect**
- Keep Wix for everything except contact
- Redirect contact page to Vercel-hosted form
- Return users to Wix after submission

### **Option 3: Embedded Contact Form**
- Host contact form on Vercel
- Embed it in Wix using iframe
- All functionality stays within Wix

---

## 🚀 **Step-by-Step: Option 1 (Subdomain)**

### **Step 1: Deploy Contact Form to Vercel**

```bash
# 1. Prepare repository
git add .
git commit -m "Prepare contact form for Vercel"
git push origin main
```

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your repository**
3. **Deploy the Next.js app**

### **Step 2: Set up Subdomain**

**In Vercel:**
1. **Project Settings** → **Domains**
2. **Add domain:** `contact.boston-mfg.com`

**In your domain registrar (where you bought boston-mfg.com):**
1. **Add CNAME record:**
   - **Name:** `contact`
   - **Value:** `cname.vercel-dns.com`

### **Step 3: Deploy Backend to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Deploy from GitHub**
3. **Add environment variables:**
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=contact@boston-mfg.com
SMTP_PASSWORD=your-gmail-app-password
BMG_EMAIL=contact@boston-mfg.com
```

### **Step 4: Connect Frontend to Backend**

**In Vercel environment variables:**
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url
```

### **Step 5: Update Wix Site**

**In your Wix site:**
1. **Edit contact page/button**
2. **Link to:** `https://contact.boston-mfg.com`
3. **Or add button:** "Get Free Consultation" → Links to subdomain

---

## 🚀 **Step-by-Step: Option 2 (Page Redirect)**

### **Simpler Setup:**
1. **Deploy to Vercel** (any domain like `bmg-contact.vercel.app`)
2. **In Wix:** Replace contact page with redirect to Vercel URL
3. **After form submission:** Redirect back to Wix thank you page

### **Wix Setup:**
1. **Create new page** in Wix called "Contact"
2. **Add redirect code:**
```html
<script>
window.location.href = "https://bmg-contact.vercel.app/contact";
</script>
```

---

## 🚀 **Step-by-Step: Option 3 (Embedded Form)**

### **Create Contact-Only Version:**

**Modify your Next.js app for embedding:**

1. **Create minimal contact page** (`pages/embed-contact.js`):
```javascript
// Simplified version without navigation for embedding
export default function EmbedContact() {
  // Same contact form logic, but minimal styling for iframe
  return (
    <div style={{padding: '20px', background: 'white'}}>
      {/* Your existing contact form here */}
    </div>
  );
}
```

2. **Deploy to Vercel**

3. **In Wix, add HTML embed:**
```html
<iframe 
  src="https://your-vercel-app.vercel.app/embed-contact" 
  width="100%" 
  height="800px" 
  frameborder="0">
</iframe>
```

---

## 💰 **Cost Comparison**

| Option | Wix Cost | Additional Cost | Total |
|--------|----------|----------------|-------|
| **Subdomain** | Your current Wix plan | $5/month (Railway) | Wix + $5 |
| **Page Redirect** | Your current Wix plan | $5/month (Railway) | Wix + $5 |
| **Embedded** | Your current Wix plan | $5/month (Railway) | Wix + $5 |

---

## 🎯 **My Recommendation: Option 1 (Subdomain)**

**Why this is best:**
- ✅ **Professional:** `contact.boston-mfg.com` looks great
- ✅ **Fast:** Contact form loads instantly
- ✅ **SEO friendly:** Separate contact page for search engines
- ✅ **User experience:** Seamless transition
- ✅ **Flexible:** Can expand contact subdomain later

**User Journey:**
1. **Visit:** `boston-mfg.com` (your beautiful Wix site)
2. **Click:** "Contact Us" or "Get Free Consultation"
3. **Redirects to:** `contact.boston-mfg.com` (your working form)
4. **After submission:** Can redirect back to Wix thank you page

---

## 🛠️ **Quick Start**

Want to set this up? Here's the fastest path:

1. **Deploy contact form to Vercel** (10 minutes)
2. **Deploy backend to Railway** (5 minutes)
3. **Set up subdomain** (5 minutes)
4. **Update Wix contact links** (2 minutes)

**Total time:** ~20 minutes to have a professional contact form working with your Wix site!

---

## 📞 **Need Help?**

I can walk you through any of these options step by step. Which approach sounds best for your setup?

- **Option 1:** Subdomain (most professional)
- **Option 2:** Page redirect (simplest)
- **Option 3:** Embedded form (most integrated)


