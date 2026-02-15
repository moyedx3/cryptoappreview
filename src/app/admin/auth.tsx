'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = '1111';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', ADMIN_PASSWORD);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1FAE5]">
        <div className="font-display text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D1FAE5] p-4">
        <div className="bg-white border-4 border-black p-8 brutalist-shadow max-w-md w-full">
          <h1 className="font-display text-3xl uppercase mb-6 text-center">Admin Login</h1>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!login(password)) {
                setError('Invalid password');
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-[#D1FAE5]"
            />
            {error && (
              <div className="text-red-600 font-bold text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
