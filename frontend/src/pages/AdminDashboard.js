import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
    fetchBlogs();
    fetchSubscribers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/newsletter/subscribers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const deleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchServices();
        alert('Service deleted successfully');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
        alert('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-tabs">
          <button
            className={activeTab === 'services' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button
            className={activeTab === 'blogs' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
        </div>

        {activeTab === 'services' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Services</h2>
              <button className="btn-add" onClick={() => navigate('/admin/add-service')}>
                + Add Service
              </button>
            </div>
            
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.id}</td>
                      <td>{service.title}</td>
                      <td>{service.description.substring(0, 100)}...</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/admin/edit-service/${service.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteService(service.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Manage Blogs</h2>
              <button className="btn-add" onClick={() => navigate('/admin/add-blog')}>
                + Add Blog
              </button>
            </div>
            
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>{blog.id}</td>
                      <td>{blog.title}</td>
                      <td>{blog.author}</td>
                      <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteBlog(blog.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;