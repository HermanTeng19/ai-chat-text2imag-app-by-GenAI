'use client';
import { useState } from 'react';
import { Message } from '../types/message';
import { getAIResponse, getImageFromPrompt } from '../lib/ai';

/**
 * Custom hook to manage chat messages and handle sending/receiving.
 * @returns { messages, sendMessage, isLoading }
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a user message and triggers an AI or image response.
   * @param content - The user's message content.
   */
  const sendMessage = async (content: string) => {
    const isImagePrompt = content.trim().toLowerCase().startsWith('/image ');
    const userMessage: Message = {
      sender: 'user',
      content,
      timestamp: Date.now(),
      type: isImagePrompt ? 'image' : 'text',
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      if (isImagePrompt) {
        const prompt = content.replace(/^\/image\s+/i, '').trim();
        const imageUrl = await getImageFromPrompt(prompt);
        const aiMessage: Message = {
          sender: 'ai',
          content: prompt,
          timestamp: Date.now(),
          type: 'image',
          imageUrl,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiContent = await getAIResponse(content);
        const aiMessage: Message = {
          sender: 'ai',
          content: aiContent,
          timestamp: Date.now(),
          type: 'text',
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
} 