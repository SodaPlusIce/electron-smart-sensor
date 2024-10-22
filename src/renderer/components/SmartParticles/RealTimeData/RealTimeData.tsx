import React, { useState } from 'react';
import './RealTimeData.css'; // 假设样式在这个文件中
import ConfigPanel from '../Components/ConfigPanel/ConfigPanel';

const RealTimeData: React.FC = () => {
  // 右侧图表展示所需的数据
  const [timeVar, setTimeVar] = useState<string>('time');
  // const [tmpVar, setTmpVar] = useState<number>(0);
  const [tmpCVar, setTmpCVar] = useState<number>(0);
  // const [adcXVar, setAdcXVar] = useState<number>(0);
  // const [adcYVar, setAdcYVar] = useState<number>(0);
  // const [adcZVar, setAdcZVar] = useState<number>(0);
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

  const formatValues = (args: any) => {
    Object.keys(args).forEach((key) => {
      if (typeof args[key] === 'number') {
        args[key] = parseFloat(args[key].toFixed(4));
      }
    });
    return args;
  };

  // 封装 setState 函数，传递参数 args 进行批量更新
  const updateState = (argsCal: any) => {
    let args = formatValues(argsCal);

    let startTime = new Date();
    let formattedStartTime = `${startTime.toLocaleTimeString()}:${startTime.getMilliseconds()}`;

    setTimeVar(formattedStartTime);
    // setTmpVar(args.tmp);
    setTmpCVar(
      parseFloat(
        (args.tmp >= (Number(sessionStorage.getItem('configs_t')) || 1)
          ? (Number(sessionStorage.getItem('configs_t_k1')) || -51.41237) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_t_b1')) || 431.8986)
          : (Number(sessionStorage.getItem('configs_t_k2')) || -51.41237) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_t_b2')) || 431.8986)
        ).toFixed(4),
      ),
    );
    // setAdcXVar(args.adcx);
    // setAdcYVar(args.adcy);
    // setAdcZVar(args.adcz);
    setAdcX2Var(
      parseFloat(
        (args.adcx >= (Number(sessionStorage.getItem('configs_x')) || 1)
          ? (Number(sessionStorage.getItem('configs_x_k1')) || 1831.34) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_x_b1')) || -1374.63)
          : (Number(sessionStorage.getItem('configs_x_k2')) || 1831.34) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_x_b2')) || -1374.63)
        ).toFixed(4),
      ),
    );
    setAdcY2Var(
      parseFloat(
        (args.adcy >= (Number(sessionStorage.getItem('configs_y')) || 1)
          ? (Number(sessionStorage.getItem('configs_y_k1')) || 1831.34) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_y_b1')) || -1374.63)
          : (Number(sessionStorage.getItem('configs_y_k2')) || 1831.34) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_y_b2')) || -1374.63)
        ).toFixed(4),
      ),
    );
    setAdcZ2Var(
      parseFloat(
        (args.adcz >= (Number(sessionStorage.getItem('configs_z')) || 1)
          ? (Number(sessionStorage.getItem('configs_z_k1')) || 1831.34) *
            args.adcx(
              Number(sessionStorage.getItem('configs_z_b1')) || -1374.63,
            )
          : (Number(sessionStorage.getItem('configs_z_k2')) || 1831.34) *
              args.adcx +
            (Number(sessionStorage.getItem('configs_z_b2')) || -1374.63)
        ).toFixed(4),
      ),
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
      <ConfigPanel></ConfigPanel>
      {/* 右侧图表区域 */}
      <div className="value-display-container">
        <div className="value-card">
          <h2 className="value-card-title">时间</h2>
          <div className="value-card-container-single">
            <span className="value">{timeVar}</span>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">环境温度</h2>
          <div className="value-card-container-single">
            <span className="value">{tmpCVar} °C</span>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">压力</h2>
          <div className="value-card-container">
            <div className="value-card-left">
              <span className="value">X</span>
              <span className="value">Y</span>
              <span className="value">Z</span>
            </div>
            <div className="value-card-right">
              <span className="value">{adcX2Var} N</span>
              <span className="value">{adcY2Var} N</span>
              <span className="value">{adcZ2Var} N</span>
            </div>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">加速度</h2>
          <div className="value-card-container">
            <div className="value-card-left">
              <span className="value">X</span>
              <span className="value">Y</span>
              <span className="value">Z</span>
            </div>
            <div className="value-card-right">
              <span className="value">{accXVar} g</span>
              <span className="value">{accYVar} g</span>
              <span className="value">{accZVar} g</span>
            </div>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">磁力</h2>
          <div className="value-card-container">
            <div className="value-card-left">
              <span className="value">X</span>
              <span className="value">Y</span>
              <span className="value">Z</span>
            </div>
            <div className="value-card-right">
              <span className="value">{magXVar.toFixed(4)} mGauss</span>
              <span className="value">{magYVar.toFixed(4)} mGauss</span>
              <span className="value">{magZVar.toFixed(4)} mGauss</span>
            </div>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">欧拉角</h2>
          <div className="value-card-container">
            <div className="value-card-left">
              <span className="value">X</span>
              <span className="value">Y</span>
              <span className="value">Z</span>
            </div>
            <div className="value-card-right">
              <span className="value">{eulerAnglesXVar} °</span>
              <span className="value">{eulerAnglesYVar} °</span>
              <span className="value">{eulerAnglesZVar} °</span>
            </div>
          </div>
        </div>

        <div className="value-card">
          <h2 className="value-card-title">四元数</h2>
          <div className="value-card-container">
            <div className="value-card-left">
              <span className="value">q0</span>
              <span className="value">q1</span>
              <span className="value">q2</span>
              <span className="value">q3</span>
            </div>
            <div className="value-card-right">
              <span className="value">{quat1Var}</span>
              <span className="value">{quat2Var}</span>
              <span className="value">{quat3Var}</span>
              <span className="value">{quat4Var}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
