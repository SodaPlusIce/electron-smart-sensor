import React, { useState } from 'react';
import './RealTimeData.css'; // 假设样式在这个文件中
import ConfigPanel from '../Components/ConfigPanel/ConfigPanel';

const RealTimeData: React.FC = () => {
  // 左侧参数部分所需的数据
  const [configs_x, setConfigsX] = useState<number>(1);
  const [configs_x_k1, setConfigsXK1] = useState<number>(1831.34);
  const [configs_x_b1, setConfigsXB1] = useState<number>(-1374.63);
  const [configs_x_k2, setConfigsXK2] = useState<number>(1831.34);
  const [configs_x_b2, setConfigsXB2] = useState<number>(-1374.63);
  const [configs_y, setConfigsY] = useState<number>(1);
  const [configs_y_k1, setConfigsYK1] = useState<number>(1831.34);
  const [configs_y_b1, setConfigsYB1] = useState<number>(-1374.63);
  const [configs_y_k2, setConfigsYK2] = useState<number>(1831.34);
  const [configs_y_b2, setConfigsYB2] = useState<number>(-1374.63);
  const [configs_z, setConfigsZ] = useState<number>(1);
  const [configs_z_k1, setConfigsZK1] = useState<number>(1831.34);
  const [configs_z_b1, setConfigsZB1] = useState<number>(-1374.63);
  const [configs_z_k2, setConfigsZK2] = useState<number>(1831.34);
  const [configs_z_b2, setConfigsZB2] = useState<number>(-1374.63);
  const [configs_t, setConfigsT] = useState<number>(1);
  const [configs_t_k1, setConfigsTK1] = useState<number>(-51.41237);
  const [configs_t_b1, setConfigsTB1] = useState<number>(431.8986);
  const [configs_t_k2, setConfigsTK2] = useState<number>(-51.41237);
  const [configs_t_b2, setConfigsTB2] = useState<number>(431.8986);

  // 右侧图表展示所需的数据
  const [timeVar, setTimeVar] = useState<string>('time');
  const [tmpVar, setTmpVar] = useState<number>(0);
  const [tmpCVar, setTmpCVar] = useState<number>(0);
  const [adcXVar, setAdcXVar] = useState<number>(0);
  const [adcYVar, setAdcYVar] = useState<number>(0);
  const [adcZVar, setAdcZVar] = useState<number>(0);
  const [adcX2Var, setAdcX2Var] = useState<number>(0);
  const [adcY2Var, setAdcY2Var] = useState<number>(0);
  const [adcZ2Var, setAdcZ2Var] = useState<number>(0);
  const [accXVar, setAccXVar] = useState<number>(0);
  const [accYVar, setAccYVar] = useState<number>(0);
  const [accZVar, setAccZVar] = useState<number>(0);
  const [magXVar, setMagXVar] = useState<number>(0);
  const [magYVar, setMagYVar] = useState<number>(0);
  const [magZVar, setMagZVar] = useState<number>(0);
  const [eulerAnglesXVar, setEulerAnglesXVar] = useState<number>(0);
  const [eulerAnglesYVar, setEulerAnglesYVar] = useState<number>(0);
  const [eulerAnglesZVar, setEulerAnglesZVar] = useState<number>(0);
  const [quat1Var, setQuat1Var] = useState<number>(0);
  const [quat2Var, setQuat2Var] = useState<number>(0);
  const [quat3Var, setQuat3Var] = useState<number>(0);
  const [quat4Var, setQuat4Var] = useState<number>(0);

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

  // 封装 setState 函数，传递参数 args 进行批量更新
  const updateState = (args: any) => {
    let startTime = new Date();
    let formattedStartTime = `${startTime.toLocaleTimeString()}:${startTime.getMilliseconds()}`;

    setTimeVar(formattedStartTime);
    setTmpVar(args.tmp);
    setTmpCVar(
      args.tmp >= configs_t
        ? configs_t_k1 * args.tmp + configs_t_b1
        : configs_t_k2 * args.tmp + configs_t_b2,
    );
    setAdcXVar(args.adcx);
    setAdcYVar(args.adcy);
    setAdcZVar(args.adcz);
    setAdcX2Var(
      args.adcx >= configs_x
        ? configs_x_k1 * args.adcx + configs_x_b1
        : configs_x_k2 * args.adcx + configs_x_b2,
    );
    setAdcY2Var(
      args.adcy >= configs_y
        ? configs_y_k1 * args.adcy + configs_y_b1
        : configs_y_k2 * args.adcy + configs_y_b2,
    );
    setAdcZ2Var(
      args.adcz >= configs_z
        ? configs_z_k1 * args.adcz + configs_z_b1
        : configs_z_k2 * args.adcz + configs_z_b2,
    );
    setAccXVar(args.accx);
    setAccYVar(args.accy);
    setAccZVar(args.accz);
    setMagXVar(args.magx);
    setMagYVar(args.magy);
    setMagZVar(args.magz);
    setEulerAnglesXVar(args.oularx);
    setEulerAnglesYVar(args.oulary);
    setEulerAnglesZVar(args.oularz);
    setQuat1Var(args.q0);
    setQuat2Var(args.q1);
    setQuat3Var(args.q2);
    setQuat4Var(args.q3);
  };

  let cnt: number = 0;
  window.electron.ipcRenderer.on('ipc-serialPort-read-data', (args: any) => {
    console.log('实时数据ing');
    cnt++;
    if (cnt === 10) {
      updateState(args);
      cnt = 0;
    }
  });

  return (
    <div className="container">
      {/* 左侧配置项 */}
      <ConfigPanel updateConfigs={updateConfigs}></ConfigPanel>
      {/* 右侧图表区域 */}
      <div className="value-display-container">
        <div className="value-item">
          <h2>时间</h2>
          <span className="value">{timeVar}</span>
        </div>

        <div className="value-item">
          <h2>环境温度（电压）</h2>
          <span className="value">{tmpVar} V</span>
        </div>

        <div className="value-item">
          <h2>环境温度</h2>
          <span className="value">{tmpCVar} °C</span>
        </div>

        <div className="value-item">
          <h2>压力（电压）</h2>
          <span className="value">X: {adcXVar} V</span>
          <span className="value">Y: {adcYVar} V</span>
          <span className="value">Y: {adcZVar} V</span>
        </div>

        <div className="value-item">
          <h2>压力</h2>
          <span className="value">X: {adcX2Var} N</span>
          <span className="value">Y: {adcY2Var} N</span>
          <span className="value">Z: {adcZ2Var} N</span>
        </div>

        <div className="value-item">
          <h2>加速度</h2>
          <span className="value">X: {accXVar} g</span>
          <span className="value">Y: {accYVar} g</span>
          <span className="value">Z: {accZVar} g</span>
        </div>

        <div className="value-item">
          <h2>磁力</h2>
          <span className="value">X: {magXVar} mGauss</span>
          <span className="value">Y: {magYVar} mGauss</span>
          <span className="value">Z: {magZVar} mGauss</span>
        </div>

        <div className="value-item">
          <h2>欧拉角</h2>
          <span className="value">X: {eulerAnglesXVar}</span>
          <span className="value">Y: {eulerAnglesYVar}</span>
          <span className="value">Z: {eulerAnglesZVar}</span>
        </div>

        <div className="value-item">
          <h2>四元数</h2>
          <span className="value"> Q0: {quat1Var}</span>
          <span className="value"> Q1: {quat2Var}</span>
          <span className="value"> Q2: {quat3Var}</span>
          <span className="value"> Q3: {quat4Var}</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
