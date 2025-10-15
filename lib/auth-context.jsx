'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@react.com' && password === 'admin123') {
        const userData = {
          id: 1,
          email: 'admin@react.com',
          name: 'Admin User',
          role: 'admin',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData));
        }
        setUser(userData);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 100);
        return { success: true };
      } else if (email === 'user@react.com' && password === 'user123') {
        const userData = {
          id: 2,
          email: 'user@react.com',
          name: 'Regular User',
          role: 'user',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData));
        }
        setUser(userData);
        setTimeout(() => {
          router.push('/user/dashboard');
        }, 100);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
