"use client";

import { Search, Moon, Sun, ChevronDown, Menu } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

export default function AppHeader({ user, profile }: { user: any, profile: any }) {
  const { theme, setTheme, actualTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-16 border-b border-border-main bg-bg-main flex items-center justify-between px-6 shrink-0 z-10 relative">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-text-secondary hover:text-text-primary">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center gap-2 text-text-muted bg-bg-sec border border-border-main px-3 py-1.5 rounded-md w-64">
          <Search size={14} />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="bg-transparent border-none outline-none text-sm font-serif w-full text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={toggleTheme} className="text-text-secondary hover:text-text-primary transition-colors">
          {actualTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {user ? (
          <button className="flex items-center gap-2 hover:bg-bg-panel px-3 py-1.5 rounded-md transition-colors text-sm font-serif font-medium text-text-secondary">
            <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-[10px] text-accent">
              {(profile?.display_name || user.email)[0].toUpperCase()}
            </div>
            {profile?.display_name || user.email.split('@')[0]}
            <ChevronDown size={14} />
          </button>
        ) : (
          <div className="text-sm text-text-muted">Not logged in</div>
        )}
      </div>
    </header>
  );
}
