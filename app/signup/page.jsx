'use client';

import BottomGradient from '@/components/BottomGradient';
import LabelInputContainer from '@/components/LabelInputContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, LucideHome } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const router = useRouter();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to sign up');
        setLoading(false);
        return;
      }
      setSuccess('Account created successfully! Redirecting to login...');
      setLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Create Your Account
          </span>
        </h2>
        <p className="text-center text-white/60 text-sm mb-6">
          Join Question on React today
        </p>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
            <AlertCircle
              size={16}
              className="text-red-400 mt-0.5 flex-shrink-0"
            />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 flex items-start gap-2">
            <AlertCircle
              size={16}
              className="text-green-400 mt-0.5 flex-shrink-0"
            />
            <p className="text-sm text-green-200">{success}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <LabelInputContainer>
              <Label className="text-white/90 font-medium" htmlFor="firstname">
                First name
              </Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                className="input-glass text-white"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label className="text-white/90 font-medium" htmlFor="lastname">
                Last name
              </Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                className="input-glass text-white"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                disabled={loading}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="email">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              className="input-glass text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="input-glass text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              className="text-white/90 font-medium"
              htmlFor="confirmpassword">
              Confirm Password
            </Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              className="input-glass text-white"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </LabelInputContainer>
          <div className="flex items-start space-x-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-purple-600
                         focus:ring-2 focus:ring-white/20 cursor-pointer"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-white/70 cursor-pointer">
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-white underline hover:text-white/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-white underline hover:text-white/80">
                Privacy Policy
              </Link>
            </label>
          </div>
          <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <button
            className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign up →'}
            <BottomGradient />
          </button>
        </form>
        <div className="flex justify-center items-center mt-6 text-sm md:text-base">
          <span className="text-white/70">Already have an account?</span>
          <Link
            href="/login"
            className="ml-2 text-white underline hover:text-white/80 hover:scale-105 transition-all duration-200 cursor-pointer">
            Log In
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
