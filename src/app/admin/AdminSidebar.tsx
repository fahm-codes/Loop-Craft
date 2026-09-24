"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Map, Code2, PenTool, LogOut, Menu, X, ArrowLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const allLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users, reqRole: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'] },
    { name: 'Roadmap Management', href: '/admin/roadmaps', icon: Map, reqRole: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
    { name: 'DSA Sheets', href: '/admin/dsa-sheets', icon: Code2, reqRole: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
    { name: 'Assignments', href: '/admin/assignments', icon: PenTool, reqRole: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
  ];

  const links = allLinks.filter(l => !l.reqRole || l.reqRole.includes(role));

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-bg-sec border border-border-main text-text-primary"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-bg-sec border-r border-border-main flex flex-col
        transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-border-main flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-2xl uppercase tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center gap-2">
            <div className="w-4 h-4 bg-accent"></div>
            LoopCraft
          </Link>
        </div>
        
        <div className="p-4 border-b border-border-main font-mono text-xs text-text-muted flex items-center justify-between">
          <span>ROLE:</span>
          <span className="text-accent border border-accent/30 px-2 py-0.5 rounded-sm">{role}</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-colors ${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-text-secondary hover:text-text-primary hover:bg-bg-main'}`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-main">
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors font-mono text-sm w-full"
          >
            <ArrowLeft size={16} /> Back to App
          </Link>
        </div>
      </div>
    </>
  );
}
