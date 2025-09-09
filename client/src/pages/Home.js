import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>जल प्रदूषण रिपोर्टर</h1>
          <p>अपने आस-पास के जल निकायों की स्थिति की रिपोर्ट करें और स्वच्छ पानी के लिए योगदान दें</p>
          <Link to="/report" className="btn btn-primary" style={{marginRight: '15px'}}>
            📸 रिपोर्ट करें
          </Link>
          <Link to="/map" className="btn btn-success">
            🗺️ मैप देखें
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalReports}</div>
            <div className="stat-label">कुल रिपोर्ट्स</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingReports}</div>
            <div className="stat-label">लंबित रिपोर्ट्स</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.resolvedReports}</div>
            <div className="stat-label">हल की गई रिपोर्ट्स</div>
          </div>
        </div>

        {/* Features */}
        <div className="card">
          <h2>कैसे काम करता है?</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px'}}>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📱</div>
              <h3>1. फोटो लें</h3>
              <p>प्रदूषित जल निकाय की तस्वीर खींचें</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📍</div>
              <h3>2. लोकेशन शेयर करें</h3>
              <p>सटीक स्थान की जानकारी दें</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📝</div>
              <h3>3. विवरण लिखें</h3>
              <p>समस्या का विस्तृत विवरण दें</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>🏛️</div>
              <h3>4. अधिकारियों तक पहुंचे</h3>
              <p>आपकी रिपोर्ट संबंधित विभाग तक पहुंचेगी</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;