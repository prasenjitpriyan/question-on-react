'use client';

import BottomGradient from '@/components/BottomGradient';
import LabelInputContainer from '@/components/LabelInputContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setSuccessMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Reset Your Password
          </span>
        </h2>

        {/* Success Message */}
        {successMessage ? (
          <div className="mt-6 text-center">
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-400 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-green-200">{successMessage}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-white/60 text-sm mb-6">
              Enter your email and we'll send you a reset link
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
                <AlertCircle
                  size={16}
                  className="text-red-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <LabelInputContainer>
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

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <button
                className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link →'}
                <BottomGradient />
              </button>
            </form>
          </>
        )}

        <div className="flex justify-center items-center mt-6">
          <Link
            href="/login"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-200 cursor-pointer hover:scale-105 text-sm md:text-base">
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
