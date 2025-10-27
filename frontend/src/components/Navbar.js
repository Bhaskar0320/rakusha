import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Rakusha (Ravi Kumar Sharma, SEBI RA)
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => scrollToSection('about-section')}>
              About
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => scrollToSection('services-section')}>
              Services
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => scrollToSection('blogs-section')}>
              Blogs
            </span>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/admin" className="nav-links" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;