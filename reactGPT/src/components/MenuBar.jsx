import { useState } from 'react';
import './MenuBar.css';

const Menubar = () => {
  const [systemMessage, setSystemMessage] = useState('');
  const [modelValue, setIsGpt4] = useState(false);

  const SystemMessageChange = (event) => {
    setSystemMessage(event.target.value);
  }

  const ModelToggleChange = (event) => {
    setIsGpt4(event.target.checked);
  };
  
  // eslint-disable-next-line no-unused-vars
  const modelName = modelValue ? 'gpt-4' : 'gpt-3.5';

  return (
    <div className="menubar">
      <input
        type="text"
        className="input"
        id="system-message"
        placeholder="Enter system message"
        value={systemMessage}
        onChange={SystemMessageChange}
      />

      <div className="model-toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            id="model-toggle"
            autoComplete="off"
            checked={modelValue}
            onChange={ModelToggleChange}
          />

          <span className="slider">
            <span className="model-label" id="model-label-left">{'GPT-3.5'}</span>
            <div className="toggle"></div>
            <span className="model-label" id="model-label-right">{'GPT-4'}</span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default Menubar;
