'use client';

import { useAuth } from '@/lib/auth-context';
import { LogOut, LucideHome } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboardLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                React Questions
              </h1>
              <p className="text-white/60 text-sm">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="btn-glass flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95">
                <LucideHome size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={logout}
                className="btn-glass flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
