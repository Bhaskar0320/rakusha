import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Newsletter.css';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', formData);
      setSuccess(true);
      setFormData({ name: '', email: '' });
      
      // Auto hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to subscribe. Please try again.';
      setError(errorMessage);
      
      // Auto hide error message after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-page">
      <Navbar />
      
      <div className="newsletter-hero">
        <div className="newsletter-hero-content">
          <h1>Stay Updated with Our Newsletter</h1>
          <p>Get the latest financial insights, market trends, and investment tips delivered directly to your inbox</p>
        </div>
      </div>

      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-info">
            <h2>Why Subscribe?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Market Insights</h3>
                <p>Receive expert analysis on market trends and investment opportunities</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Financial Tips</h3>
                <p>Get practical advice on managing your finances and growing your wealth</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <h3>Exclusive Updates</h3>
                <p>Be the first to know about new services, events, and special offers</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3>Educational Content</h3>
                <p>Access in-depth articles and guides on various financial topics</p>
              </div>
            </div>

            <div className="newsletter-features">
              <h3>What You'll Receive:</h3>
              <ul>
                <li><i className="fas fa-check-circle"></i> Weekly market updates and analysis</li>
                <li><i className="fas fa-check-circle"></i> Monthly investment tips and strategies</li>
                <li><i className="fas fa-check-circle"></i> Latest blog posts and articles</li>
                <li><i className="fas fa-check-circle"></i> Exclusive webinar invitations</li>
                <li><i className="fas fa-check-circle"></i> Special offers and promotions</li>
              </ul>
            </div>
          </div>

          <div className="newsletter-form-section">
            <div className="newsletter-form-card">
              <h2>Subscribe Now</h2>
              <p className="form-subtitle">Join thousands of subscribers who trust us for financial insights</p>
              
              {success && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i>
                  <span>Successfully subscribed! Check your email for confirmation.</span>
                </div>
              )}
              
              {error && (
                <div className="alert alert-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="btn-subscribe" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-envelope"></i>
                      Subscribe to Newsletter
                    </>
                  )}
                </button>
              </form>

              <p className="privacy-note">
                <i className="fas fa-lock"></i>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            <div className="testimonials">
              <h3>What Our Subscribers Say</h3>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"The weekly market insights have helped me make better investment decisions. Highly recommended!"</p>
                <span className="author">- Rahul Sharma</span>
              </div>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"Excellent content and timely updates. The financial tips are practical and easy to follow."</p>
                <span className="author">- Priya Verma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Newsletter;