'use client';

import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { List, LogOut, LucideHome, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminDashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'All Questions', href: '/admin/dashboard', icon: List },
    { name: 'Add Question', href: '/admin/add-question', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Admin Dashboard
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

        {/* Navigation */}
        <div className="glass-card rounded-2xl p-2 mb-6">
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}>
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
