import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './BlogDetail.css';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="not-found-container">
          <h2>Blog not found</h2>
          <button className="btn-back" onClick={() => navigate('/blogs')}>
            Back to Blogs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <Navbar />
      
      <div className="blog-detail-container">
        <button className="btn-back-nav" onClick={() => navigate('/blogs')}>
          ← Back to Blogs
        </button>

        <article className="blog-detail-content">
          {blog.image_url && (
            <img 
              src={`http://localhost:5000${blog.image_url}`} 
              alt={blog.title}
              className="blog-detail-image"
            />
          )}
          
          <h1>{blog.title}</h1>
          
          <div className="blog-detail-meta">
            <span className="author">
              <i className="fas fa-user"></i> {blog.author}
            </span>
            <span className="date">
              <i className="fas fa-calendar"></i> {new Date(blog.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div 
            className="blog-detail-body"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;