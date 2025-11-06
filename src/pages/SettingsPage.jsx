import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { HeartOutlined, SmileOutlined } from '@ant-design/icons';
import { loadSettings, saveSettings, exportChatHistory, clearAllChatHistory } from '../utils/storage';
import './SettingsPage.less';

const personalityTypes = [
  { id: 'gentle', name: '温柔体贴', description: '像春风般温暖，细腻关怀你的情绪', color: '#a8e6cf' },
  { id: 'humorous', name: '幽默风趣', description: '用轻松幽默化解你的烦恼', color: '#ffd8a8' },
  { id: 'mature', name: '成熟稳重', description: '理性分析，给你可靠建议', color: '#d0bdf4' },
  { id: 'lively', name: '活泼可爱', description: '充满活力，带来阳光般的好心情', color: '#ff9cce' }
];

const SettingsPage = () => {
  const [selectedPersonality, setSelectedPersonality] = useState('gentle');
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);

  useEffect(() => {
    const settings = loadSettings();
    if (settings.personality) {
      setSelectedPersonality(settings.personality);
    }
  }, []);

  const handlePersonalityChange = (personalityId) => {
    setSelectedPersonality(personalityId);
    saveSettings({ personality: personalityId });
    message.success('性格设置已保存');
  };

  const handleExportHistory = () => {
    try {
      exportChatHistory();
      message.success('聊天记录已导出');
    } catch (error) {
      message.error('导出失败，请重试');
    }
    setIsExportModalVisible(false);
  };

  const handleClearHistory = () => {
    clearAllChatHistory();
    message.success('聊天记录已清空');
    setIsClearModalVisible(false);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">搭子设置</h1>
      </div>

      <div className="settings-section">
        <h2 className="section-title">
          <HeartOutlined className="section-icon" />
          性格设置
        </h2>
        <p className="section-description">选择你喜爱的搭子性格</p>
        
        <div className="personality-options">
          {personalityTypes.map((personality) => (
            <div
              key={personality.id}
              className={`personality-option ${
                selectedPersonality === personality.id ? 'selected' : ''
              }`}
              onClick={() => handlePersonalityChange(personality.id)}
              style={{ borderColor: personality.color }}
            >
              <div 
                className="personality-color" 
                style={{ backgroundColor: personality.color }}
              ></div>
              <div className="personality-info">
                <h3 className="personality-name">{personality.name}</h3>
                <p className="personality-description">{personality.description}</p>
              </div>
              {selectedPersonality === personality.id && (
                <SmileOutlined className="selected-icon" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">
          <HeartOutlined className="section-icon" />
          数据管理
        </h2>
        <p className="section-description">管理你的聊天记录</p>
        
        <div className="data-actions">
          <Button 
            block 
            onClick={() => setIsExportModalVisible(true)}
            className="data-action-button export-button"
          >
            导出记录
          </Button>
          <Button 
            block 
            danger
            onClick={() => setIsClearModalVisible(true)}
            className="data-action-button clear-button"
          >
            清空记录
          </Button>
        </div>
        
        <div className="data-notice">
          <p>注意：聊天记录仅保存在您的本地浏览器中，清除浏览器数据将导致记录丢失。</p>
        </div>
      </div>

      <Modal
        title="导出聊天记录"
        visible={isExportModalVisible}
        onOk={handleExportHistory}
        onCancel={() => setIsExportModalVisible(false)}
        okText="确认导出"
        cancelText="取消"
      >
        <p>将导出所有聊天记录为JSON文件，您可以在其他设备上导入使用。</p>
      </Modal>

      <Modal
        title="清空聊天记录"
        visible={isClearModalVisible}
        onOk={handleClearHistory}
        onCancel={() => setIsClearModalVisible(false)}
        okText="确认清空"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <p>确定要清空所有聊天记录吗？此操作不可恢复。</p>
      </Modal>
    </div>
  );
};

export default SettingsPage;
