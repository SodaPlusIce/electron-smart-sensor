/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { SerialPort } from 'serialport';

interface SensorData {
  tmp: number;
  tmpc: number;

  adcx: number;
  adcy: number;
  adcz: number;

  adcxc: number;
  adcyc: number;
  adczc: number;

  accx: number;
  accy: number;
  accz: number;

  magx: number;
  magy: number;
  magz: number;

  oularx: number;
  oulary: number;
  oularz: number;

  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('ipc-window-options', async (event, arg) => {
  if (arg === 'minimize') {
    if (mainWindow) {
      mainWindow.minimize();
    }
  } else if (arg === 'maximize') {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  } else if (arg === 'close') {
    if (mainWindow) {
      mainWindow.close();
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1485,
    minWidth: 950,
    height: 740,
    minHeight: 740,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      contextIsolation: true, // 确保使用 contextBridge
      nodeIntegration: false, // 禁止渲染进程中直接使用 Node.js API
    },
    frame: false,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // 测试用，读取串口数据发送给ThreeD.tsx
  // setInterval(()=>{
  //   if(mainWindow)mainWindow.webContents.send('ipc-serialPort-read-data',{code: '565656'});
  // },500);

  // 读取传感器数据
  let obj: SensorData = {
    tmp: -1,
    tmpc: -1,

    adcx: -1,
    adcy: -1,
    adcz: -1,

    adcxc: -1,
    adcyc: -1,
    adczc: -1,

    accx: -1,
    accy: -1,
    accz: -1,

    magx: -1,
    magy: -1,
    magz: -1,

    oularx: -1,
    oulary: -1,
    oularz: -1,

    q0: -1,
    q1: -1,
    q2: -1,
    q3: -1,
  };
  let defaultObj: SensorData = {
    tmp: -1,
    tmpc: -1,

    adcx: -1,
    adcy: -1,
    adcz: -1,

    adcxc: -1,
    adcyc: -1,
    adczc: -1,

    accx: -1,
    accy: -1,
    accz: -1,

    magx: -1,
    magy: -1,
    magz: -1,

    oularx: -1,
    oulary: -1,
    oularz: -1,

    q0: -1,
    q1: -1,
    q2: -1,
    q3: -1,
  };
  // let objArr: SensorData[] = [];
  // let maxObjArrLength = 5; // 批处理最大数据个数
  function getData(portValue: string, rate: number) {
    let cal_x: any = [];
    let cal_y: any = [];
    let cal_z: any = [];
    let cal_tmp: any = [];
    let port = new SerialPort({
      path: portValue,
      baudRate: rate,
    });
    let srcData: any = [];

    port.on('data', function (data) {
      if (data[0] === 65) {
        // console.log(data[0]);
        // console.log(srcData);
        handleData();
        // 旧的逻辑
        if (mainWindow && obj !== defaultObj)
          mainWindow.webContents.send('ipc-serialPort-read-data', obj);

        srcData = [];
      }
      srcData.push(data[0]);
      // 新的处理逻辑
      // if (data.length > 57) {
      //   return;
      // } else {
      //   const index = data.indexOf(65);
      //   console.log('index:' + index);
      //   console.log(data);
      //   if (index > 0) {
      //     srcData = [65, ...srcData, ...data.slice(0, index)];
      //     console.log(srcData);
      //     handleData();
      //     srcData = [...data.slice(index, data.length - 1)];
      //   } else if (index === 0) {
      //     srcData = [65, ...srcData];
      //     console.log(srcData);
      //     handleData();
      //     srcData = [...data.slice(index, data.length - 1)];
      //   } else {
      //     srcData = [...srcData, ...data];
      //   }
      // }

      // todo 批式传递数据，减轻ipc通信压力
      // if (mainWindow) {
      //   objArr.push(obj);
      //   if (objArr.length >= maxObjArrLength) {
      //     mainWindow.webContents.send('ipc-serialPort-read-data', objArr);
      //     objArr = [];
      //   }
      // }

      //一个一个数据流往里塞,从65开始统计，到下一个65结束，同时里面的数据流处理逻辑应该是不变的，这样的话每次都是一个完整的buffer处理
    });

    const handleData = () => {
      const str_tmp = '84,109,112'; //54,6d,70
      const str_adc = '65,100,99'; //41 64 63
      const str_lsm = '73,115,109'; //49,73,6d

      //65, 100, 99, 12, 10, 6, 14, 3, 15, 9, 4, 10, 13, 3, 15, 12, 7, 6, 15, 3, 13, ------21
      //84, 109, 112, 1, 14, 13, 11, 0, 5, ----6
      //73, 115, 109, 14, 8, 8, 8, 7, 15, 14, 0, 7, 15, 14, 0, 0, 1, 6, 3, 15, 15, 11, 3, 15, 14, 4, 10,  ------27

      if (
        srcData &&
        srcData.join(',').includes(str_tmp) &&
        srcData.join(',').includes(str_adc) &&
        srcData.join(',').includes(str_lsm)
      ) {
        // 开始处理数据

        //-----------------------------------handle adc events--------------------------------

        // adc_x

        //----处理压力

        let temp_adcX = (function () {
          let tmp = [
            (srcData[3] || 0).toString(16),
            (srcData[4] || 0).toString(16),
            (srcData[5] || 0).toString(16),
            (srcData[6] || 0).toString(16),
            (srcData[7] || 0).toString(16),
            (srcData[8] || 0).toString(16),
          ];
          let result = processHex(tmp);
          return result;
        })();
        let temp_adcY = (function () {
          let tmp = [
            (srcData[9] || 0).toString(16),
            (srcData[10] || 0).toString(16),
            (srcData[11] || 0).toString(16),
            (srcData[12] || 0).toString(16),
            (srcData[13] || 0).toString(16),
            (srcData[14] || 0).toString(16),
          ];
          let result = processHex(tmp);
          return result;
        })();
        let temp_adcZ = (function () {
          let tmp = [
            (srcData[15] || 0).toString(16),
            (srcData[16] || 0).toString(16),
            (srcData[17] || 0).toString(16),
            (srcData[18] || 0).toString(16),
            (srcData[19] || 0).toString(16),
            (srcData[20] || 0).toString(16),
          ];
          let result = processHex(tmp);
          return result;
        })();

        obj.adcx = temp_adcX;
        obj.adcy = temp_adcY;
        obj.adcz = temp_adcZ;

        obj.adcxc =
          temp_adcX >= cal_x[0]
            ? cal_x[1] * temp_adcX + cal_x[2]
            : cal_x[3] * temp_adcX + cal_x[4];
        obj.adcyc =
          temp_adcY >= cal_y[0]
            ? cal_y[1] * temp_adcY + cal_y[2]
            : cal_y[3] * temp_adcY + cal_y[4];
        obj.adczc =
          temp_adcZ >= cal_z[0]
            ? cal_z[1] * temp_adcZ + cal_z[2]
            : cal_z[3] * temp_adcZ + cal_z[4];

        //-----------------------------------handle acc events--------------------------------

        let acc_index = srcData.indexOf(115);
        console.log('下表数据：' + acc_index);
        // 处理加速度值的函数
        let temp_accX = (function () {
          let tmp = [
            (srcData[acc_index + 2] || 0).toString(16),
            (srcData[acc_index + 3] || 0).toString(16),
            (srcData[acc_index + 4] || 0).toString(16),
            (srcData[acc_index + 5] || 0).toString(16),
          ];
          let result = processAcceleration(tmp);
          return result;
        })();

        let temp_accY = (function () {
          let tmp = [
            (srcData[acc_index + 6] || 0).toString(16),
            (srcData[acc_index + 7] || 0).toString(16),
            (srcData[acc_index + 8] || 0).toString(16),
            (srcData[acc_index + 9] || 0).toString(16),
          ];
          let result = processAcceleration(tmp);
          return result;
        })();

        let temp_accZ = (function () {
          let tmp = [
            (srcData[acc_index + 10] || 0).toString(16),
            (srcData[acc_index + 11] || 0).toString(16),
            (srcData[acc_index + 12] || 0).toString(16),
            (srcData[acc_index + 13] || 0).toString(16),
          ];
          let result = processAcceleration(tmp);
          return result;
        })();
        obj.accx = temp_accX / 1000;
        obj.accy = temp_accY / 1000;
        obj.accz = temp_accZ / 1000;

        //-----------------------------------handle tmp events--------------------------------

        let tmp_index = srcData.indexOf(112);

        // 处理温度Tmp 54 6d 70
        let temp_tmp = (function () {
          let tmp = [
            (srcData[tmp_index + 1] || 0).toString(16),
            (srcData[tmp_index + 2] || 0).toString(16),
            (srcData[tmp_index + 3] || 0).toString(16),
            (srcData[tmp_index + 4] || 0).toString(16),
            (srcData[tmp_index + 5] || 0).toString(16),
            (srcData[tmp_index + 6] || 0).toString(16),
          ];
          let result = processHex(tmp);
          return result;
        })();
        obj.tmp = temp_tmp;
        obj.tmpc =
          temp_tmp >= cal_tmp[0]
            ? cal_tmp[1] * temp_tmp + cal_tmp[2]
            : cal_tmp[3] * temp_tmp + cal_tmp[4];
        //-----------------------------------handle mag events--------------------------------

        let temp_magX = (function () {
          let tmp = [
            (srcData[acc_index + 14] || 0).toString(16),
            (srcData[acc_index + 15] || 0).toString(16),
            (srcData[acc_index + 16] || 0).toString(16),
            (srcData[acc_index + 17] || 0).toString(16),
          ];
          let result = processMagnetism(tmp);
          return result;
        })();
        let temp_magY = (function () {
          let tmp = [
            (srcData[acc_index + 18] || 0).toString(16),
            (srcData[acc_index + 19] || 0).toString(16),
            (srcData[acc_index + 20] || 0).toString(16),
            (srcData[acc_index + 21] || 0).toString(16),
          ];
          let result = processMagnetism(tmp);
          return result;
        })();
        let temp_magZ = (function () {
          let tmp = [
            (srcData[acc_index + 22] || 0).toString(16),
            (srcData[acc_index + 23] || 0).toString(16),
            (srcData[acc_index + 24] || 0).toString(16),
            (srcData[acc_index + 25] || 0).toString(16),
          ];
          let result = processMagnetism(tmp);
          return result;
        })();

        obj.magx = temp_magX;
        obj.magy = temp_magY;
        obj.magz = temp_magZ;

        //计算欧拉角
        // 保存先前的滤波数据
        let prevFilteredAcc = [0, 0, 0];
        let prevFilteredMag = [0, 0, 0];

        // 指定EMA参数
        const alpha = 0.2;

        function KGetQuat(
          ax: any,
          ay: any,
          az: any,
          mx: any,
          my: any,
          mz: any,
        ) {
          // 函数：返回符号与y相同的x值
          function copysign(x: any, y: any) {
            return y < 0 ? -Math.abs(x) : Math.abs(x);
          }

          // 先前滤波数据为空时初始化
          if (!prevFilteredAcc) prevFilteredAcc = [ax, ay, az];
          if (!prevFilteredMag) prevFilteredMag = [mx, my, mz];

          // 对加速度和磁力计数据进行EMA滤波
          ax = alpha * ax + (1 - alpha) * prevFilteredAcc[0];
          ay = alpha * ay + (1 - alpha) * prevFilteredAcc[1];
          az = alpha * az + (1 - alpha) * prevFilteredAcc[2];
          prevFilteredAcc = [ax, ay, az];

          mx = alpha * mx + (1 - alpha) * prevFilteredMag[0];
          my = alpha * my + (1 - alpha) * prevFilteredMag[1];
          mz = alpha * mz + (1 - alpha) * prevFilteredMag[2];
          prevFilteredMag = [mx, my, mz];

          // 数据归一化
          const accNorm = Math.sqrt(ax * ax + ay * ay + az * az);
          ax /= accNorm;
          ay /= accNorm;
          az /= accNorm;

          const magNorm = Math.sqrt(mx * mx + my * my + mz * mz);
          mx /= magNorm;
          my /= magNorm;
          mz /= magNorm;

          // 计算改进的四元数
          const gx = 2 * ax;
          const gy = 2 * ay;
          const gz = 2 * (az - 0.5);

          const hx = mx * Math.sqrt(1.0 - az * az) - mz * ay;
          const hy = my * Math.sqrt(1.0 - az * az) - mz * ax;
          const hz = mx * ay - my * ax;

          let qw = Math.sqrt(Math.max(0, 1 + gx + hy + hz)) / 2;
          let qx = Math.sqrt(Math.max(0, 1 + gx - hy - hz)) / 2;
          let qy = Math.sqrt(Math.max(0, 1 - gx + hy - hz)) / 2;
          let qz = Math.sqrt(Math.max(0, 1 - gx - hy + hz)) / 2;
          qx = copysign(qx, gy - hz);
          qy = copysign(qy, hx - gz);
          qz = copysign(qz, hx + gy);

          // 四元数归一化
          const qNorm = Math.sqrt(qw * qw + qx * qx + qy * qy + qz * qz);
          qw /= qNorm;
          qx /= qNorm;
          qy /= qNorm;
          qz /= qNorm;

          return [qw, qx, qy, qz];
        }

        function quaternionToEuler(qw: any, qx: any, qy: any, qz: any) {
          const ysqr = qy * qy;

          // roll (x-axis rotation)
          const t0 = 2 * (qw * qx + qy * qz);
          const t1 = 1 - 2 * (qx * qx + ysqr);
          const roll = Math.atan2(t0, t1);

          // pitch (y-axis rotation)
          let t2 = 2 * (qw * qy - qz * qx);
          t2 = t2 > 1 ? 1 : t2;
          t2 = t2 < -1 ? -1 : t2;
          const pitch = Math.asin(t2);

          // yaw (z-axis rotation)
          const t3 = 2 * (qw * qz + qx * qy);
          const t4 = 1 - 2 * (ysqr + qz * qz);
          const yaw = Math.atan2(t3, t4);
          obj.oularx = roll * (180 / Math.PI);
          obj.oulary = pitch * (180 / Math.PI);
          obj.oularz = yaw * (180 / Math.PI);
        }
        let tmp = KGetQuat(
          temp_accX,
          temp_accY,
          temp_accZ,
          temp_magX,
          temp_magY,
          temp_magZ,
        );
        quaternionToEuler(tmp[0], tmp[1], tmp[2], tmp[3]);
        obj.q0 = tmp[0];
        obj.q1 = tmp[1];
        obj.q2 = tmp[2];
        obj.q3 = tmp[3];
      }
    };
    //name:公共函数的定义部分
    //function:处理温度和加速度数据的函数，处理磁力压力的函数
    //数据数组，标识符（tmp or adc）
    const processHex = (hexArray: any) => {
      let q1 =
        Math.pow(16, 5) * parseInt(hexArray[4], 16) +
        Math.pow(16, 4) * parseInt(hexArray[5], 16) +
        Math.pow(16, 3) * parseInt(hexArray[2], 16) +
        Math.pow(16, 2) * parseInt(hexArray[3], 16) +
        16 * parseInt(hexArray[0], 16) +
        parseInt(hexArray[1], 16);
      let AIN1 =
        q1 *
        ((2 * 210 * Math.pow(10, -4) * 10 * Math.pow(10, 3)) / Math.pow(2, 24));
      let r1 = (AIN1 / 210) * Math.pow(10, 3);
      let F1 = 351.92 / (r1 - 0.9994);

      if (F1 < 0) F1 = -F1;

      return F1;
    };

    // 处理加速度值的函数
    const processAcceleration = (hexArray: any) => {
      let acc_x_decimal =
        parseInt(hexArray[0], 16) * Math.pow(16, 3) +
        parseInt(hexArray[1], 16) * Math.pow(16, 2) +
        parseInt(hexArray[2], 16) * 16 +
        parseInt(hexArray[3], 16);

      let acc_x_binary = acc_x_decimal.toString(2).padStart(16, '0');

      let ACC_X;
      if (acc_x_binary[0] === '0') {
        ACC_X = 0.061 * acc_x_decimal;
      } else {
        let acc_x_binary_tmp = '1';
        for (let i = 1; i < acc_x_binary.length; i++) {
          if (acc_x_binary[i] === '0') acc_x_binary_tmp += '1';
          else acc_x_binary_tmp += '0';
        }
        ACC_X = -0.061 * (parseInt(acc_x_binary_tmp.slice(1), 2) + 1);
      }

      return ACC_X;
    };

    const processMagnetism = (hexArray: any) => {
      let mag_decimal =
        parseInt(hexArray[0], 16) * Math.pow(16, 3) +
        parseInt(hexArray[1], 16) * Math.pow(16, 2) +
        parseInt(hexArray[2], 16) * 16 +
        parseInt(hexArray[3], 16);

      let mag_binary = mag_decimal.toString(2).padStart(16, '0');

      let Mag;
      if (mag_binary[0] === '0') {
        Mag = 1.5 * mag_decimal;
      } else {
        let mag_binary_tmp = '1';
        for (let i = 1; i < mag_binary.length; i++) {
          if (mag_binary[i] === '0') mag_binary_tmp += '1';
          else mag_binary_tmp += '0';
        }
        Mag = -1.5 * (parseInt(mag_binary_tmp.slice(1), 2) + 1);
      }
      return Mag;
    };
  }

  // 接收端口号和波特率
  ipcMain.on('ipc-port-info', async (event, arg) => {
    getData(arg.portNumber, parseInt(arg.baudRate));
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
('');
