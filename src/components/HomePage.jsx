import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Adjust the path to your CSS file if necessary

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Fruit.ai</h1>
      <div className="service-container">
        {/* Boxes for Login and Registration */}
        <div className="auth-boxes">
          <Link to="/login" className="auth-box login-box">
            Login
          </Link>
          <Link to="/register" className="auth-box register-box">
            Register
          </Link>
        </div>
        {/* Other Service Boxes */}
        <Link to="/chatbot" className="service-box chatbot-box">
          <h2>Chatbot</h2>
        </Link>
        <Link to="/translator" className="service-box translator-box">
          <h2>Translator</h2>
        </Link>
        <Link to="/faq" className="service-box faq-box">
          <h2>FAQ</h2>
        </Link>
        <Link to="/about" className="service-box about-box">
          <h2>About</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
