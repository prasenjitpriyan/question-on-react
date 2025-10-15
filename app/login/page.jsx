'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { AlertCircle, LucideHome } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);

      if (!result.success) {
        setError(result.error || 'Login failed');
        setLoading(false);
      } else {
        // Success - the redirect happens in the login function
        // Keep loading state true during redirect
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@react.com');
      setPassword('admin123');
    } else {
      setEmail('user@react.com');
      setPassword('user123');
    }
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Welcome to Question on React
          </span>
        </h2>

        {/* Demo Credentials */}
        <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/60 mb-3 font-medium">Quick Login:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200 transition-all cursor-pointer">
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => fillDemo('user')}
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-200 transition-all cursor-pointer">
              User Login
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50 mb-1">
              Admin: admin@react.com / admin123
            </p>
            <p className="text-xs text-white/50">
              User: user@react.com / user123
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
            <AlertCircle
              size={16}
              className="text-red-400 mt-0.5 flex-shrink-0"
            />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label className="text-white/90 font-medium" htmlFor="email">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="admin@react.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass text-white"
              required
              disabled={loading}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label className="text-white/90 font-medium" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass text-white"
              required
              disabled={loading}
            />
          </LabelInputContainer>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <button
            className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}>
            {loading ? 'Logging in...' : 'Log In →'}
            <BottomGradient />
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 gap-4 text-sm md:text-base">
          <Link
            href="/forgot-password"
            className="text-white/80 underline hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
            Forgot Password?
          </Link>
          <Link
            href="/signup"
            className="text-white/80 underline hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
            Sign Up
          </Link>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="btn-glass flex items-center gap-2 px-6 py-2.5 rounded-full text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 group"
            aria-label="Go to home page">
            <LucideHome
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
