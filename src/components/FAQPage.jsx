import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/faq.css'; // Adjust the path to your CSS file if necessary

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  const handleAddFaq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/faqs', {
        question: newQuestion,
        answer: newAnswer,
      });
      setFaqs([...faqs, response.data]);
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/faqs/${editId}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      setFaqs(faqs.map(faq => 
        faq._id === editId ? { ...faq, question: editQuestion, answer: editAnswer } : faq
      ));
      setEditId(null);
      setEditQuestion('');
      setEditAnswer('');
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq._id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="faq-container">
      <h1>FAQ</h1>
      
      {/* Add FAQ Form */}
      <form onSubmit={handleAddFaq} className="faq-form">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New question"
          className="faq-input"
        />
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="New answer"
          className="faq-textarea"
        />
        <button type="submit" className="faq-button">Add FAQ</button>
      </form>

      {/* Edit FAQ Form */}
      {editId && (
        <form onSubmit={handleUpdateFaq} className="faq-form">
          <input
            type="text"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            placeholder="Edit question"
            className="faq-input"
          />
          <textarea
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            placeholder="Edit answer"
            className="faq-textarea"
          />
          <button type="submit" className="faq-button">Update FAQ</button>
        </form>
      )}

      {/* FAQ List */}
      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq._id} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            <button onClick={() => {
              setEditId(faq._id);
              setEditQuestion(faq.question);
              setEditAnswer(faq.answer);
            }} className="faq-button">Edit</button>
            <button onClick={() => handleDeleteFaq(faq._id)} className="faq-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
