import './globals.css';
import React from 'react';

/**
 * Root layout for the AI Chatbox app. Applies global styles and structure.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
