import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
// import { Select } from 'antd';
import './Overview1.css'; // 引入 CSS 文件
import ConfigPanel from '../Components/ConfigPanel/ConfigPanel';

// 注册 Chart.js 的模块
Chart.register(...registerables);

const Overview1: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef3 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef4 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef5 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef6 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef7 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef8 = useRef<HTMLCanvasElement | null>(null);

  // 左侧参数部分所需的数据
  const [configs_x, setConfigsX] = useState<number>(1);
  const [configs_x_k1, setConfigsXK1] = useState<number>(1831.34);
  const [configs_x_b1, setConfigsXB1] = useState<number>(1831.34);
  const [configs_x_k2, setConfigsXK2] = useState<number>(-1374.63);
  const [configs_x_b2, setConfigsXB2] = useState<number>(-1374.63);
  const [configs_y, setConfigsY] = useState<number>(1);
  const [configs_y_k1, setConfigsYK1] = useState<number>(1831.34);
  const [configs_y_b1, setConfigsYB1] = useState<number>(1831.34);
  const [configs_y_k2, setConfigsYK2] = useState<number>(-1374.63);
  const [configs_y_b2, setConfigsYB2] = useState<number>(-1374.63);
  const [configs_z, setConfigsZ] = useState<number>(1);
  const [configs_z_k1, setConfigsZK1] = useState<number>(1831.34);
  const [configs_z_b1, setConfigsZB1] = useState<number>(1831.34);
  const [configs_z_k2, setConfigsZK2] = useState<number>(-1374.63);
  const [configs_z_b2, setConfigsZB2] = useState<number>(-1374.63);
  const [configs_t, setConfigsT] = useState<number>(1);
  const [configs_t_k1, setConfigsTK1] = useState<number>(-51.41237);
  const [configs_t_b1, setConfigsTB1] = useState<number>(-51.41237);
  const [configs_t_k2, setConfigsTK2] = useState<number>(431.8986);
  const [configs_t_b2, setConfigsTB2] = useState<number>(431.8986);

  // 更新函数，供子组件调用
  const updateConfigs = (
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
  ) => {
    setConfigsX(x);
    setConfigsXK1(xK1);
    setConfigsXB1(xB1);
    setConfigsXK2(xK2);
    setConfigsXB2(xB2);
    setConfigsY(y);
    setConfigsYK1(yK1);
    setConfigsYB1(yB1);
    setConfigsYK2(yK2);
    setConfigsYB2(yB2);
    setConfigsZ(z);
    setConfigsZK1(zK1);
    setConfigsZB1(zB1);
    setConfigsZK2(zK2);
    setConfigsZB2(zB2);
    setConfigsT(t);
    setConfigsTK1(tK1);
    setConfigsTB1(tB1);
    setConfigsTK2(tK2);
    setConfigsTB2(tB2);
  };

  // 图表展示所需的数据
  const time_arr: string[] = [];
  const tmp_arr: number[] = [];
  const tmp_c_arr: number[] = [];
  const adc_x_arr: number[] = [];
  const adc_y_arr: number[] = [];
  const adc_z_arr: number[] = [];
  const adc_x2_arr: number[] = [];
  const adc_y2_arr: number[] = [];
  const adc_z2_arr: number[] = [];
  const acc_x_arr: number[] = [];
  const acc_y_arr: number[] = [];
  const acc_z_arr: number[] = [];
  const mag_x_arr: number[] = [];
  const mag_y_arr: number[] = [];
  const mag_z_arr: number[] = [];
  const eulerAnglesx_arr: number[] = [];
  const eulerAnglesy_arr: number[] = [];
  const eulerAnglesz_arr: number[] = [];
  const quat1_arr: number[] = [];
  const quat2_arr: number[] = [];
  const quat3_arr: number[] = [];
  const quat4_arr: number[] = [];

  let myChart1: Chart;
  let myChart2: Chart;
  let myChart3: Chart;
  let myChart4: Chart;
  let myChart5: Chart;
  let myChart6: Chart;
  let myChart7: Chart;
  let myChart8: Chart;

  let sensorDataQueue: any = [];

  useEffect(() => {
    if (canvasRef1.current) {
      const ctx = canvasRef1.current.getContext('2d');
      myChart1 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'Temperature',
              data: tmp_arr,
              borderColor: 'rgb(255, 99, 132)',
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
                text: 'Voltage(V)',
              },
            },
          },
        },
      });
    }

    if (canvasRef2.current) {
      const ctx = canvasRef2.current.getContext('2d');
      myChart2 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'Pressure',
              data: tmp_c_arr,
              borderColor: 'rgb(255, 99, 132)',
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
                text: 'Temperature(℃)',
              },
            },
          },
        },
      });
    }

    if (canvasRef3.current) {
      const ctx = canvasRef3.current.getContext('2d');
      myChart3 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'adc_x',
              data: adc_x_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'adc_y',
              data: adc_y_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'adc_z',
              data: adc_z_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
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
                text: 'Voltage(V)',
              },
            },
          },
        },
      });
    }

    if (canvasRef4.current) {
      const ctx = canvasRef4.current.getContext('2d');
      myChart4 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'adc_x',
              data: adc_x2_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'adc_y',
              data: adc_y2_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'adc_z',
              data: adc_z2_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
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
                text: 'Force(N)',
              },
            },
          },
        },
      });
    }

    if (canvasRef5.current) {
      const ctx = canvasRef5.current.getContext('2d');
      myChart5 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'acc_x',
              data: acc_x_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'acc_y',
              data: acc_y_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'acc_z',
              data: acc_z_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
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
                text: 'Acceleration(g)',
              },
            },
          },
        },
      });
    }

    if (canvasRef6.current) {
      const ctx = canvasRef6.current.getContext('2d');
      myChart6 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'mag_x',
              data: mag_x_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'mag_y',
              data: mag_y_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'mag_z',
              data: mag_z_arr, // 压力数据数组
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
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
                text: 'Magenetic Field Strength(mGauss)',
              },
            },
          },
        },
      });
    }

    if (canvasRef7.current) {
      const ctx = canvasRef7.current.getContext('2d');
      myChart7 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'x',
              data: eulerAnglesx_arr,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'y',
              data: eulerAnglesy_arr,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'z',
              data: eulerAnglesz_arr,
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
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
                text: 'Euler Angles (degree)',
              },
            },
          },
        },
      });
    }

    if (canvasRef8.current) {
      const ctx = canvasRef8.current.getContext('2d');
      myChart8 = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [
            {
              label: 'q1',
              data: quat1_arr,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'q2',
              data: quat2_arr,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'q3',
              data: quat3_arr,
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
            },
            {
              label: 'q4',
              data: quat4_arr,
              fill: false,
              borderColor: 'rgb(255, 137, 54)',
              tension: 0.1,
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
                text: 'Quaternion',
              },
            },
          },
        },
      });
    }
  }, []);

  window.electron.ipcRenderer.on('ipc-serialPort-read-data', (argsArr) => {
    console.log(argsArr);
    // 数据添加到队列
    sensorDataQueue = sensorDataQueue.concat(argsArr);
    // 更新图表内容
    let args = sensorDataQueue.shift(); // 取队列第一项数据进行图表绘制
    let startTime = new Date();
    let formattedStartTime = `${startTime.toLocaleTimeString()}:${startTime.getMilliseconds()}`;
    // 检查数据点数量是否超过阈值
    const maxDataPointLength = 20; // 设置数据点的最大数量
    if (
      myChart1 &&
      myChart2 &&
      myChart3 &&
      myChart4 &&
      myChart5 &&
      myChart6 &&
      myChart7 &&
      myChart8
    ) {
      time_arr.push(formattedStartTime);
      tmp_arr.push(args.tmp);
      tmp_c_arr.push(
        args.tmp >= configs_t
          ? configs_t_k1 * args.tmp + configs_t_b1
          : configs_t_k2 * args.tmp + configs_t_b2,
      );
      adc_x_arr.push(args.adcx);
      adc_y_arr.push(args.adcy);
      adc_z_arr.push(args.adcz);
      adc_x2_arr.push(
        args.adcx >= configs_x
          ? configs_x_k1 * args.adcx + configs_x_b1
          : configs_x_k2 * args.adcx + configs_x_b2,
      );
      adc_y2_arr.push(
        args.adcy >= configs_y
          ? configs_y_k1 * args.adcy + configs_y_b1
          : configs_y_k2 * args.adcy + configs_y_b2,
      );
      adc_z2_arr.push(
        args.adcz >= configs_z
          ? configs_z_k1 * args.adcz + configs_z_b1
          : configs_z_k2 * args.adcz + configs_z_b2,
      );
      acc_x_arr.push(args.accx);
      acc_y_arr.push(args.accy);
      acc_z_arr.push(args.accz);

      mag_x_arr.push(args.magx);
      mag_y_arr.push(args.magy);
      mag_z_arr.push(args.magz);

      eulerAnglesx_arr.push(args.oularx);
      eulerAnglesy_arr.push(args.oulary);
      eulerAnglesz_arr.push(args.oularz);

      quat1_arr.push(args.q0);
      quat2_arr.push(args.q1);
      quat3_arr.push(args.q2);
      quat4_arr.push(args.q3);

      // 检查数据点数量是否超过阈值并移除最早的数据点
      if (time_arr.length > maxDataPointLength + 1) time_arr.shift(); // +1让图表仿真更加稳定
      if (tmp_arr.length >= maxDataPointLength) tmp_arr.shift();
      if (tmp_c_arr.length >= maxDataPointLength) tmp_c_arr.shift();

      if (adc_x_arr.length >= maxDataPointLength) adc_x_arr.shift();
      if (adc_y_arr.length >= maxDataPointLength) adc_y_arr.shift();
      if (adc_z_arr.length >= maxDataPointLength) adc_z_arr.shift();
      if (adc_x2_arr.length >= maxDataPointLength) adc_x2_arr.shift();
      if (adc_y2_arr.length >= maxDataPointLength) adc_y2_arr.shift();
      if (adc_z2_arr.length >= maxDataPointLength) adc_z2_arr.shift();

      if (acc_x_arr.length >= maxDataPointLength) acc_x_arr.shift();
      if (acc_y_arr.length >= maxDataPointLength) acc_y_arr.shift();
      if (acc_z_arr.length >= maxDataPointLength) acc_z_arr.shift();

      if (mag_x_arr.length >= maxDataPointLength) mag_x_arr.shift();
      if (mag_y_arr.length >= maxDataPointLength) mag_y_arr.shift();
      if (mag_z_arr.length >= maxDataPointLength) mag_z_arr.shift();

      if (eulerAnglesx_arr.length >= maxDataPointLength)
        eulerAnglesx_arr.shift();
      if (eulerAnglesy_arr.length >= maxDataPointLength)
        eulerAnglesy_arr.shift();
      if (eulerAnglesz_arr.length >= maxDataPointLength)
        eulerAnglesz_arr.shift();

      if (quat1_arr.length >= maxDataPointLength) quat1_arr.shift();
      if (quat2_arr.length >= maxDataPointLength) quat2_arr.shift();
      if (quat3_arr.length >= maxDataPointLength) quat3_arr.shift();
      if (quat4_arr.length >= maxDataPointLength) quat4_arr.shift();
      myChart1.update();
      myChart2.update();
      myChart3.update();
      myChart4.update();
      myChart5.update();
      myChart6.update();
      myChart7.update();
      myChart8.update();
    }
  });

  return (
    <div className="container">
      {/* 左侧配置项 */}
      {/* <div className="config-container">
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
      </div> */}
      <ConfigPanel updateConfigs={updateConfigs}></ConfigPanel>
      {/* 右侧图表区域 */}
      <div className="chart-container">
        <div className="chart-item">
          <h2>环境温度（电压）</h2>
          <canvas ref={canvasRef1} className="chart" />
        </div>
        <div className="chart-item">
          <h2>环境温度</h2>
          <canvas ref={canvasRef2} className="chart" />
        </div>
        <div className="chart-item">
          <h2>压力（电压）</h2>
          <canvas ref={canvasRef3} className="chart" />
        </div>
        <div className="chart-item">
          <h2>压力</h2>
          <canvas ref={canvasRef4} className="chart" />
        </div>
        <div className="chart-item">
          <h2>加速度</h2>
          <canvas ref={canvasRef5} className="chart" />
        </div>
        <div className="chart-item">
          <h2>磁力</h2>
          <canvas ref={canvasRef6} className="chart" />
        </div>
        <div className="chart-item">
          <h2>欧拉角</h2>
          <canvas ref={canvasRef7} className="chart" />
        </div>
        <div className="chart-item">
          <h2>四元数</h2>
          <canvas ref={canvasRef8} className="chart" />
        </div>
      </div>
    </div>
  );
};

export default Overview1;
