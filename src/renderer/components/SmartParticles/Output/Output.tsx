import React, { useState } from 'react';
import './Output.css';

const Output: React.FC = () => {
  const [comPort, setComPort] = useState<string>('');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const [exportedData, setExportedData] = useState<string | null>(null);

  const handleStartExport = () => {
    const now = new Date();
    setStartTime(now.toLocaleTimeString());
    setEndTime(null);
    setExportedData(null);
    setElapsedTime(null);
  };

  const handleEndExport = () => {
    const now = new Date();
    if (startTime) {
      const start = new Date(`1970/01/01 ${startTime}`);
      const elapsed = ((now.getTime() - start.getTime()) / 1000).toFixed(2);
      setElapsedTime(`${elapsed} 秒`);
    }
    setEndTime(now.toLocaleTimeString());
    setExportedData(`${Math.floor(Math.random() * 1000)} 条`);
  };

  return (
    <div className="output-container">
      <h1>数据导出</h1>
      <div className="input-container">
        <label htmlFor="com-port">数据输出端口：</label>
        <input
          id="com-port"
          type="text"
          value={comPort}
          onChange={(e) => setComPort(e.target.value)}
          placeholder="COM?"
        />
      </div>
      <div className="button-container">
        <button className="start-button" onClick={handleStartExport}>
          开始导出
        </button>
        <button className="end-button" onClick={handleEndExport}>
          结束导出
        </button>
      </div>
      <div className="export-info">
        <h2>数据导出信息</h2>
        <p>开始时间: {startTime || '--'}</p>
        <p>经过时间: {elapsedTime || '--'}</p>
        <p>结束时间: {endTime || '--'}</p>
        <p>导出数据量: {exportedData || '--'}</p>
      </div>
    </div>
  );
};

export default Output;
