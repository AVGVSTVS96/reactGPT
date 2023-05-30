import { useEffect, useRef } from "react";

export const useAutoScroll = () => {
  // Ref for the chat box to control scroll position.
  const messagesEndRef = useRef(null);
  let autoScroll = useRef(true);

  const scrollCheck = () => {
    // Check if there are any messages 
    if (!messagesEndRef.current) return;
    // check scroll position and set autoScroll to false if user has scrolled up
    const { scrollTop, clientHeight, scrollHeight } = messagesEndRef.current;
    
    // Autoscroll cancel buffer. Can be jerky when set at 50+ but 
    // can't be set too low because it can cancel itself when streaming
    const atBottom = scrollTop + clientHeight >= scrollHeight - 50; 
    autoScroll.current = atBottom;
  };

  const scrollToBottom = () => {
    // Auto-scroll if enabled and the chat box element exists.
    if (autoScroll.current && messagesEndRef.current) {
      window.requestAnimationFrame(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      });
    }
  };
  
  // Run scrollToBottom once when the component mounts.
  useEffect(() => {
    scrollToBottom();
  }, []);

  return { messagesEndRef, scrollCheck, scrollToBottom };
};