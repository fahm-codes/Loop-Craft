"use client";

import Link from 'next/link';
import { Search, Moon, Sun, MessageSquare, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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
    <nav className="border-b border-border-main bg-bg-main text-text-secondary h-16 flex items-center px-6 lg:px-12">
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
          <Link href="/" className="text-accent border-b-2 border-accent py-[18px]">Home</Link>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">Learn</Link>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">Roadmaps</Link>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">Community</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="hover:text-text-primary transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="#" className="hover:text-text-primary transition-colors hidden sm:block font-mono text-[13px]">
            [ GitHub ]
          </Link>
          <Link href="#" className="hover:text-text-primary transition-colors hidden sm:block">
            <MessageSquare size={20} />
          </Link>
          <button className="border border-border-main rounded-md px-4 py-1.5 flex items-center gap-2 hover:bg-bg-panel hover:text-text-primary transition-colors text-sm font-sans font-medium">
            Profile <ChevronDown size={14} />
          </button>
        </div>

      </div>
    </nav>
  );
}
