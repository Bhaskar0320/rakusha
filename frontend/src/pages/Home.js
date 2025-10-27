import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=500&fit=crop',
      title: 'SEBI Registered Investment Services',
      description: 'Your trusted partner in financial growth'
    },
    {
      url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=500&fit=crop',
      title: 'Professional Financial Advisory',
      description: 'Expert guidance for your investments'
    },
    {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=500&fit=crop',
      title: 'Secure Your Financial Future',
      description: 'Comprehensive portfolio management'
    }
  ];

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="home">
      <Navbar />
      
      {/* Carousel */}
      <div className="carousel">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.url})` }}
          >
            <div className="carousel-content">
              <h1>{image.title}</h1>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
        <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about-section" className="section about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            We are a SEBI registered financial services company dedicated to providing
            comprehensive investment advisory services. With years
            of expertise in the financial markets, we help our clients achieve their
            financial goals through strategic planning and expert guidance.
          </p>
          <p>
            We ensures that every investment decision
            is backed by thorough research and analysis, keeping your financial security
            as our top priority.
          </p>
          <button className="btn-primary" onClick={() => navigate('/about')}>
            View More
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="section services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => navigate('/services')}>
            Explore More Services
          </button>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs-section" className="section blogs-section">
        <div className="container">
          <h2>Latest Blogs</h2>
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.image_url && (
                  <img src={`http://localhost:5000${blog.image_url}`} alt={blog.title} />
                )}
                <div className="blog-card-content">
                  <h3>{blog.title}</h3>
                  <p className="blog-meta">By {blog.author} | {new Date(blog.created_at).toLocaleDateString()}</p>
                  <button className="btn-secondary" onClick={() => navigate(`/blogs/${blog.id}`)}>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => navigate('/blogs')}>
            View All Blogs
          </button>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="section newsletter-cta-section">
        <div className="container">
          <div className="newsletter-cta-content">
            <div className="newsletter-cta-text">
              <i className="fas fa-envelope-open-text"></i>
              <h2>Subscribe to Our Newsletter</h2>
              <p>Get the latest financial insights, market trends, and investment tips delivered directly to your inbox. Join thousands of informed investors!</p>
            </div>
            <div className="newsletter-cta-button">
              <button className="btn-newsletter" onClick={() => navigate('/newsletter')}>
                <i className="fas fa-paper-plane"></i>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Quick Section */}
      <section className="section faqs-quick-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about our services</p>
          <div className="faqs-preview-grid">
            <div className="faq-preview-card">
              <i className="fas fa-question-circle"></i>
              <h3>What is SEBI Registration?</h3>
              <p>Learn about SEBI registration and why it matters for your investments</p>
            </div>
            <div className="faq-preview-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Is My Investment Safe?</h3>
              <p>Understand how we protect your investments and maintain security</p>
            </div>
            <div className="faq-preview-card">
              <i className="fas fa-coins"></i>
              <h3>Minimum Investment?</h3>
              <p>Find out about our minimum investment requirements and plans</p>
            </div>
            <div className="faq-preview-card">
              <i className="fas fa-chart-line"></i>
              <h3>Investment Strategies</h3>
              <p>Explore different investment strategies we offer for growth</p>
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate('/faqs')}>
            View All FAQs
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;