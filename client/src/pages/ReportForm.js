import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReportForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast.success('लोकेशन मिल गई!');
        },
        (error) => {
          toast.error('लोकेशन नहीं मिल सकी। कृपया मैन्युअल रूप से दें।');
        }
      );
    } else {
      toast.error('आपका ब्राउज़र जीपीएस सपोर्ट नहीं करता।');
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error('अधिकतम 5 फोटो अपलोड कर सकते हैं');
      return;
    }
    setPhotos(files);
  };

  const onSubmit = async (data) => {
    if (!location) {
      toast.error('कृपया लोकेशन दें');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    
    // Add form data
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    // Add location and reporter info
    formData.append('location', JSON.stringify(location));
    formData.append('reportedBy', JSON.stringify({
      name: data.reporterName,
      phone: data.reporterPhone,
      email: data.reporterEmail
    }));
    
    // Add photos
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      await axios.post('/api/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success('रिपोर्ट सफलतापूर्वक सबमिट हो गई!');
      reset();
      setPhotos([]);
      setLocation(null);
    } catch (error) {
      toast.error('रिपोर्ट सबमिट करने में समस्या हुई');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🚨 प्रदूषण रिपोर्ट करें</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="form-group">
            <label>रिपोर्ट का शीर्षक *</label>
            <input
              type="text"
              className="form-control"
              {...register('title', { required: 'शीर्षक आवश्यक है' })}
              placeholder="जैसे: तालाब में कचरा और गंदगी"
            />
            {errors.title && <span style={{color: 'red'}}>{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label>विस्तृत विवरण *</label>
            <textarea
              className="form-control"
              rows="4"
              {...register('description', { required: 'विवरण आवश्यक है' })}
              placeholder="समस्या का विस्तृत विवरण दें..."
            />
            {errors.description && <span style={{color: 'red'}}>{errors.description.message}</span>}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div className="form-group">
              <label>प्रदूषण का स्तर *</label>
              <select className="form-control" {...register('pollutionLevel', { required: true })}>
                <option value="">चुनें</option>
                <option value="Low">कम</option>
                <option value="Medium">मध्यम</option>
                <option value="High">अधिक</option>
                <option value="Critical">गंभीर</option>
              </select>
            </div>

            <div className="form-group">
              <label>जल निकाय का प्रकार *</label>
              <select className="form-control" {...register('waterBodyType', { required: true })}>
                <option value="">चुनें</option>
                <option value="River">नदी</option>
                <option value="Lake">झील</option>
                <option value="Pond">तालाब</option>
                <option value="Canal">नहर</option>
                <option value="Stream">नाला</option>
                <option value="Other">अन्य</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>फोटो अपलोड करें (अधिकतम 5)</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photos.length > 0 && (
              <div style={{marginTop: '10px', color: '#666'}}>
                {photos.length} फोटो चुनी गई
              </div>
            )}
          </div>

          <div className="form-group">
            <label>स्थान की जानकारी *</label>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <button
                type="button"
                className="btn btn-success"
                onClick={getCurrentLocation}
              >
                📍 वर्तमान स्थान लें
              </button>
              {location && (
                <span style={{color: 'green'}}>
                  ✅ स्थान मिल गई ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
                </span>
              )}
            </div>
            <input
              type="text"
              className="form-control"
              {...register('address')}
              placeholder="पता या स्थान का नाम (वैकल्पिक)"
              style={{marginTop: '10px'}}
            />
          </div>

          <h3>रिपोर्टर की जानकारी</h3>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div className="form-group">
              <label>नाम</label>
              <input
                type="text"
                className="form-control"
                {...register('reporterName')}
                placeholder="आपका नाम"
              />
            </div>

            <div className="form-group">
              <label>फोन नंबर</label>
              <input
                type="tel"
                className="form-control"
                {...register('reporterPhone')}
                placeholder="मोबाइल नंबर"
              />
            </div>
          </div>

          <div className="form-group">
            <label>ईमेल</label>
            <input
              type="email"
              className="form-control"
              {...register('reporterEmail')}
              placeholder="ईमेल पता (वैकल्पिक)"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{width: '100%', padding: '15px', fontSize: '18px'}}
          >
            {loading ? '⏳ सबमिट हो रही है...' : '📤 रिपोर्ट सबमिट करें'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;