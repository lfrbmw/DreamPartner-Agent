const CHAT_HISTORY_KEY = 'dazi_chat_history';
const SETTINGS_KEY = 'dazi_settings';

// 保存聊天记录
export const saveChatHistory = (messages) => {
  try {
    const allHistory = loadAllChatHistory();
    const now = new Date().toISOString();
    
    // 如果有历史记录且最后一条记录是今天，则更新它
    if (allHistory.length > 0) {
      const lastChat = allHistory[allHistory.length - 1];
      const lastChatDate = new Date(lastChat.timestamp);
      const today = new Date();
      
      if (lastChatDate.toDateString() === today.toDateString()) {
        // 更新最后一条记录
        lastChat.messages = messages;
        lastChat.timestamp = now;
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory));
        return;
      }
    }
    
    // 否则创建新记录
    const newChat = {
      id: Date.now(),
      timestamp: now,
      messages: messages
    };
    
    allHistory.push(newChat);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory));
  } catch (error) {
    console.error('保存聊天记录失败:', error);
  }
};

// 加载聊天记录
export const loadChatHistory = () => {
  try {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('加载聊天记录失败:', error);
    return [];
  }
};

// 加载所有聊天历史
export const loadAllChatHistory = () => {
  try {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('加载聊天历史失败:', error);
    return [];
  }
};

// 清空所有聊天记录
export const clearAllChatHistory = () => {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('清空聊天记录失败:', error);
  }
};

// 导出聊天记录
export const exportChatHistory = () => {
  try {
    const history = loadAllChatHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `梦幻搭子聊天记录_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('导出聊天记录失败:', error);
    throw error;
  }
};

// 保存设置
export const saveSettings = (settings) => {
  try {
    const currentSettings = loadSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  } catch (error) {
    console.error('保存设置失败:', error);
  }
};

// 加载设置
export const loadSettings = () => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {};
  } catch (error) {
    console.error('加载设置失败:', error);
    return {};
  }
};
