import React, { useState } from 'react';
import { Message } from '../types/message';
import { Avatar } from './avatar';
import { formatTimestamp } from '../utils/format-timestamp';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

/**
 * ChatMessage displays a single chat message with avatar, content, and timestamp.
 * @param message - The message object to display.
 */
export type ChatMessageProps = {
  message: Message;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [hovered, setHovered] = useState(false);

  // Render image message
  if (message.type === 'image' && message.imageUrl) {
    const handleDownload = async () => {
      try {
        const response = await fetch(message.imageUrl!);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        alert('Failed to download image. Please try again.');
      }
    };
    return (
      <div className={`flex items-end mb-2 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && <Avatar sender={message.sender} />}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`${isUser ? 'max-w-xs bg-blue-500 text-white ml-auto flex flex-row-reverse' : 'max-w-2xl bg-gray-100 text-gray-900 mr-auto'} rounded-lg px-6 py-4 shadow-md flex flex-col items-center relative group`}
          style={{ textAlign: isUser ? 'right' : 'left' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-full flex justify-center">
            <img src={message.imageUrl} alt={message.content} className="rounded-lg shadow-md max-w-full mb-2" />
            {hovered && (
              <button
                onClick={handleDownload}
                className="absolute top-2 right-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-full px-3 py-1 shadow-lg text-xs font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
                aria-label="Download image"
              >
                Download
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500 mb-1 w-full break-words">{message.content}</div>
          <div className={`text-xs mt-1 w-full ${isUser ? 'text-blue-100 text-right' : 'text-gray-400 text-left'}`}>{formatTimestamp(message.timestamp)}</div>
        </motion.div>
        {isUser && <Avatar sender={message.sender} />}
      </div>
    );
  }

  // Render text/markdown message as before
  return (
    <div
      className={`flex items-end mb-2 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && <Avatar sender={message.sender} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`${isUser ? 'max-w-xs bg-blue-500 text-white ml-auto flex flex-row-reverse' : 'max-w-2xl bg-gray-100 text-gray-900 mr-auto'} rounded-lg px-6 py-4 shadow-md flex items-end`}
        style={{ textAlign: isUser ? 'right' : 'left' }}
      >
        <div className="flex flex-col w-full">
          <div className={isUser ? 'text-base' : 'text-base sm:text-lg'}>
            {isUser ? (
              message.content
            ) : (
              <div className="prose prose-lg prose-blue prose-pre:bg-gray-900 prose-pre:text-white prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic prose-hr:my-4 break-words max-w-full w-full">
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <div className={`text-xs mt-2 ${isUser ? 'text-blue-100 text-right' : 'text-gray-400 text-left'}`}>{formatTimestamp(message.timestamp)}</div>
        </div>
      </motion.div>
      {isUser && <Avatar sender={message.sender} />}
    </div>
  );
}; 