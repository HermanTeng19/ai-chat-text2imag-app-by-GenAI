import React from 'react';
import { motion } from 'framer-motion';

/**
 * Avatar displays a rounded image for the sender (user or AI).
 * @param sender - 'user' or 'ai' to select the avatar image.
 */
export type AvatarProps = {
  sender: 'user' | 'ai';
};

export const Avatar: React.FC<AvatarProps> = ({ sender }) => {
  const src = `/avatar/${sender}.png`;
  const alt = sender === 'user' ? 'User Avatar' : 'AI Assistant Avatar';
  return (
    <motion.img
      src={src}
      alt={alt}
      className="w-8 h-8 rounded-full border border-gray-200 shadow-md ring-0 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      width={32}
      height={32}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      tabIndex={0}
    />
  );
}; 