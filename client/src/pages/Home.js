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
      <section className="hero" style={{
        background: 'linear-gradient(135deg, rgba(0,123,255,0.8), rgba(40,167,69,0.8)), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{backgroundColor: 'rgba(0,0,0,0.3)', padding: '40px', borderRadius: '15px', backdropFilter: 'blur(10px)'}}>
            <h1 style={{fontSize: '3.5rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>💧 Raipur Water Pollution Reporter</h1>
            <p style={{fontSize: '1.3rem', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>Report water pollution in Raipur, Chhattisgarh and help keep our city's water bodies clean</p>
            <Link to="/report" className="btn btn-primary" style={{marginRight: '15px', padding: '15px 30px', fontSize: '18px'}}>
              📸 Report Pollution
            </Link>
            <Link to="/map" className="btn btn-success" style={{padding: '15px 30px', fontSize: '18px'}}>
              🗺️ View Map
            </Link>
          </div>
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
        
        {/* Impact Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Clean Water" 
              style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px'}}
            />
            <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>Clean Water Initiative</h3>
            <p style={{color: '#6c757d', lineHeight: '1.6'}}>Join us in making Raipur's water bodies cleaner and safer for everyone.</p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Community Action" 
              style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px'}}
            />
            <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>Community Action</h3>
            <p style={{color: '#6c757d', lineHeight: '1.6'}}>Every report helps authorities take quick action to solve pollution problems.</p>
          </div>
        </div>

        {/* Features */}
        <div className="card" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
          <h2 style={{textAlign: 'center', marginBottom: '40px', color: '#2c3e50'}}>How It Works?</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px'}}>
            <div style={{
              textAlign: 'center', 
              padding: '30px', 
              background: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #007bff, #0056b3)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>📱</div>
              <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>1. Take Photo</h3>
              <p style={{color: '#6c757d', lineHeight: '1.6'}}>Capture images of polluted water bodies using your camera</p>
            </div>
            <div style={{
              textAlign: 'center', 
              padding: '30px', 
              background: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #28a745, #1e7e34)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>📍</div>
              <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>2. Share Location</h3>
              <p style={{color: '#6c757d', lineHeight: '1.6'}}>Provide accurate GPS location information</p>
            </div>
            <div style={{
              textAlign: 'center', 
              padding: '30px', 
              background: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #ffc107, #e0a800)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>📝</div>
              <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>3. Write Description</h3>
              <p style={{color: '#6c757d', lineHeight: '1.6'}}>Give detailed description of the pollution problem</p>
            </div>
            <div style={{
              textAlign: 'center', 
              padding: '30px', 
              background: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, #dc3545, #c82333)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>🏛️</div>
              <h3 style={{color: '#2c3e50', marginBottom: '15px'}}>4. Reach Authorities</h3>
              <p style={{color: '#6c757d', lineHeight: '1.6'}}>Your report will reach the relevant department</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;