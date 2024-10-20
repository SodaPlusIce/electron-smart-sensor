// components/SmartParticles/ThreeD.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ThreeD.css';

interface SensorData {
  accx: number;
  accy: number;
  accz: number;
  magx: number;
  magy: number;
  magz: number;
}

const ThreeD: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // 获取屏幕尺寸
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 64;

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
  // const quaternionToEuler = (q: number[]): THREE.Euler => {
  //   const [qw, qx, qy, qz] = q;
  //   const ysqr = qy * qy;

  //   // roll (x-axis rotation)
  //   const t0 = 2 * (qw * qx + qy * qz);
  //   const t1 = 1 - 2 * (qx * qx + ysqr);
  //   const roll = Math.atan2(t0, t1);

  //   // pitch (y-axis rotation)
  //   let t2 = 2 * (qw * qy - qz * qx);
  //   t2 = Math.max(-1, Math.min(1, t2)); // 限制范围
  //   const pitch = Math.asin(t2);

  //   // yaw (z-axis rotation)
  //   const t3 = 2 * (qw * qz + qx * qy);
  //   const t4 = 1 - 2 * (ysqr + qz * qz);
  //   const yaw = Math.atan2(t3, t4);

  //   return new THREE.Euler(pitch, yaw, roll, 'XYZ');
  // };

  // 更新立方体姿态的函数
  let quat: number[] = [0, 0, 1, 0]; // 初始化为单位四元数
  const updateCube = (sensorData: SensorData) => {
    const { accx, accy, accz, magx, magy, magz } = sensorData;
    console.log('sensordata：');
    console.log(sensorData);

    // 计算新的四元数
    const beta = 0.1; // 增益
    quat = MadgwickQuaternionUpdate(
      quat,
      accx,
      accy,
      accz,
      magx,
      magy,
      magz,
      beta,
    );

    // 方法一：根据欧拉角更新立方体的旋转
    // const euler = quaternionToEuler(quat); // 将四元数转换为欧拉角
    // if (cubeRef.current) {
    //   cubeRef.current.rotation.set(euler.x, euler.y, euler.z);
    // }

    // 方法二：根据四元数更新立方体的旋转
    if (cubeRef.current) {
      cubeRef.current.quaternion.copy(
        new THREE.Quaternion(quat[1], quat[2], quat[3], quat[0]),
      );
    }
  };

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

  return <div ref={containerRef} className="canvas-container" />;
};

export default ThreeD;
