const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/water-pollution', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Report Schema
const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: String
  },
  photos: [String],
  pollutionLevel: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    required: true 
  },
  waterBodyType: {
    type: String,
    enum: ['River', 'Lake', 'Pond', 'Canal', 'Stream', 'Other'],
    required: true
  },
  reportedBy: {
    name: String,
    phone: String,
    email: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed!'), false);
    }
  }
});

// Routes

// Get all reports
app.get('/api/reports', async (req, res) => {
  try {
    const { status, pollutionLevel, waterBodyType } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (pollutionLevel) filter.pollutionLevel = pollutionLevel;
    if (waterBodyType) filter.waterBodyType = waterBodyType;
    
    const reports = await Report.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new report
app.post('/api/reports', upload.array('photos', 5), async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      location: JSON.parse(req.body.location),
      reportedBy: JSON.parse(req.body.reportedBy),
      photos: req.files ? req.files.map(file => file.filename) : []
    };
    
    const report = new Report(reportData);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update report status (for authorities)
app.patch('/api/reports/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get report statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'Pending' });
    const resolvedReports = await Report.countDocuments({ status: 'Resolved' });
    
    const pollutionStats = await Report.aggregate([
      { $group: { _id: '$pollutionLevel', count: { $sum: 1 } } }
    ]);
    
    const waterBodyStats = await Report.aggregate([
      { $group: { _id: '$waterBodyType', count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalReports,
      pendingReports,
      resolvedReports,
      pollutionStats,
      waterBodyStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});