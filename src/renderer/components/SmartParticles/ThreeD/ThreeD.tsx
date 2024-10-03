// components/SmartParticles/ThreeD.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeD: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

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

    // 设置相机位置
    camera.position.z = 3;
    camera.position.x = 1;
    camera.position.y = 1;
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
    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;

    return () => {
      // 在组件卸载时清理
      window.removeEventListener('resize', handleResize); // 移除事件监听
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
};

export default ThreeD;
