'use client';
import { useEffect, useState } from 'react';
import { Message } from '../types/message';
import { getAIResponse, getImageFromPrompt } from '../lib/ai';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Custom hook to manage chat messages and handle sending/receiving with Firestore history.
 * @param userId - The current user's UID.
 * @returns { messages, sendMessage, isLoading }
 */
export function useChat(userId?: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history from Firestore
  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, 'users', userId, 'chats', 'default', 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [userId]);

  // Save a message to Firestore
  const saveMessage = async (msg: Message) => {
    if (!userId) return;
    await addDoc(collection(db, 'users', userId, 'chats', 'default', 'messages'), {
      ...msg,
      timestamp: msg.timestamp || Date.now(),
      createdAt: serverTimestamp(),
    });
  };

  /**
   * Sends a user message and triggers an AI or image response.
   * @param content - The user's message content.
   */
  const sendMessage = async (content: string) => {
    const isImagePrompt = content.trim().toLowerCase().startsWith('/image ');
    if (isImagePrompt) {
      console.log('[DEBUG] Detected image prompt:', content);
    }
    const userMessage: Message = {
      sender: 'user',
      content,
      timestamp: Date.now(),
      type: 'text',
    };
    setMessages((prev) => [...prev, userMessage]);
    await saveMessage(userMessage);
    setIsLoading(true);
    try {
      if (isImagePrompt) {
        const prompt = content.replace(/^\/image\s+/i, '').trim();
        const imageUrl = await getImageFromPrompt(prompt, userId);
        console.log('[DEBUG] getImageFromPrompt result:', imageUrl);
        if (typeof imageUrl === 'string' && imageUrl.startsWith('[Error:')) {
          // Show error as text message
          const aiMessage: Message = {
            sender: 'ai',
            content: imageUrl,
            timestamp: Date.now(),
            type: 'text',
          };
          console.log('[DEBUG] Setting AI error message:', aiMessage);
          setMessages((prev) => [...prev, aiMessage]);
          await saveMessage(aiMessage);
        } else {
          // Show image as normal
          const aiMessage: Message = {
            sender: 'ai',
            content: prompt,
            timestamp: Date.now(),
            type: 'image',
            imageUrl,
          };
          console.log('[DEBUG] Setting AI image message:', aiMessage);
          setMessages((prev) => [...prev, aiMessage]);
          await saveMessage(aiMessage);
        }
      } else {
        const aiContent = await getAIResponse(content);
        const aiMessage: Message = {
          sender: 'ai',
          content: aiContent,
          timestamp: Date.now(),
          type: 'text',
        };
        setMessages((prev) => [...prev, aiMessage]);
        await saveMessage(aiMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
} 