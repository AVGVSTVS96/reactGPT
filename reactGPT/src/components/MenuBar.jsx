import { useState } from "react";
import "./MenuBar.css";

const Menubar = () => {
  const [systemMessage, setSystemMessage] = useState("");
  const [modelValue, setModelValue] = useState(false);

  const SystemMessageChange = (event) => {
    setSystemMessage(event.target.value);
  };

  const ModelToggleChange = (event) => {
    setModelValue(event.target.checked);
  };

  // eslint-disable-next-line no-unused-vars
  const modelName = modelValue ? "gpt-4" : "gpt-3.5";

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

        <label className="slider-container">
          <input
            type="checkbox"
            autoComplete="off"
            checked={modelValue}
            onChange={ModelToggleChange}
          />

          <span className="slider-track">
            <span className="model-label" id="model-label-left">{"GPT-3.5"}</span>
            <div className="slider"></div>
            <span className="model-label" id="model-label-right">{"GPT-4"}</span>
          </span>
        </label>
    
    </div>
  );
};

export default Menubar;
