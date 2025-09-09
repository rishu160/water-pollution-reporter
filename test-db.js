const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/water-pollution');
    console.log('✅ MongoDB connected successfully!');
    
    // Test data insert करें
    const testReport = {
      title: 'Test Water Pollution Report',
      description: 'यह एक test report है database connection check करने के लिए',
      location: { 
        latitude: 28.6139, 
        longitude: 77.2090,
        address: 'New Delhi, India'
      },
      pollutionLevel: 'Medium',
      waterBodyType: 'River',
      reportedBy: {
        name: 'Test User',
        phone: '9876543210',
        email: 'test@example.com'
      },
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const Report = mongoose.model('Report', new mongoose.Schema({}, {strict: false}));
    const savedReport = await Report.create(testReport);
    console.log('✅ Test report created with ID:', savedReport._id);
    
    // Test data retrieve करें
    const reports = await Report.find();
    console.log('✅ Total reports in database:', reports.length);
    
    // Sample reports create करें
    const sampleReports = [
      {
        title: 'गंगा नदी में प्लास्टिक कचरा',
        description: 'गंगा नदी में बहुत सारा प्लास्टिक कचरा तैर रहा है',
        location: { latitude: 25.3176, longitude: 82.9739, address: 'वाराणसी, उत्तर प्रदेश' },
        pollutionLevel: 'High',
        waterBodyType: 'River',
        reportedBy: { name: 'अमित शर्मा', phone: '9876543211' },
        status: 'Pending'
      },
      {
        title: 'तालाब में रासायनिक प्रदूषण',
        description: 'फैक्ट्री का गंदा पानी तालाब में मिल रहा है',
        location: { latitude: 28.4595, longitude: 77.0266, address: 'गुड़गांव, हरियाणा' },
        pollutionLevel: 'Critical',
        waterBodyType: 'Pond',
        reportedBy: { name: 'प्रिया गुप्ता', phone: '9876543212' },
        status: 'Under Review'
      },
      {
        title: 'यमुना नदी में सीवेज',
        description: 'यमुना नदी में सीवेज का पानी मिल रहा है',
        location: { latitude: 28.6692, longitude: 77.4538, address: 'नोएडा, उत्तर प्रदेश' },
        pollutionLevel: 'High',
        waterBodyType: 'River',
        reportedBy: { name: 'राज कुमार', phone: '9876543213' },
        status: 'In Progress'
      }
    ];

    await Report.insertMany(sampleReports);
    console.log('✅ Sample reports created successfully!');
    
    const finalCount = await Report.countDocuments();
    console.log('✅ Final total reports:', finalCount);
    
    mongoose.connection.close();
    console.log('🔒 Database connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

console.log('🚀 Starting MongoDB connection test...');
testConnection();