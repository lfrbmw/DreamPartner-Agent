import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MessageOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
import './NavigationBar.less';

const { Footer } = Layout;

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: '/',
      icon: <MessageOutlined />,
      label: '对话',
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: '历史',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Footer className="navigation-bar">
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[location.pathname]}
        items={items}
        className="navigation-menu"
      />
    </Footer>
  );
};

export default NavigationBar;
