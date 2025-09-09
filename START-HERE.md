# 🚀 START HERE - Quick Launch Guide

## सबसे पहले ये करें:

### 1. MongoDB Install करें (अगर नहीं है तो):
- https://www.mongodb.com/try/download/community से download करें
- Install करें
- Command Prompt (Admin mode) में type करें: `net start MongoDB`

### 2. Project Start करें:

#### Terminal 1 - Backend:
```bash
cd "c:\Users\HP\Desktop\water bodies project"
npm install
npm run dev
```

#### Terminal 2 - Frontend:
```bash
cd "c:\Users\HP\Desktop\water bodies project\client"
npm install
npm start
```

### 3. Browser में खोलें:
- http://localhost:3000

## ✅ Success Signs:

**Terminal 1 में दिखना चाहिए:**
```
Server running on port 5000
MongoDB connected successfully
```

**Terminal 2 में दिखना चाहिए:**
```
webpack compiled successfully
Local: http://localhost:3000
```

## 🔧 अगर Problem आए तो:

### MongoDB Error:
```bash
# MongoDB service start करें:
net start MongoDB

# या manually start करें:
mongod --dbpath "C:\data\db"
```

### Port Error:
```bash
# Ports kill करें:
npx kill-port 3000
npx kill-port 5000
```

### Module Error:
```bash
# Cache clear करें:
npm cache clean --force
npm install
```

## 🎯 App Features Test करें:

1. **Home Page** - Statistics देखें
2. **रिपोर्ट करें** - New report submit करें
3. **मैप देखें** - Interactive map check करें
4. **डैशबोर्ड** - Admin panel access करें

## 📱 Mobile Version:
- Browser में mobile view के लिए F12 press करें
- Device toolbar enable करें
- Mobile responsive design test करें

**Ready to use! 🎉**