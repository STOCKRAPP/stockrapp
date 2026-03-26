# StockR Website

AI-powered inventory management for small businesses.  
**Waste nothing. Miss nothing. Grow everything.**

---

## 🚀 Deployment Guide (Vercel + GoDaddy)

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com)
2. Sign up for a free account

### Step 2: Upload This Code to GitHub
1. Go to [github.com/new](https://github.com/new)
2. Name your repository `stockr-website`
3. Keep it **Public** or **Private** (your choice)
4. Click **Create repository**
5. Upload all these files to the repository:
   - You can drag and drop all files
   - Or use the "uploading an existing file" link

### Step 3: Deploy to Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → **Continue with GitHub**
3. Once logged in, click **Add New** → **Project**
4. Find your `stockr-website` repository and click **Import**
5. Leave all settings as default
6. Click **Deploy**
7. Wait 1-2 minutes for deployment
8. You'll get a URL like `stockr-website.vercel.app`

### Step 4: Connect Your GoDaddy Domain
1. In Vercel, go to your project → **Settings** → **Domains**
2. Type `stockrapp.com` and click **Add**
3. Vercel will show you DNS records to add

### Step 5: Update GoDaddy DNS
1. Log in to [GoDaddy](https://godaddy.com)
2. Go to **My Products** → Find your domain → **DNS**
3. Delete any existing A records or CNAME for @
4. Add these records (Vercel will tell you the exact values):

   | Type  | Name | Value                    |
   |-------|------|--------------------------|
   | A     | @    | 76.76.21.21              |
   | CNAME | www  | cname.vercel-dns.com     |

5. Save changes
6. Wait 10-30 minutes for DNS to propagate

### Step 6: Enable HTTPS
1. Back in Vercel → **Settings** → **Domains**
2. Once DNS is verified, HTTPS is automatic

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
stockr-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main website component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 📞 Need Help?

If you get stuck, the Vercel docs are excellent:
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)
- [GoDaddy DNS Setup](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

---

© 2026 StockR App Ltd. All rights reserved.
