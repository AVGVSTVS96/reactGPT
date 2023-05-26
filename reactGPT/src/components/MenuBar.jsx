import React, { useState } from 'react';
import './MenuBar.css';

const Menubar = () => {
  const [systemMessage, setSystemMessage] = useState('');
  const [isGpt4, setIsGpt4] = useState(false);

  const handleSystemMessageChange = (event) => {
    setSystemMessage(event.target.value);
  }

  const handleModelToggleChange = () => {
    setIsGpt4(!isGpt4);
  }

  return (
    <div className="menubar">
      <input
        type="text"
        className="input"
        id="system-message"
        placeholder="Enter system message"
        value={systemMessage}
        onChange={handleSystemMessageChange}
      />

      <div className="model-toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            id="model-toggle"
            autoComplete="off"
            checked={isGpt4}
            onChange={handleModelToggleChange}
          />

          <span className="slider">
            <span className="model-label" id="model-label-left">{isGpt4 ? 'GPT-4' : 'GPT-3.5'}</span>
            <div className="toggle"></div>
            <span className="model-label" id="model-label-right">{isGpt4 ? 'GPT-4' : 'GPT-3.5'}</span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default Menubar;
