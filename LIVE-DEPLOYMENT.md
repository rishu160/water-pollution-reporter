# 🚀 LIVE DEPLOYMENT COMMANDS

## Step 1: GitHub Repository Create करें
1. Go to: https://github.com/new
2. Repository name: `water-pollution-reporter`
3. Description: `Citizen water pollution reporting system`
4. Make it Public
5. Click "Create repository"

## Step 2: Push to GitHub
```bash
# Your GitHub username के साथ replace करें
git remote add origin https://github.com/YOUR-USERNAME/water-pollution-reporter.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Render (Free & Easy)
1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your GitHub repository
5. Settings:
   - Name: `water-pollution-reporter`
   - Environment: `Node`
   - Build Command: `npm install && cd client && npm install && npm run build`
   - Start Command: `npm start`
   - Add Environment Variable: `MONGODB_URI` = your MongoDB Atlas connection

## Step 4: MongoDB Atlas Setup (Free)
1. Go to: https://www.mongodb.com/atlas
2. Create free account
3. Create M0 cluster (free)
4. Create database user
5. Whitelist IP: 0.0.0.0/0
6. Get connection string

## Live URLs After Deployment:
- **GitHub:** https://github.com/YOUR-USERNAME/water-pollution-reporter
- **Live App:** https://water-pollution-reporter.onrender.com
- **Mobile:** Same URL works on mobile

## Quick Deploy Alternative - Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy entire app
vercel --prod

# Follow prompts and get instant live URL
```