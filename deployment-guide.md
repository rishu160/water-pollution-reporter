# 🚀 Server Deployment Guide

## Option 1: Heroku (Free & Easy)

### 1. Heroku Account बनाएं:
- https://heroku.com पर signup करें
- Heroku CLI install करें

### 2. Project को Heroku के लिए prepare करें:
```bash
# Root directory में
npm install --save-dev concurrently

# package.json में scripts add करें:
"scripts": {
  "heroku-postbuild": "cd client && npm install && npm run build",
  "start": "node server.js"
}
```

### 3. Deploy करें:
```bash
# Git initialize करें
git init
git add .
git commit -m "Initial commit"

# Heroku app create करें
heroku create water-pollution-app

# MongoDB Atlas connection string add करें
heroku config:set MONGODB_URI="your-atlas-connection-string"

# Deploy करें
git push heroku main
```

## Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend (Vercel):
```bash
# Client folder में
cd client
npm run build

# Vercel CLI install करें
npm i -g vercel

# Deploy करें
vercel --prod
```

### Backend (Railway):
```bash
# Railway account बनाएं: https://railway.app
# GitHub repo connect करें
# Environment variables add करें
```

## Option 3: VPS/Dedicated Server

### 1. Server Setup (Ubuntu):
```bash
# Node.js install करें
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB install करें
sudo apt-get install -y mongodb

# PM2 install करें (process manager)
sudo npm install -g pm2
```

### 2. Project Upload करें:
```bash
# Server पर project folder create करें
mkdir /var/www/water-pollution
cd /var/www/water-pollution

# Files upload करें (SCP/FTP से)
# या Git clone करें
git clone your-repo-url .

# Dependencies install करें
npm install
cd client && npm install && npm run build
```

### 3. Production Start करें:
```bash
# PM2 से start करें
pm2 start server.js --name "water-pollution"

# Auto-restart enable करें
pm2 startup
pm2 save
```

### 4. Nginx Setup (Optional):
```bash
# Nginx install करें
sudo apt install nginx

# Configuration file create करें
sudo nano /etc/nginx/sites-available/water-pollution

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/water-pollution /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Environment Variables for Production:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/water-pollution
PORT=5000
JWT_SECRET=your-super-secret-key
```

## Quick Deploy Commands:

### Heroku:
```bash
git add .
git commit -m "Deploy to production"
git push heroku main
```

### Vercel (Frontend only):
```bash
cd client
npm run build
vercel --prod
```

### VPS Update:
```bash
git pull origin main
npm install
cd client && npm install && npm run build
pm2 restart water-pollution
```

## Domain Setup:

1. **Domain buy करें** (GoDaddy, Namecheap, etc.)
2. **DNS settings** में server IP point करें
3. **SSL certificate** setup करें (Let's Encrypt free)

## Monitoring & Maintenance:

```bash
# Server logs check करें
pm2 logs water-pollution

# Server status check करें
pm2 status

# Database backup
mongodump --uri="your-mongodb-uri"

# Server restart
pm2 restart water-pollution
```

## Cost Estimation:

- **Heroku**: Free tier (limited hours)
- **Vercel + Railway**: Free tier available
- **VPS**: $5-20/month (DigitalOcean, Linode)
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)

Choose option based on your budget and requirements!