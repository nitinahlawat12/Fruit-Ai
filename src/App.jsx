import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ChatboxPage from './components/ChatboxPage'; // Ensure this file exists
import ChatbotPage from './components/ChatboxPage';
import TranslatorPage from './components/TranslatorPage';
import FAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbox" element={<ChatboxPage />} /> {/* Route for ChatboxPage */}
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
