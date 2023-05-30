import PropTypes from "prop-types";


ChatInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

function ChatInput({ onSubmit }) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.form.requestSubmit();
        }
    };


    return (
        <form id="chat-form" className="input-form" onSubmit={onSubmit}>
            <textarea
                type="text"
                className="input"
                id="user-input"
                name="user_input"
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
            />
            <button className="button" type="submit" id="submitBtn">
                Send
            </button>
        </form>
    );
}

export default ChatInput;
