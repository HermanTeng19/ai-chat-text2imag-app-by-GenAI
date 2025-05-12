import React, { useState } from 'react';

/**
 * AuthForm for login/signup with email/password and Google.
 */
export type AuthFormProps = {
  mode: 'login' | 'signup';
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
  onGoogle: () => void;
  loading: boolean;
  error?: string | null;
};

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onLogin, onSignup, onGoogle, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 mt-12">
      <h2 className="text-2xl font-extrabold text-center mb-2 text-gray-800">{mode === 'login' ? 'Log In' : 'Sign Up'}</h2>
      <input
        type="email"
        className="rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="password"
        className="rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 mt-2 shadow-md disabled:opacity-50"
        disabled={loading}
      >
        {mode === 'login' ? 'Log In' : 'Sign Up'}
      </button>
      <button
        type="button"
        className="w-full rounded-full bg-white border border-blue-400 text-blue-600 font-semibold py-2 mt-1 shadow-sm hover:bg-blue-50 transition disabled:opacity-50"
        onClick={onGoogle}
        disabled={loading}
      >
        Continue with Google
      </button>
    </form>
  );
}; 