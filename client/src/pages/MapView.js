import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different pollution levels
const createCustomIcon = (level) => {
  const colors = {
    'Low': '#28a745',
    'Medium': '#ffc107', 
    'High': '#fd7e14',
    'Critical': '#dc3545'
  };
  
  return L.divIcon({
    html: `<div style="background-color: ${colors[level]}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const MapView = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    pollutionLevel: '',
    waterBodyType: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await axios.get(`/api/reports?${params}`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hi-IN');
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

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '50px'}}>
          <div style={{fontSize: '2rem'}}>⏳</div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>🗺️ Pollution Map</h2>
      
      {/* Filters */}
      <div className="card">
        <h3>Filters</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div>
            <label>Pollution Level:</label>
            <select 
              className="form-control"
              value={filters.pollutionLevel}
              onChange={(e) => setFilters({...filters, pollutionLevel: e.target.value})}
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          
          <div>
            <label>Water Body Type:</label>
            <select 
              className="form-control"
              value={filters.waterBodyType}
              onChange={(e) => setFilters({...filters, waterBodyType: e.target.value})}
            >
              <option value="">All</option>
              <option value="River">River</option>
              <option value="Lake">Lake</option>
              <option value="Pond">Pond</option>
              <option value="Canal">Canal</option>
              <option value="Stream">Stream</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label>Status:</label>
            <select 
              className="form-control"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="card">
        <div className="map-container">
          <MapContainer
            center={[21.2514, 81.6296]} // Raipur coordinates
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {reports.map((report) => (
              <Marker
                key={report._id}
                position={[report.location.latitude, report.location.longitude]}
                icon={createCustomIcon(report.pollutionLevel)}
              >
                <Popup maxWidth={300}>
                  <div style={{padding: '10px'}}>
                    <h4>{report.title}</h4>
                    <p><strong>Type:</strong> {report.waterBodyType}</p>
                    <p><strong>Pollution Level:</strong> 
                      <span className={`pollution-level level-${report.pollutionLevel.toLowerCase()}`}>
                        {report.pollutionLevel}
                      </span>
                    </p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '')}`}>
                        {report.status}
                      </span>
                    </p>
                    <p><strong>Date:</strong> {formatDate(report.createdAt)}</p>
                    <p>{report.description.substring(0, 100)}...</p>
                    {report.photos && report.photos.length > 0 && (
                      <div style={{marginTop: '10px'}}>
                        <img 
                          src={`/uploads/${report.photos[0]}`}
                          alt="Report"
                          style={{width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '5px'}}
                        />
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Legend */}
        <div style={{marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <div style={{width: '15px', height: '15px', backgroundColor: '#28a745', borderRadius: '50%'}}></div>
            <span>Low Pollution</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <div style={{width: '15px', height: '15px', backgroundColor: '#ffc107', borderRadius: '50%'}}></div>
            <span>Medium Pollution</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <div style={{width: '15px', height: '15px', backgroundColor: '#fd7e14', borderRadius: '50%'}}></div>
            <span>High Pollution</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <div style={{width: '15px', height: '15px', backgroundColor: '#dc3545', borderRadius: '50%'}}></div>
            <span>Critical Pollution</span>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>
        Showing {reports.length} total reports
      </div>
    </div>
  );
};

export default MapView;