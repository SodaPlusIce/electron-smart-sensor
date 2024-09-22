import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Button } from 'antd';
import {
  MinusOutlined,
  CloseOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import jt_logo from '../../assets/images/jt_logo.png';
import yk_logo from '../../assets/images/yk_logo.png';
import seu_logo from '../../assets/images/seu_logo.png';
import './App.css';

const { Header, Content } = Layout;

function handleWindowAction(action: 'minimize' | 'maximize' | 'close') {
  window.electron.ipcRenderer.sendMessage('ipc-window-options', action);
}

function Hello() {
  return <div>3</div>;
}

export default function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="app-header">
        <div className="logo-container">
          <img width="50" alt="seu_logo" src={seu_logo} />
          <img width="50" alt="jt_logo" src={jt_logo} />
          <img width="50" alt="yk_logo" src={yk_logo} />
        </div>

        <div className="header-title">面向道路多场景健康监测的监测系统</div>

        <div className="window-controls">
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleWindowAction('minimize')}
            size="small"
          />
          <Button
            icon={<ExpandOutlined />}
            onClick={() => handleWindowAction('maximize')}
            size="small"
          />
          <Button
            icon={<CloseOutlined />}
            onClick={() => handleWindowAction('close')}
            size="small"
            danger
          />
        </div>
      </Header>

      <Content style={{ padding: '20px' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Hello />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  );
}
