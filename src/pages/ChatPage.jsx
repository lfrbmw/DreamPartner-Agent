import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, List } from 'antd';
import { SendOutlined, SettingOutlined } from '@ant-design/icons';
import ChatBubble from '../components/ChatBubble';
import { getAIResponse } from '../services/aiService';
import { saveChatHistory, loadChatHistory } from '../utils/storage';
import './ChatPage.less';

const { TextArea } = Input;

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 初始化聊天历史
  useEffect(() => {
    const history = loadChatHistory();
    if (history.length > 0) {
      setMessages(history[history.length - 1].messages);
    } else {
      // 添加欢迎消息
      const welcomeMessage = {
        id: Date.now(),
        text: '你好呀！我是你的梦幻搭子，今天过得怎么样？',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // 滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setLoading(true);

    try {
      // 获取AI回复
      const aiResponse = await getAIResponse(inputValue, newMessages);
      
      // 添加AI消息
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      
      // 保存聊天记录
      saveChatHistory(updatedMessages);
    } catch (error) {
      console.error('获取AI回复失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: '抱歉，我暂时无法回应，请稍后再试~',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1 className="chat-title">梦幻搭子</h1>
        <Button 
          type="text" 
          icon={<SettingOutlined />} 
          className="settings-button"
          onClick={() => navigate('/settings')}
        />
      </div>

      <div className="chat-messages">
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item className="message-item">
              <ChatBubble message={message} loading={loading && message.sender === 'ai'} />
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleKeyPress}
          placeholder="和你的搭子说点什么..."
          autoSize={{ minRows: 2, maxRows: 4 }}
          className="chat-input"
          disabled={loading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          className="send-button"
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
