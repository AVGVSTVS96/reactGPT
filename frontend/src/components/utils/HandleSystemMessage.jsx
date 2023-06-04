function handleSystemMessage(newMessages, systemMessage) {
    newMessages.push({ role: 'system', content: systemMessage });

    return newMessages;
}

export { handleSystemMessage };
