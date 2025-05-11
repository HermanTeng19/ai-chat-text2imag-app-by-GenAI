'use client';
import { useState } from 'react';
import { Message } from '../types/message';
import { getAIResponse } from '../lib/ai';

/**
 * Custom hook to manage chat messages and handle sending/receiving.
 * @returns { messages, sendMessage, isLoading }
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a user message and triggers an AI response.
   * @param content - The user's message content.
   */
  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      sender: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const aiContent = await getAIResponse(content);
      const aiMessage: Message = {
        sender: 'ai',
        content: aiContent,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
} 