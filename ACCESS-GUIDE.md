# 🌐 App Access Guide

## 💻 Local Access (Development):

### Start Commands:
```bash
# Terminal 1 - Backend
cd "c:\Users\HP\Desktop\water bodies project"
npm run dev

# Terminal 2 - Frontend
cd "c:\Users\HP\Desktop\water bodies project\client"  
npm start
```

### URLs:
- **Main App:** http://localhost:3000
- **API Server:** http://localhost:5000

## 📱 Mobile Access (Same Network):

### Find Your IP:
```bash
# Windows Command Prompt में:
ipconfig

# Look for "IPv4 Address" - example: 192.168.1.100
```

### Mobile Browser में:
```
http://YOUR-IP-ADDRESS:3000

# Example:
http://192.168.1.100:3000
```

## 🌍 Internet Access (Public):

### Option 1: Ngrok (Instant Public URL)
```bash
# Ngrok install करें: https://ngrok.com
# Account बनाएं और authtoken setup करें

# Backend के लिए:
ngrok http 5000

# Frontend के लिए (new terminal):
ngrok http 3000

# Public URLs मिल जाएंगे:
# https://abc123.ngrok.io (backend)
# https://xyz789.ngrok.io (frontend)
```

### Option 2: Heroku Deploy (Permanent)
```bash
# Git setup
git init
git add .
git commit -m "Water pollution app"

# Heroku deploy
heroku create water-pollution-app
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
git push heroku main

# Live URL: https://water-pollution-app.herokuapp.com
```

## 🔧 Network Configuration:

### Windows Firewall:
```bash
# Allow Node.js through firewall:
# Control Panel > System and Security > Windows Defender Firewall
# > Allow an app through firewall > Add Node.js
```

### Router Settings:
```bash
# Port forwarding (if needed):
# Router admin panel > Port Forwarding
# Forward ports 3000 and 5000 to your computer's IP
```

## 📋 Access URLs Summary:

| Access Type | URL Format | Example |
|-------------|------------|---------|
| Local | http://localhost:3000 | http://localhost:3000 |
| Network | http://YOUR-IP:3000 | http://192.168.1.100:3000 |
| Ngrok | https://xyz.ngrok.io | https://abc123.ngrok.io |
| Heroku | https://app-name.herokuapp.com | https://water-pollution-app.herokuapp.com |

## 🎯 Quick Test:

### Check if running:
1. Open http://localhost:3000
2. Should see "Water Pollution Reporter" homepage
3. Try "रिपोर्ट करें" button
4. Check "मैप देखें" for interactive map

### Mobile Test:
1. Connect phone to same WiFi
2. Open browser on phone
3. Type: http://YOUR-IP:3000
4. App should work like mobile app

## 🚨 Troubleshooting:

### Can't Access from Phone:
- Check if both devices on same WiFi
- Disable Windows Firewall temporarily
- Use correct IP address (ipconfig)

### App Not Loading:
- Check if both terminals are running
- Verify URLs: localhost:3000 and localhost:5000
- Clear browser cache

### Network Issues:
- Try different port: npm start -- --port 3001
- Check antivirus/firewall settings
- Restart router if needed

## 🔐 Security Note:
- Ngrok URLs are temporary (8 hours)
- Don't share Ngrok URLs publicly
- Use Heroku for permanent public access