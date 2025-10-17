'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

// This is the main form component
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Get the token from the URL (e.g., /reset-password?token=...)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token. Please request a new link.');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }), // Send both token and password
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setSuccessMessage(data.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-4">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Choose a New Password
          </span>
        </h2>

        {successMessage ? (
          <div className="mt-6 text-center">
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5" />
              <p className="text-sm text-green-200">{successMessage}</p>
            </div>
            <Link href="/login" className="text-cyan-400 hover:underline">
              Click here to log in
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-400 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            <LabelInputContainer>
              <Label className="text-white/90" htmlFor="password">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="input-glass text-white"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label className="text-white/90" htmlFor="confirmPassword">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="input-glass text-white"
              />
            </LabelInputContainer>
            <button
              type="submit"
              disabled={loading}
              className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium disabled:opacity-50">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Wrap the component in Suspense, which is required when using useSearchParams
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-white">
          Loading...
        </div>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn('flex w-full flex-col space-y-2', className)}>
    {children}
  </div>
);
