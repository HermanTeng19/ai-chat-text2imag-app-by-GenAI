'use client';
import React, { useState } from 'react';
import { Header } from '../components/header';
import { ChatContainer } from '../components/chat-container';
import { ChatInput } from '../components/chat-input';
import { useChat } from '../hooks/use-chat';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from '../components/AuthForm';

/**
 * Main chat page for the AI Chatbox app with authentication.
 */
export default function Page() {
  const { user, loading: authLoading, error, login, signup, loginWithGoogle, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { messages, sendMessage, isLoading } = useChat(user?.uid);

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-700">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-8 px-2">
        <AuthForm
          mode={mode}
          onLogin={login}
          onSignup={signup}
          onGoogle={loginWithGoogle}
          loading={authLoading}
          error={error}
        />
        <div className="text-center mt-4 text-sm text-gray-600">
          {mode === 'login' ? (
            <>Don&apos;t have an account? <button className="text-blue-600 underline" onClick={() => setMode('signup')}>Sign up</button></>
          ) : (
            <>Already have an account? <button className="text-blue-600 underline" onClick={() => setMode('login')}>Log in</button></>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-8 px-2">
      <div className="w-full max-w-3xl flex flex-col rounded-3xl shadow-2xl bg-white/90 border border-white/60 backdrop-blur-md overflow-hidden">
        <Header />
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/60 bg-white/80">
          <div className="flex items-center gap-3">
            {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border" />}
            <span className="font-semibold text-gray-700">{user.displayName || user.email}</span>
          </div>
          <button
            onClick={logout}
            className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold px-4 py-1 shadow hover:scale-105 transition-all text-sm"
          >
            Log out
          </button>
        </div>
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
