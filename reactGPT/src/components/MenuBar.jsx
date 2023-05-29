import PropTypes from 'prop-types';
import "./MenuBar.css";

Menubar.propTypes = {
  modelName: PropTypes.string,
  systemMessage: PropTypes.string,
  onModelToggle: PropTypes.func,
  onSystemMessageChange: PropTypes.func,
};

function Menubar(props) {
  const handleModelToggleChange = (event) => {
    props.onModelToggle(event.target.checked);
  };

  const handleSystemMessageChange = (event) => {
    props.onSystemMessageChange(event);
  };

  return (
    <div className="menubar">
      <input
        type="text"
        className="input"
        id="system-message"
        placeholder="Enter system message"
        value={props.systemMessage}
        onChange={handleSystemMessageChange}
      />

      <label className="slider-container">
        <input
          type="checkbox"
          autoComplete="off"
          checked={props.modelName === "gpt-4"}
          onChange={handleModelToggleChange}
        />

        <span className="slider-track">
          <span className="model-label" id="model-label-left">{"GPT-3.5"}</span>
          <div className="slider"></div>
          <span className="model-label" id="model-label-right">{"GPT-4"}</span>
        </span>
      </label>
    </div>
  );
}

export default Menubar;
