import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://rakusharma.onrender.com/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="blogs-page">
      <Navbar />
      
      <div className="blogs-header">
        <h1>Our Blogs</h1>
        <p>Insights and updates from our experts</p>
      </div>

      <div className="blogs-container">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card-full">
            {blog.image_url && (
              <img src={`https://rakusharma.onrender.com${blog.image_url}`} alt={blog.title} />
            )}
            <div className="blog-card-body">
              <h2>{blog.title}</h2>
              <p className="blog-meta">
                By {blog.author} | {new Date(blog.created_at).toLocaleDateString()}
              </p>
              <div 
                className="blog-excerpt" 
                dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 200) + '...' }}
              />
              <button 
                className="btn-read-more" 
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                Read Full Article
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;