import { useLayoutEffect, useRef } from "react";

export const useAutoScroll = () => {
    // Ref for the chat box to control scroll position.
    const messagesEndRef = useRef(null);
    let autoScroll = useRef(true);

    // Ref to store the last scroll top position.
    const lastScrollTop = useRef(0);

    const scrollCheck = () => {
        // Check if there are any messages 
        if (!messagesEndRef.current) return;

        const { scrollTop, clientHeight, scrollHeight } = messagesEndRef.current;

        // If user scrolls up, turn off auto-scrolling.
        if (scrollTop < lastScrollTop.current) {
            autoScroll.current = false;
        }
        // If user scrolls to the bottom, turn on auto-scrolling.
        else if (scrollTop + clientHeight >= scrollHeight) {
            autoScroll.current = true;
        }

        // Update the last scroll top position.
        lastScrollTop.current = scrollTop;
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
    useLayoutEffect(() => {
        scrollToBottom();
    }, []);

    return { messagesEndRef, scrollCheck, scrollToBottom };
};