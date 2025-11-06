import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff8c69',
          colorText: '#2e2e2e',
          colorTextSecondary: '#8b95a5',
          fontSize: 16,
          borderRadius: 8
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
