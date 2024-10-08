// components/SmartParticles/ThreeD.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// const { SerialPort } = require('serialport');

interface SensorData {
  ax: number;
  ay: number;
  az: number;
  mx: number;
  my: number;
  mz: number;
}

const ThreeD: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // 获取屏幕尺寸
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      screenWidth / screenHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(screenWidth, screenHeight);
    renderer.setClearColor('#142233');
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // 创建立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textures = [
      new THREE.TextureLoader().load(require('../Assets/right.png')),
      new THREE.TextureLoader().load(require('../Assets/left.png')),
      new THREE.TextureLoader().load(require('../Assets/top.png')),
      new THREE.TextureLoader().load(require('../Assets/bottom.png')),
      new THREE.TextureLoader().load(require('../Assets/front.png')),
      new THREE.TextureLoader().load(require('../Assets/back.png')),
    ];

    const materials = textures.map(
      (texture) => new THREE.MeshBasicMaterial({ map: texture }),
    );
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cubeRef.current = cube; // 存储立方体的引用

    // 设置相机位置
    camera.position.set(1, 1, 3);
    camera.lookAt(0, 0, 0);

    // 添加鼠标控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(cube.position);
    controls.update();

    // 创建固定坐标系
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // 更新鼠标控制器
      renderer.render(scene, camera);
    };
    animate();

    // 窗口大小变化时更新渲染器和相机
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 计算四元数的函数
  const MadgwickQuaternionUpdate = (
    q: number[],
    ax: number,
    ay: number,
    az: number,
    mx: number,
    my: number,
    mz: number,
    beta: number,
  ): number[] => {
    // 归一化加速度计测量值
    const norm_a = Math.sqrt(ax * ax + ay * ay + az * az);
    ax /= norm_a;
    ay /= norm_a;
    az /= norm_a;

    // 归一化磁力计测量值
    const norm_m = Math.sqrt(mx * mx + my * my + mz * mz);
    mx /= norm_m;
    my /= norm_m;
    mz /= norm_m;

    // 辅助变量
    let [q0, q1, q2, q3] = q;

    const hx =
      2 * mx * (0.5 - q2 * q2 - q3 * q3) +
      2 * my * (q1 * q2 - q0 * q3) +
      2 * mz * (q1 * q3 + q0 * q2);
    const hy =
      2 * mx * (q1 * q2 + q0 * q3) +
      2 * my * (0.5 - q1 * q1 - q3 * q3) +
      2 * mz * (q2 * q3 - q0 * q1);
    const bx = Math.sqrt(hx * hx + hy * hy);
    const bz =
      2 * mx * (q1 * q3 - q0 * q2) +
      2 * my * (q2 * q3 + q0 * q1) +
      2 * mz * (0.5 - q1 * q1 - q2 * q2);

    // 估计的重力方向和磁场方向
    const vx = 2 * (q1 * q3 - q0 * q2);
    const vy = 2 * (q0 * q1 + q2 * q3);
    const vz = q0 * q0 - q1 * q1 - q2 * q2 + q3 * q3;
    const wx =
      2 * bx * (0.5 - q2 * q2 - q3 * q3) + 2 * bz * (q1 * q3 - q0 * q2);
    const wy = 2 * bx * (q1 * q2 - q0 * q3) + 2 * bz * (q0 * q1 + q2 * q3);
    const wz =
      2 * bx * (q0 * q2 + q1 * q3) + 2 * bz * (0.5 - q1 * q1 - q2 * q2);

    // 误差是估计方向和测量重力方向的叉积
    const ex = ay * vz - az * vy + (my * wz - mz * wy);
    const ey = az * vx - ax * vz + (mz * wx - mx * wz);
    const ez = ax * vy - ay * vx + (mx * wy - my * wx);

    // 应用反馈项
    const gx = 2 * ex;
    const gy = 2 * ey;
    const gz = 2 * ez;

    // 四元数微分方程的积分
    const qDot1 = -q1 * gx - q2 * gy - q3 * gz;
    const qDot2 = q0 * gx + q2 * gz - q3 * gy;
    const qDot3 = q0 * gy - q1 * gz + q3 * gx;
    const qDot4 = q0 * gz + q1 * gy - q2 * gx;

    // 积分以生成新的四元数
    q0 += qDot1 * beta;
    q1 += qDot2 * beta;
    q2 += qDot3 * beta;
    q3 += qDot4 * beta;

    // 归一化四元数
    const norm_q = Math.sqrt(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
    return [q0 / norm_q, q1 / norm_q, q2 / norm_q, q3 / norm_q];
  };

  // 将四元数转换为欧拉角
  const quaternionToEuler = (q: number[]): THREE.Euler => {
    const [qw, qx, qy, qz] = q;
    const ysqr = qy * qy;

    // roll (x-axis rotation)
    const t0 = 2 * (qw * qx + qy * qz);
    const t1 = 1 - 2 * (qx * qx + ysqr);
    const roll = Math.atan2(t0, t1);

    // pitch (y-axis rotation)
    let t2 = 2 * (qw * qy - qz * qx);
    t2 = Math.max(-1, Math.min(1, t2)); // 限制范围
    const pitch = Math.asin(t2);

    // yaw (z-axis rotation)
    const t3 = 2 * (qw * qz + qx * qy);
    const t4 = 1 - 2 * (ysqr + qz * qz);
    const yaw = Math.atan2(t3, t4);

    return new THREE.Euler(pitch, yaw, roll, 'XYZ');
  };

  // 更新立方体姿态的函数
  const updateCube = (sensorData: SensorData) => {
    const { ax, ay, az, mx, my, mz } = sensorData;

    // 计算新的四元数
    const quat: number[] = [1, 0, 0, 0]; // 初始化为单位四元数
    const beta = 0.1; // 增益
    const updatedQ = MadgwickQuaternionUpdate(
      quat,
      ax,
      ay,
      az,
      mx,
      my,
      mz,
      beta,
    );

    // 将四元数转换为欧拉角
    const euler = quaternionToEuler(updatedQ);

    // 方法一：根据欧拉角更新立方体的旋转
    if (cubeRef.current) {
      cubeRef.current.rotation.set(euler.x, euler.y, euler.z);
    }

    // 方法二：根据四元数更新立方体的旋转
    // if (cubeRef.current) {
    //   cubeRef.current.quaternion.copy(new THREE.Quaternion(quat[1], quat[2], quat[3], quat[0]));
    // }
  };

  // 读取串口数据
  // const getData = (portValue: string, rate: number) => {
  //   let cnt: number = 0;
  //   console.log(cnt);
  //   let lastTmp: any;
  //   let port = new SerialPort({
  //     path: portValue,
  //     baudRate: rate,
  //   });
  //   let srcData: any = [];
  //   port.on('data', function (data: any) {
  //     if (data[0] === 65) {
  //       console.log(data[0]);
  //       console.log(srcData);
  //       handleData();
  //       srcData = [];
  //     }
  //     srcData.push(data[0]);

  //     //一个一个数据流往里塞,从65开始统计，到下一个65结束，同时里面的数据流处理逻辑应该是不变的，这样的话每次都是一个完整的buffer处理
  //   });

  //   const handleData = () => {
  //     const str_tmp = '84,109,112'; //54,6d,70
  //     const str_adc = '65,100,99'; //41 64 63
  //     const str_lsm = '73,115,109'; //49,73,6d

  //     //65, 100, 99, 12, 10, 6, 14, 3, 15, 9, 4, 10, 13, 3, 15, 12, 7, 6, 15, 3, 13, ------21
  //     //84, 109, 112, 1, 14, 13, 11, 0, 5, ----6
  //     //73, 115, 109, 14, 8, 8, 8, 7, 15, 14, 0, 7, 15, 14, 0, 0, 1, 6, 3, 15, 15, 11, 3, 15, 14, 4, 10,  ------27

  //     if (
  //       srcData &&
  //       srcData.join(',').includes(str_tmp) &&
  //       srcData.join(',').includes(str_adc) &&
  //       srcData.join(',').includes(str_lsm)
  //     ) {
  //       // 开始处理数据
  //       let test = [];

  //       //表格填入当前时间
  //       let time = new Date();
  //       const milliseconds = time.getMilliseconds();
  //       const formattedTime = `${time.toLocaleString()}:${milliseconds}`;

  //       test.push(formattedTime);

  //       cnt++;

  //       //-----------------------------------handle adc events--------------------------------

  //       // adc_x

  //       //----处理压力

  //       let temp_adcX = (function () {
  //         let tmp = [
  //           (srcData[3] || 0).toString(16),
  //           (srcData[4] || 0).toString(16),
  //           (srcData[5] || 0).toString(16),
  //           (srcData[6] || 0).toString(16),
  //           (srcData[7] || 0).toString(16),
  //           (srcData[8] || 0).toString(16),
  //         ];
  //         let result = processHex(tmp);
  //         return result;
  //       })();
  //       let temp_adcY = (function () {
  //         let tmp = [
  //           (srcData[9] || 0).toString(16),
  //           (srcData[10] || 0).toString(16),
  //           (srcData[11] || 0).toString(16),
  //           (srcData[12] || 0).toString(16),
  //           (srcData[13] || 0).toString(16),
  //           (srcData[14] || 0).toString(16),
  //         ];
  //         let result = processHex(tmp);
  //         return result;
  //       })();
  //       let temp_adcZ = (function () {
  //         let tmp = [
  //           (srcData[15] || 0).toString(16),
  //           (srcData[16] || 0).toString(16),
  //           (srcData[17] || 0).toString(16),
  //           (srcData[18] || 0).toString(16),
  //           (srcData[19] || 0).toString(16),
  //           (srcData[20] || 0).toString(16),
  //         ];
  //         let result = processHex(tmp);
  //         return result;
  //       })();

  //       test.push(temp_adcX);
  //       test.push(temp_adcY);
  //       test.push(temp_adcZ);

  //       //-----------------------------------handle acc events--------------------------------

  //       let acc_index = srcData.indexOf(115);
  //       console.log('下表数据：' + acc_index);
  //       // 处理加速度值的函数
  //       let temp_accX = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 2] || 0).toString(16),
  //           (srcData[acc_index + 3] || 0).toString(16),
  //           (srcData[acc_index + 4] || 0).toString(16),
  //           (srcData[acc_index + 5] || 0).toString(16),
  //         ];
  //         let result = processAcceleration(tmp);
  //         return result;
  //       })();

  //       let temp_accY = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 6] || 0).toString(16),
  //           (srcData[acc_index + 7] || 0).toString(16),
  //           (srcData[acc_index + 8] || 0).toString(16),
  //           (srcData[acc_index + 9] || 0).toString(16),
  //         ];
  //         let result = processAcceleration(tmp);
  //         return result;
  //       })();

  //       let temp_accZ = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 10] || 0).toString(16),
  //           (srcData[acc_index + 11] || 0).toString(16),
  //           (srcData[acc_index + 12] || 0).toString(16),
  //           (srcData[acc_index + 13] || 0).toString(16),
  //         ];
  //         let result = processAcceleration(tmp);
  //         return result;
  //       })();
  //       test.push(temp_accX / 1000);
  //       test.push(temp_accY / 1000);
  //       test.push(temp_accZ / 1000);

  //       //-----------------------------------handle tmp events--------------------------------

  //       let tmp_index = srcData.indexOf(112);

  //       // 处理温度Tmp 54 6d 70
  //       let temp_tmp = (function () {
  //         let tmp = [
  //           (srcData[tmp_index + 1] || 0).toString(16),
  //           (srcData[tmp_index + 2] || 0).toString(16),
  //           (srcData[tmp_index + 3] || 0).toString(16),
  //           (srcData[tmp_index + 4] || 0).toString(16),
  //           (srcData[tmp_index + 5] || 0).toString(16),
  //           (srcData[tmp_index + 6] || 0).toString(16),
  //         ];

  //         let result = processHex(tmp);
  //         console.log(Math.abs(result - lastTmp), lastTmp);
  //         if (!lastTmp || Math.abs(result - lastTmp) < 1) {
  //           lastTmp = result;
  //         }
  //         console.log(lastTmp);
  //         return lastTmp;
  //       })();
  //       test.push(temp_tmp);
  //       //-----------------------------------handle mag events--------------------------------

  //       let temp_magX = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 14] || 0).toString(16),
  //           (srcData[acc_index + 15] || 0).toString(16),
  //           (srcData[acc_index + 16] || 0).toString(16),
  //           (srcData[acc_index + 17] || 0).toString(16),
  //         ];
  //         let result = processMagnetism(tmp);
  //         return result;
  //       })();
  //       let temp_magY = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 18] || 0).toString(16),
  //           (srcData[acc_index + 19] || 0).toString(16),
  //           (srcData[acc_index + 20] || 0).toString(16),
  //           (srcData[acc_index + 21] || 0).toString(16),
  //         ];
  //         let result = processMagnetism(tmp);
  //         return result;
  //       })();
  //       let temp_magZ = (function () {
  //         let tmp = [
  //           (srcData[acc_index + 22] || 0).toString(16),
  //           (srcData[acc_index + 23] || 0).toString(16),
  //           (srcData[acc_index + 24] || 0).toString(16),
  //           (srcData[acc_index + 25] || 0).toString(16),
  //         ];
  //         let result = processMagnetism(tmp);
  //         return result;
  //       })();

  //       test.push(temp_magX);
  //       test.push(temp_magY);
  //       test.push(temp_magZ);

  //       //计算欧拉角
  //       // 保存先前的滤波数据
  //       let prevFilteredAcc = [0, 0, 0];
  //       let prevFilteredMag = [0, 0, 0];

  //       // 指定EMA参数
  //       const alpha = 0.2;

  //       function KGetQuat(
  //         ax: any,
  //         ay: any,
  //         az: any,
  //         mx: any,
  //         my: any,
  //         mz: any,
  //       ) {
  //         // 函数：返回符号与y相同的x值
  //         function copysign(x: number, y: number) {
  //           return y < 0 ? -Math.abs(x) : Math.abs(x);
  //         }

  //         // 先前滤波数据为空时初始化
  //         if (!prevFilteredAcc) prevFilteredAcc = [ax, ay, az];
  //         if (!prevFilteredMag) prevFilteredMag = [mx, my, mz];

  //         // 对加速度和磁力计数据进行EMA滤波
  //         ax = alpha * ax + (1 - alpha) * prevFilteredAcc[0];
  //         ay = alpha * ay + (1 - alpha) * prevFilteredAcc[1];
  //         az = alpha * az + (1 - alpha) * prevFilteredAcc[2];
  //         prevFilteredAcc = [ax, ay, az];

  //         mx = alpha * mx + (1 - alpha) * prevFilteredMag[0];
  //         my = alpha * my + (1 - alpha) * prevFilteredMag[1];
  //         mz = alpha * mz + (1 - alpha) * prevFilteredMag[2];
  //         prevFilteredMag = [mx, my, mz];

  //         // 数据归一化
  //         const accNorm = Math.sqrt(ax * ax + ay * ay + az * az);
  //         ax /= accNorm;
  //         ay /= accNorm;
  //         az /= accNorm;

  //         const magNorm = Math.sqrt(mx * mx + my * my + mz * mz);
  //         mx /= magNorm;
  //         my /= magNorm;
  //         mz /= magNorm;

  //         // 计算改进的四元数
  //         const gx = 2 * ax;
  //         const gy = 2 * ay;
  //         const gz = 2 * (az - 0.5);

  //         const hx = mx * Math.sqrt(1.0 - az * az) - mz * ay;
  //         const hy = my * Math.sqrt(1.0 - az * az) - mz * ax;
  //         const hz = mx * ay - my * ax;

  //         let qw = Math.sqrt(Math.max(0, 1 + gx + hy + hz)) / 2;
  //         let qx = Math.sqrt(Math.max(0, 1 + gx - hy - hz)) / 2;
  //         let qy = Math.sqrt(Math.max(0, 1 - gx + hy - hz)) / 2;
  //         let qz = Math.sqrt(Math.max(0, 1 - gx - hy + hz)) / 2;
  //         qx = copysign(qx, gy - hz);
  //         qy = copysign(qy, hx - gz);
  //         qz = copysign(qz, hx + gy);

  //         // 四元数归一化
  //         const qNorm = Math.sqrt(qw * qw + qx * qx + qy * qy + qz * qz);
  //         qw /= qNorm;
  //         qx /= qNorm;
  //         qy /= qNorm;
  //         qz /= qNorm;

  //         return [qw, qx, qy, qz];
  //       }

  //       function quaternionToEuler2(qw: any, qx: any, qy: any, qz: any) {
  //         const ysqr = qy * qy;

  //         // roll (x-axis rotation)
  //         const t0 = 2 * (qw * qx + qy * qz);
  //         const t1 = 1 - 2 * (qx * qx + ysqr);
  //         const roll = Math.atan2(t0, t1);

  //         // pitch (y-axis rotation)
  //         let t2 = 2 * (qw * qy - qz * qx);
  //         t2 = t2 > 1 ? 1 : t2;
  //         t2 = t2 < -1 ? -1 : t2;
  //         const pitch = Math.asin(t2);

  //         // yaw (z-axis rotation)
  //         const t3 = 2 * (qw * qz + qx * qy);
  //         const t4 = 1 - 2 * (ysqr + qz * qz);
  //         const yaw = Math.atan2(t3, t4);
  //         test.push(roll * (180 / Math.PI));
  //         test.push(pitch * (180 / Math.PI));
  //         test.push(yaw * (180 / Math.PI));
  //       }
  //       let tmp = KGetQuat(
  //         temp_accX,
  //         temp_accY,
  //         temp_accZ,
  //         temp_magX,
  //         temp_magY,
  //         temp_magZ,
  //       );
  //       quaternionToEuler2(tmp[0], tmp[1], tmp[2], tmp[3]);
  //       test.push(tmp[0]);
  //       test.push(tmp[1]);
  //       test.push(tmp[2]);
  //       test.push(tmp[3]);

  //       updateCube({
  //         ax: temp_accX,
  //         ay: temp_accY,
  //         az: temp_accZ,
  //         mx: temp_magX,
  //         my: temp_magY,
  //         mz: temp_magZ,
  //       });
  //     }
  //   };

  //   //name:公共函数的定义部分
  //   //function:处理温度和加速度数据的函数，处理磁力压力的函数
  //   //数据数组，标识符（tmp or adc）
  //   const processHex = (hexArray: any) => {
  //     let q1 =
  //       Math.pow(16, 5) * parseInt(hexArray[4], 16) +
  //       Math.pow(16, 4) * parseInt(hexArray[5], 16) +
  //       Math.pow(16, 3) * parseInt(hexArray[2], 16) +
  //       Math.pow(16, 2) * parseInt(hexArray[3], 16) +
  //       16 * parseInt(hexArray[0], 16) +
  //       parseInt(hexArray[1], 16);
  //     let AIN1 =
  //       q1 *
  //       ((2 * 210 * Math.pow(10, -4) * 10 * Math.pow(10, 3)) / Math.pow(2, 24));
  //     let r1 = (AIN1 / 210) * Math.pow(10, 3);
  //     let F1 = 351.92 / (r1 - 0.9994);

  //     if (F1 < 0) F1 = -F1;

  //     return F1;
  //   };

  //   // 处理加速度值的函数
  //   const processAcceleration = (hexArray: any) => {
  //     let acc_x_decimal =
  //       parseInt(hexArray[0], 16) * Math.pow(16, 3) +
  //       parseInt(hexArray[1], 16) * Math.pow(16, 2) +
  //       parseInt(hexArray[2], 16) * 16 +
  //       parseInt(hexArray[3], 16);

  //     let acc_x_binary = acc_x_decimal.toString(2).padStart(16, '0');

  //     let ACC_X;
  //     if (acc_x_binary[0] === '0') {
  //       ACC_X = 0.061 * acc_x_decimal;
  //     } else {
  //       let acc_x_binary_tmp = '1';
  //       for (let i = 1; i < acc_x_binary.length; i++) {
  //         if (acc_x_binary[i] === '0') acc_x_binary_tmp += '1';
  //         else acc_x_binary_tmp += '0';
  //       }
  //       ACC_X = -0.061 * (parseInt(acc_x_binary_tmp.slice(1), 2) + 1);
  //     }

  //     return ACC_X;
  //   };

  //   const processMagnetism = (hexArray: any) => {
  //     let mag_decimal =
  //       parseInt(hexArray[0], 16) * Math.pow(16, 3) +
  //       parseInt(hexArray[1], 16) * Math.pow(16, 2) +
  //       parseInt(hexArray[2], 16) * 16 +
  //       parseInt(hexArray[3], 16);

  //     let mag_binary: string = mag_decimal.toString(2).padStart(16, '0');

  //     let Mag;
  //     if (mag_binary[0] === '0') {
  //       Mag = 1.5 * mag_decimal;
  //     } else {
  //       let mag_binary_tmp: string = '1';
  //       for (let i = 1; i < mag_binary.length; i++) {
  //         if (mag_binary[i] === '0') mag_binary_tmp += '1';
  //         else mag_binary_tmp += '0';
  //       }
  //       Mag = -1.5 * (parseInt(mag_binary_tmp.slice(1), 2) + 1);
  //     }
  //     return Mag;
  //   };
  // };

  // 产生模拟数据，测试用

  // 测试用
  // const getRandomSensorData = (): SensorData => {
  //   return {
  //     ax: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //     ay: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //     az: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //     mx: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //     my: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //     mz: Math.random() * 2 - 1, // 随机值在 -1 到 1 之间
  //   };
  // };

  // 模拟传感器数据更新

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-serialPort-read-data', (args: any) => {
      console.log(args);
      updateCube(args);
    });

    // 测试用
    // const interval = setInterval(() => {
    //   updateCube(getRandomSensorData());
    // }, 500); // 每100ms更新一次
    // return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeD;
