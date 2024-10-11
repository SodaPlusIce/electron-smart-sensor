import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Select } from 'antd';
import './Overview1.css'; // 引入 CSS 文件

// 注册 Chart.js 的模块
Chart.register(...registerables);

const Overview1: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef3 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef4 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef5 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef6 = useRef<HTMLCanvasElement | null>(null);

  const [portNumber, setPortNumber] = useState('COM7');
  const [baudRate, setBaudRate] = useState('9600');

  // 图表展示所需的数据
  const temperatureData: Number[] = [25.4, 24.3];

  useEffect(() => {
    if (canvasRef1.current) {
      const ctx = canvasRef1.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Temperature',
              data: temperatureData,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)',
              },
            },
          },
        },
      });
    }

    if (canvasRef2.current) {
      const ctx = canvasRef2.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Pressure',
              data: [1, 2, 1.5, 2.5, 3],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Pressure (kPa)',
              },
            },
          },
        },
      });
    }

    if (canvasRef3.current) {
      const ctx = canvasRef3.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Acceleration',
              data: [0.5, 0.8, 0.7, 1.2, 1.1],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Acceleration (m/s²)',
              },
            },
          },
        },
      });
    }

    if (canvasRef4.current) {
      const ctx = canvasRef4.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Magnetic Field',
              data: [0.1, 0.2, 0.15, 0.3, 0.25],
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Magnetic Field Strength (mG)',
              },
            },
          },
        },
      });
    }

    if (canvasRef5.current) {
      const ctx = canvasRef5.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Magnetic Field',
              data: [0.1, 0.2, 0.15, 0.3, 0.25],
              borderColor: 'rgba(125, 206, 86, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Magnetic Field Strength (mG)',
              },
            },
          },
        },
      });
    }

    if (canvasRef6.current) {
      const ctx = canvasRef6.current.getContext('2d');
      new Chart(ctx!, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Magnetic Field',
              data: [0.1, 0.2, 0.15, 0.3, 0.25],
              borderColor: 'rgba(5, 201, 86, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Magnetic Field Strength (mG)',
              },
            },
          },
        },
      });
    }
  }, []);

  // 点击确认按钮，通知main.ts开始读取端口数据，并开始接收传来的传感器数据
  const submit = () => {
    window.electron.ipcRenderer.sendMessage('ipc-port-info', {
      portNumber: portNumber,
      baudRate: baudRate,
    });
    window.electron.ipcRenderer.on('ipc-serialPort-read-data', (args: any) => {
      console.log(args);
      // 更新图表内容
      // ...
    });
  };

  const handlePortNumberChange = (value: string) => {
    setPortNumber(value);
  };

  const handleBaudRateChange = (value: string) => {
    setBaudRate(value);
  };

  return (
    <div className="container">
      {/* 左侧配置项 */}
      <div className="config-container">
        <h3>导出端口：</h3>
        <div className="config-row">
          <div className="config-section">
            <label>COM :</label>
            <Select
              defaultValue="COM7"
              style={{ width: 120 }}
              onChange={handlePortNumberChange}
              options={[
                { value: 'COM1', label: 'COM1' },
                { value: 'COM2', label: 'COM2' },
                { value: 'COM3', label: 'COM3' },
                { value: 'COM4', label: 'COM4' },
                { value: 'COM5', label: 'COM5' },
                { value: 'COM6', label: 'COM6' },
                { value: 'COM7', label: 'COM7' },
                { value: 'COM8', label: 'COM8' },
                { value: 'COM9', label: 'COM9' },
                { value: 'COM10', label: 'COM10' },
                { value: 'COM11', label: 'COM11' },
                { value: 'COM12', label: 'COM12' },
                { value: 'COM13', label: 'COM13' },
                { value: 'COM14', label: 'COM14' },
                { value: 'COM15', label: 'COM15' },
                { value: 'COM16', label: 'COM16' },
                { value: 'COM17', label: 'COM17' },
                { value: 'COM18', label: 'COM18' },
              ]}
            />
          </div>
        </div>

        <div className="config-row">
          <div className="config-section">
            <label>波特率 :</label>
            <Select
              defaultValue="9600"
              style={{ width: 120 }}
              onChange={handleBaudRateChange}
              options={[
                { value: '7200', label: '7200' },
                { value: '9600', label: '9600' },
                { value: '115200', label: '115200' },
              ]}
            />
          </div>
        </div>

        <h3>参数配置：</h3>
        <div className="config-row">
          <div className="config-section">
            <label>输出类型 :</label>
            <select>
              <option value="normal">普通型</option>
              <option value="heatResistance">耐高温型</option>
            </select>
          </div>
        </div>

        <h3>函数参数：</h3>
        <div className="config-section">
          <label>分段点 :</label>
          <input type="text" />
        </div>

        <div className="config-row">
          <div className="config-section">
            <label>1 :</label>
            <input type="text" />
          </div>
          <div className="config-section">
            <label>2 :</label>
            <input type="text" />
          </div>
        </div>

        <div className="config-row">
          <div className="config-section">
            <label>3 :</label>
            <input type="text" />
          </div>
          <div className="config-section">
            <label>4 :</label>
            <input type="text" />
          </div>
        </div>

        <h3>函数展示：</h3>
        <div className="config-section-function-display">
          <p>当V &lt; = xxx, </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;F=xx, V+xx</p>
          <p>当V &lt; = xxx, </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;F=xx, V+xx</p>
        </div>

        <button className="submit-button" onClick={submit}>
          确认
        </button>
      </div>

      {/* 右侧图表区域 */}
      <div className="chart-container">
        <div className="chart-item">
          <h2>电路板温度</h2>
          <canvas ref={canvasRef1} className="chart" />
        </div>
        <div className="chart-item">
          <h2>电压</h2>
          <canvas ref={canvasRef2} className="chart" />
        </div>
        <div className="chart-item">
          <h2>加速度</h2>
          <canvas ref={canvasRef3} className="chart" />
        </div>
        <div className="chart-item">
          <h2>磁力</h2>
          <canvas ref={canvasRef4} className="chart" />
        </div>
        <div className="chart-item">
          <h2>压力</h2>
          <canvas ref={canvasRef5} className="chart" />
        </div>
        <div className="chart-item">
          <h2>欧拉角</h2>
          <canvas ref={canvasRef6} className="chart" />
        </div>
      </div>
    </div>
  );
};

export default Overview1;
