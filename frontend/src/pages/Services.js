import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://rakusharma.onrender.com/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="services-page">
      <Navbar />

      <div className="services-header">
        <h1>Our Services</h1>
        <p>
          At Rakusha.com, we provide comprehensive financial and portfolio
          advisory services designed to help you navigate market complexities,
          manage risk, and, most importantly, recover and thrive. Our strategies
          are not generic—they are meticulously customized, mathematically
          sound, and built upon decades of market wisdom.
        </p>
      </div>

      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-detail-card">
            <h2>{service.title}</h2>
            <p className="service-description">{service.description}</p>
            <div className="service-about">
              <h3>About This Service</h3>
              <p>{service.about}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Services;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import './Services.css';

// const Services = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get('https://rakusharma.onrender.com/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   return (
//     <div className="services-page">
//       <Navbar />

//       <div className="services-header">
//         <h1>Our Services</h1>
//         <p>
//           At Rakusha.com, we provide comprehensive financial and portfolio advisory services designed to help you navigate market complexities, manage risk, and, most importantly, recover and thrive. Our strategies are meticulously customized, mathematically sound, and built upon decades of market wisdom.
//         </p>
//         <h3>Specialized Loss Recovery Services</h3>
//         <p>
//           In the volatile world of finance, experiencing losses can be daunting. Our specialized Loss Recovery Services are designed to move you from a state of setback to a consistently profitable zone.
//         </p>
//         <h3>Our Approach to Recovery</h3>
//         <p>
//           We don't offer quick fixes; we build a strategic roadmap for sustainable success. Our process involves a deep, expert-driven analysis to devise strategies that work for your specific situation.
//         </p>
//         <ul>
//           <li><strong>Customized Model Portfolio:</strong> We build a model portfolio tailored precisely to your unique financial profile, considering three critical factors:
//             <ol>
//               <li>Your Risk Profile: Ensuring the new strategy aligns with your comfort level and long-term goals.</li>
//               <li>The Magnitude of Your Losses: Quantifying the challenge to create a focused recovery target.</li>
//               <li>A Mathematical Approach: Utilizing rigorous quantitative methods to calculate the most efficient path back to profitability.</li>
//             </ol>
//           </li>
//           <li><strong>The Goal:</strong> Our aim is not just to recoup your losses, but to place you in a consistently profitable zone where you can build enduring wealth.</li>
//         </ul>
//         <h3>Important Consideration on Recovery</h3>
//         <p>
//           It is crucial to understand that loss recovery is a highly individualized process. The necessary strategy, the size of the loss, and the timeline for recovery will vary from client to client. This may or may not require the deployment of additional capital. Our experts will provide a transparent assessment and clear expectations regarding the path forward.
//         </p>
//         <h3>Expertise You Can Trust</h3>
//         <p>
//           The backbone of our advisory service is our highly experienced team. Our team of seasoned analysts brings a combined experience of more than 75 years in the financial markets. This veteran methodology and deep institutional knowledge mean you are getting insights derived from multiple market cycles—both booms and crises. We bring this collective wisdom to every portfolio decision, ensuring you benefit from battle-tested strategies that stand the test of time.
//         </p>
//       </div>

//       <div className="services-container">
//         {services.map((service) => (
//           <div key={service.id} className="service-detail-card">
//             <h2>{service.title}</h2>
//             <p className="service-description">{service.description}</p>
//             <div className="service-about">
//               <h3>About This Service</h3>
//               <p>{service.about}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Services;
