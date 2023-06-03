function handleSystemMessage(newMessages, systemMessage) {
    let systemMessageIndex = newMessages.findIndex(
        (message) => message.role === 'system'
    );
    // If the system message exists in array, remove it
    if (systemMessageIndex !== -1) {
        newMessages.splice(systemMessageIndex, 1);
    }
    newMessages.push({ role: 'system', content: systemMessage });

    return newMessages;
}

export { handleSystemMessage };
