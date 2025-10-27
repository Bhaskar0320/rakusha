import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './FAQs.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqsData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is SEBI and why is registration important?",
          answer: "SEBI (Securities and Exchange Board of India) is the regulatory authority for securities market in India. SEBI registration ensures that we operate under strict regulatory guidelines, providing you with a secure and transparent investment environment. It demonstrates our commitment to maintaining the highest standards of integrity and professionalism."
        },
        {
          question: "How long have you been in the financial services industry?",
          answer: "We have been providing financial advisory and portfolio management services for over a decade. Our experienced team has successfully navigated various market cycles and helped hundreds of clients achieve their financial goals."
        },
        {
          question: "What types of clients do you work with?",
          answer: "We work with a diverse range of clients including individual investors, high-net-worth individuals (HNIs), corporate clients, and institutional investors. Our services are tailored to meet the specific needs of each client segment."
        },
        {
          question: "How do I get started with your services?",
          answer: "Getting started is simple! You can contact us through our website, call our office, or visit us in person. We'll schedule an initial consultation to understand your financial goals and recommend suitable services."
        }
      ]
    },
    {
      category: "Services & Investment",
      questions: [
        {
          question: "What investment services do you offer?",
          answer: "We offer intraday trade ideas, positional trade ideas, hedging strategies, and advanced arbitrage insights, designed to help investors make informed decisions. Our research-driven approach ensures that each recommendation aligns with your risk profile and financial objectives."
        },
        {
          question: "What is the minimum investment amount required?",
          answer: "The minimum investment amount varies depending on the service. For Portfolio Management Services, the minimum is typically ₹50 lakhs. For advisory services and mutual fund investments, we can start with amounts as low as ₹10,000. Contact us for specific details about each service."
        },
        {
          question: "How do you determine the right investment strategy for me?",
          answer: "We follow a comprehensive process that includes understanding your financial goals, risk tolerance, investment horizon, current financial situation, and future obligations. Based on this analysis, we create a personalized investment strategy aligned with your objectives."
        },
        {
          question: "Can I customize my portfolio?",
          answer: "Yes, absolutely! We believe in personalized portfolio management. You can discuss your preferences, sectors you want to invest in, ESG considerations, and any specific requirements. We'll tailor the portfolio accordingly while ensuring it meets your financial goals."
        }
      ]
    },
    {
      category: "Fees & Charges",
      questions: [
        {
          question: "What are your fee structures?",
          answer: "Our fee structure is transparent and competitive. For Portfolio Management Services, we charge a percentage of assets under management (typically 1-2.5% annually). Advisory services may have fixed fees or success-based fees. We'll provide complete fee disclosure during our initial consultation."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, we believe in complete transparency. All charges including management fees, transaction costs, and any other applicable charges are clearly disclosed upfront. You'll receive detailed statements showing all fees charged."
        },
        {
          question: "How are performance fees calculated?",
          answer: "Performance fees, if applicable, are calculated based on the returns generated above a predefined benchmark. We follow SEBI guidelines strictly, ensuring fair and transparent performance fee calculation. Details will be provided in your service agreement."
        },
        {
          question: "Do you offer any fee waivers or discounts?",
          answer: "We may offer fee concessions for large portfolios or long-term commitments. Family accounts may also be eligible for preferential fee structures. Please discuss this during your consultation."
        }
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "How safe is my money with you?",
          answer: "Your investments are held in your name with SEBI-registered depositories (NSDL/CDSL) and custodians. We only have advisory/management authority as per your mandate. Your assets remain in your custody, ensuring maximum safety. We cannot withdraw funds from your account."
        },
        {
          question: "What measures do you take to protect my data?",
          answer: "We use bank-grade encryption for all digital communications and transactions. Our systems are regularly audited for security. We strictly follow data privacy regulations and never share your personal information with third parties without your consent."
        },
        {
          question: "Are my investments insured?",
          answer: "While investments in securities carry market risk and aren't insured like bank deposits, we follow strict risk management protocols. We also recommend appropriate insurance coverage for your overall financial plan to protect against unforeseen circumstances."
        },
        {
          question: "What happens if your company closes?",
          answer: "Since all investments are held in your name with depositories and not with us, your assets remain secure. You'll continue to own all your securities and can transfer management to another advisor or manage them yourself."
        }
      ]
    },
    {
      category: "Reports & Communication",
      questions: [
        {
          question: "How often will I receive portfolio reports?",
          answer: "We provide monthly portfolio statements showing all transactions, holdings, and performance. Quarterly detailed reviews are conducted to assess progress towards your goals. You also have 24/7 access to your portfolio through our online portal."
        },
        {
          question: "Can I track my investments online?",
          answer: "Yes, we provide a secure online portal where you can view your portfolio in real-time, check transaction history, download reports, and communicate with your advisor. Mobile app access is also available."
        },
        {
          question: "How quickly do you respond to queries?",
          answer: "We strive to respond to all queries within 24 hours on business days. For urgent matters, you can reach your dedicated relationship manager directly via phone. We also provide email and WhatsApp support for quick communication."
        },
        {
          question: "Do you provide market updates and research reports?",
          answer: "Yes, we regularly share market insights, research reports, and investment opportunities with our clients. You'll also receive our monthly newsletter with expert analysis and financial planning tips."
        }
      ]
    },
    {
      category: "Withdrawal & Exit",
      questions: [
        {
          question: "Can I withdraw my money anytime?",
          answer: "Yes, you can withdraw your investments subject to the terms of specific products. Equity holdings can typically be liquidated within 2-3 business days. Some products may have lock-in periods or exit loads, which will be clearly communicated upfront."
        },
        {
          question: "Is there a lock-in period?",
          answer: "Lock-in periods depend on the specific investment products. Tax-saving investments like ELSS have a mandatory 3-year lock-in. Our advisory and PMS services don't have lock-ins, though we recommend staying invested for optimal results."
        },
        {
          question: "What are the charges for early exit?",
          answer: "Exit loads, if any, depend on the specific product and tenure. We'll provide complete information about exit charges before you invest. Our goal is transparency, so you can make informed decisions."
        },
        {
          question: "How do I terminate services?",
          answer: "You can terminate services by providing written notice as per the agreement terms. We'll process all pending transactions, provide final statements, and ensure smooth transition. There's no penalty for terminating advisory services."
        }
      ]
    }
  ];

  const toggleAccordion = (categoryIndex, questionIndex) => {
    const newIndex = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === newIndex ? null : newIndex);
  };

  return (
    <div className="faqs-page">
      <Navbar />
      
      <div className="faqs-hero">
        <div className="faqs-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services, investments, and processes</p>
        </div>
      </div>

      <div className="faqs-container">
        <div className="faqs-intro">
          <h2>How Can We Help You?</h2>
          <p>
            Below you'll find answers to the most common questions about our SEBI registered 
            financial services. If you can't find what you're looking for, feel free to 
            <a href="/contact"> contact us</a> directly.
          </p>
        </div>

        <div className="faqs-content">
          {faqsData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="category-title">
                <i className="fas fa-folder-open"></i>
                {category.category}
              </h3>
              
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => {
                  const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
                  return (
                    <div 
                      key={questionIndex} 
                      className={`faq-item ${isActive ? 'active' : ''}`}
                    >
                      <div 
                        className="faq-question"
                        onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                      >
                        <h4>{faq.question}</h4>
                        <span className="faq-icon">
                          {isActive ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
                        </span>
                      </div>
                      <div className={`faq-answer ${isActive ? 'show' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faqs-cta">
          <div className="cta-card">
            <i className="fas fa-question-circle"></i>
            <h3>Still Have Questions?</h3>
            <p>Can't find the answer you're looking for? Our team is here to help!</p>
            <a href="/contact" className="btn-contact">Contact Us</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQs;