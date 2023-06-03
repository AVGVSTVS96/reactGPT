export async function SendServerRequest(newMessages, props) {
  return await fetch('http://localhost:8000/gpt4', {
    method: 'POST',
    body: JSON.stringify({
      messages: newMessages,
      model_type: props.modelName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
