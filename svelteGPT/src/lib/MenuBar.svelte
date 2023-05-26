<script>
  let modelName = false; // initially GPT-3.5-Turbo is selected
  let systemMessage = "";

  function handleModelToggle() {
    modelName = !modelName;
  }

  function handleSystemMessageChange(event) {
    systemMessage = event.target.value;
  }
</script>

<div class="menubar">
  <input
    type="text"
    class="input"
    bind:value={systemMessage}
    on:input={handleSystemMessageChange}
    placeholder="Enter system message"
  />
  <div class="model-toggle-container">
    <label class="switch">
      <input
        type="checkbox"
        bind:checked={modelName}
        on:change={handleModelToggle}
        autocomplete="off"
      />
      <span class="slider">
        <span class="model-label">
          {modelName ? "GPT-4" : "GPT-3.5-Turbo"}
        </span>
      </span>
    </label>
  </div>
</div>

<style>
  .menubar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    backdrop-filter: blur(1px);
    border-bottom: 0.25px solid hsla(235, 30%, 20%, 0.4);
    z-index: 1000;

    /* Changes to center menubar */
    justify-content: flex-start; /* new, may not be needed */
    background-color: hsla(235, 20%, 15%, 0.9);
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    border-radius: 10px;
    height: 20px;
    align-items: center;
  }

  .model-toggle-container {
    display: flex;
    align-items: center;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 8.5em;
    height: 2em;
    margin-left: 15px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    background-color: hsl(240, 10%, 15%);
    transition: 0.4s;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .toggle {
    position: absolute;
    height: 2em;
    width: 50%;
    left: 0;
    background-color: hsl(240, 20%, 20%);
    transition: 0.4s;
    border-radius: 5px;
  }

  input:checked + .slider .toggle {
    left: 50%;
  }

  .model-label {
    display: flex;
    justify-content: center;
    align-items: center;
    color: hsl(240, 76%, 87%);
    width: 50%;
    z-index: 1;
    font-size: 15px;
  }
</style>
