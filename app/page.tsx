'use client';
import React from 'react';
import { Header } from '../components/header';
import { ChatContainer } from '../components/chat-container';
import { ChatInput } from '../components/chat-input';
import { useChat } from '../hooks/use-chat';

/**
 * Main chat page for the AI Chatbox app.
 */
export default function Page() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-8 px-2">
      <div className="w-full max-w-3xl flex flex-col rounded-3xl shadow-2xl bg-white/90 border border-white/60 backdrop-blur-md overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-2 sm:px-6 pt-2 pb-32 min-h-[400px]">
          <ChatContainer messages={messages} />
        </div>
        <div className="relative z-10">
          <ChatInput onSend={sendMessage} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
