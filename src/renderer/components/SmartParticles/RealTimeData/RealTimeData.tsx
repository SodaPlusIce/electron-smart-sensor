import React, { useState, useEffect } from 'react';
import './RealTimeData.css'; // 假设样式在这个文件中

const RealTimeData: React.FC = () => {
  // 定义六项数据的 state
  const [temperature, setTemperature] = useState<number | string>('--');
  const [voltage, setVoltage] = useState<number | string>('--');
  const [acceleration, setAcceleration] = useState<number | string>('--');
  const [magnetism, setMagnetism] = useState<number | string>('--');
  const [pressure, setPressure] = useState<number | string>('--');
  const [eulerAngle, setEulerAngle] = useState<number | string>('--');

  useEffect(() => {
    // 模拟实时数据的更新
    const interval = setInterval(() => {
      // 这里使用随机数模拟数据更新，实际使用时可以替换为 API 调用等
      setTemperature((Math.random() * 100).toFixed(2)); // 温度数据
      setVoltage((Math.random() * 10).toFixed(2)); // 电压数据
      setAcceleration((Math.random() * 20).toFixed(2)); // 加速度数据
      setMagnetism((Math.random() * 50).toFixed(2)); // 磁力数据
      setPressure((Math.random() * 1000).toFixed(2)); // 压力数据
      setEulerAngle((Math.random() * 360).toFixed(2)); // 欧拉角数据
    }, 1000); // 每1秒更新一次数据

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* 左侧配置项 */}
      <div className="config-container">
        <h3>导出端口</h3>
        <div className="config-row">
          <div className="config-section">
            <label>COM :</label>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="config-section">
            <label>波特率 :</label>
            <select>
              <option value="7200">7200</option>
              <option value="9600">9600</option>
              <option value="115200">115200</option>
            </select>
          </div>
        </div>
        <h3>颗粒类型选择</h3>
        <div className="config-row">
          <label>
            输出类型 :
            <select>
              <option value="normal">普通型</option>
            </select>
          </label>
        </div>
        <h3>压力传感器参数配置</h3>
        <div className="config-section">
          <label>分段点:</label>
          <input type="number" defaultValue={3.6867} />
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>X-K1:</label>
            <input type="number" defaultValue={-130.0802} />
          </div>
          <div className="config-section">
            <label>X-B1:</label>
            <input type="number" defaultValue={525.0134} />
          </div>
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>X-K2:</label>
            <input type="number" defaultValue={-172.1412} />
          </div>
          <div className="config-section">
            <label>X-B2:</label>
            <input type="number" defaultValue={680.0805} />
          </div>
        </div>
        <div className="config-section">
          <label>Y分段点:</label>
          <input type="number" defaultValue={3.7501} />
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>Y-K1:</label>
            <input type="number" defaultValue={-134.1534} />
          </div>
          <div className="config-section">
            <label>Y-B1:</label>
            <input type="number" defaultValue={542.8508} />
          </div>
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>Y-K2:</label>
            <input type="number" defaultValue={-288.0047} />
          </div>
          <div className="config-section">
            <label>Y-B2:</label>
            <input type="number" defaultValue={1119.8062} />
          </div>
        </div>
        <div className="config-section">
          <label>Z分段点:</label>
          <input type="number" defaultValue={3.7582} />
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>Z-K1:</label>
            <input type="number" defaultValue={-264.4064} />
          </div>
          <div className="config-section">
            <label>Z-B1:</label>
            <input type="number" defaultValue={1046.217} />
          </div>
        </div>
        <div className="config-row">
          <div className="config-section">
            <label>Z-K2:</label>
            <input type="number" defaultValue={-711.299} />
          </div>
          <div className="config-section">
            <label>Z-B2:</label>
            <input type="number" defaultValue={2725.7298} />
          </div>
        </div>
        <button className="submit-button">确定</button>
      </div>
      {/* 右侧图表区域 */}
      <div className="value-display-container">
        <div className="value-item">
          <h2>电路板温度</h2>
          <span className="value">{temperature} °C</span>
        </div>
        <div className="value-item">
          <h2>电压</h2>
          <span className="value">{voltage} V</span>
        </div>
        <div className="value-item">
          <h2>加速度</h2>
          <span className="value">{acceleration} m/s²</span>
        </div>
        <div className="value-item">
          <h2>磁力</h2>
          <span className="value">{magnetism} μT</span>
        </div>
        <div className="value-item">
          <h2>压力</h2>
          <span className="value">{pressure} Pa</span>
        </div>
        <div className="value-item">
          <h2>欧拉角</h2>
          <span className="value">{eulerAngle} °</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
