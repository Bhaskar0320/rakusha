


import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SEBI Website</h3>
          <p>Your trusted partner in financial services</p>
          <p className="sebi-reg">SEBI Registered Research Analyst</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/newsletter">Newsletter</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            {/* <li><Link to="/login">Admin Login</Link></li> */}
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><i className="fas fa-map-marker-alt"></i> Lucknow, Uttar Pradesh</p>
          <p><i className="fas fa-phone"></i> +91 86016 24242</p>
          <p><i className="fas fa-phone"></i> +91 94510 63822</p>
          <p><i className="fas fa-envelope"></i> rsharma@rakusha.com</p>
          <p><i className="fas fa-envelope"></i> ravisuvin@gmail.com</p>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SEBI Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
