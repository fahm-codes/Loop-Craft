"use client";

import Link from 'next/link';
import { Search, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check initial system preference or saved preference
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
    <nav className="border-b border-border-main bg-bg-main text-text-secondary font-mono text-[12px] uppercase h-16 flex items-center">
      <div className="w-full px-6 flex justify-between items-center">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-6">
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
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="text-accent border-b border-accent py-[18px]">ROADMAPS</Link>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">RESOURCES</Link>
          <div className="flex items-center gap-2 group">
            <span className="w-2 h-2 bg-error group-hover:bg-success transition-colors"></span>
            <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">SYSTEM_LOGS</Link>
          </div>
          <Link href="#" className="hover:text-text-primary transition-colors py-[18px]">ABOUT</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-4 font-mono text-[10px] text-success">
            &bull; SYS_ONLINE
          </div>
          <a href="#" className="hidden lg:flex items-center gap-2 border border-border-main bg-bg-sec px-3 py-1.5 hover:bg-bg-panel hover:text-text-primary transition-colors text-text-secondary">
            <span>[ GitHub ]</span>
          </a>
          <button onClick={toggleTheme} className="border border-border-main w-8 h-8 flex items-center justify-center hover:bg-bg-panel hover:text-text-primary transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
          </button>
          <button className="border border-border-main w-8 h-8 flex items-center justify-center hover:bg-bg-panel hover:text-text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  );
}
