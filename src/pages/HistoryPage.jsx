import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Empty, Modal } from 'antd';
import { loadAllChatHistory, clearAllChatHistory } from '../utils/storage';
import './HistoryPage.less';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setChatHistory(loadAllChatHistory());
  }, []);

  const handleClearHistory = () => {
    setIsModalVisible(true);
  };

  const confirmClearHistory = () => {
    clearAllChatHistory();
    setChatHistory([]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getPreviewText = (messages) => {
    if (!messages || messages.length === 0) return '';
    const firstMessage = messages[0];
    return firstMessage.text.length > 30 
      ? firstMessage.text.substring(0, 30) + '...' 
      : firstMessage.text;
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">聊天记录</h1>
        {chatHistory.length > 0 && (
          <Button 
            onClick={handleClearHistory}
            className="clear-button"
          >
            清空记录
          </Button>
        )}
      </div>

      {chatHistory.length > 0 ? (
        <List
          className="history-list"
          dataSource={chatHistory}
          renderItem={(chat) => (
            <List.Item 
              className="history-item"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <div className="history-content">
                <div className="history-date">
                  {formatDate(chat.timestamp)}
                </div>
                <div className="history-preview">
                  {getPreviewText(chat.messages)}
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty 
          description="暂无聊天记录" 
          className="empty-history"
          imageStyle={{ height: 80 }}
        />
      )}

      <Modal
        title="确认清空"
        visible={isModalVisible}
        onOk={confirmClearHistory}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        className="clear-confirm-modal"
      >
        <p>确定要清空所有聊天记录吗？此操作不可恢复。</p>
      </Modal>
    </div>
  );
};

export default HistoryPage;
