import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// eslint-disable-next-line no-unused-vars
const CodeHighlight = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'plaintext';

  return !inline ? (
    <SyntaxHighlighter
      style={coldarkDark}
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
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  node: PropTypes.object,
};

export default CodeHighlight;
