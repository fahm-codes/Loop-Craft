"use client";

import Link from 'next/link';
import { Search, Moon, Sun, MessageSquare, ChevronDown, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { logout } from '@/app/actions/auth';

export default function Navbar({ user, profile }: { user: any, profile: any }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (isLight) setTheme('light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  };

  return (
    <nav className="border-b border-border-main bg-bg-main text-text-secondary h-16 flex items-center px-6 lg:px-12 relative z-50">
      <div className="w-full flex justify-between items-center">
        
        {/* Left: Branding */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="LoopCraft Logo" 
              width={160} 
              height={40} 
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-10 font-sans font-medium text-[15px]">
          <Link href="/" className="hover:text-text-primary transition-colors py-[18px]">Home</Link>
          <Link href="/dashboard" className="text-accent hover:opacity-80 transition-opacity py-[18px]">Dashboard</Link>
          <Link href="/roadmaps" className="hover:text-text-primary transition-colors py-[18px]">Roadmaps</Link>
          <Link href="/roadmap/ai-engineering/learn" className="hover:text-text-primary transition-colors py-[18px]">Learn</Link>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">Community</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="hover:text-text-primary transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-border-main rounded-md px-4 py-1.5 flex items-center gap-2 hover:bg-bg-panel hover:text-text-primary transition-colors text-sm font-sans font-medium"
              >
                {profile?.display_name || user.email.split('@')[0]} <ChevronDown size={14} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-sec border border-border-main rounded-md shadow-lg py-1 z-50">
                  <Link 
                    href="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-main hover:text-text-primary flex items-center gap-2"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-bg-main hover:text-red-300 flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-sans font-medium hover:text-text-primary transition-colors">
                Login
              </Link>
              <Link href="/signup" className="border border-accent text-accent rounded-md px-4 py-1.5 text-sm font-sans font-medium hover:bg-accent hover:text-bg-main transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
