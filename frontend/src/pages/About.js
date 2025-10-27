// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import './About.css';

// const About = () => {
//   return (
//     <div className="about-page">
//       <Navbar />
      
//       <div className="about-header">
//         <h1>About Us</h1>
//         <p>Your Trusted SEBI Registered Financial Partner</p>
//       </div>

//       <div className="about-content">
//         <section className="about-section">
//           <h2>Who We Are</h2>
//           <p>
//             We are a SEBI registered financial services company dedicated to providing
//             comprehensive investment advisory and portfolio management services. With years
//             of expertise in the Indian financial markets, we help our clients achieve their
//             financial goals through strategic planning and expert guidance.
//           </p>
//           <p>
//             Our team of certified professionals ensures that every investment decision
//             is backed by thorough research and analysis, keeping your financial security
//             as our top priority.
//           </p>
//         </section>

//         <section className="about-section">
//           <h2>Our Mission</h2>
//           <p>
//             To empower individuals and businesses with expert financial guidance and 
//             innovative investment solutions that create lasting wealth and financial security.
//           </p>
//         </section>

//         <section className="about-section">
//           <h2>Our Vision</h2>
//           <p>
//             To be India's most trusted and customer-centric financial services provider,
//             known for integrity, expertise, and exceptional results.
//           </p>
//         </section>

//         <section className="about-section">
//           <h2>Why Choose Us</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <i className="fas fa-certificate"></i>
//               <h3>SEBI Registered</h3>
//               <p>Fully compliant with SEBI regulations and guidelines</p>
//             </div>
//             <div className="feature-card">
//               <i className="fas fa-users"></i>
//               <h3>Expert Team</h3>
//               <p>Certified professionals with years of market experience</p>
//             </div>
//             <div className="feature-card">
//               <i className="fas fa-shield-alt"></i>
//               <h3>Secure & Transparent</h3>
//               <p>Complete transparency in all our operations</p>
//             </div>
//             <div className="feature-card">
//               <i className="fas fa-chart-line"></i>
//               <h3>Proven Track Record</h3>
//               <p>Consistent results and satisfied clients</p>
//             </div>
//           </div>
//         </section>

//         <section className="about-section">
//           <h2>Our Values</h2>
//           <ul className="values-list">
//             <li><strong>Integrity:</strong> We maintain the highest ethical standards in all our dealings</li>
//             <li><strong>Excellence:</strong> We strive for excellence in every service we provide</li>
//             <li><strong>Client-First:</strong> Your financial success is our primary goal</li>
//             <li><strong>Innovation:</strong> We continuously adapt to market changes and innovations</li>
//             <li><strong>Transparency:</strong> Complete openness in our processes and recommendations</li>
//           </ul>
//         </section>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default About;




import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-header">
        <h1>About Us</h1>
        <p>Your Trusted SEBI Registered Financial Partner</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Ravi Kumar Sharma is a SEBI registered Research Analyst, and powered by a team of
            seasoned market experts with decades of combined experience in strategy,
            trading, and capital markets. Our mission is to help clients navigate complex
            financial landscapes and achieve consistent growth.
          </p>
          <p>
            Our professionals combine strategic vision, quantitative expertise, and market
            acumen to deliver precise, actionable financial guidance across equities,
            options, futures, and global markets.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Experts</h2>

          <div className="expert-card">
            <h3>Ravi Kumar Sharma: Strategy, Finance, and Advanced Trading</h3>
            <p>
              Ravi Kumar Sharma is a dynamic financial expert with over 15 years of experience
              in options trading, strategic planning, and risk management. Holding dual Master's
              degrees in Finance and Commerce, and a Fellowship from PwC, the Government of
              Chhattisgarh, and the US Consulates, he excels in applying the Business Model Canvas
              and Design Thinking to create innovative, financially sound strategies.
            </p>
            <p>
              Ravi specializes in advanced quantitative techniques, hedging, statistical arbitrage,
              and market timing using Black-Scholes and binomial pricing models. He actively trades
              in US, Indian, and European markets, leveraging his expertise in Level 2 data and
              proprietary futures accounts to achieve consistent success.
            </p>
          </div>

          <div className="expert-card">
            <h3>Rajeev Sinha: Capital Market Veteran and Valuation Expert</h3>
            <p>
              Rajeev Sinha brings over 20 years of experience in the Indian capital markets,
              excelling in equity and enterprise valuations, portfolio management, and strategic
              investment decisions. An MBA from BHU, he combines deep analytical rigor with a
              360-degree understanding of brokerage and banking systems.
            </p>
            <p>
              With expertise in translating complex data into actionable insights and integrating
              geopolitical trends into market forecasts, Rajeev helps clients anticipate risks,
              seize opportunities, and achieve sustainable growth even in volatile conditions.
            </p>
          </div>

          <div className="expert-card">
            <h3>Ashish Nigam: Options Strategist and Market Forecaster</h3>
            <p>
              Ashish Nigam has over 20 years of experience in advanced options strategies, hedging,
              and pair trading. With a Master's in Economics, he combines quantitative analysis and
              practical market expertise to optimize returns while managing risk.
            </p>
            <p>
              Ashish's market forecasting ability is renowned, with proven predictions of events
              such as the 2008 recession and post-COVID recovery. He identifies high-growth
              opportunities early, consistently delivering exponential returns for his clientele.
            </p>
          </div>

          <div className="expert-card">
            <h3>Biranchi Narayan Mahapatra: Futures Trading Specialist</h3>
            <p>
              Biranchi Narayan Mahapatra is a Day Trading Specialist with over 5 years of
              experience in proprietary trading. An NIT Rourkela graduate with the ZISHI Level 5
              Advanced Diploma, he has mastered US Futures markets including Nasdaq, S&P 500,
              and COMEX commodities.
            </p>
            <p>
              Known for consistent profitability, Biranchi leverages advanced technical analysis,
              precise market timing, and disciplined risk management to excel in the competitive
              futures trading arena.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To empower individuals and businesses with expert financial guidance, innovative
            investment solutions, and actionable strategies that create lasting wealth and
            financial security.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To be India's most trusted, customer-centric financial services provider, known for
            integrity, expertise, and exceptional market performance.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-certificate"></i>
              <h3>SEBI Registered</h3>
              <p>Fully compliant with SEBI regulations and guidelines</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Expert Team</h3>
              <p>Highly experienced professionals with proven track records</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Secure & Transparent</h3>
              <p>Complete transparency and trust in all our operations</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Proven Track Record</h3>
              <p>Consistent market-beating results for our clients</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li><strong>Integrity:</strong> Upholding the highest ethical standards in all dealings</li>
            <li><strong>Excellence:</strong> Pursuing excellence in every service provided</li>
            <li><strong>Client-First:</strong> Prioritizing your financial success above all</li>
            <li><strong>Innovation:</strong> Continuously adapting to market innovations and trends</li>
            <li><strong>Transparency:</strong> Ensuring openness and clarity in our processes</li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
