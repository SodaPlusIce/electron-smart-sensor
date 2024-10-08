import React, { useState, useEffect } from 'react';

interface Config {
  param1: string;
  param2: string;
  // 可以根据需要添加更多的参数
}

interface ConfigPanelProps {
  onConfigChange: (config: Config) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState<Config>({
    param1: '',
    param2: '',
  });

  // 从 sessionStorage 加载数据
  useEffect(() => {
    const savedConfig = sessionStorage.getItem('config');
    if (savedConfig) {
      const parsedConfig: Config = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      onConfigChange(parsedConfig); // 通知父组件已加载的配置
    }
  }, [onConfigChange]);

  // 当配置项发生改变时更新状态和 sessionStorage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newConfig = { ...config, [name]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
    sessionStorage.setItem('config', JSON.stringify(newConfig)); // 存储到 sessionStorage
  };

  return (
    <div className="config-container">
      <h3>配置项</h3>
      <div className="config-row">
        <div className="config-section">
          <label htmlFor="param1">参数1：</label>
          <input
            type="text"
            name="param1"
            value={config.param1}
            onChange={handleChange}
          />
        </div>
        <div className="config-section">
          <label htmlFor="param2">参数2：</label>
          <input
            type="text"
            name="param2"
            value={config.param2}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* 其他配置项 */}
    </div>
  );
};

export default ConfigPanel;
