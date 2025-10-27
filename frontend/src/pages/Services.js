// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "./Services.css";

// const Services = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("https://rakusharma.onrender.com/api/services");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   return (
//     <div className="services-page">
//       <Navbar />

//       <div className="services-header">
//         <h1>Our Services</h1>
//         <p>
//           At Rakusha.com, we provide comprehensive financial and portfolio
//           advisory services designed to help you navigate market complexities,
//           manage risk, and, most importantly, recover and thrive. Our strategies
//           are not generic—they are meticulously customized, mathematically
//           sound, and built upon decades of market wisdom.
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




import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://rakusharma.onrender.com/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false); // Data aane ke baad loader hide
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
        {loading ? (
          <div className="loader">Loading services...</div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-detail-card">
              <h2>{service.title}</h2>
              <p className="service-description">{service.description}</p>
              <div className="service-about">
                <h3>About This Service</h3>
                <p>{service.about}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;
