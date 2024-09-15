import React, { useState } from 'react';
import axios from 'axios';
import '../styles/translator.css'; // Adjust the path to your CSS file if necessary

const TranslatorPage = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('es'); // Default to Spanish

  const handleTextChange = (e) => setText(e.target.value);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleTranslate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text,
        target_language: language,
      });
      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Translation failed.');
    }
  };

  return (
    <div className="translator-container">
      <h1>Translator</h1>
      <form onSubmit={handleTranslate} className="translator-form">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to translate..."
          className="translator-input"
        />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="translator-select"
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="hi">Hindi</option> {/* Added Hindi option */}
          {/* Add more language options as needed */}
        </select>
        <button type="submit" className="translator-button">Translate</button>
      </form>
      <div className="translator-response">
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslatorPage;
