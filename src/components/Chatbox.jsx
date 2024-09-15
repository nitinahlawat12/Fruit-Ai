import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbox.css'; // Updated import path

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: input, sender: 'user' }
            ]);
            setInput('');

            // Simulate a response from the bot
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'This is a simulated response.', sender: 'bot' }
                ]);
            }, 500); // Simulate a delay for the bot response
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chatbox">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Allow sending message with Enter key
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbox;
