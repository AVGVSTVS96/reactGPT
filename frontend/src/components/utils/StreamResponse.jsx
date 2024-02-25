export async function StreamResponse(reader, decoder, setMessages) {
  let streaming = true;
   while (streaming) {
    const { value, done } = await reader.read();
    if (done) {
       streaming = false;
       break;
     }

    const text = decoder.decode(value);
    setMessages(prevMessages => {
      // Check if last message was from the assistant
      if (prevMessages.length > 0 &&
        prevMessages[prevMessages.length - 1].role === 'assistant') {
        // Create a copy of the last assistant message and append text
        let lastMessage = {
          ...prevMessages[prevMessages.length - 1],
          content: prevMessages[prevMessages.length - 1].content + text,
        };
        // Return the messages with the old messages plus the updated message
        return [...prevMessages.slice(0, -1), lastMessage];
      } else {
        // If last message was not from the assistant, add a new message from the assistant
        return [...prevMessages, { role: 'assistant', content: text }];
      }
    });
  }
}
