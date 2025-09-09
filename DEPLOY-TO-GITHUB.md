# 🚀 GitHub Deployment Guide

## Step 1: GitHub Repository Setup

### Create New Repository:
1. Go to https://github.com
2. Click "New Repository"
3. Name: `water-pollution-reporter`
4. Description: `Citizen water pollution reporting system with interactive maps`
5. Make it Public
6. Don't initialize with README (we have our own)

## Step 2: Local Git Setup

```bash
# Navigate to project directory
cd "c:\Users\HP\Desktop\water bodies project"

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Water Pollution Reporter App

- Complete MERN stack application
- React frontend with interactive maps
- Node.js/Express backend with MongoDB
- Photo upload and GPS location features
- Admin dashboard for authorities
- Mobile-responsive design
- Hindi language support"

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/water-pollution-reporter.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Heroku (Live URL)

### Heroku Setup:
```bash
# Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create Heroku app
heroku create water-pollution-reporter-live

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/water-pollution"

# Deploy to Heroku
git push heroku main

# Open live app
heroku open
```

## Step 4: Deploy Frontend to Vercel

### Vercel Setup:
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client folder
cd client

# Build production version
npm run build

# Deploy to Vercel
vercel --prod

# Follow prompts:
# - Project name: water-pollution-reporter
# - Framework: React
# - Build command: npm run build
# - Output directory: build
```

## Step 5: Deploy Backend to Railway

### Railway Setup:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
   - `NODE_ENV`: production

## Step 6: Update API URLs

### Update client/src/App.js:
```javascript
// Add this at the top
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-railway-app.railway.app' 
  : 'http://localhost:5000';

// Update axios default baseURL
axios.defaults.baseURL = API_BASE_URL;
```

## Live URLs After Deployment:

### Option 1: Full Stack on Heroku
- **Live App:** https://water-pollution-reporter-live.herokuapp.com
- **Features:** Complete app with backend + frontend

### Option 2: Separate Deployment
- **Frontend (Vercel):** https://water-pollution-reporter.vercel.app
- **Backend (Railway):** https://your-app.railway.app
- **Features:** Faster loading, better performance

## GitHub Repository Features:

### Add these files for better presentation:

#### .github/workflows/deploy.yml (Auto-deploy):
```yaml
name: Deploy to Heroku
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "water-pollution-reporter-live"
        heroku_email: "your-email@example.com"
```

#### Update README.md with live links:
```markdown
# 💧 Water Pollution Reporter

🌐 **Live Demo:** https://water-pollution-reporter-live.herokuapp.com

## Quick Links:
- 📱 **Mobile App:** Open live URL on mobile
- 🗺️ **Interactive Map:** View all pollution reports
- 📊 **Admin Dashboard:** Manage reports and statistics
- 📸 **Report Pollution:** Submit reports with photos and GPS
```

## Commands Summary:

```bash
# 1. Git setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/water-pollution-reporter.git
git push -u origin main

# 2. Heroku deploy
heroku create water-pollution-reporter-live
heroku config:set MONGODB_URI="your-connection-string"
git push heroku main

# 3. Vercel deploy (frontend only)
cd client
npm run build
vercel --prod

# 4. Railway deploy (backend only)
# Use web interface: railway.app
```

## 🎉 Final Result:

After deployment, you'll have:
- ✅ **GitHub Repository:** Source code with documentation
- ✅ **Live Website:** Accessible from anywhere
- ✅ **Mobile App:** Works on all devices
- ✅ **Admin Panel:** For authorities to manage reports
- ✅ **Interactive Maps:** Real-time pollution data
- ✅ **Photo Upload:** Citizens can report with evidence
- ✅ **GPS Integration:** Accurate location tracking

Your Water Pollution Reporter is now live and ready for public use! 🌊🌱