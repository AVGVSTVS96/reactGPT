import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { useState, useLayoutEffect } from 'react';
import { handleSystemMessage } from './utils/HandleSystemMessage';
import { SendServerRequest } from './utils/SendServerRequest';
import { StreamResponse } from './utils/StreamResponse';
import { useAutoScroll } from './utils/AutoScroll';
import './styles/Chat.css';

Chat.propTypes = {
  modelName: PropTypes.string,
  systemMessage: PropTypes.string,
};

function Chat(props) {
  const [messages, setMessages] = useState([]);

  const handleFormSubmit = async event => {
    event.preventDefault();

    let userInput = event.target.user_input.value.trim();

    // Add user message to messages
    let newMessages = [...messages, { role: 'user', content: userInput }];
    event.target.user_input.value = '';

    // Update system message
    if (props.systemMessage) {
      newMessages = handleSystemMessage(newMessages, props.systemMessage);
    }

    // Send request to server
    const response = await SendServerRequest(newMessages, props);

    setMessages([...messages, { role: 'user', content: userInput }]);

    if (response.ok) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      await StreamResponse(reader, decoder, setMessages);
    } else {
      console.error(`Error: ${response.status}`);
    }
  };

  const { messagesEndRef, scrollCheck, scrollToBottom } = useAutoScroll();

  useLayoutEffect(() => {
    scrollCheck();
    scrollToBottom();
  }, [messages, scrollCheck, scrollToBottom]);

  return (
    <div className="chat-container">
      <h1 className="heading">Canvas GPT</h1>
      <div className="chat-wrapper">
        <Messages messages={messages} messagesEndRef={messagesEndRef} scrollCheck={scrollCheck} />
        <ChatInput onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default Chat;
