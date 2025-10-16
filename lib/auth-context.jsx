'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Keep session and context user in sync
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser(session.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(session.user));
      }
    } else {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [session, status]);

  // 🧾 SIGNUP — call our /api/auth/register route
  const signup = async ({ firstname, lastname, email, password }) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };

      // Auto-login after signup
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result.error) return { success: false, error: result.error };
      router.push('/');
      return { success: true };
    } catch (err) {
      console.error('Signup error:', err);
      return { success: false, error: 'Something went wrong during signup' };
    }
  };

  // 🔐 LOGIN — uses NextAuth Credentials provider
  const login = async (email, password, role) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
      });

      if (result.error) {
        return { success: false, error: result.error };
      }

      // ✅ **FIXED**: Conditional redirection based on user role
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Something went wrong during login' };
    }
  };

  // 🔓 LOGOUT — handled by NextAuth
  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // 📩 Forgot Password request (custom API)
  const requestReset = async (email) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error };
      return { success: true, message: data.message };
    } catch (err) {
      console.error('Reset error:', err);
      return { success: false, error: 'Something went wrong' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        requestReset,
        loading,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
