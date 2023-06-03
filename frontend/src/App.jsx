import { useState } from 'react';
import Menubar from './components/MenuBar';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [modelName, setModelName] = useState('gpt-3.5-turbo');
  const [systemMessage, setSystemMessage] = useState('');

  const handleModelToggle = checked => {
    if (checked) {
      setModelName('gpt-4');
    } else {
      setModelName('gpt-3.5-turbo');
    }
  };

  const handleSystemMessageChange = event => {
    setSystemMessage(event.target.value);
  };

  return (
    <div>
      <Menubar
        modelName={modelName}
        systemMessage={systemMessage}
        onModelToggle={handleModelToggle}
        onSystemMessageChange={handleSystemMessageChange}
      />
      <Chat modelName={modelName} systemMessage={systemMessage} />
    </div>
  );
}

export default App;
