import React from 'react';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import './ChatBubble.less';

const ChatBubble = ({ message, loading }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
      <div className="bubble-content">
        {isUser ? (
          <UserOutlined className="bubble-icon user-icon" />
        ) : (
          <RobotOutlined className="bubble-icon ai-icon" />
        )}
        <div className="bubble-text">
          {loading ? (
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            message.text
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
