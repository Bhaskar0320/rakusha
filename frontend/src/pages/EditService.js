import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddService.css';

const EditService = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    about: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await axios.get(`https://rakusharma.onrender.com/api/services/${id}`);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        about: response.data.about
      });
    } catch (error) {
      console.error('Error fetching service:', error);
      alert('Failed to load service');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://rakusharma.onrender.com/api/services/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Service updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-service-page">
      <Navbar />
      
      <div className="form-container">
        <h1>Edit Service</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter service title"
            />
          </div>

          <div className="form-group">
            <label>Short Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Brief description of the service"
            />
          </div>

          <div className="form-group">
            <label>Detailed Information *</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Detailed information about the service"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Service'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default EditService;