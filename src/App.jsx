import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import NavigationBar from './components/NavigationBar';
import './App.less';

const { Content } = Layout;

const App = () => {
  return (
    <HashRouter>
      <Layout className="app-container">
        <Content className="content-wrapper">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Content>
        <NavigationBar />
      </Layout>
    </HashRouter>
  );
};

export default App;
