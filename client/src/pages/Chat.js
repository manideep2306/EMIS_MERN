import React, { useState } from 'react';

const Chat = ({ userType, userId }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic to send the message to the appropriate user
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-body">
        {/* Display chat messages */}
      </div>
      <div className="chat-footer">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Type your message" value={message} onChange={handleMessageChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;