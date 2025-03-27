// src/components/ChatBot.js
import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // For toggling chatbot visibility

  // Predefined responses (extend this as needed)
  const botResponses = {
    'hi': 'Hello there! How can I help you?',
    'hello': 'Hi! What can I do for you today?',
    'help': 'I’m here to assist! What do you need help with?',
    'what can you do': 'I can answer questions, provide info, or assist with tasks. Try asking me anything!',
    'bye': 'Goodbye! Feel free to come back anytime.',
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Get bot response
    const lowerInput = input.toLowerCase().trim();
    const botReply = botResponses[lowerInput] || 'Sorry, I don’t understand that. Can you try something else?';
    const botMessage = { text: botReply, sender: 'bot' };

    // Add bot message after a slight delay for realism
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);

    setInput('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
          }}
        >
          Chat with Me
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            width: '300px',
            height: '400px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>ChatBot</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              backgroundColor: '#f9f9f9',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  margin: '5px 0',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: msg.sender === 'user' ? '#007bff' : '#e0e0e0',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    borderRadius: '15px',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '10px', display: 'flex' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px 0 0 5px',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;