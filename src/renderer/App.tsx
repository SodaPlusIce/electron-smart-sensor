import React, { useState } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  MinusOutlined,
  CloseOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import jt_logo from '../../assets/images/jt_logo.png';
import yk_logo from '../../assets/images/yk_logo.png';
import seu_logo from '../../assets/images/seu_logo.png';
import './App.css';

import Overview1 from './components/SmartParticles/Overview1/Overview1';
import RealTimeData from './components/SmartParticles/RealTimeData/RealTimeData';
import ThreeD from './components/SmartParticles/ThreeD/ThreeD';
import Output from './components/SmartParticles/Output/Output';

const { Header, Content } = Layout;

// 模拟不同子系统的模块
const Overview2 = () => <div>总览图2</div>;
const Overview3 = () => <div>总览图3</div>;

function handleWindowAction(action: 'minimize' | 'maximize' | 'close') {
  window.electron.ipcRenderer.sendMessage('ipc-window-options', action);
}

// 首页显示三个按钮
const Home = ({
  onSelectSystem,
}: {
  onSelectSystem: (system: string) => void;
}) => {
  return (
    <div className="system-btns">
      <Button
        type="primary"
        size="large"
        onClick={() => onSelectSystem('smart-particles')}
      >
        智能颗粒
      </Button>
      <Button
        type="primary"
        size="large"
        onClick={() => onSelectSystem('piezo-sensor')}
      >
        压电传感器
      </Button>
      <Button
        type="primary"
        size="large"
        onClick={() => onSelectSystem('fiber-sensor')}
      >
        光纤传感器
      </Button>
    </div>
  );
};

const AppContent = () => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSystemSelect = (system: string) => {
    setSelectedSystem(system);
    console.log(system);

    navigate(`/${system}/overview`); // 默认路由
  };

  const handleHomeClick = () => {
    setSelectedSystem(null);
    navigate('/'); // 返回首页
  };

  // 路由管理，根据不同系统显示不同菜单项
  const getMenuItems = () => {
    switch (selectedSystem) {
      case 'smart-particles':
        return [
          { key: 'overview', label: '总览图' },
          { key: 'real-time-data', label: '实时数据' },
          { key: 'threeD', label: '3D姿态' },
          { key: 'output', label: '数据导出' },
        ];
      case 'piezo-sensor':
        return [{ key: 'overview', label: '压电总览' }];
      case 'fiber-sensor':
        return [{ key: 'overview', label: '光纤总览' }];
      default:
        return [];
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="app-header">
        <div className="logo-container">
          <img
            width="50"
            alt="seu_logo"
            src={seu_logo}
            onClick={handleHomeClick}
          />
          <img
            width="50"
            alt="jt_logo"
            src={jt_logo}
            onClick={handleHomeClick}
          />
          <img
            width="50"
            alt="yk_logo"
            src={yk_logo}
            onClick={handleHomeClick}
          />
        </div>

        <div className="header-title">
          {selectedSystem ? (
            <Menu
              mode="horizontal"
              selectedKeys={[]}
              style={{
                lineHeight: '64px',
                marginLeft: '30px',
              }}
              items={[
                {
                  key: 'home',
                  label: (
                    <Button
                      type="link"
                      onClick={handleHomeClick}
                      className="btn-nodrag"
                    >
                      首页
                    </Button>
                  ),
                },
                ...getMenuItems().map((item) => ({
                  key: item.key,
                  label: (
                    <Button
                      type="link"
                      onClick={() => navigate(`/${selectedSystem}/${item.key}`)}
                      className="btn-nodrag"
                    >
                      {item.label}
                    </Button>
                  ),
                })),
              ]}
            />
          ) : (
            '面向道路多场景健康监测的监测系统'
          )}
        </div>

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

      <Content>
        <Routes>
          <Route
            path="/"
            element={<Home onSelectSystem={handleSystemSelect} />}
          />

          {/* 智能颗粒系统路由 */}
          <Route path="/smart-particles/overview" element={<Overview1 />} />
          <Route
            path="/smart-particles/real-time-data"
            element={<RealTimeData />}
          />
          <Route path="/smart-particles/threeD" element={<ThreeD />} />
          <Route path="/smart-particles/output" element={<Output />} />

          {/* 压电传感器系统路由 */}
          <Route path="/piezo-sensor/overview" element={<Overview2 />} />

          {/* 光纤传感器系统路由 */}
          <Route path="/fiber-sensor/overview" element={<Overview3 />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
