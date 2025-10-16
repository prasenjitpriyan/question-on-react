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
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Pass the selected role to the login function
      const result = await login(email, password, role);

      if (!result.success) {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Welcome to Question on React
          </span>
        </h2>

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
              placeholder="you@example.com"
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

          {/* New Role Selector UI */}
          <LabelInputContainer className="mb-8">
            <Label className="text-white/90 font-medium">Log in as</Label>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setRole('user')}
                disabled={loading}
                className={cn(
                  'flex-1 p-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900',
                  role === 'user'
                    ? 'bg-cyan-500/40 border border-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-transparent'
                )}>
                User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                disabled={loading}
                className={cn(
                  'flex-1 p-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900',
                  role === 'admin'
                    ? 'bg-cyan-500/40 border border-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-transparent'
                )}>
                Admin
              </button>
            </div>
          </LabelInputContainer>

          <button
            className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}>
            {loading ? 'Logging in...' : `Log In →`}
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
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

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn('flex w-full flex-col space-y-2', className)}>
    {children}
  </div>
);
