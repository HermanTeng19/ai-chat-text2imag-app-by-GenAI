import React from 'react';
import { motion } from 'framer-motion';

/**
 * Header displays the app branding at the top of the chat.
 */
export const Header: React.FC = () => (
  <motion.header
    className="sticky top-0 z-10 bg-transparent py-6 text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight font-sans">
      AI Chatbox Online
    </h1>
  </motion.header>
); 