import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
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
              data: [12, 19, 3, 5, 2],
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
                text: 'Months',
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
