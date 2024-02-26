import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import "../styles/tokyo-night-dark.min.css"

const CodeHighlight = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'plaintext';

  return !inline ? (
    <SyntaxHighlighter
      useInlineStyles={false}
      language={language}
      showLineNumbers={false}
      PreTag="div"
      {...props}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

CodeHighlight.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

export default CodeHighlight;
