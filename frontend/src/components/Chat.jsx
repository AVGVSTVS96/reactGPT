import { useAutoScroll } from './utils/AutoScroll';
import PropTypes from "prop-types";
import { useState, useLayoutEffect } from "react";
import ChatInput from './ChatInput';
import Messages from './Messages';
import handleSystemMessage from './utils/HandleSystemMessage';
import "./styles/Chat.css";

Chat.propTypes = {
  modelName: PropTypes.string,
  systemMessage: PropTypes.string,
};

function Chat(props) {
  const [messages, setMessages] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let userInput = event.target.user_input.value.trim();

    // Add user message to messages
    let newMessages = [...messages, { role: "user", content: userInput }];
    event.target.user_input.value = "";

    // Update system message
    if (props.systemMessage) {
      newMessages = handleSystemMessage(newMessages, props.systemMessage);
    }

    // Send request to server
    const response = await fetch("http://localhost:8000/gpt4", {
      method: "POST",
      body: JSON.stringify({
        messages: newMessages,
        model_type: props.modelName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setMessages([...messages, { role: "user", content: userInput }]);


    if (response.ok) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        setMessages(prevMessages => {
          // Check if last message was from the assistant
          if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].role === "assistant") {
            // Create a copy of the last assistant message and append text
            let lastMessage = { ...prevMessages[prevMessages.length - 1], content: prevMessages[prevMessages.length - 1].content + text };
            // Return the messages with the old messages plus the updated message
            return [...prevMessages.slice(0, -1), lastMessage];
          } else {
            // If last message was not from the assistant, add a new message from the assistant
            return [...prevMessages, { role: "assistant", content: text }];
          }
        });
      }
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
