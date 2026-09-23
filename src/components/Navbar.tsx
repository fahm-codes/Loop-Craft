"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon, Sun, MessageSquare, ChevronDown, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { logout } from '@/app/actions/auth';
import { useTheme } from './ThemeProvider';

export default function Navbar({ user, profile }: { user: any, profile: any }) {
  const { theme, setTheme, actualTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname() || '/';

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
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
                className="object-contain transition-all duration-300"
                style={{ filter: 'var(--logo-filter, none)' }}
                priority
              />
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 font-serif font-medium text-[14px] lg:text-[15px]">
          <Link href="/" className={`transition-colors py-[18px] ${pathname === '/' ? 'text-accent' : 'hover:text-text-primary'}`}>Home</Link>
          <Link href="/roadmaps" className={`transition-colors py-[18px] ${(pathname.startsWith('/roadmap') || pathname.startsWith('/roadmaps')) ? 'text-accent' : 'hover:text-text-primary'}`}>Roadmaps</Link>
          <Link href="/dsa-sheets" className={`transition-colors py-[18px] ${pathname.startsWith('/dsa-sheets') ? 'text-accent' : 'hover:text-text-primary'}`}>DSA Sheets</Link>
          <Link href="/groups" className={`transition-colors py-[18px] ${pathname.startsWith('/groups') ? 'text-accent' : 'hover:text-text-primary'}`}>Groups</Link>
          <Link href="/about" className={`transition-colors py-[18px] ${pathname.startsWith('/about') ? 'text-accent' : 'hover:text-text-primary'}`}>About</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="hover:text-text-primary transition-colors">
            {actualTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-border-main rounded-md px-4 py-1.5 flex items-center gap-2 hover:bg-bg-panel hover:text-text-primary transition-colors text-sm font-serif font-medium"
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
              <Link href="/login" className="text-sm font-serif font-medium hover:text-text-primary transition-colors">
                Login
              </Link>
              <Link href="/signup" className="border border-accent text-accent rounded-md px-4 py-1.5 text-sm font-serif font-medium hover:bg-accent hover:text-bg-main transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
