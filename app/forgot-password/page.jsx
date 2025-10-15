'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrowLeft, LucideHome } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      {/* Glass Card */}
      <div className="glass-card relative mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Reset Your Password
          </span>
        </h2>

        <p className="text-center text-white/60 text-sm mb-6">
          Enter your email and we'll send you a reset link
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="email">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              className="input-glass text-white"
              required
            />
          </LabelInputContainer>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Submit Button */}
          <button
            className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer"
            type="submit">
            Send Reset Link &rarr;
            <BottomGradient />
          </button>
        </form>

        {/* Back to Login */}
        <div className="flex justify-center items-center mt-6">
          <Link
            href="/login"
            className="flex items-center gap-2 text-white/80 hover:text-white
                       transition-all duration-200 cursor-pointer hover:scale-105 text-sm md:text-base">
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Centered Home Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="btn-glass flex items-center gap-2 px-6 py-2.5 rounded-full
                       text-white/90 hover:text-white cursor-pointer hover:scale-105
                       active:scale-95 group"
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
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full
                       bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                       opacity-0 transition duration-500 group-hover/btn:opacity-100"
      />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2
                       bg-gradient-to-r from-transparent via-indigo-400 to-transparent
                       opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
      />
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
