import React from 'react';
import { Message } from '../types/message';
import { ChatMessage } from './chat-message';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * ChatContainer displays a scrollable list of chat messages with animations.
 * @param messages - Array of chat messages to display.
 */
export type ChatContainerProps = {
  messages: Message[];
};

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white/80 rounded-2xl border border-blue-200 shadow-inner min-h-[300px]">
    <AnimatePresence initial={false}>
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <ChatMessage message={msg} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
); 