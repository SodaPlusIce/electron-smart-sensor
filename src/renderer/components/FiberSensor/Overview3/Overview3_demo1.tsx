import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const gridSize = 50; // 50x50 的点

const SplineScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 250, 1000], fov: 70 }}>
      <Scene />
    </Canvas>
  );
};

const Scene: React.FC = () => {
  const { camera, scene, gl: renderer } = useThree();
  const [pointMeshes, setPointMeshes] = useState<THREE.Mesh[]>([]);

  // 创建一个50x50的点云平面
  useEffect(() => {
    const positionsArray: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        positionsArray.push(i * 20 - 500, 0, j * 20 - 500); // 这里的 -500 和 20 是为了调整点的位置
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positionsArray, 3),
    );

    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 5 });
    const pointsMesh = new THREE.Points(geometry, material);

    scene.add(pointsMesh);
    setPointMeshes([pointsMesh]);

    return () => {
      scene.remove(pointsMesh);
    };
  }, [scene]);

  // 为点云中的每个点添加动画效果，并且根据点的位置动态更新线条
  useFrame(() => {
    // 检查 pointMeshes 是否已初始化并且包含有效的几何数据
    if (pointMeshes.length > 0 && pointMeshes[0].geometry) {
      const positionsArray = pointMeshes[0].geometry.attributes.position.array;
      for (let i = 0; i < positionsArray.length; i += 3) {
        positionsArray[i + 1] =
          Math.sin(positionsArray[i] * 0.05 + Date.now() * 0.005) * 10; // 使用sin函数进行运动
      }
      pointMeshes[0].geometry.attributes.position.needsUpdate = true; // 标记为需要更新
    }
  });

  // 设置基本的Three.js场景
  useEffect(() => {
    scene.background = new THREE.Color(0xf0f0f0);
    camera.position.set(0, 250, 1000);
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0xf0f0f0, 3));

    const light = new THREE.SpotLight(0xffffff, 4.5);
    light.position.set(0, 1500, 200);
    light.angle = Math.PI * 0.2;
    light.decay = 0;
    light.castShadow = true;
    scene.add(light);

    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);
    const planeMaterial = new THREE.ShadowMaterial({
      color: 0x000000,
      opacity: 0.2,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -200;
    plane.receiveShadow = true;
    scene.add(plane);

    const helper = new THREE.GridHelper(2000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add(helper);

    // 监听窗口大小变化
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [camera, scene, renderer]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[0, 100, 100]}
        angle={0.2}
        intensity={5}
        castShadow
      />
      <OrbitControls />
    </>
  );
};

export default SplineScene;
