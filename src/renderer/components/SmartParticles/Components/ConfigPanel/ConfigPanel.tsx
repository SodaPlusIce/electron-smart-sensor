import React, { useState } from 'react';
import { Select, Input, Button, Tooltip } from 'antd';
import './ConfigPanel.css';

const { Option } = Select;

const ConfigPanel: React.FC = () => {
  const [portNumber, setPortNumber] = useState('COM7');
  const [baudRate, setBaudRate] = useState('9600');

  const handlePortNumberChange = (value: string) => {
    console.log(`Selected Port: ${value}`);
    setPortNumber(value);
  };

  const handleBaudRateChange = (value: string) => {
    console.log(`Selected Baud Rate: ${value}`);
    setBaudRate(value);
  };

  const handleSubmit = () => {
    window.electron.ipcRenderer.sendMessage('ipc-port-info', {
      portNumber: portNumber,
      baudRate: baudRate,
    });
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  return (
    <div className="config-panel">
      <h3 className="config-title">导出端口</h3>
      <div className="config-row">
        <label>COM&nbsp;&nbsp;</label>
        <Select
          defaultValue="COM7"
          onChange={handlePortNumberChange}
          className="config-select"
        >
          {Array.from({ length: 18 }, (_, i) => (
            <Option key={i + 1} value={'COM' + `${i + 1}`}>
              {'COM' + (i + 1)}
            </Option>
          ))}
        </Select>
        <label>波特率&nbsp;&nbsp;</label>
        <Select
          defaultValue="9600"
          onChange={handleBaudRateChange}
          className="config-select"
        >
          <Option value="7200">7200</Option>
          <Option value="9600">9600</Option>
          <Option value="115200">115200</Option>
        </Select>
      </div>

      <h3 className="config-title">压力传感器参数配置</h3>
      {['X', 'Y', 'Z'].map((axis) => (
        <div key={axis} className="config-section">
          <div className="config-row">
            <label>{axis}分段点&nbsp;&nbsp;</label>
            <Input className="config-input" />
            <Tooltip title="分段点信息">
              <span className="info-icon">ℹ️</span>
            </Tooltip>
          </div>
          <div className="config-row">
            <label>{axis}-K1&nbsp;&nbsp;</label>
            <Input className="config-input" defaultValue="1831.34" />
            <label>{axis}-B1&nbsp;&nbsp;</label>
            <Input className="config-input" defaultValue="-1404.63" />
          </div>
          <div className="config-row">
            <label>{axis}-K2&nbsp;&nbsp;</label>
            <Input className="config-input" defaultValue="1831.34" />
            <label>{axis}-B2&nbsp;&nbsp;</label>
            <Input className="config-input" defaultValue="-1404.63" />
          </div>
        </div>
      ))}

      <h3 className="config-title">温度传感器参数配置</h3>
      <div className="config-section">
        <div className="config-row">
          <label>T分段点&nbsp;&nbsp;</label>
          <Input className="config-input" />
          <Tooltip title="分段点信息">
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>T-K1&nbsp;&nbsp;</label>
          <Input className="config-input" defaultValue="-51.41237" />
          <label>T-B1&nbsp;&nbsp;</label>
          <Input className="config-input" defaultValue="431.8986" />
        </div>
        <div className="config-row">
          <label>T-K2&nbsp;&nbsp;</label>
          <Input className="config-input" defaultValue="-51.41237" />
          <label>T-B2&nbsp;&nbsp;</label>
          <Input className="config-input" defaultValue="431.8986" />
        </div>
      </div>

      <div className="button-group">
        <Button type="primary" onClick={handleSubmit}>
          确认
        </Button>
        <Button onClick={handleCancel}>结束</Button>
      </div>
    </div>
  );
};

export default ConfigPanel;
