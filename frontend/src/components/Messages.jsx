import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import CodeHighlight from './utils/CodeHighlight';
import './styles/Messages.css';

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
  scrollCheck: PropTypes.func.isRequired,
};

function Messages({ messages, messagesEndRef, scrollCheck }) {
  return (
    <div id="chat-messages" className="chat-box" ref={messagesEndRef} onScroll={scrollCheck}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
          <ReactMarkdown components={{ code: CodeHighlight }}>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

export default Messages;
