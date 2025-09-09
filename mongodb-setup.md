# 🗄️ MongoDB Setup Guide

## Option 1: Local MongoDB Setup (Recommended for Development)

### Windows पर MongoDB Install करें:

1. **MongoDB Community Server Download करें:**
   - https://www.mongodb.com/try/download/community पर जाएं
   - Windows version select करें
   - Download और install करें

2. **MongoDB को Windows Service के रूप में start करें:**
```bash
# Command Prompt को Administrator के रूप में खोलें
net start MongoDB
```

3. **MongoDB Shell test करें:**
```bash
# Command prompt में type करें
mongosh
# या पुराने version के लिए
mongo
```

### Quick Local Setup Commands:
```bash
# MongoDB start करें (if not running as service)
mongod --dbpath "C:\data\db"

# New terminal में MongoDB shell खोलें
mongosh

# Database create करें
use water-pollution

# Test collection create करें
db.reports.insertOne({test: "Hello MongoDB"})

# Data check करें
db.reports.find()
```

## Option 2: MongoDB Atlas (Cloud) - Free Tier

### Atlas Setup (Recommended for Production):

1. **Account बनाएं:**
   - https://www.mongodb.com/atlas पर जाएं
   - Sign up करें (free)

2. **Cluster create करें:**
   - "Build a Database" click करें
   - "M0 Sandbox" (Free) select करें
   - Cloud provider: AWS
   - Region: Mumbai (ap-south-1)
   - Cluster name: water-pollution-cluster

3. **Database User create करें:**
   - Database Access → Add New Database User
   - Username: `waterpollution`
   - Password: `securepassword123`
   - Role: Read and write to any database

4. **Network Access setup करें:**
   - Network Access → Add IP Address
   - "Allow Access from Anywhere" (0.0.0.0/0)
   - या अपना current IP add करें

5. **Connection String copy करें:**
   - Clusters → Connect → Connect your application
   - Driver: Node.js
   - Version: 4.1 or later
   - Copy connection string

## Environment Variables Update करें:

### Local MongoDB के लिए (.env file):
```env
MONGODB_URI=mongodb://localhost:27017/water-pollution
PORT=5000
JWT_SECRET=your-secret-key-here
```

### MongoDB Atlas के लिए (.env file):
```env
MONGODB_URI=mongodb+srv://waterpollution:securepassword123@water-pollution-cluster.xxxxx.mongodb.net/water-pollution?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-secret-key-here
```

## Database Collections Structure:

### Reports Collection:
```javascript
{
  _id: ObjectId,
  title: "तालाब में कचरा और गंदगी",
  description: "यहाँ बहुत गंदगी है...",
  location: {
    latitude: 28.6139,
    longitude: 77.2090,
    address: "नई दिल्ली"
  },
  photos: ["1699123456789-photo1.jpg", "1699123456790-photo2.jpg"],
  pollutionLevel: "High",
  waterBodyType: "Pond",
  reportedBy: {
    name: "राहुल शर्मा",
    phone: "9876543210",
    email: "rahul@example.com"
  },
  status: "Pending",
  createdAt: ISODate("2023-11-05T10:30:00Z"),
  updatedAt: ISODate("2023-11-05T10:30:00Z")
}
```

## Test Database Connection:

### Connection Test Script बनाएं:
```javascript
// test-db.js
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test data insert करें
    const testReport = {
      title: 'Test Report',
      description: 'This is a test report',
      location: { latitude: 28.6139, longitude: 77.2090 },
      pollutionLevel: 'Medium',
      waterBodyType: 'River',
      status: 'Pending'
    };
    
    const Report = mongoose.model('Report', new mongoose.Schema({}, {strict: false}));
    const savedReport = await Report.create(testReport);
    console.log('✅ Test report created:', savedReport._id);
    
    // Test data retrieve करें
    const reports = await Report.find();
    console.log('✅ Total reports in database:', reports.length);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

testConnection();
```

### Test run करें:
```bash
node test-db.js
```

## MongoDB Compass (GUI Tool):

### Install करें:
1. https://www.mongodb.com/products/compass से download करें
2. Install करें
3. Connection string paste करें:
   - Local: `mongodb://localhost:27017`
   - Atlas: आपका Atlas connection string

### Database browse करें:
- water-pollution database
- reports collection
- Data को visually देख सकते हैं

## Troubleshooting:

### Common Issues:

1. **"MongoNetworkError":**
   - MongoDB service running है check करें
   - Firewall settings check करें
   - Atlas में IP whitelist check करें

2. **"Authentication failed":**
   - Username/password correct है check करें
   - Database user permissions check करें

3. **"Connection timeout":**
   - Internet connection check करें
   - MongoDB Atlas cluster running है check करें

### Debug Commands:
```bash
# MongoDB service status check करें
sc query MongoDB

# MongoDB logs देखें (Windows)
type "C:\Program Files\MongoDB\Server\7.0\log\mongod.log"

# Connection test करें
mongosh "mongodb://localhost:27017/water-pollution"
```

## Production Recommendations:

1. **Security:**
   - Strong passwords use करें
   - IP whitelisting properly करें
   - SSL/TLS enable करें

2. **Performance:**
   - Indexes create करें frequently queried fields पर
   - Connection pooling use करें
   - Query optimization करें

3. **Backup:**
   - Regular backups schedule करें
   - Atlas automatic backups enable करें
   - Local backup strategy बनाएं

अब आप MongoDB successfully setup कर सकते हैं और application run कर सकते हैं!