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
          <h1>Raipur Water Pollution Reporter</h1>
          <p>Report water pollution in Raipur, Chhattisgarh and help keep our city's water bodies clean</p>
          <Link to="/report" className="btn btn-primary" style={{marginRight: '15px'}}>
            📸 Report Pollution
          </Link>
          <Link to="/map" className="btn btn-success">
            🗺️ View Map
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalReports}</div>
            <div className="stat-label">Total Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingReports}</div>
            <div className="stat-label">Pending Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.resolvedReports}</div>
            <div className="stat-label">Resolved Reports</div>
          </div>
        </div>

        {/* Features */}
        <div className="card">
          <h2>How It Works?</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px'}}>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📱</div>
              <h3>1. Take Photo</h3>
              <p>Capture images of polluted water bodies</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📍</div>
              <h3>2. Share Location</h3>
              <p>Provide accurate location information</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>📝</div>
              <h3>3. Write Description</h3>
              <p>Give detailed description of the problem</p>
            </div>
            <div style={{textAlign: 'center', padding: '20px'}}>
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>🏛️</div>
              <h3>4. Reach Authorities</h3>
              <p>Your report will reach the relevant department</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;