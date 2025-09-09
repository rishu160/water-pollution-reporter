import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reportsRes, statsRes] = await Promise.all([
        axios.get('/api/reports'),
        axios.get('/api/stats')
      ]);
      
      setReports(reportsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('डेटा लोड करने में समस्या हुई');
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      await axios.patch(`/api/reports/${reportId}/status`, { status: newStatus });
      toast.success('स्थिति अपडेट हो गई');
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('स्थिति अपडेट करने में समस्या हुई');
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'Pending': 'लंबित',
      'Under Review': 'समीक्षाधीन', 
      'In Progress': 'प्रगति में',
      'Resolved': 'हल हो गया'
    };
    return statusMap[status] || status;
  };

  const getPollutionText = (level) => {
    const levelMap = {
      'Low': 'कम',
      'Medium': 'मध्यम',
      'High': 'अधिक',
      'Critical': 'गंभीर'
    };
    return levelMap[level] || level;
  };

  const getWaterBodyText = (type) => {
    const typeMap = {
      'River': 'नदी',
      'Lake': 'झील',
      'Pond': 'तालाब',
      'Canal': 'नहर',
      'Stream': 'नाला',
      'Other': 'अन्य'
    };
    return typeMap[type] || type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '50px'}}>
          <div style={{fontSize: '2rem'}}>⏳</div>
          <p>डैशबोर्ड लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>📊 प्रशासनिक डैशबोर्ड</h2>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalReports || 0}</div>
          <div className="stat-label">कुल रिपोर्ट्स</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pendingReports || 0}</div>
          <div className="stat-label">लंबित रिपोर्ट्स</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.resolvedReports || 0}</div>
          <div className="stat-label">हल की गई रिपोर्ट्स</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Math.round((stats.resolvedReports / stats.totalReports) * 100) || 0}%
          </div>
          <div className="stat-label">समाधान दर</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <h3>फिल्टर</h3>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            सभी ({reports.length})
          </button>
          <button 
            className={`btn ${filter === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('Pending')}
          >
            लंबित ({reports.filter(r => r.status === 'Pending').length})
          </button>
          <button 
            className={`btn ${filter === 'Under Review' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('Under Review')}
          >
            समीक्षाधीन ({reports.filter(r => r.status === 'Under Review').length})
          </button>
          <button 
            className={`btn ${filter === 'In Progress' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('In Progress')}
          >
            प्रगति में ({reports.filter(r => r.status === 'In Progress').length})
          </button>
          <button 
            className={`btn ${filter === 'Resolved' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('Resolved')}
          >
            हल हो गया ({reports.filter(r => r.status === 'Resolved').length})
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="report-grid">
        {filteredReports.map((report) => (
          <div key={report._id} className="report-card">
            <div className="report-header">
              <div>
                <div className="report-title">{report.title}</div>
                <div className="report-meta">
                  {formatDate(report.createdAt)} | {getWaterBodyText(report.waterBodyType)}
                </div>
              </div>
              <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '')}`}>
                {getStatusText(report.status)}
              </span>
            </div>

            <p>{report.description}</p>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
              <div>
                <span className={`pollution-level level-${report.pollutionLevel.toLowerCase()}`}>
                  {getPollutionText(report.pollutionLevel)} प्रदूषण
                </span>
              </div>
              
              <div style={{display: 'flex', gap: '5px'}}>
                {report.status !== 'Under Review' && (
                  <button
                    className="btn btn-primary"
                    style={{padding: '5px 10px', fontSize: '12px'}}
                    onClick={() => updateReportStatus(report._id, 'Under Review')}
                  >
                    समीक्षा करें
                  </button>
                )}
                {report.status !== 'In Progress' && report.status !== 'Resolved' && (
                  <button
                    className="btn btn-success"
                    style={{padding: '5px 10px', fontSize: '12px'}}
                    onClick={() => updateReportStatus(report._id, 'In Progress')}
                  >
                    कार्य शुरू करें
                  </button>
                )}
                {report.status !== 'Resolved' && (
                  <button
                    className="btn btn-danger"
                    style={{padding: '5px 10px', fontSize: '12px'}}
                    onClick={() => updateReportStatus(report._id, 'Resolved')}
                  >
                    हल करें
                  </button>
                )}
              </div>
            </div>

            {/* Reporter Info */}
            {report.reportedBy && report.reportedBy.name && (
              <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', fontSize: '14px'}}>
                <strong>रिपोर्टर:</strong> {report.reportedBy.name}
                {report.reportedBy.phone && ` | 📞 ${report.reportedBy.phone}`}
                {report.reportedBy.email && ` | ✉️ ${report.reportedBy.email}`}
              </div>
            )}

            {/* Location */}
            <div style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
              📍 {report.location.address || `${report.location.latitude.toFixed(4)}, ${report.location.longitude.toFixed(4)}`}
            </div>

            {/* Photos */}
            {report.photos && report.photos.length > 0 && (
              <div style={{marginTop: '10px'}}>
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                  {report.photos.slice(0, 3).map((photo, index) => (
                    <img
                      key={index}
                      src={`/uploads/${photo}`}
                      alt={`Report ${index + 1}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(`/uploads/${photo}`, '_blank')}
                    />
                  ))}
                  {report.photos.length > 3 && (
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      +{report.photos.length - 3} और
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="card" style={{textAlign: 'center', padding: '50px'}}>
          <div style={{fontSize: '3rem', marginBottom: '20px'}}>📭</div>
          <h3>कोई रिपोर्ट नहीं मिली</h3>
          <p>चुने गए फिल्टर के अनुसार कोई रिपोर्ट उपलब्ध नहीं है।</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;