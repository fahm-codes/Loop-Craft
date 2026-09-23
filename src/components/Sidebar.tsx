"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Calendar, Bookmark, BarChart3, Code2, ClipboardList, BookOpenCheck, Users, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { logout } from '@/app/actions/auth';

const NAV_ITEMS = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Schedule', href: '#', icon: Calendar },
      { name: 'Bookmarks', href: '#', icon: Bookmark },
      { name: 'Progress', href: '#', icon: BarChart3 },
    ]
  },
  {
    title: 'LEARN',
    items: [
      { name: 'Roadmaps', href: '/roadmaps', icon: Map },
      { name: 'Continue Learning', href: '/roadmap/ai-engineering/learn', icon: BookOpenCheck },
      { name: 'Review & Quiz', href: '#', icon: BookOpenCheck },
    ]
  },
  {
    title: 'PRACTICE',
    items: [
      { name: 'DSA Problem Sheets', href: '/dsa-sheets', icon: Code2 },
      { name: 'Assignments', href: '#', icon: ClipboardList },
    ]
  },
  {
    title: 'COMMUNITY',
    items: [
      { name: 'Study Groups', href: '/groups', icon: Users },
      { name: 'Discord', href: '#', icon: MessageSquare },
    ]
  }
];

export default function Sidebar({ user, profile }: { user: any, profile?: any }) {
  const pathname = usePathname();
  const { actualTheme } = useTheme();

  return (
    <aside className="w-64 border-r border-border-main bg-bg-sec flex-col hidden md:flex h-full flex-shrink-0 relative z-20">
      <div className="h-16 flex items-center px-6 border-b border-border-main shrink-0">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="LoopCraft Logo" 
            width={140} 
            height={32} 
            className="object-contain transition-all duration-300"
            style={{ filter: 'var(--logo-filter, none)' }}
            priority
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {NAV_ITEMS.map((section) => (
          <div key={section.title}>
            <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3 px-2 flex items-center">
              <span className="flex-1">{section.title}</span>
              <div className="h-[1px] flex-1 bg-border-main opacity-50 ml-2"></div>
            </h4>
            <div className="space-y-[2px]">
              {section.items.map((item) => {
                const isActive = item.href === '#' ? false :
                    (item.href === '/' ? pathname === '/' :
                    item.href === '/dashboard' ? pathname.startsWith('/dashboard') :
                    item.href === '/roadmaps' ? (pathname.startsWith('/roadmaps') || (pathname.startsWith('/roadmap') && !pathname.includes('/learn'))) :
                    item.href === '/dsa-sheets' ? pathname.startsWith('/dsa-sheets') :
                    item.href === '/groups' ? pathname.startsWith('/groups') :
                    item.href === '/roadmap/ai-engineering/learn' ? pathname.includes('/learn') :
                    pathname.startsWith(item.href));
                  
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 py-1.5 transition-colors font-mono text-[11px] uppercase tracking-wider ${
                      isActive 
                        ? 'border-l-2 border-accent text-accent pl-[10px]' 
                        : 'border-l-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-main pl-[10px]'
                    }`}
                  >
                    <item.icon size={14} className={isActive ? 'text-accent' : 'text-text-muted'} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border-main shrink-0">
        <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3 px-2 flex items-center">
          <span className="flex-1">ACCOUNT</span>
          <div className="h-[1px] flex-1 bg-border-main opacity-50 ml-2"></div>
        </h4>
        <div className="space-y-[2px]">
          <Link href="/profile" className="flex items-center gap-3 py-1.5 transition-colors font-mono text-[11px] uppercase tracking-wider border-l-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-main pl-[10px]">
            <User size={14} className="text-text-muted" />
            Profile
          </Link>
          <Link href="#" className="flex items-center gap-3 py-1.5 transition-colors font-mono text-[11px] uppercase tracking-wider border-l-2 border-transparent text-text-secondary hover:text-text-primary hover:border-border-main pl-[10px]">
            <Settings size={14} className="text-text-muted" />
            Settings
          </Link>
          {user && (
            <button onClick={() => logout()} className="w-full flex items-center gap-3 py-1.5 transition-colors font-mono text-[11px] uppercase tracking-wider border-l-2 border-transparent text-error hover:text-error hover:border-error pl-[10px]">
              <LogOut size={14} />
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
