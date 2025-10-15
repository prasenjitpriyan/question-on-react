'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { LucideHome } from 'lucide-react';
import Link from 'next/link';

export default function SignupForm() {
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
            Create Your Account
          </span>
        </h2>

        <p className="text-center text-white/60 text-sm mb-6">
          Join Question on React today
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Fields */}
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
                required
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
                required
              />
            </LabelInputContainer>
          </div>

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

          {/* Password */}
          <LabelInputContainer>
            <Label className="text-white/90 font-medium" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="input-glass text-white"
              required
              minLength={8}
            />
          </LabelInputContainer>

          {/* Confirm Password */}
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
              required
              minLength={8}
            />
          </LabelInputContainer>

          {/* Terms and Conditions */}
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

          {/* Divider */}
          <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Submit Button */}
          <button
            className="btn-glass group/btn relative block h-10 w-full rounded-md text-white font-medium cursor-pointer"
            type="submit">
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>

        {/* Login Link */}
        <div className="flex justify-center items-center mt-6 text-sm md:text-base">
          <span className="text-white/70">Already have an account?</span>
          <Link
            href="/login"
            className="ml-2 text-white underline hover:text-white/80 hover:scale-105
                       transition-all duration-200 cursor-pointer">
            Log In
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
