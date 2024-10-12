import React, { useState } from 'react';
import { Select, Input, Button, Tooltip } from 'antd';
import './ConfigPanel.css';

const { Option } = Select;

interface ConfigPanelProps {
  updateConfigs: (
    x: number,
    xK1: number,
    xB1: number,
    xK2: number,
    xB2: number,
    y: number,
    yK1: number,
    yB1: number,
    yK2: number,
    yB2: number,
    z: number,
    zK1: number,
    zB1: number,
    zK2: number,
    zB2: number,
    t: number,
    tK1: number,
    tB1: number,
    tK2: number,
    tB2: number,
  ) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ updateConfigs }) => {
  const [portNumber, setPortNumber] = useState('COM7');
  const [baudRate, setBaudRate] = useState('9600');

  const [configs_x, setConfigsX] = useState<number>(1);
  const [configs_x_k1, setConfigsXK1] = useState<number>(1);
  const [configs_x_b1, setConfigsXB1] = useState<number>(1);
  const [configs_x_k2, setConfigsXK2] = useState<number>(1);
  const [configs_x_b2, setConfigsXB2] = useState<number>(1);
  const [configs_y, setConfigsY] = useState<number>(1);
  const [configs_y_k1, setConfigsYK1] = useState<number>(1);
  const [configs_y_b1, setConfigsYB1] = useState<number>(1);
  const [configs_y_k2, setConfigsYK2] = useState<number>(1);
  const [configs_y_b2, setConfigsYB2] = useState<number>(1);
  const [configs_z, setConfigsZ] = useState<number>(1);
  const [configs_z_k1, setConfigsZK1] = useState<number>(1);
  const [configs_z_b1, setConfigsZB1] = useState<number>(1);
  const [configs_z_k2, setConfigsZK2] = useState<number>(1);
  const [configs_z_b2, setConfigsZB2] = useState<number>(1);
  const [configs_t, setConfigsT] = useState<number>(1);
  const [configs_t_k1, setConfigsTK1] = useState<number>(1);
  const [configs_t_b1, setConfigsTB1] = useState<number>(1);
  const [configs_t_k2, setConfigsTK2] = useState<number>(1);
  const [configs_t_b2, setConfigsTB2] = useState<number>(1);

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

    updateConfigs(
      configs_x,
      configs_x_k1,
      configs_x_b1,
      configs_x_k2,
      configs_x_b2,
      configs_y,
      configs_y_k1,
      configs_y_b1,
      configs_y_k2,
      configs_y_b2,
      configs_z,
      configs_z_k1,
      configs_z_b1,
      configs_z_k2,
      configs_z_b2,
      configs_t,
      configs_t_k1,
      configs_t_b1,
      configs_t_k2,
      configs_t_b2,
    );
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
      <div className="config-section">
        <div className="config-row">
          <label>X分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1"
            onChange={(e) => setConfigsX(parseInt(e.target.value))}
          />
          <Tooltip
            title={
              '当V<=1，F=-51.41237，V+431.8986当V>1，F=-51.41237，V+431.8986'
            }
          >
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>X-K1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsXK1(parseInt(e.target.value))}
          />
          <label>X-B1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsXB1(parseInt(e.target.value))}
          />
        </div>
        <div className="config-row">
          <label>X-K2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsXK2(parseInt(e.target.value))}
          />
          <label>X-B2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsXB2(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="config-section">
        <div className="config-row">
          <label>Y分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1"
            onChange={(e) => setConfigsY(parseInt(e.target.value))}
          />
          <Tooltip title="分段点信息">
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>Y-K1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsYK1(parseInt(e.target.value))}
          />
          <label>Y-B1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsYB1(parseInt(e.target.value))}
          />
        </div>
        <div className="config-row">
          <label>Y-K2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsYK2(parseInt(e.target.value))}
          />
          <label>Y-B2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsYB2(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="config-section">
        <div className="config-row">
          <label>Z分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1"
            onChange={(e) => setConfigsZ(parseInt(e.target.value))}
          />
          <Tooltip title="分段点信息">
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>Z-K1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsZK1(parseInt(e.target.value))}
          />
          <label>Z-B1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsZB1(parseInt(e.target.value))}
          />
        </div>
        <div className="config-row">
          <label>Z-K2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1831.34"
            onChange={(e) => setConfigsZK2(parseInt(e.target.value))}
          />
          <label>Z-B2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-1374.63"
            onChange={(e) => setConfigsZB2(parseInt(e.target.value))}
          />
        </div>
      </div>

      <h3 className="config-title">温度传感器参数配置</h3>
      <div className="config-section">
        <div className="config-row">
          <label>T分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1"
            onChange={(e) => setConfigsT(parseInt(e.target.value))}
          />
          <Tooltip title="分段点信息">
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>T-K1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-51.41237"
            onChange={(e) => setConfigsTK1(parseInt(e.target.value))}
          />
          <label>T-B1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="431.8986"
            onChange={(e) => setConfigsTB1(parseInt(e.target.value))}
          />
        </div>
        <div className="config-row">
          <label>T-K2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-51.41237"
            onChange={(e) => setConfigsTK2(parseInt(e.target.value))}
          />
          <label>T-B2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="431.8986"
            onChange={(e) => setConfigsTB2(parseInt(e.target.value))}
          />
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
