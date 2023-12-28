"use client";
import React, { useState } from 'react';

const leftPanelStyles = {
  width: '50%',
  float: 'left',
  padding: '20px',
  boxSizing: 'border-box',
  textAlign: 'center'
};

const rightPanelStyles = {
  width: '50%',
  float: 'left',
  padding: '20px',
  boxSizing: 'border-box',
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Mensaje enviado:', newMessage);
    // Aquí podrías enviar el mensaje a través de una API o realizar otra acción con el mensaje
    setMessages([...messages, { text: newMessage, sender: 'Me' }]);
    setNewMessage(''); // Limpiar el texto después de enviar el mensaje
  };

  return (
    <div>
      <div style={leftPanelStyles}>
        <h1>Mensajes</h1>
        <h2>Usuario</h2>
        <h3>Continue su discusión</h3>
      </div>
      <div style={rightPanelStyles}>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === 'Me' ? 'right' : 'left',
                margin: '5px 0',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: message.sender === 'Me' ? '#007bff' : '#eee',
                  color: message.sender === 'Me' ? '#fff' : '#000',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ width: '80%', padding: '8px' }}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={handleSendMessage} style={{ padding: '8px 12px', marginLeft: '10px' }}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
