'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ChatInput provides a fixed input bar for sending messages.
 * @param onSend - Function to call with the message content.
 * @param loading - Whether the input should be disabled (AI is responding).
 */
export type ChatInputProps = {
  onSend: (content: string) => void;
  loading?: boolean;
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <motion.form
      onSubmit={handleSend}
      className="flex items-center gap-3 px-4 py-3 bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <input
        type="text"
        className="flex-1 rounded-full border-2 border-blue-300 bg-white px-5 py-3 shadow focus:outline-none focus:ring-2 focus:ring-pink-400 text-base transition-all duration-200 text-gray-900 placeholder-gray-500"
        placeholder="Type your message or type /image prompt for image generation"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <motion.button
        type="submit"
        className="ml-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-blue-500 transition-all duration-200 disabled:opacity-50 text-base"
        disabled={loading || !input.trim()}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
      >
        Send
      </motion.button>
    </motion.form>
  );
}; 