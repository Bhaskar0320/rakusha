import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Newsletter from './pages/Newsletter';
import FAQs from './pages/FAQs';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/add-service" element={<ProtectedRoute><AddService /></ProtectedRoute>} />
        <Route path="/admin/edit-service/:id" element={<ProtectedRoute><EditService /></ProtectedRoute>} />
        <Route path="/admin/add-blog" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />
        <Route path="/admin/edit-blog/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;