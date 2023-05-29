import PropTypes from "prop-types";
import { useState } from "react";
import "./Chat.css";

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

    // Update system message
    if (props.systemMessage) {
      let systemMessageIndex = newMessages.findIndex(
        (message) => message.role === "system"
      );
      // If the system message exists in array, remove it
      if (systemMessageIndex !== -1) {
        newMessages.splice(systemMessageIndex, 1);
      }
      newMessages.push({ role: "system", content: props.systemMessage });
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




    // no chunk streaming
    // if (response.ok) {
    //   const reader = response.body.getReader();
    //   const decoder = new TextDecoder("utf-8");
    //   let assistantMessage = "";

    //   // eslint-disable-next-line no-constant-condition
    //   while (true) {
    //     const { value, done } = await reader.read();
    //     if (done) {
    //       setMessages((prevMessages) => [
    //         ...prevMessages,
    //         { role: "assistant", content: assistantMessage },
    //       ]);
    //       break;
    //     }

    //     const text = decoder.decode(value);
    //     assistantMessage += text;
    //   }
    // } else {
    //   console.error(`Error: ${response.status}`);
    // }

//   // Stream chunks as different message divs
//   if (response.ok) {
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder("utf-8");

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) break;

//       const text = decoder.decode(value);
//       setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: text }]);
//     }
//   } else {
//     console.error(`Error: ${response.status}`);
//   }

  // Handle server response
  // Attempt to stream chunks as one message div
  if (response.ok) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      setMessages(prevMessages => {
        let lastMessage = prevMessages.pop();
        lastMessage = [{ role: "assistant", content: assistantMessage }]
      })
      
    }
  } else {
    console.error(`Error: ${response.status}`);
  }

    // Clear user input
    event.target.user_input.value = "";
  };

  return (
    <div className="chat-container">
      <h1 className="heading">Canvas GPT</h1>
      <div className="chat-wrapper">
        <div id="chat-messages" className="chat-box">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "assistant-message"
              }`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <form id="chat-form" className="input-form" onSubmit={handleFormSubmit}>
          <textarea
            type="text"
            className="input"
            id="user-input"
            name="user_input"
            placeholder="Type your message..."
          />
          <button className="button" type="submit" id="submitBtn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
