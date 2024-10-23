import React, { useState } from 'react';
import { Select, Input, Button, Tooltip, notification } from 'antd';
import './ConfigPanel.css';

const { Option } = Select;

const ConfigPanel: React.FC = () => {
  const [portNumber, setPortNumber] = useState('COM7');
  const [baudRate, setBaudRate] = useState('9600');

  const [configs_x, setConfigsX] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_x') || '1'),
  );
  const [configs_x_k1, setConfigsXK1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_x_k1') || '1831.34'),
  );
  const [configs_x_b1, setConfigsXB1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_x_b1') || '-1374.63'),
  );
  const [configs_x_k2, setConfigsXK2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_x_k2') || '1831.34'),
  );
  const [configs_x_b2, setConfigsXB2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_x_b2') || '-1374.63'),
  );

  const [configs_y, setConfigsY] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_y') || '1'),
  );
  const [configs_y_k1, setConfigsYK1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_y_k1') || '1831.34'),
  );
  const [configs_y_b1, setConfigsYB1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_y_b1') || '-1374.63'),
  );
  const [configs_y_k2, setConfigsYK2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_y_k2') || '1831.34'),
  );
  const [configs_y_b2, setConfigsYB2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_y_b2') || '-1374.63'),
  );

  const [configs_z, setConfigsZ] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_z') || '1'),
  );
  const [configs_z_k1, setConfigsZK1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_z_k1') || '1831.34'),
  );
  const [configs_z_b1, setConfigsZB1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_z_b1') || '-1374.63'),
  );
  const [configs_z_k2, setConfigsZK2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_z_k2') || '1831.34'),
  );
  const [configs_z_b2, setConfigsZB2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_z_b2') || '-1374.63'),
  );

  const [configs_t, setConfigsT] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_t') || '1'),
  );
  const [configs_t_k1, setConfigsTK1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_t_k1') || '-51.41237'),
  );
  const [configs_t_b1, setConfigsTB1] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_t_b1') || '431.8986'),
  );
  const [configs_t_k2, setConfigsTK2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_t_k2') || '-51.41237'),
  );
  const [configs_t_b2, setConfigsTB2] = useState<number>(() =>
    parseFloat(sessionStorage.getItem('configs_t_b2') || '431.8986'),
  );
  const [btnIfDisabled, setBtnIfDisabled] = useState<boolean>(
    () => Boolean(sessionStorage.getItem('btnIfDisabled')) || false,
  );

  // 存储参数到 sessionStorage
  const saveConfigs = () => {
    sessionStorage.setItem('configs_x', configs_x.toString());
    sessionStorage.setItem('configs_x_k1', configs_x_k1.toString());
    sessionStorage.setItem('configs_x_b1', configs_x_b1.toString());
    sessionStorage.setItem('configs_x_k2', configs_x_k2.toString());
    sessionStorage.setItem('configs_x_b2', configs_x_b2.toString());

    sessionStorage.setItem('configs_y', configs_y.toString());
    sessionStorage.setItem('configs_y_k1', configs_y_k1.toString());
    sessionStorage.setItem('configs_y_b1', configs_y_b1.toString());
    sessionStorage.setItem('configs_y_k2', configs_y_k2.toString());
    sessionStorage.setItem('configs_y_b2', configs_y_b2.toString());

    sessionStorage.setItem('configs_z', configs_z.toString());
    sessionStorage.setItem('configs_z_k1', configs_z_k1.toString());
    sessionStorage.setItem('configs_z_b1', configs_z_b1.toString());
    sessionStorage.setItem('configs_z_k2', configs_z_k2.toString());
    sessionStorage.setItem('configs_z_b2', configs_z_b2.toString());

    sessionStorage.setItem('configs_t', configs_t.toString());
    sessionStorage.setItem('configs_t_k1', configs_t_k1.toString());
    sessionStorage.setItem('configs_t_b1', configs_t_b1.toString());
    sessionStorage.setItem('configs_t_k2', configs_t_k2.toString());
    sessionStorage.setItem('configs_t_b2', configs_t_b2.toString());
  };

  const handlePortNumberChange = (value: string) => {
    setPortNumber(value);
  };

  const handleBaudRateChange = (value: string) => {
    setBaudRate(value);
  };

  const handleSubmit = () => {
    saveConfigs();
    setBtnIfDisabled(true);
    sessionStorage.setItem('btnIfDisabled', 'true');
    window.electron.ipcRenderer.sendMessage('ipc-port-info', {
      portNumber: portNumber,
      baudRate: baudRate,
    });
  };

  const handleReset = () => {
    setConfigsX(1);
    setConfigsXK1(1831.34);
    setConfigsXB1(-1374.63);
    setConfigsXK2(1831.34);
    setConfigsXB2(-1374.63);
    setConfigsY(1);
    setConfigsYK1(1831.34);
    setConfigsYB1(-1374.63);
    setConfigsYK2(1831.34);
    setConfigsYB2(-1374.63);
    setConfigsZ(1);
    setConfigsZK1(1831.34);
    setConfigsZB1(-1374.63);
    setConfigsZK2(1831.34);
    setConfigsZB2(-1374.63);
    setConfigsT(1);
    setConfigsTK1(-51.41237);
    setConfigsTB1(431.8986);
    setConfigsTK2(-51.41237);
    setConfigsTB2(431.8986);

    sessionStorage.setItem('configs_x', '1');
    sessionStorage.setItem('configs_x_k1', '1831.34');
    sessionStorage.setItem('configs_x_b1', '-1374.63');
    sessionStorage.setItem('configs_x_k2', '1831.34');
    sessionStorage.setItem('configs_x_b2', '-1374.63');

    sessionStorage.setItem('configs_y', '1');
    sessionStorage.setItem('configs_y_k1', '1831.34');
    sessionStorage.setItem('configs_y_b1', '-1374.63');
    sessionStorage.setItem('configs_y_k2', '1831.34');
    sessionStorage.setItem('configs_y_b2', '-1374.63');

    sessionStorage.setItem('configs_z', '1');
    sessionStorage.setItem('configs_z_k1', '1831.34');
    sessionStorage.setItem('configs_z_b1', '-1374.63');
    sessionStorage.setItem('configs_z_k2', '1831.34');
    sessionStorage.setItem('configs_z_b2', '-1374.63');

    sessionStorage.setItem('configs_t', '1');
    sessionStorage.setItem('configs_t_k1', '-51.41237');
    sessionStorage.setItem('configs_t_b1', '431.8986');
    sessionStorage.setItem('configs_t_k2', '-51.41237');
    sessionStorage.setItem('configs_t_b2', '431.8986');
  };

  const handleOutput = () => {
    window.electron.ipcRenderer.sendMessage('ipc-output-data', {
      begin: true,
      configs: [
        sessionStorage.getItem('configs_x'),
        sessionStorage.getItem('configs_x_k1'),
        sessionStorage.getItem('configs_x_b1'),
        sessionStorage.getItem('configs_x_k2'),
        sessionStorage.getItem('configs_x_b2'),
        sessionStorage.getItem('configs_y'),
        sessionStorage.getItem('configs_y_k1'),
        sessionStorage.getItem('configs_y_b1'),
        sessionStorage.getItem('configs_y_k2'),
        sessionStorage.getItem('configs_y_b2'),
        sessionStorage.getItem('configs_z'),
        sessionStorage.getItem('configs_z_k1'),
        sessionStorage.getItem('configs_z_b1'),
        sessionStorage.getItem('configs_z_k2'),
        sessionStorage.getItem('configs_z_b2'),
        sessionStorage.getItem('configs_t'),
        sessionStorage.getItem('configs_t_k1'),
        sessionStorage.getItem('configs_t_b1'),
        sessionStorage.getItem('configs_t_k2'),
        sessionStorage.getItem('configs_t_b2'),
      ],
    });

    // 监听文件保存成功消息
    window.electron.ipcRenderer.once('ipc-output-success', (filePath) => {
      // alert(`文件已成功保存至: ${filePath}`);
      notification.success({
        message: '文件保存成功',
        description: `文件已保存至: ${filePath}`,
        placement: 'bottomRight', // 你可以选择不同的位置
      });
    });

    // 监听文件保存失败消息
    window.electron.ipcRenderer.once('ipc-output-error', (error) => {
      // alert(`文件保存失败: ${error}`);
      notification.error({
        message: '文件保存失败',
        description: `错误信息: ${error}`,
        placement: 'bottomRight',
      });
    });
  };
  return (
    <div className="config-panel">
      <h3 className="config-title">导出端口</h3>
      <div className="config-row">
        <label>COM&nbsp;&nbsp;</label>
        <Select
          defaultValue={portNumber}
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
          defaultValue={baudRate}
          onChange={handleBaudRateChange}
          className="config-select"
        >
          <Option value="7200">7200</Option>
          <Option value="9600">9600</Option>
          <Option value="115200">115200</Option>
        </Select>
      </div>

      <h3 className="config-title">压力传感器参数配置</h3>
      {/* X */}
      <div className="config-section">
        <div className="config-row">
          <label>X分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_x}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsX(val);
              sessionStorage.setItem('configs_x', val.toString());
            }}
          />
          <Tooltip
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: `当V≤${configs_x}，F=${configs_x_k1}*V+(${configs_x_b1})<br/>
                  当V>${configs_x}，F=${configs_x_k2}*V+(${configs_x_b2})`,
                }}
              ></span>
            }
          >
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>X-k1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_x_k1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsXK1(val);
              sessionStorage.setItem('configs_x_k1', val.toString());
            }}
          />
          <label>X-b1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_x_b1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsXB1(val);
              sessionStorage.setItem('configs_x_b1', val.toString());
            }}
          />
        </div>
        <div className="config-row">
          <label>X-k2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_x_k2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsXK2(val);
              sessionStorage.setItem('configs_x_k2', val.toString());
            }}
          />
          <label>X-b2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_x_b2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsXB2(val);
              sessionStorage.setItem('configs_x_b2', val.toString());
            }}
          />
        </div>
      </div>
      {/* Y */}
      <div className="config-section">
        <div className="config-row">
          <label>Y分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_y}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsY(val);
              sessionStorage.setItem('configs_y', val.toString());
            }}
          />
          <Tooltip
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: `当V≤${configs_y}，F=${configs_y_k1}*V+(${configs_y_b1})<br/>
                  当V>${configs_y}，F=${configs_y_k2}*V+(${configs_y_b2})`,
                }}
              ></span>
            }
          >
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>Y-k1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_y_k1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsYK1(val);
              sessionStorage.setItem('configs_y_k1', val.toString());
            }}
          />
          <label>Y-b1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_y_b1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsYB1(val);
              sessionStorage.setItem('configs_y_b1', val.toString());
            }}
          />
        </div>
        <div className="config-row">
          <label>Y-k2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_y_k2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsYK2(val);
              sessionStorage.setItem('configs_y_k2', val.toString());
            }}
          />
          <label>Y-b2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_y_b2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsYB2(val);
              sessionStorage.setItem('configs_y_b2', val.toString());
            }}
          />
        </div>
      </div>
      {/* Z */}
      <div className="config-section">
        <div className="config-row">
          <label>Z分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_z}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsZ(val);
              sessionStorage.setItem('configs_z', val.toString());
            }}
          />
          <Tooltip
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: `当V≤${configs_z}，F=${configs_z_k1}*V+(${configs_z_b1})<br/>
                  当V>${configs_z}，F=${configs_z_k2}*V+(${configs_z_b2})`,
                }}
              ></span>
            }
          >
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>Z-k1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_z_k1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsZK1(val);
              sessionStorage.setItem('configs_z_k1', val.toString());
            }}
          />
          <label>Z-b1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_z_b1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsZB1(val);
              sessionStorage.setItem('configs_z_b1', val.toString());
            }}
          />
        </div>
        <div className="config-row">
          <label>Z-k2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_z_k2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsZK2(val);
              sessionStorage.setItem('configs_z_k2', val.toString());
            }}
          />
          <label>Z-b2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            value={configs_z_b2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsZB2(val);
              sessionStorage.setItem('configs_z_b2', val.toString());
            }}
          />
        </div>
      </div>

      {/* T */}
      <h3 className="config-title">温度传感器参数配置</h3>
      <div className="config-section">
        <div className="config-row">
          <label>T分段点&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="1"
            value={configs_t}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsT(val);
              sessionStorage.setItem('configs_t', val.toString());
            }}
          />
          <Tooltip
            title={
              <span
                dangerouslySetInnerHTML={{
                  __html: `当V≤${configs_t}，T=${configs_t_k1}*V+(${configs_t_b1})<br/>
                  当V>${configs_t}，T=${configs_t_k2}*V+(${configs_t_b2})`,
                }}
              ></span>
            }
          >
            <span className="info-icon">ℹ️</span>
          </Tooltip>
        </div>
        <div className="config-row">
          <label>T-k1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-51.41237"
            value={configs_t_k1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsTK1(val);
              sessionStorage.setItem('configs_t_k1', val.toString());
            }}
          />
          <label>T-b1&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="431.8986"
            value={configs_t_b1}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsTB1(val);
              sessionStorage.setItem('configs_t_b1', val.toString());
            }}
          />
        </div>
        <div className="config-row">
          <label>T-k2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="-51.41237"
            value={configs_t_k2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsTK2(val);
              sessionStorage.setItem('configs_t_k2', val.toString());
            }}
          />
          <label>T-b2&nbsp;&nbsp;</label>
          <Input
            className="config-input"
            defaultValue="431.8986"
            value={configs_t_b2}
            onChange={(e) => {
              let val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setConfigsTB2(val);
              sessionStorage.setItem('configs_t_b2', val.toString());
            }}
          />
        </div>
      </div>

      <div className="button-group">
        <Button type="primary" onClick={handleSubmit} disabled={btnIfDisabled}>
          提交
        </Button>
        <Button type="dashed" onClick={handleReset}>
          重置参数
        </Button>
        <Button type="dashed" onClick={handleOutput}>
          数据导出
        </Button>
      </div>
    </div>
  );
};

export default ConfigPanel;
